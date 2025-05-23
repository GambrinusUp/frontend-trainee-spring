import { Flex, Loader, Stack } from "@mantine/core";
import { useEffect } from "react";

import { BoardItem } from "./components/BoardItem";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { useNotification } from "~/hooks/useNotification";
import { getBoards } from "~/store/ProjectsStore";
import { LoadingState } from "~/store/types";

// Модуль для отображения всех досок
export const ModuleBoards = () => {
  const dispatch = useAppDispatch();
  const { boardsList, boardsLoadingState, error } = useAppSelector(
    (state) => state.projectsStore
  );
  const { showError } = useNotification();

  // Получение данных
  useEffect(() => {
    dispatch(getBoards());
  }, []);

  // Показ ошибок
  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  // Отображения лоадера, если данные ещё не загружены
  if (boardsLoadingState === LoadingState.PENDING) {
    return (
      <Flex justify="center" align="center">
        <Loader color="blue" size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" gap="lg">
      <Stack w={{ base: "100%", sm: "60%" }} gap="md">
        {boardsList.map((board) => (
          <BoardItem
            key={board.id}
            id={board.id}
            name={board.name}
            description={board.description}
            taskCount={board.taskCount}
          />
        ))}
      </Stack>
    </Flex>
  );
};
