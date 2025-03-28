import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asíncrona para obtener los indicadores desde el backend
export const fetchMandoIntegral = createAsyncThunk(
    "mandoIntegral/fetchData",
    async () => {
      const response = await fetch("http://localhost:3000/mando-integral");
      return response.json();
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
        });
    },
});

export const { openModal, closeModal } = MandoIntegralSlice.actions;
export default MandoIntegralSlice.reducer;
