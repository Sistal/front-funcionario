import { Bell, Search  } from 'lucide-react';
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {Input} from "./Input.jsx"
import { useLocation } from 'react-router-dom';

const BREADCRUMBS = {
  '/': ['Inicio'],
  '/mis-solicitudes': ['Inicio', 'Mis solicitudes'],
  '/cambio': ['Inicio', 'Cambios de talla / prenda'],
  '/seguimientos': ['Inicio', 'Seguimiento de despachos'],
  '/sucursal': ['Inicio', 'Cambio de sucursal'],
  '/mi-cuenta': ['Inicio', 'Mi cuenta']
}

export default function Header() {
  const location = useLocation();
  const crumbs = BREADCRUMBS[location.pathname] || ['Inicio'];

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

              <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="relative w-80 flex-shrink-0">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                      <Input
                          type="text"
                          placeholder="Buscar solicitudes"
                          className="pl-10 bg-gray-50 border-gray-200"
                      />
                  </div>

                  <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0">
                      <Bell className="w-5 h-5 text-gray-600"/>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                          <p className="text-sm text-gray-900">Juan Pérez</p>
                          <p className="text-xs text-gray-500">Funcionario</p>
                      </div>
                      <Avatar>
                          <AvatarFallback>JP</AvatarFallback>
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
