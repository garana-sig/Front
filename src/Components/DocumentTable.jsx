import { FileText, Download, Eye, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments, 
  downloadDocument,
  selectFilteredDocuments,
  selectStatus,
  selectError 
 } from '../store/slices/documentsSlice';

const DocumentTable = ({ titulo, proceso }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;

  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const documents = useSelector(state => selectFilteredDocuments(state, proceso, titulo));

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc =>
      doc.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documents, searchTerm]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument, 
    indexOfLastDocument
  );

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDocuments());
    }
    setCurrentPage(1);
  }, [status, dispatch, searchTerm]);

  const handleDownload = async (documento) => {
    try {
      const blob = await dispatch(downloadDocument(documento.archivo.url)).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documento.archivo.nombre;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === 'loading') return <div>Cargando...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="p-4 text-sm font-meditative">
      <div className='flex justify-between items-center mb-6'>
        <div className='text-4xl font-bold text-[#9d9101] tracking-wider text-center'>
          {titulo} {proceso}
        </div>
        
        <button
          className="bg-[#9d9101] text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200"
          onClick={() => navigate('/sig/estructura')}
        >
          <LogOut className="w-5 h-5" /> Volver
        </button>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <span className="font-medium text-black">Buscar por nombre:</span>
        <input
          type="text"
          placeholder="Ingrese el nombre del documento"
          className="border border-gray-300 rounded px-2 py-1 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contenedor con altura fija y scroll vertical */}
      <div className="overflow-y-auto" style={{ maxHeight: '340px' }}>
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Ver</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Código</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Vigencia</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Versión</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Procedencia</th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc) => (
              <tr key={doc._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-blue-100 rounded"
                      onClick={() => handleDownload(doc)}
                    >
                      <Download className="w-4 h-4 text-blue-600" />
                    </button>
                    
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">{doc.codigo}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.vigencia}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.version}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{doc.proceso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        
        <span className="px-4">
          Página {currentPage} de {totalPages}
        </span>
        
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="p-2 border rounded disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DocumentTable;