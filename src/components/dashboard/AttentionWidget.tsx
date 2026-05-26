import { atencionMock } from '../../mocks/dashboard/atencion.mock';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

const alertIconMap: Record<string, string> = {
  '1': `${EP}/Pendiente.svg`,
  '2': `${EP}/Solicitud.svg`,
};

export function AttentionWidget() {
  return (
    <div>
      <div className="mb-3 rounded-lg bg-gray-200 py-2 text-center">
        <h3 className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800">
          <img src={`${EP}/Atencion.svg`} alt="Atención" className="w-4 h-4" /> Atención
        </h3>
      </div>
      <div className="space-y-2">
        {atencionMock.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <img
                src={alertIconMap[alert.id] ?? `${EP}/Pendiente.svg`}
                alt=""
                className="w-4 h-4 shrink-0"
              />
              <span>{alert.message}</span>
            </div>
            <button className="shrink-0 cursor-pointer text-xs font-semibold text-dylo-orange-hover whitespace-nowrap ml-2">
              {alert.linkText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
