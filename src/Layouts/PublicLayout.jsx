// PublicLayout.jsx
import Navbar from '../Components/Public/Navbar';
import Sidebar from '../Components/Public/Sidebar';
import LoginAside from '../Components/shared/LoginAside';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-radial from-[#4a5d23] via-[#8fa665] to-[#c8d4bc]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="flex">
            <div className="flex-1 overflow-x-hidden">
              <Outlet />
            </div>
            <LoginAside />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PublicLayout;

