# Backend (Odoo) Engineering Guidelines

## 1. Custom Addon Structure (`backend/custom_addons/taruna_juara_core/`)

```text
taruna_juara_core/
├── __manifest__.py     # Module manifest
├── __init__.py         # Python package init
├── models/             # Odoo ORM Models (santri.py, ustadz.py, setoran.py)
├── controllers/        # JSON-RPC / REST Controllers for React API
├── security/           # ir.model.access.csv & record rules
├── views/              # Odoo Backend XML Views (for Admin Portal)
└── data/               # Initial seed data XML/CSV
```

---

## 2. Python Coding Conventions

- PEP 8 compliance enforced.
- All ORM methods must include explicit docstrings and type hints.
- Database access must strictly respect Odoo security context (`self.env`).
