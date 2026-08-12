import { motion } from "framer-motion";
import { profile } from "../data";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <SectionHeading eyebrow="05" title="Contact" description="Open to internships, freelance work, and collaboration." />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <a href={`mailto:${profile.email}`} className="btn-primary">
          Email Me
        </a>
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="btn">
            {s.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
