import React from "react";

interface Budget {
  id: number;
  category_id: number; // 🔹 Se mantiene internamente para la API
  category: string; // 🔹 Se usa `category` como el nombre de la categoría en la UI
  monthly_budget: number;
}

interface PresupuestosTableProps {
  budgets: Budget[];
  openEdit: (budget: Budget) => void;
  openDelete: (budget: Budget) => void;
}

const PresupuestosTable: React.FC<PresupuestosTableProps> = ({ budgets, openEdit, openDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <tr key={budget.id}> {/* 🔹 Se usa `budget.id` como `key` */}
                <td>{budget.category}</td> {/* 🔹 Se muestra solo el nombre de la categoría */}
                <td>S/. {budget.monthly_budget.toFixed(2)}</td>
                <td>
                  <button className="btn btn-light" onClick={() => openEdit(budget)}>✏️</button>
                  <button className="btn btn-light text-danger" onClick={() => openDelete(budget)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">No hay presupuestos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PresupuestosTable;