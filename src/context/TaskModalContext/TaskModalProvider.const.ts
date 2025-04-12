import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

export const initialValues = {
  assigneeId: 0,
  description: "",
  priority: IssuePriority.Low,
  status: IssueStatus.Backlog,
  title: "",
  boardId: 0,
};
