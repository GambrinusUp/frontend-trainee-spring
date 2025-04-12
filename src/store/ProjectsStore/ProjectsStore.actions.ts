import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ProjectsHttp } from "./api";
import {
  GET_BOARD_ISSUES_ACTION_NAME,
  GET_BOARDS_ACTION_NAME,
} from "./ProjectsStore.const";
import { GetBoardIssuesData, GetBoardsData } from "./ProjectsStore.types";

export const getBoards = createAsyncThunk<
  GetBoardsData,
  void,
  { rejectValue: string }
>(GET_BOARDS_ACTION_NAME, async (_, { rejectWithValue }) => {
  try {
    return await ProjectsHttp.getBoards();
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
    }

    return rejectWithValue("Произошла ошибка");
  }
});

export const getBoardIssues = createAsyncThunk<
  GetBoardIssuesData,
  { id: number },
  { rejectValue: string }
>(GET_BOARD_ISSUES_ACTION_NAME, async ({ id }, { rejectWithValue }) => {
  try {
    return await ProjectsHttp.getBoardIssues(id);
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
    }

    return rejectWithValue("Произошла ошибка");
  }
});
