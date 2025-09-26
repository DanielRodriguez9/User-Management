import { useState, useContext, useEffect } from "react";
import api from "../utils/axiosConfig";
import { UserContext } from "../context/UserContext";

const CambiarPassword = ({ targetId, onClose }) => {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Resetear formulario al abrir modal
    setPassword("");
    setConfirmPassword("");
    setMensaje("");
  }, [targetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje("¡The passwords do not match!");
      return;
    }

    try {
      const idToUpdate = user.rol === "ADMIN" ? targetId : user.id;
      await api.put(`/usuarios/${idToUpdate}/password`, { password });
      setMensaje("¡Password updated succesfully!");

      setTimeout(() => {
        setMensaje("");
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setMensaje(
        err.response?.data?.message || "¡Error updating password!."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
        Change Password
      </h2>

      {mensaje && (
        <div
          className={`p-2 mb-4 rounded text-center font-medium ${
            mensaje.includes("succesfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Confirmar contraseña */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Botones */}
        <div className="flex justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Accept
          </button>
        </div>
      </form>
    </div>
  );
};

export default CambiarPassword;
