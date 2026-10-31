import { portfolioData } from "../data/portfolioData";

export const dev = (slug) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${slug}/${slug}-original.svg`;

// Devicon slugs for skills that have a logo; the rest render as text pills.
export const logos = {
  Java: { slug: "java" }, JavaScript: { slug: "javascript" }, HTML: { slug: "html5" }, CSS: { slug: "css3" },
  "React.js": { slug: "react" }, "Node.js": { slug: "nodejs" }, "Express.js": { slug: "express", mono: true },
  "Spring Boot": { slug: "spring" }, MongoDB: { slug: "mongodb" }, SQL: { slug: "mysql" },
  Git: { slug: "git" }, GitHub: { slug: "github", mono: true }, Postman: { slug: "postman" }, Flutter: { slug: "flutter" },
};

export const all = portfolioData.skills.flatMap((c) => c.items);
const half = Math.ceil(all.length / 2);
export const rows = [all.slice(0, half), all.slice(half)];

