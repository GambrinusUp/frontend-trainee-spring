import { useContext } from "react";

import { TaskModalContext } from "./TaskModalContext";

// Хук для использования контекста модального окна
export const useTaskModal = () => {
  const context = useContext(TaskModalContext);

  if (!context) {
    throw new Error("useTaskModal must be used within an TaskModalContext");
  }

  return context;
};
