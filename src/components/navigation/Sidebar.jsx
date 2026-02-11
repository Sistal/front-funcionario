import logo from "../../assets/iconSistal.png";
import { Home, FileText, RefreshCw, Truck, Building, User, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ENV } from '../../config/env';

const LINKS = [
  { label: "Inicio", url: "/", icon: Home },
  { label: "Mis solicitudes", url: "/mis-solicitudes", icon: FileText },
  { label: "Cambios de talla / prenda", url: "/cambio", icon: RefreshCw },
  { label: "Seguimiento de despachos", url: "/seguimientos", icon: Truck },
  { label: "Cambio de sucursal", url: "/sucursal", icon: Building },
  { label: "Mi cuenta", url: "/mi-cuenta", icon: User }
];

export default function Sidebar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
      // Redirigir al frontend de login
      window.location.href = ENV.LOGIN_URL || 'http://localhost:5173';
    }
  };

  return (
    <aside className={"fixed left-0 top-0 bottom-0 w-64 flex flex-col border border-gray-200 bg-white z-30"}>
      <div className={'flex justify-center p-4'}>
        <img src={logo} alt="Support" />
      </div>
      <ul className="mt-2">
        {LINKS.map((link) => (
          <li key={link.url}>
            <NavLink to={link.url} className={({ isActive }) => `flex items-center gap-2 rounded px-4 py-3 w-full text-[14px] ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              <link.icon size={16} />
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={"flex-1 justify-end flex flex-col p-4"}>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded text-gray-700 hover:bg-gray-100 px-4 py-3 text-[14px] w-full text-left"
        >
          <LogOut size={16} />
          {"Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}

