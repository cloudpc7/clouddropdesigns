# Home Page — Tablet UX/UI Design Proposal

Design for carrying the **mobile card aesthetic** onto tablet (768–1023px), mixing in **desktop content**, and using the **off-canvas glass drawer** for better UX — without changing mobile (`studio-mobile-only`).

---

## Summary

Tablet should feel like **mobile’s front card, always visible**, with **desktop proof and depth** beside or below it — not a third, fully separate layout.

**Yes, this is implementable** using existing wide-only breakpoints, `BusinessCardShell`, portal/off-canvas components, and scoped SCSS. Mobile code stays untouched.

---

## Design concept: “Card home + glass studio drawer”

### What to carry from mobile (look & feel, not flip code)

| Mobile element | Tablet translation |
|----------------|-------------------|
| Matte card frame, corners, texture | One centered **business-card shell** as the hero zone (~45–50% width or top band) |
| CloudDrop icon + slogan | Same focal hero — icon, “Drop the Code & Elevate your Web,” minimal subtitle |
| Flip → studio nav on back | **No flip** — studio hubs as a **nav rail** or grid on/near the card (back-face content, always visible) |
| FlipPrompt | Soft hint: “Tap a studio section to preview” (not “flip the card”) |
| Compact footer | Slim contact strip under the card |

Mobile stays untouched; tablet **reuses the visual language** via wide-only SCSS/components.

### What to mix from desktop

| Desktop element | Tablet placement |
|-----------------|------------------|
| Portal hub stats + one-line descriptions | **2×2 hub tiles** on or beside the card (not a tall vertical list) |
| Featured Work (3 projects) | **Compact row** under the card — 2+1 or 3 small tiles |
| “Start a project” CTA | **Inside the card** under the slogan (not a separate banner) |
| Full `SiteFooter` | Below the fold — acceptable on tablet |

---

## Layout sketch (768–1023px)

```
┌─────────────────────────────────────────────────────────┐
│  [Site header — existing StudioWebsiteLayout]           │
├──────────────────────────┬──────────────────────────────┤
│  ┌─ card frame ────────┐ │  Studio Portal (2×2)         │
│  │  CloudDrop icon      │ │  [Code Drops] [Drop & Elevate]│
│  │  Slogan              │ │  [Get Pro]    [Skilled]      │
│  │  [Start a project]   │ │  each opens drawer →         │
│  └────────────────────┘ │                              │
├──────────────────────────┴──────────────────────────────┤
│  Featured Work — 3 compact tiles                        │
├─────────────────────────────────────────────────────────┤
│  Site footer                                            │
└─────────────────────────────────────────────────────────┘
```

### Orientation

- **Portrait tablet:** card full-width on top → 2×2 grid → featured row (~1–1.25 viewports).
- **Landscape tablet:** card left, hub grid right — closest to **one screen, minimal scroll**.

---

## Off-canvas sidebar — why it fits

Existing `portal-offcanvas` (glass blur, badge header, embed scroll, “Open Full Page”) should become a **studio drawer** on tablet, not a near-full-screen panel.

| Today (desktop) | Tablet target |
|-----------------|---------------|
| `min(72rem, 94vw)` wide | **`min(28rem, 88vw)`** — true sidebar |
| Forced `data-theme="dark"` | **Respect user theme** |
| Only entry: portal list click | **Primary:** hub tile tap · **Secondary:** “Open full page” in header |
| Feels like a different app | Feels like **sliding the card open** to reveal studio content |

### UX flow

1. User lands on **card home** (mobile aesthetic).
2. Taps **Code Drops** (or any hub) → drawer slides from the right with existing glass styling.
3. Card + backdrop dim — context stays visible on the left (“still on the card”).
4. Header: badge + title + **Open full page →** + close.
5. Body: existing embed (`CodeDropsPage embed`, etc.) — no duplicate content.

This addresses the home-page review weak point: preview becomes **progressive disclosure**; **direct navigation** remains one tap in the drawer header.

---

## What makes this good UX/UI

1. **Continuity** — Phone = flip card; tablet = same card, no flip, hubs visible. Desktop can stay portal-first or evolve later.
2. **Less scroll** — Card + 2×2 grid fits one band; featured work is one row, not two stacked section walls.
3. **Off-canvas earns its place** — Sidebar preview on tablet is natural; 94vw panel on tablet felt like leaving the home page.
4. **Clear hierarchy** — Card = brand + CTA; hubs = explore; drawer = depth; tiles = proof.

---

## Implementation scope (tablet / wide only)

All changes can live under:

- `studio-wide-only`
- `@media (min-width: 768px) and (max-width: 1023px)`
- Tablet overrides on `.portal-offcanvas__panel` width and theme
- New `.home-tablet` layout wrapper in `HomePage` / `_home.scss`

**Do not modify:** `studio-mobile-only`, flip card, or mobile `HomeStudio` back face.

### Reuse as-is

- `BusinessCardShell`
- `Hero` (or slim wide-only hero variant)
- `PortalListCard` or new 2×2 hub grid
- `portal-offcanvas` structure + embeds
- `ProjectShowcaseTile`

---

## Suggested build order

1. Tablet layout shell — card + 2×2 hub grid
2. Narrow off-canvas at 768–1023px
3. Compact featured work row
4. Theme-aware drawer (remove forced dark on tablet/desktop)

---

## Related doc

See [`home-page-review.md`](./home-page-review.md) for full home page strengths, weaknesses, and desktop priorities.

---

*Proposal date: July 2026*