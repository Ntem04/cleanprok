// ─── Types pour la répartition des services ───────────────────────────────────

export interface ServiceDistributionItem {
  /** Libellé de la catégorie de prestation */
  readonly name: string;
  /** Pourcentage de la catégorie (0–100) */
  readonly percentage: number;
  /** Nombre réel d'interventions calculé ou reçu du backend */
  readonly value: number;
  /** Couleur hexadécimale pour le segment du graphique */
  readonly color: string;
}

export interface ServicesDistributionApiResponse {
  readonly total: number;
  /** Pourcentage d'évolution par rapport au mois dernier (ex: +8%) */
  readonly changePercentage?: number;
  readonly data: readonly ServiceDistributionItem[];
}

// ─── Types pour l'évolution des interventions ─────────────────────────────────

export interface InterventionHistoryPoint {
  readonly date: string;
  readonly interventions: number;
}

export interface InterventionsHistoryApiResponse {
  readonly period: string;
  readonly peak: {
    readonly date: string;
    readonly interventions: number;
  };
  readonly data: readonly InterventionHistoryPoint[];
}

// ─── Types pour les dernières interventions (Tableau) ─────────────────────────

export type InterventionStatus = "Terminée" | "En cours" | "Planifiée";

export interface RecentInterventionItem {
  readonly id: string;
  readonly dateTime: string;
  readonly client: string;
  readonly service: string;
  readonly team: string;
  readonly status: InterventionStatus;
}

export interface RecentInterventionsApiResponse {
  readonly total: number;
  readonly data: readonly RecentInterventionItem[];
}

// ─── Types pour les prochaines interventions (Colonne latérale) ───────────────

export interface UpcomingInterventionItem {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly schedule: string;
  readonly category?: "bureau" | "residence" | "industrie" | "evenement";
}

export interface UpcomingInterventionsApiResponse {
  readonly total: number;
  readonly data: readonly UpcomingInterventionItem[];
}

// ─── Types pour le planning d'interventions ───────────────────────────────────

export interface PlanningSlotItem {
  readonly id: string;
  readonly day: "Mardi 16 septembre" | "Mercredi 17 septembre" | string;
  readonly dateFormatted: string; // ex: "16/09/2025"
  readonly title: string; // ex: "Nettoyage de bureaux"
  readonly location: string; // ex: "Siège social – Yaoundé"
  readonly startTime: string; // ex: "08:00"
  readonly endTime: string; // ex: "12:00"
  readonly team: string; // ex: "À compléter" ou "Équipe Alpha"
  readonly category: "bureau" | "residence" | "industrie" | "evenement";
  readonly colorTheme?: "emerald" | "sky" | "amber";
}

export interface PlanningApiResponse {
  readonly periodLabel: string;
  readonly badgeLabel: string;
  readonly slots: readonly PlanningSlotItem[];
}

export type CreatePlanningSlotPayload = Omit<PlanningSlotItem, "id">;

// ─── Types pour le catalogue Nos Services ────────────────────────────────────

export type ServiceAvailabilityStatus = "disponible" | "indisponible" | "desactive";

export interface ServiceCatalogItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly prestations: readonly string[];
  readonly status: ServiceAvailabilityStatus;
  readonly badgeLabel?: string;
  readonly isSelected?: boolean;
}

export interface ServicesCatalogApiResponse {
  readonly total: number;
  readonly data: readonly ServiceCatalogItem[];
}

export type CreateServicePayload = Omit<ServiceCatalogItem, "id" | "badgeLabel" | "isSelected">;

// ─── Types pour les Paramètres (Settings) ────────────────────────────────────

export interface SettingsProfileData {
  readonly name: string;
  readonly role: string;
  readonly email: string;
  readonly avatarUrl?: string;
}

export interface SettingsCompanyData {
  readonly name: string;
  readonly signature: string;
  readonly logoUrl?: string;
}

