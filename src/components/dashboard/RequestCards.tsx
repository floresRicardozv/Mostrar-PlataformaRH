import type { ReactNode } from 'react';
import { Card } from '../ui/Card';
import { solicitudesMock } from '../../mocks/dashboard/solicitudes.mock';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

const iconMap: Record<string, ReactNode> = {
  'palm-tree': <img src={`${EP}/Vacaciones.svg`} alt="Vacaciones" className="w-7 h-7 shrink-0" />,
  stethoscope: <img src={`${EP}/Cita Medica.svg`} alt="Cita Médica" className="w-7 h-7 shrink-0" />,
  home: <img src={`${EP}/Home Office.svg`} alt="Home Office" className="w-7 h-7 shrink-0" />,
};

export function RequestCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {solicitudesMock.map((card) => (
        <Card
          key={card.id}
          className="bg-[#F6F6F6] transition-colors"
          hoverClassName="hover:bg-[#E7E7E7]"
        >
          {/* Top row: icon + label + sublabel
              <xl: label/sublabel apilados verticalmente
              ≥xl: sublabel a la derecha (between) */}
          <div className="flex items-center gap-3">
            <span>
              {iconMap[card.icon] ?? (
                <img src={`${EP}/Pendiente.svg`} alt="" className="w-7 h-7 shrink-0" />
              )}
            </span>
            <div className="flex flex-1 min-w-0 flex-col xl:flex-row xl:items-center xl:justify-between">
              <span className="text-xl font-bold text-gray-800 truncate">{card.label}</span>
              <span className=" text-gray-500 truncate">{card.sublabel}</span>
            </div>
          </div>

          {/* Bottom row: big count aligned right */}
          <div className="mt-2 flex justify-end">
            <span className="text-3xl font-bold text-dylo-orange-dark leading-none">
              {card.count} <span className="font-normal">{card.unit}</span>
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
