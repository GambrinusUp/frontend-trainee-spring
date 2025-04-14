import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

export const initialValues = {
  id: undefined,
  assigneeId: null,
  description: "",
  priority: IssuePriority.Low,
  status: IssueStatus.Backlog,
  title: "",
  boardId: null,
};
