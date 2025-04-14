import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

// Типы значений формы
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
