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
   * Le DERNIER point du tracé est remplacé à l'exécution par le point
   * d'amarrage (juste devant la place du colibri dans le logo centré — garder
   * ~50 50), et le dernier point de contrôle est aligné à l'horizontale pour
   * que l'oiseau arrive bien droit, tête à droite.
   *
   * Le nom KIYANZA est centré vers x ≈ 55 (desktop) / 60 (mobile), y ≈ 50 :
   * les lettres que le tracé frôle s'allument au passage de l'oiseau. Tout le reste est libre : modifiez les
   * points, ajoutez des segments « C », testez dans un éditeur SVG
   * (ex. viewBox="0 0 100 100").
   */
  flightPath: {
    // Entrée en bas à gauche → grande courbe en S → petite boucle en haut à
    // droite → passage au ras du nom, de droite à gauche (il l'allume) →
    // demi-tour en bas à gauche → amarrage.
    desktop:
      "M -8 112 C 10 86, 24 72, 40 68 C 60 63, 88 58, 84 36 C 82 26, 76 22, 72 24 C 66 27, 68 36, 76 34 C 84 32, 82 20, 74 18 C 64 16, 74 50, 66 50 C 58 50, 46 50, 36 52 C 26 55, 20 64, 27 66 C 34 68, 30 50, 50 50",
    mobile:
      "M -15 105 C 10 88, 60 86, 80 72 C 104 56, 82 36, 56 38 C 34 40, 26 26, 42 22 C 56 19, 58 32, 46 32 C 38 32, 92 38, 86 50 C 80 50, 62 50, 44 51 C 24 52, 12 62, 20 65 C 28 68, 18 52, 50 50",
  },

  /** Taille de départ du colibri par rapport à sa taille finale. */
  birdStartScale: 0.6,

  /**
   * VOL VIVANT — un colibri fonce, s'arrête net en vol stationnaire, repart.
   * `hovers` : arrêts le long du tracé (`at` = position de 0 à 1 sur le
   * parcours, `duration` en s). Pendant l'arrêt l'oiseau se redresse, flotte
   * et bat des ailes plus vite. Tableau vide = vol continu.
   */
  life: {
    hovers: [
      { at: 0.22, duration: 0.4 },
      { at: 0.5, duration: 0.35 },
    ],
    /** Effet de profondeur : l'oiseau grossit/rapetisse en vol (0 = aucun). */
    depth: 0.18,
    /** Amplitude du flottement pendant un arrêt, en px. */
    hoverBob: 5,
    /** Battement d'ailes pendant un arrêt : × plus rapide. */
    hoverWingSpeed: 1.8,
  },

  /**
   * TRAÎNÉE — sillage aux couleurs du logo qui suit l'oiseau et s'efface.
   * Trois rubans, de la tête vers la queue : `length` = longueur (fraction du
   * parcours), `width` en px, `opacity`.
   */
  trail: {
    enabled: true,
    ribbons: [
      { color: "#19A546", length: 0.035, width: 3, opacity: 0.9 },
      { color: "#00AAFF", length: 0.05, width: 2.5, opacity: 0.7 },
      { color: "#FF6600", length: 0.065, width: 2, opacity: 0.5 },
    ],
  },

  /**
   * AMARRAGE — le vol s'achève juste devant la place du colibri : il y reste
   * un instant en vol stationnaire, puis s'y glisse ; une onde part du logo.
   * `offset` : position du point d'amarrage par rapport à la place finale,
   * en hauteurs de logo (x négatif = à gauche, y négatif = au-dessus).
   */
  dock: {
    enabled: true,
    offset: { x: -0.9, y: -0.3 },
    /** Vol stationnaire devant la place, en s. */
    hover: 0.4,
    /** Glissade finale jusqu'à la place, en s. */
    glide: 0.3,
    /** Ondes : nombre, couleur, taille max (× hauteur du logo), durée. */
    rings: 2,
    ringColor: "#19A546",
    ringScale: 2.6,
    ringDuration: 0.9,
  },

  /**
   * NOM DÉVOILÉ — chaque lettre de KIYANZA s'allume quand l'oiseau passe à
   * moins de `reach` (× hauteur du logo) de son centre. Les lettres non
   * frôlées apparaissent en cascade à l'amarrage.
   */
  nameReveal: {
    reach: 0.55,
    /** Cascade des lettres restantes à l'amarrage, en s entre deux lettres. */
    stagger: 0.05,
  },

  /**
   * AMBIANCE — grain très léger sur le fond, halo coloré qui suit l'oiseau,
   * « pollen » lumineux semé derrière lui. Tout est discret par défaut.
   */
  ambience: {
    /** Opacité du grain (0 = aucun). */
    grain: 0.05,
    /** Halo : `size` en hauteurs de logo (s'adapte au mobile). */
    halo: { enabled: true, size: 3.5, color: "rgba(25, 165, 70, 0.14)" },
    pollen: {
      enabled: true,
      /** Un grain de pollen toutes les N ms de vol. */
      every: 45,
      /** Nombre de particules réutilisées. */
      pool: 28,
      colors: ["#19A546", "#00AAFF", "#FF6600", "#FFC53D"],
      /** Durée de vie d'une particule, en s. */
      life: 0.9,
    },
  },

  /**
   * PORTAIL — à la fin, le logo rejoint sa place dans la barre de navigation
   * pendant que l'écran blanc s'ouvre en cercle depuis le centre.
   * Désactivé : simple fondu + zoom (exitZoom).
   */
  portal: {
    enabled: true,
    /** Durée du déplacement du logo et de l'ouverture, en s. */
    duration: 1.1,
    /** Flou du bord du cercle, en px. */
    feather: 60,
  },

  /** Durées et délais, en secondes. */
  timing: {
    /** Attente avant le décollage. */
    flightDelay: 0.1,
    /** Durée du vol (arrêts compris, hors amarrage). */
    flight: 3.8,
    /** Décalage du slogan après l'amarrage. */
    sloganDelay: 0.2,
    /** Durée de l'apparition d'une lettre / du slogan. */
    text: 0.5,
    /** Logo complet affiché avant de révéler le site (0,6 à 0,8 s). */
    hold: 0.8,
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
  failsafeMs: 9000,
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
