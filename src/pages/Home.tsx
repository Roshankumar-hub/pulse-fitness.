import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "../components/Navbar";
import {
  ClipReveal,
  Counter,
  Eyebrow,
  Magnetic,
  Marquee,
  RiseIn,
  SharpVideo,
} from "../components/primitives";
import { Cta, Footer, Pricing, Trainers } from "../components/sections";
import { smoothScrollTo } from "../lib/lenis";
import {
  FIGHT_BOXING,
  GYM_DEADLIFT,
  GYM_MAN,
  RUN_TREADMILL,
  RUN_TREADMILL_2,
  YOGA_STRETCH,
  type Clip,
} from "../lib/media";
import { cn } from "../utils/cn";

/* ================================= HERO ================================= */

const HERO_LINES = ["FIT BODY", "FIT MIND"];

function Hero({ onLogin }: { onLogin: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const vy = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const vs = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-[#080808] px-4 pt-28 pb-14 sm:px-6 sm:pt-36 lg:pt-40 lg:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(#121212 1px, transparent 1px), linear-gradient(90deg, #121212 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        {/* ---------- LEFT: kinetic headline ---------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <Eyebrow>Est. 2014 · Members only</Eyebrow>
          </motion.div>

          <h1 className="mt-6">
            {HERO_LINES.map((line, i) => (
              <motion.span
                key={line}
                initial={{ clipPath: "inset(0% 0% 100% 0%)", y: 40 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.32 + i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "font-display block text-[16vw] leading-[0.84] font-bold tracking-[-0.045em] sm:text-[92px] lg:text-[108px] xl:text-[120px]",
                  i === 1 ? "text-outline" : "text-white",
                )}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.66 }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-[#9A9A9A]"
          >
            Three floors of strength, sprint and recovery inside one
            precision-built club. Programmed by elite coaches, engineered for
            people who refuse average.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.28}>
              <motion.button
                data-cursor="hover"
                onClick={onLogin}
                whileTap={{ scale: 0.97 }}
                className="group font-display flex w-full items-center justify-center gap-2.5 rounded-full bg-[#CCFF00] px-7 py-4 text-[13px] font-bold tracking-[0.08em] text-[#080808] uppercase sm:w-auto"
                style={{ boxShadow: "0 22px 46px -26px #CCFF00" }}
              >
                Start Training
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </motion.button>
            </Magnetic>
            <Magnetic strength={0.28}>
              <button
                data-cursor="hover"
                onClick={() => smoothScrollTo("#programs")}
                className="font-display flex w-full items-center justify-center gap-2.5 rounded-full border border-[#2C2C2C] bg-[#1E1E1E] px-7 py-4 text-[13px] font-bold tracking-[0.08em] text-white uppercase transition-colors duration-200 hover:border-[#3D3D3D] hover:bg-[#242424] sm:w-auto"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#CCFF00] text-[8px] text-[#080808]">
                  ▶
                </span>
                Explore Programs
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="flex -space-x-2.5">
              {[
                "https://images.pexels.com/photos/17232317/pexels-photo-17232317.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=120&h=120",
                "https://images.pexels.com/photos/30165254/pexels-photo-30165254.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=120&h=120",
                "https://images.pexels.com/photos/15549976/pexels-photo-15549976.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=120&h=120",
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="media-sharp h-9 w-9 rounded-full border-2 border-[#080808] object-cover"
                />
              ))}
            </div>
            <p className="text-[12.5px] leading-snug text-[#8A8A8A]">
              <span className="font-display font-bold text-white">12,400+</span>{" "}
              members training
              <br />
              across 3 flagship clubs
            </p>
          </motion.div>
        </div>

        {/* ---------- RIGHT: crystal-clear gym video ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[#222222] bg-[#0F0F0F] sm:aspect-[4/4.4] lg:aspect-[4/5]">
            <motion.div style={{ y: vy, scale: vs }} className="h-full w-full">
              <SharpVideo
                src={GYM_MAN.src}
                poster={GYM_MAN.poster}
                objectPosition="center 45%"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-black/10" />

            {/* solid live badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#080808] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
              <span className="font-display text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                Live · Strength Floor
              </span>
            </div>

            {/* solid metric card */}
            <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl border border-[#242424] bg-[#151515] px-4 py-3.5">
              <div>
                <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-[#8A8A8A] uppercase">
                  Session load
                </p>
                <p className="font-display mt-0.5 text-[22px] leading-none font-bold text-white">
                  184 <span className="text-[13px] text-[#CCFF00]">kg</span>
                </p>
              </div>
              <div className="flex h-9 items-end gap-[3px]">
                {[38, 62, 46, 80, 55, 94, 70].map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 4 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 1 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "w-[5px] rounded-full",
                      i % 2 ? "bg-[#CCFF00]" : "bg-[#3A3A3A]",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -top-3 -right-3 h-10 w-10 border-t border-r border-[#CCFF00]" />
          <div className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 border-b border-l border-[#CCFF00]" />
        </motion.div>
      </div>
    </section>
  );
}

/* ================================ STATS ================================ */

const STATS = [
  { value: 12400, suffix: "+", label: "Active members", sub: "Across 3 clubs" },
  { value: 48, suffix: "", label: "Elite coaches", sub: "Avg. 9 yrs on floor" },
  { value: 250, suffix: "+", label: "Weekly classes", sub: "Sprint · Lift · Fight" },
];

function Stats() {
  return (
    <section className="relative bg-[#080808] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {STATS.map((s, i) => (
          <RiseIn key={s.label} delay={i * 0.1}>
            <div
              data-cursor="hover"
              className="group relative h-full overflow-hidden rounded-[26px] border border-[#222222] bg-[#151515] p-6 transition-colors duration-300 hover:border-[#333333] sm:p-7"
            >
              <span className="font-display text-[11px] font-bold tracking-[0.24em] text-[#5E5E5E] uppercase">
                0{i + 1}
              </span>
              <p className="font-display mt-5 text-[52px] leading-none font-bold tracking-[-0.04em] text-white sm:text-[60px]">
                <Counter to={s.value} />
                <span className="text-[#CCFF00]">{s.suffix}</span>
              </p>
              <p className="font-display mt-4 text-[14px] font-semibold tracking-[0.04em] text-white">
                {s.label}
              </p>
              <p className="mt-1 text-[12.5px] text-[#8A8A8A]">{s.sub}</p>
              <span className="absolute right-6 bottom-6 h-8 w-8 rounded-full border border-[#2A2A2A] bg-[#1E1E1E] text-center text-[13px] leading-[30px] text-[#8A8A8A] transition-colors duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#080808]">
                ↗
              </span>
            </div>
          </RiseIn>
        ))}
      </div>
    </section>
  );
}

/* ============================== PROGRAMS =============================== */

type Program = {
  id: string;
  title: string;
  desc: string;
  meta: string;
  clip: Clip;
  span: string;
  ratio: string;
  pos?: string;
};

const PROGRAMS: Program[] = [
  {
    id: "gym",
    title: "GYM",
    desc: "Barbell strength, hypertrophy blocks and progressive overload on a floor built for heavy days.",
    meta: "Deadlift · Squat · Press",
    clip: GYM_DEADLIFT,
    span: "lg:col-span-4",
    ratio: "aspect-[16/10]",
    pos: "center 55%",
  },
  {
    id: "sports",
    title: "SPORTS",
    desc: "Treadmill sprint labs and conditioning intervals with live pace tracking.",
    meta: "Sprint · VO₂ · Intervals",
    clip: RUN_TREADMILL,
    span: "lg:col-span-2",
    ratio: "aspect-[4/5]",
    pos: "center 35%",
  },
  {
    id: "yoga",
    title: "YOGA",
    desc: "Mobility, breathwork and deep stretch flows to keep the engine running clean.",
    meta: "Flow · Mobility · Breath",
    clip: YOGA_STRETCH,
    span: "lg:col-span-2",
    ratio: "aspect-[4/5]",
    pos: "center 40%",
  },
  {
    id: "fight",
    title: "FIGHT CLUB",
    desc: "Boxing fundamentals, bag rounds and pad work coached by former pros.",
    meta: "Boxing · Pads · Rounds",
    clip: FIGHT_BOXING,
    span: "lg:col-span-4",
    ratio: "aspect-[16/10]",
    pos: "center 45%",
  },
];

function Programs() {
  return (
    <section
      id="programs"
      className="relative border-t border-[#161616] bg-[#080808] px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we train</Eyebrow>
            <ClipReveal className="mt-5">
              <h2 className="font-display text-[12vw] leading-[0.88] font-bold tracking-[-0.04em] text-white sm:text-[62px] lg:text-[78px]">
                FOUR WAYS
                <br />
                TO GET <span className="text-[#CCFF00]">STRONG</span>
              </h2>
            </ClipReveal>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#8A8A8A] md:pb-3">
            Pick a discipline or stack them all. Every program is periodised,
            measured and coached in person.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          {PROGRAMS.map((p, i) => (
            <RiseIn key={p.id} delay={i * 0.07} className={p.span}>
              <article
                data-cursor="hover"
                className="group relative h-full overflow-hidden rounded-[26px] border border-[#222222] bg-[#151515] transition-colors duration-300 hover:border-[#3A3A3A]"
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-[#0F0F0F]",
                    p.ratio,
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
                    <SharpVideo
                      src={p.clip.src}
                      poster={p.clip.poster}
                      objectPosition={p.pos}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-black/10" />
                  <span className="font-display absolute top-3.5 left-3.5 rounded-full bg-[#080808] px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#CCFF00] uppercase">
                    0{i + 1}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 border-t border-[#222222] p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-[26px] leading-none font-bold tracking-[-0.02em] text-white sm:text-[30px]">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-[#8A8A8A]">
                      {p.desc}
                    </p>
                    <p className="font-display mt-4 text-[10px] font-semibold tracking-[0.18em] text-[#CCFF00] uppercase">
                      {p.meta}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1E1E1E] text-white transition-colors duration-300 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-[#080808]">
                    ↗
                  </span>
                </div>
              </article>
            </RiseIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== SHOWCASE =============================== */

function Showcase({
  clip,
  eyebrow,
  title,
  accent,
  copy,
  points,
  flip = false,
  pos = "center",
}: {
  clip: Clip;
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  points: { k: string; v: string }[];
  flip?: boolean;
  pos?: string;
}) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden border-t border-[#161616] bg-[#080808] lg:min-h-screen">
      <div className="absolute inset-0">
        <SharpVideo src={clip.src} poster={clip.poster} objectPosition={pos} />
      </div>
      {/* 15% max — clip stays fully visible and pin-sharp */}
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      <div className="relative flex min-h-[92vh] items-end px-4 py-14 sm:px-6 lg:min-h-screen lg:items-center lg:py-20">
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl",
            flip ? "justify-end" : "justify-start",
          )}
        >
          <RiseIn className="w-full max-w-xl">
            <div className="rounded-[28px] border border-[#242424] bg-[#151515] p-6 sm:p-8">
              <Eyebrow>{eyebrow}</Eyebrow>
              <ClipReveal className="mt-5">
                <h2 className="font-display text-[13vw] leading-[0.86] font-bold tracking-[-0.045em] text-white sm:text-[64px] lg:text-[76px]">
                  {title}
                  <br />
                  <span className="text-[#CCFF00]">{accent}</span>
                </h2>
              </ClipReveal>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[#9A9A9A]">
                {copy}
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {points.map((p) => (
                  <div
                    key={p.k}
                    className="rounded-2xl border border-[#262626] bg-[#1E1E1E] px-3 py-3.5"
                  >
                    <p className="font-display text-[22px] leading-none font-bold text-white">
                      {p.v}
                    </p>
                    <p className="font-display mt-2 text-[9.5px] font-semibold tracking-[0.16em] text-[#8A8A8A] uppercase">
                      {p.k}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RiseIn>
        </div>
      </div>
    </section>
  );
}

/* ============================ TESTIMONIAL BAND ========================== */

function Quote() {
  return (
    <section className="border-t border-[#161616] bg-[#080808] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <RiseIn>
          <p className="font-display text-[26px] leading-[1.25] font-medium tracking-[-0.02em] text-white sm:text-[38px] lg:text-[44px]">
            “I came for the equipment. I stayed because{" "}
            <span className="text-[#CCFF00]">
              every single coach knows my numbers
            </span>{" "}
            and pushes me past them.”
          </p>
        </RiseIn>
        <RiseIn delay={0.12}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <img
              src="https://images.pexels.com/photos/15549976/pexels-photo-15549976.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=120&h=120"
              alt="Member portrait"
              loading="lazy"
              className="media-sharp h-11 w-11 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-display text-[14px] font-bold text-white">
                Amara Lewis
              </p>
              <p className="text-[12.5px] text-[#8A8A8A]">
                Elite member · 3 years
              </p>
            </div>
          </div>
        </RiseIn>
      </div>
    </section>
  );
}

/* ================================= PAGE ================================= */

export function Home({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="bg-[#080808]">
      <Navbar onLogin={onLogin} />
      <Hero onLogin={onLogin} />

      <div className="border-y border-[#161616] bg-[#CCFF00] py-3">
        <Marquee
          items={[
            "STRENGTH",
            "ENDURANCE",
            "DISCIPLINE",
            "RECOVERY",
            "PULSE FITNESS™",
          ]}
          itemClassName="text-[#080808] text-[13px]"
        />
      </div>

      <Stats />
      <Programs />

      <Showcase
        clip={RUN_TREADMILL_2}
        eyebrow="Sports · Level 02"
        title="RUN"
        accent="FASTER"
        copy="Climate-controlled sprint decks with curved treadmills, live split timing and coach-led interval blocks. Everything measured, nothing guessed."
        points={[
          { k: "Treadmills", v: "36" },
          { k: "Split timing", v: "Live" },
          { k: "Classes / wk", v: "70+" },
        ]}
        pos="center 40%"
      />

      <Showcase
        clip={GYM_DEADLIFT}
        eyebrow="Gym · Level 01"
        title="LIFT"
        accent="HEAVIER"
        copy="Calibrated plates, 18 lifting platforms and a coaching team that programs your blocks. Open 24/7 for members who train on their own clock."
        points={[
          { k: "Platforms", v: "18" },
          { k: "Access", v: "24/7" },
          { k: "Sq ft floor", v: "22K" },
        ]}
        flip
        pos="center 55%"
      />

      <Quote />
      <Trainers />
      <Pricing onLogin={onLogin} />
      <Cta onLogin={onLogin} />
      <Footer />
    </div>
  );
}
