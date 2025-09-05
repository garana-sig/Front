import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Obtener la URL base de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Thunk para obtener todos los documentos
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    try {
      const response = await fetch(`${API_URL}/formatos/all`);
      if (!response.ok) throw new Error('Error al cargar documentos');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
);

// Thunk para descargar documento
export const downloadDocument = createAsyncThunk(
  'documents/downloadDocument',
  async (fileUrl) => {
    try {
      const response = await fetch(`${API_URL}/formatos/download/${fileUrl}`);
      if (!response.ok) throw new Error('Error al descargar documento');
      return await response.blob();
    } catch (error) {
      throw error;
    }
  }
);

// ¡CORREGIDO! Thunk para enviar propuesta de modificación
export const submitModificationProposal = createAsyncThunk(
  'documents/submitModificationProposal',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Received data:', data);
      console.log('Data type:', typeof data);
      console.log('Is FormData:', data instanceof FormData);
      
      let formatoId;
      let bodyFormData;
      
      // Verificar si es FormData o un objeto regular
      if (data instanceof FormData) {
        // Es FormData - extraer formatoId
        formatoId = data.get('formatoId');
        
        console.log('FormData contents:');
        for (let pair of data.entries()) {
          console.log(pair[0] + ':', pair[1]);
        }
        
        // Crear copia sin formatoId
        bodyFormData = new FormData();
        for (let pair of data.entries()) {
          if (pair[0] !== 'formatoId') {
            bodyFormData.append(pair[0], pair[1]);
          }
        }
      } else if (data && typeof data === 'object' && data.formatoId && data.proposalData) {
        // Es el formato anterior { formatoId, proposalData }
        formatoId = data.formatoId;
        bodyFormData = data.proposalData;
      } else {
        console.error('Unexpected data format:', data);
        throw new Error('Formato de datos inesperado');
      }
      
      console.log('Enviando propuesta para formato:', formatoId);
      
      // Verificar que formatoId existe
      if (!formatoId) {
        throw new Error('ID del formato es requerido');
      }

      const response = await fetch(`${API_URL}/formatos/propose/${formatoId}`, {
        method: 'POST',
        body: bodyFormData // FormData - NO establecer Content-Type manualmente
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          return rejectWithValue(errorData.message || `Error ${response.status}: ${response.statusText}`);
        } catch {
          return rejectWithValue(`Error ${response.status}: ${errorText || response.statusText}`);
        }
      }
      
      const result = await response.json();
      console.log('Success response:', result);
      return result;
      
    } catch (error) {
      console.error('Network or other error:', error);
      return rejectWithValue(error.message || 'Error de red al enviar propuesta');
    }
  }
);

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // Estado para manejar el envío de propuestas
    proposalStatus: 'idle',
    proposalError: null,
    // ¡NUEVO! Para almacenar la respuesta de la propuesta enviada
    lastProposalResponse: null
  },
  reducers: {
    // Reducer para limpiar errores de propuesta
    clearProposalError: (state) => {
      state.proposalError = null;
      state.proposalStatus = 'idle';
      state.lastProposalResponse = null;
    },
    // ¡NUEVO! Reducer para resetear el estado de propuesta
    resetProposalStatus: (state) => {
      state.proposalStatus = 'idle';
      state.proposalError = null;
      state.lastProposalResponse = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Casos existentes para fetchDocuments
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Casos para submitModificationProposal
      .addCase(submitModificationProposal.pending, (state) => {
        state.proposalStatus = 'loading';
        state.proposalError = null;
        state.lastProposalResponse = null;
      })
      .addCase(submitModificationProposal.fulfilled, (state, action) => {
        state.proposalStatus = 'succeeded';
        state.proposalError = null;
        state.lastProposalResponse = action.payload;
      })
      .addCase(submitModificationProposal.rejected, (state, action) => {
        state.proposalStatus = 'failed';
        state.proposalError = action.payload || action.error.message;
        state.lastProposalResponse = null;
      });
  },
});

// Selectores existentes
export const selectAllDocuments = state => state.documents.items;
export const selectStatus = state => state.documents.status;
export const selectError = state => state.documents.error;

// Selectores para el estado de propuestas
export const selectProposalStatus = state => state.documents.proposalStatus;
export const selectProposalError = state => state.documents.proposalError;
export const selectLastProposalResponse = state => state.documents.lastProposalResponse;

// Selector memoizado para filtrar documentos
export const selectFilteredDocuments = createSelector(
  [selectAllDocuments, (state, proceso) => proceso, (state, proceso, titulo) => titulo],
  (documents, proceso, titulo) => {
    return documents.filter(doc => 
      doc.proceso === proceso && 
      doc.tipo === titulo
    );
  }
);

// Exportar las acciones
export const { clearProposalError, resetProposalStatus } = documentsSlice.actions;

export default documentsSlice.reducer;