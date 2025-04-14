import { createSlice } from "@reduxjs/toolkit";

import {
  createIssue,
  getIssue,
  getIssues,
  updateIssue,
} from "./IssuesStore.actions";
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
      })
      .addCase(createIssue.pending, (state) => {
        state.error = undefined;
      })
      .addCase(createIssue.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      })
      .addCase(getIssue.pending, (state) => {
        state.error = undefined;
      })
      .addCase(getIssue.fulfilled, (state, { payload }) => {
        state.loadingState = LoadingState.FULFILLED;

        const existingIssueIndex = state.issuesList.findIndex(
          (issue) => issue.id === payload.data.id
        );

        if (existingIssueIndex !== -1) {
          state.issuesList[existingIssueIndex] = {
            ...state.issuesList[existingIssueIndex],
            ...payload.data,
          };
        } else {
          state.issuesList = [...state.issuesList, payload.data];
        }

        state.error = undefined;
      })
      .addCase(getIssue.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      })
      .addCase(updateIssue.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateIssue.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      });
  },
});

export const issuesReducer = issuesSlice.reducer;
