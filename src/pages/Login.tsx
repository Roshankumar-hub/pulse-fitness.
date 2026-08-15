import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Logo, Magnetic, Marquee, SharpVideo } from "../components/primitives";
import { RUN_TREADMILL } from "../lib/media";
import { cn } from "../utils/cn";

/* ---------------- floating-label input (solid, zero blur) ---------------- */

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  trailing?: ReactNode;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className="relative rounded-2xl border bg-[#1E1E1E] transition-colors duration-200"
        style={{ borderColor: focused ? "#CCFF00" : "#2C2C2C" }}
      >
        <motion.label
          htmlFor={id}
          initial={false}
          animate={{
            y: lifted ? -10 : 0,
            scale: lifted ? 0.78 : 1,
            color: focused ? "#CCFF00" : lifted ? "#9A9A9A" : "#7A7A7A",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
          className="font-display pointer-events-none absolute top-1/2 left-4 origin-left -translate-y-1/2 text-[13px] font-medium tracking-[0.04em]"
        >
          {label}
        </motion.label>
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 pt-6 pb-2.5 pr-11 text-[15px] font-medium text-white outline-none"
        />
        {trailing && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- social buttons ---------------- */

function SocialButton({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      data-cursor="hover"
      className="font-display flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-[#2C2C2C] bg-[#1E1E1E] px-4 py-3.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:border-[#3D3D3D] hover:bg-[#242424] active:scale-[0.98]"
    >
      {icon}
      {children}
    </button>
  );
}

const GoogleIcon = (
  <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.94 0 3.25.83 4 1.55l2.72-2.62C17.02 3.1 14.72 2.1 12 2.1a9.9 9.9 0 1 0 0 19.8c5.72 0 9.5-4.02 9.5-9.68 0-.65-.07-1.15-.16-1.65z"
    />
    <path
      fill="#34A853"
      d="M3.13 7.35 6.34 9.7A5.9 5.9 0 0 1 12 5.8c1.94 0 3.25.83 4 1.55l2.72-2.62C17.02 3.1 14.72 2.1 12 2.1A9.88 9.88 0 0 0 3.13 7.35z"
      opacity="0"
    />
  </svg>
);

const AppleIcon = (
  <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-white">
    <path d="M16.36 12.8c.02 2.5 2.19 3.33 2.22 3.35-.02.06-.35 1.2-1.14 2.37-.69 1.02-1.4 2.03-2.53 2.05-1.1.02-1.46-.65-2.72-.65-1.27 0-1.66.63-2.7.67-1.09.04-1.92-1.1-2.61-2.11-1.42-2.06-2.5-5.82-1.05-8.36a4.05 4.05 0 0 1 3.42-2.08c1.07-.02 2.07.72 2.72.72.65 0 1.87-.89 3.15-.76.54.02 2.05.22 3.02 1.63-.08.05-1.8 1.05-1.78 3.17zM14.6 4.6c.58-.7.97-1.67.86-2.64-.83.04-1.84.56-2.44 1.25-.53.62-1 1.6-.87 2.55.93.07 1.87-.47 2.45-1.16z" />
  </svg>
);

/* ---------------- page ---------------- */

const WORDS = ["MOVE", "WITH", "PURPOSE"];

export function Login({ onHome }: { onHome: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#080808] lg:flex lg:h-screen lg:overflow-hidden">
      {/* ============================ LEFT — VIDEO ============================ */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[46vh] w-full overflow-hidden bg-[#080808] sm:h-[52vh] lg:h-full lg:w-1/2"
      >
        <SharpVideo
          src={RUN_TREADMILL.src}
          poster={RUN_TREADMILL.poster}
          objectPosition="center 40%"
        />
        {/* max 15% black — video stays fully visible & sharp */}
        <div className="pointer-events-none absolute inset-0 bg-black/15" />

        {/* top-left logo */}
        <div className="absolute top-5 left-5 sm:top-7 sm:left-8">
          <Logo compact onClick={onHome} />
        </div>

        {/* frame corners */}
        <div className="pointer-events-none absolute top-5 right-5 h-8 w-8 border-t border-r border-white/60 sm:top-7 sm:right-8" />
        <div className="pointer-events-none absolute bottom-20 left-5 hidden h-8 w-8 border-b border-l border-white/60 sm:left-8 lg:block" />

        {/* kinetic text */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 pb-12 sm:px-8 lg:px-12 lg:pb-0">
          <div className="mb-4 overflow-hidden">
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display inline-block rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold tracking-[0.24em] text-[#080808] uppercase"
            >
              Members Only
            </motion.span>
          </div>
          {WORDS.map((w, i) => (
            <div key={w} className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.55 + i * 0.12,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "font-display text-[12.5vw] leading-[0.88] font-bold tracking-[-0.04em] sm:text-[9vw] lg:text-[7vw]",
                  i === 2 ? "text-[#CCFF00]" : "text-white",
                )}
              >
                {w}
              </motion.h2>
            </div>
          ))}
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-5 hidden max-w-sm text-[13px] leading-relaxed font-medium text-white sm:block sm:text-sm"
          >
            Sprint decks, strength floors and recovery suites — engineered for
            people who show up.
          </motion.p>
        </div>

        {/* bottom ticker */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 bottom-0 left-0 border-t border-[#1F1F1F] bg-[#080808] py-3"
        >
          <Marquee
            items={["STRENGTH", "ENDURANCE", "DISCIPLINE", "RECOVERY"]}
            itemClassName="text-[11px] text-white/90"
          />
        </motion.div>
      </motion.div>

      {/* ============================ RIGHT — FORM ============================ */}
      <div className="relative flex w-full items-center justify-center bg-[#0F0F0F] px-4 py-14 sm:px-8 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:py-10">
        {/* solid grid lines (no blur, no glass) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
          className="relative w-full max-w-[430px] rounded-[28px] border border-[#262626] bg-[#151515] p-6 sm:p-8"
          style={{ boxShadow: "0 40px 80px -40px #000000, 0 0 0 1px #1A1A1A" }}
        >
          <button
            onClick={onHome}
            data-cursor="hover"
            className="font-display mb-7 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#8A8A8A] uppercase transition-colors hover:text-[#CCFF00]"
          >
            <span aria-hidden="true">←</span> Back to site
          </button>

          <h1 className="font-display text-[34px] leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-[40px]">
            Welcome Back
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-[#8A8A8A]">
            Log in to book classes, track sessions and manage your PULSE
            FITNESS™ membership.
          </p>

          <form
            className="mt-7 space-y-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              window.setTimeout(() => setSubmitted(false), 2200);
            }}
          >
            <Field
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
            />
            <Field
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between pt-1">
              <label
                data-cursor="hover"
                className="flex cursor-pointer items-center gap-2.5 text-[12.5px] font-medium text-[#8A8A8A] select-none"
              >
                <input type="checkbox" className="peer sr-only" />
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[6px] border border-[#3A3A3A] bg-[#1E1E1E] transition-colors peer-checked:border-[#CCFF00] peer-checked:bg-[#CCFF00] [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3 w-3 stroke-[#080808] transition-opacity"
                    fill="none"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8.5 6.5 12 13 4.5" />
                  </svg>
                </span>
                Keep me signed in
              </label>
              <button
                type="button"
                data-cursor="hover"
                className="text-[12.5px] font-semibold text-[#CCFF00] transition-opacity hover:opacity-70"
              >
                Forgot?
              </button>
            </div>

            <Magnetic strength={0.2} className="!block w-full pt-2">
              <motion.button
                type="submit"
                data-cursor="hover"
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 480, damping: 26 }}
                className="group font-display flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#CCFF00] px-6 py-4 text-[14px] font-bold tracking-[0.06em] text-[#080808] uppercase"
                style={{ boxShadow: "0 18px 40px -22px #CCFF00" }}
              >
                {submitted ? "Welcome, Athlete" : "Enter The Club"}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </motion.button>
            </Magnetic>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#262626]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.24em] text-[#5E5E5E] uppercase">
              or continue with
            </span>
            <span className="h-px flex-1 bg-[#262626]" />
          </div>

          <div className="flex gap-3">
            <SocialButton icon={GoogleIcon}>Google</SocialButton>
            <SocialButton icon={AppleIcon}>Apple</SocialButton>
          </div>

          <p className="mt-7 text-center text-[13px] text-[#8A8A8A]">
            New to the club?{" "}
            <button
              data-cursor="hover"
              className="font-semibold text-white underline decoration-[#CCFF00] decoration-2 underline-offset-4 transition-colors hover:text-[#CCFF00]"
            >
              Request membership
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
