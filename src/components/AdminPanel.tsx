import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data";
import { isAdminSession, setAdminSession, verifyPassword } from "../lib/auth";
import {
  addCertificate,
  fileToDataUrl,
  listCertificates,
  removeCertificate,
  MAX_PDF_BYTES,
  type Certificate,
} from "../lib/certStore";

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 animate-bg-shift bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,92,255,0.10),transparent_70%)]"
      />
      <header className="border-b border-stroke bg-bg/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a href="#/" className="text-sm font-semibold tracking-wide text-ink">
            Shafy Khan<span className="text-accent">.</span>{" "}
            <span className="text-ink-soft">Admin</span>
          </a>
          <a href="#/" className="text-xs text-ink-soft hover:text-ink">
            ← Back to site
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-14">{children}</main>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");
    const ok = await verifyPassword(password);
    setChecking(false);
    if (ok) {
      setAdminSession(true);
      onSuccess();
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card mx-auto max-w-sm p-8"
    >
      <p className="eyebrow">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold text-ink">Sign in</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Enter the admin password to manage certificates.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="field"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={checking} className="btn-primary w-full">
          {checking ? "Checking…" : "Sign in"}
        </button>
      </form>
    </motion.div>
  );
}

function CertRow({ cert, onDelete }: { cert: Certificate; onDelete: (id: string) => void }) {
  return (
    <div className="card flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">{cert.name}</p>
        <p className="truncate text-xs text-ink-soft">
          {cert.issuer ? `${cert.issuer} · ` : ""}
          {cert.fileName}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <a
          href={cert.dataUrl}
          download={cert.fileName}
          className="btn px-3 py-1.5 text-xs"
        >
          Download
        </a>
        <button
          onClick={() => onDelete(cert.id)}
          className="rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/10"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCerts(listCertificates());
  }, []);

  function refresh() {
    setCerts(listCertificates());
  }

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!name.trim()) return setError("Certificate name is required.");
    if (!file) return setError("Choose a PDF file to upload.");
    if (file.type !== "application/pdf") return setError("Only PDF files are supported.");
    if (file.size > MAX_PDF_BYTES) {
      return setError("File is too large (max ~4.5MB per certificate).");
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      addCertificate({
        name: name.trim(),
        issuer: issuer.trim() || undefined,
        date: date.trim() || undefined,
        fileName: file.name,
        dataUrl,
      });
      setName("");
      setIssuer("");
      setDate("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      refresh();
      setStatus("Certificate added.");
    } catch {
      setError("Something went wrong reading that file. Try again.");
    }
  }

  function onDelete(id: string) {
    removeCertificate(id);
    refresh();
  }

  function onLogout() {
    setAdminSession(false);
    window.location.hash = "#/";
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Manage Certificates</h1>
        </div>
        <button onClick={onLogout} className="btn text-xs">
          Log out
        </button>
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-ink">Add a certificate</h2>
        <form onSubmit={onAdd} className="mt-4 grid gap-4 sm:grid-cols-2">
          <input
            className="field sm:col-span-2"
            placeholder="Certificate name (e.g. CompTIA Security+)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="field"
            placeholder="Issuer (optional)"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
          />
          <input
            className="field"
            placeholder="Date (optional, e.g. 2026)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="field sm:col-span-2 file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
          />
          {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}
          {status && <p className="text-sm text-accent-mint sm:col-span-2">{status}</p>}
          <button type="submit" className="btn-primary sm:col-span-2">
            Upload Certificate
          </button>
        </form>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-ink">
          Published certificates ({certs.length})
        </h2>
        {certs.length === 0 ? (
          <p className="text-sm text-ink-soft">Nothing uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {certs.map((c) => (
              <CertRow key={c.id} cert={c} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(isAdminSession());

  return (
    <AdminShell>
      {authed ? <Dashboard /> : <LoginForm onSuccess={() => setAuthed(true)} />}
      {!authed && (
        <p className="mt-6 text-center text-xs text-ink-soft">
          {profile.name} · private area
        </p>
      )}
    </AdminShell>
  );
}
