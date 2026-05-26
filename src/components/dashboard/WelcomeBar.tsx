import { useState, useEffect, useRef } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { bienvenidaMock } from '../../mocks/dashboard/bienvenida.mock';
import type { WelcomeData } from '../../types/dashboard.types';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

interface WelcomeBarProps {
  data?: WelcomeData[];
}

export function WelcomeBar({ data = bienvenidaMock }: WelcomeBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (data.length <= 1) return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % data.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length, isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const pauseAutoRotation = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 8000);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
    pauseAutoRotation();
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
    pauseAutoRotation();
  };

  if (data.length === 0) return null;

  const { employeeName, role } = data[activeIndex];

  return (
    <div className="flex items-stretch overflow-hidden rounded-lg ">
      {/* Chip "Bienvenidos" con diagonal */}
      <div className="relative flex items-center gap-2 bg-gray-100 py-5 pl-5 pr-6">
        <img src={`${EP}/Bienvenidos.svg`} alt="Bienvenidos" className="w-5 h-5" />
        <span className="text-xl font-semibold text-gray-800 whitespace-nowrap">Bienvenidos</span>
        {/* Diagonal edge using skew */}
        <div className="absolute -right-3 top-0 h-full w-7 -skew-x-12 bg-gray-100" />
      </div>

      {/* Barra oscura con nombre y badge */}
      <div className="flex flex-1 items-center justify-center gap-4 px-6 py-3 bg-[#1a1a1a]">
        {data.length > 1 && (
          <button
            onClick={goPrev}
            aria-label="Empleado anterior"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <LuChevronLeft size={18} />
          </button>
        )}

        <span className="text-xl font-semibold text-white ">{employeeName}</span>

        <span className="rounded-md border border-dylo-orange px-4 py-0.5 text-sm font-medium text-white">
          {role}
        </span>

        {data.length > 1 && (
          <button
            onClick={goNext}
            aria-label="Siguiente empleado"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <LuChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
