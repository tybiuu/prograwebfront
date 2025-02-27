import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface GraficoGastoMensualProps {
    gastosMes: Record<string, number>;
}

const GraficoGastoMensual = ({ gastosMes }: GraficoGastoMensualProps) => {
    const labels = Object.keys(gastosMes);
    const valores = Object.values(gastosMes);

    const data = {
        labels,
        datasets: [
            {
                label: "Gastos mensuales",
                data: valores,
                backgroundColor: "#007bff",
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

export default GraficoGastoMensual;