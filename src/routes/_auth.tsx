import Index from "@/Pages/Index";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isLogado) {
      throw redirect({
        to: "/",
        search: { from: location.href },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
