import { useEffect, useState } from "react";
import GraficoUsuarios from "../components/graficos/GraficoUsuarios";
import Sidebar from "../components/sidebar/admin_sidebar";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND
const DashboardAdminPage = () => {

  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [monthlyData, setMonthlyData] = useState<Record<string, number>>({});

  const httpObtenerTotalUsuarios = async () => {
    const url = URL_BACKEND+"/users/totalUsers";
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.msg === "") {
      setTotalUsers(data.totalUsers);
    } else {
      console.error(`Error al obtener totalUsers: ${data.msg}`);
    }
  }

  const httpObtenerResumen = async () => {
    const url = URL_BACKEND+"/access-logs/summary";
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.msg === "") {
      setMonthlyData(data.nuevosUsuarios);
      console.log(data.nuevosUsuarios);
    } else {
      console.error(`Error al obtener resumen: ${data.msg}`);
    }
  };

  useEffect(() => {
    httpObtenerTotalUsuarios()
    httpObtenerResumen()
  }, []);

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 py-4">
          <div className="container">
            <h2 className="mb-4">Dashboards</h2>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card p-4 bg-white shadow-sm text-center">
                  <h4 className="mb-3 text-start">Usuarios Totales</h4>
                  <h2>{totalUsers > 0? totalUsers : "Cargando..."}</h2>
                </div>
              </div>
            </div>

            <div className="card p-4 bg-white shadow-sm">
              <h4 className="mb-4">Usuarios nuevos por mes</h4>
              {Object.keys(monthlyData).length > 0 ? (
                <GraficoUsuarios usuariosMes={monthlyData} />
              ) : (
                <p>Cargando gráfico...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdminPage;
