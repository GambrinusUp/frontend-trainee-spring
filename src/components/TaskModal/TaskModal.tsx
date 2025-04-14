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

import { useAppSelector } from "~/hooks/redux";
import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

export const TaskModal = ({
  opened,
  onClose,
  form,
  handleSubmit,
}: TaskModalProps) => {
  const isAllIssuesPage = useMatch("/issues");
  const isBoardPage = !!useMatch("/board/:id");
  const navigate = useNavigate();
  const { boardsList } = useAppSelector((state) => state.projectsStore);
  const { usersList } = useAppSelector((state) => state.usersStore);
  const isEdit = form.getValues().isEdit;

  const boardsData = boardsList.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const usersData = usersList.map((item) => ({
    value: item.id.toString(),
    label: item.fullName,
  }));

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
          disabled={isEdit || isBoardPage}
          data={boardsData}
          key={form.key("boardId")}
          {...form.getInputProps("boardId")}
        />
        <Select
          radius="md"
          placeholder="Приоритет"
          allowDeselect={false}
          data={[
            { value: IssuePriority.Low, label: "Низкий" },
            { value: IssuePriority.Medium, label: "Средний" },
            { value: IssuePriority.High, label: "Высокий" },
          ]}
          key={form.key("priority")}
          {...form.getInputProps("priority")}
        />
        {(isEdit || (isEdit && isBoardPage)) && (
          <Select
            radius="md"
            placeholder="Статус"
            allowDeselect={false}
            data={[
              { value: IssueStatus.Backlog, label: "Нужно сделать" },
              { value: IssueStatus.InProgress, label: "В процессе" },
              { value: IssueStatus.Done, label: "Сделано" },
            ]}
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
