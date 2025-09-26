import { useState } from "react";

export default function Tareas() {
  // Estado con lista de tareas
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Review reports", estado: "Pending" },
    { id: 2, titulo: "Update profile", estado: "in process" },
    { id: 3, titulo: "Submit report", estado: "Completed" },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState("");

  // Agregar nueva tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim() === "") return;

    const nueva = {
      id: Date.now(), // ID único
      titulo: nuevaTarea,
      estado: "Pending",
    };

    setTareas([...tareas, nueva]);
    setNuevaTarea(""); // limpiar input
  };

  // Cambiar estado de la tarea
  const cambiarEstado = (id, nuevoEstado) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
    );
  };

  // Eliminar tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 My Tasks</h1>

      {/* Formulario para nueva tarea */}
      <form onSubmit={agregarTarea} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Write a new task..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          ➕ Add
        </button>
      </form>

      {/* Lista de tareas */}
      {tareas.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have no pending tasks 🎉
        </p>
      ) : (
        <ul className="space-y-4">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold">{tarea.titulo}</p>
                <p className="text-sm text-gray-600">state: {tarea.estado}</p>
              </div>

              <div className="flex gap-2">
                <select
                  value={tarea.estado}
                  onChange={(e) => cambiarEstado(tarea.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option>Pending</option>
                  <option>in process</option>
                  <option>Completed</option>
                </select>

                <button
                  onClick={() => eliminarTarea(tarea.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
