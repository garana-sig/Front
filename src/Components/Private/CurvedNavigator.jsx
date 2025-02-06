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
    { id: 'sig', icon: FileText, label: 'SIG', path: '/sig' },
    { id: 'sst', icon: BarChart2, label: 'SST', path: '/sst' },
    { id: 'gdocumental', icon: BarChart2, label: 'Gestión Documental', path: '/gd' },
    { id: 'mejoramiento', icon: Target, label: 'Mejoramiento Continúo', path: '/mc' },
    { id: 'estrategico', icon: Users, label: 'Plan Estrategico', path: '/PlanE' },
    { id: 'medicion', icon: Cog, label: 'Medición y Seguimiento', path: '/mys' },
    { id: 'bienestar', icon: ScanHeart, label: 'Bienestar', path: '/bien' },
    
    
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

      <div className=" text-[#2e5244] relative h-full mt-40 flex items-center justify-center">
        <div className="flex justify-center items-end gap-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            // Aumentamos el ángulo para una curva más pronunciada y la invertimos
            const angle = 30 - (index * (60 / (modules.length - 1)));
            const radius = 200; // Radio aumentado para mayor curvatura
            
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  navigate(module.path);
                }}
                className={`
                  transform
                  flex flex-col items-center justify-center
                  w-48 h-48 rounded-full transition-all duration-300
                  backdrop-blur-lg backdrop-filter
                  ${activeModule === module.id 
                    ? 'bg-white text-[#6f7b2c] scale-110 shadow-2xl' 
                    : 'bg-white/20  hover:bg-white/30 shadow-lg'}
                  hover:scale-105
                `}
                style={{
                  transform: `translate(${Math.sin(angle * Math.PI / 180) * radius}px, ${-Math.cos(angle * Math.PI / 180) * radius}px)`,
                  boxShadow: activeModule === module.id 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(255, 255, 255, 0.3)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)'
                }}
              >
                <Icon size={32} className={`mb-2 ${activeModule === module.id ? 'drop-shadow-md' : 'drop-shadow'}`} />
                <span className={`text-sm  font-medium px-1 ${activeModule === module.id ? 'text-[#6f7b2c]' : 'text-[#2e5244]'}`}>
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