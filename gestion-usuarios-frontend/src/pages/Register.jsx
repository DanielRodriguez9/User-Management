import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const response = await api.post("/auth/register", {
        nombre,
        email,
        password,
        telefono: telefono || null,   //en este caso dejo telefono como opcional para que no sea obligatorio para el usuario 
        direccion,
        fechaNacimiento,
      });

      setMensaje(response.data.mensaje || "Registration successful!  You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration error:", err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error registering user";
      setError(msg);
    }
  };

  // Auto-hide messages after 2s
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 2000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6 sm:p-10">
      <div className="w-full max-w-3xl bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 rounded-3xl p-8 shadow-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Messages */}
            {(error || mensaje) && (
              <div className="md:col-span-2 text-center">
                {error && (
                  <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                {mensaje && (
                  <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
                    {mensaje}
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Phone</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Optional"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Address</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Optional"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

            {/* Submit button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6 md:col-span-2">
            Already have an account?{" "}
            <span
              className="text-green-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
