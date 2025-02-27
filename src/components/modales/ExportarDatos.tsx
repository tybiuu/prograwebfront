interface ExportarDatosProps {
  filename?: string;
  userId: number | null; // ✅ Se agrega el userId
}
const URL_BACKEND = import.meta.env.VITE_URL_BACKEND 
const ExportarDatos = ({  userId }: ExportarDatosProps) => {

  const handleExportPDF = async () => {
    try {
        if (!userId) return;

        const response = await fetch(`${URL_BACKEND}/expenses/${userId}/export/pdf`);
        if (!response.ok) throw new Error("Error al exportar PDF");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `gastos_usuario_${userId}.pdf`;
        link.click();

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("❌ Error al exportar PDF:", error);
    }
};

const handleExportCSV = async () => {
  try {
      if (!userId) return; // ✅ Evitar exportar si no hay userId

      const response = await fetch(`${URL_BACKEND}/expenses/${userId}/export/csv`);
      if (!response.ok) throw new Error("Error al exportar CSV");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `gastos_usuario_${userId}.csv`;
      link.click();

      URL.revokeObjectURL(url);
  } catch (error) {
      console.error("❌ Error al exportar CSV:", error);
  }
};


  return (
    <div className="btn-group">
      <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
        📤 Exportar
      </button>
      <ul className="dropdown-menu">
        <li><button className="dropdown-item" onClick={handleExportPDF}>📄 Exportar a PDF</button></li>
        <li><button className="dropdown-item" onClick={handleExportCSV}>📊 Exportar a CSV</button></li>
      </ul>
    </div>
  );
};

export default ExportarDatos;