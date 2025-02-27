import { useState } from "react";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
interface AddBudgetModalProps {
  closeModal: () => void;
  onBudgetAdded: () => void;
  userId: number; // 🔹 Ahora recibe `userId`
}

const API_BASE_URL = URL_BACKEND+"/budgets"; // 🔹 Backend en puerto 5000

const categories = [
  { id: 1, name: "Servicios" },
  { id: 3, name: "Alimentación" },
  { id: 2, name: "Ocio" },
];

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ closeModal, onBudgetAdded, userId }) => {
  const [categoryId, setCategoryId] = useState<number>(1);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(); // 🔹 Inicializa como número

  const handleSave = async () => {
    if (!monthlyBudget || monthlyBudget <= 0) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: categoryId,
          monthly_budget: monthlyBudget, // ✅ Ahora es número
        }),
      });

      if (!response.ok) throw new Error("Error al agregar presupuesto");

      onBudgetAdded(); // 🔹 Recargar lista en `Presupuestos.tsx`
      closeModal();
    } catch (error) {
      console.error("❌ Error agregando presupuesto:", error);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal show d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-4 rounded-4 shadow-lg">
            <div className="modal-header border-0">
              <h3 className="modal-title fw-bold text-center w-100">Agregar Presupuesto</h3>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Categoría</label>
                  <select
                    className="form-select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))} // ✅ Convierte `string` a `number`
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ingresar monto en soles"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || 0)} // ✅ Convierte `string` a `number`
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer border-0 d-flex justify-content-between">
              <button className="btn btn-secondary px-4 py-2" onClick={closeModal}>
                Cancelar
              </button>
              <button className="btn btn-primary px-4 py-2" onClick={handleSave}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBudgetModal;