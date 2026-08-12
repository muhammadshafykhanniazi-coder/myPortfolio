import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-stroke">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-ink-soft sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <a href="#/admin" className="text-ink-soft/60 transition-colors hover:text-ink-soft">
          Admin
        </a>
      </div>
    </footer>
  );
}
