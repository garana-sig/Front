import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from '../store/slices/documentsSlice';
import accionesReducer from '../store/slices/accionesSlice'

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    acciones: accionesReducer,
  }
});