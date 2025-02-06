import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Thunk para obtener todos los documentos
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    try {
      const response = await fetch('http://localhost:3000/formatos/all');
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
      const response = await fetch(`http://localhost:3000/formatos/download/${fileUrl}`);
      if (!response.ok) throw new Error('Error al descargar documento');
      return await response.blob();
    } catch (error) {
      throw error;
    }
  }
);

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllDocuments = state => state.documents.items;
export const selectStatus = state => state.documents.status;
export const selectError = state => state.documents.error;

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


export default documentsSlice.reducer;
