import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("login response:", response.data);

      const { token, id, nombre, email: userEmail, rol } = response.data;

      if (!token) throw new Error("No se recibió token del backend");

      const userData = { id, nombre, email: userEmail, rol };
      login(userData, token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error;
      setError(msg || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6 sm:p-10">
      <div className="w-full max-w-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Welcome
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            ¿Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
