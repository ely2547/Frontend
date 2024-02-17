import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Products from './Home';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  // Función para verificar el acceso de administrador
  const handleAdminAccess = () => {
    if (password === '123') {
      setIsAdmin(true);
    } else {
      alert('Clave incorrecta. Acceso denegado.');
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <nav className="flex justify-around items-center py-4 bg-blue-500 text-white">
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
        <Link to="/login" className="hover:underline">
          
        </Link>
        {isAdmin ? (
          <div>
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
            <Link to="/usuarios" className="hover:underline ml-4">
              Usuarios
            </Link>
          </div>
        ) : (
          <div>
            <input
              type="password"
              placeholder="Ingresa la clave"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-gray-200 rounded px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-0 text-gray-700"
            />
            <button
              onClick={handleAdminAccess}
              className="hover:underline bg-blue-500 text-white px-3 py-2 rounded mt-2"
            >
              Acceder como Admin
            </button>
          </div>
        )}
      </nav>
      <Products />
    </div>
  );
}

export default App;

