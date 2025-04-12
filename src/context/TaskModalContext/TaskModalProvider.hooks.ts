import { useForm } from "@mantine/form";

import { initialValues } from "./TaskModalProvider.const";
import { FormValues } from "./TaskModalProvider.types";

export const useModalForm = () => {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      ...initialValues,
    },
  });

  return { form };
};
