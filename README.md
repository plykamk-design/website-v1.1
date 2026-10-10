# Mebel Laminat website — editable source files

This is a static website made with plain HTML, CSS and JavaScript. No paid framework or build step is required.

## Files
- `index.html` — all website text, sections, links, contact details and image references
- `styles.css` — layout, responsive/mobile styling, fonts and colors
- `script.js` — language toggle, mobile menu and contact form behavior

## Preview on your computer
1. Extract the ZIP.
2. Open `index.html` in Chrome or Edge.
3. An internet connection is needed to load the Google Fonts and sample photos.

## Publish on Cloudflare Pages (free)
1. Sign in to Cloudflare.
2. Open **Workers & Pages**.
3. Choose **Create** → **Pages** (or **Upload assets / Direct Upload**, depending on the dashboard wording).
4. Create a project and upload the extracted website folder's contents. Make sure `index.html`, `styles.css`, and `script.js` are at the top level, not inside another nested folder.
5. Deploy. Cloudflare will provide a `*.pages.dev` address.

If the dashboard asks for a build command, leave it blank. If it asks for an output directory, use the folder containing `index.html` (often the root directory / `.`). For Direct Upload, just upload the static files.

## Edit the site
- Text: open `index.html` in Notepad, VS Code, or another text editor.
- Colors and design: edit the variables at the top of `styles.css` under `:root`.
- Images: in `index.html`, replace the image URLs inside `src="https://..."`. For a local photo, create an `images` folder and use a path such as `images/kitchen-01.jpg`. For the large homepage background, change the `background-image` URL near the top of `styles.css`.
- Contact details: search `index.html` for `+389 XX XXX XXX`, `info@mebellaminat.mk`, and `Bitola`; replace with the correct details. In `script.js`, also replace `BUSINESS_EMAIL` with the real email address.
- Language: each translated text element has `data-mk` and `data-en` attributes. Update both versions if you change a translated heading or label.

## Important before publishing
1. The phone number and email shown are placeholders; replace them with your actual business contacts.
2. The portfolio and service photos are illustrative sample photos loaded from Unsplash, not photos of Mebel Laminat's actual work. Replace them with your own project photos for the best result.
3. The contact form opens the visitor's email app (it does not store messages on a server). For a form that sends messages without requiring the visitor to have an email app configured, connect a form service later.
4. Cloudflare Pages hosting is free for a basic static site. A custom `.mk` or `.com` domain is typically purchased separately; the free `pages.dev` subdomain is enough to start.
