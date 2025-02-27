import { useState } from "react";

interface ModalFiltrarGastosProps {
  showModal: boolean;
  closeModal: () => void;
  applyFilters: (filters: { category?: string; date?: string; minAmount?: number; maxAmount?: number }) => void;
}

const ModalFiltrarGastos = ({ showModal, closeModal, applyFilters }: ModalFiltrarGastosProps) => {
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    applyFilters({ 
      category: category || undefined, 
      date: date || undefined, 
      minAmount: minAmount !== undefined ? minAmount : undefined, 
      maxAmount: maxAmount !== undefined ? maxAmount : undefined 
    });
    closeModal(); // Cerrar modal después de aplicar filtros
  };

  return (
    <>
      {showModal && <div className="modal-backdrop fade show"></div>}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 rounded-4 shadow-lg">
            <div className="modal-header border-0">
              <h3 className="modal-title fw-bold text-center w-100">Filtros de tabla</h3>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>

            <div className="modal-body">
              <form>
                {/* 🔹 FILTRO POR MONTO */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Monto</label>
                  <div className="d-flex gap-2 justify-content-center">
                    <input
                      type="number"
                      className="form-control text-center"
                      placeholder="Min"
                      style={{ maxWidth: "80px" }}
                      value={minAmount ?? ""}
                      onChange={(e) => setMinAmount(e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <span className="align-self-center">a</span>
                    <input
                      type="number"
                      className="form-control text-center"
                      placeholder="Max"
                      style={{ maxWidth: "80px" }}
                      value={maxAmount ?? ""}
                      onChange={(e) => setMaxAmount(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                {/* 🔹 FILTRO POR FECHA */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Fecha</label>
                  <input 
                    type="date" 
                    className="form-control text-center" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>

                {/* 🔹 FILTRO POR CATEGORÍA */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Categoría</label>
                  <select 
                    className="form-select text-center" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Todas</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Alimentacion">Alimentacion</option>
                    <option value="Ocio">Ocio</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer border-0 d-flex justify-content-between">
              <button type="button" className="btn btn-secondary px-4 py-2" onClick={closeModal}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary px-4 py-2" onClick={handleSubmit}>
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFiltrarGastos;