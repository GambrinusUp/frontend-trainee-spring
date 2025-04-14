import { CloseButton, Group, Input, Select } from "@mantine/core";
import { Search } from "lucide-react";

import { PanelProps } from "./Panel.types";

import { useAppSelector } from "~/hooks/redux";
import { SearchType } from "~/modules/ModuleIssues";
import { IssueStatus } from "~/store/ProjectsStore";

export const Panel = ({ form }: PanelProps) => {
  const { boardsList } = useAppSelector((state) => state.projectsStore);

  const selectArray = boardsList.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  return (
    <Group justify="space-between" w="100%">
      <Group>
        <Input
          placeholder="Поиск..."
          leftSection={<Search />}
          key={form.key("name")}
          {...form.getInputProps("name")}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              onClick={() => {
                form.setValues({ name: "" });
              }}
            />
          }
        />
        <Select
          allowDeselect={false}
          data={[
            { value: SearchType.ByName, label: "По названию" },
            { value: SearchType.ByAssignee, label: "По исполнителю" },
          ]}
          key={form.key("searchType")}
          {...form.getInputProps("searchType")}
        />
      </Group>
      <Group>
        <Select
          placeholder="Выберите статус задачи"
          data={[
            { value: IssueStatus.Backlog, label: "Нужно сделать" },
            { value: IssueStatus.InProgress, label: "В процессе" },
            { value: IssueStatus.Done, label: "Сделано" },
          ]}
          key={form.key("issueStatus")}
          {...form.getInputProps("issueStatus")}
        />
        <Select
          placeholder="Выберите проект"
          data={selectArray}
          key={form.key("boardId")}
          {...form.getInputProps("boardId")}
        />
      </Group>
    </Group>
  );
};
