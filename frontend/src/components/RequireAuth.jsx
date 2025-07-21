import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return children ? children : <Outlet />;
}
