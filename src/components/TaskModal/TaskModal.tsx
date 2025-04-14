import {
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useMatch, useNavigate } from "react-router-dom";

import { TaskModalProps } from "./TaskModal.types";

import { PriorityOptions, StatusOptions } from "~/constants/options";
import { useAppSelector } from "~/hooks/redux";

// Компонент модального окна, где мы создаем/редактируем/просматриваем задачи
export const TaskModal = ({
  opened,
  onClose,
  form,
  handleSubmit,
}: TaskModalProps) => {
  // Проверка соответствия маршрутам
  const isAllIssuesPage = useMatch("/issues");
  const isBoardPage = !!useMatch("/board/:id");
  const navigate = useNavigate();
  // Получаем данные из хранилища
  const { boardsList } = useAppSelector((state) => state.projectsStore);
  const { usersList } = useAppSelector((state) => state.usersStore);
  const isEdit = form.getValues().isEdit;

  // Преобразование данных в опции для селекта выбора доски
  const boardsData = boardsList.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  // Преобразование данных в опции для селекта выбора исполнителя
  const usersData = usersList.map((item) => ({
    value: item.id.toString(),
    label: item.fullName,
  }));

  // Функция для перехода на доску, к которой привязаны открытая задача
  const handleNavigateToBoard = () => {
    const boardId = form.getValues().boardId;

    if (boardId) {
      form.setValues({ boardId: boardId });
      navigate(`/board/${boardId}`);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Редактирование задачи" : "Создание задачи"}
      centered
      radius="md"
      p="md"
    >
      <Stack gap="md">
        <TextInput
          radius="md"
          placeholder="Название"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <Textarea
          radius="md"
          placeholder="Описание"
          autosize
          minRows={2}
          maxRows={4}
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <Select
          radius="md"
          placeholder="Проект"
          disabled={isEdit || isBoardPage}
          data={boardsData}
          key={form.key("boardId")}
          {...form.getInputProps("boardId")}
        />
        <Select
          radius="md"
          placeholder="Приоритет"
          allowDeselect={false}
          data={PriorityOptions}
          key={form.key("priority")}
          {...form.getInputProps("priority")}
        />
        {(isEdit || (isEdit && isBoardPage)) && (
          <Select
            radius="md"
            placeholder="Статус"
            allowDeselect={false}
            data={StatusOptions}
            key={form.key("status")}
            {...form.getInputProps("status")}
          />
        )}
        <Select
          radius="md"
          placeholder="Исполнитель"
          data={usersData}
          searchable
          key={form.key("assigneeId")}
          {...form.getInputProps("assigneeId")}
        />
        <Group
          justify={isAllIssuesPage && isEdit ? "space-between" : "flex-end"}
        >
          {isAllIssuesPage && isEdit && (
            <Button
              variant="outline"
              radius="md"
              onClick={handleNavigateToBoard}
            >
              Перейти на доску
            </Button>
          )}
          <Button variant="filled" radius="md" onClick={handleSubmit}>
            {isEdit ? "Обновить" : "Создать"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
