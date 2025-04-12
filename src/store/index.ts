import { configureStore } from "@reduxjs/toolkit";

import { issuesReducer } from "./IssuesStore";
import { projectsReducer } from "./ProjectsStore";

const store = configureStore({
  reducer: {
    projectsStore: projectsReducer,
    issuesStore: issuesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
