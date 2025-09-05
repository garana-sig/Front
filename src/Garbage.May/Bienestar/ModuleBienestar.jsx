import Modulo from "../../Pages/Modulos/Modulo"
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home,  Users, NotebookPen, Newspaper, BookCheck } from "lucide-react";
import BienestarHome from './BienestarHome'

function ModuleBienestar() {
    const navigate = useNavigate();

    const menuItems = [
      {
        icon: Home,
        label: "Volver al Inicio",
        onClick: () => navigate("/dashboard"),
      },
      {
        icon: Newspaper,
        label: "Publicaciones",
        onClick: () => navigate("/sig/manual-calidad"),
      },
      {
        icon: NotebookPen,
        label: "Capacitación",
        onClick: () => navigate("/sig/estructura"),
      },
      {
        icon: BookCheck,
        label: "Evaluación Conocimiento",
        onClick: () => navigate("/sig/estructura"),
      },
      {
        icon: Users,
        label: "Comites",
        onClick: () => navigate("/sig/estructura"),
      },
    ];

  return (
<Modulo title="Bienestar" menuItems={menuItems}>
<Routes>
    <Route  index element={<BienestarHome/>}/>
</Routes>
</Modulo>
  )
}


export default ModuleBienestar