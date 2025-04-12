import { IssuePriority } from "~/store/ProjectsStore";

export interface IssueItemProps {
  title: string;
  priority: IssuePriority;
  userName: string;
  userAvatar: string;
}
