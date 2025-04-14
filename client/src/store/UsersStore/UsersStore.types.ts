import { LoadingState } from "~/store/types";

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  description: string;
  avatarUrl: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
}

export interface GetUsersData {
  data: UserInfo[];
}

export interface UsersState {
  loadingState: LoadingState;
  usersList: UserInfo[];
  error?: string;
}
