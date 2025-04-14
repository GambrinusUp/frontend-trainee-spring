import { CloseButton, Group, Input, Select } from "@mantine/core";
import { Search } from "lucide-react";

import { SearchOptions } from "./Panel.const";
import { PanelProps } from "./Panel.types";

import { StatusOptions } from "~/constants/options";
import { useAppSelector } from "~/hooks/redux";

// Компонент панели для поиска и фильтрации задач
export const Panel = ({ form }: PanelProps) => {
  const { boardsList } = useAppSelector((state) => state.projectsStore);

  // Преобразование данных в опции для селекта выбора доски
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
          data={SearchOptions}
          key={form.key("searchType")}
          {...form.getInputProps("searchType")}
        />
      </Group>
      <Group>
        <Select
          placeholder="Выберите статус задачи"
          data={StatusOptions}
          key={form.key("issueStatus")}
          {...form.getInputProps("issueStatus")}
        />
        <Select
          placeholder="Выберите проект"
          data={selectArray}
          key={form.key("boardIdFilter")}
          {...form.getInputProps("boardIdFilter")}
        />
      </Group>
    </Group>
  );
};
