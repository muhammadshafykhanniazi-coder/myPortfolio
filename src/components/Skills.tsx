import { motion } from "framer-motion";
import { skills } from "../data";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading eyebrow="02" title="Skills" />
      <div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-baseline justify-between text-sm">
              <span className="font-medium text-ink">{skill.name}</span>
              <span className="text-ink-soft">{skill.level}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
