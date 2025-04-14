import { GET_USERS } from "./UsersStore.api.const";

import { axiosInstance } from "~/api/axiosInstance";
import { GetUsersData } from "~/store/UsersStore";

export const getUsers = async (): Promise<GetUsersData> => {
  const { data } = await axiosInstance.get<GetUsersData>(GET_USERS);

  return data;
};
