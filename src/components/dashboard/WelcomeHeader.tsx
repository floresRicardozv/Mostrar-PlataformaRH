import { useAuthStore } from '../../stores/useAuthStore';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

export function WelcomeHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-500 flex items-center gap-2">
       Bienvenido, <span className="text-black">{user?.name ?? 'Usuario'}</span>{' '}
      </h1>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xl font-semibold ">Solicitudes</span>
        <a
          href="#"
          className="inline-block rounded-md bg-gradient-to-r from-dylo-orange to-dylo-orange-darker px-3 py-1  font-semibold text-white hover:to-dylo-orange-hover-dark transition-all"
        >
          Ver más &gt;
        </a>
      </div>
    </div>
  );
}
