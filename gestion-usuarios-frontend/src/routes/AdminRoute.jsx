import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AdminRoute = ({ children }) => {
  const { user, token, loading } = useContext(UserContext);

  if (loading) return null;


  if (!user || !token) return <Navigate to="/login" />;


  if (user.rol !== "ADMIN") return <Navigate to="/unauthorized" />;

  
  return children;
};

export default AdminRoute;
