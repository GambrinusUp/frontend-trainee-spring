import axios from "axios";

import { BASE_URL } from "~/constants/apiURL";

// Экземпляр Axios с базовым URL
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});
