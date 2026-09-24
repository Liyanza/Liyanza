/**
 * Écran d'introduction (splash) : tous les réglages sont ici.
 * Composant : src/components/motion/SplashScreen.tsx
 */
export const splashConfig = {
  /** Interrupteur général. false : le splash ne s'affiche plus nulle part. */
  enabled: true,

  /** Pages d'entrée où il peut s'afficher (jamais /dashboard, /connexion…). */
  routes: ["/", "/fonctionnalites", "/tarifs", "/ressources", "/a-propos"],

  /** Clé sessionStorage : une fois vu, le splash ne rejoue plus de la session. */
  storageKey: "kiyanza-splash-seen",

  /** Couleur de fond de l'écran. */
  background: "#FFFFFF",

  /** Hauteur du logo final, en px (le colibri, le nom et le slogan suivent). */
  logoHeight: { mobile: 72, desktop: 120 },
  /**
   * Largeur d'écran à partir de laquelle on passe aux réglages « desktop »
   * (à garder identique au @media de .splash dans globals.css).
   */
  desktopFrom: 640,

  /**
   * PARCOURS DU VOL — un tracé SVG ordinaire, dans un repère 0–100 qui
   * représente l'écran : x = 0 bord gauche, 100 bord droit ; y = 0 haut,
   * 100 bas. Des valeurs hors de 0–100 partent hors écran.
   *
   * Le DERNIER point du tracé est remplacé à l'exécution par la position
   * exacte du colibri dans le logo centré (garder ~50 50), et le dernier
   * point de contrôle est aligné à l'horizontale pour que l'oiseau arrive
   * bien droit, tête à droite. Tout le reste est libre : modifiez les
   * points, ajoutez des segments « C », testez dans un éditeur SVG
   * (ex. viewBox="0 0 100 100").
   */
  flightPath: {
    // Entrée en bas à gauche → grande courbe en S → petite boucle en haut à
    // droite → retour par la gauche → arrivée.
    desktop:
      "M -8 112 C 10 86, 24 72, 40 68 C 60 63, 88 58, 84 36 C 82 26, 76 22, 72 24 C 66 27, 68 36, 76 34 C 84 32, 82 20, 74 18 C 60 14, 26 18, 26 38 C 26 46, 34 50, 50 50",
    mobile:
      "M -15 105 C 10 88, 60 86, 80 72 C 104 56, 82 36, 56 38 C 34 40, 26 26, 42 22 C 56 19, 58 32, 46 32 C 36 32, 30 44, 50 50",
  },

  /** Taille de départ du colibri par rapport à sa taille finale. */
  birdStartScale: 0.6,

  /** Durées et délais, en secondes. */
  timing: {
    /** Attente avant le décollage. */
    flightDelay: 0.1,
    /** Durée du vol (2 à 2,5 s). */
    flight: 2.3,
    /** Instant où « KIYANZA » apparaît (depuis le début de l'animation). */
    nameAt: 1.55,
    /** Décalage du slogan après le nom. */
    sloganDelay: 0.25,
    /** Durée de l'apparition du nom et du slogan. */
    text: 0.5,
    /** Logo complet affiché avant de révéler le site (0,6 à 0,8 s). */
    hold: 0.7,
    /** Disparition de l'écran blanc. */
    exit: 0.5,
    /** Disparition après un clic sur « Passer » ou Échap. */
    skipExit: 0.3,
    /** Mouvement réduit : durée d'affichage du logo, puis fondu. */
    reducedHold: 1,
    reducedExit: 0.4,
    /** Durée d'un battement d'ailes (aller simple). */
    wingBeat: 0.08,
  },

  /** Léger zoom du logo pendant la disparition (1 = aucun). */
  exitZoom: 1.06,

  /**
   * Sécurité : si le JavaScript ne démarre pas, l'écran s'efface seul après
   * ce délai (ms) pour ne jamais bloquer le site.
   */
  failsafeMs: 6000,
} as const;

/** Émis quand le splash est terminé : les intros de hero attendent ce signal. */
export const SPLASH_DONE_EVENT = "splash:done";

/**
 * Script inline exécuté dans <head> avant le premier affichage : décide si
 * le splash doit s'afficher (bonne page, pas encore vu dans la session) et
 * pose html[data-splash="on"]. Évite tout flash de la page avant l'écran
 * blanc, et tout flash du splash quand il ne doit pas jouer.
 */
export const splashBootScript = splashConfig.enabled
  ? `try{var r=${JSON.stringify(splashConfig.routes)},p=location.pathname.replace(/\\/+$/,"")||"/";` +
    `if(r.indexOf(p)>-1&&!sessionStorage.getItem(${JSON.stringify(splashConfig.storageKey)})){` +
    `var d=document.documentElement;d.dataset.splash="on";` +
    `window.__splashFailsafe=setTimeout(function(){if(d.dataset.splash==="on")d.dataset.splash="done"},${splashConfig.failsafeMs})}}catch(e){}`
  : "";
