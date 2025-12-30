import React from 'react';

export default function TrackingHeader() {
  return (
    <header className="fixed left-64 right-0 top-0 h-16 bg-white border-b border-gray-200 flex items-center px-6">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">Seguimiento de despachos</h2>
      </div>
      <div>
        <input
          type="search"
          placeholder="Buscar por ID o código"
          className="rounded-md border border-gray-200 px-3 py-1 text-sm w-64"
        />
      </div>
    </header>
  );
}
