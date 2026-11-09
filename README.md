# Spring Garden Kids World — Website + Admin

Modern rebuild of the Spring Garden Kids World website with a **category-wise gallery**, **staff management**, and a simple **admin panel**. Built with **Next.js (App Router) + PostgreSQL (Prisma) + Cloudinary** and designed to deploy on **Vercel**.

## What’s included (v1)
- **Public site:** Home, About (team/staff), Programs, **Gallery by category**, Contact (form saves inquiries).
- **Admin (`/admin`):** secure login, first-time setup, **Gallery categories + photo uploads**, **Staff members + photos**, Programs, Fees, Testimonials, Inquiries, Site settings.
- **Legacy site:** original static files preserved in `legacy/` for reference/migration.

## Tech stack
- Next.js 14 (App Router, TypeScript, Tailwind)
- PostgreSQL + Prisma
- Auth: simple admin session (email/password, `AUTH_SECRET`)
- Images: Cloudinary uploads (gallery/staff)

## Local setup
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Set at minimum:
   - `DATABASE_URL` — PostgreSQL connection string
   - `AUTH_SECRET` — long random string (e.g. `openssl rand -base64 32`)
   - `CLOUDINARY_*` — required for photo uploads (gallery/staff)
3. **Create database tables**
   ```bash
   npm run db:push
   ```
4. **Run the app**
   ```bash
   npm run dev
   ```
5. **Create the first admin**
   - Open `http://localhost:3000/admin/setup` (only works when no admin exists yet).
   - After setup, sign in at `/admin/login`.

## Deploy to Vercel
1. Import the GitHub repo into Vercel.
2. Add a **PostgreSQL** database (recommended: **Neon** or **Supabase**; Vercel Postgres also works) and set `DATABASE_URL`.
3. Add **Cloudinary** credentials for uploads: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
4. Set `AUTH_SECRET` and `NEXT_PUBLIC_SITE_URL` (your production URL).
5. Deploy. The build runs `prisma generate` (`postinstall`/`build`).
6. Run `npm run db:push` against the production `DATABASE_URL` once (from your machine) to create tables, **or** add migrations later (`prisma migrate`).
7. Visit `https://your-domain/admin/setup` to create the first admin account.

## Content workflow (client)
1. **Settings** — confirm address, phone, hours, social links, map, footer text.
2. **Gallery** — create categories (e.g., *Annual Day, Sports, Classroom*), then upload photos into each category.
3. **Staff** — add staff members with name, role, bio, and photo.
4. **Programs / Fees / Testimonials** — add and update as needed.
5. **Inquiries** — review contact form messages in admin.

## Notes
- Photo uploads require Cloudinary to be configured. Without it, admin upload actions will error.
- Protect `AUTH_SECRET` and never commit `.env`.
- For production hardening, consider: rate limiting on login/contact, email notifications for inquiries, role-based access, audit logs, and Prisma migrations.
- The `legacy/` folder contains the previous static site for reference; it is not served by the Next.js app.
