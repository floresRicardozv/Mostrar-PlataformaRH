import type { RequestCardData } from '../../types/dashboard.types';

export const solicitudesMock: RequestCardData[] = [
  { id: '1', icon: 'palm-tree', label: 'Vacaciones', sublabel: 'Disponibles', count: 7, unit: 'días' },
  { id: '2', icon: 'stethoscope', label: 'Cita Médica', sublabel: 'Utilizados', count: 2, unit: 'días' },
  { id: '3', icon: 'home', label: 'Home Office', sublabel: 'Utilizados', count: 4, unit: 'días' },
];
