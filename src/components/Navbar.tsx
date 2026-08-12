import { useState } from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollTo } from "../hooks/useScrollTo";

const LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  skills: "Skills",
  certifications: "Certifications",
  projects: "Projects",
  contact: "Contact",
};

export default function Navbar({ sectionIds }: { sectionIds: string[] }) {
  const active = useActiveSection(sectionIds);
  const scrollTo = useScrollTo();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <button
          onClick={() => scrollTo("home")}
          className="text-sm font-semibold tracking-wide text-ink"
        >
          Shafy Khan<span className="text-accent">.</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {sectionIds.map((id) => (
            <li key={id} className="relative">
              <button
                onClick={() => scrollTo(id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === id ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {LABELS[id] ?? id}
              </button>
              {active === id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-white/5 ring-1 ring-stroke"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          className="rounded-full border border-stroke p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="mt-1 block h-0.5 w-5 bg-ink" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-stroke px-6 py-3 md:hidden">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setOpen(false);
              }}
              className="block w-full py-2 text-left text-sm text-ink-muted hover:text-ink"
            >
              {LABELS[id] ?? id}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
