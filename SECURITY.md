# Security Policy

## Supported Versions

Only the latest release of Taruna Juara Digital Platform receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of the Taruna Juara Digital Platform very seriously. If you discover a security vulnerability, please follow these steps:

1. **Do NOT open a public issue** on GitHub.
2. Send an email to `security@tarunajuara.org` containing details of the vulnerability, steps to reproduce, and potential impact.
3. Our core security team will acknowledge receipt of your vulnerability report within 48 hours and provide an estimated timeline for remediation.

## Security Practices
- All backend endpoints rely on Odoo's role-based access control (RBAC) and JSON-RPC session tokens.
- Frontend inputs are sanitized and validated using Zod schemas.
- Secrets and credentials must never be committed to Git repositories.
