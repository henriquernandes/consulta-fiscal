import { api } from "@/services/api";
import { getUsuarioAtual } from "@/utils/user";
import { logout } from "./logout";

export const validarUsuario = async () => {
  const user = getUsuarioAtual();
  if (!user) return false;

  await api
    .post("autentificar")
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      logout();
      localStorage.removeItem("user");

      return false;
    });

  return false;
};
