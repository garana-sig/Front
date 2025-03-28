import { Routes, Route, useNavigate } from 'react-router-dom';
import { ChartNoAxesCombined, CircleFadingArrowUp,  Home, RefreshCwOff, ReplaceAll, ShieldEllipsis, ShieldQuestion, SmilePlus, UserRoundCheck } from 'lucide-react';
import Modulo from './../Modulo';
import NConformes from './NConformes';
import RevisadoxDireccion from './RevisadoxDireccion';
import RevisionIndicadores from './RevisionIndicadores';
import Acciones from './Acciones';
import MCHome from './MCHome';

function ModuleMC() {
    const navigate = useNavigate();
  
    const menuItems = [
      {
        icon: Home,
        label: 'Volver al Inicio',
        onClick: () => navigate('/dashboard')
      },
      {
        icon: CircleFadingArrowUp,
        label: 'Acciones de mejora',
        onClick: () => navigate('/mc/acciones')
      },

      {
        icon: RefreshCwOff,
        label: 'Productos no conformes',
        onClick: () => navigate('/mc/NoConformes')
      },
      {
        icon: UserRoundCheck,
        label: 'Revisión x Dirección',
        onClick: () => navigate('/mc/RxD')
      },
      {
        icon: ChartNoAxesCombined,
        label: 'Revisión Indicadores',
        onClick: () => navigate('/mc/Rev_Indicadores')
      },
      {
        icon: ShieldQuestion,
        label: 'PQRS',
        onClick: () => navigate('/mc/Rev_Indicadores')
      },
      {
        icon: ShieldEllipsis,
        label: 'Auditoría',
        onClick: () => navigate('/mc/Rev_Indicadores')
      },
      {
        icon: ReplaceAll,
        label: 'Gestión de cambios',
        onClick: () => navigate('/mc/Rev_Indicadores')
      },
      {
        icon: SmilePlus,
        label: 'Satisfacción',
        onClick: () => navigate('/mc/Rev_Indicadores')
      }
    ];
  
    return (
      <Modulo
        title="Mejoramiento Continúo"
        menuItems={menuItems}
      >
        <Routes>
          <Route index element={<MCHome />} />
          <Route path="acciones" element={<Acciones />} />
          <Route path="NoConformes" element={<NConformes />} />
          <Route path="RxD" element={<RevisadoxDireccion />} />
          <Route path="Rev_Indicadores" element={<RevisionIndicadores />} />


        </Routes>
      </Modulo>
    );
  }
  
 

export default ModuleMC