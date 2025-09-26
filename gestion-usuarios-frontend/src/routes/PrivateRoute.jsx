import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useContext(UserContext);

  if (loading) return null; // Loader se maneja aparte

  return user && token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
