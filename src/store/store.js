import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from '../store/slices/documentsSlice';

export const store = configureStore({
  reducer: {
    documents: documentsReducer
  }
});