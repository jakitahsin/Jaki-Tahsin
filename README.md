# Jaki Tahsin — Portfolio + Admin

Public site: `/`   Admin: `/admin`

## Setup (one time, ~5 minutes)
1. Push this folder to GitHub (git init, add, commit, push) and import the repo in Vercel (Framework: **Other**).
2. In Vercel → your project → **Storage** → Create **Blob** store → Connect to this project (this adds `BLOB_READ_WRITE_TOKEN` automatically).
3. Vercel → Settings → **Environment Variables**, add:
   - `ADMIN_PASSWORD` — the password you will log in with
   - `ADMIN_SECRET` — any long random text (30+ characters); used to sign the login cookie
4. **Redeploy** (Deployments → ⋯ → Redeploy). Open `/admin` and log in.

## What the admin does
- **Works:** add/edit/delete, cover + gallery images, categories, featured, draft/publish, reorder. Saved works appear on the public site immediately.
- **Clients:** name, logo, website, show/hide, reorder → shown in the "Clients & Collaborations" section.
- **Invoices:** Bill to / Bill from, date, auto invoice number (JT-INV-YYYY-001), items with price × quantity, subtotal, discount, tax %, paid, due, payment details (bank + mobile banking). **Print / Save as PDF** uses the browser print dialog (choose "Save as PDF", A4).

## Notes
- Images are resized in the browser before upload (PNG/JPG/WebP only; SVG is rejected).
- Invoices are stored in a private-path file in Blob that only the admin API returns; the URL is unguessable but Blob files are technically public-by-link, so avoid storing highly sensitive data (e.g. full card numbers).
- Change the password any time in Vercel env vars and redeploy.
