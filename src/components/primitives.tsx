import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/*  LOGO — PULSE FITNESS™                                              */
/* ------------------------------------------------------------------ */

export function Logo({
  className,
  onClick,
  compact = false,
}: {
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "group flex items-center gap-2.5 select-none",
        onClick ? "cursor-pointer" : "cursor-default",
        className,
      )}
      aria-label="PULSE FITNESS trademark, home"
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-[#CCFF00]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            d="M2 12h4l2.5-7 4 14 3-9 2 2h4.5"
            fill="none"
            stroke="#080808"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display flex items-start leading-none font-bold tracking-[-0.02em] text-white">
        <span className={compact ? "text-[15px]" : "text-[17px]"}>
          PULSE&nbsp;<span className="text-[#CCFF00]">FITNESS</span>
        </span>
        <sup className="ml-[3px] text-[7px] font-semibold tracking-normal text-[#8A8A8A]">
          TM
        </sup>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARP VIDEO — lazy, 4K, zero blur                                  */
/* ------------------------------------------------------------------ */

export function SharpVideo({
  src,
  poster,
  className,
  style,
  objectPosition = "center",
}: {
  src: string;
  poster: string;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setArmed(true);
            const p = el.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={armed ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      className={cn("media-sharp h-full w-full object-cover", className)}
      style={{ objectPosition, ...style }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  MAGNETIC WRAPPER                                                   */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy } as MotionStyle}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CUSTOM CURSOR — white dot + ring (sharp)                           */
/* ------------------------------------------------------------------ */

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const dx = useMotionValue(-100);
  const dy = useMotionValue(-100);
  const rx = useSpring(dx, { stiffness: 300, damping: 26, mass: 0.5 });
  const ry = useSpring(dy, { stiffness: 300, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      dx.set(e.clientX);
      dy.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHot(
        !!t?.closest?.(
          '[data-cursor="hover"], a, button, input, textarea, select',
        ),
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [dx, dy]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-white"
        style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute rounded-full border"
        animate={{
          width: hot ? 46 : 28,
          height: hot ? 46 : 28,
          borderColor: hot ? "#CCFF00" : "#5A5A5A",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIP-PATH REVEAL                                                   */
/* ------------------------------------------------------------------ */

export function ClipReveal({
  children,
  delay = 0,
  duration = 0.9,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RiseIn({
  children,
  delay = 0,
  y = 34,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  COUNTER                                                            */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  duration = 1800,
  decimals = 0,
}: {
  to: number;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION LABEL                                                      */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-[#262626] bg-[#111111] px-3.5 py-1.5",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="pulse-ring absolute inset-0 rounded-full" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
      </span>
      <span className="font-display text-[10px] font-semibold tracking-[0.28em] text-[#8A8A8A] uppercase">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GRAIN — 2% opacity texture (not a blur)                            */
/* ------------------------------------------------------------------ */

const GRAIN_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`,
  );

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.02]"
      style={{
        backgroundImage: `url("${GRAIN_URI}")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                            */
/* ------------------------------------------------------------------ */

export function Marquee({
  items,
  className,
  itemClassName,
  reverse = false,
  slow = false,
  separator = "•",
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
  slow?: boolean;
  separator?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className={cn(
          slow ? "marquee-track-slow" : "marquee-track",
          reverse && "marquee-reverse",
        )}
      >
        {row.map((it, i) => (
          <span
            key={i}
            className={cn(
              "font-display flex items-center gap-6 pr-6 text-sm font-semibold tracking-[0.2em] whitespace-nowrap uppercase",
              itemClassName,
            )}
          >
            {it}
            <span className="text-[#CCFF00]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
