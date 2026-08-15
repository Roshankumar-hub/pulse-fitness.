import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ClipReveal,
  Eyebrow,
  Logo,
  Magnetic,
  Marquee,
  RiseIn,
} from "./primitives";
import { TRAINERS } from "../lib/media";
import { cn } from "../utils/cn";

/* ============================== TRAINERS ============================== */

function TrainerCard({
  t,
  i,
}: {
  t: (typeof TRAINERS)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <RiseIn delay={i * 0.08}>
      <div
        ref={ref}
        data-cursor="hover"
        className="group relative overflow-hidden rounded-3xl border border-[#222222] bg-[#151515]"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#0F0F0F]">
          <motion.img
            src={t.img}
            alt={`${t.name}, ${t.role} at PULSE FITNESS`}
            loading="lazy"
            style={{ y }}
            className="media-sharp absolute inset-0 h-[112%] w-full scale-100 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
          <div className="absolute top-3 left-3 rounded-full bg-[#080808] px-2.5 py-1">
            <span className="font-display text-[10px] font-bold tracking-[0.2em] text-[#CCFF00]">
              {t.years}
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 border-t border-[#222222] bg-[#151515] p-4">
          <div>
            <h3 className="font-display text-[17px] leading-tight font-bold tracking-[-0.01em] text-white">
              {t.name}
            </h3>
            <p className="mt-1 text-[12.5px] font-medium text-[#8A8A8A]">
              {t.role}
            </p>
            <p className="font-display mt-2 text-[10px] font-semibold tracking-[0.16em] text-[#CCFF00] uppercase">
              {t.tag}
            </p>
          </div>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1E1E1E] text-white transition-colors duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#080808]">
            ↗
          </span>
        </div>
      </div>
    </RiseIn>
  );
}

export function Trainers() {
  return (
    <section
      id="trainers"
      className="relative border-t border-[#161616] bg-[#080808] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The Coaches</Eyebrow>
            <ClipReveal className="mt-5">
              <h2 className="font-display text-[12vw] leading-[0.88] font-bold tracking-[-0.04em] text-white sm:text-[62px] lg:text-[78px]">
                TRAINED BY
                <br />
                <span className="text-outline">THE BEST</span>
              </h2>
            </ClipReveal>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#8A8A8A] md:pb-3">
            Every coach on our floor is certified, tested and obsessed with
            progression. One-to-one programming, no guesswork.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TRAINERS.map((t, i) => (
            <TrainerCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================== PRICING =============================== */

type Tier = {
  name: string;
  price: number;
  blurb: string;
  perks: string[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "CORE",
    price: 49,
    blurb: "Full floor access, all day, every day.",
    perks: [
      "24/7 strength & cardio floor",
      "Sprint deck + treadmill labs",
      "Locker & towel service",
      "Body scan every 90 days",
    ],
  },
  {
    name: "ELITE",
    price: 99,
    blurb: "Everything in Core plus coached programming.",
    perks: [
      "All Core benefits",
      "Unlimited group classes",
      "2 PT sessions monthly",
      "Recovery suite: sauna & ice",
      "Nutrition blueprint",
    ],
    featured: true,
  },
  {
    name: "SIGNATURE",
    price: 189,
    blurb: "Private coaching and full performance care.",
    perks: [
      "All Elite benefits",
      "Weekly 1:1 with head coach",
      "Physio & massage credits",
      "Guest passes ×4 monthly",
      "Priority class booking",
    ],
  },
];

export function Pricing({ onLogin }: { onLogin: () => void }) {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="relative border-t border-[#161616] bg-[#080808] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Membership</Eyebrow>
          <ClipReveal className="mt-5">
            <h2 className="font-display text-[12vw] leading-[0.9] font-bold tracking-[-0.04em] text-white sm:text-[62px] lg:text-[76px]">
              PICK YOUR <span className="text-[#CCFF00]">LEVEL</span>
            </h2>
          </ClipReveal>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-[#222222] bg-[#111111] p-1">
            {[
              { k: false, l: "Monthly" },
              { k: true, l: "Annual · save 20%" },
            ].map((o) => (
              <button
                key={o.l}
                data-cursor="hover"
                onClick={() => setAnnual(o.k)}
                className={cn(
                  "font-display rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.06em] uppercase transition-colors duration-200",
                  annual === o.k
                    ? "bg-[#CCFF00] text-[#080808]"
                    : "text-[#8A8A8A] hover:text-white",
                )}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <RiseIn key={t.name} delay={i * 0.09}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[28px] border p-6 sm:p-7",
                  t.featured
                    ? "border-[#CCFF00] bg-[#151515]"
                    : "border-[#222222] bg-[#151515]",
                )}
                style={
                  t.featured
                    ? { boxShadow: "0 40px 80px -50px #CCFF00" }
                    : undefined
                }
              >
                {t.featured && (
                  <span className="font-display absolute -top-3 left-6 rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#080808] uppercase">
                    Most Picked
                  </span>
                )}

                <h3 className="font-display text-[13px] font-bold tracking-[0.24em] text-[#8A8A8A] uppercase">
                  {t.name}
                </h3>

                <div className="mt-4 flex items-end gap-1.5">
                  <span className="font-display text-[54px] leading-none font-bold tracking-[-0.04em] text-white">
                    ${annual ? Math.round(t.price * 0.8) : t.price}
                  </span>
                  <span className="pb-2 text-[13px] font-medium text-[#8A8A8A]">
                    /mo
                  </span>
                </div>

                <p className="mt-3 text-[13.5px] leading-relaxed text-[#8A8A8A]">
                  {t.blurb}
                </p>

                <div className="my-6 h-px w-full bg-[#242424]" />

                <ul className="flex-1 space-y-3">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          t.featured ? "bg-[#CCFF00]" : "bg-[#252525]",
                        )}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className={cn(
                            "h-2.5 w-2.5",
                            t.featured ? "stroke-[#080808]" : "stroke-[#CCFF00]",
                          )}
                          fill="none"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8.5 6.5 12 13 4.5" />
                        </svg>
                      </span>
                      <span className="text-[13.5px] leading-snug text-white">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>

                <Magnetic strength={0.18} className="!block w-full">
                  <motion.button
                    data-cursor="hover"
                    onClick={onLogin}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "font-display mt-7 w-full rounded-2xl px-5 py-3.5 text-[13px] font-bold tracking-[0.08em] uppercase transition-colors duration-200",
                      t.featured
                        ? "bg-[#CCFF00] text-[#080808]"
                        : "border border-[#2C2C2C] bg-[#1E1E1E] text-white hover:border-[#3D3D3D] hover:bg-[#242424]",
                    )}
                  >
                    Choose {t.name}
                  </motion.button>
                </Magnetic>
              </div>
            </RiseIn>
          ))}
        </div>

        <p className="mt-8 text-center text-[12.5px] text-[#6E6E6E]">
          No lock-in contracts · Cancel anytime · Student &amp; corporate rates
          available
        </p>
      </div>
    </section>
  );
}

