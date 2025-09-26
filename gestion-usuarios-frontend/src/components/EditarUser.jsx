import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import { UserContext } from "../context/UserContext";

const EditarUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "USER",
    estado: "ACTIVO",
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/usuarios/${id}`);
        setUsuario(res.data);
      } catch (err) {
        console.error(err);
        setMensaje("Error loading user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarios/${id}`, usuario);
      setMensaje("User edited successfully!");

      if (user.id === id) {
        localStorage.setItem("Name", usuario.nombre);
      }

      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error(err);
      setMensaje("Error editing user!");
    }
  };

  if (loading) return <p></p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Edit Profile
      </h2>

      {mensaje && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-6 text-center font-medium">
          {mensaje}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            placeholder="Email"
            disabled

          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Phone
          </label>
          <input
            type="text"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            name="direccion"
            value={usuario.direccion}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Solo admin puede cambiar rol y estado */}
        {user.rol === "ADMIN" && (
          <>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Role
              </label>
              <select
                name="rol"
                value={usuario.rol}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Status
              </label>
              <select
                name="estado"
                value={usuario.estado}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
              >
                <option value="ACTIVO">Active</option>
                <option value="INACTIVO">Inactive</option>
              </select>
            </div>
          </>
        )}

        {/* Botones ocupan toda la fila */}
        <div className="col-span-1 md:col-span-2 flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUser;
