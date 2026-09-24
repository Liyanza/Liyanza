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

const NAME = "KIYANZA";

/**
 * Écran d'introduction : le colibri vole le long du tracé de config/splash.ts
 * — il fonce, marque des arrêts, laisse un sillage et du pollen, allume une à
 * une les lettres du nom qu'il frôle —, s'arrête devant sa place, s'y glisse
 * (une onde part du logo), puis le logo rejoint la barre de navigation
 * pendant que l'écran s'ouvre en cercle sur la page déjà chargée (« portail »).
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
  const haloRef = useRef<HTMLDivElement>(null);
  const pollenRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
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
    const els = {
      root: rootRef.current,
      veil: veilRef.current,
      trail: trailRef.current,
      halo: haloRef.current,
      pollen: pollenRef.current,
      rings: ringsRef.current,
      logo: logoRef.current,
      slot: slotRef.current,
      bird: birdRef.current,
      name: nameRef.current,
      slogan: sloganRef.current,
      skipBtn: skipBtnRef.current,
    };
    if (html.dataset.splash !== "on" || Object.values(els).some((el) => !el)) {
      // Pas de splash pour cette visite (déjà vu, page interne…) : on se retire.
      const id = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(id);
    }
    const { root, veil, trail, halo, pollen, rings, logo, slot, bird, name, slogan, skipBtn } =
      els as { [K in keyof typeof els]: NonNullable<(typeof els)[K]> };
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
      const letters = Array.from(name.querySelectorAll<HTMLElement>("[data-letter]"));
      const texts = [...letters, slogan];
      const body = bird.firstElementChild;
      const wings = bird.querySelector("[data-wings]");
      const ribbons = Array.from(trail.querySelectorAll("path"));
      const motes = Array.from(pollen.children) as HTMLElement[];
      const ringEls = Array.from(rings.children) as HTMLElement[];

      // Où le colibri doit se poser : le centre de sa place dans le logo.
      const s = slot.getBoundingClientRect();
      const logoH = s.height;
      const target = { x: s.left + s.width / 2, y: s.top + s.height / 2 };
      gsap.set(bird, { width: s.width, height: s.height, xPercent: -50, yPercent: -50, x: target.x, y: target.y });
      gsap.set([halo, ...motes, ...ringEls], { xPercent: -50, yPercent: -50 });

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

      // --- Lettres : centre de chacune, allumage une seule fois ----------------
      const letterCenters = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      const lit = new Set<number>();
      const light = (i: number, delay = 0) => {
        if (lit.has(i)) return;
        lit.add(i);
        gsap.fromTo(
          letters[i],
          { opacity: 0, y: logoH * 0.12, scale: 0.6 },
          { opacity: 1, y: 0, scale: 1, duration: t.text, delay, ease: "back.out(2.4)" },
        );
      };
      const reach = logoH * cfg.nameReveal.reach;

      // --- Pollen : particules réutilisées, semées derrière l'oiseau ----------
      let mote = 0;
      let lastMote = 0;
      const sow = (x: number, y: number) => {
        const el = motes[mote++ % motes.length];
        const colors = cfg.ambience.pollen.colors;
        gsap.killTweensOf(el);
        gsap.fromTo(
          el,
          {
            x: x + gsap.utils.random(-6, 6),
            y: y + gsap.utils.random(-6, 6),
            scale: gsap.utils.random(0.6, 1.3),
            opacity: 0.9,
            backgroundColor: colors[mote % colors.length],
          },
          {
            x: `+=${gsap.utils.random(-24, 24)}`,
            y: `+=${gsap.utils.random(6, 34)}`,
            scale: 0,
            opacity: 0,
            duration: cfg.ambience.pollen.life,
            ease: "power1.out",
          },
        );
      };
      const haloX = gsap.quickTo(halo, "x", { duration: 0.6, ease: "power3.out" });
      const haloY = gsap.quickTo(halo, "y", { duration: 0.6, ease: "power3.out" });

      // --- Vol ---------------------------------------------------------------
      const dockPoint = cfg.dock.enabled
        ? { x: target.x + cfg.dock.offset.x * logoH, y: target.y + cfg.dock.offset.y * logoH }
        : target;
      const raw = buildFlightPath(dockPoint);
      const d = MotionPathPlugin.rawPathToString(raw);
      const w = window.innerWidth;
      const h = window.innerHeight;
      trail.setAttribute("viewBox", `0 0 ${w} ${h}`);
      ribbons.forEach((path) => path.setAttribute("d", d));

      // Progression pilotée à la main : p = position sur le tracé (0→1),
      // hover = redressement pendant un arrêt, bob = flottement vertical.
      const state = { p: 0, hover: 0, bob: 0 };
      let prev = MotionPathPlugin.getPositionOnPath(raw, 0) as { x: number; y: number };
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
        const y = pos.y + state.bob;
        gsap.set(bird, { x: pos.x, y, rotation: angle, scale });
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
        if (cfg.ambience.halo.enabled) {
          haloX(pos.x);
          haloY(y);
        }
        const now = performance.now();
        if (cfg.ambience.pollen.enabled && state.hover < 0.5 && now - lastMote > cfg.ambience.pollen.every) {
          lastMote = now;
          sow(pos.x, y);
        }
        // Distance au segment parcouru depuis la dernière image : même à bas
        // débit d'images, l'oiseau ne « saute » pas par-dessus une lettre.
        letterCenters.forEach((c, i) => {
          if (distToSegment(c, prev, { x: pos.x, y }) < reach) light(i);
        });
        prev = { x: pos.x, y };
      };

      const flap = gsap.to(wings, {
        scaleY: 0.45,
        duration: t.wingBeat,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Arrêt en vol stationnaire à la position courante.
      const hoverAt = (tl: gsap.core.Timeline, label: string, hd: number) => {
        const ramp = Math.min(0.18, hd / 2);
        tl.addLabel(label)
          .call(() => { flap.timeScale(cfg.life.hoverWingSpeed); }, [], label)
          .to(state, { hover: 1, duration: ramp, ease: "power2.out", onUpdate: render }, label)
          .to(state, {
            keyframes: [
              { bob: -cfg.life.hoverBob, duration: hd / 2, ease: "sine.inOut" },
              { bob: 0, duration: hd / 2, ease: "sine.inOut" },
            ],
            onUpdate: render,
          }, label)
          .to(state, { hover: 0, duration: ramp, ease: "power2.in", onUpdate: render }, `${label}+=${hd - ramp}`)
          .call(() => { flap.timeScale(1); }, [], `${label}+=${hd}`);
      };

      const tl = gsap.timeline({ delay: t.flightDelay });
      const hovers = cfg.life.hovers;
      const hoverTime = hovers.reduce((sum, hv) => sum + hv.duration, 0);
      const travel = Math.max(0.5, t.flight - hoverTime);
      let from = 0;

      const start = MotionPathPlugin.getPositionOnPath(raw, 0) as { x: number; y: number };
      gsap.set(halo, { x: start.x, y: start.y });
      tl.set([bird, halo], { opacity: 1 }).call(render);
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
        if (!last) hoverAt(tl, `hover${i}`, stop.duration);
      });

      // Amarrage : stationnaire devant la place, puis glissade jusqu'à elle.
      if (cfg.dock.enabled) {
        hoverAt(tl, "dock", cfg.dock.hover);
        tl.to(bird, { x: target.x, y: target.y, rotation: 0, scale: 1, duration: cfg.dock.glide, ease: "power2.out" })
          .to(halo, { x: target.x, y: target.y, duration: cfg.dock.glide, ease: "power2.out", overwrite: "auto" }, "<");
      }

      const landAt = tl.duration();
      tl.add(() => {
        // Posé : angle à 0 (même position, sans tour complet), ailes repliées.
        gsap.set(bird, { rotation: 0, scale: 1, x: target.x, y: target.y });
        gsap.set(body, { scaleY: 1 });
        flap.kill();
        gsap.to(wings, { scaleY: 1, duration: 0.15, ease: "back.out(2)" });
        // Les lettres que l'oiseau n'a pas frôlées apparaissent en cascade.
        letters.forEach((_, i) => light(i, i * cfg.nameReveal.stagger));
      }, landAt)
        .to(ribbons, { opacity: 0, duration: 0.5 }, landAt - 0.1)
        .to(halo, { scale: 1.4, opacity: 0.5, duration: 0.8, ease: "power2.out" }, landAt)
        .fromTo(
          slogan,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: t.text, ease: "power3.out" },
          landAt + t.sloganDelay,
        );
      if (cfg.dock.enabled) {
        ringEls.forEach((ring, i) => {
          tl.fromTo(
            ring,
            { x: target.x, y: target.y, width: logoH * 1.1, height: logoH * 1.1, scale: 0.35, opacity: 0.7 },
            {
              scale: cfg.dock.ringScale,
              opacity: 0,
              duration: cfg.dock.ringDuration,
              ease: "power2.out",
              // Sans ça, l'état de départ (anneau visible) s'afficherait dès le début.
              immediateRender: false,
            },
            landAt + i * 0.14,
          );
        });
      }

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
        const l = logo.getBoundingClientRect();
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
          .to([skipBtn, halo], { opacity: 0, duration: 0.3 }, 0)
          // Arrivé pile sur le vrai logo : on s'efface.
          .to([logo, bird], { opacity: 0, duration: 0.2 }, dur - 0.05);
      }

      skipRef.current = () => {
        tl.kill();
        flap.kill();
        gsap.set([...ribbons, halo, ...motes, ...ringEls], { opacity: 0 });
        gsap.to(bird, { rotation: 0, scale: 1, x: target.x, y: target.y, opacity: 1, duration: t.skipExit });
        gsap.set(body, { scaleY: 1 });
        gsap.to(texts, { opacity: 1, y: 0, scale: 1, duration: t.skipExit });
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

  const { halo, pollen } = cfg.ambience;

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
      {/* Écran blanc (avec grain) ; percé d'un cercle pendant le « portail ». */}
      <div
        ref={veilRef}
        className="splash-veil absolute inset-0"
        style={
          {
            backgroundColor: cfg.background,
            "--portal-feather": `${cfg.portal.feather}px`,
            "--grain": cfg.ambience.grain,
          } as CSSProperties
        }
      />

      {/* Halo coloré qui suit l'oiseau (reste invisible s'il est désactivé). */}
      <div
        ref={haloRef}
        data-splash-part
        className="pointer-events-none fixed left-0 top-0 rounded-full"
        style={{
          width: `calc(var(--splash-h) * ${halo.size})`,
          height: `calc(var(--splash-h) * ${halo.size})`,
          background: halo.enabled ? `radial-gradient(circle, ${halo.color} 0%, transparent 65%)` : "none",
        }}
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

      {/* Pollen semé derrière l'oiseau. */}
      <div ref={pollenRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {pollen.enabled &&
          Array.from({ length: pollen.pool }, (_, i) => (
            <span key={i} className="fixed left-0 top-0 size-1.5 rounded-full opacity-0" />
          ))}
      </div>

      {/* Ondes de l'amarrage. */}
      <div ref={ringsRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: cfg.dock.enabled ? cfg.dock.rings : 0 }, (_, i) => (
          <span
            key={i}
            className="fixed left-0 top-0 rounded-full border-2 opacity-0"
            style={{ borderColor: cfg.dock.ringColor }}
          />
        ))}
      </div>

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
          aria-hidden="true"
          className="absolute left-[45.5%] top-[37.7%] whitespace-nowrap text-[calc(var(--splash-h)*0.375)] font-extrabold leading-none tracking-[-0.02em] text-black"
        >
          {NAME.split("").map((letter, i) => (
            <span key={i} data-letter data-splash-part className="inline-block">
              {letter}
            </span>
          ))}
        </span>
        <span
          ref={sloganRef}
          data-splash-part
          aria-hidden="true"
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
 * son dernier point sur `end` et aligne le dernier point de contrôle à
 * l'horizontale : l'oiseau arrive tête à droite, exactement là.
 * Les longueurs sont mesurées pour que p (0→1) avance à vitesse régulière.
 */
function buildFlightPath(end: { x: number; y: number }): RawPath {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const d = w >= cfg.desktopFrom ? cfg.flightPath.desktop : cfg.flightPath.mobile;
  const raw = MotionPathPlugin.stringToRawPath(d);
  MotionPathPlugin.transformRawPath(raw, w / 100, 0, 0, h / 100, 0, 0);
  const seg = raw[raw.length - 1];
  const n = seg.length;
  const approach = Math.max(w * 0.08, 60);
  seg[n - 2] = end.x;
  seg[n - 1] = end.y;
  seg[n - 4] = end.x - approach;
  seg[n - 3] = end.y;
  MotionPathPlugin.cacheRawPathMeasurements(raw);
  return raw;
}

/** Distance d'un point au segment [a, b]. */
function distToSegment(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len)) : 0;
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** Interpolation d'angle (en degrés) par le plus court chemin. */
function lerpAngle(from: number, to: number, t: number) {
  const diff = ((((to - from) % 360) + 540) % 360) - 180;
  return from + diff * t;
}