/* ================================= CTA ================================= */

export function Cta({ onLogin }: { onLogin: () => void }) {
  return (
    <section className="relative overflow-hidden border-t border-[#161616] bg-[#080808] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[32px] border border-[#222222] bg-[#151515] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="relative">
            <Eyebrow>Doors are open</Eyebrow>
            <ClipReveal className="mt-6">
              <h2 className="font-display text-[13vw] leading-[0.88] font-bold tracking-[-0.045em] text-white sm:text-[70px] lg:text-[96px]">
                START <span className="text-[#CCFF00]">TODAY</span>
              </h2>
            </ClipReveal>
            <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-relaxed text-[#8A8A8A]">
              Book a free facility tour and a full movement assessment with a
              head coach. No pressure, no contracts.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic strength={0.25}>
                <motion.button
                  data-cursor="hover"
                  onClick={onLogin}
                  whileTap={{ scale: 0.97 }}
                  className="group font-display flex items-center gap-2.5 rounded-full bg-[#CCFF00] px-7 py-4 text-[13px] font-bold tracking-[0.08em] text-[#080808] uppercase"
                  style={{ boxShadow: "0 24px 50px -26px #CCFF00" }}
                >
                  Enter The Club
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </motion.button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  data-cursor="hover"
                  className="font-display rounded-full border border-[#2C2C2C] bg-[#1E1E1E] px-7 py-4 text-[13px] font-bold tracking-[0.08em] text-white uppercase transition-colors duration-200 hover:border-[#3D3D3D] hover:bg-[#242424]"
                >
                  Book a tour
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================ FOOTER ================================ */

const FOOTER_COLS = [
  {
    title: "Club",
    links: ["Programs", "Trainers", "Pricing", "Facilities", "Timetable"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Partners", "Contact"],
  },
  {
    title: "Support",
    links: ["Help centre", "Membership terms", "Privacy", "Accessibility"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#161616] bg-[#080808]">
      <div className="border-b border-[#161616] bg-[#CCFF00] py-3">
        <Marquee
          items={[
            "FIT BODY",
            "FIT MIND",
            "PULSE FITNESS™",
            "NO EXCUSES",
            "SHOW UP",
          ]}
          itemClassName="text-[#080808] text-[13px]"
          separator="/"
          slow
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-[#8A8A8A]">
              A performance club built around strength, sport and recovery.
              Three floors, one standard: excellence.
            </p>
            <div className="mt-5 flex gap-2">
              {["IG", "YT", "X", "IN"].map((s) => (
                <button
                  key={s}
                  data-cursor="hover"
                  aria-label={s}
                  className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-[#242424] bg-[#151515] text-[11px] font-bold text-[#8A8A8A] transition-colors duration-200 hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#080808]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-[11px] font-bold tracking-[0.22em] text-white uppercase">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <button
                      data-cursor="hover"
                      className="text-[13.5px] text-[#8A8A8A] transition-colors duration-200 hover:text-[#CCFF00]"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#1A1A1A] pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-[#5E5E5E]">
            © {new Date().getFullYear()} PULSE FITNESS™. All rights reserved.
          </p>
          <p className="font-display text-[10px] font-semibold tracking-[0.24em] text-[#3E3E3E] uppercase">
            Built sharp — zero blur
          </p>
        </div>
      </div>
    </footer>
  );
}
