import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

export interface FormValues {
  id?: number | undefined;
  title: string;
  description: string;
  boardId: string | null;
  priority: IssuePriority;
  status: IssueStatus;
  assigneeId: string | null;

  isEdit: boolean;
}
