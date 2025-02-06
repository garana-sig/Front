/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import admin from '../SIG/admin.png'
import garana from '../../../assets/img/Garana_logo.png'
import sst from '../SIG/SST.png'
import cliente from '../SIG/cliente.png'
import dir from '../SIG/ejecutivo.png'
import humana from '../SIG/humana.png'
import produccion from '../SIG/produccion.png'
import proveedor from '../SIG/proveedor.png'
import { useNavigate } from "react-router-dom";



const segments = [
  {
    title: "G. Administrativa",
    color: "bg-transparent",
    icon: "🤝",
    image: admin,
  },
  
  {
    title: "G. Calidad y SST",
    color: "bg-transparent",
    icon: "✔️",
    image: sst,
  },
  {
    title: "G. Clientes",
    color: "",
    icon: "🔒",
    image: cliente,
  },
  {
    title: "G. Dirección",
    color: "",
    icon: "💡",
    image: dir,
  },
  {
    title: "G. Humana",
    color: "",
    icon: "📄",
    image: humana,
  },
  {
    title: "G. Producción",
    color: "",
    icon: "✔️",
    image: produccion
  },
  {
    title: "G. Proveedores",
    color: "",
    icon: "❤️",
    image:  proveedor,
  },
];

export default function EstructuraDocumental() {
  const [activeSegment, setActiveSegment] = useState(null);
  const navigate = useNavigate();

  const handleDocumentClick = (tipo) => {
    const proceso = segments[activeSegment].title
      .toLowerCase()
      .replace('g. ', '')
      .replace(/\s+/g, '-')
      .replace('í', 'i') // Para manejar tildes
      .replace('ó', 'o');
      
    // Mantener la ruta /estructura y agregar el proceso y tipo
    navigate(`/sig/estructura/${proceso}/${tipo}`);
  };
  return (
    <div className="relative flex items-center justify-center h-screen translate-y-[-50px] bg-gray-100 overflow-hidden">
      {/* Centro */}
      <div className="absolute flex flex-col items-center justify-center w-48 h-48 bg-white rounded-full shadow-md z-10">
        <img
          src={garana}// Reemplaza con la ruta de tu logo
          alt="Logo"
          className="w-150 h-150"
        />
        <span>SIG</span>
      </div>

      {/* Segmentos rotatorios */}
      <motion.div
        className="relative flex items-center justify-center w-96 h-96"
        animate={{ rotate: activeSegment === null ? 360 : 0 }}
      >
        {segments.map((segment, index) => (
          <Segment
            key={index}
            {...segment}
            index={index}
            onClick={() => setActiveSegment(index)}
          />
        ))}
      </motion.div>

      {/* Submenú */}
      {activeSegment !== null && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4">
              {segments[activeSegment].title}
            </h2>
            <ul className="space-y-2">
  <li 
    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
    onClick={() => handleDocumentClick('formatos')}
  >
    Formatos
  </li>
  <li 
    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
    onClick={() => handleDocumentClick('instructivos')}
  >
    Instructivos
  </li>
  <li 
    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
    onClick={() => handleDocumentClick('procedimientos')}
  >
    Procedimientos
  </li>
</ul>
            <button
              className="mt-4 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
              onClick={() => setActiveSegment(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Segment({ title, color, image, index, onClick }) {
  const angle = (360 / segments.length) * index;
  const rotation = `rotate(${angle}deg) translate(12rem) rotate(-${angle}deg)`;

  return (
    
    <motion.div
      className={`absolute w-28 h-28 flex items-center justify-center rounded-full ${color}  hover:scale-110 hover:shadow-xl transition-transform duration-300 cursor-pointer group`}
      style={{ transform: rotation }}
      
      onClick={onClick}
    >

      
      <img src={image} alt={title} className="w-30 h-30" />
      <div className="absolute top-full mt-2  text-lime-950 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {title}
      </div>
    </motion.div>
  );
}
