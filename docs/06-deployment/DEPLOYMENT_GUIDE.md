# Production Deployment Guide

## 1. Environment Architecture

- **Frontend Hosting**: Vercel / Netlify CDN with automated CI/CD triggers on `main` branch pushes.
- **Backend Server**: Ubuntu Server (20.04/22.04 LTS) running Docker Compose orchestrating Odoo, PostgreSQL, and Nginx Reverse Proxy with Let's Encrypt SSL certificates.

---

## 2. Server Deployment Commands

```bash
# SSH into Ubuntu Server
ssh deploy@server.tarunajuara.org

# Pull Latest Changes & Rebuild Containers
cd /var/www/taruna-juara-platform
git pull origin main
docker-compose -f docker-compose.prod.yml up -d --build
```
