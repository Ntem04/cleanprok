import type { PlanningSlotItem } from "../../../../services/dashboardServicesApi";

interface PlanningCalendarViewProps {
  readonly slots: readonly PlanningSlotItem[];
  readonly selectedSlotId: string | null;
  readonly onSelectSlot: (slot: PlanningSlotItem) => void;
}

const HOURS = ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00"];

export default function PlanningCalendarView({
  slots,
  selectedSlotId,
  onSelectSlot,
}: PlanningCalendarViewProps) {
  // Regroupement par jour
  const tuesdaySlots = slots.filter((s) => s.day.includes("16"));
  const wednesdaySlots = slots.filter((s) => s.day.includes("17"));
  const otherSlots = slots.filter(
    (s) => !s.day.includes("16") && !s.day.includes("17")
  );

  return (
    <section
      aria-label="Planning des créneaux horaires"
      className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs"
    >
      {/* En-tête de la section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-[#15364a]">
          Interventions du planning
        </h2>
        <p className="mt-0.5 text-sm text-slate-400">
          Créneaux enregistrés et synchronisés · Données prêtes pour la base de données
        </p>
      </div>

      {/* Grille horaire */}
      <div className="grid grid-cols-12 gap-3 sm:gap-4 pt-2">
        {/* Colonne des heures */}
        <div className="col-span-2 sm:col-span-1 space-y-12 sm:space-y-14 pt-11 text-right pr-2">
          {HOURS.map((hour) => (
            <div key={hour} className="text-[13px] font-medium text-slate-400">
              {hour}
            </div>
          ))}
        </div>

        {/* Colonnes des jours */}
        <div
          className={`col-span-10 sm:col-span-11 grid grid-cols-1 ${
            otherSlots.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-4`}
        >
          {/* Mardi 16 septembre */}
          <div className="space-y-3">
            <div className="rounded-lg bg-[#eef7f2] px-3.5 py-2 text-center text-sm font-bold text-[#15364a] border border-emerald-100">
              Mardi 16 septembre
            </div>

            <div className="min-h-90 space-y-4 rounded-lg bg-slate-50/50 p-2.5 border border-dashed border-slate-200/70">
              {tuesdaySlots.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-slate-400">
                  Aucune intervention
                </div>
              ) : (
                tuesdaySlots.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  return (
                    <article
                      key={slot.id}
                      onClick={() => onSelectSlot(slot)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectSlot(slot);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      className={`relative flex flex-col justify-between rounded-lg p-3.5 text-sm cursor-pointer transition-all duration-150 border-l-4 focus-visible:outline-2 focus-visible:outline-[#135d3b] ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-100/90 shadow-md ring-1 ring-emerald-500/30"
                          : "border-emerald-500 bg-[#e8f5ee] hover:bg-emerald-100/70 shadow-2xs"
                      }`}
                    >
                      <div>
                        <h3 className="font-bold text-[#15364a] text-sm">
                          {slot.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {slot.location}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-[#135d3b] tabular-nums">
                        <span>
                          {slot.startTime}–{slot.endTime}
                        </span>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          {/* Mercredi 17 septembre */}
          <div className="space-y-3">
            <div className="rounded-lg bg-slate-50 px-3.5 py-2 text-center text-sm font-bold text-[#15364a] border border-slate-200">
              Mercredi 17 septembre
            </div>

            <div className="min-h-[360px] space-y-4 rounded-lg bg-slate-50/50 p-2.5 border border-dashed border-slate-200/70">
              {wednesdaySlots.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-slate-400">
                  Aucune intervention
                </div>
              ) : (
                wednesdaySlots.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  return (
                    <article
                      key={slot.id}
                      onClick={() => onSelectSlot(slot)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectSlot(slot);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      className={`relative flex flex-col justify-between rounded-lg p-3.5 text-sm cursor-pointer transition-all duration-150 border-l-4 focus-visible:outline-2 focus-visible:outline-[#135d3b] ${
                        isSelected
                          ? "border-sky-600 bg-sky-100/90 shadow-md ring-1 ring-sky-500/30"
                          : "border-sky-500 bg-[#edf5fc] hover:bg-sky-100/70 shadow-2xs"
                      }`}
                    >
                      <div>
                        <h3 className="font-bold text-[#15364a] text-sm">
                          {slot.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {slot.location}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-sky-800 tabular-nums">
                        <span>
                          {slot.startTime}–{slot.endTime}
                        </span>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          {/* Autres dates synchronisées depuis la BDD */}
          {otherSlots.length > 0 && (
            <div className="space-y-3">
              <div className="rounded-lg bg-[#e8f5ee] px-3.5 py-2 text-center text-sm font-bold text-[#135d3b] border border-emerald-200">
                Autres dates (BDD)
              </div>

              <div className="min-h-90 space-y-4 rounded-lg bg-slate-50/50 p-2.5 border border-dashed border-slate-200/70">
                {otherSlots.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  return (
                    <article
                      key={slot.id}
                      onClick={() => onSelectSlot(slot)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectSlot(slot);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      className={`relative flex flex-col justify-between rounded-lg p-3.5 text-sm cursor-pointer transition-all duration-150 border-l-4 focus-visible:outline-2 focus-visible:outline-[#135d3b] ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-100/90 shadow-md ring-1 ring-emerald-500/30"
                          : "border-emerald-500 bg-[#e8f5ee] hover:bg-emerald-100/70 shadow-2xs"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-bold text-[#15364a] text-sm">
                            {slot.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {slot.day}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {slot.location}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[13px] font-semibold text-[#135d3b] tabular-nums">
                        <span>
                          {slot.startTime}–{slot.endTime}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