export interface SettingsContactData {
  readonly phone: string;
  readonly whatsapp: string;
  readonly email: string;
  readonly address: string;
  readonly officeNote: string;
}

export interface SettingsOpeningHoursData {
  readonly weekdays: string;
  readonly saturday: string;
  readonly sunday: string;
  readonly visitors: string;
}

export interface SettingsNotificationPreferencesData {
  readonly interventions: string;
  readonly clientMessages: string;
  readonly reports: string;
}

export interface SettingsApiResponse {
  readonly profile: SettingsProfileData;
  readonly company: SettingsCompanyData;
  readonly contact: SettingsContactData;
  readonly openingHours: SettingsOpeningHoursData;
  readonly notifications: SettingsNotificationPreferencesData;
}

export type UpdateSettingsPayload = {
  readonly profile?: Partial<SettingsProfileData>;
  readonly company?: Partial<SettingsCompanyData>;
  readonly contact?: Partial<SettingsContactData>;
  readonly openingHours?: Partial<SettingsOpeningHoursData>;
  readonly notifications?: Partial<SettingsNotificationPreferencesData>;
};

// ─── Types pour la Gestion des Comptes Administrateurs ───────────────────────

export interface AdminAccountItem {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: "Super Administrateur" | "Administrateur" | "Responsable d'agence" | string;
  readonly avatarUrl?: string;
  readonly createdAt: string;
  readonly isCurrentUser?: boolean;
}

export type CreateAdminPayload = Omit<AdminAccountItem, "id" | "createdAt" | "isCurrentUser">;

// ─── Service API (Axios prêt pour le branchement backend) ─────────────────────

