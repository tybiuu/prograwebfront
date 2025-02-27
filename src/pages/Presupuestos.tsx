import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/user_sidebar";
import PresupuestosTable from "../components/tablas/PresupuestosTable";
import AddBudgetModal from "../components/modales/AddBudgetModal";
import EditBudgetModal from "../components/modales/EditBudgetModal";
import DeleteBudgetModal from "../components/modales/DeleteBudgetModal";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
interface Budget {
  id: number;
  category_id: number;
  category: string;
  monthly_budget: number;
}
//Todo bien
const API_URL = URL_BACKEND+"/budgets";
//Bien
const Presupuestos = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
//Bien
const storedUser = sessionStorage.getItem("usuario"); // 🔥 Ahora busca la clave correcta
const userData = storedUser ? JSON.parse(storedUser) : null;
const userId = userData?.usuarioId ?? 0; // 🔥 Ahora obtiene "usuarioId" correctamente

// Si `userId` es null, mostrar un mensaje de error
if (!userId) {
  console.error("❌ Error: No se encontró `userId`. Inicia sesión nuevamente.");
  return <p>⚠ No se encontró el usuario. Inicia sesión nuevamente.</p>;
}
  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId]);
//Bien
const fetchBudgets = async () => {
  try {
    console.log(`🔍 Solicitando presupuestos en: ${API_URL}/${userId}`); // Debug

    const response = await fetch(`${API_URL}/${userId}`);
    
    if (!response.ok) {
      console.error(`❌ Error ${response.status}: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log("📌 Datos recibidos:", data);

    setBudgets(
      data.budgets.map((b: any) => ({
        id: b.id,
        category_id: b.category_id ?? 0,
        category: b.Category?.name || "Desconocido",
        monthly_budget: Number(b.monthly_budget) || 0, // 🔥 Convertir a número y evitar `null`
      }))
    );
  } catch (error) {
    console.error("❌ Error cargando presupuestos:", error);
  }
};
/*  // ✅ Agregar presupuesto
  const handleAddBudget = async (category_id: number, monthly_budget: number) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id, monthly_budget }),
      });
      const data = await response.json();
      if (data.alerta) {
        alert(data.alerta); // 🔥 Muestra la alerta si el presupuesto es superado
    }
      setShowAddModal(false);
      fetchBudgets();
    } catch (error) {
      console.error("❌ Error agregando presupuesto:", error);
    }
  };

  // ✅ Actualizar presupuesto
  const handleUpdateBudget = async (id: number, category_id: number, monthly_budget: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id, monthly_budget }),
      });
      setShowEditModal(false);
      fetchBudgets();
    } catch (error) {
      console.error("❌ Error actualizando presupuesto:", error);
    }
  };

  // ✅ Eliminar presupuesto
  const handleDeleteBudget = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setShowDeleteModal(false);
      fetchBudgets();
    } catch (error) {
      console.error("❌ Error eliminando presupuesto:", error);
    }
  };
*/
  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-md-2 vh-100 bg-light">
          <Sidebar />
        </div>
        <div className="col-md-10 p-4">
          <h2 className="mb-4">Mis Presupuestos</h2>

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              Agregar
            </button>
          </div>

          <PresupuestosTable
            budgets={budgets}
            openEdit={(budget) => {
              setSelectedBudget({
                ...budget,
                category_id: budget.category_id ?? 0, // 🔹 Asegurar `category_id`
              });
              setShowEditModal(true);
            }}
            openDelete={(budget) => {
              setSelectedBudget(budget);
              setShowDeleteModal(true);
            }}
          />

          {/* Modales */}
          {showAddModal && (
            <AddBudgetModal
              closeModal={() => setShowAddModal(false)}
              onBudgetAdded={fetchBudgets}
              userId={userId}
            />
          )}

          {showEditModal && selectedBudget && (
            <EditBudgetModal
              closeModal={() => setShowEditModal(false)}
              budget={selectedBudget}
              onBudgetUpdated={fetchBudgets}
            />
          )}

          {showDeleteModal && selectedBudget && (
            <DeleteBudgetModal
              closeModal={() => setShowDeleteModal(false)}
              budgetId={selectedBudget.id}
              onBudgetDeleted={fetchBudgets}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Presupuestos;