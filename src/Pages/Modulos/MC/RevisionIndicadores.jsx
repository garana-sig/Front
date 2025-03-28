import { useState, useEffect } from "react";
import { Table, Button, Modal, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchMandoIntegral } from "../../../store/slices/MandoIntegralSlice";


function RevisionIndicadores() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.mandoIntegral || {});

  useEffect(() => {
    dispatch(fetchMandoIntegral());
  }, [dispatch]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const openModal = (record) => {
    setSelectedIndicator(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedIndicator(null);
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Cuadro de Mando Integral</h2>

      <div className="max-w-screen-lg mx-auto overflow-x-auto border border-gray-300 rounded-lg shadow-md bg-white p-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Iniciativa Estratégica</th>
              <th className="p-2 border">Objetivo</th>
              <th className="p-2 border">Perspectiva</th>
              <th className="p-2 border">Tipo de Indicador</th>
              <th className="p-2 border">Nombre Indicador</th>
              <th className="p-2 border">Cómo se mide (Fórmula)</th>
              <th className="p-2 border">Responsable</th>
              <th className="p-2 border">Frecuencia de Medición</th>
              <th className="p-2 border">Definición / Interpretación</th>
              <th className="p-2 border">Meta</th>
              <th className="p-2 border">A quien se Divulga</th>
              <th className="p-2 border">Resultado</th>
              <th className="p-2 border">Ingresar Datos</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="p-2 border">{record.iniciativaEstrategica}</td>
                <td className="p-2 border">{record.objetivo}</td>
                <td className="p-2 border">{record.perspectiva}</td>
                <td className="p-2 border">{record.tipoIndicador}</td>
                <td className="p-2 border">{record.nombreIndicador}</td>
                <td className="p-2 border">{record.formula?.expresionLegible || "N/A"}</td>
                <td className="p-2 border">{record.responsable}</td>
                <td className="p-2 border">{record.frecuenciaMedicion}</td>
                <td className="p-2 border">{record.definicionInterpretacion}</td>
                <td className="p-2 border">{record.meta}</td>
                <td className="p-2 border">{record.aQuienSeDivulga}</td>
                <td className="p-2 border">{record.resultado}</td>
                <td className="p-2 border">
                  <button 
                    className="px-3 py-1 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                    onClick={() => openModal(record)}
                  >
                    Ingresar Datos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Ingresar Datos</h3>
            {selectedIndicator && (
              <div>
                <p><strong>Indicador:</strong> {selectedIndicator.nombreIndicador}</p>
                <p><strong>Fórmula:</strong> {selectedIndicator.formula?.expresionLegible || "N/A"}</p>
                <input type="text" placeholder="Ingrese valores" className="border p-2 w-full mt-2" />
                <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600">Calcular</button>
              </div>
            )}
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevisionIndicadores;
