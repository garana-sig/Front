import { useState } from 'react';
import Navbar from '../Components/Public/Navbar';

import { Outlet } from 'react-router-dom';

function PrivateLayout() {

  // eslint-disable-next-line no-unused-vars
  const [currentModule, setCurrentModule] = useState('module1');


    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex">
          <main className="flex-1 ml-64">
            <Outlet />
          </main>
        </div>
      </div>
    
  );
};

export default PrivateLayout