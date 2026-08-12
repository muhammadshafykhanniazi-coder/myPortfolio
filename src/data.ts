export const profile = {
  name: "Muhammad Shafy Khan",
  role: "Cybersecurity Professional",
  tagline: "Securing systems, building clean software, and teaching what I learn along the way.",
  location: "Islamabad / Rawalpindi, Pakistan",
  email: "shafy@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

export const about = {
  heading: "About",
  body: [
    "I'm a Computer Science student at COMSATS University Islamabad, focused on cybersecurity and secure system design.",
    "Alongside my coursework, I run Sir Shafy's Academy, where I build learning material and tutor students, and I take on freelance work building e-commerce storefronts and client proposals.",
  ],
};

export const skills: { name: string; level: number }[] = [
  { name: "Network & Web Security", level: 85 },
  { name: "Python", level: 80 },
  { name: "React / TypeScript", level: 78 },
  { name: "Databases (SQL & NoSQL)", level: 75 },
  { name: "Linux & Systems", level: 80 },
  { name: "Cryptography Fundamentals", level: 72 },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Grace Jewels — E-Commerce Storefront",
    description: "A Shopify-based jewelry storefront built end-to-end for a client, from product structure to checkout flow.",
    tags: ["Shopify", "E-Commerce", "Client Work"],
  },
  {
    title: "Sir Shafy's Academy",
    description: "Educational materials, structured tests, and enrollment documents for an ongoing tutoring operation.",
    tags: ["Education", "Content Design"],
  },
  {
    title: "Security Coursework Projects",
    description: "Applied cryptography and information security exercises from university coursework, focused on real attack/defense scenarios.",
    tags: ["Cybersecurity", "CSC432"],
  },
];

export type SeedCertificate = {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
};

// Seed list shown before any certificates are uploaded via the admin panel.
// Each entry needs a matching PDF added through the admin panel to be viewable.
export const seedCertificates: SeedCertificate[] = [];
