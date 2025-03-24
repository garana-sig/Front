import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardCharts = ({ barData, pieData, scatterData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Gráfico de barras */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Ventas Mensuales</h2>
        <BarChart width={300} height={250} data={barData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>
      
      {/* Gráfico de pastel */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Participación de Mercado</h2>
        <PieChart width={300} height={250}>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
      
      {/* Gráfico de dispersión */}
      <div className="p-4 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Relación Producción vs Costos</h2>
        <ScatterChart width={300} height={250}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Producción" />
          <YAxis type="number" dataKey="y" name="Costos" />
          <ZAxis range={[60, 400]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Datos" data={scatterData} fill="#8884d8" />
        </ScatterChart>
      </div>
    </div>
  );
};

// Datos de ejemplo
const barDataExample = [
  { month: "Ene", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
];

const pieDataExample = [
  { name: "Producto A", value: 400 },
  { name: "Producto B", value: 300 },
  { name: "Producto C", value: 300 },
  { name: "Producto D", value: 200 },
];

const scatterDataExample = [
  { x: 100, y: 200 },
  { x: 120, y: 300 },
  { x: 170, y: 250 },
];

// Uso del componente con datos de ejemplo
const ResultadosCharts = () => {
  return <DashboardCharts barData={barDataExample} pieData={pieDataExample} scatterData={scatterDataExample} />;
};

export default ResultadosCharts;
