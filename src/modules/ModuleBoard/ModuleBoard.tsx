import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Flex, Loader, Table, Title } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Column } from "./components/Column";

import { IssueStatusLabels } from "~/constants/names";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { useNotification } from "~/hooks/useNotification";
import {
  updateIssueStatus,
  getBoardIssues,
  getBoards,
  IssueStatus,
} from "~/store/ProjectsStore";
import { LoadingState } from "~/store/types";

// Модуль доски, для отображения задач, их редактирования и изменения статуса
export const ModuleBoard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { boardsList, issuesList, issuesLoadingState, error } = useAppSelector(
    (state) => state.projectsStore
  );
  const { showError } = useNotification();

  const boardName = boardsList.find((board) => board.id === Number(id))?.name;

  // Получение данных
  useEffect(() => {
    if (id) {
      dispatch(getBoardIssues({ id: Number(id) }));
    }
    dispatch(getBoards());
  }, [id]);

  // Фильтрация задач по их статусу
  const backlogIssues = issuesList.filter(
    (issue) => issue.status === IssueStatus.Backlog
  );

  const inProgressIssues = issuesList.filter(
    (issue) => issue.status === IssueStatus.InProgress
  );

  const doneIssues = issuesList.filter(
    (issue) => issue.status === IssueStatus.Done
  );

  // Настройка сенсоров
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Функция, которая вызывается при завершении перетаскивания и изменяет статус задачи
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      dispatch(
        updateIssueStatus({
          id: active.id.toString(),
          newStatus: over.id as IssueStatus,
        })
      );
    }
  };

  // Показ ошибок
  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  // Отображения лоадера, если данные ещё не загружены
  if (issuesLoadingState === LoadingState.PENDING) {
    return (
      <Flex justify="center" align="center">
        <Loader color="blue" size="xl" />
      </Flex>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Title order={3}>{boardName}</Title>
      <Table
        mt="md"
        variant="vertical"
        layout="fixed"
        withTableBorder
        withColumnBorders
        withRowBorders
        styles={{ td: { verticalAlign: "top" } }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{IssueStatusLabels[IssueStatus.Backlog]}</Table.Th>
            <Table.Th>{IssueStatusLabels[IssueStatus.InProgress]}</Table.Th>
            <Table.Th>{IssueStatusLabels[IssueStatus.Done]}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Column status={IssueStatus.Backlog} issues={backlogIssues} />
            </Table.Td>
            <Table.Td>
              <Column
                status={IssueStatus.InProgress}
                issues={inProgressIssues}
              />
            </Table.Td>
            <Table.Td>
              <Column status={IssueStatus.Done} issues={doneIssues} />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </DndContext>
  );
};
