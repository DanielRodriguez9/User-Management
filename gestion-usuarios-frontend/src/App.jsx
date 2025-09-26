import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import UsuarioList from "./components/UsuarioList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import EditarUser from "./components/EditarUser";
import Loader from "./components/Loader";
import CrearUsuarioAdmin from "./components/CrearUsuarioAdmin";
import Footer from "./components/Footer";
import Unauthorized from "./pages/Unauthorized"; // 

import { UserContext } from "./context/UserContext";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

import Tareas from "./pages/Tareas";


const App = () => {
  const { user, token, loading } = useContext(UserContext);

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar solo si hay sesión */}
        {token && <Navbar />}

        {/* Contenido principal */}
        <div className="container mt-4 flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={user ? "/dashboard" : "/login"} />}
            />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/tareas"
              element={
                <PrivateRoute>
                  <Tareas />
                </PrivateRoute>
              }
            />

            <Route
              path="/usuarios"
              element={
                <AdminRoute>
                  <UsuarioList />
                </AdminRoute>
              }
            />
            <Route
              path="/editar/:id"
              element={
                <PrivateRoute>
                  <EditarUser />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/crear-usuario"
              element={
                <AdminRoute>
                  <CrearUsuarioAdmin />
                </AdminRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Footer global */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
