import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cursor, Grain, Logo } from "./components/primitives";
import { useLenis } from "./lib/lenis";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

type Route = "home" | "login";

function readRoute(): Route {
  const h = window.location.hash.replace("#", "").toLowerCase();
  if (h.includes("login")) return "login";
  if (window.location.pathname.toLowerCase().endsWith("/login")) return "login";
  return "home";
}

/* ------------------------- solid preloader (no blur) ------------------------ */

function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#080808]"
        >
          <Logo />
          <div className="mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-[#1E1E1E]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-[#CCFF00]"
            />
          </div>
          <p className="font-display mt-4 text-[10px] font-semibold tracking-[0.32em] text-[#5E5E5E] uppercase">
            Loading the club
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? "home" : readRoute(),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1250);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (next: Route) => {
    window.location.hash = next === "login" ? "#/login" : "#/";
    setRoute(next);
    window.scrollTo({ top: 0 });
  };

  useLenis(route === "home");

  useEffect(() => {
    document.title =
      route === "login"
        ? "Log In · PULSE FITNESS™"
        : "PULSE FITNESS™ — Fit Body. Fit Mind.";
  }, [route]);

  return (
    <div className="min-h-screen bg-[#080808]">
      <Preloader done={ready} />
      <Grain />
      <Cursor />

      <AnimatePresence mode="wait">
        {route === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Login onHome={() => navigate("home")} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Home onLogin={() => navigate("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
