import type { SidebarNavItemData } from '../../types/dashboard.types';

export const sidebarMock: SidebarNavItemData[] = [
  { id: '1', icon: 'home', label: 'Inicio', path: '/dashboard', isActive: true },
  { id: '2', icon: 'clock', label: 'Reloj checador', path: '/reloj-checador' },
  { id: '3', icon: 'file-text', label: 'Solicitudes', path: '/solicitudes' },
  { id: '4', icon: 'calendar', label: 'Calendario', path: '/calendario' },
  { id: '5', icon: 'sitemap', label: 'Organigrama', path: '/organigrama' },
  { id: '6', icon: 'users', label: 'Colaboradores', path: '/colaboradores' },
  { id: '7', icon: 'receipt', label: 'Recibos de nómina', path: '/recibos-nomina' },
  { id: '8', icon: 'handshake', label: 'Convenios', path: '/convenios' },
  { id: '9', icon: 'clipboard-check', label: 'Evaluaciones', path: '/evaluaciones' },
];
