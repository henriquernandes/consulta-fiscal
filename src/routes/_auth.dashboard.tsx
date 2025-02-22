import ListProducts from "@/Pages/ListProducts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  component: ListProducts,
});
