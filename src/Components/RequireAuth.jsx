import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  // allowedRoles = 101,102
  // auth.roles = 101,102

  //need to consider - if a user visit a admin page show unauthorize

  const location = useLocation();

  const hasAccess = auth?.roles?.find((role) => allowedRoles?.includes(role));

  return hasAccess ? (
    <Outlet />
  ) : auth?.userName ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
