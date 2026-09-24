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

type RawPath = ReturnType<typeof MotionPathPlugin.stringToRawPath>;

/**
 * Écran d'introduction : le colibri vole le long du tracé de config/splash.ts
 * — il fonce, marque des arrêts en vol stationnaire, laisse un sillage aux
 * couleurs du logo —, le nom et le slogan apparaissent, l'oiseau se pose à
 * sa place, puis le logo rejoint la barre de navigation pendant que l'écran
 * s'ouvre en cercle sur la page déjà chargée dessous (« portail »).
 *
 * - Affiché par le script de <head> (html[data-splash="on"]) : aucun flash,
 *   et rien du tout quand il ne doit pas jouer. Le contenu de la page reste
 *   rendu dans le HTML (SEO intact).
 * - Une fois par session ; « Passer », un clic ou Échap l'interrompent.
 * - Mouvement réduit : logo fixe ~1 s puis simple fondu, sans vol.
 */
export function SplashScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const sloganRef = useRef<HTMLSpanElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    const veil = veilRef.current;
    const trail = trailRef.current;
    const logo = logoRef.current;
    const slot = slotRef.current;
    const bird = birdRef.current;
    const name = nameRef.current;
    const slogan = sloganRef.current;
    const skipBtn = skipBtnRef.current;
    if (
      html.dataset.splash !== "on" ||
      !root || !veil || !trail || !logo || !slot || !bird || !name || !slogan || !skipBtn
    ) {
      // Pas de splash pour cette visite (déjà vu, page interne…) : on se retire.
      const id = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(id);
    }
    clearTimeout(window.__splashFailsafe);
    const run = ++splashRun;

    // La page se dévoile : les intros de hero peuvent démarrer.
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      window.dispatchEvent(new Event(SPLASH_DONE_EVENT));
    };
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
      reveal();
      setGone(true);
    };

    const ctx = gsap.context(() => {
      const t = cfg.timing;
      const reduced = !window.matchMedia(MEDIA.motionOk).matches;
      const texts = [name, slogan];
      const body = bird.firstElementChild;
      const wings = bird.querySelector("[data-wings]");

      // Où le colibri doit se poser : le centre de sa place dans le logo.
      const s = slot.getBoundingClientRect();
      const target = { x: s.left + s.width / 2, y: s.top + s.height / 2 };
      gsap.set(bird, { width: s.width, height: s.height, xPercent: -50, yPercent: -50, x: target.x, y: target.y });

      // Sortie simple (mouvement réduit, « Passer ») : fondu + léger zoom.
      const fadeOut = (duration: number) => {
        reveal();
        return gsap
          .timeline({ onComplete: finish })
          .to(root, { opacity: 0, scale: cfg.exitZoom, duration, ease: "power2.inOut" }, 0);
      };

      if (reduced) {
        gsap.set([...texts, bird], { opacity: 1 });
        const tl = gsap.timeline();
        tl.add(fadeOut(t.reducedExit), t.reducedHold);
        skipRef.current = () => {
          tl.kill();
          fadeOut(t.skipExit);
        };
        return;
      }

      // --- Vol ---------------------------------------------------------------
      const raw = buildFlightPath(target);
      const d = MotionPathPlugin.rawPathToString(raw);
      const w = window.innerWidth;
      const h = window.innerHeight;
      trail.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const ribbons = Array.from(trail.querySelectorAll("path"));
      ribbons.forEach((path) => path.setAttribute("d", d));

      // Progression pilotée à la main : p = position sur le tracé (0→1),
      // hover = redressement pendant un arrêt, bob = flottement vertical.
      const state = { p: 0, hover: 0, bob: 0 };
      const render = () => {
        const pos = MotionPathPlugin.getPositionOnPath(raw, state.p, true) as {
          x: number;
          y: number;
          angle: number;
        };
        const facingLeft = Math.cos((pos.angle * Math.PI) / 180) < 0;
        // En vol stationnaire, l'oiseau se remet d'aplomb (tête vers où il allait).
        const angle = lerpAngle(pos.angle, facingLeft ? 180 : 0, state.hover);
        const scale =
          (cfg.birdStartScale + (1 - cfg.birdStartScale) * state.p) *
          (1 + cfg.life.depth * Math.sin(state.p * Math.PI * 3));
        gsap.set(bird, { x: pos.x, y: pos.y + state.bob, rotation: angle, scale });
        // Vers la gauche : miroir plutôt que tête en bas.
        gsap.set(body, { scaleY: facingLeft ? -1 : 1 });
        if (cfg.trail.enabled) {
          let head = state.p;
          cfg.trail.ribbons.forEach((ribbon, i) => {
            const tail = Math.max(0, head - ribbon.length);
            gsap.set(ribbons[i], { drawSVG: `${tail * 100}% ${Math.max(tail, head) * 100}%` });
            head = tail;
          });
        }
      };

      const flap = gsap.to(wings, {
        scaleY: 0.45,
        duration: t.wingBeat,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      const tl = gsap.timeline({ delay: t.flightDelay });
      const hovers = cfg.life.hovers;
      const hoverTime = hovers.reduce((sum, hv) => sum + hv.duration, 0);
      const travel = Math.max(0.5, t.flight - hoverTime);
      let from = 0;

      tl.set(bird, { opacity: 1 }).call(render);
      [...hovers, { at: 1, duration: 0 }].forEach((stop, i, all) => {
        const last = i === all.length - 1;
        // Chaque bond accélère puis freine : effet « fonce / s'arrête net ».
        tl.to(state, {
          p: stop.at,
          duration: travel * (stop.at - from),
          ease: last ? "power3.out" : "power2.inOut",
          onUpdate: render,
        });
        from = stop.at;
        if (last) return;
        const hd = stop.duration;
        tl.addLabel(`hover${i}`)
          .call(() => { flap.timeScale(cfg.life.hoverWingSpeed); })
          .to(state, { hover: 1, duration: Math.min(0.18, hd / 2), ease: "power2.out", onUpdate: render }, `hover${i}`)
          .to(state, {
            keyframes: [
              { bob: -cfg.life.hoverBob, duration: hd / 2, ease: "sine.inOut" },
              { bob: 0, duration: hd / 2, ease: "sine.inOut" },
            ],
            onUpdate: render,
          }, `hover${i}`)
          .to(state, { hover: 0, duration: Math.min(0.18, hd / 2), ease: "power2.in", onUpdate: render }, `hover${i}+=${hd - Math.min(0.18, hd / 2)}`)
          .call(() => { flap.timeScale(1); }, [], `hover${i}+=${hd}`);
      });

      const landAt = tl.duration();
      tl.add(() => {
        // Posé : angle à 0 (même position, sans tour complet), ailes repliées.
        gsap.set(bird, { rotation: 0, scale: 1, x: target.x, y: target.y });
        gsap.set(body, { scaleY: 1 });
        flap.kill();
        gsap.to(wings, { scaleY: 1, duration: 0.15, ease: "back.out(2)" });
      }, landAt)
        .to(ribbons, { opacity: 0, duration: 0.5 }, landAt - 0.1)
        .fromTo(name, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: t.text, ease: "power3.out" }, t.nameAt - t.flightDelay)
        .fromTo(
          slogan,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: t.text, ease: "power3.out" },
          t.nameAt - t.flightDelay + t.sloganDelay,
        );

      // --- Sortie : portail ou fondu ------------------------------------------
      const navLogo = document.querySelector<HTMLElement>("header a[aria-label$='Accueil'] > div");
      const exitAt = landAt + t.hold;
      if (cfg.portal.enabled && navLogo) {
        tl.add(() => portal(navLogo), exitAt);
      } else {
        tl.add(() => fadeOut(t.exit), exitAt);
      }

      function portal(nav: HTMLElement) {
        reveal();
        const n = nav.getBoundingClientRect();
        const l = logo!.getBoundingClientRect();
        const k = n.height / l.height;
        const dur = cfg.portal.duration;
        const ease = "power3.inOut";
        const radius = Math.hypot(w, h);
        const pt = gsap.timeline({ onComplete: finish });
        // Le logo et l'oiseau glissent vers la barre de navigation…
        pt.to(logo, { x: n.left - l.left, y: n.top - l.top, scale: k, transformOrigin: "0 0", duration: dur, ease }, 0)
          .to(bird, {
            x: n.left + (target.x - l.left) * k,
            y: n.top + (target.y - l.top) * k,
            scale: k,
            duration: dur,
            ease,
          }, 0)
          // …pendant que l'écran blanc s'ouvre en cercle depuis le centre.
          .fromTo(veil, { "--portal": `${-cfg.portal.feather}px` }, {
            "--portal": `${radius}px`,
            duration: dur * 0.9,
            ease: "power2.in",
          }, dur * 0.1)
          .to(skipBtn, { opacity: 0, duration: 0.2 }, 0)
          // Arrivé pile sur le vrai logo : on s'efface.
          .to([logo, bird], { opacity: 0, duration: 0.2 }, dur - 0.05);
      }

      skipRef.current = () => {
        tl.kill();
        flap.kill();
        gsap.set(ribbons, { opacity: 0 });
        gsap.to(bird, { rotation: 0, scale: 1, x: target.x, y: target.y, opacity: 1, duration: t.skipExit });
        gsap.set(body, { scaleY: 1 });
        gsap.to(texts, { opacity: 1, y: 0, duration: t.skipExit });
        fadeOut(t.skipExit);
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
          "--splash-h-mobile": `${cfg.logoHeight.mobile}px`,
          "--splash-h-desktop": `${cfg.logoHeight.desktop}px`,
        } as CSSProperties
      }
      onClick={() => skipRef.current()}
    >
      {/* Écran blanc ; percé d'un cercle grandissant pendant le « portail ». */}
      <div
        ref={veilRef}
        className="splash-veil absolute inset-0"
        style={
          {
            backgroundColor: cfg.background,
            "--portal-feather": `${cfg.portal.feather}px`,
          } as CSSProperties
        }
      />

      {/* Sillage : trois rubans qui suivent l'oiseau (tracé posé en JS). */}
      <svg ref={trailRef} className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
        {cfg.trail.ribbons.map((r) => (
          <path
            key={r.color}
            fill="none"
            stroke={r.color}
            strokeWidth={r.width}
            strokeOpacity={r.opacity}
            strokeLinecap="round"
            strokeDasharray="0 1"
          />
        ))}
      </svg>

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
        ref={skipBtnRef}
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
 * Les longueurs sont mesurées pour que p (0→1) avance à vitesse régulière.
 */
function buildFlightPath(target: { x: number; y: number }): RawPath {
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
  MotionPathPlugin.cacheRawPathMeasurements(raw);
  return raw;
}

/** Interpolation d'angle (en degrés) par le plus court chemin. */
function lerpAngle(from: number, to: number, t: number) {
  const diff = ((((to - from) % 360) + 540) % 360) - 180;
  return from + diff * t;
}
