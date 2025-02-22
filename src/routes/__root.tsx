import { AuthContextType } from "@/context/AuthContext";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface Context {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => <Outlet />,
});
