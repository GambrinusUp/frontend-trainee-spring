import { IssuePriority, IssueStatus } from "~/store/ProjectsStore";

// Сопоставление значений приоритета и статуса задач с русскими названиями
export const IssuePriorityLabels: { [key in IssuePriority]: string } = {
  [IssuePriority.Low]: "Низкий",
  [IssuePriority.Medium]: "Средний",
  [IssuePriority.High]: "Высокий",
};

export const IssueStatusLabels: { [key in IssueStatus]: string } = {
  [IssueStatus.Backlog]: "Нужно сделать",
  [IssueStatus.InProgress]: "В процессе",
  [IssueStatus.Done]: "Сделано",
};
