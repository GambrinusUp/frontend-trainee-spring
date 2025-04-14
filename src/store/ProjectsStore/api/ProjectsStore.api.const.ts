const BASE_PATH = "/boards";

export const GET_BOARDS = `${BASE_PATH}`;
export const GET_BOARD_ISSUES = (id: number) => `${BASE_PATH}/${id}`;
export const UPDATE_ISSUE_STATUS = (id: string) => `tasks/updateStatus/${id}`;
