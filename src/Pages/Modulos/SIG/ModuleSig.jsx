import { Routes, Route, useNavigate } from "react-router-dom";
import { FileText, FolderOpenDot, Home } from "lucide-react";
import Modulo from "./../Modulo";
import ManualCalidad from "./ManualCalidad";
import EstructuraDocumental from "./EstructuraDocumental";
import ProcesosCalidadSST from "./Procesos/Calidad y SST/ProcesosCalidadSST";
import FormatosCySST from "./Procesos/Calidad y SST/FormatosCySST";
import ListadoInstructivos from "./Procesos/Calidad y SST/ListadoInstructivos";
import ListadoProcedimientos from "./Procesos/Calidad y SST/ListadoProcedimientos";
import NotFound from "../../NotFound";
import FormatosAdministrativa from "./Procesos/Procesos Administrativos/FormatosAdministrativa";
import InstructivosAdministrativa from "./Procesos/Procesos Administrativos/InstructivosAdministrativa";
import ProcedimientosAdministrativa from "./Procesos/Procesos Administrativos/ProcedimientosAdministrativa";
import InstructivosProveedores from "./Procesos/Proveedores/InstructivosProveedores";
import ProcedimientosProveedores from "./Procesos/Proveedores/ProcedimientosProveedores";
import FormatosProveedores from "./Procesos/Proveedores/FormatosProveedores";
import InstructivosProduccion from "./Procesos/Produccion/InstructivosProduccion";
import ProcedimientosProduccion from "./Procesos/Produccion/ProcedimientosProduccion";
import FormatosProduccion from "./Procesos/Produccion/FormatosProduccion";
import FormatosHumana from './Procesos/Humana/FormatosHumana'
import InstructivosHumana from './Procesos/Humana/InstructivosHUmana'
import ProcedimientosHumana from './Procesos/Humana/ProcedimientosHumana'
import FormatosDireccion from './Procesos/Direccion/FormatosDireccion'
import InstructivosDireccion from './Procesos/Direccion/InstructivosDireccion'
import ProcedimientosDireccion from './Procesos/Direccion/ProcedimientosDireccion'
import FormatosClientes from './Procesos/Clientes/FormatosClientes'
import InstructivosClientes from './Procesos/Clientes/InstructivosClientes'
import ProcedimientosClientes from './Procesos/Clientes/ProcedimientosClientes'

// Componente base para documentos
const DocumentosProcess = ({ children }) => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Documentos del Proceso</h2>
      </div>
      {children}
    </div>
  );
};

function ModuleSig() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Home,
      label: "Volver al Inicio",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: FileText,
      label: "Manual de Calidad",
      onClick: () => navigate("/sig/manual-calidad"),
    },
    {
      icon: FolderOpenDot,
      label: "Estructura Documental",
      onClick: () => navigate("/sig/estructura"),
    },
    // Puedes agregar más items del menú aquí
  ];

  return (
    <Modulo title="Sistema Integrado de Gestión" menuItems={menuItems}>
      <Routes>
        {/* Rutas principales */}
        <Route index element={<SigHome />} />
        <Route path="manual-calidad" element={<ManualCalidad />} />
        <Route path="estructura">4
          <Route index element={<EstructuraDocumental />} />

          {/* Rutas para calidad y SST */}
          <Route path="calidad-y-sst">
            <Route path="formatos" element={<FormatosCySST />} />
            <Route path="instructivos" element={<ListadoInstructivos />} />
            <Route path="procedimientos" element={<ListadoProcedimientos />} />
          </Route>

          {/* Rutas para Administrativa */}
          <Route path="administrativa">
            <Route path="formatos" element={<FormatosAdministrativa />} />
            <Route
              path="instructivos"
              element={<InstructivosAdministrativa />}
            />
            <Route
              path="procedimientos"
              element={<ProcedimientosAdministrativa />}
            />
          </Route>

          {/* Rutas para Proveedores */}
          <Route path="proveedores">
            <Route path="formatos" element={<FormatosProveedores />} />
            <Route path="instructivos" element={<InstructivosProveedores />} />
            <Route
              path="procedimientos"
              element={<ProcedimientosProveedores />}
            />
          </Route>

          {/* Rutas para Produccion */}
          <Route path="produccion">
            <Route path="formatos" element={<FormatosProduccion />} />
            <Route path="instructivos" element={<InstructivosProduccion />} />
            <Route path="procedimientos"
              element={<ProcedimientosProduccion />}
            />
            </Route>

          {/* Rutas para Humana */}
          <Route path="humana">
            <Route path="formatos" element={<FormatosHumana />} />
            <Route path="instructivos" element={<InstructivosHumana />} />
            <Route path="procedimientos" element={<ProcedimientosHumana />}/>
          </Route> 

{/* Rutas para Direccion */}
<Route path="direccion">
  <Route path="formatos" element={<FormatosDireccion />} />
  <Route path="instructivos" element={<InstructivosDireccion/>} />
  <Route path="procedimientos" element={<ProcedimientosDireccion />}/>
</Route> 

{/* Rutas para Clientes */}
<Route path="clientes">
  <Route path="formatos" element={<FormatosClientes />} />
  <Route path="instructivos" element={<InstructivosClientes/>} />
  <Route path="procedimientos" element={<ProcedimientosClientes />}/>
</Route> 

          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Modulo>
  );
}

// Componente para la página inicial del SIG
function SigHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido al Sistema Integrado de Gestión
      </h1>
      <p>Seleccione una opción del menú para comenzar.</p>
    </div>
  );
}

export default ModuleSig;
