import type { Role } from "@/lib/api/types";

/**
 * Rôles ayant accès au Copilot — miroir de COPILOT_ROLES côté backend.
 * PROVIDER (prestataire externe) en est exclu : il ne doit pas pouvoir
 * interroger les données marketing de l'entreprise cliente.
 *
 * Module neutre (ni client ni serveur) : lu par les pages serveur (RoleGate)
 * comme par CopilotProvider.
 */
export const COPILOT_ROLES: Role[] = ["ADMIN", "MARKETING_MANAGER", "COMMUNITY_MANAGER"];
