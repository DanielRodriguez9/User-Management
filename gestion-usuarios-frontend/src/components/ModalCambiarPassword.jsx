import React from "react";
import CambiarPassword from "./CambiarPassword";

const ModalCambiarPassword = ({ isOpen, onClose, targetId }) => {
  if (!isOpen) return null;


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick} //  
    >
      <div className="bg-neutral-dark rounded-xl p-6 w-full max-w-md relative">
        {/* Botón cerrar */}
        <button
          className="absolute top-2 right-2 text-white font-bold text-xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <CambiarPassword targetId={targetId} onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalCambiarPassword;
