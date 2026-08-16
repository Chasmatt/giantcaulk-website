# Giant Caulk — website

Four-page marketing site for a commercial caulking contractor.
**Astro 5 + Tailwind CSS + Netlify Forms.** Deployed to `giantcaulk.netlify.app`.

```
src/
├── layouts/Layout.astro       shared head + nav + footer wrapper
├── components/
│   ├── Nav.astro              4-link nav with active/hover states
│   ├── Wordmark.astro         GIANT CAULK logo
│   ├── ServiceCard.astro      flip card (front = title, back = paragraph)
│   └── Footer.astro
├── pages/
│   ├── index.astro            home — full-viewport photo hero
│   ├── about.astro            two-column photo + paragraph layout
│   ├── services.astro         dark hero + 3-card flip grid
│   ├── contact.astro          floating form + blueprint file upload
│   └── thanks.astro           form-submission confirmation
└── styles/global.css          Google Fonts + Tailwind + tokens
public/
├── images/                    hero + about + desk photos (pre-sized)
├── __forms.html               Netlify Forms detection stub — DO NOT delete
├── favicon.svg
├── robots.txt
└── sitemap.xml
astro.config.mjs               Astro + Tailwind integration
tailwind.config.mjs            navy/steel/concrete palette + font stacks
netlify.toml                   build command + cache headers
```

---

## Local development

```bash
npm install
npm run dev            # http://localhost:4321
```

Other commands:

| Command | Action |
|---------|--------|
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

**Preview local edits before pushing** — every production deploy costs 15
Netlify credits and the account shares a 300/month pool with other sites.
Batch changes and push when the change is complete.

---

## Editing content

Copy lives inside the `.astro` page files themselves — search for a phrase in
`src/pages/` and edit inline. The design tokens (colors, fonts) live at the
top of `tailwind.config.mjs` and `src/styles/global.css`.

### Adding a service card

Open `src/pages/services.astro`, add an object to the `services` array:

```js
{
  title: "New Service Name",
  body: "Description that appears on the back of the card when clicked.",
}
```

The grid auto-adjusts. Three cards side-by-side on desktop is the sweet spot.

### Swapping a photo

Drop a resized JPG into `public/images/` and reference it from the page. Never
commit a camera original — hero and desk photos serve at 64–250 KB after
resizing. Resize snippet:

```powershell
# PowerShell / System.Drawing (Windows, no dependencies)
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('source.jpg')
# ...resize to target width, save as JPG quality 80–82
```

---

## Deploying

**Every push to `main` deploys automatically to Netlify.** Nothing else to do.

First-time Netlify wiring (done once, already in place):
1. Netlify UI → Sites → your site → Site configuration → Build & deploy
2. Repository connected to `Chasmatt/giantcaulk-website`
3. Build command: `npm run build` (also in `netlify.toml`)
4. Publish directory: `dist` (also in `netlify.toml`)

### The contact form

**Netlify Forms** handles submissions. In the Netlify UI:

1. **Forms tab → Enable form detection** (required once; without it Netlify
   silently discards submissions)
2. **Notifications → Add email notification** → recipient `giantcaulk@outlook.com`
3. Notifications come from `formresponses@netlify.com` — whitelist it
4. Every submission is also stored under the Forms tab, independent of email
5. Blueprint attachments appear as download links inside the notification email

The `email` field on the form is named exactly `email` on purpose — Netlify
uses that field to set the notification email's Reply-To, so you can reply
straight to the prospect.

---

## Things to change before public launch

`TODO` placeholders in the source, waiting on the business owner:

| Placeholder | Files |
|-------------|-------|
| `(317) 260-1079` | Nav footer, Contact sidebar, Thanks page |
| `giantcaulk@outlook.com` | Contact sidebar |
| `Scott Matthias` (owner name) | Contact sidebar |
| `REPLACE-WITH-REAL-DOMAIN.com` | `public/robots.txt`, `public/sitemap.xml` |
| Licensing / insurance wording | Nav footer |

Also confirm the Adobe Stock hero photo is a licensed download, not a comp.
