# Taruna Juara Digital Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Architecture](https://img.shields.io/badge/Architecture-Hybrid%20React%20%2B%20Odoo-blue.svg)](docs/04-development/ARCHITECTURE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg)](https://reactjs.org/)
[![Odoo](https://img.shields.io/badge/Odoo-16.0%2B%20%2F%2017.0%2B-714B67.svg)](https://www.odoo.com/)

An enterprise-grade, modern digital ecosystem designed to manage, nurture, and empower every journey of a Qur'anic student (*Mahasantri*) at **Rumah Tahfidz Taruna Juara**.

---

## 🏛 Vision & Philosophy

> **"A modern digital ecosystem for managing, nurturing, and empowering every journey of a Qur'anic student."**

Taruna Juara Digital Platform bridges branding, online student admissions (PMB), daily tahfidz progress tracking, halaqah nurturing by Ustadz, post-graduation alumni relations, and institutional data analytics into a single cohesive experience.

### Core Philosophy
- **Experience-Driven**: Prioritizing student and ustadz delight over generic administrative forms.
- **Data with Purpose**: Every progress bar, chart, and metric explains the condition in seconds.
- **Hybrid Architecture**: React acts as the expressive, high-performance UI ("The Face"), while Odoo powers business logic, security workflows, and data orchestration ("The Brain").

---

## 🏗 System Architecture

```text
                                TARUNA JUARA DIGITAL PLATFORM
                                             │
      ┌──────────────────────────────────────┴──────────────────────────────────────┐
      │                                                                             │
  PUBLIC PLATFORM                                                           INTERNAL PORTALS
  (Landing Page, PMB Registration)                                          (Santri, Ustadz, Alumni, Admin)
      │                                                                             │
      └──────────────────────────────────────┬──────────────────────────────────────┘
                                             │
                                  React 18 + Vite + TS (SPA)
                                  [Tailwind CSS, Framer Motion]
                                             │
                                             │ JSON-RPC / REST API
                                             ▼
                                     Odoo Backend Core
                                   [Python, Business Logic, ORM]
                                             │
                                             ▼
                                     PostgreSQL Database
                                  [Single Source of Truth]
```

---

## 📁 Repository Directory Structure

```text
taruna-juara/
├── docs/               # Complete Project & Technical Documentation
├── design/             # Design System, Wireframes, Branding & Animations
├── frontend/           # React + Vite + TypeScript Application Shell
├── backend/            # Odoo Custom Addons, Configs & Scripts
├── database/           # Init SQL Scripts, Migrations & Seeds
├── docker/             # Container Definitions (Dockerfile for Frontend, Backend, Nginx)
├── deployment/         # Production & Staging Deployment Configs
├── scripts/            # Developer Automations & Build Scripts
├── testing/            # Frontend, Backend, E2E & Performance Tests
├── assets/             # Branding Media, Logos, Fonts & Documents
├── infrastructure/     # Infrastructure as Code & Server Configurations
└── .github/            # GitHub Actions CI/CD Workflows & Templates
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or LTS
- **Docker & Docker Compose**: v2.x+
- **Python**: v3.10+ (for local Odoo development)
- **Git**: v2.35+

### Quick Local Setup with Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tarunajuara/taruna-juara-platform.git
   cd taruna-juara-platform
   ```

2. **Setup Environment Variables**:
   ```bash
   cp .env.example .env
   ```

3. **Start Core Services**:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the Applications**:
   - **Frontend App**: [http://localhost:3000](http://localhost:3000)
   - **Odoo Backend Core**: [http://localhost:8069](http://localhost:8069)
   - **Nginx Reverse Proxy**: [http://localhost:80](http://localhost:80)

---

## 📑 Complete Documentation Index

All architectural, business, and developer guidelines are organized in the [`docs/`](docs/) directory:

- [Project Governance & Overview](docs/00-project/PROJECT_GOVERNANCE.md)
- [Product Vision](docs/01-product/PRODUCT_VISION.md)
- [Product Requirement Document (PRD)](docs/01-product/PRD.md)
- [Business Rules & Workflows](docs/02-business/BUSINESS_RULES.md)
- [UI/UX Design Language](docs/03-design/UI_UX_GUIDELINES.md)
- [Animation & Motion Guidelines](docs/03-design/ANIMATION_GUIDELINES.md)
- [System Architecture Specification](docs/04-development/ARCHITECTURE.md)
- [Database Schema & Design](docs/04-development/DATABASE_DESIGN.md)
- [API Specification (JSON-RPC / REST)](docs/04-development/API_DOCUMENTATION.md)
- [Frontend Engineering Guidelines](docs/04-development/FRONTEND_GUIDELINES.md)
- [Backend (Odoo) Engineering Guidelines](docs/04-development/BACKEND_GUIDELINES.md)
- [Coding Standards & Conventions](docs/04-development/CODING_STANDARDS.md)
- [Git Branching & PR Workflow](docs/04-development/GIT_WORKFLOW.md)
- [Quality Assurance & Testing Guide](docs/05-testing/TESTING_GUIDE.md)
- [Production Deployment Guide](docs/06-deployment/DEPLOYMENT_GUIDE.md)
- [Release Process & Versioning](docs/06-deployment/RELEASE_PROCESS.md)

---

## 🛡 Security & Governance

Please review our [SECURITY.md](SECURITY.md) for vulnerability disclosure policies, and read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before participating in development.

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE). Copyright © 2026 Rumah Tahfidz Taruna Juara.
