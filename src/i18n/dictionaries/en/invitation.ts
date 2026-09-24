import type fr from "../fr/invitation";

const invitation: typeof fr = {
  metaTitle: "Invitation",
  loading: "Validating your invitation…",
  successTitle: "Invitation accepted",
  successText: "You are now part of {company}. Log in as usual to access the dashboard.",
  dashboard: "Go to the dashboard",
  invalidTitle: "Invalid or expired invitation",
  invalidText: "This link is no longer valid (it has already been used or has expired). Ask the administrator to send you a new invitation.",
  otherCompanyTitle: "Invitation not possible",
  otherCompanyText: "Your account already belongs to another company. An account can only belong to one company.",
  home: "Back to home",
};

export default invitation;
