import { GET_BOARD_ISSUES, GET_BOARDS } from "./ProjectsStore.api.const";

import { axiosInstance } from "~/api/axiosInstance";
import { GetBoardIssuesData, GetBoardsData } from "~/store/ProjectsStore";

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
