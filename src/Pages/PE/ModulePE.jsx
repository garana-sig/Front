import { Routes, Route, useNavigate } from 'react-router-dom';
import { Bolt, ChartPie, ChartSpline, Home, ShieldMinus, Telescope } from 'lucide-react';
import Modulo from './../Modulos/Modulo';
import Mision from '../../Garbage.May/Mision';
import Vision from '../../Garbage.May/Vision';
import Valores from '../../Garbage.May/Valores';
import Objetivos from './Objetivos';
import Indicadores from './Indicadores';
import Dofa from '../../Garbage.May/Dofa';
import PEHome from './PEHome';
import Brochure from './Brochure';
import RevisionIndicadores from './RevisionIndicadores';
import Politicas from './Politicas';


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
      label: 'Brochure',
      onClick: () => navigate('/PlanE/brochure')
    }
    ,
    {
      icon: Telescope,
      label: 'Cuadro de Mando Integral',
      onClick: () => navigate('/PlanE/cmi')
    }
    ,
    {
      icon: ShieldMinus,
      label: 'Mapa de Objetivos',
      onClick: () => navigate('/PlanE/mapobjective')
    }
    ,
    {
      icon: Bolt,
      label: 'Politicas',
      onClick: () => navigate('/PlanE/policies')
    }

    // Puedes agregar más items del menú aquí
  ];

  return (
    <Modulo
      title="Planeaciobn Estrategica"
      menuItems={menuItems}
    >
      <Routes>
        <Route index element={<PEHome />} />
        <Route path="brochure" element={<Brochure />} />
        <Route path="cmi" element={<RevisionIndicadores />} />
        <Route path="mapobjective" element={<Objetivos />} />
        <Route path="policies" element={<Politicas />} />
      </Routes>
    </Modulo>
  );
}




export default ModulePE