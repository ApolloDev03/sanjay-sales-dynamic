# Sanjay Sales API / Apache static hosting

- `.env` uses `NEXT_PUBLIC_API_BASE_URL=https://getdemo.in/sanjay_sales/api/`.
- All 16 endpoints are wrapped by `src/lib/api.ts`, with the reusable Axios client `apiClient`.
- All API calls use **POST JSON bodies**, including details; slugs appear in the browser URL as `?slug=...` only for client routing, not as API query parameters.
- Product detail: `/productdetail?slug=mig-350`. Blog detail: `/blogdetail?slug=welding-tips`.
- Listing, detail, gallery, catalogues, inquiry, home categories, home clients and hero pages are wired to live API calls. The API home data and SEO endpoint have typed API helpers; other legacy static home sections and static metadata require further field mapping/SEO deployment choices.
- `next.config.ts` uses `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`.
- Install dependencies: `npm install`; development: `npm run dev`; build: `npm run build`.
- Upload **contents** of `out/` to your Apache document root, e.g. `public_html/`. No Node server needed.
- For a subfolder deployment, configure `basePath` and `assetPrefix` appropriately *before building*; Apache must serve generated `.../index.html` directories. `AllowOverride All` / DirectoryIndex index.html may be needed.
- Since Apache static hosting has no Next.js runtime, client-side fetches require the API server to allow CORS from the published website domain. If the backend blocks cross-origin POSTs, fix the Laravel CORS configuration. Client-side API requests cannot keep tokens secret.
- The site must be rebuilt when frontend code changes; API data updates appear on refresh without rebuild.
- Static export cannot generate live per-slug HTML SEO for unknown products. For per-product server-rendered metadata, deploy Next.js on Node rather than static Apache export, or pre-generate known slugs at build time and rebuild when they change.
