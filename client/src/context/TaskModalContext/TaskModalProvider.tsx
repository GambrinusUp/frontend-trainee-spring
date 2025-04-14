import { useDisclosure } from "@mantine/hooks";

import { TaskModalContext } from "./TaskModalContext";
import { useModalForm } from "./TaskModalProvider.hooks";

import { TaskModal } from "~/components/TaskModal";

// Провайдер, который предоставляет контекст для управления модальным окном и формой
export const TaskModalProvider = (props: React.PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, handleSubmit } = useModalForm(close);

  // Функция закрытия модального окна
  const handleClose = () => {
    close();
    const savedData = JSON.parse(localStorage.getItem("issueDraft") || "{}");
    form.setValues({ ...savedData, isEdit: false });
  };

  return (
    <TaskModalContext.Provider value={{ open, form }}>
      {props.children}
      {opened && (
        <TaskModal
          opened={opened}
          onClose={handleClose}
          form={form}
          handleSubmit={handleSubmit}
        />
      )}
    </TaskModalContext.Provider>
  );
};
