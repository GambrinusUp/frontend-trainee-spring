import { SearchType } from "~/modules/ModuleIssues/ModuleIssues.types";

// Опции для селекта поиска
export const SearchOptions = [
  { value: SearchType.ByName, label: "По названию" },
  { value: SearchType.ByAssignee, label: "По исполнителю" },
];
