import { ConvenioCard } from './ConvenioCard';
import { conveniosMock } from '../../mocks/dashboard/convenios.mock';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

export function ConveniosGrid() {
  return (
    <div>
      <div className="mb-8 flex items-center gap-2">
        <img src={`${EP}/Convenios.svg`} alt="Convenios" className="w-6 h-6" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">Convenios</h2>
          <p className="text-sm text-gray-500">¡Descubre los convenios que tenemos para ti!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {conveniosMock.map((convenio) => (
          <ConvenioCard key={convenio.id} convenio={convenio} />
        ))}
      </div>
    </div>
  );
}
