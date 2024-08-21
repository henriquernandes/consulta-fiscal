import { validarUsuario } from "@/services/requests/auth/validarUsuario";
import { User } from "@/types/UserType";

export const getUsuarioAtual = (): User | null => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
};

export const setUsuarioAtual = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const isUsuarioLogado = async () => {
  return (getUsuarioAtual()?.access_token && (await validarUsuario())) || false;
};
