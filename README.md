# Premium Portfolio (React + TypeScript + Tailwind + Framer Motion)

Minimal, sleek, premium single-page portfolio with:
- Sticky animated navbar + active section highlight
- Smooth scrolling between sections (TypeScript)
- Scroll-triggered entrance animations (Framer Motion)
- Skills progress indicators animate on view
- Project cards with glow + 3D hover tilt
- Certifications panel — cards flip on click to reveal the certificate PDF
- Password-protected admin panel to upload/remove certificates
- Dark mode-first palette + subtle animated gradient background

## Run locally

```bash
npm install
npm run dev
```

Build + preview:

```bash
npm run build
npm run preview
```

## Certifications & Admin Panel

- The public site reads certificates from the visitor's browser storage — nothing shows until you upload some via the admin panel, in the same browser you're viewing the site in.
- Open the admin panel at `/#/admin` (there's also a small "Admin" link in the footer).
- Default password: `shafyadmin123`. **Change this before you publish the site** — see the instructions at the top of `src/lib/auth.ts`.
- Uploading a certificate reads the PDF as base64 and stores it in `localStorage`, so certificates persist across visits **on that browser only** (max ~4.5MB per PDF). This is a no-backend, static-site approach — good for a personal portfolio, but:
  - It won't show your certs to other visitors on other devices/browsers.
  - Clearing browser data removes them.
  - It is not a secure vault — treat the admin password as a light gate, not real security.
  - If you outgrow this, swap `src/lib/certStore.ts` for calls to a real backend (e.g. a small API + S3/Supabase storage) and gate the admin route with real auth.

## Customize content

Edit:
- `src/data.ts` — name, role, tagline, about, skills, projects
- `src/lib/auth.ts` — admin password hash

## Structure

- `index.html` – Vite entry
- `src/main.tsx` – React bootstrap
- `src/App.tsx` – Section layout + hash-based route to the admin panel
- `src/components/*` – Reusable UI pieces (Navbar, Hero, About, Skills, Certifications, CertCard, Projects, Contact, Footer, AdminPanel)
- `src/hooks/*` – TypeScript scroll + active section logic
- `src/lib/*` – Certificate storage (`certStore.ts`) and admin auth (`auth.ts`)
- `src/index.css` – Tailwind + premium global styles
