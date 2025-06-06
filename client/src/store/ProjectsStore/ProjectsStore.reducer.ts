import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getBoardIssues,
  getBoards,
  updateIssueStatus,
} from "./ProjectsStore.actions";
import { PROJECTS_SLICE_NAME } from "./ProjectsStore.const";
import { ProjectsState } from "./ProjectsStore.types";

import { ExtendedIssueInfo } from "~/store/IssuesStore";
import { LoadingState } from "~/store/types";

const initialState: ProjectsState = {
  boardsLoadingState: LoadingState.IDLE,
  boardsList: [],
  issuesLoadingState: LoadingState.IDLE,
  issuesList: [],
  error: undefined,
};

const projectsSlice = createSlice({
  name: PROJECTS_SLICE_NAME,
  initialState,
  reducers: {
    getIssueInBoard: (
      state,
      action: PayloadAction<{ data: ExtendedIssueInfo }>
    ) => {
      const existingIssueIndex = state.issuesList.findIndex(
        (issue) => issue.id === action.payload.data.id
      );

      if (existingIssueIndex !== -1) {
        state.issuesList[existingIssueIndex] = {
          ...state.issuesList[existingIssueIndex],
          id: action.payload.data.id,
          title: action.payload.data.title,
          description: action.payload.data.description,
          priority: action.payload.data.priority,
          status: action.payload.data.status,
          assignee: action.payload.data.assignee,
        };
      } else {
        state.issuesList = [...state.issuesList, action.payload.data];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.boardsLoadingState = LoadingState.PENDING;
        state.error = undefined;
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boardsLoadingState = LoadingState.FULFILLED;
        state.boardsList = payload.data;
        state.error = undefined;
      })
      .addCase(getBoards.rejected, (state, { payload }) => {
        state.error = payload;
        state.boardsLoadingState = LoadingState.REJECTED;
      })
      .addCase(getBoardIssues.pending, (state) => {
        state.issuesLoadingState = LoadingState.PENDING;
        state.error = undefined;
      })
      .addCase(getBoardIssues.fulfilled, (state, { payload }) => {
        state.issuesLoadingState = LoadingState.FULFILLED;
        state.issuesList = payload.data;
        state.error = undefined;
      })
      .addCase(getBoardIssues.rejected, (state, { payload }) => {
        state.error = payload;
        state.issuesLoadingState = LoadingState.REJECTED;
      })
      .addCase(updateIssueStatus.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateIssueStatus.fulfilled, (state, { meta }) => {
        const issueId = Number(meta.arg.id);
        const newStatus = meta.arg.newStatus;

        const existingIssueIndex = state.issuesList.findIndex(
          (issue) => issue.id === issueId
        );

        if (existingIssueIndex !== -1) {
          state.issuesList[existingIssueIndex] = {
            ...state.issuesList[existingIssueIndex],
            status: newStatus,
          };
        }

        state.error = undefined;
      })
      .addCase(updateIssueStatus.rejected, (state, { payload }) => {
        state.error = payload;
        state.issuesLoadingState = LoadingState.REJECTED;
      });
  },
});

export const projectsReducer = projectsSlice.reducer;
export const { getIssueInBoard } = projectsSlice.actions;
