import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

export interface FormValues {
  title: string;
  description: string;
  boardId: number;
  priority: IssuePriority;
  status: IssueStatus;
  assigneeId: number;
}
