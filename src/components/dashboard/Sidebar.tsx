import { useSidebarStore } from '../../stores/useSidebarStore';
import { sidebarMock } from '../../mocks/dashboard/sidebar.mock';
import { SidebarNavItem } from './SidebarNavItem';
import { LuHouse } from 'react-icons/lu';
import { TiWarning } from 'react-icons/ti';
import type { ReactNode } from 'react';

const SVG_BASE = '/Plataforma_DYLO26/Menu-Lateral';

function SvgIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-[18px] h-[18px] object-contain" />;
}

function PendingIcon() {
  return (
    <span className="relative" title="Pendiente">
      <TiWarning size={18} className="text-yellow-400" />
    </span>
  );
}

const iconMap: Record<string, ReactNode> = {
  home: <LuHouse size={18} />,
  clock: <SvgIcon src={`${SVG_BASE}/Reloj checador.svg`} alt="Reloj checador" />,
  'file-text': <SvgIcon src={`${SVG_BASE}/Solicitudes.svg`} alt="Solicitudes" />,
  calendar: <SvgIcon src={`${SVG_BASE}/Calendario.svg`} alt="Calendario" />,
  sitemap: <SvgIcon src={`${SVG_BASE}/Organigrama.svg`} alt="Organigrama" />,
  users: <SvgIcon src={`${SVG_BASE}/Colaboradores.svg`} alt="Colaboradores" />,
  receipt: <SvgIcon src={`${SVG_BASE}/Recbidos de nomina.svg`} alt="Recibos de nómina" />,
  handshake: <SvgIcon src={`${SVG_BASE}/Convenios.svg`} alt="Convenios" />,
  'clipboard-check': <SvgIcon src={`${SVG_BASE}/Evaluaciones.svg`} alt="Evaluaciones" />,
};

export function Sidebar() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <nav
      className={`bg-[#1a1a1a] flex flex-col h-screen transition-all duration-300 overflow-hidden pt-4 ${
        collapsed ? 'w-16 lg:w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-4 py-5 shrink-0">
        {collapsed ? (
          <img src="/Favicon_Dylo.svg" alt="DYLO" className="w-10 h-10 object-contain" />
        ) : (
          <img src="/Logo_Dylo.svg" alt="DYLO" className="h-20 object-contain" />
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        className="flex justify-center items-center gap-2 px-4 py-4 text-white/70 hover:text-white transition-colors text-sm cursor-pointer shrink-0"
      >
        {collapsed ? (
          <span className="mx-auto">
            <img src={`${SVG_BASE}/menu_open.svg`} alt="Menú" className="w-5 h-5" />
          </span>
        ) : (
          <>
            <img src={`${SVG_BASE}/menu_open.svg`} alt="Ocultar" className="w-[18px] h-[18px]" />
            <span>Ocultar</span>
          </>
        )}
      </button>

      {/* Nav items */}
      <ul className="mt-4 space-y-3 px-2 overflow-y-auto scrollbar-hide">
        {sidebarMock.map((item) => (
          <SidebarNavItem
            key={item.id}
            icon={iconMap[item.icon] ?? <PendingIcon />}
            label={item.label}
            isActive={item.isActive}
            collapsed={collapsed}
          />
        ))}

        {/* Universidad DYLO — justo después de Evaluaciones */}
        <li
          className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer transition-colors duration-200 rounded-md hover:bg-white/5 ${collapsed ? 'justify-center px-0' : ''}`}
        >
          <span className="shrink-0 w-6 text-center">
            <img src={`${SVG_BASE}/UniversidadDYLO.svg`} alt="Universidad DYLO" className="w-[18px] h-[18px] object-contain" />
          </span>
          {!collapsed && <span className="text-sm text-white whitespace-nowrap">Universidad DYLO</span>}
        </li>
      </ul>

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Footer social icons */}
      {/* AJUSTE: tamaños — colapsado: w-4 h-4 (16px) | expandido: w-6 h-6 (24px) */}
      <div
        className={`px-4 py-3 border-t border-white/10 shrink-0 flex justify-center items-center gap-4 ${collapsed ? 'justify-center gap-2 px-0 flex-col' : ''}`}
      >
        <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity" title="Facebook">
          <img src={`${SVG_BASE}/Facebook.svg`} alt="Facebook" className={collapsed ? 'w-5 h-5' : 'w-6 h-6'} />
        </a>
        <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity" title="Instagram">
          <img src={`${SVG_BASE}/Instagram.svg`} alt="Instagram" className={collapsed ? 'w-5 h-5' : 'w-6 h-6'} />
        </a>
        <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity" title="LinkedIn">
          <img src={`${SVG_BASE}/LinkedIn.svg`} alt="LinkedIn" className={collapsed ? 'w-5 h-5' : 'w-6 h-6'} />
        </a>
      </div>
    </nav>
  );
}
