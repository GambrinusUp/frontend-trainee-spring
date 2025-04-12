import { useContext } from "react";

import { TaskModalContext } from "./TaskModalContext";

export const useTaskModalModal = () => {
  const context = useContext(TaskModalContext);

  if (!context) {
    throw new Error(
      "useTaskModalModal must be used within an TaskModalContext"
    );
  }

  return context;
};
