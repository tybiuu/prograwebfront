import React, { useState, useEffect } from "react";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "User";
}

interface EditUserModalProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
  updateUser: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ show, onHide, user, updateUser }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedUser(user ? { ...user, password: "" } : null);
  }, [user]);

  const handleSave = async () => {
    if (!editedUser || !editedUser.name || !editedUser.email) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL_BACKEND}/users/EditarUsuario/${editedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editedUser.name,
          email: editedUser.email,
          password: editedUser.password || undefined, // Solo enviar la contraseña si se proporciona
          role: editedUser.role,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al editar el usuario");
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
      alert("Usuario actualizado exitosamente");
      onHide();
    } catch (error) {
      console.error("Error en la actualización:", error);
      alert("Hubo un problema al actualizar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {show && <div className="modal-backdrop fade show" onClick={onHide}></div>}
      <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <h3>Editar usuario</h3>
            {editedUser && (
              <>
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control mb-2" value={editedUser.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />

                <label className="form-label">Correo</label>
                <input type="email" className="form-control mb-2" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />

                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control mb-2" value={editedUser.password} onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })} />

                <label className="form-label">Rol</label>
                <select className="form-select" value={editedUser.role} onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as "Admin" | "User" })}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>

                <div className="mt-3 d-flex justify-content-between">
                  <button className="btn btn-secondary" onClick={onHide} disabled={loading}>Cancelar</button>
                  <button className="btn btn-success" onClick={handleSave} disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;