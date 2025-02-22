import { useQuery } from "react-query";
import { api } from "../api";

export const getProducts = async ({
  descricao_produto,
  codigo_ncm,
  codigo_barras,
  uf,
  lista_ncm,
  lista_cest,
  pagina,
  registros_por_pagina,
}: {
  descricao_produto?: string;
  codigo_ncm?: string;
  codigo_barras?: string;
  uf: string;
  lista_ncm?: string[];
  lista_cest?: string[];
  pagina?: number;
  registros_por_pagina?: number;
}) => {
  const { data } = await api.post("fiscal/produtos/pesquisar-produto", {
    descricao_produto,
    codigo_ncm,
    codigo_barras,
    uf,
    lista_ncm,
    lista_cest,
    pagina,
    registros_por_pagina,
  });

  return data;
};

export const getImageUrl = (id: string) =>
  "https://fgf-revisao-fiscal.s3.amazonaws.com/img/produtcs/r/7894900709841.jpg";
// `${import.meta.env.VITE_API_URL}/fiscal/produtos/r/${id}.jpg`;
