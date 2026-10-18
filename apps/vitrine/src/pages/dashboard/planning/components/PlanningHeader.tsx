import { ChevronLeft, ChevronRight, Plus, Search, ChevronDown } from "lucide-react";
import type { ChangeEvent } from "react";

interface PlanningHeaderProps {
  readonly periodLabel: string;
  readonly badgeLabel: string;
  readonly viewMode: "jour" | "semaine";
  readonly onViewModeChange: (mode: "jour" | "semaine") => void;
  readonly onPrevWeek: () => void;
  readonly onNextWeek: () => void;
  readonly onPlanIntervention: () => void;
  readonly searchQuery: string;
  readonly onSearchChange: (query: string) => void;
  readonly selectedService: string;
  readonly onServiceChange: (service: string) => void;
  readonly selectedTeam: string;
  readonly onTeamChange: (team: string) => void;
}

export default function PlanningHeader({
  periodLabel,
  badgeLabel,
  viewMode,
  onViewModeChange,
  onPrevWeek,
  onNextWeek,
  onPlanIntervention,
  searchQuery,
  onSearchChange,
  selectedService,
  onServiceChange,
  selectedTeam,
  onTeamChange,
}: PlanningHeaderProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value.replace(/[<>]/g, ""));
  };

  return (
    <div className="space-y-4">
      {/* ── Titre principal & Bouton "Planifier une intervention" ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#15364a]">
            Planning
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Agenda des interventions documentées · Septembre 2025
          </p>
        </div>

        <button
          type="button"
          onClick={onPlanIntervention}
          className="inline-flex items-center justify-center gap-1.5 self-start rounded-md bg-[#135d3b] px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-[#0f4d30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#135d3b] sm:self-auto"
        >
          <Plus size={15} aria-hidden={true} />
          <span>Planifier une intervention</span>
        </button>
      </div>

      {/* ── Sélecteur de période & Mode Vue (Jour / Semaine) ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Navigation semaine avec flèches chevron */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevWeek}
            aria-label="Période précédente"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#135d3b]"
          >
            <ChevronLeft size={16} aria-hidden={true} />
          </button>

          <span className="text-sm font-bold text-[#15364a] px-1">
            {periodLabel}
          </span>

          <button
            type="button"
            onClick={onNextWeek}
            aria-label="Période suivante"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#135d3b]"
          >
            <ChevronRight size={16} aria-hidden={true} />
          </button>

          {/* Badge Période de capture sobre & neutre */}
          <span className="ml-2 inline-flex items-center rounded-md border border-slate-200 bg-slate-100/80 px-2.5 py-1 text-[13px] font-medium text-slate-700">
            {badgeLabel}
          </span>
        </div>

        {/* Boutons bascule Jour / Semaine */}
        <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange("jour")}
            className={`rounded px-3 py-1 text-sm font-semibold transition ${
              viewMode === "jour"
                ? "bg-[#135d3b] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Jour
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("semaine")}
            className={`rounded px-3 py-1 text-sm font-semibold transition ${
              viewMode === "semaine"
                ? "bg-[#135d3b] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Semaine
          </button>
        </div>
      </div>

      {/* ── Barre de recherche & Filtres déroulants ── */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Recherche */}
        <div className="relative flex-1">
          <Search
            size={16}
            aria-hidden={true}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Rechercher une intervention..."
            aria-label="Rechercher une intervention dans le planning"
            className="w-full rounded-md border border-slate-200/90 bg-white py-2 pl-10 pr-3.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-[#135d3b] focus:outline-hidden focus:ring-1 focus:ring-[#135d3b]"
          />
        </div>

        {/* Dropdowns : Tous les services & Équipe */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Tous les services */}
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => onServiceChange(e.target.value)}
              aria-label="Filtrer par service"
              className="appearance-none rounded-md border border-slate-200/90 bg-white py-2 pl-3.5 pr-8 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:border-[#135d3b] focus:outline-hidden focus:ring-1 focus:ring-[#135d3b]"
            >
              <option value="all">Tous les services</option>
              <option value="bureau">Bureaux & Espaces professionnels</option>
              <option value="residence">Résidences & Espaces communs</option>
              <option value="industrie">Nettoyage industriel</option>
              <option value="evenement">Événement spécial</option>
            </select>
            <ChevronDown
              size={14}
              aria-hidden={true}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Équipe */}
          <div className="relative">
            <select
              value={selectedTeam}
              onChange={(e) => onTeamChange(e.target.value)}
              aria-label="Filtrer par équipe affectée"
              className="appearance-none rounded-md border border-slate-200/90 bg-white py-2 pl-3.5 pr-8 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:border-[#135d3b] focus:outline-hidden focus:ring-1 focus:ring-[#135d3b]"
            >
              <option value="all">Équipe : À compléter</option>
              <option value="alpha">Équipe Alpha</option>
              <option value="beta">Équipe Bêta</option>
              <option value="gamma">Équipe Gamma</option>
            </select>
            <ChevronDown
              size={14}
              aria-hidden={true}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

