# Velvet Motors — Car Collection Website

A **modern, premium, fully responsive** automotive showcase built for the Car Collection Website assignment.

**Stack:** React (Vite) · Tailwind CSS v4 · Framer Motion · React Router

---

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

---

## Assignment requirements — completion checklist

| Requirement | Implementation |
|-------------|----------------|
| Home page & hero | Cinematic parallax hero, featured cars, categories, extended premium sections |
| Collection gallery | Search, category/brand/fuel filters, price range, 6 sort modes |
| Car details | Image gallery, full specs, wishlist/compare, book test drive link |
| Brands & categories | Brand grid, category tiles, filtered inventory by brand |
| Car comparison | Up to 3 vehicles, side-by-side specification table |
| Wishlist & favorites | Heart toggle, dedicated page, `localStorage` persistence |
| Test drive & enquiry | Validated forms, loading states, success UI, submissions stored locally |
| About, Contact, FAQ, Footer | All pages + accordion FAQ + contact map embed |
| React + Tailwind + Framer Motion | Used throughout |
| Responsive design | Mobile nav, responsive grids, scrollable compare table |
| Animations & micro-interactions | Page transitions, scroll reveals, hover, toasts, layout animations |
| Reusable components | UI kit, layout, cards, forms, contexts |
| Premium design | Dark/gold theme, Syne + DM Sans, local HD imagery |
| Creativity | Philosophy, journey, testimonials, editor spotlight, cinematic CTAs |

---

## Project structure

```
src/
  components/   layout, home, cars, forms, ui
  context/      wishlist, comparison, toast
  data/         cars.js, images.js
  hooks/        useLocalStorage, usePageTitle
  pages/        all routes + 404
  utils/        form validation, form submissions
public/images/cars/   offline-capable vehicle photography
```

---

## Forms (demo behaviour)

Forms validate on the client, show a loading state, then save payloads to `localStorage` under `velvet-submissions-*` so reviewers can verify submissions in DevTools → Application → Local Storage. Connect a REST API by replacing `submitForm()` in `src/utils/submissions.js`.

---

## Inventory

**18** showroom models across **Luxury**, **Sports**, **SUV**, and **Supercar**, spanning **13** marques. Home page stats are driven from live data via `inventoryStats` in `src/data/cars.js`.

---

## Accessibility

- Skip to main content link  
- Visible `:focus-visible` outlines  
- ARIA labels on icon buttons  
- `aria-live` toast notifications  

---

## Author notes

Designed as a portfolio-grade frontend deliverable: functional interactions, consistent premium UX, and assignment-complete module coverage.
