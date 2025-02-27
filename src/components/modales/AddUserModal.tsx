import React, { useState } from "react";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  
}

interface AddUserModalProps {
  show: boolean;
  onHide: () => void;
  refreshusers: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, onHide }) => {
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    password: "",
    role: "User",
    

  });
  const [message, setMessage] = useState<string | null>(null);

  const handleAdd = async () => {
    setMessage(null); // Resetear mensaje

    try {
      const response = await fetch(URL_BACKEND+"/users/AgregarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role_id: newUser.role === "Admin" ? 1 : 2, // Asegúrate de que role_id sea correcto
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al agregar el usuario");
      }

      setMessage("✅ Usuario agregado con éxito");
      onHide(); // Cerrar el modal después de agregar el usuario
      
    } catch (error: any) {
      console.error("Error en la solicitud:", error);
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>}
      <div className={`modal ${show ? "d-block" : "d-none"}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <h3>Agregar usuario</h3>
            <input
              type="text"
              placeholder="Nombre"
              className="form-control mb-2"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo"
              className="form-control mb-2"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="form-control mb-2"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <select
              className="form-select"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value as "Admin" | "User",
                })
              }
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {message && <p className="mt-2 text-center">{message}</p>}
            <div className="mt-3 d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={onHide}>
                Cancelar
              </button>
              <button className="btn btn-success" onClick={handleAdd}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;