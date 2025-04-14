import {
  CREATE_ISSUE,
  GET_ISSUE_BY_ID,
  GET_ISSUES,
  UPDATE_ISSUE,
} from "./IssuesStore.api.const";

import { axiosInstance } from "~/api/axiosInstance";
import {
  CreateIssueData,
  GetIssueData,
  GetIssuesData,
  UpdateIssueData,
} from "~/store/IssuesStore";

export const getIssues = async (): Promise<GetIssuesData> => {
  const { data } = await axiosInstance.get<GetIssuesData>(GET_ISSUES);

  return data;
};

export const createIssue = async (
  createIssueData: CreateIssueData
): Promise<{ data: { id: number } }> => {
  const { data } = await axiosInstance.post<{ data: { id: number } }>(
    CREATE_ISSUE,
    createIssueData
  );

  return data;
};

export const getIssue = async (id: string): Promise<GetIssueData> => {
  const { data } = await axiosInstance.get<GetIssueData>(GET_ISSUE_BY_ID(id));

  return data;
};

export const updateIssue = async (
  updateIssueData: UpdateIssueData,
  id: string
): Promise<void> => {
  await axiosInstance.put<void>(UPDATE_ISSUE(id), updateIssueData);
};
