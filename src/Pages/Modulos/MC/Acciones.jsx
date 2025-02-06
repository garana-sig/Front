import { useState } from "react";

function Acciones() {
  
  const headers = [
    { title: "Identificación", colSpan: 10 ,  bgColor: "bg-yellow-600"},
    { title: "Análisis", colSpan: 4,  bgColor: "bg-yellow-400" },
    { title: "Plan de Acción", colSpan: 5,  bgColor: "bg-blue-300" },
    { title: "Verificación", colSpan: 7,  bgColor: "bg-green-300" },
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
    { title: " Fecha", colSpan: 1,  bgColor: "bg-blue-200" },
    { title: " Criterios de verificación", colSpan: 1,  bgColor:"bg-blue-200" },
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
  
  const data = [
   
    {
      consecutivo: "0001",
      fecha: "05/02/2025",
      proceso: "Calidad",
      origen: "Interno",
      descripcionHallazgo: "Fallo en el control de calidad",
      correccion: "Revisión inmediata",
      accionCorrectiva: "Capacitación al equipo",
      accionPreventiva: "Mejora del procedimiento",
      causas: "Error humano",
      descripcionAcciones: "Actualizar documentos",
      logrosEsperados: "Reducción de errores",
      recursosRequeridos: "Tiempo, capacitación",
      responsable: "Juan Pérez",
      fechaPropuesta: "10/02/2025",
      criteriosVerificacion: "Auditoría interna",
      hallazgoVerificacion: "Correcto",
      fechaVerificacion: "15/02/2025",
      verificacion: "Aprobado",
      eficacia: "Sí",
      si: "X",
      no: "",
      auditor: "María López"
    },
    {
      consecutivo: "0001",
      fecha: "05/02/2025",
      proceso: "Calidad",
      origen: "Interno",
      descripcionHallazgo: "Fallo en el control de calidad",
      correccion: "Revisión inmediata",
      accionCorrectiva: "Capacitación al equipo",
      accionPreventiva: "Mejora del procedimiento",
      causas: "Error humano",
      descripcionAcciones: "Actualizar documentos",
      logrosEsperados: "Reducción de errores",
      recursosRequeridos: "Tiempo, capacitación",
      responsable: "Juan Pérez",
      fechaPropuesta: "10/02/2025",
      criteriosVerificacion: "Auditoría interna",
      hallazgoVerificacion: "Correcto",
      fechaVerificacion: "15/02/2025",
      verificacion: "Aprobado",
      eficacia: "Sí",
      si: "X",
      no: "",
      auditor: "María López"
    },
    {
      consecutivo: "0001",
      fecha: "05/02/2025",
      proceso: "Calidad",
      origen: "Interno",
      descripcionHallazgo: "Fallo en el control de calidad",
      correccion: "Revisión inmediata",
      accionCorrectiva: "Capacitación al equipo",
      accionPreventiva: "Mejora del procedimiento",
      causas: "Error humano",
      descripcionAcciones: "Actualizar documentos",
      logrosEsperados: "Reducción de errores",
      recursosRequeridos: "Tiempo, capacitación",
      responsable: "Juan Pérez",
      fechaPropuesta: "10/02/2025",
      criteriosVerificacion: "Auditoría interna",
      hallazgoVerificacion: "Correcto",
      fechaVerificacion: "15/02/2025",
      verificacion: "Aprobado",
      eficacia: "Sí",
      si: "X",
      no: "",
      auditor: "María López"
    }
    ,
    {
      consecutivo: "0001",
      fecha: "05/02/2025",
      proceso: "Calidad",
      origen: "Interno",
      descripcionHallazgo: "Fallo en el control de calidad",
      correccion: "Revisión inmediata",
      accionCorrectiva: "Capacitación al equipo",
      accionPreventiva: "Mejora del procedimiento",
      causas: "Error humano",
      descripcionAcciones: "Actualizar documentos",
      logrosEsperados: "Reducción de errores",
      recursosRequeridos: "Tiempo, capacitación",
      responsable: "Juan Pérez",
      fechaPropuesta: "10/02/2025",
      criteriosVerificacion: "Auditoría interna",
      hallazgoVerificacion: "Correcto",
      fechaVerificacion: "15/02/2025",
      verificacion: "Aprobado",
      eficacia: "Sí",
      si: "X",
      no: "",
      auditor: "María López"
    }
    , {
      consecutivo: "0001",
      fecha: "05/02/2025",
      proceso: "Calidad",
      origen: "Interno",
      descripcionHallazgo: "Fallo en el control de calidad",
      correccion: "Revisión inmediata",
      accionCorrectiva: "Capacitación al equipo",
      accionPreventiva: "Mejora del procedimiento",
      causas: "Error humano",
      descripcionAcciones: "Actualizar documentos",
      logrosEsperados: "Reducción de errores",
      recursosRequeridos: "Tiempo, capacitación",
      responsable: "Juan Pérez",
      fechaPropuesta: "10/02/2025",
      criteriosVerificacion: "Auditoría interna",
      hallazgoVerificacion: "Correcto",
      fechaVerificacion: "15/02/2025",
      verificacion: "Aprobado",
      eficacia: "Sí",
      si: "X",
      no: "",
      auditor: "María López"
    }
  ];


  return (
    
   
   
<div className="relative overflow-x-auto overflow-y-auto flex items-center justify-center h-screen translate-y-[-50px] bg-gray-100 overflow-hidden">
 

 <div className="overflow-x-auto p-4">
 <h2 className="text-4xl font-bold mb-4 text-center">Acciones de Mejora</h2>
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
              {Object.values(row).map((cell, colIndex) => (
                <td key={colIndex} className="border px-2 py-1 text-center">{cell || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

  

    </div>
</div>

  )
}

export default Acciones