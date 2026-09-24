"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { gsap } from "@/lib/motion/gsap";
import { MEDIA } from "@/lib/motion/tokens";
import { splashConfig as cfg, SPLASH_DONE_EVENT } from "@/config/splash";
import { HummingbirdMark } from "@/components/motion/HummingbirdMark";

gsap.registerPlugin(MotionPathPlugin);

/** Numéro du dernier lancement (distingue un vrai démontage du remontage du mode strict). */
let splashRun = 0;

declare global {
  interface Window {
    __splashFailsafe?: ReturnType<typeof setTimeout>;
  }
}

/**
 * Écran d'introduction : le colibri vole le long du tracé de config/splash.ts,
 * le nom et le slogan apparaissent, l'oiseau se pose à sa place dans le logo
 * centré, puis l'écran blanc s'efface sur la page déjà chargée dessous.
 *
 * - Affiché par le script de <head> (html[data-splash="on"]) : aucun flash,
 *   et rien du tout quand il ne doit pas jouer. Le contenu de la page reste
 *   rendu dans le HTML (SEO intact).
 * - Une fois par session ; « Passer », un clic ou Échap l'interrompent.
 * - Mouvement réduit : logo fixe ~1 s puis simple fondu, sans vol.
 */
export function SplashScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const sloganRef = useRef<HTMLSpanElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const logo = logoRef.current;
    const slot = slotRef.current;
    const bird = birdRef.current;
    const name = nameRef.current;
    const slogan = sloganRef.current;
    if (html.dataset.splash !== "on" || !root || !logo || !slot || !bird || !name || !slogan) {
      // Pas de splash pour cette visite (déjà vu, page interne…) : on se retire.
      const id = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(id);
    }
    clearTimeout(window.__splashFailsafe);
    const run = ++splashRun;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(cfg.storageKey, "1");
      } catch {
        // stockage indisponible : le splash pourra rejouer, rien de grave
      }
      html.dataset.splash = "done";
      window.dispatchEvent(new Event(SPLASH_DONE_EVENT));
      setGone(true);
    };

    const ctx = gsap.context(() => {
      const t = cfg.timing;
      const reduced = !window.matchMedia(MEDIA.motionOk).matches;
      const texts = [name, slogan];

      // Où le colibri doit se poser : le centre de sa place dans le logo.
      const s = slot.getBoundingClientRect();
      const target = { x: s.left + s.width / 2, y: s.top + s.height / 2 };
      gsap.set(bird, { width: s.width, height: s.height, xPercent: -50, yPercent: -50, x: target.x, y: target.y });

      const exit = (duration: number) =>
        gsap
          .timeline({ onComplete: finish })
          .to(root, { opacity: 0, scale: cfg.exitZoom, duration, ease: "power2.inOut" }, 0);

      if (reduced) {
        gsap.set([...texts, bird], { opacity: 1 });
        const tl = gsap.timeline();
        tl.add(exit(t.reducedExit), t.reducedHold);
        skipRef.current = () => {
          tl.kill();
          exit(t.skipExit);
        };
        return;
      }

      const path = buildFlightPath(target);
      const tl = gsap.timeline();

      // Battement d'ailes pendant tout le vol.
      const body = bird.firstElementChild;
      const wings = bird.querySelector("[data-wings]");
      const flap = gsap.to(wings, {
        scaleY: 0.45,
        duration: t.wingBeat,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      tl.set(bird, { opacity: 1 }, t.flightDelay)
        .fromTo(
          bird,
          { scale: cfg.birdStartScale },
          {
            scale: 1,
            duration: t.flight,
            ease: "sine.inOut",
            motionPath: { path, autoRotate: true },
            // En vol vers la gauche, l'oiseau se retourne en miroir au lieu
            // de voler la tête en bas.
            onUpdate: () => {
              const angle = (Number(gsap.getProperty(bird, "rotation")) * Math.PI) / 180;
              gsap.set(body, { scaleY: Math.cos(angle) < 0 ? -1 : 1 });
            },
          },
          t.flightDelay,
        )
        .add(() => {
          // Arrivée tête à droite : on ramène l'angle à 0 (même position, sans tour complet).
          gsap.set(bird, { rotation: 0 });
          gsap.set(body, { scaleY: 1 });
          flap.kill();
          gsap.to(wings, { scaleY: 1, duration: 0.15, ease: "back.out(2)" });
        }, t.flightDelay + t.flight)
        .fromTo(name, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: t.text, ease: "power3.out" }, t.nameAt)
        .fromTo(
          slogan,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: t.text, ease: "power3.out" },
          t.nameAt + t.sloganDelay,
        )
        .add(exit(t.exit), t.flightDelay + t.flight + t.hold);

      skipRef.current = () => {
        tl.kill();
        flap.kill();
        gsap.to(bird, { rotation: 0, scale: 1, x: target.x, y: target.y, opacity: 1, duration: t.skipExit });
        gsap.set(body, { scaleY: 1 });
        gsap.to(texts, { opacity: 1, y: 0, duration: t.skipExit });
        exit(t.skipExit);
      };
    }, root);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
      // Vrai démontage en cours d'animation (navigation) : ne jamais laisser
      // l'écran. Le démontage/remontage de test du mode strict de React
      // relance l'effet aussitôt (splashRun change) et n'est donc pas concerné.
      setTimeout(() => {
        if (splashRun === run && !finished && html.dataset.splash === "on") {
          html.dataset.splash = "done";
        }
      }, 50);
    };
  }, []);

  if (!cfg.enabled || gone) return null;

  return (
    <div
      ref={rootRef}
      className="splash fixed inset-0 z-[9999] items-center justify-center"
      style={
        {
          backgroundColor: cfg.background,
          "--splash-h-mobile": `${cfg.logoHeight.mobile}px`,
          "--splash-h-desktop": `${cfg.logoHeight.desktop}px`,
        } as CSSProperties
      }
      onClick={() => skipRef.current()}
    >
      <div
        ref={logoRef}
        className="splash-logo relative aspect-[165/55.67]"
        role="img"
        aria-label="KIYANZA — Light your future"
      >
        {/* Place du colibri dans le logo : cible de l'atterrissage. */}
        <span ref={slotRef} className="absolute left-0 top-0 aspect-[85/56] h-full" />
        <span
          ref={nameRef}
          data-splash-part
          className="absolute left-[45.5%] top-[37.7%] whitespace-nowrap text-[calc(var(--splash-h)*0.375)] font-extrabold leading-none tracking-[-0.02em] text-black"
        >
          KIYANZA
        </span>
        <span
          ref={sloganRef}
          data-splash-part
          className="absolute left-[52%] top-[77.5%] whitespace-nowrap text-[calc(var(--splash-h)*0.1406)] font-medium leading-none text-green-accent"
        >
          Light your future
        </span>
      </div>

      {/* Le colibri qui vole : positionné par son centre (x/y = centre). */}
      <div
        ref={birdRef}
        data-splash-part
        className="pointer-events-none fixed left-0 top-0 will-change-transform"
      >
        <HummingbirdMark className="size-full" />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          skipRef.current();
        }}
        className="absolute bottom-5 right-5 rounded-full px-4 py-2 text-sm font-semibold text-black/60 transition hover:bg-black/5 hover:text-black"
      >
        Passer
      </button>
    </div>
  );
}

/**
 * Convertit le tracé de config (repère 0–100 = écran) en pixels, puis fixe
 * son dernier point sur la cible et aligne le dernier point de contrôle à
 * l'horizontale : l'oiseau arrive tête à droite, exactement à sa place.
 */
function buildFlightPath(target: { x: number; y: number }) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const d = w >= cfg.desktopFrom ? cfg.flightPath.desktop : cfg.flightPath.mobile;
  const raw = MotionPathPlugin.stringToRawPath(d);
  MotionPathPlugin.transformRawPath(raw, w / 100, 0, 0, h / 100, 0, 0);
  const seg = raw[raw.length - 1];
  const n = seg.length;
  const approach = Math.max(w * 0.08, 60);
  seg[n - 2] = target.x;
  seg[n - 1] = target.y;
  seg[n - 4] = target.x - approach;
  seg[n - 3] = target.y;
  return MotionPathPlugin.rawPathToString(raw);
}
