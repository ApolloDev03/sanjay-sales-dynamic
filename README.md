# Sanjay Sales — Next.js (TypeScript + Bootstrap)

Home page converted 1:1 from the approved HTML/CSS/JS design.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Folder structure

```
public/assets/images/          all images (same names as the HTML version)
src/app/
  layout.tsx                   <html>, fonts, CSS imports, Header + Footer
  page.tsx                     Home page (/)
  types.d.ts
  styles/
    style.css                  your original style.css (unchanged, only image path fixed)
    bootstrap.scss             Bootstrap 5 (all parts except Reboot)
    _bootstrap-type.scss
  data/site.ts                 menu, categories, hero slides, counters, contact info…
  components/
    layout/Header.tsx          top bar, sticky header, mega menu, mobile menu
    layout/Footer.tsx
    home/HeroSlider.tsx
    home/AboutSection.tsx
    home/CategorySlider.tsx    Swiper
    home/CounterSection.tsx
    home/Odometer.tsx          rolling counter
    home/ClientsSlider.tsx     Swiper
    common/AosInit.tsx         AOS scroll animations
    common/BootstrapClient.tsx Bootstrap JS bundle
```

## Adding an inner page

Create `src/app/about/page.tsx` (→ `/about`), `src/app/products/page.tsx` (→ `/products`), etc.
Header and Footer come from `layout.tsx` automatically. Update links in `src/app/data/site.ts` (`ROUTES`).

## Notes

- **Bootstrap**: everything (grid, utilities, buttons, forms, modal, offcanvas, cards… + JS)
  is available, except Bootstrap's *Reboot* reset. Reboot restyles plain `h1–h6`, `p`, `a`,
  `body` etc. and would change the approved design, so it is left out on purpose.
- Libraries are installed from npm (same versions as the CDN links in the HTML):
  Swiper 11, AOS 2.3.4, Bootstrap Icons 1.11.3, Font Awesome 6.6.0.
- Google Fonts (Bebas Neue, Manrope) are loaded in `layout.tsx` exactly as before.
- Put the catalogue PDF at `public/assets/pdf/sanjay-sales-catalogue.pdf` for the footer download button.
