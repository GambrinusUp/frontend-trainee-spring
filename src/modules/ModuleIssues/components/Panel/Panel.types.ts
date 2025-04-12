import { UseFormReturnType } from "@mantine/form";

import { FilterFormValues } from "~/modules/ModuleIssues";

export interface PanelProps {
  form: UseFormReturnType<FilterFormValues>;
}
