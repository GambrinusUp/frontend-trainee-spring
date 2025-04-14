import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IssuesHttp } from "./api";
import {
  CREATE_ISSUE_ACTION_NAME,
  GET_ISSUE_ACTION_NAME,
  GET_ISSUES_ACTION_NAME,
  UPDATE_ISSUE_ACTION_NAME,
} from "./IssuesStore.const";
import {
  CreateIssueData,
  GetIssueData,
  GetIssuesData,
  UpdateIssueData,
} from "./IssuesStore.types";

import { getIssueInBoard } from "~/store/ProjectsStore";

export const getIssues = createAsyncThunk<
  GetIssuesData,
  void,
  { rejectValue: string }
>(GET_ISSUES_ACTION_NAME, async (_, { rejectWithValue }) => {
  try {
    return await IssuesHttp.getIssues();
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
    }

    return rejectWithValue("Произошла ошибка");
  }
});

export const getIssue = createAsyncThunk<
  GetIssueData,
  { id: string; isBoardPage: boolean; boardId?: number },
  { rejectValue: string }
>(
  GET_ISSUE_ACTION_NAME,
  async ({ id, isBoardPage, boardId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await IssuesHttp.getIssue(id);

      if (isBoardPage) {
        dispatch(getIssueInBoard(response));
      }

      const dataWithBoardId = boardId
        ? { ...response.data, boardId }
        : response.data;

      return { data: dataWithBoardId };
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
      }

      return rejectWithValue("Произошла ошибка");
    }
  }
);

export const createIssue = createAsyncThunk<
  void,
  { createIssueData: CreateIssueData; isBoardPage: boolean },
  { rejectValue: string }
>(
  CREATE_ISSUE_ACTION_NAME,
  async ({ createIssueData, isBoardPage }, { rejectWithValue, dispatch }) => {
    try {
      const issueId = await IssuesHttp.createIssue(createIssueData);

      dispatch(
        getIssue({
          id: issueId.data.id.toString(),
          isBoardPage,
          boardId: createIssueData.boardId,
        })
      );

      return;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
      }

      return rejectWithValue("Произошла ошибка");
    }
  }
);

export const updateIssue = createAsyncThunk<
  void,
  { id: string; data: UpdateIssueData; isBoardPage: boolean },
  { rejectValue: string }
>(
  UPDATE_ISSUE_ACTION_NAME,
  async ({ id, data, isBoardPage }, { rejectWithValue, dispatch }) => {
    try {
      await IssuesHttp.updateIssue(data, id);

      dispatch(getIssue({ id, isBoardPage }));

      return;
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
      }

      return rejectWithValue("Произошла ошибка");
    }
  }
);
