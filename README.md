# prismadev

Marketing site for prismadev — a one-person web studio.

Static: three files, no build step, no dependencies beyond Google Fonts.

| File | What's in it |
| --- | --- |
| `index.html` | Markup and the inline SVG assets (prism, monogram, favicon) |
| `styles.css` | Design tokens, layout, and the CSS-driven load sequence |
| `main.js` | Sticky-nav state, scroll reveals, copy-to-clipboard |

## Design system

The palette runs the full length between the two brand colors, so every
accent on the page is a point on one spectrum:

`#AE66FF` (dev) → `#8445CC` → `#592499` → `#2F0366` (prisma)

Everything else is white. Services are labeled by **deviation angle**
(8° / 18° / 28° / 38°) — the same four beams leaving the prism in the hero.
If you add or reorder a service, update both the `.spec-deg` value and the
matching `.fan-deg` label in the hero SVG so they stay in sync.

## Local preview

Any static server works:

```bash
python3 -m http.server 4321
```

## Deploying

Cloudflare Pages, connected to this repo. No build command; output
directory is the repo root. Pushes to `main` publish automatically.
