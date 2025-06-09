import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GraficaProductos() {
  // Datos de ejemplo: productos más vendidos
  const data = {
    labels: ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"],
    datasets: [
      {
        label: "Ventas",
        data: [50, 75, 150, 90, 120], // Cantidades de ejemplo
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul semi-transparente
        borderColor: "rgba(54, 162, 235, 1)", // Azul sólido
        borderWidth: 1,
      },
    ],
  };

  // Opciones de la gráfica
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Productos Más Vendidos",
      },
    },
  };

  return (
    <div className="grafica-productos" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficaProductos;
