import { GET_ISSUES } from "./IssuesStore.api.const";

import { axiosInstance } from "~/api/axiosInstance";
import { GetIssuesData } from "~/store/IssuesStore";

export const getIssues = async (): Promise<GetIssuesData> => {
  const { data } = await axiosInstance.get<GetIssuesData>(GET_ISSUES);

  return data;
};
