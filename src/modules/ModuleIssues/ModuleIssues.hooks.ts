import { useForm } from "@mantine/form";
import { useEffect, useMemo, useState } from "react";

import { FilterFormValues, SearchType } from "./ModuleIssues.types";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { ExtendedIssueInfo, getIssues } from "~/store/IssuesStore";
import { getBoards } from "~/store/ProjectsStore";
import { debounce } from "~/utils/debounce";

export const useFilterForm = () => {
  const dispatch = useAppDispatch();
  const { issuesList } = useAppSelector((state) => state.issuesStore);
  const [filteredIssues, setFilteredIssues] =
    useState<ExtendedIssueInfo[]>(issuesList);

  const debouncedSearch = useMemo(
    () =>
      debounce((values: FilterFormValues) => {
        let result = [...issuesList];

        // Фильтрация по имени или исполнителю
        if (values.name) {
          const searchTerm = values.name.toLowerCase();
          result = result.filter((issue) =>
            values.searchType === SearchType.ByName
              ? issue.title.toLowerCase().includes(searchTerm)
              : issue.assignee.fullName.toLowerCase().includes(searchTerm)
          );
        }

        // Фильтрация по статусу
        if (values.issueStatus) {
          result = result.filter(
            (issue) => issue.status === values.issueStatus
          );
        }

        // Фильтрация по доске
        if (values.boardId) {
          result = result.filter(
            (issue) => issue.boardId.toString() === values.boardId
          );
        }

        setFilteredIssues(result);
      }, 400),
    [issuesList]
  );

  const form = useForm<FilterFormValues>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      searchType: SearchType.ByName,
      issueStatus: undefined,
      boardId: undefined,
    },
    onValuesChange: (values) => {
      debouncedSearch(values);
    },
  });

  useEffect(() => {
    dispatch(getBoards());
    dispatch(getIssues());
  }, [dispatch]);

  useEffect(() => {
    setFilteredIssues(issuesList);
  }, [issuesList]);

  return { form, filteredIssues };
};
