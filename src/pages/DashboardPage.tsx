import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { WelcomeHeader } from '../components/dashboard/WelcomeHeader';
import { RequestCards } from '../components/dashboard/RequestCards';
import { NewsCarousel } from '../components/dashboard/NewsCarousel';
import { WelcomeBar } from '../components/dashboard/WelcomeBar';
import { ConveniosGrid } from '../components/dashboard/ConveniosGrid';
import { RightSidebar } from '../components/dashboard/RightSidebar';

export const DashboardPage = () => (
  <DashboardLayout rightSidebar={<RightSidebar />}>
    <div className="space-y-6">
      {/* Bienvenida + Solicitudes */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <WelcomeHeader />
        <div className="mt-4">
          <RequestCards />
        </div>
      </div>

      {/* Carrusel de noticias */}
      <NewsCarousel />

      {/* Barra de bienvenida */}
      <WelcomeBar />

      {/* Convenios */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <ConveniosGrid />
      </div>
    </div>
  </DashboardLayout>
);
