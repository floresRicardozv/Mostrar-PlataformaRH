import type { CalendarWeekData } from '../../types/dashboard.types';

const BP = '/Plataforma_DYLO26/Box_Perfil';

export const calendarioMock: CalendarWeekData = {
  monthYear: 'Marzo 2026',
  days: [
    { date: 23, dayOfWeek: 'Lun', isToday: false },
    { date: 24, dayOfWeek: 'Mar', isToday: false },
    { date: 25, dayOfWeek: 'Mié', isToday: true },
    { date: 26, dayOfWeek: 'Jue', isToday: false },
    { date: 27, dayOfWeek: 'Vie', isToday: false },
    { date: 28, dayOfWeek: 'Sáb', isToday: false },
    { date: 29, dayOfWeek: 'Dom', isToday: false },
  ],
  absentPeople: [
    { id: '1', name: 'Carlos Ruiz', avatarUrl: `${BP}/Carlos Ruiz.png`, absenceType: 'vacaciones' },
    { id: '2', name: 'María Torres', avatarUrl: `${BP}/María Torres.png`, absenceType: 'vacaciones' },
    { id: '3', name: 'Pedro Sánchez', avatarUrl: `${BP}/Pedro Sánchez.png`, absenceType: 'vacaciones' },
    { id: '4', name: 'María Torres', avatarUrl: `${BP}/María Torres.png`, absenceType: 'homeOffice' },
    { id: '5', name: 'Pedro Sánchez', avatarUrl: `${BP}/Pedro Sánchez.png`, absenceType: 'incapacidad' },
  ],
};
