import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.ts";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute(props: { authorizedRole: string }) {
  const { authorizedRole } = props;
  const { user } = useContext(UserContext);
  if (user === undefined) {
    return <>Loading...</>;
  }

  return user.role === authorizedRole ? <Outlet /> : <Navigate to="/" />;
}
