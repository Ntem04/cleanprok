import Reveal from "../../components/ui/Reveal";
import Process from "./components/Process";
import HomeHero from "./components/HomeHero";
import ServiceLevels from "./components/ServiceLevels";
import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialsSection from "../testimonials/components/TestimonialsSection";

export default function HomePage() {
  return (
    // SÉCURITÉ UI : overflow-hidden empêche les barres de défilement horizontales
    // fantômes pendant les animations de translation (translate-x/y).
    <div className="w-full bg-white flex flex-col overflow-hidden">
      {/* 1. Le haut de la page (Hero) - Apparition en fondu simple au chargement */}
      <Reveal direction="none">
        <HomeHero />
      </Reveal>

      {/* 2. La section des niveaux de services - Glissement doux vers le haut au scroll */}
      <Reveal direction="up" delay={200}>
        <ServiceLevels />
      </Reveal>
      <Reveal direction="up" delay={200}>
        <WhyChooseUs />
      </Reveal>
      <Reveal direction="up" delay={200}>
        <Process />
      </Reveal>
      <Reveal direction="right" delay={200}>
        <TestimonialsSection />
      </Reveal>

      {/* C'est ici que tu ajouteras tes futures sections (Ex: <PourquoiNousChoisir />, <Processus />) */}
    </div>
  );
}
