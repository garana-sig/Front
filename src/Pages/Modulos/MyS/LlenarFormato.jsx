import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredDocuments, downloadDocument } from '../../../store/slices/documentsSlice';

const LlenarFormato = () => {
  const dispatch = useDispatch();
  const [selectedDocumento, setSelectedDocumento] = useState(null);
  const [formData, setFormData] = useState({});

  // Obtener la lista de documentos filtrados
  const documentos = useSelector((state) => selectFilteredDocuments(state, 'Perfil Empleados', 'RE-GS-01'));

  const handleDocumentoSelect = (documento) => {
    setSelectedDocumento(documento);
    setFormData(documento);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Guardar los datos actualizados del documento
    await fetch(`/api/formatos/${selectedDocumento.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Notificar al responsable
    await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient: selectedDocumento.responsable, message: 'Nuevo formato guardado' }),
    });
  };

  return (
    <div>
      <h1>Llenar Formato</h1>
      <div>
        <h2>Selecciona un documento</h2>
        <select value={selectedDocumento?.id} onChange={(e) => handleDocumentoSelect(documentos.find((d) => d.id === e.target.value))}>
          <option value="">Selecciona un documento</option>
          {documentos.map((documento) => (
            <option key={documento.id} value={documento.id}>
              {documento.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedDocumento && (
        <div>
          <h2>{selectedDocumento.nombre}</h2>
          <form>
            {Object.keys(formData).map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{field}:</label>
                <input
                  type="text"
                  id={field}
                  value={formData[field]}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={handleSave}>
              Guardar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LlenarFormato;