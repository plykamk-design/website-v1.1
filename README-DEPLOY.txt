# Mebel Laminat — Cloudflare Pages contact-form version

This package preserves the existing static website and adds a Cloudflare Pages Function at `functions/api/contact.js`.

## Before deployment
1. In Cloudflare Pages, open the `mebellaminat` project (the project serving `mebellaminat.pages.dev`).
2. In Settings → Functions → Bindings (the exact section label may vary), confirm the **Production** environment has a D1 database binding:
   - Variable name: `DB`
   - Database: `mebel-laminat-messages`
3. Confirm the D1 database already has the `messages` table. The function expects columns `name`, `email`, `phone`, `message`, and `created_at` (created_at can have a default). The project type is stored at the beginning of the `message` field so no schema change is required.
4. Keep a backup of your current website files.

## Deploy from Windows
Install Node.js LTS from https://nodejs.org/ if needed.

1. Extract this ZIP to a folder, for example `C:\Users\YourName\Desktop\mebellaminat-cloudflare-ready`.
2. Open that folder in File Explorer.
3. Click the address bar, type `cmd`, and press Enter.
4. Run:
   `npx wrangler login`
   Approve the login in your browser.
5. Deploy the folder contents to the EXISTING Pages project:
   `npx wrangler pages deploy . --project-name=mebellaminat`

If Wrangler says the project does not exist, stop and check the exact project name in Cloudflare Pages before retrying. Do not create a new project.

## Test
Submit a test through https://mebellaminat.pages.dev, then open the D1 database console and run:
`SELECT id, name, email, phone, message, created_at FROM messages ORDER BY id DESC;`

The project choice is included in the message text. The phone field is saved as NULL because the current form has no phone input.

## Notes
- Do not create a public endpoint for reading messages. View them in the authenticated Cloudflare D1 console.
- This includes basic validation and a honeypot anti-spam field, but it is not a full rate-limiting system.
- If the D1 table uses different column names or was created differently, deployment may succeed but submissions can fail; check the table schema if the test fails.
