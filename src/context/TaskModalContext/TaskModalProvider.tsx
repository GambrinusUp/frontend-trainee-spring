import { useDisclosure } from "@mantine/hooks";

import { TaskModalContext } from "./TaskModalContext";
import { useModalForm } from "./TaskModalProvider.hooks";

import { TaskModal } from "~/components/TaskModal";

export const TaskModalProvider = (props: React.PropsWithChildren) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { form } = useModalForm();

  return (
    <TaskModalContext.Provider value={{ open }}>
      {props.children}
      <TaskModal opened={opened} onClose={close} form={form} />
    </TaskModalContext.Provider>
  );
};
