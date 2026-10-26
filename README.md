# Iron Pulse Fitness

React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion, Lenis, React Router, React Hook Form + Zod, React Three Fiber + Drei (hero only), Lucide.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
npm run typecheck
```

## Before launch
1. Edit `src/data.ts`: real phone, WhatsApp number (country code, no +), email, Instagram, address, plans and FAQs.
2. Replace `ironpulsefitness.in` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
3. The transformation slider uses gradient panels. Swap in real before/after photos (with member consent) in `src/pages/Home.tsx`.
4. Forms open WhatsApp with the filled-in message. Connect a backend or form service if you want server-side lead capture.
5. Serve with SPA fallback (all routes to `index.html`) on your host.

## Structure
```
src/App.tsx              loader, nav, footer, router, Lenis, cursor
src/data.ts              all content and contact details
src/pages/               Home, Programs, Membership, Contact, NotFound
src/components/          Dumbbell (3D hero), Plans, ui helpers
```
