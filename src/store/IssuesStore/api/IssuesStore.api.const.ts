const BASE_PATH = "/tasks";

export const GET_ISSUES = `${BASE_PATH}`;
export const CREATE_ISSUE = `${BASE_PATH}/create`;
export const GET_ISSUE_BY_ID = (id: string) => `${BASE_PATH}/${id}`;
export const UPDATE_ISSUE = (id: string) => `${BASE_PATH}/update/${id}`;
