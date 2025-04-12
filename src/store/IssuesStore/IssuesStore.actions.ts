import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IssuesHttp } from "./api";
import { GET_ISSUES_ACTION_NAME } from "./IssuesStore.const";
import { GetIssuesData } from "./IssuesStore.types";

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
