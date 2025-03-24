import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAcciones } from '../../../store/slices/accionesSlice'
function Acciones() {

const dispatch = useDispatch();
const accionesData = useSelector((state) => state.acciones.data);
const isLoading = useSelector((state) => state.acciones.isLoading); // Opcional, si manejas un estado de carga

useEffect(() => {
  dispatch(fetchAcciones()); // Llama a la acción para obtener los datos desde el backend
}, [dispatch]);

if (isLoading) {
  return <p>Cargando datos...</p>;
}
  
  const headers = [
    { title: "Identificación", colSpan: 10 ,  bgColor: "bg-yellow-600"},
    { title: "Análisis", colSpan: 4,  bgColor: "bg-yellow-400" },
    { title: "Plan de Acción", colSpan: 5,  bgColor: "bg-blue-300" },
    { title: "Verificación", colSpan: 9,  bgColor: "bg-green-300" },
  ];

  const subHeaders = [
    { title: "Consecutivo ", colSpan: 1,  bgColor: "bg-yellow-100"},
    { title: "Fecha ", colSpan: 1,  bgColor: "bg-yellow-100"},
    { title: "Proceso ", colSpan: 1,  bgColor: "bg-yellow-100"},
    { title: "Origen", colSpan: 6,  bgColor: "bg-yellow-100" },
    { title: "Descripcion del Hallazgo", colSpan: 1 ,  bgColor: "bg-yellow-100"},
    { title: "Acción", colSpan: 3 ,  bgColor: "bg-yellow-300"},
    { title: "Causas ", colSpan: 1,  bgColor: "bg-yellow-300" },
    
    { title: " Descripcion de las acciones", colSpan: 1,  bgColor: "bg-blue-200" },
    { title: " Logros esperados", colSpan: 1,  bgColor: "bg-blue-200" },
    { title: " Recursos / Presupuesto", colSpan: 1,  bgColor: "bg-blue-200"},
    { title: " Responsable", colSpan: 1,  bgColor: "bg-blue-200"},

    { title: " Fecha", colSpan: 1,  bgColor: "bg-blue-200" },
    { title: " Criterios de verificación", colSpan: 1,  bgColor:"bg-green-200" },
    { title: " Hallazgo de verificación", colSpan: 1,  bgColor: "bg-green-200" },
    
    { title: " Fecha", colSpan: 2,  bgColor: "bg-green-200"},
    { title: " Estado", colSpan: 1,  bgColor: "bg-green-200"},

    { title: " Cierre", colSpan: 4,  bgColor: "bg-green-200"},





  ];

  const subSubHeaders = [
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: "Auditoría", colSpan: 1 ,  bgColor: "bg-gray-400"},
    { title: " QRS", colSpan: 1 ,  bgColor: "bg-gray-400"},
    { title: " Satisfacción", colSpan: 1,  bgColor: "bg-gray-400"},
    { title: " Autocontrol", colSpan: 1,  bgColor: "bg-gray-400"},
    { title: " Análisis de riesgos", colSpan: 1,  bgColor: "bg-gray-400"},
    { title: " Prod. no conforme", colSpan: 1,  bgColor: "bg-gray-400"},
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },

    { title: "Corrección ", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Correctiva", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Preventiva", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },

    { title: "Propuesta ", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },
    { title: "Verificación", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Eficacia", colSpan: 1,  bgColor: "bg-gray-400" },

    { title: " ", colSpan: 1,  bgColor: "bg-gray-100" },

    { title: "SI", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "NO ", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Auditor", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Observaciones ", colSpan: 1,  bgColor: "bg-gray-400" },



  ];
  

  const getColor = (x) => {
    const uno=new Date(x.fecha)
    const dos= new Date(x.fecha_propuesta)
    const dos1= Date.now()
    const tres= new Date(dos1)
    const cuatro= x.cierre_si.toUpperCase()
    const diferenciaDias = (uno.getTime() - tres.getTime()) / (1000 * 60 * 60 * 24);
    console.log(tres)
    return cuatro ==="SI"? "⚪⚪🟢": diferenciaDias >= 30 ? "🔴⚪⚪" : 8 > diferenciaDias < 20  ? "⚪🟡⚪" :  "⚪⚪⚪";
  };

  const data = accionesData?.map((item, i) => {
  
    return {
      consecutivo: String(i + 1).padStart(4, "0"),
      fecha: item.fecha 
      ? new Date(item.fecha).toLocaleDateString('es-CO', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }) 
      : "N/A",
      proceso: item.proceso || "N/A",
      Auditoria:item.origen.toUpperCase() === "AUDITORIA" ? "X" : "",
      QRS: item.origen.toUpperCase() === "QRS" ? "X" : "",
      Satisfacción: item.origen.toUpperCase() === "SATISFACCION" ? "X" : "",
      Autocontrol: item.origen.toUpperCase() === "AUTOCONTROL" ? "X" : "",
      Analisis: item.origen.toUpperCase() === "ANALISIS_RIESGOS" ? "X" : "",
      Produc_no_conforme: item.origen.toUpperCase() === "PROD_NO_CONFORME" ? "X" : "",
      descripcionHallazgo: item.descripcion_hallazgo || "N/A",
      correccion: item.accion.toUpperCase() === "CORRECCION" ? "X" : "",
      correctiva: item.accion.toUpperCase() === "CORRECTIVA" ? "X" : "",
      preventiva: item.accion.toUpperCase() === "PREVENTIVA" ? "X" : "",
      causas: item.causas || "N/A",
      descripcionAcciones: item.descripcion_hallazgo || "N/A",
      logrosEsperados: item.logros_esperados || "N/A",
      recursosRequeridos: item.recursos_presupuesto || "N/A",
      responsable: item.responsable || "N/A",
      fechaPropuesta: item.fecha 
      ? new Date(item.fecha_propuesta).toLocaleDateString('es-CO', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }) 
      : "N/A",
      
      criteriosVerificacion: item.criterios_verificacion || "N/A",
      hallazgoVerificacion: item.hallazgo_verificacion || "N/A",
      fechaVerificacion: item.fecha_verificacion
      ? new Date(item.fecha_verificacion).toLocaleDateString('es-CO', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }) 
      : "N/A",
      fechaeficacia: item.fecha_eficacia 
      ? new Date(item.fecha_eficacia).toLocaleDateString('es-CO', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }) 
      : "N/A",
      estado: getColor(item),
      si: item.cierre_si.toUpperCase() === "SI" ? "X" : "",
      no: item.cierre_no.toUpperCase() === "SI" ? "X" : "",
      auditor: item.auditor || "N/A",
      observaciones: item.observaciones || ""
    };
  }) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


  return (
    
   
   
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Acciones de Mejora</h2>

      <div className="max-w-screen-lg mx-auto overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-max w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} colSpan={header.colSpan} className={`border px-2 py-1 text-center ${header.bgColor}`}>{header.title}</th>
            ))}
          </tr>
          <tr className="bg-gray-300 text-left">
            {subHeaders.map((subHeader, index) => (
              <th key={index} colSpan={subHeader.colSpan} className={`border px-2 py-1 text-center ${subHeader.bgColor}`}>{subHeader.title}</th>
            ))}
          </tr>
          <tr className="bg-gray-400 text-left">
            {subSubHeaders.map((subSubHeader, index) => (
              <th key={index} className={`border px-2 py-1 text-center ${subSubHeader.bgColor}`}>{subSubHeader.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border">
                {Object.values(row).map((cell, colIndex) => (
                  <td key={colIndex} className="border px-2 py-1 text-center whitespace-nowrap">
                    {cell || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>

  

    </div>
    <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-3 py-1 bg-gray-200 rounded">Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Acciones