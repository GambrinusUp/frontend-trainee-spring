import { UseFormReturnType } from "@mantine/form";

import { FormValues } from "~/context/TaskModalContext";

export interface TaskModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<FormValues>;
}
