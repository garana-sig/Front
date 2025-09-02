import Modulo from "../Modulo"
import { Routes, Route, useNavigate } from "react-router-dom";
import {ListFilterPlus, FileStack, FileCheck2, FolderOpenDot, Home, ShieldCheck } from "lucide-react";
import GestionDHome from './GestionDHome'

function ModuleGestionD() {
    const navigate = useNavigate();

    const menuItems = [
      {
        icon: Home,
        label: "Volver al Inicio",
        onClick: () => navigate("/dashboard"),
      },
      {
        icon: FileCheck2,
        label: "Actas",
        onClick: () => navigate("/sig/manual-calidad"),
      },
      {
        icon: FileStack,
        label: "Plantillas",
        onClick: () => navigate("/sig/estructura"),
      },
      {
        icon: ListFilterPlus,
        label: "Listado Maestro - Revisiones",
        onClick: () => navigate("/sig/estructura"),
      },
     
    ];

  return (
<Modulo title="Gestión Documental" menuItems={menuItems}>
<Routes>
    <Route  index element={<GestionDHome/>}/>
</Routes>
</Modulo>
  )
}

export default ModuleGestionD