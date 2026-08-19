# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

Marketing site for **Giant Caulk**, a commercial caulking and joint sealing
contractor in Central Indiana. Four real pages plus a form confirmation page.
Audience: general contractors, property managers, facility directors,
restoration consultants — not homeowners.

## Stack

- **Astro 5** — file-based routing, ships zero JS by default (islands
  architecture; only `ServiceCard.astro` hydrates a tiny script for flip)
- **Tailwind CSS 3** via `@astrojs/tailwind` — utility classes, no separate
  CSS files to maintain, tokens in `tailwind.config.mjs`
- **FormSubmit** (free tier, no account) handles the contact form. The form
  posts directly to `https://formsubmit.co/giantcaulk@outlook.com`; FormSubmit
  emails the owner. We tried Netlify Forms first — it works for the free tier's
  submission dashboard but email notifications require Netlify Pro ($19/mo).
- Deployed to `giantcaulk.netlify.app` via `Chasmatt/giantcaulk-website`
- **Netlify auto-deploys on every push to `main`.** Local preview is
  `npm run dev` — see README for the credit-preserving workflow.

## Hard constraints — do not violate without being asked

**Preserve the contact form's FormSubmit plumbing.**
- `action="https://formsubmit.co/giantcaulk@outlook.com"` on the `<form>` tag
- `method="POST"` and `enctype="multipart/form-data"` (required for blueprints)
- Hidden config fields — DO NOT rename or remove:
  - `_next` — full URL to redirect to after successful submit
  - `_subject` — email subject line
  - `_template=table` — renders the email as a clean field/value table
  - `_captcha=false` — skip FormSubmit's captcha; we use `_honey` instead
  - `_honey` — honeypot field; if filled, submission is dropped as spam
- The email input MUST stay `name="email"` so FormSubmit sets Reply-To
- **First submission from a new domain triggers a one-time activation email
  to giantcaulk@outlook.com.** Clicking the confirmation link is required
  before subsequent submissions get delivered. If email delivery stops,
  check FormSubmit's dashboard OR re-submit from the form to trigger a new
  activation email.

**Every form input MUST render at ≥16px.**
Below 16px iOS Safari zooms on focus and doesn't zoom back out. The
`.field-input` class in `contact.astro` enforces this — don't override
`font-size` on form fields.

**Do not use localStorage or sessionStorage.**
Not needed, and blocked in some preview contexts.

**No horizontal scroll on any viewport.**
`html, body { overflow-x: hidden }` in `global.css` prevents it. Verify
after layout changes at 360px width.

## Design system

Tokens live in `tailwind.config.mjs`. Use them; don't hardcode colors or
font names in components.

| Token | Value | Role |
|-------|-------|------|
| `navy` | `#132A4A` | body copy, headings, nav on light bg |
| `navy-deep` | `#0C1E38` | hero overlay, dark backgrounds |
| `navy-soft` | `#243B5D` | secondary dark surfaces |
| `steel` | `#3E6491` | primary buttons, active states |
| `steel-deep` | `#2C4A6E` | button hover, active-nav bar |
| `concrete-50…600` | grayscale | page bg, borders, muted copy |

**Fonts (Google Fonts, no bandwidth cost against Netlify):**

- `font-display` = **Bebas Neue** — GIANT CAULK wordmark, PRECISION CAULKING
- `font-serif` = **Playfair Display** — nav links, page titles, LASTING PROTECTION
- `font-body` = **IBM Plex Sans** — body copy, form fields

## Hosting — the credit situation

Netlify free tier, on an account shared with other projects. All projects
share one pool of 300 credits/month. Production deploys cost 15 credits each,
so roughly 20 deploys/month total across all sites. If the pool empties,
**all sites pause until the next billing cycle.**

Consequences:
- Never deploy to check your work. Preview locally: `npm run dev`
- Batch changes. Don't suggest committing after each small edit.
- Don't add anything that increases deploy frequency (branch deploys,
  deploy previews). Turn those off in the Netlify UI.
- Netlify Forms are free and unlimited on credit plans.

## Placeholders — do not invent replacements

Real business facts, waiting on the owner. Find them:

```bash
grep -rn "TODO\|placeholder" src/ public/ *.md
```

| Placeholder | Files |
|-------------|-------|
| `(317) 260-1079` | Footer, Contact sidebar, Thanks page |
| `giantcaulk@outlook.com` | Contact sidebar |
| `Scott Matthias` (owner name) | Contact sidebar |
| `REPLACE-WITH-REAL-DOMAIN.com` | `public/robots.txt`, `public/sitemap.xml` |
| License / bond / insurance wording | Footer |

## Accessibility floor — met, don't regress

- Every interactive element has a **44px minimum touch target** (buttons,
  nav links, form fields all meet this via padding)
- Form inputs ≥16px (iOS no-zoom rule above)
- Visible keyboard focus via `:focus-visible` on all interactive elements
- `prefers-reduced-motion` respected in `global.css`
- Skip link on every page via `Layout.astro`
- Nav uses `<ul>` + `<li>` and `aria-current="page"` for active state
- No horizontal scroll at 360px
- `enterkeyhint="next"` on form fields so the mobile keyboard shows a
  "Next" button that advances tab order

## Copy notes

- Buttons use active voice: "Submit", "Request A Quote", "Back to home".
- The company name reads as a double entendre. It was raised with the owner
  and kept. The **owner's approved home-page slogan** is intentional and
  leans into the pun; use owner-supplied copy verbatim, don't invent taglines.
- Sentence case in prose. Display faces handle uppercase via CSS
  `text-transform` or Tailwind `uppercase`, so don't type in caps.

## Verifying changes

There are no tests. Preview by running the dev server:

```bash
npm run dev
```

Widths to check after any layout change: 360, 390, 768, 1024, 1280, 1600.
Known failure modes: horizontal overflow, touch targets under 44px, form
inputs zooming on iOS.

## Images

`public/images/` — pre-sized before commit. Never drop a camera-original.
Hero photo arrived at 5621×3137 / 2.5 MB, serves at 70–242 KB across three
widths.

The Adobe Stock hero must be a licensed download, not a comp. Don't add
new stock imagery without confirming licensing.
