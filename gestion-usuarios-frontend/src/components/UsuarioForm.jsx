import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarios, createUsuario } from "../services/UsuarioService";
import api from "../utils/axiosConfig";

const UsuarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    estado: "",
    rol: "",
    prioridad: ""
  });

  const [errorMensaje, setErrorMensaje] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // ✅ Maneja los cambios en los inputs
  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  // ✅ Si hay id, precargar el usuario para editar
  useEffect(() => {
    if (id) {
      api
        .get(`/usuarios/${id}`)
        .then((res) => setUsuario(res.data))
        .catch((err) => {
          console.error("Error al obtener usuario:", err);
          setErrorMensaje("Error al obtener datos del usuario.");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMensaje("");
      setMensajeExito("");

      if (id) {
        await api.put(`/usuarios/${id}`, usuario);
        setMensajeExito("✅ Usuario actualizado exitosamente");
      } else {
        await createUsuario(usuario); // 👈 ahora usa usuarioService
        setMensajeExito("🎉 Usuario creado exitosamente");
      }

      setTimeout(() => {
        navigate("/usuarios");
      }, 2000);
    } catch (error) {
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === "object") {
          const errores = Object.values(data).join(", ");
          setErrorMensaje(errores);
        } else {
          setErrorMensaje(data.message || "Error desconocido");
        }
      } else {
        setErrorMensaje("Error desconocido al guardar el usuario");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">
          {id ? "Editar Usuario" : "Registrar Nuevo Usuario"}
        </h2>
        <hr style={{ width: "50px", margin: "10px auto" }} />
      </div>

      {mensajeExito && (
        <div className="alert alert-success text-center" role="alert">
          {mensajeExito}
        </div>
      )}

      {errorMensaje && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMensaje}
        </div>
      )}

      <div className="card shadow mx-auto" style={{ maxWidth: "900px" }}>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Nombre */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={usuario.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={usuario.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  className="form-control"
                  value={usuario.telefono}
                  onChange={handleChange}
                />
              </div>

              {/* Dirección */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  value={usuario.direccion}
                  onChange={handleChange}
                />
              </div>

              {/* Fecha Nacimiento */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  className="form-control"
                  value={usuario.fechaNacimiento}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Estado */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Estado</label>
                <select
                  name="estado"
                  className="form-select"
                  value={usuario.estado}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              {/* Rol */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Rol</label>
                <input
                  type="text"
                  name="rol"
                  className="form-control"
                  value={usuario.rol}
                  onChange={handleChange}
                />
              </div>

              {/* Prioridad */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Prioridad</label>
                <select
                  name="prioridad"
                  className="form-select"
                  value={usuario.prioridad}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Media</option>
                  <option value="BAJA">Baja</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Guardar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsuarioForm;
