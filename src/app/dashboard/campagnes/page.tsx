import type { Metadata } from "next";
import { CampagnesListClient } from "@/components/dashboard/campagnes/CampagnesListClient";

export const metadata: Metadata = {
  title: "Campagnes",
};

export default function CampagnesPage() {
  return <CampagnesListClient />;
}
