
import { BadgeCheck, ClipboardList, FileChartColumnIncreasing, FileText, FolderOpenDot, Home } from "lucide-react";
import Modulo from "../Modulo";
import { Routes, Route, useNavigate } from "react-router-dom";
import LlenarFormato from "./LlenarFormato";
import MedicionHome from './MedicionHome'
import ResultadosCharts from "./ResultadosCharts";


function ModuleMedicion() {

  const navigate = useNavigate();


    const menuItems = [
        {
          icon: Home,
          label: "Volver al Inicio",
          onClick: () => navigate("/dashboard"),
        },
        {
          icon: FileChartColumnIncreasing,
          label: "Datos",
          onClick: () => navigate("/mys/ejemplo"),
        },
        {
          icon: BadgeCheck,
          label: "Resultados",
          onClick: () => navigate("/mys/resultados"),
        },
        ,
        {
          icon: ClipboardList,
          label: "Tareas",
          onClick: () => navigate("/sig/estructura"),
        },
      ];

  return (
    <Modulo title ="Medición y Seguimiento" menuItems={menuItems}>
 <Routes>
  {/** Rutas Ppales */}
  <Route index element= {<MedicionHome/>} />
  <Route path='ejemplo' element={<LlenarFormato />} />
  <Route path='resultados' element={<ResultadosCharts />} />

 </Routes>
    </Modulo>
  )
}



export default ModuleMedicion