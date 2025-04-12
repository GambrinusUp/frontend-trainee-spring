import { IssueStatus } from "~/store/ProjectsStore";

export enum SearchType {
  ByName = "ByName",
  ByAssignee = "ByAssignee",
}

export interface FilterFormValues {
  name: string;
  searchType: SearchType;
  issueStatus?: IssueStatus;
  boardId?: string;
}
