import { useNavigate } from "react-router-dom";

const CorreoConfirmacion = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "90%" }}>
                <h2 className="fw-bold text-center">Confirmación correo electrónico</h2>
                <p className="text-muted mt-3">
                    Un correo electrónico de confirmación ha sido enviado a la dirección de correo registrada en la aplicación.
                    Agradeceremos que confirme su dirección antes de autenticarse.
                </p>
                <p className="text-muted">Gracias.</p>
                <button className="btn btn-primary w-100 mt-3" onClick={() => navigate("/")}> 
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default CorreoConfirmacion;
