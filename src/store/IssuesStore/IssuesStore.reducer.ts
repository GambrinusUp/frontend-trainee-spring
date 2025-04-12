import { createSlice } from "@reduxjs/toolkit";

import { getIssues } from "./IssuesStore.actions";
import { ISSUES_SLICE_NAME } from "./IssuesStore.const";
import { IssuesState } from "./IssuesStore.types";

import { LoadingState } from "~/store/types";

const initialState: IssuesState = {
  loadingState: LoadingState.IDLE,
  issuesList: [],
  error: undefined,
};

const issuesSlice = createSlice({
  name: ISSUES_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIssues.pending, (state) => {
        state.loadingState = LoadingState.PENDING;
        state.error = undefined;
      })
      .addCase(getIssues.fulfilled, (state, { payload }) => {
        state.loadingState = LoadingState.FULFILLED;
        state.issuesList = payload.data;
        state.error = undefined;
      })
      .addCase(getIssues.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      });
  },
});

export const issuesReducer = issuesSlice.reducer;
