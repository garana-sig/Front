import Modulo from "../Modulo"
import { Routes, Route, useNavigate } from "react-router-dom";
import {ListFilterPlus, FileStack, FileCheck2, FolderOpenDot, Home, ShieldCheck, FilePlus2 } from "lucide-react";
import GestionDHome from './GestionDHome'
import Construyendo from '../../../Layouts/Construyendo'
import EstructuraDocumental from "../SIG/EstructuraDocumental";
import Procedimientos from "./Procedimientos";
import ListadoMaestroTable from "./ListadoMaestroTable";


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
        label: "Procedimientos",
        onClick: () => navigate("/gd/procedimientos"),
      },
      {
        icon: FileStack,
        label: "Documentos Especificos",
        onClick: () => navigate("/gd/estructura"),
      },
      {
        icon: ListFilterPlus,
        label: "Listado Maestro - Revisiones",
        onClick: () => navigate("/gd/listmaster"),
      },
       {
        icon: FilePlus2,
        label: "Formatos - Crear",
        onClick: () => navigate("/gd/formcreate"),
      },
     
    ];

  return (
<Modulo title="Estructura Documental - Red de Procesos" menuItems={menuItems}>
<Routes>
    <Route  index element={<GestionDHome/>}/>
    <Route path="procedimientos" index element={<Procedimientos/>} />
    <Route path="estructura" index element={<EstructuraDocumental />} />
    <Route path="listmaster" index element={<ListadoMaestroTable />} />
    <Route path="formcreate" index element={<Construyendo />} />


</Routes>
</Modulo>
  )
}

export default ModuleGestionD