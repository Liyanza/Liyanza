import type { Metadata } from "next";
import { CampagnesListClient } from "@/components/dashboard/campagnes/CampagnesListClient";
import { RoleGate } from "@/components/dashboard/RoleGate";

export const metadata: Metadata = {
  title: "Campagnes",
};

export default function CampagnesPage() {
  return (
    <RoleGate allow={["ADMIN", "MARKETING_MANAGER"]}>
      <CampagnesListClient />
    </RoleGate>
  );
}
