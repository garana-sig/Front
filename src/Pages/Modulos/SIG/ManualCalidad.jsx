import manual from './manual_calidad.pdf'

function ManualCalidad() {
  const pdfUrl = manual;

  return (
    <div className='ml-10'>
      <h1 className="text-2xl font-bold mb-4">Manual de Calidad</h1>
      
      {/* Visualización del PDF */}
      <iframe 
        src={pdfUrl} 
        className="w-full h-96 mb-4" 
        title="Manual de Calidad"
      ></iframe>

      {/* Botón para descargar */}
      <a 
        href={pdfUrl} 
        download="Manual_Calidad.pdf" 
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800"
      >
        Descargar PDF
      </a>
    </div>
  );
}

export default ManualCalidad;