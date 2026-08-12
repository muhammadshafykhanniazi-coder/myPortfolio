// Lightweight client-side admin gate.
//
// IMPORTANT: this is a static site with no server, so there is no truly
// secure way to gate an "admin panel" purely in the browser — anyone who
// reads the bundled JS can find the hash below. This is fine for keeping
// a casual visitor out, but do NOT rely on it to protect anything
// sensitive. If that ever matters, move the admin panel behind a real
// backend/auth provider.
//
// To change the password:
//   1. In a browser console, run:
//        crypto.subtle.digest("SHA-256", new TextEncoder().encode("your-new-password"))
//          .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,"0")).join("")))
//   2. Paste the printed hex string in as ADMIN_PASSWORD_HASH below.
//
// Default password is: shafyadmin123

export const ADMIN_PASSWORD_HASH =
  "a01f769ff14a6de238320d23c2bffd52acec69d63de6d25e3c082be4d3d94b82".toLowerCase();

const SESSION_KEY = "portfolio_admin_session";

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = await sha256Hex(password);
  return hash === ADMIN_PASSWORD_HASH;
}

export function isAdminSession(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function setAdminSession(active: boolean) {
  if (active) sessionStorage.setItem(SESSION_KEY, "1");
  else sessionStorage.removeItem(SESSION_KEY);
}
