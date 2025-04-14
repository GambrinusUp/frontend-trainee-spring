import { useDroppable } from "@dnd-kit/core";
import { Stack } from "@mantine/core";

import { DraggableIssueItem } from "~/modules/ModuleBoard/components/DraggableIssueItem";
import { IssueInfo, IssueStatus } from "~/store/ProjectsStore";

// Компонент столбца
export const Column = ({
  status,
  issues,
}: {
  status: IssueStatus;
  issues: IssueInfo[];
}) => {
  // Хук, который делает возможным перемещать в столбцы задачи (делает их droppable)
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef}>
      <Stack gap="xs">
        {issues.map((issue) => (
          <DraggableIssueItem issue={issue} key={issue.id} />
        ))}
      </Stack>
    </div>
  );
};
