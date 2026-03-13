import { Bell, Search  } from 'lucide-react';
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {Input} from "../common/Input.jsx";
import { useLocation } from 'react-router-dom';
import { NotificationsPopover } from './NotificationsPopover.jsx';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getMyProfile } from '../../api/funcionario.api';

const BREADCRUMBS = {
  '/': ['Inicio'],
  '/mis-solicitudes': ['Inicio', 'Mis solicitudes'],
  '/cambio': ['Inicio', 'Cambios de talla / prenda'],
  '/seguimientos': ['Inicio', 'Seguimiento de despachos'],
  '/sucursal': ['Inicio', 'Cambio de sucursal'],
  '/mi-cuenta': ['Inicio', 'Mi cuenta'],
  '/notificaciones': ['Inicio', 'Notificaciones']
}

export default function Header() {
  const location = useLocation();
  const crumbs = BREADCRUMBS[location.pathname] || ['Inicio'];
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile in header:', error);
    }
  }

  const getInitials = (profile) => {
    if (!profile) return user?.nombre_usuario?.substring(0, 2).toUpperCase() || 'US';
    const nombres = profile.nombres || '';
    const apellido = profile.apellido_paterno || '';
    if (nombres && apellido) {
      return `${nombres[0]}${apellido[0]}`.toUpperCase();
    }
    return user?.nombre_usuario?.substring(0, 2).toUpperCase() || 'US';
  };

  const getUserName = () => {
    if (profile?.nombres && profile?.apellido_paterno) {
      return `${profile.nombres} ${profile.apellido_paterno}`;
    }
    return user?.nombre_completo || user?.nombre_usuario || 'Usuario';
  };

  return (
      <header className="fixed right-0 top-0 left-64 h-16 flex items-center justify-center px-6 bg-white shadow z-20 border-b border-gray-200 ">
          <div className="h-full px-8 flex items-center justify-between w-full min-[1400px]:w-[80%] min-[1400px]:mx-auto">
              <div className="flex items-center gap-2 text-sm">
                  {crumbs.map((c, i) => (
                    <span key={c} className={`${i === crumbs.length - 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                      {c}{i < crumbs.length - 1 ? ' > ' : ''}
                    </span>
                  ))}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                  <div className="relative w-80 shrink-0">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                      <Input
                          type="text"
                          placeholder="Buscar solicitudes"
                          className="pl-10 bg-gray-50 border-gray-200"
                      />
                  </div>

                  <NotificationsPopover />

                  <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                          <p className="text-sm text-gray-900">{getUserName()}</p>
                          <p className="text-xs text-gray-500">Funcionario</p>
                      </div>
                      <Avatar>
                          <AvatarFallback>{getInitials(profile)}</AvatarFallback>
                      </Avatar>
                  </div>
              </div>
          </div>
      </header>
  );
}

function Avatar({ ...props }) {
    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            className="relative flex w-10 h-10 shrink-0 overflow-hidden rounded-full"
            {...props}
        />
    );
}

function AvatarFallback({ ...props }) {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className="bg-blue-600 flex w-full h-full items-center justify-center rounded-full text-white"
            {...props}
        />
    );
}
