import { createSlice } from "@reduxjs/toolkit";

import { getBoardIssues, getBoards } from "./ProjectsStore.actions";
import { PROJECTS_SLICE_NAME } from "./ProjectsStore.const";
import { ProjectsState } from "./ProjectsStore.types";

import { LoadingState } from "~/store/types";

const initialState: ProjectsState = {
  loadingState: LoadingState.IDLE,
  boardsList: [],
  issuesList: [],
  error: undefined,
};

const projectsSlice = createSlice({
  name: PROJECTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loadingState = LoadingState.PENDING;
        state.error = undefined;
      })
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.loadingState = LoadingState.FULFILLED;
        state.boardsList = payload.data;
        state.error = undefined;
      })
      .addCase(getBoards.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      })
      .addCase(getBoardIssues.pending, (state) => {
        state.loadingState = LoadingState.PENDING;
        state.error = undefined;
      })
      .addCase(getBoardIssues.fulfilled, (state, { payload }) => {
        state.loadingState = LoadingState.FULFILLED;
        state.issuesList = payload.data;
        state.error = undefined;
      })
      .addCase(getBoardIssues.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      });
  },
});

export const projectsReducer = projectsSlice.reducer;
