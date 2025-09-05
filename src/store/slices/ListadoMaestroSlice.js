import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Estados y enums según el backend
export const ESTADOS_DOCUMENTO = {
  BORRADOR: 'borrador',
  PENDIENTE_APROBACION: 'pendiente_aprobacion',
  APROBADO: 'aprobado',
  RECHAZADO: 'rechazado',
  EN_REVISION: 'en_revision',
  OBSOLETO: 'obsoleto'
};

export const PROCESOS = {
  DIRECCION_Y_PLANEACION_ESTRATEGICA: 'DIRECCION Y PLANEACION ESTRATEGICA',
  GESTION_DE_LA_CALIDAD_Y_SST: 'GESTION DE LA CALIDAD Y SST',
  GESTION_DE_CLIENTES: 'GESTION DE CLIENTES',
  GESTION_DE_PRODUCCION: 'GESTION DE PRODUCCION',
  GESTION_DE_TALENTO_HUMANO: 'GESTIÓN DE TALENTO HUMANO',
  GESTION_DE_PROVEEDORES: 'GESTION DE PROVEEDORES',
  GESTION_CONTABLE_Y_FINANCIERA: 'GESTION CONTABLE Y FINANCIERA'
};

export const TIPOS_DOCUMENTO = {
  MANUAL: 'manual',
  PROCEDIMIENTO: 'procedimiento',
  REGISTRO: 'registro',
  INSTRUCTIVO: 'instructivo'
};

// Obtener la URL base de la API desde las variables de entorno (Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_BASE_URL = `${API_URL}/listado-maestro`;

// Acciones asíncronas

