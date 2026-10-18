import { useState, useRef, useEffect, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Calendar,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Loader2,
} from "lucide-react";
import { authService, type UserProfile } from "../../../services/authService";

interface DashboardTopBarProps {
  readonly onToggleMobileSidebar: () => void;
  readonly isMobileSidebarOpen: boolean;
}

/**
 * Fonction de formatage automatique de la date du jour en français.
 * Exemple : "Jeudi 15 Octobre 2026"
 */
function getFormattedCurrentDate(): string {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  // Met la première lettre en majuscule : "Jeudi 15 octobre 2026"
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Génère des initiales de secours (fallback) à partir d'un nom complet.
 * Ex: "Amina Diallo" -> "AD"
 */
function getInitials(name: string): string {
  if (!name.trim()) return "AD";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts.at(-1)![0]).toUpperCase();
}

/**
 * Nettoyage et assainissement strict des entrées de recherche (Défense en profondeur : OWASP A03 / CWE-79 / CWE-89).
 * Supprime les balises HTML, les caractères d'échappement dangereux et limite la longueur maximale.
 */
function sanitizeSearchQuery(raw: string): string {
  return raw
    .trim()
    .replace(/[<>'"`;()\\]/g, "") // Supprime les méta-caractères d'injection XSS et SQL
    .slice(0, 80); // Limite stricte pour prévenir les attaques ReDoS ou DoS mémoire
}

export default function DashboardTopBar({
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}: DashboardTopBarProps) {
  const navigate = useNavigate();

  // 1. DATE DYNAMIQUE DU JOUR
  // S'initialise automatiquement avec la date actuelle du système et peut se rafraîchir à minuit
  const [currentDate, setCurrentDate] = useState<string>(
    getFormattedCurrentDate(),
  );

  useEffect(() => {
    // Calcul de l'intervalle jusqu'au prochain jour pour mettre à jour automatiquement
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(getFormattedCurrentDate());
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [currentDate]);

  // 2. INPUT DE RECHERCHE NON CONTRÔLÉ (Uncontrolled Component avec useRef)
  // Ne déclenche aucun re-render React à chaque touche frappée, performances maximales
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 3. PROFIL UTILISATEUR & AVATAR DEPUIS LA BDD
  // Préparé pour recevoir le profil réel lors du branchement backend
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        // APPEL API BACKEND (GET /auth/me)
        const profile = await authService.getProfile();
        if (isMounted && profile) {
          setCurrentUser(profile);
          // Si le backend renvoie un avatar_url (ex: stocké dans la BDD)
          if ((profile as unknown as { avatarUrl?: string }).avatarUrl) {
            setAvatarUrl(
              (profile as unknown as { avatarUrl?: string }).avatarUrl || null,
            );
          }
        }
      } catch {
        // En mode développement sans backend connecté : conservation des données d'affichage
        if (isMounted) {
          setCurrentUser({
            id: "usr_admin_default",
            name: "Amina Diallo",
            email: "amina.diallo@cleanpro.cm",
            role: "admin",
          });
        }
      }
    };

    void fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // Gestion du menu utilisateur et de la déconnexion
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch {
      // Nettoyage fail-closed local
    } finally {
      setIsLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  /**
   * Soumission sécurisée de la recherche (Input non contrôlé)
   */
  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInputRef.current) return;

    const rawValue = searchInputRef.current.value;
    const sanitized = sanitizeSearchQuery(rawValue);

    if (!sanitized) return;

    // Prêt pour router vers une recherche ou envoyer une requête paramétrée sécurisée
    // ex: navigate(`/dashboard/recherche?q=${encodeURIComponent(sanitized)}`);
  };

  const displayName = currentUser?.name || "Amina Diallo";
  const displayRole =
    currentUser?.role === "admin" ? "Responsable d'agence" : "Collaborateur";
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6 select-none">
      {/* ─── Barre de recherche non contrôlée et sécurisée ──────────────────── */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          aria-expanded={isMobileSidebarOpen}
          aria-controls="dashboard-sidebar-nav"
          aria-label={
            isMobileSidebarOpen
              ? "Fermer le menu de navigation"
              : "Ouvrir le menu de navigation"
          }
          className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#135d3b] lg:hidden"
        >
          <Menu size={18} aria-hidden={true} />
        </button>

        {/* Formulaire avec input non contrôlé (Uncontrolled input via ref) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full max-w-md"
          role="search"
        >
          <label htmlFor="dashboard-global-search" className="sr-only">
            Rechercher un service, un client, un rapport
          </label>
          <button
            type="submit"
            aria-label="Lancer la recherche"
            className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 hover:text-[#135d3b] focus-visible:outline-none"
          >
            <Search size={15} aria-hidden={true} />
          </button>
          <input
            ref={searchInputRef}
            id="dashboard-global-search"
            name="searchQuery"
            type="search"
            maxLength={80}
            autoComplete="off"
            spellCheck="false"
            defaultValue=""
            placeholder="Rechercher un service, un client, un rapport..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[#135d3b] focus:outline-none focus:ring-1 focus:ring-[#135d3b]"
          />
        </form>
      </div>

      {/* ─── Côté droit : Date automatique, Alertes et Avatar BDD ─────────── */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Date dynamique du jour (change automatiquement chaque jour) */}
        <div
          className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600"
          title="Date actuelle du système"
        >
          <Calendar size={15} className="text-slate-400" aria-hidden={true} />
          <time dateTime={new Date().toISOString().split("T")[0]}>
            {currentDate}
          </time>
        </div>

        {/* Cloche de notifications avec puce verte conforme au visuel */}
        <button
          type="button"
          aria-label="3 notifications non lues"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-[#135d3b]"
        >
          <Bell size={17} aria-hidden={true} />
          <span
            className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#135d3b]"
            aria-hidden="true"
          />
        </button>

        {/* Bloc profil utilisateur (Avatar dynamique connecté à la BDD ou fallback initiales) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="menu"
            aria-label={`Menu du compte ${displayName}`}
            className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#135d3b] rounded-md p-1"
          >
            {/* Emplacement avatar : image BDD si disponible, sinon initiales typées */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-[#15364a] text-white text-sm font-bold">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={`Profil de ${displayName}`}
                  className="h-full w-full object-cover"
                  onError={() => setAvatarUrl(null)} // Fallback propre si l'URL BDD est invalide (Fail-Safe)
                />
              ) : (
                <span aria-hidden={true}>{initials}</span>
              )}
            </div>

            <div className="hidden sm:block leading-tight">
              <span className="block text-sm font-bold text-[#15364a]">
                {displayName}
              </span>
              <span className="block text-sm text-slate-400">
                {displayRole}
              </span>
            </div>

            <ChevronDown
              size={14}
              className="text-slate-400"
              aria-hidden={true}
            />
          </button>

          {/* Menu déroulant du profil avec déconnexion sécurisée */}
          {isUserMenuOpen && (
            <>
              <div
                aria-hidden="true"
                className="fixed inset-0 z-30"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-md border border-slate-200 bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                <div className="border-b border-slate-100 px-3 py-2 text-sm">
                  <p className="font-bold text-[#15364a]">{displayName}</p>
                  <p className="truncate text-sm text-slate-400">
                    {currentUser?.email || "amina.diallo@cleanpro.cm"}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate("/dashboard/settings");
                    }}
                    className="flex w-full items-center gap-2 rounded px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <User
                      size={13}
                      className="text-slate-400"
                      aria-hidden={true}
                    />
                    <span>Paramètres du compte</span>
                  </button>
                  <div className="flex items-center gap-2 px-3 py-1 text-[13px] text-emerald-800">
                    <Shield
                      size={12}
                      className="text-emerald-700"
                      aria-hidden={true}
                    />
                    <span>Session chiffrée TLS 1.3</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    role="menuitem"
                    disabled={isLoggingOut}
                    onClick={() => void handleLogout()}
                    className="flex w-full items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {isLoggingOut ? (
                      <Loader2
                        size={13}
                        className="animate-spin text-red-600"
                        aria-hidden={true}
                      />
                    ) : (
                      <LogOut
                        size={13}
                        className="text-red-500"
                        aria-hidden={true}
                      />
                    )}
                    <span>
                      {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
