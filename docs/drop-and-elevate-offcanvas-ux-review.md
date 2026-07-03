# Drop & Elevate — Tablet Offcanvas UX/UI Review

Review of **Drop & Elevate** in the Studio Portal tablet offcanvas (768–1023px), compared to the Code Drops embed pattern.

---

## Current State

When `embed={true}`, Drop & Elevate renders the **full wide-page layout** — not a drawer-specific variant:

```jsx
// src/pages/studio/DropAndElevatePage.jsx
if (embed) {
  return (
    <div className="de-wide">
      <DropElevateWideContent formProps={formProps} />
    </div>
  );
}
```

Code Drops uses a dedicated `cd-embed` with a lead line and compact list, plus offcanvas-specific SCSS under `.portal-offcanvas__scroll-area`. Drop & Elevate has no equivalent `de-embed` or portal-specific overrides.

On tablet, the offcanvas is full-screen with a compact header, but the scroll body is still:

**6 panel cards → large “Start a project” banner → 3-step list → nested form**

### Key files

| Area | Paths |
|------|-------|
| Offcanvas shell | `src/pages/HomePage.jsx`, `src/styles/pages/_home.scss` |
| Drop & Elevate | `src/pages/studio/DropAndElevatePage.jsx`, `src/content/dropElevateServices.js`, `src/styles/pages/_studioWideContent.scss`, `src/styles/pages/_dropAndElevate.scss` |
| Code Drops embed (reference) | `src/pages/studio/CodeDropsPage.jsx`, `src/styles/pages/_codeDrops.scss` |
| Get Professional embed | `src/pages/studio/GetProfessionalPage.jsx` (`gp-wide-embed`) |

---

## What's Working

- **Service content** is clear and well written; each card has a distinct title and useful one-liner.
- **Tablet breakpoint** already collapses the 2-column service grid and inquiry layout to single column — sensible for portrait.
- **Offcanvas shell** (blur, header, back-home) matches the rest of the portal and feels cohesive.
- **Mailto flow** is low-friction once the user reaches the form.

---

## Main UX Issues (Priority Order)

### 1. Wrong mental model for a drawer

The offcanvas should feel like a **preview**: scan options, maybe start an inquiry, or open the full page. Right now it's essentially the full `/studio/drop-and-elevate` page dropped into a panel. That creates a long scroll before the primary action (the form).

**Impact:** High scroll cost, form easy to miss, inconsistent with the Code Drops embed.

### 2. Redundant hierarchy

Users see three layers of headings before acting:

- Offcanvas header: **"Drop & Elevate"**
- Section: **"Services offered"**
- Banner: **"Start a project"** + 3-step list

That's a lot of chrome for a drawer whose job is "what do you offer, and how do I reach you?"

### 3. Form is buried

The inquiry form lives at the **bottom** of a gradient banner after six service cards and explanatory copy. On a full-screen tablet drawer, that's 2–3 screens of scrolling before "Send email" is visible.

### 4. Service cards are passive

The six services are static panels. The same services appear again in the dropdown. Tapping a service doesn't pre-select it or scroll to the form — a missed connection between browsing and converting.

### 5. No embed-specific density

Code Drops tightened padding, typography, and card size under `.portal-offcanvas__scroll-area .cd-embed`. Drop & Elevate still uses full `studio-website__panel` cards with Bodoni titles at desktop scale — heavy in a narrow scroll area.

### 6. Copy inconsistency

The confirmation state still surfaces `cloud@clouddropdesigns.com`, while the site footer recently de-emphasized direct email. Minor, but it weakens the "drawer as teaser, full page for contact" story.

---

## Suggested Direction: `de-embed` (Parity with Code Drops)

A dedicated embed variant would align Drop & Elevate with the portal pattern established by Code Drops.

| Element | Full page (keep) | Offcanvas embed (new) |
|--------|------------------|------------------------|
| Section heads | "Services offered", "Start a project" | Hide — offcanvas title is enough |
| Services | 6 full panels, 2-col grid | Compact single-column rows (title + 1-line, ~`0.7rem` padding) |
| Lead line | — | e.g. `6 services · design, dev & support` (mirrors `cd-embed__count`) |
| Inquiry block | Full banner + steps + side-by-side form | Minimal: service select + email + "Send email" only |
| 3-step list | Show | Hide or collapse to one line |
| Service interaction | Static | Tap row → pre-fill service + scroll/focus form |

**Optional polish:** Sticky bottom bar in the offcanvas with service + email when the user has scrolled past the first screen — keeps conversion visible without re-reading six cards.

---

## Visual Tweaks (if adding `de-embed`)

- Reduce card padding and title size under `.portal-offcanvas__scroll-area .de-embed` (same approach as Code Drops).
- Use a **single accent** for service titles/links in the drawer; per-project accents aren't needed here.
- Soften or remove the inquiry gradient banner in embed — it reads as a second hero inside an already-headed panel.
- Add a subtle selected state when a service row is tapped (border or accent dot).

---

## Information Architecture Recommendation

Treat the three portal drawers with different jobs:

1. **Code Drops** — browse & open (list + external links) ✓ already done
2. **Drop & Elevate** — browse services & start inquiry (compact list + short form) ← needs embed variant
3. **Get Professional** — profile teaser + "Start project" (modal) — still heavy, but inquiry is modal-driven

For Drop & Elevate specifically: **services first, form second, everything else on the full page**. On tablet, "Open Full Page" is hidden in the offcanvas header — consider a text link in the embed lead: "View full services page →".

---

## Quick Wins vs. Fuller Fix

### Quick wins (CSS only, no JSX split)

- Hide `.studio-website__section-head` and `.de-wide__inquiry-steps` inside `.portal-offcanvas__scroll-area`
- Tighten `.de-wide__service` padding and font sizes in offcanvas
- Stack inquiry intro above form with less copy

### Proper fix (recommended)

- Add `de-embed` JSX branch like `cd-embed`
- Wire service-row click → `setService(item.id)`
- Shorten confirmation copy if email stays out of the footer

---

## Implementation Sketch

### JSX (`DropAndElevatePage.jsx`)

```jsx
if (embed) {
  return (
    <div className="de-embed">
      <p className="de-embed__lead">
        <span className="de-embed__count">
          {DROP_ELEVATE_SERVICES.length} services · design, dev &amp; support
        </span>
        Tap a service to pre-fill your inquiry, or choose below.
      </p>

      <ul className="de-embed__list">
        {DROP_ELEVATE_SERVICES.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`de-embed__service${service === item.id ? ' is-selected' : ''}`}
              onClick={() => setService(item.id)}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </button>
          </li>
        ))}
      </ul>

      <div className="de-embed__inquiry">
        <InquiryForm {...formProps} />
      </div>
    </div>
  );
}
```

### SCSS (mirror `_codeDrops.scss`)

- `.de-embed` — max-width, lead line, list gap
- `.portal-offcanvas__scroll-area .de-embed .de-embed__service` — compact padding, smaller type
- `.de-embed__service.is-selected` — accent border or background tint

---

## Summary

The biggest issue isn't visual quality — the wide-page design is solid — it's **context**: the offcanvas is serving full-page content where users expect a **scannable, action-oriented preview**. Code Drops already sets that bar; Drop & Elevate is the outlier.

Recommended next step: implement a `de-embed` variant with compact service list, tap-to-select, stripped inquiry block, and offcanvas SCSS mirroring `_codeDrops.scss`.