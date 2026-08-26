# IAmBrownProductions — Portfolio Site

A minimal, black-and-white photo/video portfolio. Plain HTML, CSS, and
vanilla JS — no build step, no framework, works by opening the files
directly or hosting them anywhere that serves static files.

## Structure

```
index.html               Home — two entry tiles (Brands / Athletes & Creators)
brands.html               7 brand collaborations
athletes-creators.html    7 athlete/creator collaborations
styles.css                All styling (colors, type, grid, lightbox)
script.js                 Click-to-enlarge lightbox with prev/next
```

## Viewing it locally

Just open `index.html` in a browser, or, for the lightbox and fonts to
behave exactly like a real server (recommended), run a tiny local
server from this folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Swapping in your real photos and videos

Every work tile is currently a gray gradient placeholder. Two things
to change per tile, both in `brands.html` / `athletes-creators.html`:

1. **The thumbnail.** Find the tile's `<div class="tile-media tone-N">`
   and either:
   - Add a background image: `style="background-image: url('assets/img/oakley-jefferson.jpg'); background-size: cover; background-position: center;"`
   - Or drop the `tone-N` class and put a real `<img>` or `<video>`
     inside instead.
2. **The lightbox view.** Each `<button class="tile ...">` carries
   `data-type`, `data-title`, and `data-subtitle` attributes — that's
   what shows in the enlarged view. Add a `data-media="path/to/file"`
   attribute and update `script.js`'s `render()` function to swap in
   an `<img>` or `<video>` tag instead of the placeholder text, once
   you're ready to wire that up (or ask me to do it — much faster with
   your actual files in hand).

Put real images/video posters in `assets/img/` — that folder is
already created and empty, ready for your files.

## Hosting it for real

This is a static site, so any of these work with zero configuration:
Netlify, Vercel, GitHub Pages, Cloudflare Pages. Drag the whole folder
in, or connect a repo — either way it's live in a couple of minutes.
If you want, I can walk you through deploying it once you pick one.

## Design notes

- Font: [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) (Google Fonts, loaded via CDN link in each page's `<head>`).
- Colors live as CSS variables at the top of `styles.css` (`--bg`, `--fg`, `--gray-1` through `--gray-5`) if you want to adjust the palette later.
- Fully responsive: 3-column grid on desktop, 2-column on tablet, 1-column on phones.
