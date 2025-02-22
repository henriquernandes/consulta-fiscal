import { api } from "@/services/api";
import { logout } from "./logout";

export const validarUsuario = async () => {
  const res = await api.post("autentificar").catch((error) => logout());
  return res?.data;
};
