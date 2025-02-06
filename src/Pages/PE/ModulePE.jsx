import { Routes, Route, useNavigate } from 'react-router-dom';
import {  Bolt, ChartPie, ChartSpline, Home, ShieldMinus, Telescope } from 'lucide-react';
import Modulo from './../Modulos/Modulo';
import Mision from './Mision';
import Vision from './Vision';
import Valores from './Valores';
import Objetivos from './Objetivos';
import Indicadores from './Indicadores';
import Dofa from './Dofa';
import PEHome from './PEHome';


function ModulePE() {
    const navigate = useNavigate();
  
    const menuItems = [
      {
        icon: Home,
        label: 'Volver al Inicio',
        onClick: () => navigate('/dashboard')
      },
      {
        icon: ShieldMinus,
        label: 'Misión',
        onClick: () => navigate('/PlanE/mision')
      }
      ,
      {
        icon: Telescope,
        label: 'Visión',
        onClick: () => navigate('/PlanE/vision')
      }
      ,
      {
        icon: ShieldMinus,
        label: 'Valores',
        onClick: () => navigate('/PlanE/valores')
      }
      ,
      {
        icon: Bolt,
        label: 'Objetivos',
        onClick: () => navigate('/PlanE/objetivos')
      }
      ,
      {
        icon: ChartSpline,
        label: 'Indicadores',
        onClick: () => navigate('/PlanE/indicadores')
      }
      ,
      {
        icon: ChartPie,
        label: 'Matriz Dofa',
        onClick: () => navigate('/PlanE/dofa')
      }
      // Puedes agregar más items del menú aquí
    ];
  
    return (
      <Modulo
        title="Plan Estrategico"
        menuItems={menuItems}
      >
        <Routes>
          <Route index element={<PEHome />} />
          <Route path="vision" element={<Vision />} />
          <Route path="mision" element={<Mision />} />
          <Route path="objetivos" element={<Objetivos />} />
          <Route path="valores" element={<Valores />} />
          <Route path="indicadores" element={<Indicadores />} />
          <Route path="dofa" element={<Dofa />} />





        </Routes>
      </Modulo>
    );
  }
  
 
  

export default ModulePE