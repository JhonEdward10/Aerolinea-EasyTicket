import React from 'react';

// Componente que renderiza banderas como SVG en vez de emoji
const FlagIcon = ({ code, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-6',
    xl: 'w-10 h-7'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  // Usar la API de flagcdn.com que proporciona SVGs de alta calidad
  const flagUrl = `https://flagcdn.com/${code.toLowerCase()}.svg`;

  return (
    <img
      src={flagUrl}
      alt={`${code} flag`}
      className={`${sizeClass} object-cover rounded shadow-sm inline-block`}
      onError={(e) => {
        // Fallback si la imagen no carga: mostrar código del país
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = `<span class="text-xs font-bold text-gray-600">${code}</span>`;
      }}
    />
  );
};

export default FlagIcon;