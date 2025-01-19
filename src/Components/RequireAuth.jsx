import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  console.log(auth);

  const location = useLocation();
  return auth?.userName ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
