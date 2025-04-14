import { Stack, Table, Title } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { IssueItem } from "./components";

import { IssueStatusLabels } from "~/constants/names";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { getBoardIssues, getBoards, IssueStatus } from "~/store/ProjectsStore";

export const ModuleBoard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { boardsList, issuesList } = useAppSelector(
    (state) => state.projectsStore
  );
  const boardName = boardsList.find((board) => board.id === Number(id))?.name;

  useEffect(() => {
    if (id) {
      dispatch(getBoardIssues({ id: Number(id) }));
    }
    dispatch(getBoards());
  }, [id]);

  const backlogIssues = issuesList.filter(
    (issue) => issue.status === IssueStatus.Backlog
  );

  const inProgressIssues = issuesList.filter(
    (issue) => issue.status === IssueStatus.InProgress
  );

  const doneIssues = issuesList.filter(
    (issue) => issue.status === IssueStatus.Done
  );

  return (
    <>
      <Title order={3}>{boardName}</Title>
      <Table
        mt="md"
        variant="vertical"
        layout="fixed"
        withTableBorder
        withColumnBorders
        withRowBorders
        styles={{
          td: {
            verticalAlign: "top",
          },
        }}
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
              <Stack gap="xs">
                {backlogIssues.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    id={issue.id}
                    title={issue.title}
                    description={issue.description}
                    priority={issue.priority}
                    status={issue.status}
                    assignee={issue.assignee}
                  />
                ))}
              </Stack>
            </Table.Td>
            <Table.Td>
              <Stack gap="xs">
                {inProgressIssues.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    id={issue.id}
                    title={issue.title}
                    description={issue.description}
                    priority={issue.priority}
                    status={issue.status}
                    assignee={issue.assignee}
                  />
                ))}
              </Stack>
            </Table.Td>
            <Table.Td>
              <Stack gap="xs">
                {doneIssues.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    id={issue.id}
                    title={issue.title}
                    description={issue.description}
                    priority={issue.priority}
                    status={issue.status}
                    assignee={issue.assignee}
                  />
                ))}
              </Stack>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
};
