import { motion } from "framer-motion";
import { about } from "../data";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="01" title={about.heading} />
      <div className="mt-8 max-w-2xl space-y-4">
        {about.body.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {p}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
