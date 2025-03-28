import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from '../store/slices/documentsSlice';
import accionesReducer from '../store/slices/accionesSlice'
import mandoIntegralReducer from '../store/slices/MandoIntegralSlice'

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    acciones: accionesReducer,
    mandoIntegral: mandoIntegralReducer,
  }
});