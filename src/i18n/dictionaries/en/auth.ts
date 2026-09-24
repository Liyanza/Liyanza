import type fr from "../fr/auth";

const auth: typeof fr = {
  shell: {
    backToSite: "Back to site",
    backHome: "Back to home",
    security: "Secure data · GDPR compliant · End-to-end encryption",
    imageAlt: "A smiling marketing professional sitting cross-legged with her laptop",
    stats: {
      roi: "ROI",
      budgetSplit: "Budget split",
      bestAudience: "Best audience",
      audienceValue: "Ages 25 – 45",
      conversions: "Conversions",
    },
  },
  brand: {
    login: {
      heading: "Welcome back!",
      paragraph: "Access your marketing cockpit and pick up right where you left off.",
    },
    signup: {
      heading: "Get started. It's free!",
      paragraph: "Join 500+ marketing teams running their campaigns with KIYANZA AI.",
    },
    forgot: {
      heading: "Don't panic!",
      paragraph: "We'll send you a link to reset your password securely.",
    },
    reset: {
      heading: "Almost done!",
      paragraph: "Choose a new password for your KIYANZA account.",
    },
  },
  meta: {
    login: { title: "Log in" },
    signup: { title: "Create an account" },
    forgot: { title: "Forgot password" },
    reset: { title: "New password" },
  },
  common: {
    or: "or",
    genericError: "Something went wrong.",
    email: "Email address",
    emailPlaceholder: "you@email.com",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    confirmPassword: "Confirm password",
    confirmPlaceholder: "Repeat the password",
    minChars: "At least 8 characters",
    mismatch: "Passwords do not match",
    login: "Log in",
    backToLogin: "Back to login",
    terms: "Terms of use",
    privacy: "Privacy policy",
  },
  social: {
    startError: "Unable to start signing in.",
  },
  login: {
    title: "Log in",
    noAccount: "No account yet?",
    createAccount: "Create an account",
    passwordPlaceholder: "Your password",
    remember: "Remember me",
    forgot: "Forgot password?",
    legalStart: "By logging in, you accept our",
    legalAnd: "and our",
  },
  signup: {
    title: "Create an account",
    already: "Already registered?",
    firstName: "First name",
    lastName: "Last name",
    lastNamePlaceholder: "Last name",
    phone: "Phone",
    strength: { weak: "Weak", medium: "Fair", strong: "Strong", veryStrong: "Very strong" },
    rules: { length: "8+ characters", upper: "Uppercase", number: "Number" },
    acceptStart: "I accept KIYANZA's",
    acceptAnd: "and",
    acceptEnd: ".",
    submit: "Create my free account",
    perks: ["Free, no card", "Cancel anytime"],
  },
  forgot: {
    sentTitle: "Email sent!",
    sentText: "A reset link has been sent to",
    tips: [
      "Check your spam folder if you can't find the email.",
      "The link expires in 30 minutes.",
      "Never share this link with anyone else.",
    ],
    resend: "← Resend the email",
    title: "Forgot your password?",
    text: "Enter your email address. We'll send you a link to reset your password.",
    submit: "Send me the reset link",
    privacyNote:
      "For security reasons, we don't confirm whether the email address is linked to an existing account.",
    remember: "Remember your password?",
  },
  reset: {
    invalidTitle: "Invalid link",
    invalidText: "This reset link is incomplete. Request a new one.",
    newLink: "Get a new link",
    doneTitle: "Password updated!",
    doneText:
      "Your other sessions have been signed out for security. Log in with your new password.",
    title: "New password",
    text: "Choose a new password for your account.",
    newPassword: "New password",
    submit: "Reset password",
  },
  oauth: {
    errors: {
      denied: "You cancelled the sign-in.",
      invalid_or_expired_state: "The sign-in session expired, please try again.",
      missing_code: "The sign-in was interrupted, please try again.",
      account_disabled: "This account is disabled. Contact an administrator.",
      exchange_failed: "Sign-in failed, please try again.",
    },
    failed: "Sign-in failed, please try again.",
    invalidLink: "Invalid sign-in link.",
    errorTitle: "Unable to sign in",
    loading: "Signing you in…",
  },
};

export default auth;
