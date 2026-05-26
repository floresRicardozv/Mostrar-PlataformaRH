import { Button } from '../ui/Button';

const BP = '/Plataforma_DYLO26/Box_Perfil';

export function TopBar() {
  return (
    <div className="flex items-center justify-end gap-4">
      <Button variant="teal">
        Checar entrada
        <img src={`${BP}/play_circle_filled.svg`} alt="" className="w-5 h-5" />
      </Button>
      <button
        className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Notificaciones"
      >
        <img src={`${BP}/circle_notifications.svg`} alt="Notificaciones" className="w-5 h-5" />
      </button>
      <button
        className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Ayuda"
      >
        <img src={`${BP}/help.svg`} alt="Ayuda" className="w-5 h-5" />
      </button>
      <img
        src={`${BP}/Perfil_Photo.png`}
        alt="Perfil"
        className="w-9 h-9 rounded-full object-cover"
      />
    </div>
  );
}
