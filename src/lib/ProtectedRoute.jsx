import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();

  console.log(user)

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;