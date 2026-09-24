import type { ReactNode } from "react";

/**
 * Re-mounted on every navigation between dashboard sections, so the section
 * content fades in (.dash-enter) while the sidebar, owned by the layout,
 * stays put. Keeps the layout's flex column behaviour for scrolling.
 */
export default function DashboardTemplate({ children }: { children: ReactNode }) {
  return <div className="dash-enter flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>;
}
