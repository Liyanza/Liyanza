import { ViewTransition, type ReactNode } from "react";

/**
 * Page-level view transition for client-side navigations: the outgoing page
 * lifts away as the incoming one rises in (see ::view-transition rules in
 * globals.css). Must wrap each page's content in its page.tsx — layouts
 * persist across navigations, so enter/exit would never fire there. Keep the
 * Navbar outside: it is anchored separately (view-transition-name) and must
 * not move. No browser support → instant navigation, nothing breaks.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
