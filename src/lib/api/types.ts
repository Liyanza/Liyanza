export type Role = "ADMIN" | "MARKETING_MANAGER" | "COMMUNITY_MANAGER" | "PROVIDER";

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrateur",
  MARKETING_MANAGER: "Responsable Marketing",
  COMMUNITY_MANAGER: "Community Manager",
  PROVIDER: "Prestataire",
};

export type CampaignType = "DIGITAL" | "RADIO" | "POSTER";

export type CampaignStatus = "DRAFT" | "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type SocialPlatform = "FACEBOOK" | "INSTAGRAM";

export type SocialAccountStatus = "ACTIVE" | "EXPIRED" | "REVOKED";

/** Identité authentifiée résolue par le backend (`GET /auth/me`). Fait autorité pour les décisions RBAC. */
export interface AuthenticatedIdentity {
  userId: string;
  email: string;
  role: Role;
  companyId: string | null;
}

/** Profil d'affichage uniquement (prénom/nom) — jamais utilisé pour une décision d'autorisation. */
export interface DisplayProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export type AuthUser = AuthenticatedIdentity & Partial<DisplayProfile>;

/** Forme du champ `user` renvoyé par POST /auth/login — distincte de /auth/me
 * (pas de companyId, mais prénom/nom disponibles). */
export interface LoginUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CreateCampagnePayload {
  name: string;
  startDate: string;
  endDate: string;
  plannedBudget: number;
  objective: string;
  type: CampaignType;
}

export interface CampagneRecord extends CreateCampagnePayload {
  id: string;
  status: CampaignStatus;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialAccountRecord {
  id: string;
  platform: SocialPlatform;
  externalAccountId: string;
  externalAccountName: string | null;
  status: SocialAccountStatus;
  lastSyncedAt: string | null;
  createdAt: string;
}
