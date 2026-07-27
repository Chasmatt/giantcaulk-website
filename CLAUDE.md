# CLAUDE.md

Context for Claude Code working in this repo.

## What this is

Marketing site for **Giant Caulk**, a commercial caulking and joint sealing
contractor. Three real pages (home, services, contact) plus a form confirmation
page. The audience is general contractors, property managers, facility
directors, and restoration consultants — not homeowners. Copy should stay
technical and specific; this audience knows what backer rod is and is
unimpressed by "quality you can trust."

## Hard constraints — do not violate without being asked

**No build step. No framework. No dependencies.**
Plain HTML and one CSS file. Do not introduce React, Vue, Tailwind, Sass, a
static site generator, npm, or a bundler. If a task seems to call for one,
say so and ask rather than adding it. There is no `package.json` and there
should not be one.

**No JavaScript unless there's a real reason.**
The site currently ships zero JS and loads in under 160 KB. Keep it that way.
Form validation is native HTML (`required`, `type="email"`). Don't reimplement
it in JS.

**Do not rename the `email` input on the contact form.**
`contact.html` has `<input type="email" name="email">`. Netlify uses a field
named exactly `email` to set the Reply-To header on notification emails. Rename
it and replies silently go to Netlify instead of the prospect.

**Do not remove these form attributes:**
- `data-netlify="true"` — tells Netlify to capture the form
- `netlify-honeypot="bot-field"` — spam trap
- `action="/thanks"` — custom confirmation page
- the `<p class="hp">` block containing `bot-field`

**Do not use localStorage or sessionStorage.** Not needed, and blocked in some
preview contexts.

## Hosting

Netlify, free tier, on an account that hosts two other projects. All projects
share one pool of 300 credits/month. Production deploys cost 15 credits each,
so roughly 20 deploys/month total across all three sites. If the pool is
exhausted, **all three sites pause until the next billing cycle.**

Consequences for how you work here:
- Never deploy to check your work. Preview locally: `python3 -m http.server 8000`
- Batch changes. Don't suggest committing after each small edit.
- Don't add anything that increases deploy frequency (CI checks that trigger
  builds, branch deploys, preview environments).
- Netlify Forms are free and unlimited on credit plans — the form costs nothing.

## Placeholders

Everything unresolved is marked with a `TODO` comment in the source. Find them:

```bash
grep -rn "TODO" --include="*.html" --include="*.xml" --include="*.txt" .
```

Currently unresolved, waiting on the business owner:

| Placeholder | Files |
| --- | --- |
| `(317) 555-0100` | index.html, contact.html, thanks.html |
| `estimates@giantcaulk.com` | contact.html |
| `Central Indiana` | contact.html |
| `REPLACE-WITH-REAL-DOMAIN.com` | robots.txt, sitemap.xml |
| Adobe Stock credit line | index.html |
| License/bond/insurance wording | contact.html |

**Do not invent replacements for these.** They are real business facts. If asked
to "finish the site," leave them and flag them.

## Design system

All tokens live at the top of `css/styles.css` as custom properties. Use them;
don't hardcode hex values.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#16283C` | body copy, headings |
| `--ink-soft` | `#4A5F76` | secondary copy |
| `--steel` | `#3E6491` | brand blue, buttons, links |
| `--paper` | `#F4F6F8` | page background |
| `--mark` | `#E3A21A` | **focus states only** — do not use decoratively |
| `--wash` | `0.80` | how faded the contact-page background photo is |
| `--joint` | `3px` | the "sealant bead" weight, used consistently |

Type: `Saira Condensed` (display), `IBM Plex Sans` (body), `IBM Plex Mono`
(small caps labels, which read like construction drawing annotation). Loaded
from Google Fonts, so they don't count against Netlify bandwidth.

**The signature detail** is a sealant-bead motif: a 3px rounded bar. It appears
on the card's top edge, on the bottom border of focused inputs, and as a marker
on each service. If you add a component, that's the device to reuse. Don't
invent a second one.

## Accessibility floor — already met, don't regress

- Every interactive element has a **44px minimum touch target**, achieved with
  an invisible `::after` overlay so links stay visually small. See the
  "TOUCH TARGETS" section in the CSS. If you add a link in small text, add it
  to those selector lists.
- **All form inputs are ≥16px.** Below 16px, iOS Safari zooms the page on focus
  and doesn't zoom back out. Never set an input font-size smaller than 1rem.
- Visible keyboard focus via `:focus-visible` with a 2px amber outline.
- `prefers-reduced-motion` respected.
- Skip link on every page.
- No horizontal scroll at 360px. Verify after layout changes.

## Verifying changes

There are no tests. Check work by rendering it:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Use a local server rather than `file://`, because `/thanks` only resolves when
a server is handling the directory.

Widths worth checking after any layout change: 360, 390, 768, 1280, 1440.
The known failure modes are horizontal overflow and touch targets under 44px.

## Images

Pre-sized and committed. `hero-sealing-{1000,1600,2400}.jpg` is wired with
`srcset` in `index.html`; `hero-desk{,-mobile}.jpg` is a CSS background on the
contact page.

Never commit a camera-original or stock download. The hero arrived at 5621px
and 2.5 MB and now serves at 64–231 KB. Resize before committing — see README.

The Adobe Stock hero needs to be a licensed download, not a watermark-free
comp. Don't add new stock imagery without confirming licensing.

## Copy notes

- Buttons use active voice: "Send request", not "Submit".
- The company name reads as a double entendre. It was raised with the owner and
  kept. The **owner's approved slogan** — *"Cracks big or small we fill them
  all."* — is intentional and leans into the pun. Use it verbatim on the home
  hero. Don't editorialize about the name beyond what the owner has approved.
- Sentence case in prose; the display face handles uppercase via CSS
  `text-transform`, so don't type headings in caps.
