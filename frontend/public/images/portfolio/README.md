# Portfolio screenshots

Put optimized project screenshots here. They are served as **static assets** (not bundled by the app), so the app stays fast.

## Quick steps

1. **Resize** – Card display is ~400×300px. Export at **800×600px** (or 800px wide) so 2x looks sharp on retina.
2. **Compress** – Use [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/). Aim for **&lt; 150 KB** per image.
3. **Save here** – Use a clear filename, e.g. `chickens.jpg`, `happy-food.webp`.
4. **Wire up in backend** – In `backend/app.py`, set each project’s `"image"` to this path:
   - `"/images/portfolio/your-filename.jpg"`  
     The leading slash means “from the site root,” so it works in dev and production.

## Why this folder?

- **`public/`** – Files here are copied as-is when you build. They are **not** processed by webpack, so they don’t bloat the JS bundle.
- **Static URLs** – The browser requests them separately and can cache them.
- **Lazy loading** – The portfolio page uses `loading="lazy"` so images load only when they’re about to be visible.

## Optional: WebP

For smaller file size, use `.webp`. Browsers that don’t support it can still get a fallback if you add a `<picture>` element or serve a JPEG from the same path on the server. For simplicity, JPEG/PNG here is fine.

## Optional: CDN later

If you host images on Cloudinary, imgix, or similar, keep using full URLs in `backend/app.py` (e.g. `"image": "https://res.cloudinary.com/..."`). Lazy loading and `decoding="async"` still apply.
