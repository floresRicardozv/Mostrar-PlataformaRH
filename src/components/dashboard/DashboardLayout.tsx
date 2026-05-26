import { type ReactNode, useState } from 'react';
import { useSidebarStore } from '../../stores/useSidebarStore';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  rightSidebar: ReactNode;
}

/**
 * Breakpoints actuales:
 * - sm  ≥ 640px
 * - md  ≥ 768px
 * - lg  ≥ 1024px  → muestra el sidebar IZQUIERDO fijo (oculta su botón hamburguesa)
 * - xl  ≥ 1280px  → muestra el sidebar DERECHO fijo (oculta su botón) + 2 anuncios en NewsCarousel
 *
 * Por debajo de cada breakpoint, el sidebar correspondiente se convierte en overlay
 * accesible mediante el botón flotante en la esquina superior.
 */
export function DashboardLayout({ children, rightSidebar }: DashboardLayoutProps) {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const open = !collapsed;
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Left menu button — visible <lg (mobile + tablet) */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#1a1a1a] text-white p-2 rounded-lg shadow-lg"
        onClick={() => useSidebarStore.getState().toggle()}
        aria-label="Abrir menú"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Right panel button — visible <xl (mobile + tablet + small laptop) */}
      <button
        className="fixed top-4 right-4 z-50 xl:hidden bg-[#1a1a1a] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setRightOpen((v) => !v)}
        aria-label={rightOpen ? 'Cerrar panel' : 'Abrir panel'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
      </button>

      {/* Left sidebar overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => useSidebarStore.getState().toggle()}
        />
      )}

      {/* Right sidebar overlay backdrop */}
      {rightOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 xl:hidden"
          onClick={() => setRightOpen(false)}
        />
      )}

      {/* Left Sidebar — fixed on lg+, overlay below */}
      <div
        className={`
          shrink-0 z-40 transition-transform duration-300
          fixed lg:relative h-screen
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Right sidebar — fixed on xl+, overlay below */}
      <aside
        className={`
          fixed xl:relative right-0 top-0 h-screen z-40
          w-[85vw] sm:w-[380px] xl:w-[420px]
          shrink-0 overflow-y-auto scrollbar-hide py-6 px-6 xl:px-8 bg-gray-100
          transition-transform duration-300
          ${rightOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}
        `}
      >
        {rightSidebar}
      </aside>
    </div>
  );
}
