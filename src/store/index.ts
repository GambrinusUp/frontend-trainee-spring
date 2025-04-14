import { configureStore } from "@reduxjs/toolkit";

import { issuesReducer } from "./IssuesStore";
import { projectsReducer } from "./ProjectsStore";
import { usersReducer } from "./UsersStore";

const store = configureStore({
  reducer: {
    projectsStore: projectsReducer,
    issuesStore: issuesReducer,
    usersStore: usersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
