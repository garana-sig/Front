import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Calculator,
  Edit3,
  X,
  Check,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  AlertCircle
} from "lucide-react";
// Aquí van tus imports de Redux:
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMandoIntegral, updateMandoIntegral } from "../../../store/slices/MandoIntegralSlice";
import { fetchMandoIntegral, updateMandoIntegral } from "../../store/slices/MandoIntegralSlice";
import { useSelector, useDispatch } from "react-redux";


function RevisionIndicadores() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [variableValues, setVariableValues] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [responsableFilter, setResponsableFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recordsPerPage = 6;

  // Aquí va tu lógica de Redux:
  // const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => state.mandoIntegral || {});

  // useEffect(() => {
  //   dispatch(fetchMandoIntegral());
  // }, [dispatch]);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.mandoIntegral || {});

  useEffect(() => {
    dispatch(fetchMandoIntegral());
  }, [dispatch]);

  // Para la demo, asumimos que tienes data, loading, error desde Redux
  //const data = []; // Tu data desde Redux
  //const loading = false; // Tu loading desde Redux  
  //const error = null; // Tu error desde Redux

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-red-700">Error al cargar los datos: {error}</p>
        </div>
      </div>
    );
  }

  // Filtros mejorados
  const filteredData = data?.filter((record) => {
    const matchesResponsable = !responsableFilter || record.responsable === responsableFilter;
    const matchesSearch = !searchTerm ||
      record.nombreIndicador?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.objetivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.perspectiva?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesResponsable && matchesSearch;
  }) || [];

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);
  const responsables = [...new Set(data?.map((record) => record.responsable))];

  const openModal = (record) => {
    setSelectedIndicator(record);
    const initialValues = {};
    record.formula?.variables?.forEach((variable) => {
      initialValues[variable.identificador] = record.valoresVariables?.[variable.identificador] || "";
    });
    setVariableValues(initialValues);
    setInputValues(initialValues);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedIndicator(null);
    setVariableValues({});
    setInputValues({});
    setIsSubmitting(false);
  };

  const handleChange = (identifier, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [identifier]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async () => {
    if (selectedIndicator && !isSubmitting) {
      setIsSubmitting(true);

      // Aquí va tu lógica de Redux para actualizar:

      const updatedIndicator = {
        iniciativaEstrategica: selectedIndicator.iniciativaEstrategica,
        objetivo: selectedIndicator.objetivo,
        perspectiva: selectedIndicator.perspectiva,
        tipoIndicador: selectedIndicator.tipoIndicador,
        nombreIndicador: selectedIndicator.nombreIndicador,
        valoresVariables: { ...inputValues },
        ProcesoFuenteInformacion: selectedIndicator.ProcesoFuenteInformacion,
        responsable: selectedIndicator.responsable,
        frecuenciaMedicion: selectedIndicador.frecuenciaMedicion,
        definicionInterpretacion: selectedIndicador.definicionInterpretacion,
        meta: selectedIndicador.meta,
        aQuienSeDivulga: selectedIndicador.aQuienSeDivulga,
        medida: selectedIndicator.medida,
        formula: selectedIndicador.formula?._id || selectedIndicador.formula || null,
      };

      try {
        await dispatch(updateMandoIntegral({ updatedIndicator, id: selectedIndicator._id }));
        setTimeout(() => {
          closeModal();
        }, 1000);
      } catch (error) {
        setIsSubmitting(false);
      }


      // Para la demo, simulo el cierre del modal
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  };

  const getPerspectiveIcon = (perspectiva) => {
    switch (perspectiva?.toLowerCase()) {
      case 'financiera': return <BarChart3 className="h-4 w-4 text-green-600" />;
      case 'resultados': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'clientes': return <Users className="h-4 w-4 text-purple-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPerspectiveColor = (perspectiva) => {
    switch (perspectiva?.toLowerCase()) {
      case 'financiera': return 'bg-green-50 border-green-200 text-green-800';
      case 'resultados': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'clientes': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedData.map((record) => (
        <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPerspectiveColor(record.perspectiva)}`}>
                {getPerspectiveIcon(record.perspectiva)}
                <span className="ml-1">{record.perspectiva}</span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{record.nombreIndicador}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{record.objetivo}</p>

            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>{record.responsable}</span>
              </div>
              <div className="flex items-center">
                <Target className="h-3 w-3 mr-1" />
                <span>Meta: {record.meta}</span>
              </div>
              <div className="flex items-center">
                <Calculator className="h-3 w-3 mr-1" />
                <span className="truncate">{record.formula?.expresionLegible || "N/A"}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-lg font-bold text-gray-900">
                {record.resultado || "—"}
              </div>
              <button
                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm"
                onClick={() => openModal(record)}
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Datos
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900">Indicador</th>
              <th className="text-left p-4 font-medium text-gray-900">Perspectiva</th>
              <th className="text-left p-4 font-medium text-gray-900">Responsable</th>
              <th className="text-left p-4 font-medium text-gray-900">Fórmula</th>
              <th className="text-left p-4 font-medium text-gray-900">Meta</th>
              <th className="text-left p-4 font-medium text-gray-900">Resultado</th>
              <th className="text-center p-4 font-medium text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">{record.nombreIndicador}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{record.objetivo}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPerspectiveColor(record.perspectiva)}`}>
                    {getPerspectiveIcon(record.perspectiva)}
                    <span className="ml-1">{record.perspectiva}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{record.responsable}</td>
                <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{record.formula?.expresionLegible || "N/A"}</td>
                <td className="p-4 text-sm font-medium text-gray-900">{record.meta}</td>
                <td className="p-4">
                  <div className="text-lg font-bold text-gray-900">{record.resultado || "—"}</div>
                </td>
                <td className="p-4 text-center">
                  <button
                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm"
                    onClick={() => openModal(record)}
                  >
                    <Edit3 className="h-3 w-3 mr-1" />
                    Ingresar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cuadro de Mando Integral</h1>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar indicadores..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  value={responsableFilter}
                  onChange={(e) => {
                    setResponsableFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Todos los responsables</option>
                  {responsables.map((resp) => (
                    <option key={resp} value={resp}>{resp}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setViewMode('table')}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                className={`p-2 rounded-lg transition-colors ${viewMode === 'cards' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setViewMode('cards')}
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Mostrando {paginatedData.length} de {filteredData.length} indicadores
          </p>
        </div>

        {/* Content */}
        {viewMode === 'cards' ? <CardView /> : <TableView />}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-8 gap-2">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentPage === i + 1
                      ? 'bg-green-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Ingresar Datos</h3>
                    <p className="text-green-100 text-sm mt-1">Actualizar valores de variables</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {selectedIndicator && (
                  <div className="space-y-6">
                    {/* Indicator Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{selectedIndicator.nombreIndicador}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Fórmula:</span>
                          <p className="font-medium text-gray-900 mt-1">{selectedIndicator.formula?.expresionLegible || "N/A"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Meta:</span>
                          <p className="font-medium text-gray-900 mt-1">{selectedIndicator.meta}</p>
                        </div>
                      </div>
                    </div>

                    {/* Variables */}
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-900">Variables</h5>
                      {selectedIndicator.formula?.variables?.map((variable) => (
                        <div key={variable.identificador} className="space-y-2">
                          <label className="block font-medium text-gray-700">
                            {variable.nombre}
                          </label>
                          <input
                            type="number"
                            step="any"
                            placeholder={`Ingrese ${variable.nombre}`}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            value={inputValues[variable.identificador] || ""}
                            onChange={(e) => handleChange(variable.identificador, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RevisionIndicadores;