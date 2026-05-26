import type { ReactNode } from 'react';
import { herramientasMock } from '../../mocks/dashboard/herramientas.mock';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

const iconMap: Record<string, ReactNode> = {
  presentation: <img src={`${EP}/Presentaciones.svg`} alt="Presentaciones" className="w-6 h-6" />,
  'file-text': <img src={`${EP}/monetization_on.svg`} alt="Tarifario" className="w-6 h-6" />,
};

export function ToolsWidget() {
  return (
    <div className="text-center">
      <h3 className="mb-4 text-sm font-semibold text-gray-800">Herramientas comerciales</h3>
      <div className="flex justify-center gap-6">
        {herramientasMock.map((tool) => (
          <button
            key={tool.id}
            className="flex cursor-pointer flex-col items-center gap-2 text-gray-600 transition-colors hover:text-gray-800"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              {iconMap[tool.icon] ?? <img src={`${EP}/Pendiente.svg`} alt="Pendiente" className="w-6 h-6" />}
            </span>
            <span className="text-xs font-medium">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
