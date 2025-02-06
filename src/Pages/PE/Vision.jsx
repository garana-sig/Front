import React from 'react'
import '../PE/mision.css'; // Archivo CSS para animaciones.
import vision from '../PE/vision.png';
import garana from '../PE/Garana_logo.png'

function Vision() {
  return (
   <div className="mision-container flex flex-col items-center space-y-2 pt-0">
          <div className="pb-0 flex items-center w-full max-w-5xl space-x-4 pl-6">
           {/* Imagen al lado izquierdo */}
           <img src={garana} alt="Garana Logo" style={{ width: '450px' }} />
   
           {/* Título */}
           <h1 className="font-meditative text-6xl text-[#6f7b2c]">
             VISION
           </h1>
         </div>
        
         {/* Card */}
         <div className="card-container max-w-3xl w-full flex items-center bg-gradient-to-r from-[#6f7b2c] to-[#b8c181] p-6 rounded-lg shadow-lg mt-0">
           {/* Imagen */}
           <div className="flex-shrink-0">
             <img src={vision} alt="Misión" className="w-72 h-auto rounded-lg" />
           </div>
           
           {/* Texto */}
           <div className="ml-6 text-white">
             <p className="font-meditative text-2xl text-center">
             INDECON tendrá una rentabilidad sostenible, mediante el posicionamiento de su marca “Garana art”,  y mayor participación en el mercado nacional e internacional, con un ambiente extraordinario de trabajo, un equipo humano altamente motivado y una cultura de excelencia operativa, que garanticen la fidelización de sus clientes.
             </p>
           </div>
         </div>
       </div>
  )
}

export default Vision