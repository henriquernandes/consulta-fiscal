import { User } from "@/types/UserType";

export const getUsuarioLocalStorage = (): User | null => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
};

export const setUsuarioLocalStorage = (user: User | null) => {
  localStorage.setItem("user", JSON.stringify(user));
};
