import { useState } from "react";
import { Expense } from "../tablas/ExpenseTable"; // Asegura que la ruta es correcta

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 


interface EditExpenseModalProps {
  expense: Expense;
  closeModal: () => void;
  refreshExpenses: () => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ expense, closeModal, refreshExpenses }) => {
  
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);

  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  

  const handleSave = async () => {
    const updatedExpense = {
      expenseId: expense.id,
      date,
      category_id: categoryId,  // 🔥 Enviar como objeto Categoria
      description,
      recurring,
      amount,
    };

    try {
      const response = await fetch(`${URL_BACKEND}/expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el gasto");
      }

      const data = await response.json();
      console.log("✅ Gasto agregado con éxito:", data);
      AddLogEditar();
      refreshExpenses();
      closeModal();
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Hubo un problema al actualizar el gasto.");
    }
  };

  const AddLogEditar = async () => {
    const userId = JSON.parse(sessionStorage.getItem("usuario") || "{}").usuarioId || null;
    const url = `${URL_BACKEND}/access-logs/${userId}`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ action: "Editar", firstaccess: false }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Gasto</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />

              <label className="form-label mt-2">Categoría</label>
              <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
                <option value={0}>----- Seleccionar -----</option>
                <option value={"Servicios"}>Servicios</option>
                <option value={"Ocio"}>Ocio</option>
                <option value={"Alimentación"}>Alimentación</option>
              </select>

              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" checked={recurring} onChange={() => setRecurring(!recurring)} />
                <label className="form-check-label">Recurrente</label>
              </div>

              <label className="form-label mt-2">Descripción</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

              <label className="form-label mt-2">Monto</label>
              <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditExpenseModal;
