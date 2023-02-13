import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
