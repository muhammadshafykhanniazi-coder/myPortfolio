import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import CertCard from "./CertCard";
import { listCertificates, type Certificate } from "../lib/certStore";

export default function Certifications() {
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    setCerts(listCertificates());
    // Pick up changes made in the admin panel in another tab.
    const onStorage = () => setCerts(listCertificates());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section id="certifications" className="section">
      <SectionHeading
        eyebrow="03"
        title="Certifications"
        description="Click a card to flip it over and view the certificate."
      />

      {certs.length === 0 ? (
        <p className="mt-8 text-sm text-ink-soft">
          No certificates published yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      )}
    </section>
  );
}
