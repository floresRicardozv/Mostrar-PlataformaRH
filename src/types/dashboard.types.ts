/** Tarjeta de solicitud (Vacaciones, Cita Médica, Home Office) */
export interface RequestCardData {
  id: string;
  icon: string;
  label: string;
  sublabel: string;
  count: number;
  unit: string;
}

/** Slide de noticia del carrusel */
export interface NewsSlide {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

/** Datos de bienvenida del empleado */
export interface WelcomeData {
  employeeName: string;
  role: string;
}

/** Categoría de convenio */
export interface ConvenioCategory {
  id: string;
  name: string;
  imageUrl: string;
}

/** Alerta de atención */
export interface AttentionAlert {
  id: string;
  message: string;
  linkText: string;
}

/** Día del calendario */
export interface CalendarDay {
  date: number;
  dayOfWeek: string;
  isToday: boolean;
}

/** Tipo de ausencia para filtro del calendario */
export type AbsenceType = 'vacaciones' | 'homeOffice' | 'incapacidad';

/** Persona ausente */
export interface AbsentPerson {
  id: string;
  name: string;
  avatarUrl?: string;
  absenceType: AbsenceType;
}

/** Datos del calendario semanal */
export interface CalendarWeekData {
  monthYear: string;
  days: CalendarDay[];
  absentPeople: AbsentPerson[];
}

/** Evento próximo */
export interface UpcomingEvent {
  id: string;
  day: number;
  month: string;
  name: string;
}

/** Persona con aniversario o cumpleaños */
export interface CelebrationPerson {
  id: string;
  name: string;
}

/** Herramienta comercial */
export interface CommercialTool {
  id: string;
  icon: string;
  label: string;
}

/** Ítem de navegación del sidebar */
export interface SidebarNavItemData {
  id: string;
  icon: string;
  label: string;
  path: string;
  isActive?: boolean;
}
