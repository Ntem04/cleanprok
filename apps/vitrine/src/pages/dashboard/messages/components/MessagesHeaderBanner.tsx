import { Mail } from "lucide-react";

export default function MessagesHeaderBanner() {
  return (
    <div className="space-y-4">
      {/* Titre et sous-titre de la page */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#15364a]">
          Messages
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Boîte de réception de l&apos;agence · Informations disponibles dans la capture
        </p>
      </div>

      {/* Bannière de notification supérieure */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#eef7f2] border border-emerald-100 px-4 py-3.5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100/80 text-[#135d3b]">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold text-[#135d3b]">
            3 messages signalés dans la capture
          </span>
        </div>

        <span className="text-xs font-semibold text-[#135d3b] bg-emerald-100/70 border border-emerald-200/60 rounded-full px-3 py-1 self-start sm:self-auto">
          Septembre 2025
        </span>
      </div>
    </div>
  );
}

