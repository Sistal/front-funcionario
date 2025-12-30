import React from 'react';

export function NotificationsFilters({ filters, activeFilter, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onSelect(filter.id)}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="flex items-center justify-center">{filter.icon}</span>
          <span>{filter.label}</span>
          {filter.count !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeFilter === filter.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}>{filter.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default NotificationsFilters;
