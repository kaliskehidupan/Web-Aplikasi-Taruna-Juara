# Git Branching Strategy & Workflow

## 1. Branch Hierarchy

```text
main (Production)
  └── release/v1.0.0
       └── develop (Integration)
            ├── feature/santri-dashboard
            ├── feature/ustadz-nurturing
            └── bugfix/setoran-validation
```

---

## 2. Conventional Commit Standards

Every commit message must follow the Conventional Commits format:

- `feat(santri)`: Add daily murajaah heatmap component
- `fix(auth)`: Resolve session expiration bug on Odoo RPC call
- `docs(prd)`: Update PRD with Ustadz nurturing requirements
- `style(theme)`: Update warm orange color tokens in Tailwind config
- `refactor(api)`: Standardize Axios response interceptor error messages
