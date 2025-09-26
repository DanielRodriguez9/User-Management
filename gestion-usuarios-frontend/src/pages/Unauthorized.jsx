import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-6"> -- Acceso Denegado --</h1>
      <p className="text-gray-700 text-lg mb-8">
        No tienes permisos para acceder a esta página.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
