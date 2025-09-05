import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle,
  FileText,
  ChevronUp,
  ChevronDown,
  Eye,
  RefreshCw,
  Grid,
  List
} from 'lucide-react';

import {
  fetchDocumentos,
  fetchEstadisticas,
  aprobarDocumento,
  rechazarDocumento,
  eliminarDocumento,
  exportarExcel,
  setFiltros,
  resetFiltros,
  setPagina,
  setPorPagina,
  setModalAbierto,
  setTipoModal,
  setDocumentoSeleccionado,
  toggleFiltros,
  setVistaActual,
  clearMessages,
  selectDocumentos,
  selectFiltros,
  selectPaginacion,
  selectUI,
  selectEstadisticas,
  ESTADOS_DOCUMENTO,
  PROCESOS,
  TIPOS_DOCUMENTO
} from '../../../store/slices/ListadoMaestroSlice';


// Componente para badges de estado
const EstadoBadge = ({ estado }) => {
  const COLORES_ESTADO = {
    borrador: 'bg-gray-100 text-gray-800',
    pendiente_aprobacion: 'bg-yellow-100 text-yellow-800',
    aprobado: 'bg-green-100 text-green-800',
    rechazado: 'bg-red-100 text-red-800',
    en_revision: 'bg-blue-100 text-blue-800',
    obsoleto: 'bg-gray-100 text-gray-500'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${COLORES_ESTADO[estado] || 'bg-gray-100 text-gray-800'}`}>
      {estado?.replace(/_/g, ' ').toUpperCase()}
    </span>
  );
};

// Componente para botones de aprobación (solo gerencia)
const ApprovalButtons = ({ documento, onAprobar, onRechazar, loading }) => {
  const [esGerencia, setEsGerencia] = useState(true); // Simular permisos de gerencia
  
  if (!esGerencia || documento.estado !== ESTADOS_DOCUMENTO.PENDIENTE_APROBACION) {
    return null;
  }

  return (
    <div className="flex gap-1">
      <button
        onClick={() => onAprobar(documento)}
        disabled={loading}
        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
        title="Aprobar documento"
      >
        <CheckCircle size={16} />
      </button>
      <button
        onClick={() => onRechazar(documento)}
        disabled={loading}
        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Rechazar documento"
      >
        <XCircle size={16} />
      </button>
    </div>
  );
};

const ListadoMaestroTable = () => {
  const dispatch = useDispatch();
  
  // Selectores con validación de estado
  const documentos = useSelector(state => state.listadoMaestro?.documentos || []);
  const filtros = useSelector(state => state.listadoMaestro?.filtros || {
    proceso: '',
    tipoDocumento: '',
    estado: '',
    responsable: '',
    busqueda: '',
    activo: true
  });
  const paginacion = useSelector(state => state.listadoMaestro?.paginacion || {
    pagina: 1,
    porPagina: 20,
    total: 0,
    totalPaginas: 0
  });
  const ui = useSelector(state => state.listadoMaestro?.ui || {
    loading: false,
    error: null,
    success: null,
    modalAbierto: false,
    tipoModal: null,
    showFiltros: false,
    vistaActual: 'tabla'
  });
  const estadisticas = useSelector(state => state.listadoMaestro?.estadisticas || {
    total: 0,
    porEstado: [],
    porProceso: [],
    porTipo: []
  });

  // Estados locales
  const [ordenamiento, setOrdenamiento] = useState({ campo: '', direccion: 'asc' });
  const [busquedaLocal, setBusquedaLocal] = useState('');
  const [documentoParaAccion, setDocumentoParaAccion] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    dispatch(fetchDocumentos(filtros));
    dispatch(fetchEstadisticas());
  }, [dispatch, filtros]);

  // Filtrar y ordenar documentos
  const documentosFiltrados = useMemo(() => {
    let resultado = [...documentos];

    // Filtro de búsqueda local
    if (busquedaLocal.trim()) {
      const termino = busquedaLocal.toLowerCase();
      resultado = resultado.filter(doc =>
        doc.codigo?.toLowerCase().includes(termino) ||
        doc.nombre?.toLowerCase().includes(termino) ||
        doc.responsable?.toLowerCase().includes(termino)
      );
    }

    // Ordenamiento
    if (ordenamiento.campo) {
      resultado.sort((a, b) => {
        const valorA = a[ordenamiento.campo] || '';
        const valorB = b[ordenamiento.campo] || '';
        
        if (ordenamiento.direccion === 'asc') {
          return valorA.toString().localeCompare(valorB.toString());
        } else {
          return valorB.toString().localeCompare(valorA.toString());
        }
      });
    }

    return resultado;
  }, [documentos, busquedaLocal, ordenamiento]);

  // Paginación local
  const documentosPaginados = useMemo(() => {
    const inicio = (paginacion.pagina - 1) * paginacion.porPagina;
    const fin = inicio + paginacion.porPagina;
    return documentosFiltrados.slice(inicio, fin);
  }, [documentosFiltrados, paginacion.pagina, paginacion.porPagina]);

  // Handlers
  const handleOrdenar = (campo) => {
    setOrdenamiento(prev => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFiltroChange = (campo, valor) => {
    dispatch(setFiltros({ [campo]: valor }));
    dispatch(setPagina(1));
  };

  const handleBusquedaChange = (e) => {
    setBusquedaLocal(e.target.value);
    dispatch(setPagina(1));
  };

  const handleAprobar = (documento) => {
    const comentarios = window.prompt('Comentarios de aprobación (opcional):');
    if (comentarios !== null) {
      dispatch(aprobarDocumento({
        documentoId: documento._id,
        nuevoEstado: ESTADOS_DOCUMENTO.APROBADO,
        usuarioRevisa: 'Gerente General',
        comentarios: comentarios || 'Documento aprobado'
      }));
    }
  };

  const handleRechazar = (documento) => {
    const comentarios = window.prompt('Motivo del rechazo (requerido):');
    if (comentarios?.trim()) {
      dispatch(rechazarDocumento({
        documentoId: documento._id,
        nuevoEstado: ESTADOS_DOCUMENTO.RECHAZADO,
        usuarioRevisa: 'Gerente General',
        comentarios
      }));
    } else if (comentarios !== null) {
      alert('El motivo del rechazo es requerido');
    }
  };

  const handleEliminar = (documento) => {
    if (window.confirm(`¿Está seguro de eliminar el documento ${documento.codigo}?`)) {
      dispatch(eliminarDocumento(documento._id));
    }
  };

  const handleEditar = (documento) => {
    dispatch(setDocumentoSeleccionado(documento));
    dispatch(setTipoModal('editar'));
    dispatch(setModalAbierto(true));
  };

  const handleExportarExcel = () => {
    dispatch(exportarExcel(filtros));
  };

  const handleRefresh = () => {
    dispatch(fetchDocumentos(filtros));
    dispatch(fetchEstadisticas());
  };

  // Limpiar mensajes después de mostrarlos
  useEffect(() => {
    if (ui.error || ui.success) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [ui.error, ui.success, dispatch]);

  const IconoOrdenamiento = ({ campo }) => {
    if (ordenamiento.campo !== campo) return null;
    return ordenamiento.direccion === 'asc' ? 
      <ChevronUp size={14} className="inline ml-1" /> : 
      <ChevronDown size={14} className="inline ml-1" />;
  };

  return (
    <div className="p-6 font-meditative">
      {/* Header con título y estadísticas */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#9d9101] mb-2">
              Listado Maestro de Documentos
            </h1>
            <p className="text-gray-600">
              Gestión centralizada del sistema documental SIG
            </p>
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg text-center min-w-[80px]">
              <div className="font-bold text-blue-600 text-xl">{estadisticas.total}</div>
              <div className="text-blue-500">Total</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center min-w-[80px]">
              <div className="font-bold text-yellow-600 text-xl">
                {estadisticas.porEstado?.find(e => e._id === ESTADOS_DOCUMENTO.PENDIENTE_APROBACION)?.count || 0}
              </div>
              <div className="text-yellow-500">Pendientes</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center min-w-[80px]">
              <div className="font-bold text-green-600 text-xl">
                {estadisticas.porEstado?.find(e => e._id === ESTADOS_DOCUMENTO.APROBADO)?.count || 0}
              </div>
              <div className="text-green-500">Aprobados</div>
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {ui.error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {ui.error}
          </div>
        )}
        {ui.success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {ui.success}
          </div>
        )}
      </div>

      {/* Barra de herramientas */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Búsqueda */}
          <div className="flex-1 min-w-[300px] max-w-[400px]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por código, nombre o responsable..."
                value={busquedaLocal}
                onChange={handleBusquedaChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9d9101] focus:border-transparent"
              />
            </div>
          </div>

          {/* Controles */}
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(toggleFiltros())}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                ui.showFiltros 
                  ? 'bg-[#9d9101] text-white border-[#9d9101]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} className="inline mr-2" />
              Filtros
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={ui.loading}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={`inline mr-2 ${ui.loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>

            <button
              onClick={handleExportarExcel}
              disabled={ui.loading}
              className="px-4 py-2 bg-[#9d9101] text-white rounded-lg hover:bg-[#8a8001] transition-colors disabled:opacity-50"
            >
              <Download size={16} className="inline mr-2" />
              Excel
            </button>

            <button
              onClick={() => {
                dispatch(setTipoModal('crear'));
                dispatch(setModalAbierto(true));
              }}
              className="px-4 py-2 bg-[#9d9101] text-white rounded-lg hover:bg-[#8a8001] transition-colors"
            >
              <Plus size={16} className="inline mr-2" />
              Nuevo
            </button>
          </div>
        </div>

        {/* Panel de filtros expandible */}
        {ui.showFiltros && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proceso</label>
                <select
                  value={filtros.proceso}
                  onChange={(e) => handleFiltroChange('proceso', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9d9101] text-sm"
                >
                  <option value="">Todos los procesos</option>
                  {Object.values(PROCESOS).map(proceso => (
                    <option key={proceso} value={proceso}>{proceso}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={filtros.tipoDocumento}
                  onChange={(e) => handleFiltroChange('tipoDocumento', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9d9101] text-sm"
                >
                  <option value="">Todos los tipos</option>
                  {Object.entries(TIPOS_DOCUMENTO).map(([key, value]) => (
                    <option key={key} value={value}>{value.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => handleFiltroChange('estado', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9d9101] text-sm"
                >
                  <option value="">Todos los estados</option>
                  {Object.entries(ESTADOS_DOCUMENTO).map(([key, value]) => (
                    <option key={key} value={value}>{value.replace(/_/g, ' ').toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                <input
                  type="text"
                  placeholder="Buscar responsable..."
                  value={filtros.responsable}
                  onChange={(e) => handleFiltroChange('responsable', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#9d9101] text-sm"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  dispatch(resetFiltros());
                  setBusquedaLocal('');
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabla principal */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {ui.loading && (
          <div className="p-8 text-center">
            <RefreshCw className="animate-spin mx-auto mb-4 text-[#9d9101]" size={32} />
            <p className="text-gray-600">Cargando documentos...</p>
          </div>
        )}

        {!ui.loading && documentosFiltrados.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No se encontraron documentos con los filtros aplicados</p>
          </div>
        )}

        {!ui.loading && documentosFiltrados.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th 
                      className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOrdenar('codigo')}
                    >
                      Código <IconoOrdenamiento campo="codigo" />
                    </th>
                    <th 
                      className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOrdenar('nombre')}
                    >
                      Nombre del Documento <IconoOrdenamiento campo="nombre" />
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proceso
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th 
                      className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOrdenar('version')}
                    >
                      Ver. <IconoOrdenamiento campo="version" />
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsable
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th 
                      className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleOrdenar('fechaCreacion')}
                    >
                      Fecha <IconoOrdenamiento campo="fechaCreacion" />
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentosPaginados.map((documento, index) => (
                    <tr 
                      key={documento._id} 
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}
                    >
                      <td className="p-3 text-sm font-medium text-[#9d9101]">
                        {documento.codigo}
                      </td>
                      <td className="p-3 text-sm text-gray-900 max-w-xs">
                        <div className="truncate" title={documento.nombre}>
                          {documento.nombre}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {documento.proceso?.replace('GESTION', 'G.')?.substring(0, 15)}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {documento.tipoDocumento?.toUpperCase()}
                      </td>
                      <td className="p-3 text-sm text-gray-700 font-medium">
                        {documento.version}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {documento.responsable}
                      </td>
                      <td className="p-3">
                        <EstadoBadge estado={documento.estado} />
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {documento.fechaCreacion ? new Date(documento.fechaCreacion).toLocaleDateString('es-ES') : '-'}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditar(documento)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Editar documento"
                          >
                            <Edit3 size={16} />
                          </button>
                          
                          <ApprovalButtons 
                            documento={documento}
                            onAprobar={handleAprobar}
                            onRechazar={handleRechazar}
                            loading={ui.loading}
                          />
                          
                          <button
                            onClick={() => handleEliminar(documento)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Eliminar documento"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {((paginacion.pagina - 1) * paginacion.porPagina) + 1} a{' '}
                {Math.min(paginacion.pagina * paginacion.porPagina, documentosFiltrados.length)} de{' '}
                {documentosFiltrados.length} documentos
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={paginacion.porPagina}
                  onChange={(e) => dispatch(setPorPagina(Number(e.target.value)))}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>

                <div className="flex gap-1">
                  <button
                    onClick={() => dispatch(setPagina(Math.max(1, paginacion.pagina - 1)))}
                    disabled={paginacion.pagina === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  
                  <span className="px-3 py-1 text-sm bg-[#9d9101] text-white rounded">
                    {paginacion.pagina}
                  </span>
                  
                  <button
                    onClick={() => dispatch(setPagina(paginacion.pagina + 1))}
                    disabled={paginacion.pagina * paginacion.porPagina >= documentosFiltrados.length}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListadoMaestroTable;