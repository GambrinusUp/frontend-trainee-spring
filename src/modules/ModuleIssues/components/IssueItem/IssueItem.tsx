import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

import { IssueItemProps } from "./IssueItem.types";

import { priorityColors } from "~/constants/colors";

export const IssueItem = ({
  title,
  description,
  status,
  priority,
  userAvatar,
  userName,
  boardName,
}: IssueItemProps) => {
  return (
    <Card withBorder radius="xl" p="lg" shadow="sm" w="100%">
      <Stack gap="sm">
        <Text fw={600}>{title}</Text>
        <Badge size="md">{boardName}</Badge>
        <Text lineClamp={2}>{description}</Text>
        <Group>
          <Text c="dimmed" size="xs">
            Приоритет:
          </Text>
          <Badge size="xs" color={priorityColors[priority]}>
            {priority}
          </Badge>
        </Group>
        <Group>
          <Text c="dimmed" size="xs">
            Статус:
          </Text>
          <Badge size="xs">{status}</Badge>
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
