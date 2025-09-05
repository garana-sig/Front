import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Obtener la URL base de la API desde las variables de entorno (Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Acción asíncronica para obtener datos del backend
export const fetchAcciones = createAsyncThunk("acciones/fetchAcciones", async () => {
  const response = await axios.get(`${API_URL}/acciones-mejora/`);
  return response.data; // Suponiendo que la API devuelve un array de acciones
});

const accionesSlice = createSlice({
  name: "acciones",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null
  },
  reducers: {}, // Si necesitas otros reducers, agrégalos aquí
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcciones.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAcciones.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAcciones.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default accionesSlice.reducer;