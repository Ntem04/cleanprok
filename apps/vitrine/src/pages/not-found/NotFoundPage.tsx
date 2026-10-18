import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import Reveal from "../../components/ui/Reveal";
// LIGNE À DÉCOMMENTER QUAND TU AURAS TON FICHIER LOTTIE :
// import Lottie from "lottie-react";
// import notFoundAnimation from "../assets/animations/404_search.json";

export default function NotFoundPage() {
  const error = useRouteError();

  // SÉCURITÉ (CWE-209 & CWE-532) : Journalisation interne uniquement en DEV.
  // On ne divulgue jamais l'objet d'erreur brut au client final en production.
  if (import.meta.env.DEV) {
    console.error("Erreur interceptée :", error);
  }

  let errorMessage =
    "La page que vous recherchez est introuvable ou a été déplacée.";

  if (isRouteErrorResponse(error) && error.status !== 404) {
    errorMessage =
      "Une erreur inattendue est survenue lors du chargement de la page.";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f9f6] px-4 text-center font-sans">
      <Reveal direction="up" delay={200}>
        <div className="max-w-md w-full flex flex-col items-center">
          {/* 
            ZONE D'ANIMATION (Standard Industriel Lottie)
            Remplace ce bloc <div> par ton composant <Lottie /> une fois le fichier JSON obtenu.
            Exemple : <Lottie animationData={notFoundAnimation} loop={false} className="w-56 h-56 mb-6" />
          */}
          <div className="relative mb-8 w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-200">
            <SearchX
              className="w-20 h-20 text-[#1d6f4c] animate-pulse"
              aria-hidden="true"
            />
          </div>

          <h1 className="mb-3 text-[4rem] font-extrabold text-slate-900 leading-none">
            Erreur 404
          </h1>
          <h2 className="mb-4 text-[1.5rem] font-bold text-slate-800 tracking-tight">
            Page introuvable
          </h2>
          <p className="mb-10 text-[15px] text-slate-600 font-medium leading-relaxed">
            {errorMessage}
          </p>

          {/* SÉCURITÉ UX : outline-none et focus-visible pour la navigation clavier */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#1d6f4c] hover:bg-[#155439] text-white font-bold text-[14px] py-3.5 px-8 rounded-full transition-colors outline-none focus-visible:ring-4 focus-visible:ring-[#1d6f4c]/40"
          >
            <Home className="w-4 h-4 stroke-2" aria-hidden="true" />
            Retour Accueil
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
