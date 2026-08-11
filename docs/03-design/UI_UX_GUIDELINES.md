# UI/UX Design Guidelines

## 1. Design Language & Aesthetics

- **Primary Brand Color**: Energetic Warm Orange (`#F97316` / `#EA580C`)
- **Secondary Neutral**: Clean White (`#FFFFFF`), Soft Neutral Gray (`#F4F4F5`), Dark Slate (`#0F172A`)
- **Corner Radii**: Generous rounded corners (`rounded-2xl` = 1rem, `rounded-3xl` = 1.5rem)
- **Typography**: Inter / Outfit (Google Fonts)

---

## 2. Layout & Spacing Principles

- **Mobile-First Layout**: Every component must adapt responsively from mobile view (375px) to desktop (1440px+).
- **Whitespace**: Maintain generous padding to create a breathable, clean visual hierarchy.
- **Glassmorphism**: Soft background blur overlays (`backdrop-blur-md bg-white/80`) for modal dialogs and navigation bars.

---

## 3. Component Hierarchy & Patterns

- **Cards**: Soft shadows (`shadow-sm` hover `shadow-md`), clear titles, and dynamic micro-badges.
- **Form Inputs**: Floating labels or clear top labels with real-time Zod validation feedback.
- **Charts**: Use ECharts with warm orange gradients and soft hover tooltips.
