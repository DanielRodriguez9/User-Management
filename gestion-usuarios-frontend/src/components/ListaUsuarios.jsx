import { useEffect, useState } from "react";
import { getUsuarios } from "../services/UsuarioService";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Teléfono</th>
            <th className="border px-4 py-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="border px-4 py-2">{usuario.id}</td>
              <td className="border px-4 py-2">{usuario.nombre}</td>
              <td className="border px-4 py-2">{usuario.email}</td>
              <td className="border px-4 py-2">{usuario.telefono}</td>
              <td className="border px-4 py-2">{usuario.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUsuarios;
