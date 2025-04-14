import { createSlice } from "@reduxjs/toolkit";

import { getUsers } from "./UsersStore.actions";
import { USERS_SLICE_NAME } from "./UsersStore.const";
import { UsersState } from "./UsersStore.types";

import { LoadingState } from "~/store/types";

const initialState: UsersState = {
  loadingState: LoadingState.IDLE,
  usersList: [],
  error: undefined,
};

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loadingState = LoadingState.PENDING;
        state.error = undefined;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loadingState = LoadingState.FULFILLED;
        state.usersList = payload.data;
        state.error = undefined;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.error = payload;
        state.loadingState = LoadingState.REJECTED;
      });
  },
});

export const usersReducer = usersSlice.reducer;
