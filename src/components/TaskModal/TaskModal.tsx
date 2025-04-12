import { Modal, Select, Stack, Textarea, TextInput } from "@mantine/core";

import { TaskModalProps } from "./TaskModal.types";

export const TaskModal = ({ opened, onClose, form }: TaskModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Authentication"
      withCloseButton={false}
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
          key={form.key("boardId")}
          {...form.getInputProps("boardId")}
        />
        <Select
          radius="md"
          placeholder="Приоритет"
          key={form.key("priority")}
          {...form.getInputProps("priority")}
        />
        <Select
          radius="md"
          placeholder="Статус"
          key={form.key("status")}
          {...form.getInputProps("status")}
        />
        <Select
          radius="md"
          placeholder="Исполнитель"
          key={form.key("assigneeId")}
          {...form.getInputProps("assigneeId")}
        />
      </Stack>
    </Modal>
  );
};
