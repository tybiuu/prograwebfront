import React, { useState } from "react";

interface DeleteUserModalProps {
  show: boolean;
  userId: number | null;
  closeModal: () => void;
  refreshUsers: () => void; // ✅ Recargar usuarios después de eliminar
}

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ show, userId, closeModal, refreshUsers }) => {
  const [error, setError] = useState<string>("");
   if (!show) return null;
  const handleDelete = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`${URL_BACKEND}/users/EliminarUsuario/${userId}`, {
        method: "DELETE", 
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Error al eliminar usuario"); // ✅ Mostrar error en UI
        return;
      }

      console.log("📌 Usuario eliminado correctamente");
      refreshUsers(); // ✅ Recargar la lista de usuarios
      closeModal();
    } catch (err) {
      console.error("❌ Error eliminando usuario:", err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Usuario</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <p>¿Está seguro de que desea eliminar este usuario?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;