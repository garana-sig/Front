/* eslint-disable no-unused-vars */
function PrivateNavbar() {

  const modules = [
    { id: 'module1', icon: Icon1, label: 'Módulo 1' },
    { id: 'module2', icon: Icon2, label: 'Módulo 2' },
    // ... más módulos
  ];
  return (
    <nav className="fixed top-0 w-full h-16 bg-gradient-to-r from-[#4a5d23] to-white shadow-lg z-50">
    <div className="h-full flex items-center justify-between px-4">
      {/* Logo e INDESIG */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-12" />
        <h1 className="text-4xl font-bold text-[#4a5d23] ml-4">INDESIG</h1>
      </div>
      
      {/* Iconos de módulos */}
      <div className="flex space-x-4">
        {modules.map(module => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`p-2 rounded-lg transition-colors ${
              currentModule === module.id 
                ? 'bg-[#4a5d23] text-white' 
                : 'text-[#4a5d23] hover:bg-[#4a5d23]/10'
            }`}
          >
            <module.icon size={24} />
          </button>
        ))}
      </div>
    </div>
  </nav>
);
};

export default PrivateNavbar