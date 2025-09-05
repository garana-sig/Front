/* eslint-disable no-unused-vars */
// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import PrivateLayout from "../Layouts/PrivateLayout";

// Páginas de Plataforma Estratégica
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home";
import ModuleSig from "../Pages/Modulos/SIG/ModuleSig";
import { useAuth } from "../Context/AuthContext";
import CurvedNavigator from "../Components/Private/CurvedNavigator";
import ModuleMC from "../Pages/Modulos/MC/ModuleMC";
import ModulePE from "../Pages/PE/ModulePE";
import ModuleMedicion from "../Pages/Modulos/MyS/ModuleMedicion";
import ModuleSST from "../Pages/Modulos/SST/ModuleSST";
import ModuleGestionD from "../Pages/Modulos/GD/ModuleGestionD";
import Mision from "../Garbage.May/Mision";
import Vision from "../Garbage.May/Vision";
import Valores from "../Garbage.May/Valores";

// Componente de protección de rutas
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>; // O tu componente de loading
  }

  if (!user) {
    // Guarda la ruta a la que intentaba acceder
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        {/* Si el usuario está autenticado y trata de acceder a '/', 
            redirigir a '/dashboard' */}
        <Route 
          index 
          element={user ? <Navigate to="/dashboard" replace /> : <Home />} 
        />
        <Route path="PE">
          <Route path="mision" element={<Mision />} />
          <Route path="vision" element={<Vision />} />
          <Route path="valores" element={<Valores />} />
          
        </Route>
      </Route>

      {/* Rutas Privadas */}
      <Route
        element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<CurvedNavigator />} />
        <Route path="/sig/*" element={<ModuleSig />} />
        <Route path="/sst/*" element={<ModuleSST />} />
        <Route path="/gd/*" element={<ModuleGestionD />} />
        <Route path="/mc/*" element={<ModuleMC />} />
        <Route path="/mys/*" element={<ModuleMedicion />} />
        <Route path="/PlanE/*" element={<ModulePE />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
