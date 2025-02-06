import { Route, Routes, useNavigate } from 'react-router-dom';
import Modulo from '../Modulo'
import { Ambulance, ShieldCheck, ChartNoAxesCombined, FolderOpenDot, Home, LandPlot } from "lucide-react";
import SSTHome from './SSTHome'

function ModuleSST() {

    const navigate = useNavigate();

    const menuItems = [
      {
        icon: Home,
        label: "Volver al Inicio",
        onClick: () => navigate("/dashboard"),
      },
      {
        icon: Ambulance,
        label: "Plan de Emergencia",
        onClick: () => navigate("/sig/manual-calidad"),
      },
      {
        icon: LandPlot,
        label: "Plan de Evacuación",
        onClick: () => navigate("/sig/estructura"),
      },
      {
        icon: ShieldCheck,
        label: "Reglamento de Higiene",
        onClick: () => navigate("/sig/estructura"),
      },
      {
        icon: ChartNoAxesCombined,
        label: "Estadísticas",
        onClick: () => navigate("/sig/estructura"),
      },
    ];
  return (
      <Modulo title="SST" menuItems={menuItems}>
<Routes>
    <Route index element ={ <SSTHome/>}/>
</Routes>
    </Modulo>
  )
}

export default ModuleSST