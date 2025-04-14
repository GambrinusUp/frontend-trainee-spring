import {
  Button,
  Card,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";

import { IssueItem } from "./components/IssueItem";
import { Panel } from "./components/Panel";
import { useFilterForm } from "./ModuleIssues.hooks";

import { useTaskModalModal } from "~/context/TaskModalContext";

export const ModuleIssues = () => {
  const { form, filteredIssues } = useFilterForm();
  const { open } = useTaskModalModal();

  const handleOpenModal = () => {
    form.setValues({
      ...JSON.parse(localStorage.getItem("issueDraft") || "{}"),
    });

    open();
  };

  return (
    <Flex
      direction="column"
      align="center"
      gap="lg"
      h="100%"
      mah="calc(100vh - 92px)"
    >
      <Panel form={form} />
      <Card w="100%" h="100%" shadow="sm" padding="lg" radius="md" withBorder>
        <ScrollArea.Autosize w="100%" mah={"100%"} mx="auto">
          <Stack align="center" w="100%">
            {filteredIssues.length < 1 ? (
              <Text>Задач не найдено</Text>
            ) : (
              filteredIssues.map((issue) => (
                <IssueItem
                  key={issue.id}
                  id={issue.id}
                  title={issue.title}
                  description={issue.description}
                  priority={issue.priority}
                  status={issue.status}
                  assignee={issue.assignee}
                  boardName={issue.boardName}
                  boardId={issue.boardId}
                />
              ))
            )}
          </Stack>
        </ScrollArea.Autosize>
        <Group justify="flex-end">
          <Button
            variant="filled"
            size="md"
            radius="md"
            onClick={handleOpenModal}
          >
            Создать задачу
          </Button>
        </Group>
      </Card>
    </Flex>
  );
};
