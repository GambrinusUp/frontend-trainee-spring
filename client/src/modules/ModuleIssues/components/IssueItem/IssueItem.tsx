import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

import { priorityColors } from "~/constants/colors";
import { IssuePriorityLabels, IssueStatusLabels } from "~/constants/names";
import { useTaskModal } from "~/context/TaskModalContext";
import { ExtendedIssueInfo } from "~/store/IssuesStore";

// Компонент для отображения информации о задачи
export const IssueItem = ({
  id,
  title,
  description,
  status,
  priority,
  assignee,
  boardId,
  boardName,
}: ExtendedIssueInfo) => {
  const { form, open } = useTaskModal();

  // Функция обработки открытия модального окна, для редактирования задачи. Поля предзаполняются данными задачи
  const handleEdit = () => {
    form.setValues({
      id,
      title,
      description,
      boardId: boardId.toString(),
      priority,
      status,
      assigneeId: assignee.id.toString(),
      isEdit: true,
    });

    open();
  };

  return (
    <Card
      withBorder
      radius="xl"
      p="lg"
      shadow="sm"
      w="60%"
      onClick={handleEdit}
      style={{ cursor: "pointer" }}
    >
      <Stack gap="sm">
        <Text fw={600}>{title}</Text>
        <Badge size="md">{boardName}</Badge>
        <Text lineClamp={2} style={{ wordBreak: "break-all" }}>
          {description}
        </Text>
        <Group>
          <Text c="dimmed" size="xs">
            Приоритет:
          </Text>
          <Badge size="xs" color={priorityColors[priority]}>
            {IssuePriorityLabels[priority]}
          </Badge>
        </Group>
        <Group>
          <Text c="dimmed" size="xs">
            Статус:
          </Text>
          <Badge size="xs">{IssueStatusLabels[status]}</Badge>
        </Group>
        <Group>
          <Avatar src={assignee.avatarUrl} alt={assignee.fullName} size="sm" />
          <Text size="xs" c="dimmed">
            {assignee.fullName}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};
