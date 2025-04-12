import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

export interface IssueItemProps {
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  userName: string;
  userAvatar: string;
  boardName: string;
}
