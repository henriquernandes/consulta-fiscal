import { api } from "@/services/api";

export async function entrar({
  user,
  password,
}: {
  user: string;
  password: string;
}) {
  return await api
    .post("entrar", { user, password })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
}
