import type { Metadata } from "next";
import { AideClient } from "@/components/dashboard/aide/AideClient";

export const metadata: Metadata = {
  title: "Aide",
};

export default function AidePage() {
  return <AideClient />;
}
