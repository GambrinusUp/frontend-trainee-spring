import { Button, Flex, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="center"
      align="center"
      h="calc(100vh - 92px)"
      direction="column"
    >
      <Title order={1}>Такой страницы не существует</Title>
      <Button
        mt="xl"
        variant="filled"
        size="lg"
        radius="lg"
        onClick={() => navigate("/issues")}
      >
        Вернуться на страницу всех задач
      </Button>
    </Flex>
  );
};