// Obtener todos los documentos con filtros
export const fetchDocumentos = createAsyncThunk(
  'listadoMaestro/fetchDocumentos',
  async (filtros = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener documentos');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Crear nuevo documento
export const createDocumento = createAsyncThunk(
  'listadoMaestro/createDocumento',
  async (documentoData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear documento');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Crear documento con código automático
export const createDocumentoWithAutoCode = createAsyncThunk(
  'listadoMaestro/createDocumentoWithAutoCode',
  async (documentoData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auto-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear documento con código automático');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Actualizar documento
export const updateDocumento = createAsyncThunk(
  'listadoMaestro/updateDocumento',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar documento');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Aprobar documento
export const aprobarDocumento = createAsyncThunk(
  'listadoMaestro/aprobarDocumento',
  async (cambiarEstadoData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${cambiarEstadoData.documentoId}/aprobar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cambiarEstadoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al aprobar documento');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Rechazar documento
export const rechazarDocumento = createAsyncThunk(
  'listadoMaestro/rechazarDocumento',
  async (cambiarEstadoData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${cambiarEstadoData.documentoId}/rechazar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cambiarEstadoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al rechazar documento');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Cambiar estado genérico
export const cambiarEstado = createAsyncThunk(
  'listadoMaestro/cambiarEstado',
  async (cambiarEstadoData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${cambiarEstadoData.documentoId}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cambiarEstadoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cambiar estado');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Obtener estadísticas
export const fetchEstadisticas = createAsyncThunk(
  'listadoMaestro/fetchEstadisticas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/resumen`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener estadísticas');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Exportar a Excel
export const exportarExcel = createAsyncThunk(
  'listadoMaestro/exportarExcel',
  async (filtros = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/export/excel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filtros }),
      });

      if (!response.ok) {
        throw new Error('Error al exportar a Excel');
      }

      // Descargar archivo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `listado-maestro-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return { message: 'Archivo exportado exitosamente' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Generar código automático
export const generarCodigoAutomatico = createAsyncThunk(
  'listadoMaestro/generarCodigoAutomatico',
  async ({ proceso, tipoDocumento }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/codigo/generate/${proceso}/${tipoDocumento}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al generar código');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Validar código
export const validarCodigo = createAsyncThunk(
  'listadoMaestro/validarCodigo',
  async (codigo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/codigo/validate/${codigo}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al validar código');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Eliminar documento
export const eliminarDocumento = createAsyncThunk(
  'listadoMaestro/eliminarDocumento',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar documento');
      }

      const data = await response.json();
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Estado inicial
const initialState = {
  documentos: [],
  documentoSeleccionado: null,
  estadisticas: {
    total: 0,
    porEstado: [],
    porProceso: [],
    porTipo: []
  },
  filtros: {
    proceso: '',
    tipoDocumento: '',
    estado: '',
    responsable: '',
    busqueda: '',
    activo: true
  },
  paginacion: {
    pagina: 1,
    porPagina: 20,
    total: 0,
    totalPaginas: 0
  },
  ui: {
    loading: false,
    error: null,
    success: null,
    modalAbierto: false,
    tipoModal: null, // 'crear', 'editar', 'aprobar', 'rechazar'
    showFiltros: false,
    vistaActual: 'tabla' // 'tabla', 'cards'
  },
  codigosGenerados: {
    ultimoCodigo: null,
    validacion: null,
    loading: false
  }
};

// Slice
const listadoMaestroSlice = createSlice({
  name: 'listadoMaestro',
  initialState,
  reducers: {
    // UI Actions
    setLoading: (state, action) => {
      state.ui.loading = action.payload;
    },
    setError: (state, action) => {
      state.ui.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.ui.success = action.payload;
    },
    clearMessages: (state) => {
      state.ui.error = null;
      state.ui.success = null;
    },
    setModalAbierto: (state, action) => {
      state.ui.modalAbierto = action.payload;
    },
    setTipoModal: (state, action) => {
      state.ui.tipoModal = action.payload;
    },
    toggleFiltros: (state) => {
      state.ui.showFiltros = !state.ui.showFiltros;
    },
    setVistaActual: (state, action) => {
      state.ui.vistaActual = action.payload;
    },

    // Filtros Actions
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    resetFiltros: (state) => {
      state.filtros = {
        proceso: '',
        tipoDocumento: '',
        estado: '',
        responsable: '',
        busqueda: '',
        activo: true
      };
    },

    // Paginación Actions
    setPagina: (state, action) => {
      state.paginacion.pagina = action.payload;
    },
    setPorPagina: (state, action) => {
      state.paginacion.porPagina = action.payload;
      state.paginacion.pagina = 1; // Resetear a primera página
    },

    // Documento Actions
    setDocumentoSeleccionado: (state, action) => {
      state.documentoSeleccionado = action.payload;
    },
    clearDocumentoSeleccionado: (state) => {
      state.documentoSeleccionado = null;
    },

    // Códigos Actions
    clearCodigoValidacion: (state) => {
      state.codigosGenerados.validacion = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Documentos
    builder
      .addCase(fetchDocumentos.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(fetchDocumentos.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.documentos = action.payload.data || [];
        state.paginacion.total = action.payload.total || 0;
        state.paginacion.totalPaginas = Math.ceil(state.paginacion.total / state.paginacion.porPagina);
      })
      .addCase(fetchDocumentos.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Create Documento
    builder
      .addCase(createDocumento.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(createDocumento.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
        state.documentos.unshift(action.payload.data);
        state.paginacion.total += 1;
      })
      .addCase(createDocumento.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Create Documento with Auto Code
    builder
      .addCase(createDocumentoWithAutoCode.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(createDocumentoWithAutoCode.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = `${action.payload.message} - Código: ${action.payload.codigoGenerado}`;
        state.documentos.unshift(action.payload.data);
        state.paginacion.total += 1;
        state.codigosGenerados.ultimoCodigo = action.payload.codigoGenerado;
      })
      .addCase(createDocumentoWithAutoCode.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Update Documento
    builder
      .addCase(updateDocumento.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(updateDocumento.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
        const index = state.documentos.findIndex(doc => doc._id === action.payload.data._id);
        if (index !== -1) {
          state.documentos[index] = action.payload.data;
        }
        if (state.documentoSeleccionado && state.documentoSeleccionado._id === action.payload.data._id) {
          state.documentoSeleccionado = action.payload.data;
        }
      })
      .addCase(updateDocumento.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Aprobar Documento
    builder
      .addCase(aprobarDocumento.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(aprobarDocumento.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
        const index = state.documentos.findIndex(doc => doc._id === action.payload.data._id);
        if (index !== -1) {
          state.documentos[index] = action.payload.data;
        }
      })
      .addCase(aprobarDocumento.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Rechazar Documento
    builder
      .addCase(rechazarDocumento.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(rechazarDocumento.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
        const index = state.documentos.findIndex(doc => doc._id === action.payload.data._id);
        if (index !== -1) {
          state.documentos[index] = action.payload.data;
        }
      })
      .addCase(rechazarDocumento.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Cambiar Estado
    builder
      .addCase(cambiarEstado.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(cambiarEstado.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
        const index = state.documentos.findIndex(doc => doc._id === action.payload.data._id);
        if (index !== -1) {
          state.documentos[index] = action.payload.data;
        }
      })
      .addCase(cambiarEstado.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Fetch Estadísticas
    builder
      .addCase(fetchEstadisticas.pending, (state) => {
        state.ui.loading = true;
      })
      .addCase(fetchEstadisticas.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.estadisticas = action.payload;
      })
      .addCase(fetchEstadisticas.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Exportar Excel
    builder
      .addCase(exportarExcel.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(exportarExcel.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
      })
      .addCase(exportarExcel.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });

    // Generar Código Automático
    builder
      .addCase(generarCodigoAutomatico.pending, (state) => {
        state.codigosGenerados.loading = true;
      })
      .addCase(generarCodigoAutomatico.fulfilled, (state, action) => {
        state.codigosGenerados.loading = false;
        state.codigosGenerados.ultimoCodigo = action.payload.codigo;
      })
      .addCase(generarCodigoAutomatico.rejected, (state, action) => {
        state.codigosGenerados.loading = false;
        state.ui.error = action.payload;
      });

    // Validar Código
    builder
      .addCase(validarCodigo.pending, (state) => {
        state.codigosGenerados.loading = true;
      })
      .addCase(validarCodigo.fulfilled, (state, action) => {
        state.codigosGenerados.loading = false;
        state.codigosGenerados.validacion = action.payload;
      })
      .addCase(validarCodigo.rejected, (state, action) => {
        state.codigosGenerados.loading = false;
        state.ui.error = action.payload;
      });

    // Eliminar Documento
    builder
      .addCase(eliminarDocumento.pending, (state) => {
        state.ui.loading = true;
        state.ui.error = null;
      })
      .addCase(eliminarDocumento.fulfilled, (state, action) => {
        state.ui.loading = false;
        state.ui.success = action.payload.message;
        // Marcar como inactivo en lugar de remover
        const index = state.documentos.findIndex(doc => doc._id === action.payload.id);
        if (index !== -1) {
          state.documentos[index] = action.payload.data;
        }
      })
      .addCase(eliminarDocumento.rejected, (state, action) => {
        state.ui.loading = false;
        state.ui.error = action.payload;
      });
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setSuccess,
  clearMessages,
  setModalAbierto,
  setTipoModal,
  toggleFiltros,
  setVistaActual,
  setFiltros,
  resetFiltros,
  setPagina,
  setPorPagina,
  setDocumentoSeleccionado,
  clearDocumentoSeleccionado,
  clearCodigoValidacion
} = listadoMaestroSlice.actions;

// Selectores memoizados
export const selectListadoMaestro = (state) => state.listadoMaestro;
export const selectDocumentos = (state) => state.listadoMaestro.documentos;
export const selectDocumentoSeleccionado = (state) => state.listadoMaestro.documentoSeleccionado;
export const selectEstadisticas = (state) => state.listadoMaestro.estadisticas;
export const selectFiltros = (state) => state.listadoMaestro.filtros;
export const selectPaginacion = (state) => state.listadoMaestro.paginacion;
export const selectUI = (state) => state.listadoMaestro.ui;
export const selectCodigosGenerados = (state) => state.listadoMaestro.codigosGenerados;

// Selectores computados
export const selectDocumentosPorEstado = (estado) => (state) =>
  state.listadoMaestro.documentos.filter(doc => doc.estado === estado);

export const selectDocumentosPorProceso = (proceso) => (state) =>
  state.listadoMaestro.documentos.filter(doc => doc.proceso === proceso);

export const selectDocumentosActivos = (state) =>
  state.listadoMaestro.documentos.filter(doc => doc.activo);

export const selectTotalDocumentos = (state) => state.listadoMaestro.documentos.length;

export const selectDocumentosPendientesAprobacion = (state) =>
  state.listadoMaestro.documentos.filter(doc => doc.estado === ESTADOS_DOCUMENTO.PENDIENTE_APROBACION);

export default listadoMaestroSlice.reducer;