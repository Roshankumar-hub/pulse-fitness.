import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { scrollTop, smoothScrollTo } from "../lib/lenis";
import { Logo, Magnetic } from "./primitives";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar({ onLogin }: { onLogin: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href === "#top") {
      scrollTop();
      return;
    }
    smoothScrollTo(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 right-0 left-0 z-50 flex justify-center px-3 sm:top-5 sm:px-6"
      >
        <nav
          className="flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-[#222222] bg-[#111111] py-2 pr-2 pl-4 sm:pl-5"
          style={{
            boxShadow: scrolled
              ? "0 18px 40px -20px #000000, 0 0 0 1px #1a1a1a"
              : "0 10px 30px -22px #000000",
          }}
        >
          <Logo compact onClick={() => go("#top")} />

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.label}
                data-cursor="hover"
                onClick={() => go(l.href)}
                className="font-display rounded-full px-3.5 py-2 text-[13px] font-medium text-[#A8A8A8] transition-colors duration-200 hover:bg-[#1B1B1B] hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              data-cursor="hover"
              onClick={onLogin}
              className="font-display hidden rounded-full border border-[#2A2A2A] bg-[#181818] px-4 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-white uppercase transition-colors duration-200 hover:border-[#3A3A3A] hover:bg-[#1F1F1F] sm:block"
            >
              Log In
            </button>
            <Magnetic strength={0.25}>
              <button
                data-cursor="hover"
                onClick={onLogin}
                className="font-display rounded-full bg-[#CCFF00] px-4 py-2.5 text-[12px] font-bold tracking-[0.08em] text-[#080808] uppercase transition-transform duration-150 active:scale-[0.97] sm:px-5"
              >
                Join Now
              </button>
            </Magnetic>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#181818] md:hidden"
            >
              <div className="flex flex-col gap-[3px]">
                <span
                  className="block h-[1.5px] w-4 bg-white transition-transform duration-200"
                  style={
                    open
                      ? { transform: "translateY(4.5px) rotate(45deg)" }
                      : undefined
                  }
                />
                <span
                  className="block h-[1.5px] w-4 bg-white transition-opacity duration-200"
                  style={open ? { opacity: 0 } : undefined}
                />
                <span
                  className="block h-[1.5px] w-4 bg-white transition-transform duration-200"
                  style={
                    open
                      ? { transform: "translateY(-4.5px) rotate(-45deg)" }
                      : undefined
                  }
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[70px] right-3 left-3 z-50 overflow-hidden rounded-3xl border border-[#222222] bg-[#111111] p-3 md:hidden"
          >
            {LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.href)}
                className="font-display block w-full rounded-2xl px-4 py-3 text-left text-base font-medium text-white transition-colors hover:bg-[#1B1B1B]"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onLogin();
              }}
              className="font-display mt-1 block w-full rounded-2xl bg-[#CCFF00] px-4 py-3 text-center text-sm font-bold tracking-[0.08em] text-[#080808] uppercase"
            >
              Enter The Club
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
