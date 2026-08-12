// Certificates are stored in the browser's localStorage as base64 PDFs.
// This is a static, no-backend site: "uploading" a cert saves it to the
// admin's own browser storage, so it only appears on the device/browser
// where it was uploaded. See README for notes on moving to a real backend.

export type Certificate = {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
  fileName: string;
  dataUrl: string; // base64 PDF, e.g. "data:application/pdf;base64,...."
  addedAt: number;
};

const STORAGE_KEY = "portfolio_certificates_v1";

function read(): Certificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(certs: Certificate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
}

export function listCertificates(): Certificate[] {
  return read().sort((a, b) => b.addedAt - a.addedAt);
}

export function addCertificate(input: {
  name: string;
  issuer?: string;
  date?: string;
  fileName: string;
  dataUrl: string;
}): Certificate {
  const cert: Certificate = {
    id: crypto.randomUUID(),
    addedAt: Date.now(),
    ...input,
  };
  const certs = read();
  certs.push(cert);
  write(certs);
  return cert;
}

export function removeCertificate(id: string) {
  write(read().filter((c) => c.id !== id));
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

// ~4.5MB is a safe practical ceiling per file for localStorage-based storage.
export const MAX_PDF_BYTES = 4.5 * 1024 * 1024;
