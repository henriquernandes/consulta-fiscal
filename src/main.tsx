import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "./Components/ui/toaster";
import { AuthProvider, useAuth } from "./context/AuthContext";

const router = createRouter({ routeTree, context: { auth: undefined! } });
const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function RoutesWithAuthContext() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RoutesWithAuthContext />
        <TanStackRouterDevtools router={router} position="bottom-right" />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools position="bottom-left" />
    </QueryClientProvider>
  </StrictMode>
);
