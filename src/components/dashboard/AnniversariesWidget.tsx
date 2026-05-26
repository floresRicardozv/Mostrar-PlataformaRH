import { aniversariosMock } from '../../mocks/dashboard/aniversarios.mock';
import { VerticalTicker } from '../ui/VerticalTicker';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

export function AnniversariesWidget() {
  const names = aniversariosMock.map((p) => p.name);

  return (
    <div className="text-center">
      <div className="mb-3 rounded-lg bg-gray-200 py-2">
        <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
          <img src={`${EP}/Aniversarios.svg`} alt="Aniversarios" className="w-4 h-4" /> Aniversarios
        </h3>
      </div>
      <VerticalTicker items={names} className="text-sm text-gray-600" />
    </div>
  );
}
