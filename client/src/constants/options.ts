import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

// Опции для селекта выбора статуса и приоритета задач
export const StatusOptions = [
  { value: IssueStatus.Backlog, label: "Нужно сделать" },
  { value: IssueStatus.InProgress, label: "В процессе" },
  { value: IssueStatus.Done, label: "Сделано" },
];

export const PriorityOptions = [
  { value: IssuePriority.Low, label: "Низкий" },
  { value: IssuePriority.Medium, label: "Средний" },
  { value: IssuePriority.High, label: "Высокий" },
];
