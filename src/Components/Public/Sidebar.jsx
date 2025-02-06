import { useNavigate } from "react-router-dom";
import {
  FileText,
  BookOpen,
  BarChart2,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuItems = [
    {
      icon: FileText,
      label: "SIG",
      subMenu: [
        { label: "Manual del sistema integrado", path: "/SIG/Manual" },
        { label: "Objetivo", path: "/SIG/Objetivo" },
        { label: "Alcance", path: "/SIG/Alcance" },
      ],
    },
    {
      icon: Settings,
      label: "PLATAFORMA ESTRATEGICA",
      subMenu: [
        { label: "Misión", path: "/PE/Mision" },
        { label: "Visión", path: "/PE/Vision" },
        { label: "Valores", path: "PE/Valores" },
      ],
    },
    {
      icon: BookOpen,
      label: "POLÍTICAS",
      subMenu: [
        {
          label:
            "Política de Prevención de Consumo de alcohol. tabaco y otras sustancias psicoactivas",
          path: "/Politicas/Sustancias",
        },
        {
          label:
            "Política integral de calidad y seguridad y salud en el trabajo",
          path: "/Politicas/SSTT",
        },
        { label: "Política de genero y diversidad", path: "/Politicas/Genero" },
        {
          label: "Politica de Desconexión laboral ",
          path: "/Politicas/Prevención",
        },
      ],
    },
    {
      icon: ClipboardList,
      label: "PLANES Y PROGRAMAS",
      subMenu: [
        { label: "Plan emergencias", path: "/PP/Emergencias" },
        { label: "Plan de evacuacion", path: "/PP/Evacuacion" },
        { label: "Programas", path: "/PP/Capacitacion" },
      ],
    },
    {
      icon: BarChart2,
      label: "MEDICIÓN Y SEGUIMIENTO",
      subMenu: [
        { label: "Tableros de Control", path: "/MS/Control" },
        { label: "Indicadores", path: "/PP/Indicadores" },
        { label: "Informes de Gestión", path: "/PP/Gestion" },
      ],
    },
  ];

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#4a5d23] text-white"
      >
        <Menu size={24} />
      </button>

      {/* Overlay para cerrar el sidebar en móviles */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        font-meditative text-4xl fixed left-0 top-16 h-full w-64 
        bg-gradient-to-b from-[#6dbd96] via-[#8fa665] to-[#c8d4bc] 
        text-[#2e5244] overflow-y-auto z-40 transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="flex flex-col space-y-2 p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                className="w-full flex items-center justify-between p-3 hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <item.icon size={24} />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {openMenu === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {openMenu === index && (
                <div className="bg-white/10 rounded-b-lg">
                  {item.subMenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => {
                        navigate(subItem.path);
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left pl-12 pr-4 py-2 text-sm hover:bg-white/20 transition-all duration-200"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
