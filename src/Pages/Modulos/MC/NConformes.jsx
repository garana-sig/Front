import { useState } from "react";

function NConformes() {
  const headers = [
    { title: "Identificación", colSpan: 10 ,  bgColor: "bg-yellow-600"},
    { title: "Análisis", colSpan: 4,  bgColor: "bg-yellow-400" },
    { title: "Plan de Acción", colSpan: 5,  bgColor: "bg-blue-300" },
    { title: "Verificación", colSpan: 8,  bgColor: "bg-green-300" },
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
    { title: "SI", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "NO ", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Auditor", colSpan: 1,  bgColor: "bg-gray-400" },
    { title: "Observaciones ", colSpan: 1,  bgColor: "bg-gray-400" },



  ];

  const [data, setData] = useState([
    {
      consecutivo: "0001",
      fecha: "05/02/2025",
      proceso: "Calidad",
      auditoria: "X",
      qrs: "",
      satisfaccion: "",
      autocontrol: "",
      analisis: "",
      pdto_no_conforme: "",
      descripcionHallazgo: "Fallo en el control de calidad",
      correccion: "Revisión inmediata",
      correctiva: "Capacitación al equipo",
      preventiva: "Mejora del procedimiento",
      causas: "Error humano",
      descripcionAcciones: "Actualizar documentos",
      logrosEsperados: "Reducción de errores",
      recursos: "Tiempo, capacitación",
      propuesta: "10/02/2025",
      criteriosVerificacion: "Auditoría interna",
      hallazgoVerificacion: "Correcto",
      verificacion: "SI",
      eficacia_si: "X",
      eficacia_no: "",
      auditor: "María López"
    }
  ]);

  const handleInputChange = (rowIndex, key, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][key] = value;
    setData(updatedData);
  };
  
  return (
    <div className="relative flex items-center justify-center h-screen translate-y-[-50px] bg-gray-100 overflow-hidden">

<div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 text-sm">
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border">
              {Object.entries(row).map(([key, value], colIndex) => (
                <td key={colIndex} className="border px-2 py-1 text-center">
                  <input 
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                    className="w-full text-center border-none focus:outline-none bg-transparent"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>
  )
}

export default NConformes