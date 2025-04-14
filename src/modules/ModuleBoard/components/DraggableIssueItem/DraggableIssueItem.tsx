import { useDraggable } from "@dnd-kit/core";

import { IssueItem } from "~/modules/ModuleBoard/components/IssueItem";
import { IssueInfo } from "~/store/ProjectsStore";

// Обёртка для компонента задач, которая делает возможным перемещение задач по таблице
export const DraggableIssueItem = ({ issue }: { issue: IssueInfo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id.toString(),
  });

  // Стили, которыые применяют CSS-трансформацию к элементу, чтобы перемещать его на новые координаты во время перетаскивания
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    zIndex: transform ? 1000 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <IssueItem
        id={issue.id}
        title={issue.title}
        description={issue.description}
        priority={issue.priority}
        status={issue.status}
        assignee={issue.assignee}
      />
    </div>
  );
};
