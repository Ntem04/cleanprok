import OfficeImg from "../../../../image/services-bureaux0.webp";

export default function EngagementBanner() {
  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-xl border border-emerald-100 bg-[#eef7f2] p-5 sm:flex-row sm:items-center">
      {/* Vignette Photo Bureau */}
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:w-44">
        <img
          src={OfficeImg}
          alt="Espace de travail professionnel entretenu par CleanPro"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Contenu textuel */}
      <div className="space-y-1">
        <span className="text-sm font-semibold text-[#1a5f3e]">
          Notre engagement
        </span>
        <h3 className="text-base font-extrabold tracking-tight text-[#15364a] sm:text-lg">
          Qualité, confiance et durabilité
        </h3>
        <p className="text-sm sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Nous nous engageons à offrir des services de nettoyage professionnels, responsables et adaptés à vos besoins.
        </p>
      </div>
    </div>
  );
}
