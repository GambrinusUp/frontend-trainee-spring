import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { UsersHttp } from "./api";
import { GET_USERS_ACTION_NAME } from "./UsersStore.const";
import { GetUsersData } from "./UsersStore.types";

export const getUsers = createAsyncThunk<
  GetUsersData,
  void,
  { rejectValue: string }
>(GET_USERS_ACTION_NAME, async (_, { rejectWithValue }) => {
  try {
    return await UsersHttp.getUsers();
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.message || "Произошла ошибка");
    }

    return rejectWithValue("Произошла ошибка");
  }
});
