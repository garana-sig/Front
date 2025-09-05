/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Target,
  Users,
  Settings,
  Leaf,
  BarChart2,
  Cog,
  ScanHeart,
} from 'lucide-react';

const CurvedNavigator = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    { id: 'gdocumental', icon: BarChart2, label: 'Estructura Documental - Red Procesos', path: '/gd' },
    { id: 'PlanE', icon: FileText, label: 'Planeación Estrategica', path: '/PlanE' },
    { id: 'mejoramiento', icon: Target, label: 'Mejoramiento Continúo', path: '/mc' },
    { id: 'sst', icon: BarChart2, label: 'SST', path: '/sst' },    
  ];

  return (
    <div className=" fixed inset-0 w-full h-full overflow-hidden ">
      {/* Fondo con gradiente moderno */}
      <div className=" absolute inset-0 bg-gradient-to-br from-[#6dbd96]  to-[#dedecc] opacity-90" />
      
      {/* Efecto de profundidad con círculos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
      </div>

      <div className="text-[#2e5244] relative h-full mt-40 flex items-center justify-center">
  <div className="relative flex justify-center items-center" style={{ width: '600px', height: '300px' }}>
    {modules.map((module, index) => {
      const Icon = module.icon;
      
      // Configuración del semicírculo
      const totalModules = modules.length;
      const radius = 300; // Radio del semicírculo
      
      // Ángulo desde -90° hasta +90° (semicírculo completo)
      const startAngle = 150; // Izquierda
      const endAngle = 30;    // Derecha
      const angleStep = (endAngle - startAngle) / (totalModules - 1);
      const angle = startAngle + (index * angleStep);
      
      // Convertir a radianes para los cálculos
      const angleInRadians = (angle * Math.PI) / 180;
      
      // Calcular posición x, y
      const x = Math.cos(angleInRadians) * radius;
      const y = Math.sin(angleInRadians) * radius;
      
      return (
        <button
          key={module.id}
          onClick={() => {
            setActiveModule(module.id);
            navigate(module.path);
          }}
          className={`
            absolute
            flex flex-col items-center justify-center
            w-48 h-48 rounded-full transition-all duration-300
            backdrop-blur-lg backdrop-filter
            ${activeModule === module.id 
              ? 'bg-white text-[#6f7b2c] scale-110 shadow-2xl z-10' 
              : 'bg-white/20 hover:bg-white/30 shadow-lg z-0'}
            hover:scale-105
          `}
          style={{
            // Posicionar desde el centro del contenedor
            left: `calc(50% + ${x}px - 96px)`, // 96px = w-48/2
            top: `calc(50% - ${y}px - 96px)`,  // 96px = h-48/2, y negativo porque CSS Y crece hacia abajo
            transform: `translate(0, 0) ${activeModule === module.id ? 'scale(1.1)' : 'scale(1)'}`,
            boxShadow: activeModule === module.id 
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(255, 255, 255, 0.3)' 
              : '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)'
          }}
        >
          <Icon size={32} className={`mb-2 ${activeModule === module.id ? 'drop-shadow-md' : 'drop-shadow'}`} />
          <span className={`text-sm font-medium px-1 text-center ${activeModule === module.id ? 'text-[#6f7b2c]' : 'text-[#2e5244]'}`}>
            {module.label}
          </span>
        </button>
      );
    })}
  </div>
</div>
    </div>
  );
};

export default CurvedNavigator;