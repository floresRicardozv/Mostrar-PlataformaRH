import type { ReactNode } from 'react';

interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  collapsed: boolean;
}

export function SidebarNavItem({ icon, label, isActive = false, collapsed }: SidebarNavItemProps) {
  return (
    <li
      className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer transition-colors duration-200 rounded-md
        ${isActive ? 'bg-white/10 border-l-2 border-dylo-orange' : 'hover:bg-white/5'}
        ${collapsed ? 'justify-center px-0' : ''}
      `}
    >
      <span className={`shrink-0 w-6 text-center ${isActive ? 'text-dylo-orange' : 'text-white/80'}`}>{icon}</span>
      {!collapsed && (
        <span className=" text-white whitespace-nowrap overflow-hidden">{label}</span>
      )}
    </li>
  );
}
