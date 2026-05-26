import { eventosMock } from '../../mocks/dashboard/eventos.mock';
import { Button } from '../ui/Button';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

export function EventsWidget() {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <img src={`${EP}/Proximos Eventos.svg`} alt="Próximos eventos" className="w-4 h-4" /> Próximos eventos
      </h3>
      <ul className="mb-3 space-y-2">
        {eventosMock.map((event) => (
          <li key={event.id} className="flex items-center gap-2 text-sm text-gray-700">
            <img src={`${EP}/Hecho.svg`} alt="" className="w-4 h-4 shrink-0" />
            {event.day} {event.month} — {event.name}
          </li>
        ))}
      </ul>
      <Button variant="orange" className="w-full justify-center text-sm">
        Ver calendario completo &gt;
      </Button>
    </div>
  );
}
