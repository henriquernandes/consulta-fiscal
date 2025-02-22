import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl, getProducts } from "@/services/requests/queryProducts";
import { productType } from "@/types/productType";
import { getUsuarioLocalStorage } from "@/utils/user";

import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

const ProductSkeleton = ({ viewMode }: { viewMode: "grid" | "list" }) => (
  <Card>
    <CardContent
      className={`p-4 flex ${viewMode === "grid" ? "flex-col" : "flex-row"} items-center`}
    >
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton
        className={`mb-2 ${viewMode === "list" ? "w-20 h-20 mr-4" : "w-full h-32"}`}
      />
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
);

export default function ListProducts() {
  const userData = getUsuarioLocalStorage();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [formFilter, setFormFilter] = useState({
    description: "BIXCOITO",
    ean: "",
    ncm: "",
    itemsPerPage: 20,
    page: 1,
  });
  const totalPages = 10;
  const totalItems = 200;

  const { data, isLoading } = useQuery(["products", formFilter], () =>
    getProducts({
      descricao_produto: formFilter.description,
      codigo_ncm: formFilter.ncm,
      codigo_barras: formFilter.ean,
      lista_ncm: [],
      lista_cest: [],
      uf: userData?.store?.state || "SP",
      pagina: currentPage,
      registros_por_pagina: formFilter.itemsPerPage,
    })
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader className="bg-primary">
          <CardTitle className="text-xl font-bold text-white">
            Pesquisar Produtos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <Label htmlFor="description" className="text-gray-700">
                DESCRIÇÃO DO PRODUTO
              </Label>
              <Input
                id="description"
                placeholder="COCA"
                value={formFilter.description}
              />
            </div>
            <div>
              <Label htmlFor="ean" className="text-gray-700">
                EAN
              </Label>
              <Input
                id="ean"
                placeholder="Pesquisar produto por EAN"
                value={formFilter.ean}
              />
            </div>
            <div>
              <Label htmlFor="ncm" className="text-gray-700">
                NCM
              </Label>
              <Input
                id="ncm"
                placeholder="Pesquisar produto por NCM"
                value={formFilter.ncm}
              />
            </div>
          </div>
          <RadioGroup defaultValue="contem" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contem" id="contem" />
              <Label htmlFor="contem" className="text-gray-700">
                Contém
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inicia" id="inicia" />
              <Label htmlFor="inicia" className="text-gray-700">
                Inicia Com
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="termo" id="termo" />
              <Label htmlFor="termo" className="text-gray-700">
                Termo Exato
              </Label>
            </div>
          </RadioGroup>
          <Button className="w-full">Pesquisar</Button>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Resultado da consulta: {totalItems} produtos encontrados
        </h2>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione um Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filter1">Filter 1</SelectItem>
                <SelectItem value="filter2">Filter 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione um NCM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ncm1">NCM 1</SelectItem>
                <SelectItem value="ncm2">NCM 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione um CEST" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cest1">CEST 1</SelectItem>
                <SelectItem value="cest2">CEST 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary text-white" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary text-white" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-3 gap-4" : "space-y-4"
          }
        >
          {isLoading
            ? Array.from({ length: formFilter.itemsPerPage }).map(
                (_, index) => (
                  <ProductSkeleton key={index} viewMode={viewMode} />
                )
              )
            : data.produtos.map((product: productType) => (
                <Card key={product.id}>
                  <CardContent
                    className={`p-4 flex ${viewMode === "grid" ? "flex-col" : "flex-row"} items-center`}
                  >
                    <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                      Auditado
                    </div>
                    <img
                      src={getImageUrl(product.imagem_produto)}
                      alt={product.descricao_produto}
                      className={`mb-2 ${viewMode === "list" ? "w-10 h-10 mr-4" : "w-20 h-auto"}`}
                    />
                    <h3 className="text-sm font-semibold text-gray-800">
                      {product.descricao_produto}
                    </h3>
                  </CardContent>
                </Card>
              ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Mostrando {(currentPage - 1) * formFilter.itemsPerPage + 1} -{" "}
            {Math.min(currentPage * formFilter.itemsPerPage, totalItems)} de{" "}
            {totalItems} itens
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próximo <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
