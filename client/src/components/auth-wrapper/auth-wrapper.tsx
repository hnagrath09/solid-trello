import { createEffect } from "solid-js";
import { Outlet, useNavigate } from "solid-app-router";
import useAuth from "hooks/use-auth";

export default function AuthWrapper() {
  const data = useAuth();
  const navigate = useNavigate();

  createEffect(() => {
    console.log(data);
  });

  if (!data.user()) {
    navigate("/login", { replace: true });
  }

  return <Outlet />;
}
