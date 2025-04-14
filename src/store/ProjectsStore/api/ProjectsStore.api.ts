import {
  GET_BOARD_ISSUES,
  GET_BOARDS,
  UPDATE_ISSUE_STATUS,
} from "./ProjectsStore.api.const";

import { axiosInstance } from "~/api/axiosInstance";
import {
  GetBoardIssuesData,
  GetBoardsData,
  UpdateIssueStatus,
} from "~/store/ProjectsStore";

export const getBoards = async (): Promise<GetBoardsData> => {
  const { data } = await axiosInstance.get<GetBoardsData>(GET_BOARDS);

  return data;
};

export const getBoardIssues = async (
  id: number
): Promise<GetBoardIssuesData> => {
  const { data } = await axiosInstance.get<GetBoardIssuesData>(
    GET_BOARD_ISSUES(id)
  );

  return data;
};

export const updateIssueStatus = async (
  updateIssueStatus: UpdateIssueStatus,
  id: string
): Promise<void> => {
  await axiosInstance.put<void>(UPDATE_ISSUE_STATUS(id), updateIssueStatus);
};
