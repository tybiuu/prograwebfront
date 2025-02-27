import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface GraficoGastoCategoriaProps {
    gastosCategoria: Record<string, number>;
}

const GraficoGastoCategoria = ({ gastosCategoria }: GraficoGastoCategoriaProps) => {
    const labels = Object.keys(gastosCategoria);
    const valores = Object.values(gastosCategoria);

    const data = {
        labels,
        datasets: [
            {
                label: "Gastos por categoría",
                data: valores,
                backgroundColor: ["#007bff", "#6c757d", "#ffc107"],
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
            y: { beginAtZero: true, max: Math.max(...valores), ticks: { stepSize: 500 } },
            x: { grid: { display: false } },
        },
    };

    return (
        <div style={{ height: "250px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default GraficoGastoCategoria;