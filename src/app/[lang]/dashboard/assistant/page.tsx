import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { RoleGate } from "@/components/dashboard/RoleGate";
import { AssistantPageClient } from "@/components/dashboard/copilot/AssistantPageClient";
import { COPILOT_ROLES } from "@/components/dashboard/copilot/roles";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages("dash")).titles.assistant };
}

export default function AssistantPage() {
  return (
    <RoleGate allow={COPILOT_ROLES}>
      <AssistantPageClient />
    </RoleGate>
  );
}
