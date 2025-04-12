import { Stack, Table } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { getBoardIssues, IssueStatus } from "~/store/ProjectsStore";
import { IssueItem } from "./components";

export const ModuleBoard = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { issuesList } = useAppSelector((state) => state.projectsStore);

  useEffect(() => {
    if (id) {
      dispatch(getBoardIssues({ id: Number(id) }));
    }
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
      <Table
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
            <Table.Th>{IssueStatus.Backlog}</Table.Th>
            <Table.Th>{IssueStatus.InProgress}</Table.Th>
            <Table.Th>{IssueStatus.Done}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Stack gap="xs">
                {backlogIssues.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    priority={issue.priority}
                    userName={issue.assignee.fullName}
                    userAvatar={issue.assignee.avatarUrl}
                  />
                ))}
              </Stack>
            </Table.Td>
            <Table.Td>
              <Stack gap="xs">
                {inProgressIssues.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    priority={issue.priority}
                    userName={issue.assignee.fullName}
                    userAvatar={issue.assignee.avatarUrl}
                  />
                ))}
              </Stack>
            </Table.Td>
            <Table.Td>
              <Stack gap="xs">
                {doneIssues.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    priority={issue.priority}
                    userName={issue.assignee.fullName}
                    userAvatar={issue.assignee.avatarUrl}
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
