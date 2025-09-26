import api from "../utils/axiosConfig";


export const getUsuarios = () => api.get("/api/usuarios");


export const register = (usuario) => api.post("/api/auth/register", usuario);


export const login = (credenciales) => api.post("/api/auth/login", credenciales);


export const deleteUsuario = (id) => api.delete(`/api/usuarios/${id}`);


export const createUsuario = (usuario) => api.post("/api/usuarios", usuario);
