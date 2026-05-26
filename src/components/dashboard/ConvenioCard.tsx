import { useState } from 'react';
import type { ConvenioCategory } from '../../types/dashboard.types';

interface ConvenioCardProps {
  convenio: ConvenioCategory;
}

export function ConvenioCard({ convenio }: ConvenioCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative h-36 overflow-hidden rounded-lg cursor-pointer">
      {!imgError ? (
        <img
          src={convenio.imageUrl}
          alt={convenio.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-700" />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

      {/* Title centered, large, semi-transparent like the original "2" images */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white/80 drop-shadow-lg tracking-wide">
          {convenio.name}
        </span>
      </div>
    </div>
  );
}
