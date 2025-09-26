import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import CambiarPassword from "./CambiarPassword";

const Dashboard = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null); // Para admin que cambia contraseña de otros

  // nuevo estado para modal de confirmación
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await api.get("/auth/me");
        setPerfil(res.data);

        if (res.data.rol === "ADMIN") {
          const usuariosRes = await api.get("/usuarios");
          setUsuarios(usuariosRes.data);
        }
      } catch (err) {
        console.error(err);
        setMensaje("Error loading data ");
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, [token]);

  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleEliminar = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/usuarios/${deleteId}`);
      setUsuarios(usuarios.filter((u) => u.id !== deleteId));
      setMensaje("Deleted user successfully ");
    } catch (err) {
      console.error(err);
      setMensaje("Error deleting user ");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const abrirModalPassword = (id) => {
    setTargetId(id);
    setModalOpen(true);
  };

  if (loading) return <p></p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {mensaje && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {mensaje}
        </div>
      )}

      {/* Perfil propio tarjeta */}
      {perfil && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold">
              {perfil.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{perfil.nombre}</h2>
              <p>Email: {perfil.email}</p>
              <p>Phone: {perfil.telefono}</p>
              <p>Location: {perfil.direccion}</p>
              <p>Role: {perfil.rol}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <button
              className="w-full mb-2 bg-white text-indigo-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 shadow-sm"
              onClick={() => handleEditar(perfil.id)}
            >
              Edit Profile
            </button>
            <button
              className="w-full mb-2 bg-white text-indigo-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 shadow-sm"
              onClick={() => abrirModalPassword(perfil.id)}
            >
              Change Password
            </button>

            {/* Solo ADMIN ve este botón */}
            {perfil.rol === "ADMIN" && (
              <button
                className="w-full bg-red-600 font-bold  px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleEliminar(perfil.id)}
              >
                Delete Account
              </button>
            )}
          </div>
        </div>
      )}

      {/* Admin: lista de usuarios */}
      {perfil?.rol === "ADMIN" && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">System Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usuarios.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-xl shadow-md p-6 border flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{u.nombre}</h3>
                  <p>Email: {u.email}</p>
                  <p>Phone: {u.telefono}</p>
                  <p>Location: {u.direccion}</p>
                  <p>Role: {u.rol}</p>
                  <p>State: {u.estado}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleEditar(u.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleEliminar(u.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => abrirModalPassword(u.id)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal para cambiar contraseña */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <button
              className="text-gray-500 float-right"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <CambiarPassword
              targetId={targetId}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal de confirmación eliminar */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
