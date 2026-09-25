# Rasmy Freight LLC — Website

Static site. No build step, no server, no dependencies. Open `index.html` to preview.

## Files
- `index.html`, `services.html`, `about.html`, `contact.html`, `privacy-policy.html`, `terms.html` (includes SMS Terms at `#sms`), `thank-you.html`
- `styles.css`, `script.js`
- `assets/img` (original SVG scenes + `og-image.png`), `assets/logo`, `assets/fonts` (self-hosted Inter and Barlow Condensed; no external font requests)
- favicons, `sitemap.xml`, `robots.txt`

## Preview
Double-click `index.html`. Everything works offline. On a local file, the quote form skips sending and goes straight to the thank-you page (browsers can't send forms from disk).

## Deploy
Upload the whole folder contents to any static host (Netlify, Cloudflare Pages, GitHub Pages, cPanel/GoDaddy, S3). Keep the `assets/` folder structure. `index.html` must be in the web root. Canonical URLs, sitemap and social tags assume `https://rasmyfreight.com`.

## Activate the contact form (one time)
The form posts to FormSubmit (formsubmit.co), which emails submissions to info@rasmyfreight.com.
1. Deploy the site to the live domain.
2. Submit the form once yourself.
3. FormSubmit emails an activation link to info@rasmyfreight.com. Click it once.
4. Done. Every later submission arrives in that inbox as a table; replying goes to the sender's email.

Spam protection: hidden honeypot field, minimum time-on-page check, browser validation. Free FormSubmit has monthly limits; if volume grows, swap the form `action` for another provider.

## SMS / RingCentral registration
- Consent checkbox is optional and unchecked by default, with the required disclosure language beside it.
- Privacy Policy states that mobile/SMS opt-in data is not shared with third parties for marketing.
- Terms page `#sms` covers message types, frequency, rates, STOP/HELP, and that consent is not a condition of service.
Use these URLs on the registration: `/privacy-policy.html`, `/terms.html#sms`, `/contact.html`.

## Notes
- Shipment status is "on request" from operations, not a public tracking portal, as worded on the site.
- Imagery is original vector artwork (no stock photos, no third-party logos). Have counsel review the legal pages before relying on them.
