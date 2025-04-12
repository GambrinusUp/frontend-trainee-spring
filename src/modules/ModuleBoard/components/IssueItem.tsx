import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

import { IssueItemProps } from "./IssueItem.types";

import { priorityColors } from "~/constants/colors";

export const IssueItem = ({
  title,
  priority,
  userName,
  userAvatar,
}: IssueItemProps) => {
  return (
    <Card withBorder radius="md" p="sm" mb="xs" shadow="sm">
      <Stack gap="sm">
        <Text fw={600}>{title}</Text>
        <Group>
          <Text c="dimmed" size="xs">
            Приоритет:
          </Text>
          <Badge size="xs" color={priorityColors[priority]}>
            {priority}
          </Badge>
        </Group>
        <Group>
          <Avatar src={userAvatar} alt={userName} size="sm" />
          <Text size="xs" c="dimmed">
            {userName}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};
