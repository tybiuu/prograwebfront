import { useState } from "react";

interface EditProfileModalProps {
  user: { name: string; email: string; password: string };
  showModal: boolean;
  closeModal: () => void;
  updateUser: (updatedUser: { name: string; email: string; password: string }) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, showModal, closeModal, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSave = () => {
    const updatedUser = { name, email, password };
    sessionStorage.setItem("usuario", JSON.stringify(updatedUser));
    updateUser(updatedUser);
    closeModal();
  };

  return (
    <>
    {showModal && <div className="modal-backdrop fade show"></div>}
    <div className={showModal ? "modal fade show d-block" : "modal fade"}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Información de Usuario</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EditProfileModal;
