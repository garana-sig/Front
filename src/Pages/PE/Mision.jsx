import '../PE/mision.css'; // Archivo CSS para animaciones.
import mision from '../PE/mision1.png';
import garana from '../PE/Garana_logo.png'

function Mision() {
  
  return (
    <div className="mision-container flex flex-col items-center space-y-2 pt-0">
       <div className="pb-0 flex items-center w-full max-w-5xl space-x-4 pl-6">
        {/* Imagen al lado izquierdo */}
        <img src={garana} alt="Garana Logo" style={{ width: '450px' }} />

        {/* Título */}
        <h1 className="font-meditative text-6xl text-[#6f7b2c]">
          MISION
        </h1>
      </div>
     
      {/* Card */}
      <div className="card-container max-w-3xl w-full flex items-center bg-gradient-to-r from-[#6f7b2c] to-[#b8c181] p-6 rounded-lg shadow-lg mt-0">
        {/* Imagen */}
        <div className="flex-shrink-0">
          <img src={mision} alt="Misión" className="w-72 h-auto rounded-lg" />
        </div>
        
        {/* Texto */}
        <div className="ml-6 text-white">
          <p className="font-meditative text-3xl text-center">
            Confeccionar y comercializar trajes de baño cómodos e innovadores, en una empresa consolidada, versátil, competente y con capacidad de adaptación, enfocada en la satisfacción de sus clientes, el bienestar y la seguridad de sus colaboradores, apoyados en la mejora continua de procesos y la competencia laboral.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Mision;
