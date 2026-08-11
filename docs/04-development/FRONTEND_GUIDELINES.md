# Frontend Engineering Guidelines

## 1. Directory Organization (`frontend/src/`)

```text
src/
├── components/     # Atomic reusable UI elements (Buttons, Inputs, Cards)
├── layouts/        # Page wrappers (AppLayout, AuthLayout, PublicLayout)
├── pages/          # Route views (LandingPage, SantriDashboard, UstadzDashboard)
├── modules/        # Feature-specific modules (HafalanTracker, TasmiRegistration)
├── hooks/          # Custom React hooks (useAuth, useHafalan, useWindowSize)
├── services/       # API connection layer & Axios instances
├── api/            # Direct Odoo RPC payload wrappers
├── assets/         # Static images, SVGs, Lottie JSON files
├── theme/          # Tailwind design tokens, colors & typography
├── animations/     # Framer Motion variants & presets
├── charts/         # Apache ECharts configuration helpers
├── utils/          # Pure helper functions & formatters
├── types/          # TypeScript interfaces & type definitions
├── contexts/       # React Context providers (AuthContext, ThemeContext)
└── routes/         # React Router configurations & Protected Routes
```

---

## 2. Component Design Standards

- **Strict TypeScript**: Every component must explicitly define its `props` interface. No `any` type allowed.
- **Functional Components**: Use arrow functions (`export const ComponentName: React.FC<Props> = ...`).
- **Tailwind Utility Classes**: Avoid arbitrary inline CSS styles. Use Tailwind utilities or CSS module variables.
