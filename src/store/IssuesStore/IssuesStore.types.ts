import { IssueInfo, IssueStatus } from "~/store/ProjectsStore";
import { LoadingState } from "~/store/types";

export interface ExtendedIssueInfo extends IssueInfo {
  boardId: number;
  boardName: string;
}

export interface GetIssuesData {
  data: ExtendedIssueInfo[];
}

export interface GetIssueData {
  data: ExtendedIssueInfo;
}

export interface IssuesState {
  loadingState: LoadingState;
  issuesList: ExtendedIssueInfo[];
  error?: string;
}

export interface CreateIssueData {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: string;
  title: string;
}

export interface UpdateIssueData {
  assigneeId: number;
  description: string;
  priority: string;
  status: string;
  title: string;
}
