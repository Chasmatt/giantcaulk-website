# Giant Caulk — website

Three-page static site. No build step, no framework, no dependencies.

```
index.html      home page
services.html   services detail page
contact.html    quote request form
thanks.html     confirmation page (form redirects here)
css/styles.css  all styling
images/         hero photos, pre-sized
netlify.toml    host config, cache headers
```

---

## Preview locally — do this instead of deploying

Every production deploy costs 15 credits out of a monthly 300, shared across
every project on the Netlify account. That's about 20 deploys a month. Looking
at your own changes should never cost one.

From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Ctrl+C to stop.

Use this rather than opening the files directly with `file://`, because the
`/thanks` path only resolves correctly when something is serving the directory.

Any of these work equally well if you'd rather:

```bash
npx serve .          # Node
php -S localhost:8000  # PHP
```

**Workflow that keeps you inside the free tier:** edit, refresh the local
preview, edit again, refresh. Only commit and push when a change is actually
finished. Five edits pushed together cost 15 credits. Five edits pushed one at
a time cost 75.

---

## Staying free

- **Batch your pushes.** This is the whole game. See above.
- **Turn off deploy previews and branch deploys** in the Netlify UI under
  Build & deploy → Deploy contexts. Each one consumes credits, and for a
  solo two-page site they earn nothing.
- **Leave auto-recharge off.** It's off by default on Free and can't be
  enabled there anyway, but don't turn it on if you upgrade.
- **Enable usage notifications.** Netlify emails at 50%, 75%, and 100%. On a
  shared account with other projects, this is your early warning.
- **Don't add images without resizing them.** See below.

Bandwidth is not a real constraint here — roughly 15 GB/month against page
weights of 93–256 KB. Forms are free and unlimited on credit-based plans.

---

## Adding or replacing images

Never drop a camera-original or a stock download straight into `images/`.
The hero photo arrived at 5621px wide and 2.5 MB; it now serves at 64–231 KB.

To resize a new one:

```bash
python3 - << 'EOF'
from PIL import Image
im = Image.open('new-photo.jpg').convert('RGB')
w, h = im.size
for width in (2400, 1600, 1000):
    im.resize((width, round(width * h / w)), Image.LANCZOS).save(
        f'images/new-photo-{width}.jpg', 'JPEG',
        quality=80, optimize=True, progressive=True)
EOF
```

Then reference them with `srcset`, following the pattern in `index.html`.

---

## Things to change before launch

Placeholders currently in the files:

| Placeholder | Appears in |
| --- | --- |
| `(317) 555-0100` | `index.html`, `contact.html`, `thanks.html` |
| `estimates@giantcaulk.com` | `contact.html` |
| `Central Indiana` | `contact.html` |
| `© Adobe Stock` credit | `index.html` (delete if unwanted) |

Also still to do:

- `robots.txt` and `sitemap.xml`
- Real hours, license numbers, and insurance limits
- Confirm the Adobe Stock file is a licensed download, not a comp

---

## Adjusting the look

One variable at the top of `css/styles.css` controls how faded the background
photo is on the contact page:

```css
--wash: 0.80;   /* 0 = full photo, 1 = solid colour */
```

Try 0.60–0.65 if you want the branded caulk tube in the photo to stay legible.

---

## Netlify setup reminders

1. **Enable form detection** under Forms, then redeploy. Submissions are not
   captured until this is on — this is the usual cause of a form that appears
   to work but records nothing.
2. **Add the email notification** under Project configuration → Notifications
   → Form submission notifications.
3. Notifications send from `formresponses@netlify.com`. Whitelist it.
4. The email input is named `email` on purpose — that sets the Reply-To header
   so you can reply straight to the prospect. Don't rename it.
5. Every submission is also stored in the Forms tab, independent of email.
   That's the backup if a notification bounces.
