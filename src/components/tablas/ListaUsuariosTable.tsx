import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: "Admin" | "User";
}

interface ListaUsuariosTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const ListaUsuariosTable: React.FC<ListaUsuariosTableProps> = ({ users, onEdit, onDelete }) => (
  <table className="table table-bordered table-hover">
    <thead className="table-primary">
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Password</th>
        <th>Rol</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password ? "********" : "No asignado"}</td>{/* Agregado */}
          <td>{user.role}</td>
          <td>
            <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit({ ...user, password: user.password || "" })} // Asegurar password
            >✏️</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(user)}>🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListaUsuariosTable;