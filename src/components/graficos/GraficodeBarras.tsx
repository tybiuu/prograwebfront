import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
const GraficodeBarras = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 15 },
                },
            },
            y: {
                grid: { display: true },
                beginAtZero: true,
                ticks: {
                    font: { size: 15 },
                },
            },
        },
    };
    return options
}
export default GraficodeBarras