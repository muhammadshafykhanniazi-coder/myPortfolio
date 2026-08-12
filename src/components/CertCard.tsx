import { useState } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "../lib/certStore";

export default function CertCard({ cert }: { cert: Certificate }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="[perspective:1500px]">
      <motion.div
        className="relative h-72 w-full cursor-pointer [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={`View certificate: ${cert.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
        }}
      >
        {/* Front */}
        <div className="card absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 21 12 17.6 5.8 21 7 14.14 2 9.27l7.1-1.01L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">{cert.name}</h3>
            {cert.issuer && <p className="mt-1 text-sm text-ink-muted">{cert.issuer}</p>}
            {cert.date && <p className="mt-1 text-xs text-ink-soft">{cert.date}</p>}
          </div>
          <p className="text-xs font-medium text-accent-cyan">Click to view →</p>
        </div>

        {/* Back */}
        <div className="card absolute inset-0 overflow-hidden p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-hidden rounded-lg bg-white">
              <embed
                src={cert.dataUrl}
                type="application/pdf"
                className="h-full w-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <a
                href={cert.dataUrl}
                download={cert.fileName}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-accent-cyan hover:underline"
              >
                Download PDF
              </a>
              <span className="text-xs text-ink-soft">Click card to flip back</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
