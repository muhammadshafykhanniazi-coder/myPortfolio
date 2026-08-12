import { motion } from "framer-motion";
import { profile } from "../data";
import { useScrollTo } from "../hooks/useScrollTo";

export default function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section id="home" className="section flex min-h-[90vh] flex-col justify-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="eyebrow mb-5"
      >
        {profile.location}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mt-3 text-xl font-medium text-accent-cyan sm:text-2xl"
      >
        {profile.role}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mt-6 max-w-xl text-base text-ink-muted sm:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.24 }}
        className="mt-9 flex flex-wrap gap-3"
      >
        <button onClick={() => scrollTo("certifications")} className="btn-primary">
          View Certifications
        </button>
        <button onClick={() => scrollTo("contact")} className="btn">
          Get in Touch
        </button>
      </motion.div>
    </section>
  );
}
