import React, { useState } from "react";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
interface DeleteExpenseModalProps {
  expenseId: number | null;
  closeModal: () => void;
  refreshExpenses: () => void; // ✅ Recargar gastos después de eliminar
}

const DeleteExpenseModal: React.FC<DeleteExpenseModalProps> = ({ expenseId, closeModal, refreshExpenses }) => {
  const [error, setError] = useState<string>("");
  console.log("expense_id recibido", expenseId)
  const handleDelete = async () => {
    if (!expenseId) return;

    try {
      const response = await fetch(URL_BACKEND+`/expenses/${expenseId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Error al eliminar gasto"); // ✅ Mostrar error en UI
        return;
      }

      console.log("📌 Gasto eliminado correctamente");
      AddLogEliminar();
      refreshExpenses(); // ✅ Recargar la lista de gastos
      closeModal();
    } catch (err) {
      console.error("❌ Error eliminando gasto:", err);
      setError("No se pudo conectar con el servidor.");
    }
  };
  
    const AddLogEliminar = async () => {
      const userId = JSON.parse(sessionStorage.getItem("usuario") || "{}").usuarioId || null;
        const url = URL_BACKEND+`/access-logs/${userId}`;
        const resp = await fetch(url, {
            method : "POST",
            body : JSON.stringify({
                action : "Eliminar",
                firstaccess : false
            }),
            headers : {
                "Content-Type": "application/json",
            }
        })
        const data = await resp.json()
        if (data.msg == "") {
            console.log("Se agrego el log correctamente")
        }
    }
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Gasto</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <p>¿Está seguro de que desea eliminar este gasto?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteExpenseModal;
