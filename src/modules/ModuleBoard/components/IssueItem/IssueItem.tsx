import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";
import { useMatch } from "react-router-dom";

import { priorityColors } from "~/constants/colors";
import { IssuePriorityLabels } from "~/constants/names";
import { useTaskModal } from "~/context/TaskModalContext";
import { IssueInfo } from "~/store/ProjectsStore";

// Компонент для отображения краткой информации о задачи
export const IssueItem = ({
  id,
  title,
  description,
  priority,
  status,
  assignee,
}: IssueInfo) => {
  const isBoardPage = useMatch("/board/:id");
  const { form, open } = useTaskModal();

  // Функция обработки открытия модального окна, для редактирования задачи. Поля предзаполняются данными задачи
  const handleOpen = () => {
    form.setValues({
      id,
      title,
      description,
      priority,
      status,
      assigneeId: assignee.id.toString(),
      isEdit: true,
    });

    if (isBoardPage) {
      form.setValues({ boardId: isBoardPage.params.id });
    }

    open();
  };

  return (
    <Card
      withBorder
      radius="md"
      p="sm"
      mb="xs"
      shadow="sm"
      style={{ cursor: "pointer" }}
      onClick={handleOpen}
    >
      <Stack gap="sm">
        <Text fw={600} style={{ wordBreak: "break-all" }}>
          {title}
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
          <Avatar src={assignee.avatarUrl} alt={assignee.fullName} size="sm" />
          <Text size="xs" c="dimmed">
            {assignee.fullName}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};
