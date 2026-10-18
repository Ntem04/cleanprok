import {
  Building2,
  Factory,
  Home,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import ServiceCard, { type ServiceCardData } from "./ServiceCard";
import bureauxImage from "../../../image/services-bureaux0.webp";
import industriesImage from "../../../image/industriesImage.webp";
import publicsImage from "../../../image/services-publics.webp";
import residencesImage from "../../../image/services-residences.webp";

const services: readonly ServiceCardData[] = [
  {
    id: "bureaux",
    badgeTitle: "Bureaux",
    badgeIcon: Building2,
    tag: "NOS SERVICES",
    title: "Nettoyage de bureaux",
    description:
      "Un environnement de travail plus propre, plus sain et plus agréable pour vos équipes et vos visiteurs.",
    features: [
      "Nettoyage des surfaces et des sols",
      "Entretien des espaces de travail",
      "Plan de maintenance régulier",
    ],
    highlightText: "Un espace de travail plus propre pour mieux travailler.",
    highlightIcon: ShieldCheck,
    image: bureauxImage,
    layout: "image-left",
  },
  {
    id: "residences",
    badgeTitle: "Résidences & Appartements",
    badgeIcon: Home,
    tag: "NOS SERVICES",
    title: "Résidences & Appartements",
    description:
      "Nous prenons soin de votre intérieur avec des prestations de nettoyage complètes et personnalisées, pour un cadre de vie propre et agréable.",
    features: [
      "Ménage régulier ou ponctuel",
      "Nettoyage en profondeur",
      "Lavage des vitres",
    ],
    highlightText: "Un intérieur propre, pour un quotidien plus serein.",
    highlightIcon: Home,
    image: residencesImage,
    layout: "callout-left",
  },
  {
    id: "industries",
    badgeTitle: "Industries & Entrepôts",
    badgeIcon: Factory,
    tag: "NOS SERVICES",
    title: "Industries & Entrepôts",
    description:
      "Nous intervenons dans les environnements industriels et logistiques pour un nettoyage en profondeur, sécurisé et conforme aux normes de sécurité.",
    features: [
      "Grandes espaces et zones de stockage",
      "Équipements industriels",
      "Nettoyage haute pression",
    ],
    highlightText: "Des espaces industriels propres et sécurisés.",
    highlightIcon: Sparkles,
    image: industriesImage,
    layout: "image-left",
  },
  {
    id: "publics",
    badgeTitle: "Espaces publics & Événements",
    badgeIcon: Landmark,
    tag: "NOS SERVICES",
    title: "Espaces publics & Événements",
    description:
      "Nous intervenons dans les lieux publics et lors de vos événements pour garantir un espace propre, accueillant et sécurisé pour tous.",
    features: [
      "Centres commerciaux",
      "Événements professionnels et privés",
      "Nettoyage après événement",
    ],
    highlightText: "Des lieux accueillants pour tous vos visiteurs.",
    highlightIcon: Users,
    image: publicsImage,
    layout: "callout-left",
  },
];

export default function ServicesList() {
  return (
    <section
      aria-labelledby="services_list_title"
      className="bg-[#f7fbf9] px-4 py-7 sm:px-6 lg:px-8 lg:py-9"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex items-center gap-2 sm:mb-8">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0d8d5e]/10 text-[#0d8d5e]">
            <span
              className="h-2.5 w-2.5 rounded-full bg-[#0d8d5e]"
              aria-hidden="true"
            />
          </span>
          <p
            id="services_list_title"
            className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0d8d5e]"
          >
            NOS SERVICES
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
