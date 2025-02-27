import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/user_sidebar";
//import EditProfileModal from "../components/modales/EditProfileModal";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; role:string} | null>(null);
  const [/*showModal*/, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("usuario");
  
    console.log("🔹 Verificando sessionStorage en UserSidebar:", storedUser);
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        name: parsedUser.nombre,
        email: parsedUser.email,
        role: parsedUser.role
      });
    } else {
      setTimeout(() => {
        console.log("🔹 No hay usuario. Redirigiendo a login...");
        navigate("/");
      }, 500);
    }
  }, [navigate]);
  

  /*const updateUser = (updatedUser: { name: string; email: string; role: string }) => {
    if (updatedUser.name && updatedUser.email) {
      setUser(updatedUser);
      sessionStorage.setItem("nombre", updatedUser.name);
      sessionStorage.setItem("email", updatedUser.email);
      sessionStorage.setItem("role", updatedUser.role);
      
      console.log("🔹 Usuario actualizado:", updatedUser);
    } else {
      console.error("⚠️ Error: Datos de usuario inválidos.");
    }
  };
*/
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className="mb-4">Mi perfil</h2>
        {user && (
          <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Información personal</h3>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Editar
              </button>
            </div>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
            <p><strong>Contraseña:</strong> </p>
          </div>
        )}
        {/*showModal && (
          <EditProfileModal 
            user={user!} 
            showModal={showModal} 
            closeModal={() => setShowModal(false)} 
            updateUser={updateUser} 
          />
        )*/}
      </div>
    </div>
  );
};

export default Profile;
