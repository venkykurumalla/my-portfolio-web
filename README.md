# Venkatesh Kurumalla — Portfolio

React 19 + Vite 8 + Tailwind 4, with an iOS "Liquid Glass" design language.
Motion: Lenis (smooth scroll) + GSAP/ScrollTrigger/SplitText + Framer Motion (nav micro-interactions).

```bash
npm install
npm run dev       # local dev
npm run build     # production build -> dist/
npm run preview   # serve the production build
```

- Design tokens live in `src/design/tokens.js` (colors, radii, blur, shadows, light/dark themes).
- Reusable pieces: `GlassCard`, `MagneticButton`, `RevealText`, `Section` in `src/components/`.
- Content lives in `src/data/portfolioData.js`.
- Add your portrait as `public/VenkateshKurumalla.jpg` (a "VK" monogram shows until it exists).
- Resume: `public/resume.pdf`.
- Deploy: Netlify (`netlify.toml` sets build command, `dist` publish dir and the SPA redirect). The contact form uses Netlify Forms.