export const dashboardServicesApi = {
  /**
   * Récupère le planning des interventions pour une semaine donnée.
   * Endpoint prévu : GET /dashboard/planning?week=2025-W38
   */
  async getPlanning(_week?: string): Promise<PlanningApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<PlanningApiResponse>(
    //   `/dashboard/planning${week ? `?week=${week}` : ""}`
    // );
    // return response.data;

    try {
      const stored = sessionStorage.getItem("cleanpro_planning_slots");
      if (stored) {
        const parsed = JSON.parse(stored) as readonly PlanningSlotItem[];
        return {
          ...INITIAL_PLANNING_DATA,
          slots: parsed,
        };
      }
    } catch {
      // Ignorer
    }

    return INITIAL_PLANNING_DATA;
  },

  /**
   * Crée un nouveau créneau d'intervention dans le planning (BDD).
   * Endpoint prévu : POST /dashboard/planning
   */
  async createPlanningSlot(payload: CreatePlanningSlotPayload): Promise<PlanningSlotItem> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.post<PlanningSlotItem>(
    //   "/dashboard/planning",
    //   payload
    // );
    // return response.data;

    const newId = `slot-${Date.now()}`;
    const newSlot: PlanningSlotItem = {
      id: newId,
      ...payload,
    };

    try {
      const current = await this.getPlanning();
      const nextSlots = [...current.slots, newSlot];
      sessionStorage.setItem("cleanpro_planning_slots", JSON.stringify(nextSlots));
    } catch {
      // Ignorer si indisponible
    }

    return newSlot;
  },

  /**
   * Met à jour un créneau d'intervention du planning dans la BDD.
   * Endpoint prévu : PUT /dashboard/planning/:id
   */
  async updatePlanningSlot(
    id: string,
    payload: Partial<Omit<PlanningSlotItem, "id">>
  ): Promise<PlanningSlotItem> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.put<PlanningSlotItem>(
    //   `/dashboard/planning/${id}`,
    //   payload
    // );
    // return response.data;

    const current = await this.getPlanning();
    const existing = current.slots.find((s) => s.id === id);
    if (!existing) {
      throw new Error(`Créneau introuvable: ${id}`);
    }
    const updated: PlanningSlotItem = { ...existing, ...payload };
    const nextSlots = current.slots.map((s) => (s.id === id ? updated : s));

    try {
      sessionStorage.setItem("cleanpro_planning_slots", JSON.stringify(nextSlots));
    } catch {
      // Ignorer si indisponible
    }

    return updated;
  },

  /**
   * Supprime un créneau d'intervention du planning en cas d'annulation (BDD).
   * Endpoint prévu : DELETE /dashboard/planning/:id
   */
  async deletePlanningSlot(id: string): Promise<boolean> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // await apiClient.delete(`/dashboard/planning/${id}`);
    // return true;

    try {
      const current = await this.getPlanning();
      const nextSlots = current.slots.filter((s) => s.id !== id);
      sessionStorage.setItem("cleanpro_planning_slots", JSON.stringify(nextSlots));
    } catch {
      // Ignorer si indisponible
    }

    return true;
  },

  /**
   * Récupère le catalogue complet des services (Nos Services).
   * Endpoint prévu : GET /dashboard/services/catalog
   */
  async getCatalog(): Promise<ServicesCatalogApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<ServicesCatalogApiResponse>(
    //   "/dashboard/services/catalog"
    // );
    // return response.data;

    return INITIAL_SERVICES_CATALOG_DATA;
  },

  /**
   * Crée un nouveau service dans la base de données.
   * Endpoint prévu : POST /dashboard/services/catalog
   */
  async createService(payload: CreateServicePayload): Promise<ServiceCatalogItem> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.post<ServiceCatalogItem>(
    //   "/dashboard/services/catalog",
    //   payload
    // );
    // return response.data;

    const newId = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 30) || `service-${Date.now()}`;

    const newService: ServiceCatalogItem = {
      id: newId,
      title: payload.title,
      description: payload.description,
      image: payload.image || "services-bureaux0",
      prestations: payload.prestations,
      status: payload.status,
      badgeLabel: payload.status === "disponible" ? "Disponible" : payload.status === "indisponible" ? "Indisponible" : "Désactivé (Maintenance)",
      isSelected: false,
    };

    return newService;
  },

  /**
   * Met à jour un service existant dans le catalogue.
   * Endpoint prévu : PUT /dashboard/services/catalog/:id
   */
  async updateService(
    id: string,
    payload: Partial<Omit<ServiceCatalogItem, "id">>
  ): Promise<ServiceCatalogItem> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.put<ServiceCatalogItem>(
    //   `/dashboard/services/catalog/${id}`,
    //   payload
    // );
    // return response.data;

    const existing = INITIAL_SERVICES_CATALOG_DATA.data.find((s) => s.id === id);
    if (!existing) {
      throw new Error(`Service introuvable: ${id}`);
    }
    return { ...existing, ...payload };
  },

  /**
   * Récupère la répartition des services depuis l'API.
   * Endpoint prévu : GET /dashboard/services/distribution
   */
  async getDistribution(): Promise<ServicesDistributionApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<ServicesDistributionApiResponse>(
    //   "/dashboard/services/distribution"
    // );
    // return response.data;

    return INITIAL_DISTRIBUTION_DATA;
  },

  /**
   * Récupère l'historique d'évolution des interventions.
   * Endpoint prévu : GET /dashboard/interventions/evolution?days=7
   */
  async getInterventionsEvolution(_days: number = 7): Promise<InterventionsHistoryApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<InterventionsHistoryApiResponse>(
    //   `/dashboard/interventions/evolution?days=${days}`
    // );
    // return response.data;

    return INITIAL_EVOLUTION_DATA;
  },

  /**
   * Récupère les dernières interventions (Tableau principal).
   * Endpoint prévu : GET /dashboard/interventions/recent
   */
  async getRecentInterventions(): Promise<RecentInterventionsApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<RecentInterventionsApiResponse>(
    //   "/dashboard/interventions/recent"
    // );
    // return response.data;

    return INITIAL_RECENT_INTERVENTIONS_DATA;
  },

  /**
   * Récupère les prochaines interventions planifiées (Carte latérale).
   * Endpoint prévu : GET /dashboard/interventions/upcoming
   */
  async getUpcomingInterventions(): Promise<UpcomingInterventionsApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<UpcomingInterventionsApiResponse>(
    //   "/dashboard/interventions/upcoming"
    // );
    // return response.data;

    return INITIAL_UPCOMING_INTERVENTIONS_DATA;
  },

  /**
   * Récupère les paramètres complets du dashboard (profil, entreprise, coordonnées, horaires, notifications).
   * Endpoint prévu : GET /dashboard/settings
   */
  async getSettings(): Promise<SettingsApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<SettingsApiResponse>(
    //   "/dashboard/settings"
    // );
    // return response.data;

    try {
      const stored = sessionStorage.getItem("cleanpro_dashboard_settings");
      if (stored) {
        return JSON.parse(stored) as SettingsApiResponse;
      }
    } catch {
      // Ignorer si sessionStorage est indisponible
    }

    return INITIAL_SETTINGS_DATA;
  },

  /**
   * Met à jour les paramètres du dashboard dans la base de données.
   * Endpoint prévu : PUT /dashboard/settings
   */
  async updateSettings(payload: UpdateSettingsPayload): Promise<SettingsApiResponse> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.put<SettingsApiResponse>(
    //   "/dashboard/settings",
    //   payload
    // );
    // return response.data;

    const current = await this.getSettings();
    const updated: SettingsApiResponse = {
      profile: { ...current.profile, ...(payload.profile || {}) },
      company: { ...current.company, ...(payload.company || {}) },
      contact: { ...current.contact, ...(payload.contact || {}) },
      openingHours: { ...current.openingHours, ...(payload.openingHours || {}) },
      notifications: { ...current.notifications, ...(payload.notifications || {}) },
    };

    try {
      sessionStorage.setItem("cleanpro_dashboard_settings", JSON.stringify(updated));
    } catch {
      // Ignorer si sessionStorage est indisponible
    }

    return updated;
  },

  /**
   * Récupère la liste des comptes administrateurs depuis la BDD.
   * Endpoint prévu : GET /dashboard/admins
   */
  async getAdmins(): Promise<readonly AdminAccountItem[]> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.get<readonly AdminAccountItem[]>(
    //   "/dashboard/admins"
    // );
    // return response.data;

    try {
      const stored = sessionStorage.getItem("cleanpro_dashboard_admins");
      if (stored) {
        return JSON.parse(stored) as readonly AdminAccountItem[];
      }
    } catch {
      // Ignorer si sessionStorage indisponible
    }

    return INITIAL_ADMINS_DATA;
  },

  /**
   * Crée un nouveau compte administrateur dans la base de données.
   * Endpoint prévu : POST /dashboard/admins
   */
  async createAdmin(payload: CreateAdminPayload): Promise<AdminAccountItem> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // const response = await apiClient.post<AdminAccountItem>(
    //   "/dashboard/admins",
    //   payload
    // );
    // return response.data;

    const current = await this.getAdmins();
    const newAdmin: AdminAccountItem = {
      id: `admin-${Date.now()}`,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      role: payload.role,
      avatarUrl: payload.avatarUrl || "",
      createdAt: new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date()),
      isCurrentUser: false,
    };

    const nextList = [...current, newAdmin];
    try {
      sessionStorage.setItem("cleanpro_dashboard_admins", JSON.stringify(nextList));
    } catch {
      // Ignorer si indisponible
    }

    return newAdmin;
  },

  /**
   * Supprime un compte administrateur dans la BDD.
   * Endpoint prévu : DELETE /dashboard/admins/:id
   */
  async deleteAdmin(id: string): Promise<boolean> {
    // ─── Appel API Axios (décommenter dès que l'endpoint backend est disponible) ──
    // await apiClient.delete(`/dashboard/admins/${id}`);
    // return true;

    try {
      const current = await this.getAdmins();
      // Protection anti auto-suppression du compte principal connecté (CWE-284)
      const target = current.find((a) => a.id === id);
      if (target?.isCurrentUser) {
        throw new Error("Impossible de supprimer le compte administrateur principal connecté.");
      }
      const nextList = current.filter((a) => a.id !== id);
      sessionStorage.setItem("cleanpro_dashboard_admins", JSON.stringify(nextList));
      return true;
    } catch {
      return false;
    }
  },
};

