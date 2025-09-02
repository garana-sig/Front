import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMandoIntegral, updateMandoIntegral} from "../../../store/slices/MandoIntegralSlice";
import logito from '../../../../src/assets/img/Logotipo7.png'


function RevisionIndicadores() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [variableValues, setVariableValues] = useState({}); // Estado para los valores ingresados
  const [inputValues, setInputValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [responsableFilter, setResponsableFilter] = useState("");
  const recordsPerPage = 4;


  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.mandoIntegral || {});

  useEffect(() => {
    dispatch(fetchMandoIntegral());
  }, [dispatch]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // Filtros
  const filteredData = data?.filter((record) => !responsableFilter || record.responsable === responsableFilter) || [];
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  const responsables = [...new Set(data?.map((record) => record.responsable))];

  // Función para abrir el modal con los datos del indicador
  const openModal = (record) => {
    setSelectedIndicator(record);
    
    // Inicializar valores de las variables con los valores actuales
    const initialValues = {};
    record.formula?.variables.forEach((variable) => {
      initialValues[variable.identificador] = record.valoresVariables?.[variable.identificador] || "";
    });

    setVariableValues(initialValues);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedIndicator(null);
    setVariableValues({});
  };

  // Manejar cambio en los inputs
  const handleChange = (identifier, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [identifier]: parseFloat(value) || 0, // Convertir a número
    }));
  };

  // Enviar datos al backend
  const handleSubmit = () => {
    console.log(inputValues)
    console.log(typeof(selectedIndicator._id))
    if (selectedIndicator) {
      const updatedIndicator = {
        
        iniciativaEstrategica: selectedIndicator.iniciativaEstrategica,
        objetivo: selectedIndicator.objetivo,
        perspectiva: selectedIndicator.perspectiva,
        tipoIndicador: selectedIndicator.tipoIndicador,
        nombreIndicador: selectedIndicator.nombreIndicador,
        valoresVariables: { ...inputValues }, // Asegurar que valoresVariables sea un objeto
        ProcesoFuenteInformacion: selectedIndicator.ProcesoFuenteInformacion,
        responsable: selectedIndicator.responsable,
        frecuenciaMedicion: selectedIndicator.frecuenciaMedicion,
        definicionInterpretacion: selectedIndicator.definicionInterpretacion,
        meta: selectedIndicator.meta,
        aQuienSeDivulga: selectedIndicator.aQuienSeDivulga,
        medida: selectedIndicator.medida,
        formula: selectedIndicator.formula?._id || selectedIndicator.formula || null,
      };
     
  
      dispatch(updateMandoIntegral({ updatedIndicator, id: selectedIndicator._id })); 
      closeModal();
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Cuadro de Mando Integral</h2>

      <div className="mb-4">
        <label className="mr-2">Filtrar por Responsable:</label>
        <select
          className="border p-2"
          value={responsableFilter}
          onChange={(e) => {
            setResponsableFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todos</option>
          {responsables.map((resp) => (
            <option key={resp} value={resp}>{resp}</option>
          ))}
        </select>
      </div>

      <div className="max-w-screen-lg mx-auto overflow-x-auto border border-gray-300 rounded-lg shadow-md bg-white p-4">
        <table style={{fontSize: '11px'}} className="w-full  border-collapse">
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
          {paginatedData.map((record) => (
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

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded mr-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-3">Página {currentPage} de {totalPages}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded ml-2"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>


 {/* MODAL */}
 {isModalVisible && (
 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
 <div className="bg-gradient-to-b from-[#6dbd96] to-white p-6 rounded-lg shadow-lg w-1/3">
   <div className="flex items-center justify-between mb-4">
  <h3 className="text-lg font-bold">Ingresar Datos</h3>
  <img src={logito} alt="Logotipo" className="w-64 h-40" />
</div>
      {selectedIndicator && (
        <div>
          <p><strong>Indicador:</strong> {selectedIndicator.nombreIndicador}</p>
          <p><strong>Fórmula:</strong> {selectedIndicator.formula?.expresionLegible || "N/A"}</p>
  
          {/* Generar dinámicamente los inputs */}
          {selectedIndicator.formula?.variables?.map((variable) => (
            <div key={variable.identificador} className="mt-2">
              <label className="block font-semibold">{variable.nombre}</label>
              <input
                type="number"
                placeholder={`Ingrese ${variable.nombre}`}
                className="border p-2 w-full mt-1"
                value={inputValues[variable.identificador] || ""}
                onChange={(e) => handleChange(variable.identificador, e.target.value)}
              />
            </div>
          ))}
  
          {/* Contenedor Flex para Botones */}
          <div className="flex justify-end gap-3 mt-4">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600"
              onClick={handleSubmit}
            >
              Enviar
            </button>
            <button 
              onClick={closeModal} 
              className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
            >
              Cerrar
            </button>

  
          </div>
             
        
        </div>
      )}
    </div>
  </div>
      )}
    </div>
  );
}

export default RevisionIndicadores;
