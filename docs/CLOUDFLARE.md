# Cloudflare in front of GitHub Pages

`alchemistways.com` currently uses **GoDaddy DNS → GitHub Pages**. Cloudflare is **not** in the path yet. This runbook puts Cloudflare (orange-cloud proxy) in front for CDN, DDoS/WAF basics, and **security headers** — without moving the site off GitHub Pages.

Origin stays: `alchemistways/Alchemist-ways` → GitHub Pages.

---

## 1. Add the site to Cloudflare

1. Create/login at [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Add a site** → `alchemistways.com` → Free plan is enough to start.
3. Cloudflare will scan DNS. Keep records that match GitHub Pages:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `185.199.108.153` | Proxied (orange) |
| A | `@` | `185.199.109.153` | Proxied |
| A | `@` | `185.199.110.153` | Proxied |
| A | `@` | `185.199.111.153` | Proxied |
| CNAME | `www` | `alchemistways.github.io` | Proxied |

4. Cloudflare shows two nameservers. In **GoDaddy** → Domain → Nameservers → replace `ns73/ns74.domaincontrol.com` with Cloudflare’s pair.
5. Wait until the zone status is **Active** (can take minutes to a few hours).

**Do not** point the apex at GoDaddy forwarding once Cloudflare is authoritative.

---

## 2. SSL / TLS

Cloudflare → **SSL/TLS**:

- Encryption mode: **Full** (GitHub Pages serves HTTPS). Prefer **Full (strict)** once the cert is valid.
- Enable **Always Use HTTPS**.
- **Edge Certificates** → enable **HSTS** (start with max-age 6 months; enable “Include subdomains” only if all subs are HTTPS).

GitHub Pages custom domain should already have HTTPS enforced in the repo Pages settings.

---

## 3. Security headers (Transform Rules)

### Quick path — Managed Transform

**Rules → Transform Rules → Managed Transforms →** enable **Add security headers**.

That adds roughly:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: same-origin` (Managed default — see note below)

**Note:** Managed `Referrer-Policy: same-origin` is strict. For social OG previews / outbound shares, prefer a custom rule with `strict-origin-when-cross-origin` instead (below) and leave Managed referrer off if it conflicts.

Also enable HSTS in SSL (above) — Managed Transforms do not replace HSTS.

### Recommended custom Response Header rule

**Rules → Transform Rules → Modify Response Header → Create rule**

- **Name:** `Alchemist Ways security headers`
- **When:** `All incoming requests` (or hostname equals `alchemistways.com` / `www.alchemistways.com`)
- **Then** set:

| Header | Value |
|--------|--------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` |

Optional CSP (tighten later after testing Kit / Calendly embeds). Start **Report-Only** if unsure:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https://app.kit.com;
frame-src https://calendly.com https://www.youtube.com;
base-uri 'self';
form-action 'self' https://app.kit.com mailto:;
upgrade-insecure-requests
```

Header name: `Content-Security-Policy` (or `Content-Security-Policy-Report-Only` first).

Kit POST and Calendly/YouTube must stay allowed or waitlist / CTAs break.

---

## 4. WAF / bots (Free tier)

- **Security → Settings:** Security Level **Medium**.
- **Bot Fight Mode:** On (Free) — watch that it doesn’t block legitimate Kit form POSTs; whitelist if needed.
- **Security → WAF:** enable free managed rules where available.

---

## 5. Caching (optional)

GitHub Pages already uses Fastly. With Cloudflare proxy:

- Cache static `/assets/*` aggressively (Cache Rules: URI Path starts with `/assets/` → Eligible for cache, Edge TTL long).
- Bypass cache for nothing critical on this static landing (no cookies required).

After first deploy behind CF, purge cache once: **Caching → Configuration → Purge Everything**.

---

## 6. Verify

```bash
curl -sSI https://alchemistways.com/ | head -40
```

Expect:

- `server: cloudflare` (or `cf-ray` header present)
- Your security headers listed above
- Homepage + `/assets/index-*.js` still **200**
- Waitlist submit still succeeds
- Map / Calendly / social links still work

Hard-refresh the live site after DNS goes active.

---

## 7. Rollback

GoDaddy → restore nameservers `ns73.domaincontrol.com` / `ns74.domaincontrol.com`, wait for DNS, site returns to direct GitHub Pages.

---

## Out of scope here

- Moving hosting **to** Cloudflare Pages (would replace the GitHub Actions Pages sync).
- Purchasing/managing `worldofalchemist.com` on Cloudflare.
- Cloudflare Access / Zero Trust (not needed for a public landing).

## Agent note

Do **not** change GoDaddy nameservers from this repo — that requires the client’s Cloudflare + registrar logins. This file is the checklist only.
