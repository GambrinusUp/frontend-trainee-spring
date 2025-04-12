import { IssueInfo } from "~/store/ProjectsStore";
import { LoadingState } from "~/store/types";

export interface ExtendedIssueInfo extends IssueInfo {
  boardId: number;
  boardName: string;
}

export interface GetIssuesData {
  data: ExtendedIssueInfo[];
}

export interface IssuesState {
  loadingState: LoadingState;
  issuesList: ExtendedIssueInfo[];
  error?: string;
}
