import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/user_sidebar";
import ExpenseTable, { Expense } from "../components/tablas/ExpenseTable";
import EditExpenseModal from "../components/modales/EditExpenseModal";
import AddExpenseModal from "../components/modales/AddExpenseModal";
import DeleteExpenseModal from "../components/modales/DeleteExpenseModal";
import ModalFiltrarGastos from "../components/modales/ModalFiltrarGastos";
import ExportarDatos from "../components/modales/ExportarDatos";
import "bootstrap/dist/css/bootstrap.min.css";

const Expenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const userId = JSON.parse(sessionStorage.getItem("usuario") || "{}").usuarioId || null;
    const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 

    const httpObtenerExpenses = async () => {
        if (!userId) return;

        const url = `${URL_BACKEND}/expenses/${userId}`;
        try {
            const resp = await fetch(url);
            const data = await resp.json();

            if (data.msg === "") {
                setExpenses(data.expenses);
                console.log("📌 Gastos cargados:", data.expenses);
            } else {
                console.error("⚠️ Error al obtener gastos:", data.msg);
            }
        } catch (error) {
            console.error("❌ Error al conectar con el servidor:", error);
        }
    };


    useEffect(() => {
        httpObtenerExpenses();
    }, []);

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                <div className="col-md-3 col-lg-2">
                    <Sidebar />
                </div>

                <div className="col-md-10 p-4">
                    <h2 className="mb-4">Mis Gastos</h2>

                    <div className="d-flex gap-2 mb-3">
                        <button className="btn btn-outline-primary" onClick={() => setShowFilterModal(true)}>🔍 Filtrar</button>
                        <ExportarDatos filename="gastos" userId={userId} />
                        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>➕ Agregar Gasto</button>
                    </div>

                    <ExpenseTable
                        expenses={expenses}
                        openEdit={(expense) => {
                            setSelectedExpense(expense);
                            setShowEditModal(true);
                        }}

                        openDelete={(expenseId) => {
                            setExpenseToDelete(expenseId);
                            setShowDeleteModal(true);
                        }}
                    />

                    {showAddModal && (
                        <AddExpenseModal
                            closeModal={() => setShowAddModal(false)}
                            refreshExpenses={httpObtenerExpenses}
                        />
                    )}

                    {showEditModal && selectedExpense && (
                        <EditExpenseModal
                            expense={selectedExpense} // 🔥 Pasar el objeto completo
                            closeModal={() => setShowEditModal(false)}
                            refreshExpenses={httpObtenerExpenses}
                        />
                    )}


                    {showDeleteModal && (
                        <DeleteExpenseModal
                            expenseId={expenseToDelete}
                            closeModal={() => setShowDeleteModal(false)}
                            refreshExpenses={httpObtenerExpenses}
                        />
                    )}

                    {showFilterModal && (
                        <ModalFiltrarGastos
                            showModal={showFilterModal}
                            closeModal={() => setShowFilterModal(false)}
                            applyFilters={httpObtenerExpenses}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Expenses;
