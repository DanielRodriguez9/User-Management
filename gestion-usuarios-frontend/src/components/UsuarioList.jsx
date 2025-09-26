import { useEffect, useState, useContext } from "react";
import axios from "../utils/axiosConfig"; // 👈 donde tengas configurado el axios con el token
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get("/usuarios");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await axios.delete(`/usuarios/${id}`);
      setUsuarios(usuarios.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error eliminando usuario", error);
      alert("No se pudo eliminar el usuario");
    }
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Lista de Usuarios</h2>
      <div className="grid gap-4">
        {usuarios.map((u) => (
          <div
            key={u.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{u.nombre}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(u.id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsuarioList;
