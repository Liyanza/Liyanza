import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { CopilotProvider } from "@/components/dashboard/copilot/CopilotProvider";
import { CopilotPanel } from "@/components/dashboard/copilot/CopilotPanel";
import { AuthProvider } from "@/context/AuthContext";
import { MessagesProvider } from "@/i18n/client";
import { getMessages } from "@/i18n/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Le dashboard est presque entièrement composé de composants client : ses
 * dictionnaires sont chargés une fois ici (la mise en page persiste d'une
 * page à l'autre) et fournis à toutes ses pages.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const [dash, dashCampaigns, dashWizard, dashInsights, dashAccount, dashField] = await Promise.all([
    getMessages("dash"),
    getMessages("dashCampaigns"),
    getMessages("dashWizard"),
    getMessages("dashInsights"),
    getMessages("dashAccount"),
    getMessages("dashField"),
  ]);

  return (
    <MessagesProvider messages={{ dash, dashCampaigns, dashWizard, dashInsights, dashAccount, dashField }}>
      <AuthProvider>
        {/* Copilot (assistant IA) : disponible sur toutes les pages du dashboard. */}
        <CopilotProvider>
          <div className="flex h-screen w-full overflow-hidden bg-white">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">{children}</div>
          </div>
          <CopilotPanel />
        </CopilotProvider>
      </AuthProvider>
    </MessagesProvider>
  );
}
