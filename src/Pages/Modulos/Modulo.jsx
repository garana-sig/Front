import { useState } from 'react';
import { Menu } from 'lucide-react';

// eslint-disable-next-line react/prop-types
function Modulo({ title, menuItems, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="  text-[#2e5244] flex h-screen pt-16">
      {/* Botón móvil */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-[#6f7b2c] text-white"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div className={` text-center text-[#2e5244]
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 
        bg-gradient-to-b from-[#6dbd96]  to-[white]
        overflow-y-auto z-40 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
        <h2
  className="text-base font-bold mb-4 relative inline-block px-4 py-2 
    bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg 
    transition-all duration-300 hover:shadow-xl hover:scale-105"
>
  {title}
</h2>
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center space-x-2 p-3 hover:bg-white/20 rounded-lg"
              >
                <item.icon size={20} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="fixed top-16 right-0 bottom-0 lg:left-64 left-0 overflow-hidden">
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Modulo;