// ─── Données initiales du catalogue de référence (fidèles à la capture) ───────

export const INITIAL_SERVICES_CATALOG_DATA: ServicesCatalogApiResponse = Object.freeze({
  total: 4,
  data: Object.freeze([
    {
      id: "bureaux",
      title: "Bureaux & Espaces professionnels",
      description:
        "Nous assurons le nettoyage quotidien ou ponctuel de vos bureaux, salles de réunion et espaces de travail, afin de garantir un environnement propre, sain et agréable pour vos équipes et vos visiteurs.",
      image: "services-bureaux0",
      prestations: Object.freeze([
        "Bureaux, open spaces, salles de réunion",
        "Désinfection des surfaces",
        "Gestion des déchets",
      ]),
      status: "disponible" as const,
      badgeLabel: "Disponible",
      isSelected: false,
    },
    {
      id: "residences",
      title: "Résidences & Appartements",
      description:
        "Nous prenons soin de votre intérieur avec des prestations de nettoyage complètes et personnalisées, pour un cadre de vie propre et agréable.",
      image: "services-residences",
      prestations: Object.freeze([
        "Ménage régulier ou ponctuel",
        "Nettoyage en profondeur",
        "Lavage des vitres",
      ]),
      status: "disponible" as const,
      badgeLabel: "Disponible",
      isSelected: false,
    },
    {
      id: "industries",
      title: "Industries & Entrepôts",
      description:
        "Nous intervenons dans les environnements industriels et logistiques pour un nettoyage en profondeur, sécurisé et conforme aux normes de sécurité.",
      image: "industriesImage",
      prestations: Object.freeze([
        "Grands espaces et zones de stockage",
        "Équipements industriels",
        "Nettoyage haute pression",
      ]),
      status: "disponible" as const,
      badgeLabel: "Disponible",
      isSelected: false,
    },
    {
      id: "espaces-publics",
      title: "Espaces publics & Événements",
      description:
        "Nous intervenons dans les lieux publics et lors de vos événements pour garantir un espace propre, accueillant et sécurisé pour tous.",
      image: "services-publics",
      prestations: Object.freeze([
        "Centres commerciaux",
        "Événements professionnels et privés",
        "Nettoyage après événement",
      ]),
      status: "disponible" as const,
      badgeLabel: "Disponible",
      isSelected: false,
    },
  ]),
});

