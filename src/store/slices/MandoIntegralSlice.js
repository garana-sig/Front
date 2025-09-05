import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Obtener la URL base de la API desde las variables de entorno (Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Obtener indicadores
export const fetchMandoIntegral = createAsyncThunk(
  "mandoIntegral/fetchData",
  async () => {
    const response = await axios.get(`${API_URL}/mando-integral`);
    return response.data;
  }
);

// Editar valores del indicador
export const updateMandoIntegral = createAsyncThunk(
  "mandoIntegral/update",
  async ({updatedIndicator, id}) => {
  
    console.log("llega desde el fron", id)
    const response = await fetch(`${API_URL}/mando-integral/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIndicator), // 📹 Envía todo el objeto actualizado
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el indicador");
    }

    return await response.json(); // 📹 Retorna el objeto actualizado
  }
);

const MandoIntegralSlice = createSlice({
    name: "mandoIntegral",
    initialState: {
      data: [], // <- Estado inicial válido
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMandoIntegral.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMandoIntegral.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchMandoIntegral.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateMandoIntegral.fulfilled, (state, action) => {
          state.data = state.data.map((item) =>
            item._id === action.payload._id ? action.payload : item
        );
      });
  },
});

export const { openModal, closeModal } = MandoIntegralSlice.actions;
export default MandoIntegralSlice.reducer;