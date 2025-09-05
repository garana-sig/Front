import { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

const ModifyFormatModal = ({ isOpen, onClose, documento, onSubmit }) => {
  // Estado para manejar los campos del formulario
  const [formData, setFormData] = useState({
    version: documento?.version || '',
    nombre: documento?.nombre || '',
    motivoCambio: '',
    usuarioPropone: '',
    formatoId: documento?._id || ''
  });
  
  // Estado para manejar el archivo modificado
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({});
  
  // Estado para manejar el loading del submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validar que al menos un campo haya cambiado O se haya seleccionado un archivo
    const hasVersionChanged = formData.version !== documento?.version;
    const hasNameChanged = formData.nombre !== documento?.nombre;
    const hasFileSelected = selectedFile !== null;
    
    if (!hasVersionChanged && !hasNameChanged && !hasFileSelected) {
      newErrors.general = 'Debe modificar al menos un campo (versión, nombre) o seleccionar un archivo modificado';
    }
    
    // Validar motivo del cambio (obligatorio)
    if (!formData.motivoCambio.trim()) {
      newErrors.motivoCambio = 'El motivo del cambio es obligatorio';
    }
    
    // Validar longitud mínima del motivo
    if (formData.motivoCambio.trim() && formData.motivoCambio.trim().length < 10) {
      newErrors.motivoCambio = 'El motivo debe tener al menos 10 caracteres';
    }

    // Validar usuario propone
    if (!formData.usuarioPropone.trim()) {
      newErrors.usuarioPropone = 'El usuario que propone es obligatorio';
    }

    // Validar tipo de archivo si se seleccionó uno
    if (selectedFile) {
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/plain', // .txt
        'application/pdf', // .pdf
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'text/csv' // .csv
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        newErrors.archivoModificado = 'Tipo de archivo no permitido. Use: Excel (.xlsx, .xls), PDF, Word (.docx), CSV o TXT';
      }
      
      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        newErrors.archivoModificado = 'El archivo es demasiado grande. Máximo permitido: 10MB';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview({
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      // Limpiar error de archivo si había
      if (errors.archivoModificado) {
        setErrors(prev => ({
          ...prev,
          archivoModificado: ''
        }));
      }
    }
  };

  // Función para remover archivo seleccionado
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    // Limpiar el input file
    const fileInput = document.getElementById('archivo-modificado');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Función para formatear tamaño de archivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Crear FormData para enviar archivo y datos
      const submitData = new FormData();
      
      // Agregar los campos según la imagen de la API
      submitData.append('motivoCambio', formData.motivoCambio.trim());
      submitData.append('usuarioPropone', formData.usuarioPropone.trim());
      submitData.append('formatoId', formData.formatoId);
      
      // Solo incluir campos que realmente cambiaron
      if (formData.version !== documento.version) {
        submitData.append('version', formData.version.trim());
      }
      
      if (formData.nombre !== documento.nombre) {
        submitData.append('nombre', formData.nombre.trim());
      }
      
      // Agregar archivo si se seleccionó
      if (selectedFile) {
        submitData.append('archivoModificado', selectedFile);
      }
      
      await onSubmit(submitData);
      
      // Resetear formulario y cerrar modal
      handleClose();
      
    } catch (error) {
      setErrors({
        general: 'Error al enviar la propuesta. Intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setFormData({
      version: documento?.version || '',
      nombre: documento?.nombre || '',
      motivoCambio: '',
      usuarioPropone: '',
      formatoId:documento._id,
    });
    setSelectedFile(null);
    setFilePreview(null);
    setErrors({});
    onClose();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen || !documento) return null;

  return (
    // Overlay del modal con fondo oscuro
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Proponer Modificación
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido del modal */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Información del documento actual */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Documento Actual:</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Código:</span> {documento.codigo}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Versión Actual:</span> {documento.version}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">ID Formato:</span> {documento._id}
            </p>
          </div>

          {/* Error general */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{errors.general}</span>
            </div>
          )}
          {/** */}

           {/* Campo id */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
             formatoId
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.formatoId ? 'border-red-300' : 'border-gray-300'
              }`}
              value={formData.formatoId}
              onChange={(e) => handleInputChange('version', e.target.value)}
              placeholder={ documento._id}
            />
            {errors.version && (
              <p className="text-sm text-red-600 mt-1">{errors.formatoId}</p>
            )}
          </div>

          {/** */}

          {/* Campo Versión */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Versión
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.version ? 'border-red-300' : 'border-gray-300'
              }`}
              value={formData.version}
              onChange={(e) => handleInputChange('version', e.target.value)}
              placeholder="Ej: v2.0, 1.1, etc."
            />
            {errors.version && (
              <p className="text-sm text-red-600 mt-1">{errors.version}</p>
            )}
          </div>

          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Documento
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nombre ? 'border-red-300' : 'border-gray-300'
              }`}
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              placeholder="Ingrese el nuevo nombre"
            />
            {errors.nombre && (
              <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Campo Motivo del Cambio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo del Cambio *
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.motivoCambio ? 'border-red-300' : 'border-gray-300'
              }`}
              rows="4"
              value={formData.motivoCambio}
              onChange={(e) => handleInputChange('motivoCambio', e.target.value)}
              placeholder="Describa detalladamente el motivo de la modificación..."
            />
            {errors.motivoCambio && (
              <p className="text-sm text-red-600 mt-1">{errors.motivoCambio}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 10 caracteres
            </p>
          </div>

          {/* Campo Usuario Propone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario que Propone *
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.usuarioPropone ? 'border-red-300' : 'border-gray-300'
              }`}
              value={formData.usuarioPropone}
              onChange={(e) => handleInputChange('usuarioPropone', e.target.value)}
              placeholder="Nombre del usuario"
            />
            {errors.usuarioPropone && (
              <p className="text-sm text-red-600 mt-1">{errors.usuarioPropone}</p>
            )}
          </div>

         

          {/* Sección para subir archivo modificado */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📎 Archivo Modificado (Opcional)
            </label>
            
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="archivo-modificado"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".xlsx,.xls,.txt,.pdf,.docx,.csv"
                />
                <label
                  htmlFor="archivo-modificado"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Haga clic para seleccionar archivo
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Excel, PDF, Word, CSV, TXT (máx. 10MB)
                  </span>
                </label>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {filePreview.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(filePreview.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remover archivo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            
            {errors.archivoModificado && (
              <p className="text-sm text-red-600 mt-1">{errors.archivoModificado}</p>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              💡 Si selecciona un archivo, este reemplazará al archivo actual cuando la propuesta sea aprobada.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Enviar Propuesta
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyFormatModal;