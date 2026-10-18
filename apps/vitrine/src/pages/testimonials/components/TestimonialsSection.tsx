import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Reveal from "../../../components/ui/Reveal";

// SÉCURITÉ & ARCHITECTURE : Typage strict préparant l'arrivée de la base de données.
interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  avatarSrc: string;
}

// SÉCURITÉ (CWE-502) : Les données fictives sont gelées en mémoire.
// PRÉPARATION API : Ce tableau sera remplacé par un état React alimenté par le futur backend.
const testimonialsData: readonly Testimonial[] = Object.freeze([
  {
    id: "t1",
    author: "Amina Diallo",
    role: "Directrice RH",
    content:
      "Un service impeccable ! Nos locaux sont toujours propres et bien entretenus. L'équipe est professionnelle et très réactive.",
    rating: 5,
    avatarSrc: "/images/avatars/amina.jpg",
  },
  {
    id: "t2",
    author: "Samuel Nguema",
    role: "Responsable Logistique",
    content:
      "La flexibilité des horaires et la qualité du service sont vraiment un plus. Je recommande CleanPro sans hésitation.",
    rating: 5,
    avatarSrc: "/images/avatars/samuel.jpg",
  },
  {
    id: "t3",
    author: "Lucie Bernard",
    role: "Responsable Administratif",
    content:
      "Grâce à CleanPro, nous avons un environnement de travail plus sain et plus agréable pour tous.",
    rating: 5,
    avatarSrc: "/images/avatars/lucie.jpg",
  },
]);

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      aria-labelledby="temoignages_titre"
      className="w-full bg-white py-16 lg:py-24 border-t border-slate-100 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-8 lg:px-10 xl:px-12 font-sans">
        {/* En-tête : Titre et Boutons de navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10 lg:mb-12">
          <div>
            <Reveal direction="up" delay={100}>
              <span className="text-[#1d6f4c] font-bold text-[11px] uppercase tracking-widest block mb-2">
                TÉMOIGNAGES
              </span>
              <h2
                id="temoignages_titre"
                className="text-[1.75rem] lg:text-[2rem] font-extrabold text-slate-900 leading-tight tracking-tight"
              >
                Ils nous font confiance
              </h2>
            </Reveal>
          </div>

          {/* Contrôles du carrousel avec icônes (Pas de boutons pilules, cercles parfaits) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Avis précédents"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1d6f4c] hover:border-[#1d6f4c] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#1d6f4c]"
            >
              <ChevronLeft className="w-5 h-5 stroke-2" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Avis suivants"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1d6f4c] hover:border-[#1d6f4c] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#1d6f4c]"
            >
              <ChevronRight className="w-5 h-5 stroke-2" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carrousel des cartes avec CSS natif (sans animations superflues) */}
        <Reveal direction="up" delay={200}>
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none" }}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Carrousel des témoignages"
          >
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="snap-start shrink-0 w-[90vw] sm:w-[30rem] bg-white rounded-xl p-6 lg:p-7 border border-slate-200 shadow-sm"
              >
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <img
                    src={testimonial.avatarSrc}
                    alt={`Photo de ${testimonial.author}`}
                    loading="lazy"
                    draggable={false}
                    className="w-14 h-14 rounded-full object-cover shrink-0 bg-slate-100"
                  />

                  {/* Contenu */}
                  <div className="flex flex-col flex-1">
                    <p className="text-[14px] text-slate-600 font-medium leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-end justify-between gap-4 mt-auto">
                      <div>
                        <h3 className="text-[14px] font-bold text-slate-900 leading-tight mb-0.5">
                          {testimonial.author}
                        </h3>
                        <p className="text-[12px] text-slate-500 font-medium">
                          {testimonial.role}
                        </p>
                      </div>

                      <div
                        className="flex items-center gap-0.5 text-[#1d6f4c]"
                        aria-label={`${testimonial.rating} étoiles`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current stroke-current"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
