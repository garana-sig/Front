import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from '../store/slices/documentsSlice';
import accionesReducer from '../store/slices/accionesSlice'
import mandoIntegralReducer from '../store/slices/MandoIntegralSlice'
import listadoMaestroReducer from '../store/slices/ListadoMaestroSlice'

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    acciones: accionesReducer,
    mandoIntegral: mandoIntegralReducer,
    listadoMaestro: listadoMaestroReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

