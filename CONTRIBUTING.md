# Contributing Guidelines

Thank you for contributing to **Taruna Juara Digital Platform**! We welcome contributions from developers, designers, and domain experts committed to empowering Qur'anic education through modern technology.

---

## 🤝 Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

---

## 🌿 Git Branching Strategy

We follow a structured Gitflow-inspired branching convention:

- `main`: Production-ready code only.
- `develop`: Integration branch for active development.
- `feature/<feature-name>`: New feature implementations.
- `bugfix/<issue-description>`: Bug fixes for reported issues.
- `release/vX.Y.Z`: Release candidate preparation.

See detailed rules in [docs/04-development/GIT_WORKFLOW.md](docs/04-development/GIT_WORKFLOW.md).

---

## 🛠 Local Development Setup

1. Fork & clone the repository:
   ```bash
   git clone https://github.com/tarunajuara/taruna-juara-platform.git
   ```
2. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
3. Boot up environment via Makefile:
   ```bash
   make dev
   ```

---

## 📝 Pull Request Checklist

Before submitting a PR:
- [ ] Code adheres to our [Coding Standards](docs/04-development/CODING_STANDARDS.md).
- [ ] TypeScript types are strict with zero `any` usages.
- [ ] Frontend changes adhere to our [UI/UX Guidelines](docs/03-design/UI_UX_GUIDELINES.md).
- [ ] All linters & tests pass cleanly (`npm run lint`, `npm test`).
- [ ] Commit messages follow conventional commits format (`feat: ...`, `fix: ...`, `docs: ...`).
