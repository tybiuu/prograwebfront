import { useState } from "react";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
interface AddExpenseModalProps {
  closeModal: () => void;
  refreshExpenses: () => void; // 🔥 Se llama para recargar los gastos después de agregar uno nuevo
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ closeModal, refreshExpenses }) => {
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");

  // ✅ Corregido: Obtiene `user_id` de `sessionStorage`
  const userId = JSON.parse(sessionStorage.getItem("usuario") || "{}").usuarioId || null;

  const handleSave = async () => {
    if (!userId) {
      setError("⚠️ Error: No se encontró el usuario.");
      return;
    }

    if (!date || amount <= 0 || description.trim() === "" || categoryId === 0) {
      setError("⚠️ Todos los campos son obligatorios.");
      return;
    }

    const newExpense = {
      user_id: userId,
      date,
      category_id: categoryId,
      description,
      recurring,
      amount,
    };

    try {
      const response = await fetch(`${URL_BACKEND}/expenses/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al agregar gasto");
      }

      console.log("✅ Gasto agregado con éxito:", data);
      AddLogAgregarExpense();
      refreshExpenses(); // 🔥 Actualiza la lista de gastos después de agregar uno nuevo
      closeModal();
    } catch (error) {
      setError("❌ Error al agregar el gasto.");
      console.error("Error al agregar gasto:", error);
    }
  };
  const AddLogAgregarExpense = async () => {
    const url = `${URL_BACKEND}/access-logs/${userId}`;
    const resp = await fetch(url, {
        method : "POST",
        body : JSON.stringify({
            action : "Agregar",
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
              <h5 className="modal-title">Agregar Gasto</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <label className="form-label">Fecha</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />

              <label className="form-label mt-2">Categoría</label>
              <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
                <option value={0}>----- Seleccionar -----</option>
                <option value={1}>Servicios</option>
                <option value={2}>Ocio</option>
                <option value={3}>Alimentación</option>
              </select>

              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={recurring}
                  onChange={() => setRecurring((prev) => !prev)}
                />
                <label className="form-check-label">Recurrente</label>
              </div>

              <label className="form-label mt-2">Descripción</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Escriba aquí el detalle"></textarea>

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

export default AddExpenseModal;
