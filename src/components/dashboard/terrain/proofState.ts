import type { InstallationRecord } from "@/lib/api/types";

export type ProofState = "awaiting" | "pending" | "validated" | "rejected";

/** État de la preuve d'une installation, partagé par la liste et la carte. */
export function proofState(installation: InstallationRecord): ProofState {
  const status = installation.proof?.validationStatus;
  if (!status) return "awaiting";
  if (status === "VALIDATED") return "validated";
  if (status === "REJECTED") return "rejected";
  return "pending";
}

export const PROOF_BADGE: Record<ProofState, string> = {
  awaiting: "bg-slate-100 text-slate-500",
  pending: "bg-blue-500/10 text-blue-600",
  validated: "bg-green-accent-dark/10 text-green-accent-dark",
  rejected: "bg-red-600/10 text-red-600",
};
