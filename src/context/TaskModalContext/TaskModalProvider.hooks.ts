import { useForm } from "@mantine/form";
import { useEffect, useMemo } from "react";
import { useMatch } from "react-router-dom";

import { initialValues } from "./TaskModalProvider.const";
import { FormValues } from "./TaskModalProvider.types";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { useNotification } from "~/hooks/useNotification";
import {
  createIssue,
  CreateIssueData,
  updateIssue,
  UpdateIssueData,
} from "~/store/IssuesStore";
import { LoadingState } from "~/store/types";
import { getUsers } from "~/store/UsersStore";
import { debounce } from "~/utils/debounce";

export const useModalForm = (close: () => void) => {
  const isBoardPage = !!useMatch("/board/:id");
  const dispatch = useAppDispatch();
  //const [isEdit, setIsEdit] = useState(false);
  const { loadingState } = useAppSelector((state) => state.usersStore);
  const { showSuccess } = useNotification();

  // Сохранение с дебаунсом
  const debouncedSave = useMemo(
    () =>
      debounce((values: FormValues) => {
        localStorage.setItem("issueDraft", JSON.stringify(values));
      }, 300),
    []
  );

  const savedData = JSON.parse(localStorage.getItem("issueDraft") || "{}");

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      ...initialValues,
      ...savedData,
      isEdit: false,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (!values.title) {
        errors.title = "Название обязательно";
      } else if (values.title.length > 50) {
        errors.title = "Максимум 50 символов";
      }

      if (!values.description) {
        errors.description = "Описание обязательно";
      } else if (values.description.length > 250) {
        errors.description = "Максимум 250 символов";
      }

      if (!values.boardId) {
        errors.boardId = "Проект обязателен";
      }

      if (!values.assigneeId) {
        errors.assigneeId = "Исполнитель обязателен";
      }

      return errors;
    },
    onValuesChange: (values) => {
      const isEdit = form.getValues().isEdit;

      if (!isEdit) {
        debouncedSave(values);
      }
    },
  });

  useEffect(() => {
    if (loadingState === LoadingState.IDLE) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  const handleSubmit = async () => {
    form.validate();

    if (form.isValid()) {
      const formData = form.getValues();

      if (!formData.isEdit) {
        if (formData.assigneeId && formData.boardId) {
          const createData: CreateIssueData = {
            assigneeId: Number(formData.assigneeId),
            boardId: Number(formData.boardId),
            description: formData.description,
            priority: formData.priority,
            title: formData.title,
          };

          const result = await dispatch(
            createIssue({ createIssueData: createData, isBoardPage })
          );

          if (result.meta.requestStatus === "fulfilled") {
            showSuccess("Задача успешно создана");
            localStorage.setItem("issueDraft", "{}");
            form.setValues({ ...initialValues });
            close();
          }
        }
      } else {
        const id = formData.id;

        const updateData: UpdateIssueData = {
          assigneeId: Number(formData.assigneeId),
          description: formData.description,
          priority: formData.priority,
          status: formData.status,
          title: formData.title,
        };

        if (id) {
          const result = await dispatch(
            updateIssue({ id: id.toString(), data: updateData, isBoardPage })
          );

          if (result.meta.requestStatus === "fulfilled") {
            showSuccess("Задача успешно обновлена");
            close();
          }
        }
      }
    }
  };

  return { form, handleSubmit };
};
