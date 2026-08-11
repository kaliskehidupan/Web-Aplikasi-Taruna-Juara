# System Architecture Specification

## 1. High-Level Architecture Overview

The Taruna Juara Digital Platform employs a **Hybrid Headless Architecture**:

```text
[ React 18 SPA Frontend ] <--- (JSON-RPC / REST API) ---> [ Odoo Backend Core ] <---> [ PostgreSQL ]
  - Vite + TypeScript                                       - Custom Python Modules
  - Tailwind CSS + Framer Motion                            - Business Logic & Workflows
  - React Query + Axios                                     - ORM & Security Rules
```

---

## 2. Component Blueprint

### 2.1 Frontend Layer (Vite + React + TS)
- Single Page Application (SPA) serving Landing Page, PMB Form, Santri Portal, Ustadz Portal, and Alumni Hub.
- State management handled by React Query (server state) and React Context (UI/Auth state).

### 2.2 Backend Layer (Odoo 16/17 Core)
- Custom module `taruna_juara_core` managing Odoo models for Santri, Ustadz, Setoran, Tasmi', Asrama, and Alumni.
- Security enforcement via Odoo Access Control Lists (ACL) and Record Rules.

---

## 3. Communication Patterns

- **Authentication**: Session cookie / Bearer token via Odoo JSON-RPC login endpoint (`/web/session/authenticate`).
- **Data Querying**: React Query handles caching, background polling, and mutation optimistic updates.
