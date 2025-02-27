interface DeleteBudgetModalProps {
  closeModal: () => void;
  budgetId: number; // 🔹 Se añade el ID del presupuesto a eliminar
  onBudgetDeleted: () => void; // 🔹 Para refrescar la lista después de eliminar
}
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
const API_BASE_URL = URL_BACKEND+"/budgets"; // 🔹 Asegurar que usa el puerto correcto

const DeleteBudgetModal: React.FC<DeleteBudgetModalProps> = ({ closeModal, budgetId, onBudgetDeleted }) => {
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${budgetId}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Error al eliminar presupuesto");

      onBudgetDeleted(); // 🔹 Recargar la lista en `Presupuestos.tsx`
      closeModal();
    } catch (error) {
      console.error("❌ Error eliminando presupuesto:", error);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal show d-block">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content p-4 rounded-4 shadow-lg text-center">
            <div className="modal-header border-0">
              <h3 className="modal-title fw-bold w-100">Aviso!</h3>
            </div>
            <div className="modal-body">
              <p>¿Está seguro de que desea eliminar este registro?</p>
            </div>
            <div className="modal-footer border-0 d-flex justify-content-between">
              <button className="btn btn-secondary px-4 py-2" onClick={closeModal}>No</button>
              <button className="btn btn-primary px-4 py-2" onClick={handleDelete}>Sí</button> {/* 🔹 Ahora llama a `handleDelete()` */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBudgetModal;