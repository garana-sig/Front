import axios from 'axios';

const BASE_URL = 'URL_DE_TU_API'; // Reemplaza con tu URL real

export const formatosService = {
  // Método para obtener todos los formatos
  getFormatos: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/formatos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener formatos:', error);
      throw error;
    }
  },

  // Método para obtener un formato por ID
  getFormatoById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/formatos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener formato ${id}:`, error);
      throw error;
    }
  },

  // Método para crear un nuevo formato
  createFormato: async (formatoData) => {
    try {
      const response = await axios.post(`${BASE_URL}/formatos`, formatoData);
      return response.data;
    } catch (error) {
      console.error('Error al crear formato:', error);
      throw error;
    }
  },

  // Método para actualizar un formato
  updateFormato: async (id, formatoData) => {
    try {
      const response = await axios.put(`${BASE_URL}/formatos/${id}`, formatoData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar formato ${id}:`, error);
      throw error;
    }
  }
};