// ─── Données initialisées à zéro / prêtes pour Axios ──────────────────────────

const INITIAL_DISTRIBUTION_DATA: ServicesDistributionApiResponse = Object.freeze({
  total: 0,
  changePercentage: 0,
  data: Object.freeze([
    {
      name: "Bureaux & Espaces pro",
      percentage: 0,
      value: 0,
      color: "#137547",
    },
    {
      name: "Résidences & Appartements",
      percentage: 0,
      value: 0,
      color: "#2ecc8e",
    },
    {
      name: "Industries & Entrepôts",
      percentage: 0,
      value: 0,
      color: "#3b82f6",
    },
    {
      name: "Espaces publics & Événements",
      percentage: 0,
      value: 0,
      color: "#f5b738",
    },
    {
      name: "Autres",
      percentage: 0,
      value: 0,
      color: "#c4b5fd",
    },
  ]),
});

const INITIAL_EVOLUTION_DATA: InterventionsHistoryApiResponse = Object.freeze({
  period: "Période en cours",
  peak: {
    date: "--",
    interventions: 0,
  },
  data: Object.freeze([
    { date: "Lun", interventions: 0 },
    { date: "Mar", interventions: 0 },
    { date: "Mer", interventions: 0 },
    { date: "Jeu", interventions: 0 },
    { date: "Ven", interventions: 0 },
    { date: "Sam", interventions: 0 },
    { date: "Dim", interventions: 0 },
  ]),
});

