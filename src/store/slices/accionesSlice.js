import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para obtener datos del backend
export const fetchAcciones = createAsyncThunk("acciones/fetchAcciones", async () => {
  const response = await axios.get("http://localhost:3000/acciones-mejora/");
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
