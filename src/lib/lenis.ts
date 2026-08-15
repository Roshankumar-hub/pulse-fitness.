import Lenis from "lenis";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Mount Lenis smooth scroll (transform-free, so nothing ever blurs). */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    instance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, [enabled]);
}

/** Smooth scroll to a selector, using Lenis when available. */
export function smoothScrollTo(selector: string) {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: -80, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollTop() {
  if (instance) instance.scrollTo(0, { duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