// Tableau "Dernières interventions" initialisé vide, prêt pour Axios
const INITIAL_RECENT_INTERVENTIONS_DATA: RecentInterventionsApiResponse = Object.freeze({
  total: 0,
  data: Object.freeze([]),
});

// Carte "Prochaines interventions" initialisée vide, prête pour Axios
const INITIAL_UPCOMING_INTERVENTIONS_DATA: UpcomingInterventionsApiResponse = Object.freeze({
  total: 0,
  data: Object.freeze([]),
});

// ─── Données initiales du planning de référence (fidèles à la capture) ──────
export const INITIAL_PLANNING_DATA: PlanningApiResponse = Object.freeze({
  periodLabel: "15–21 septembre 2025",
  badgeLabel: "Période de capture",
  slots: Object.freeze([
    {
      id: "slot-bureau-16",
      day: "Mardi 16 septembre",
      dateFormatted: "16/09/2025",
      title: "Nettoyage de bureaux",
      location: "Siège social – Yaoundé",
      startTime: "08:00",
      endTime: "12:00",
      team: "À compléter",
      category: "bureau" as const,
      colorTheme: "emerald" as const,
    },
    {
      id: "slot-communs-16",
      day: "Mardi 16 septembre",
      dateFormatted: "16/09/2025",
      title: "Entretien des espaces communs",
      location: "Résidence Les Palmiers",
      startTime: "14:00",
      endTime: "16:00",
      team: "À compléter",
      category: "residence" as const,
      colorTheme: "emerald" as const,
    },
    {
      id: "slot-industrie-17",
      day: "Mercredi 17 septembre",
      dateFormatted: "17/09/2025",
      title: "Nettoyage industriel",
      location: "Usine – Douala",
      startTime: "07:00",
      endTime: "11:00",
      team: "À compléter",
      category: "industrie" as const,
      colorTheme: "sky" as const,
    },
    {
      id: "slot-evenement-17",
      day: "Mercredi 17 septembre",
      dateFormatted: "17/09/2025",
      title: "Événement spécial",
      location: "Centre des conférences",
      startTime: "13:00",
      endTime: "18:00",
      team: "À compléter",
      category: "evenement" as const,
      colorTheme: "sky" as const,
    },
  ]),
});

// ─── Données initiales des paramètres (fidèles à la capture) ─────────────────
export const INITIAL_SETTINGS_DATA: SettingsApiResponse = Object.freeze({
  profile: Object.freeze({
    name: "Amina Diallo",
    role: "Responsable d'agence",
    email: "À compléter",
    avatarUrl: "",
  }),
  company: Object.freeze({
    name: "CleanPro",
    signature: "Services de Nettoyage",
    logoUrl: "",
  }),
  contact: Object.freeze({
    phone: "+237678123456",
    whatsapp: "+237678123456",
    email: "contact@cleanpro.cm",
    address: "Avenue de la Paix, Yaoundé Cameroun",
    officeNote: "Nos bureaux sont ouverts sur rendez-vous.",
  }),
  openingHours: Object.freeze({
    weekdays: "8h00–17h00",
    saturday: "8h00–12h00",
    sunday: "Fermé",
    visitors: "Sur rendez-vous",
  }),
  notifications: Object.freeze({
    interventions: "Non renseigné",
    clientMessages: "Non renseigné",
    reports: "Non renseigné",
  }),
});

// ─── Données initiales des comptes administrateurs ───────────────────────────
export const INITIAL_ADMINS_DATA: readonly AdminAccountItem[] = Object.freeze([
  {
    id: "admin-amina-1",
    name: "Amina Diallo",
    email: "amina.diallo@cleanpro.cm",
    role: "Responsable d'agence",
    avatarUrl: "",
    createdAt: "15/01/2025",
    isCurrentUser: true,
  },
]);



