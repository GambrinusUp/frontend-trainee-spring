import { createContext } from "react";

export const TaskModalContext = createContext<{ open: () => void } | undefined>(
  undefined
);
