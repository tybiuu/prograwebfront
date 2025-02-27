import React, { useState } from "react";
interface FilterUserModalProps {
  show: boolean;
  onHide: () => void;
  filterUsers: (role: "Admin" | "User") => void;
}

const FilterUserModal: React.FC<FilterUserModalProps> = ({ show, onHide, filterUsers }) => {
  const [role, setRole] = useState<"Admin" | "User">("User");

  return (
    <>
    {show && <div className="modal-backdrop fade show"></div>}
    <div className={`modal ${show ? "d-block" : "d-none"}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <h3>Filtrar por rol de usuario</h3>
          <select className="form-select mb-3" value={role} onChange={(e) => setRole(e.target.value as "Admin" | "User")}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={onHide}>Cancelar</button>
            <button className="btn btn-primary" onClick={() => filterUsers(role)}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FilterUserModal;
