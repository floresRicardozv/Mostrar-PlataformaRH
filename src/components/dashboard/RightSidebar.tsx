import { Button } from '../ui/Button';
import { AttentionWidget } from './AttentionWidget';
import { CalendarWidget } from './CalendarWidget';
import { EventsWidget } from './EventsWidget';
import { AnniversariesWidget } from './AnniversariesWidget';
import { BirthdaysWidget } from './BirthdaysWidget';
import { ToolsWidget } from './ToolsWidget';

const BP = '/Plataforma_DYLO26/Box_Perfil';

export function RightSidebar() {
  return (
    <div className="flex flex-col gap-4">
      {/* Top actions — separate dark rounded card */}
      <div className="flex items-center justify-between bg-[#1a1a1a] px-4 py-3 rounded-2xl">
        <Button variant="teal" className="text-sm px-3 py-2">
          Checar entrada
          <img src={`${BP}/play_circle_filled.svg`} alt="" className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-5">
          <div className=' flex gap-2'>
            <button className="rounded-full  text-white/80 hover:text-white transition-colors">
              <img src={`${BP}/circle_notifications.svg`} alt="Notificaciones" className="w-6 h-6" />
            </button>
            <button className="rounded-full  text-white/80 hover:text-white transition-colors">
              <img src={`${BP}/help.svg`} alt="Ayuda" className="w-6 h-6" />
            </button>
          </div>
          <img
            src={`${BP}/Perfil_Photo.png`}
            alt="Perfil"
            className="w-9 h-9 rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Atención */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <AttentionWidget />
      </div>

      {/* Calendario + Eventos */}
      <div className="rounded-2xl bg-white shadow-sm p-4 space-y-4">
        <CalendarWidget />
        <hr className="border-gray-100" />
        <EventsWidget />
      </div>

      {/* Aniversarios */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <AnniversariesWidget />
      </div>

      {/* Cumpleaños */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <BirthdaysWidget />
      </div>

      {/* Herramientas comerciales */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <ToolsWidget />
      </div>
    </div>
  );
}
