import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Ocultar en login o register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/dashboard"
        className="text-white font-bold text-2xl tracking-wide"
      >
         User Management
      </Link>

      <Link
        to="/tareas"
        className="text-white font-bold text-lg hover:bg-indigo-700 px-10 py-2 rounded-lg transition "
      >
        Tasks
      </Link>

      {/* Menú */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-white font-bold text-lg hover:bg-indigo-700 px-10 py-2 rounded-lg transition"
        >
          Dashboard
        </Link>

        {/* Links que solo ve ADMIN */}
        {user.rol === "ADMIN" && (
          <>

            <Link
              to="/admin/crear-usuario"
              className="text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
            >
              Create User
            </Link>
          </>
        )}

        {/* Usuario con menú desplegable */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="w-10 h-10 rounded-full bg-white text-indigo-600 font-bold flex items-center justify-center hover:bg-gray-200 transition"
          >
            {user.nombre ? user.nombre.charAt(0).toUpperCase() : "U"}
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-3 z-50">
              <div className="px-4 py-2 border-b">
                <p className="font-semibold text-gray-800">{user.nombre}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {/* si decido no tener perfil puedo eliminar este link */}
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpenMenu(false)}
              >
                {/**aqui podria poner perfil pero mas adelante si quiero xd */}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              >
                log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
