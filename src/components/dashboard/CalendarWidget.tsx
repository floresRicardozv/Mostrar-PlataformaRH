import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { calendarioMock } from '../../mocks/dashboard/calendario.mock';
import { Avatar } from '../ui/Avatar';
import type { AbsenceType } from '../../types/dashboard.types';

const EP = '/Plataforma_DYLO26/Estructura_Principal';

const filterTabs: { label: string; type: AbsenceType }[] = [
  { label: 'Vacaciones', type: 'vacaciones' },
  { label: 'Home Office', type: 'homeOffice' },
  { label: 'Incapacidad', type: 'incapacidad' },
];

export function CalendarWidget() {
  const [activeFilter, setActiveFilter] = useState<AbsenceType>('vacaciones');
  const { monthYear, days, absentPeople } = calendarioMock;

  const filtered = absentPeople.filter((p) => p.absenceType === activeFilter);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-200 px-3 py-2">
        <button className="cursor-pointer text-gray-400 hover:text-gray-600"><LuChevronLeft size={18} /></button>
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          <img src={`${EP}/Calendario.svg`} alt="Calendario" className="w-4 h-4" /> {monthYear}
        </h3>
        <button className="cursor-pointer text-gray-400 hover:text-gray-600"><LuChevronRight size={18} /></button>
      </div>

      {/* Week grid */}
      <div className="mb-4 grid grid-cols-7 gap-1 text-center text-xs">
        {days.map((day) => (
          <div key={day.date} className="flex flex-col items-center gap-1">
            <span className="text-gray-400 font-medium">{day.dayOfWeek}</span>
            <span
              className={
                day.isToday
                  ? 'flex h-7 w-7 items-center justify-center rounded bg-dylo-orange text-white font-bold'
                  : 'flex h-7 w-7 items-center justify-center font-semibold text-gray-700'
              }
            >
              {day.date}
            </span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="mb-3 flex gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveFilter(tab.type)}
            className={`cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors border ${
              activeFilter === tab.type
                ? 'bg-neutral-600 text-white border-neutral-700'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Absent people */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          {filtered.map((person) => (
            <Avatar
              key={person.id}
              src={person.avatarUrl}
              name={person.name}
              size="md"
            />
          ))}
        </div>
        {filtered.length > 0 && (
          <span className="text-xs text-gray-500">
            {filtered.length} persona{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
