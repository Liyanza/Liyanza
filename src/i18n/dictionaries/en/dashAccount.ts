import type fr from "../fr/dashAccount";

const dashAccount: typeof fr = {
  search: "Search...",
  sending: "Sending...",
  teams: {
    loadError: "Unable to load the team.",
    createError: "Unable to create this member.",
    roleError: "Unable to change the role.",
    deactivateError: "Unable to deactivate this member.",
    confirmDeactivate: "Deactivate {name}? This cannot be undone from Liyanza.",
    invite: "Invite a member",
    inviteTitle: "Invite a new member",
    inviteText: "They will receive a temporary password by email.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    sendInvite: "Send the invitation",
    loading: "Loading members…",
    headers: {
      member: "Member",
      phone: "Phone",
      role: "Role",
      status: "Status",
      actions: "Actions",
    },
    you: "(you)",
    deactivated: "Deactivated",
    active: "Active",
    deactivate: "Deactivate",
  },
  createCompany: {
    error: "Unable to create your company.",
    welcome: "Welcome to KIYANZA",
    intro:
      "Before creating campaigns, enter your company's details. You will automatically become its administrator.",
    name: "Company name",
    namePlaceholder: "e.g. Kiyanza SARL",
    sector: "Business sector",
    sectorPlaceholder: "e.g. Retail",
    address: "Address",
    addressPlaceholder: "e.g. Douala, Cameroon",
    submit: "Create my company",
  },
  social: {
    statuses: {
      ACTIVE: "Active",
      EXPIRED: "Expired",
      REVOKED: "Disconnected",
    },
    neverSynced: "Never synced",
    syncedToday: "Synced today",
    syncedYesterday: "Synced yesterday",
    syncedDaysAgo: "Synced {days} days ago",
    loadError: "Unable to load accounts.",
    popupBlocked: "Your browser blocked the authorisation window. Allow pop-ups for this site.",
    connectError: "Unable to start the connection.",
    revokeError: "Unable to disconnect this account.",
    syncError: "Unable to resync this account.",
    title: "Facebook & Instagram accounts",
    intro: "Link your company's Meta business accounts to run and track your digital campaigns.",
    connectFacebook: "Connect Facebook",
    connectInstagram: "Connect Instagram",
    loading: "Loading accounts…",
    empty: "No linked accounts",
    emptyManager: "Connect a Facebook or Instagram account to start running your digital campaigns.",
    emptyReader: "An administrator or a marketing manager needs to link a Meta account.",
    resync: "Resync",
    disconnect: "Disconnect",
    readOnly:
      "Read only: only the Administrator and Marketing Manager roles can link, resync or disconnect an account.",
  },
  notifications: {
    filters: {
      ALL: "All",
      UNREAD: "Unread",
      READ: "Read",
    },
    justNow: "Just now",
    minutesAgo: "{count} min ago",
    hoursAgo: "{count} h ago",
    daysAgo: "{count} d ago",
    loadError: "Unable to load notifications.",
    loading: "Loading notifications…",
    empty: "No notifications",
    markRead: "Mark as read",
    pagination: "Showing {start} to {end} of {total} notifications",
  },
  profile: {
    loadError: "Unable to load your profile.",
    loading: "Loading your profile…",
    account: "Account details",
    email: "Email",
    phone: "Phone",
    role: "Role",
    company: "Company",
    linked: "Linked",
    none: "None",
    memberSince: "Member since",
    security: "Security",
    securityText:
      "Profile changes are not available in the app yet. To change your password, we will email you a reset link.",
    emailSent: "Email sent",
    changePassword: "Change my password",
    resetError: "Sending failed, please try again later.",
  },
  help: {
    title: "Frequently asked questions",
    subtitle: "Find answers to the most common questions about Liyanza.",
    moreHelp: "Need more help?",
    moreHelpText: "Our team will get back to you quickly by email.",
    faq: [
      {
        question: "How do I create a campaign?",
        answer:
          "From Campaigns, click “New campaign” and follow the wizard: choose the type (Digital or Radio), then set your objectives, audience and budget. Each campaign type has its own flow.",
      },
      {
        question: "What is the difference between a Digital and a Radio campaign?",
        answer:
          "A Digital campaign targets Facebook/Instagram through your linked accounts and gives you a costed simulation before launch. A Radio campaign has you pick a station, upload an audio spot and set how often it airs, then you track it in Monitoring.",
      },
      {
        question: "Where can I check that my radio spots actually aired?",
        answer:
          "In Monitoring, the “Broadcasts” tab lists every detected airing with its status (aired, upcoming, issue). The “Schedule” tab shows the broadcast calendar.",
      },
      {
        question: "How do I invite a colleague and manage roles?",
        answer:
          "An administrator can invite a member from Teams: they receive a temporary password by email. The role (Administrator, Marketing Manager, Community Manager, Service provider) determines which actions are available.",
      },
      {
        question: "How do AI recommendations work?",
        answer:
          "In AI recommendations, select a campaign and generate recommendations: our engine analyses its objective and budget to suggest concrete actions, ranked by priority.",
      },
      {
        question: "I am not receiving my notifications by email",
        answer:
          "First check your spam folder. Important notifications (temporary password, broadcast alerts, task deadlines) are also always visible under the bell at the top of the screen.",
      },
    ],
  },
};

export default dashAccount;
