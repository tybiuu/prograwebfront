import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface GraficoUsuariosProps {
  usuariosMes: Record<string, number>
}

const GraficoUsuarios = (props : GraficoUsuariosProps) => {
  const labels = Object.keys(props.usuariosMes);
  const valores = Object.values(props.usuariosMes);

  const data = {
    labels,
    datasets: [
      {
        label: "Usuarios nuevos por mes",
        data: valores,
        backgroundColor: "#4285F4",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, max: Math.max(...valores), ticks: { stepSize: 50 } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div style={{ height: "250px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoUsuarios;
