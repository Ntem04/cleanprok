import { NavLink } from "react-router-dom";
import {
  Home,
  FileSpreadsheet,
  Users,
  CalendarDays,
  BarChart3,
  Mail,
  Settings,
  Leaf,
} from "lucide-react";
import CleanProLogo from "../../../assets/icon.webp";
import OfficeImg from "../../../image/services-bureaux0.webp";

interface NavItem {
  readonly to: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string; size?: number; "aria-hidden"?: boolean }>;
  readonly badge?: number;
  readonly end?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = Object.freeze([
  {
    to: "/dashboard",
    label: "Tableau de bord",
    icon: Home,
    end: true,
  },
  {
    to: "/dashboard/services",
    label: "Nos Services",
    icon: FileSpreadsheet,
  },
  {
    to: "/dashboard/teams",
    label: "Nos Équipes",
    icon: Users,
  },
  {
    to: "/dashboard/planning",
    label: "Planning",
    icon: CalendarDays,
  },
  {
    to: "/dashboard/reports",
    label: "Rapports",
    icon: BarChart3,
  },
  {
    to: "/dashboard/messages",
    label: "Messages",
    icon: Mail,
    badge: 3,
  },
  {
    to: "/dashboard/settings",
    label: "Paramètres",
    icon: Settings,
  },
]);

interface DashboardSidebarProps {
  readonly isOpenMobile?: boolean;
  readonly onCloseMobile?: () => void;
}

export default function DashboardSidebar({
  isOpenMobile = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  return (
    <>
      {/* Overlay accessible mobile (WCAG 2.2 AA) */}
      {isOpenMobile && (
        <div
          aria-hidden="true"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      <aside
        id="dashboard-sidebar-nav"
        aria-label="Navigation principale du tableau de bord"
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col justify-between overflow-y-auto border-r border-slate-200/80 bg-white transition-transform duration-200 ease-in-out ${
          isOpenMobile ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0 lg:shadow-none"
        }`}
      >
        <div>
          {/* Logo officiel CleanPro conforme au visuel */}
          <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
            <div className="flex items-center gap-2.5">
              <img
                src={CleanProLogo}
                alt="CleanPro Services de Nettoyage"
                className="h-9 w-auto object-contain"
              />
              <div className="leading-tight">
                <span className="block text-base font-extrabold tracking-tight text-[#15364a]">
                  CleanPro
                </span>
                <span className="block text-sm font-medium text-slate-500">
                  Services de Nettoyage
                </span>
              </div>
            </div>

            {/* Bouton fermeture sur mobile */}
            {isOpenMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Fermer la barre latérale"
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#135d3b] lg:hidden"
              >
                &times;
              </button>
            )}
          </div>

          {/* Menu de navigation */}
          <nav className="px-3.5 py-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#135d3b] ${
                          isActive
                            ? "bg-[#135d3b] text-white shadow-xs"
                            : "text-[#27495e] hover:bg-slate-50 hover:text-[#135d3b]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon
                              size={17}
                              aria-hidden={true}
                              className={`shrink-0 transition-colors ${
                                isActive ? "text-white" : "text-[#27495e] group-hover:text-[#135d3b]"
                              }`}
                            />
                            <span>{item.label}</span>
                          </div>

                          {/* Badge de notification géométrique (valeur exacte "3") */}
                          {item.badge !== undefined && (
                            <span
                              aria-label={`${item.badge} notifications non lues`}
                              className={`inline-flex h-5 min-w-5 items-center justify-center rounded px-1.5 text-[13px] font-bold tabular-nums ${
                                isActive
                                  ? "bg-white text-[#135d3b]"
                                  : "bg-[#135d3b] text-white"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bloc Bas de Sidebar : Accroche d'entreprise & Visuel bureau */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700">
            <Leaf size={16} aria-hidden={true} />
            <p className="text-[13px] font-medium leading-snug text-slate-700">
              Des espaces plus propres, une meilleure qualité de vie.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <img
              src={OfficeImg}
              alt="Locaux d'entreprise entretenus"
              className="h-24 w-full object-cover"
              loading="lazy"
            />
          </div>

          <p className="text-sm text-slate-400 text-center font-medium">
            CleanPro · Services de Nettoyage
          </p>
        </div>
      </aside>
    </>
  );
}
