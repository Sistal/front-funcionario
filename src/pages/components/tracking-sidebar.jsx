import React from 'react';

export function TrackingSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <img src="/iconSistal.png" alt="Sistal" className="w-28" />
      </div>
      <nav className="space-y-2">
        <a href="/" className="block text-sm text-gray-700 hover:text-gray-900">Inicio</a>
        <a href="/seguimientos" className="block text-sm font-medium text-gray-900">Seguimiento de despachos</a>
        <a href="/mis-solicitudes" className="block text-sm text-gray-700 hover:text-gray-900">Mis solicitudes</a>
      </nav>
    </aside>
  );
}

