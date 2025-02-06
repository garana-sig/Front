import { useState } from 'react';
import { LogOut, LogIn } from 'lucide-react';
import Logo from "../../assets/img/garana_logo2.png";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleLogin = () => {
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <nav className=" font-meditative fixed top-0 w-full h-16 bg-gradient-to-r from-[#6dbd96] to-white shadow-lg z-50">
      <div className="h-full flex items-center px-4">
        {/* Logo izquierda */}
        <div className="w-72 flex items-center -ml-4">
          <img
            src={Logo}
            alt="Logo"
            className=" object-contain"
          />
        </div>

        {/* Título centrado */}
        <div className="flex-1 text-center">
          <h1
            className="text-6xl font-bold  text-[#2e5244] tracking-wider"
            style={{
              textShadow: '2px 2px 0 #fff, 4px 4px 0 rgba(111, 123, 44, 0.3)'
            }}
          >
            Garana - SIG
          </h1>
        </div>

        {/* Usuario derecha */}
        <div className="w-72 flex justify-end items-center">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-[#6f7b2c] font-medium">
                {user ? `Hola! ${user.name}` : 'Bienvenido'}
              </span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    <span>Cerrar Sesión</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogIn size={16} />
                    <span>Iniciar Sesión</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;