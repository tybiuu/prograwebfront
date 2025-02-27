import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
    const handleRegister = async () => {
        console.log("🔹 Enviando datos de registro:", { name, email, password });

        const url = URL_BACKEND+"/users/register";

        const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }) // ✅ Se cambió `password_hash` a `password`
        });

        const data = await resp.json();
        setMensaje(data.msg);

        if (data.msg === "Registro exitoso") {
            AddLogRegistro(data.data.id);
            setTimeout(() => navigate("/"), 2000);
            
        }
    };
    
    const AddLogRegistro = async (userId : number) => {
        const url = `${URL_BACKEND}/access-logs/${userId}`;
        const resp = await fetch(url, {
            method : "POST",
            body : JSON.stringify({
                action : "Registro",
                firstaccess : true
            }),
            headers : {
                "Content-Type": "application/json",
            }
        })
        const data = await resp.json()
        if (data.msg == "") {
            console.log("Se agrego el log correctamente")
        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "450px", width: "90%" }}>
                <h2 className="fw-bold text-center">Registro</h2>
                {mensaje && <p className="text-center text-danger">{mensaje}</p>}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de usuario"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo de usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-100" onClick={handleRegister}>
                    Registrar
                </button>
            </div>
        </div>
    );
};

export default Registro;
