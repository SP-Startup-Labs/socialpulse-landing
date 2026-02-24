# SocialPulse Investor / Press Landing Page

Premium early-access landing page for SocialPulse built with Next.js App Router and TypeScript.

## Stack

- Next.js 14+
- TypeScript
- Tailwind CSS
- Lucide React icons
- `next/image`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Lead capture flow

1. Click **Request Investor / Press Access**.
2. Fill required fields in the modal form.
3. Form submits to `POST /api/lead`.
4. Leads are appended to `data/leads.json` (created automatically if missing).

## Integration points

- Local file persistence currently lives in: `app/api/lead/route.ts`
- **Database replacement point** (Supabase/Postgres/etc.): replace file read/write logic in `POST` handler.
- **CRM integration point**: add provider call after a lead is persisted in `POST` handler.
- **Email notification point**: add email dispatch after successful persistence in `POST` handler.

## Deployment

Vercel-ready:

```bash
npm run build
npm run start
```

For production deployment, use a real database instead of local JSON file storage.
