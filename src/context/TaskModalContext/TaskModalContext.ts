import { UseFormReturnType } from "@mantine/form";
import { createContext } from "react";

import { FormValues } from "./TaskModalProvider.types";

export const TaskModalContext = createContext<
  | {
      open: () => void;
      form: UseFormReturnType<FormValues>;
    }
  | undefined
>(undefined);
