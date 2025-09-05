import { useState } from 'react';
import policies from './Politicas_garana.pdf';

function Politicas() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const pdfUrl = policies;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Politicas Garana</h1>
        
        {/* Botón de descarga mejorado */}
        <a 
          href={pdfUrl} 
          download="Politicas_Garana.pdf"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar PDF
        </a>
      </div>

      {/* Contenedor del PDF con mejor responsive */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="text-gray-600">Cargando PDF...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="h-96 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error al cargar el PDF</p>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Abrir en nueva pestaña
              </a>
            </div>
          </div>
        )}

        {/* PDF Viewer con mejor altura y responsive */}
        <iframe 
          src={`${pdfUrl}#view=FitH&toolbar=1&navpanes=0`}
          className={`w-full transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } 
          h-[70vh] min-h-[500px] max-h-[800px]`}
          title="Brochure Garana"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ 
            border: 'none',
            background: '#f5f5f5'
          }}
        />
      </div>

      {/* Controles adicionales */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Abrir en nueva pestaña
        </a>
        
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimir
        </button>
      </div>
    </div>
  );
}

export default Politicas;