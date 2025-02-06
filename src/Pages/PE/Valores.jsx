import React from 'react';
import '../PE/mision.css'; // Archivo CSS para animaciones.
import valores from '../PE/valores.png';
import garana from '../PE/Garana_logo.png'

function Valores() {
  return (
     <div className="mision-container flex flex-col items-center space-y-2 pt-0">
           <div className="pb-0 flex items-center w-full max-w-5xl space-x-4 pl-6">
            {/* Imagen al lado izquierdo */}
            <img src={garana} alt="Garana Logo" style={{ width: '450px' }} />
    
            {/* Título */}
            <h1 className="font-meditative text-6xl text-[#6f7b2c]">
              VALORES
            </h1>
          </div>
         
          {/* Card */}
          <div className="card-container max-w-3xl w-full flex items-center bg-gradient-to-r from-[#6f7b2c] to-[#b8c181] p-6 rounded-lg shadow-lg mt-0">
            {/* Imagen */}
            <div className="flex-shrink-0">
              <img src={valores} alt="Misión" className="w-72 h-auto rounded-lg" />
            </div>
            
            {/* Texto */}
            <div className="ml-6 text-white">
              <p className="font-meditative text-2xl text-center">
              Honestidad: es un valor social que genera acciones de beneficio común y se refleja en la congruencia entre lo que se piensa y lo que se hace.
Responsabilidad: significa asumir las consecuencias de nuestros actos y cumplir con nuestros compromisos y obligaciones ante los demás.
Respeto: es la capacidad de reconocer, apreciar y valorar a los otros teniendo en cuenta que todos somos válidos. Requiere reciprocidad, lo que implica derechos y deberes para ambas partes. 
Amor: busca la felicidad de los demás. Las relaciones interpersonales se mantienen en forma de amistad. Induce el bienestar en los otros, y nos esforzamos por agradar y quererlos a todos.
Lealtad: es la fidelidad que se tiene en las acciones y comportamientos

              </p>
            </div>
          </div>
        </div>
  )
}

export default Valores