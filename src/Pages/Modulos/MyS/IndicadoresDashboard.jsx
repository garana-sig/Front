import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { fetchMandoIntegral } from "../../../store/slices/MandoIntegralSlice";
import { useDispatch, useSelector } from "react-redux";

const IndicadoresDashboard = () => {
    const [indicadores, setIndicadores] = useState([]);
    const [filtro, setFiltro] = useState("");
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.mandoIntegral || {});
    
    useEffect(() => {
      dispatch(fetchMandoIntegral());
    }, [dispatch]);
    
    const parseMeta = (meta) => {
      if (typeof meta === "string") {
        const numericValue = parseFloat(meta.replace(/[^0-9.]/g, "")) || 0;
        return {
          value: numericValue,
          operator: meta.includes("<") ? "<" : ">"
        };
      }
      return { value: parseFloat(meta) || 0, operator: ">" };
    };
    
    useEffect(() => {
      if (data) {
        const datac = data.map((item) => {
          const metaParsed = parseMeta(item.meta);
          const resultado = parseFloat(item.resultado) || 0;
          const cumpleMeta = metaParsed.operator === "<" ? resultado < metaParsed.value : resultado >= metaParsed.value;
          
          return {
            nombre: item.nombreIndicador,
            responsable: item.responsable,
            proceso: item.ProcesoFuenteInformacion,
            meta: metaParsed.value,
            resultado,
            color: cumpleMeta ? "#28a745" : "#dc3545"
          };
        });
        setIndicadores(datac);
      }
    }, [data]);
    
    const indicadoresFiltrados = indicadores.filter(item => 
      filtro === "" || item.responsable === filtro || item.proceso === filtro
    );
    
    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Indicadores 2024</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filtrar por Responsable o Proceso:</label>
        <select 
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={filtro} 
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="">Todos</option>
          {[...new Set(indicadores.map(item => item.responsable).concat(indicadores.map(item => item.proceso)))]
            .filter(Boolean)
            .map((opcion, index) => (
              <option key={index} value={opcion}>{opcion}</option>
            ))}
        </select>
      </div>

      <div className="max-w-screen-lg mx-auto overflow-x-auto border border-gray-300 rounded-lg shadow-md bg-white p-4">
        <div style={{ width: "100%", height: 400 }}>
          <h2>Dashboard de Indicadores</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={indicadoresFiltrados} layout="vertical">
              <XAxis type="number" domain={[0, 'auto']} />
              <YAxis type="category" dataKey="nombre" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="meta" fill="#f5b400" name="Meta" barSize={15}>
                <LabelList dataKey="meta" position="right" fill="#333" />
              </Bar>
              <Bar dataKey="resultado" name="Resultado" barSize={15} shape={(props) => {
                const { x, y, width, height, payload } = props;
                return <rect x={x} y={y} width={width} height={height} fill={payload.color} />;
              }}>
                <LabelList dataKey="resultado" position="right" fill="#333" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndicadoresDashboard;

