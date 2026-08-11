# Testing Guide & Quality Assurance

## 1. Testing Strategy Pyramid

- **Unit Testing**: Testing pure functions, utility modules, and individual React components.
- **Integration Testing**: Testing API service hooks and React Query cache mutations.
- **End-to-End (E2E) Testing**: Testing critical user flows (e.g. PMB online registration, setoran logging).

---

## 2. Test Execution Commands

```bash
# Frontend Unit Tests
cd frontend && npm run test

# Frontend End-to-End Tests
cd frontend && npm run test:e2e

# Backend Odoo Unit Tests
docker-compose exec backend odoo -c /etc/odoo/odoo.conf -i taruna_juara_core --test-enable
```
