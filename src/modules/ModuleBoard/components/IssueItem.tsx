import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

import { priorityColors } from "~/constants/colors";
import { IssuePriorityLabels } from "~/constants/names";
import { useTaskModalModal } from "~/context/TaskModalContext";
import { IssueInfo } from "~/store/ProjectsStore";

export const IssueItem = ({
  id,
  title,
  description,
  priority,
  status,
  assignee,
}: IssueInfo) => {
  const { form, open } = useTaskModalModal();

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
        <Text fw={600}>{title}</Text>
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
