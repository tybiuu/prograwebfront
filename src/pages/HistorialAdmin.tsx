import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/admin_sidebar";
import HistorialTable, { HistorialItem } from "../components/tablas/HistorialTable";
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND

const HistorialAdmin = () => {
  const [historial, setHistorial] = useState<HistorialItem[]>([])

  const httpObtenerHistorial = async () => {
    const url = URL_BACKEND+"/access-logs"
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.msg === "") {
      setHistorial(data.accessLog);
      console.log("Historial obtenido:", data.historial);
    } else {
      console.error(`Error al obtener historial: ${data.msg}`);
    }
  }

  useEffect(() => {
    httpObtenerHistorial()
  },[])

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 py-4 d-flex flex-column">
          <div className="container">
            <div className="row">
              <h2 className="mb-4">Historial</h2>
              <HistorialTable data={historial} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialAdmin;
