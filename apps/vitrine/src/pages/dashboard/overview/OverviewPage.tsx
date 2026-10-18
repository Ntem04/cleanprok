import { lazy, Suspense } from "react";
import OverviewHeroBanner from "./components/OverviewHeroBanner";
import MonthlyInterventionsCard from "./components/MonthlyInterventionsCard";
import RecentInterventionsTable from "./components/RecentInterventionsTable";
import EngagementBanner from "./components/EngagementBanner";
import NotificationsAside from "./components/NotificationsAside";
import UpcomingInterventionsAside from "./components/UpcomingInterventionsAside";

const InterventionsChartCard = lazy(
  () => import("./components/InterventionsChartCard"),
);
const ServicesDistributionCard = lazy(
  () => import("./components/ServicesDistributionCard"),
);

function ChartCardsFallback() {
  return (
    <>
      <div className="h-[21rem] animate-pulse rounded-xl border border-slate-200/80 bg-slate-100" />
      <div className="h-[21rem] animate-pulse rounded-xl border border-slate-200/80 bg-slate-100" />
    </>
  );
}

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Grille principale 2 colonnes (Centre 8/12 + Droite 4/12) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Colonne Principale (Gauche / Centre) */}
        <section
          aria-label="Opérations et statistiques principales"
          className="space-y-6 xl:col-span-8"
        >
          {/* Bannière de bienvenue avec visuel professionnel */}
          <OverviewHeroBanner />

          {/* Carte métrique d'interventions */}
          <MonthlyInterventionsCard />

          {/* Grille des 2 cartes graphiques & répartition */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Suspense fallback={<ChartCardsFallback />}>
              <InterventionsChartCard />
              <ServicesDistributionCard />
            </Suspense>
          </div>

          {/* Tableau des dernières interventions */}
          <RecentInterventionsTable />

          {/* Bannière d'engagement qualité CleanPro */}
          <EngagementBanner />
        </section>

        {/* Colonne Latérale Droite (Notifications & Prochaines Interventions) */}
        <aside
          aria-label="Alertes et calendrier d'interventions"
          className="space-y-6 xl:col-span-4"
        >
          <NotificationsAside />
          <UpcomingInterventionsAside />
        </aside>
      </div>
    </div>
  );
}
