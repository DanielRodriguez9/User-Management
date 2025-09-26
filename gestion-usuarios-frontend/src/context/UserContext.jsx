import { createContext, useState, useEffect } from "react";
import api from "../utils/axiosConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUserState(JSON.parse(savedUser));


      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

  
      api
        .get("/auth/me")
        .then((res) => {
          const userData = normalizeUser(res.data);
          setUserState(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch(() => {
          logout(); 
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  
  const normalizeUser = (data) => {
    return {
      id: data.id,
      nombre: data.nombre,
      email: data.email,
      rol: data.rol,
    };
  };


  const login = (userData, newToken) => {
    const normalized = normalizeUser(userData);
    setUserState(normalized);
    setToken(newToken);

    localStorage.setItem("user", JSON.stringify(normalized));
    localStorage.setItem("token", newToken);


    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };


  const logout = () => {
    setUserState(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

 
    delete api.defaults.headers.common["Authorization"];
  };

 
  const isAdmin = user?.rol === "ADMIN";

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, loading, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};
