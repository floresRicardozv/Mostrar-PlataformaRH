import { cumpleanosMock } from '../../mocks/dashboard/cumpleanos.mock';
import { VerticalTicker } from '../ui/VerticalTicker';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

export function BirthdaysWidget() {
  const names = cumpleanosMock.map((p) => p.name);

  return (
    <div className="text-center">
      <div className="mb-3 rounded-lg bg-gray-200 py-2">
        <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
          <img src={`${EP}/Cumpleanos.svg`} alt="Cumpleaños" className="w-4 h-4" /> Cumpleaños
        </h3>
      </div>
      <VerticalTicker items={names} className="text-sm text-gray-600" />
    </div>
  );
}
