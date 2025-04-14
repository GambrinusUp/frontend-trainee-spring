import { LoadingState } from "~/store/types";

export interface BoardInfo {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface GetBoardsData {
  data: BoardInfo[];
}

export enum IssuePriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum IssueStatus {
  Backlog = "Backlog",
  InProgress = "InProgress",
  Done = "Done",
}

export interface IssueUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export interface IssueInfo {
  id: number;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  assignee: IssueUser;
}

export interface GetBoardIssuesData {
  data: IssueInfo[];
}

export interface ProjectsState {
  boardsLoadingState: LoadingState;
  issuesLoadingState: LoadingState;
  boardsList: BoardInfo[];
  issuesList: IssueInfo[];
  error?: string;
}

export interface UpdateIssueStatus {
  status: IssueStatus;
}
