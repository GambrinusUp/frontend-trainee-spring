import { Button, Card, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { BoardItemProps } from "./BoardItem.types";

export const BoardItem = ({ id, name }: BoardItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/board/${id}`);
  };

  return (
    <Card w="100%" shadow="sm" padding="lg" radius="lg" withBorder>
      <Group justify="space-between">
        <Text size="lg">{name}</Text>
        <Button variant="light" size="md" radius="md" onClick={handleNavigate}>
          Перейти к доске
        </Button>
      </Group>
    </Card>
  );
};
