import apiClient, { type ApiErrorResponse } from "./apiClient";

export interface LoginPayload {
  readonly identifier: string;
  readonly password: string;
}

export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: "client" | "admin" | "agent";
  readonly avatarUrl?: string;
}

export interface AuthResponse {
  readonly success: boolean;
  readonly message: string;
  readonly user?: UserProfile;
}

/**
 * Service d'authentification pour la gestion de session et la connexion avec l'API.
 */
export const authService = {
  /**
   * Transmet les identifiants de connexion vers l'endpoint /auth/login.
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", payload);
      return response.data;
    } catch (error) {
      throw error as ApiErrorResponse;
    }
  },

  /**
   * Termine la session courante côté serveur et invalide les cookies HttpOnly.
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      throw error as ApiErrorResponse;
    }
  },

  /**
   * Récupère le profil de l'utilisateur authentifié depuis la BDD (GET /auth/me).
   */
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>("/auth/me");
      return response.data;
    } catch (error) {
      throw error as ApiErrorResponse;
    }
  },

  /**
   * Met à jour la photo de profil / avatar de l'administrateur dans la BDD.
   * Endpoint prévu : PATCH /auth/avatar
   */
  async updateAvatar(avatarUrl: string): Promise<UserProfile> {
    try {
      const response = await apiClient.patch<UserProfile>("/auth/avatar", {
        avatarUrl,
      });
      return response.data;
    } catch (error) {
      throw error as ApiErrorResponse;
    }
  },
};
