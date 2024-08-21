import axios from "axios";
import { logout } from "./requests/auth/logout";
import { getUsuarioAtual } from "@/utils/user";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string)?.acess_token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const user = getUsuarioAtual();
      if (user) {
        logout();
      }
    }
    return Promise.reject(error);
  }
);
