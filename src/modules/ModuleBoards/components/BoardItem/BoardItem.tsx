import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { BoardInfo } from "~/store/ProjectsStore/ProjectsStore.types";

// Компонент для отображения информации о доске
export const BoardItem = ({ id, name, description, taskCount }: BoardInfo) => {
  const navigate = useNavigate();

  // Обработка перехода на определенную доску
  const handleNavigate = () => {
    navigate(`/board/${id}`);
  };

  return (
    <Card w="100%" shadow="sm" padding="lg" radius="lg" withBorder>
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="lg">{name}</Text>
          <Text c="dimmed" style={{ wordBreak: "break-all" }}>
            {description}
          </Text>
          <Text c="dimmed">Количество задач: {taskCount}</Text>
        </Stack>
        <Button variant="light" size="md" radius="md" onClick={handleNavigate}>
          Перейти к доске
        </Button>
      </Group>
    </Card>
  );
};
