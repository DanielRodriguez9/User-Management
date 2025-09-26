import { useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function CrearUsuarioAdmin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    estado: "",
    rol: "",
    password: "",
  });

  // message ahora es un objeto con type y text
  const [message, setMessage] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/usuarios", formData);
      setMessage({ type: "success", text: "✅ User created successfully!" });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: " Error creating user. Please check the fields.",
      });
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl border-2 border-gray-300 shadow-xl overflow-hidden my-10">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
          <h2 className="text-3xl font-bold text-center text-white">
            Crear Usuario (Admin)
          </h2>
        </div>

        {/* Formulario */}
        <div className="p-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="enter full name"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="telefono"
                placeholder="enter phone number"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Residential address
              </label>
              <input
                type="text"
                name="direccion"
                placeholder="enter address"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthdate
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select state</option>
                <option value="Activo">Active</option>
                <option value="Inactivo">Inactive</option>
              </select>
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Botón enviar */}
            <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
              <button
                type="submit"
                className="w-full md:w-1/2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Create User
              </button>
            </div>
          </form>

          {/* Mensaje con estilo */}
          {message && (
            <p
              className={`text-center mt-6 text-lg font-medium p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
