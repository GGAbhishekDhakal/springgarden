# TODO

## 1) Admin panel redesign (Rhombus-style)
**Goal:** Admin UI inspired by [Rhombus](https://preview.themewagon.com/rhombus/) (sidebar + top bar + clean content cards) so admin can control Spring Garden content for **Home, About, Programs, Gallery, Pricing, Contact**. Do one section at a time.

- [x] **Step 1 — Admin shell/layout:** New sidebar/topbar layout and navigation (Dashboard, Home, About, Programs, Gallery, Pricing, Contact, Inquiries, Settings/Staff as needed), responsive, Rhombus-like look & feel.
- [ ] **Step 2 — Home:** Editable home sections/content (hero, intro/highlights, stats/CTA, featured items) with fallback to current defaults.
- [ ] **Step 3 — About:** Editable about content/sections (+ team/staff management integration).
- [ ] **Step 4 — Programs:** Improve/align programs content controls with new admin UI.
- [ ] **Step 5 — Gallery:** Align category-wise gallery management with new admin UI.
- [ ] **Step 6 — Pricing:** Align pricing/fees content controls with new admin UI.
- [ ] **Step 7 — Contact:** Editable contact page info/sections + inquiries view aligned with new admin UI.
- [ ] **Step 8 — Polish:** Consistent components, empty/loading states, validation, and UX refinements.

## 2) Security, architecture & pentest hardening
- [ ] **Secrets & credentials**
  - [ ] Verify `.env` never committed; scan history; rotate any exposed secrets.
  - [ ] Use Vercel env vars per environment; keep server secrets off `NEXT_PUBLIC_*`.
  - [ ] Strong `AUTH_SECRET`, least-privilege DB user, TLS DB connection.
  - [ ] Add secret scanning (e.g. Gitleaks/GitHub secret scanning).
- [ ] **Architecture & authorization**
  - [ ] Re-check admin session in every admin server action/mutation (not just middleware/layout).
  - [ ] Keep sensitive logic server-only; centralize env validation (Zod).
  - [ ] Use Prisma migrations for prod; backups/restore plan.
  - [ ] Safer error handling/logging (no secrets/PII in responses).
- [ ] **Forms, auth & abuse prevention**
  - [ ] Rate limiting/backoff for login, `/admin/setup`, and contact form.
  - [ ] Spam protection on contact (honeypot + CAPTCHA e.g. Turnstile).
  - [ ] Strong password rules; secure cookie flags/expiry; lock down `/admin/setup` after first admin.
  - [ ] CSRF hardening for state-changing operations.
- [ ] **Input, XSS & uploads**
  - [ ] Zod validation/normalization on all inputs (max lengths, IDs/slugs).
  - [ ] Remove/sanitize `dangerouslySetInnerHTML`; safe rendering of user-managed content.
  - [ ] Server-side upload validation (type/size/magic bytes), safe handling via Cloudinary.
  - [ ] Keep Prisma parameterized (no unsafe raw SQL).
- [ ] **Headers & dependencies**
  - [ ] Security headers (CSP, X-Frame-Options/frame-ancestors, nosniff, Referrer-Policy, Permissions-Policy, HSTS).
  - [ ] `npm audit` / dependency upgrades; track advisories.
- [ ] **Pentest checklist (baseline & before launch)**
  - [ ] Automated scan (e.g. OWASP ZAP) on staging/local.
  - [ ] Manual checks: authz/IDOR on admin actions & content IDs, `/admin/setup` lock, brute-force, XSS in all editable fields, upload abuse, cookie/header/HTTPS verification.
  - [ ] Document findings/fixes; repeat on notable releases.
