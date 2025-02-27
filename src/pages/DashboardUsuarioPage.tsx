import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/user_sidebar";
import GraficoGastoMensual from "../components/graficos/GraficoGastoMensual";
import GraficoGastoCategoria from "../components/graficos/GraficoGastoCategoria";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND
const userId = JSON.parse(sessionStorage.getItem("usuario") || "{}").usuarioId || null;

const DashboardUsuarioPage = () => {
    const [gastoMensual, setGastoMensual] = useState<Record<string, number>>({});
    const [gastoCategoria, setGastoCategoria] = useState<Record<string, number>>({});

    const obtenerGastoMensual = async () => {
        const url = `${URL_BACKEND}/expenses/summary/monthly/${userId}`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data.msg === "") {
            setGastoMensual(data.gastosMensuales);
        } else {
            console.error(`Error al obtener gasto mensual: ${data.msg}`);
        }
    };

    const obtenerGastoCategoria = async () => {
        const url = `${URL_BACKEND}/expenses/summary/category/${userId}`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data.msg === "") {
            setGastoCategoria(data.gastosPorCategoria);
        } else {
            console.error(`Error al obtener gasto por categoría: ${data.msg}`);
        }
    };

    useEffect(() => {
        obtenerGastoMensual();
        obtenerGastoCategoria();
    }, []);

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                <div className="col-md-3 col-lg-2 shadow-sm vh-100">
                    <Sidebar />
                </div>

                <div className="col-md-9 col-lg-10 py-4 d-flex flex-column">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="fw-bold mb-3">Gastos mensuales</h3>
                                <div className="card p-3 shadow-sm">
                                    {Object.keys(gastoMensual).length > 0 ? (
                                        <GraficoGastoMensual gastosMes={gastoMensual} />
                                    ) : (
                                        <p>Cargando gráfico...</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <h3 className="fw-bold mb-3">Gastos por categoría</h3>
                                <div className="card p-3 shadow-sm">
                                    {Object.keys(gastoCategoria).length > 0 ? (
                                        <GraficoGastoCategoria gastosCategoria={gastoCategoria} />
                                    ) : (
                                        <p>Cargando gráfico...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUsuarioPage;