# Product Requirement Document (PRD)
## Taruna Juara Digital Platform

| Metadatas | Detail |
| --- | --- |
| **Nama Produk** | Taruna Juara Digital Platform |
| **Versi** | 2.0.0 (Full Native Odoo Architecture) |
| **Status** | Approved for Full Odoo Deployment |
| **Arsitektur** | Full Odoo Native Stack (Odoo Website QWeb + Web Controllers + Odoo ERP Core) |
| **Tanggal** | 11 Agustus 2026 |

---

## 1. Visi & Filosofi Produk

### 1.1 Visi Produk
> **"A modern digital ecosystem for managing, nurturing, and empowering every journey of a Qur'anic student."**

Taruna Juara Digital Platform adalah platform digital terpadu berbasis **Full Native Odoo Stack** yang mengelola seluruh *lifecycle* seorang mahasantri secara seamless:
1. **Prospective Student**: Mengenal Taruna Juara, melihat fasilitas asrama, & mendaftar online.
2. **Active Student (Mahasantri)**: Menjalani pembinaan tahfidz, murajaah, tasmi', dan kehidupan asrama.
3. **Alumni**: Tetap terhubung, menjaga hafalan, membangun jejaring karir dan silaturahmi.

### 1.2 Filosofi Produk & Mindset Pengembang
- **Integrated Single Platform**: Seluruh antarmuka publik (Website Landing Page, PMB Portal) dan backend administrasi (ERP Admin) berjalan secara terpadu di atas mesin Odoo 16 yang sama tanpa membutuhkan layer API eksternal yang kompleks.
- **Purposeful Design**: Menggunakan QWeb Templates Odoo dengan styling modern, responsif, dan siap produksi.
- **Single Source of Truth**: Semua data pendaftar, santri, ustadz, dan asrama tersimpan langsung di dalam database PostgreSQL Odoo.

---

## 2. Arsitektur Sistem & Strategi Teknologi

### 2.1 Arsitektur Full Odoo Stack

```text
                                TARUNA JUARA DIGITAL PLATFORM
                                             │
      ┌──────────────────────────────────────┴──────────────────────────────────────┐
      │                                                                             │
  PUBLIC WEBSITE & PMB PORTAL                                               INTERNAL ERP ADMIN
  (QWeb Templates, Web Controllers)                                         (Odoo Backend Views, ORM)
      │                                                                             │
      └──────────────────────────────────────┬──────────────────────────────────────┘
                                             │
                                   Odoo 16 Core Engine
                                   [Python, QWeb, Website, Portal]
                                             │
                                             ▼
                                     PostgreSQL Database
                                  [Single Source of Truth]
```

### 2.2 Pembagian Peran Teknologi

| Layer | Teknologi | Peran & Tanggung Jawab Utama |
| --- | --- | --- |
| **Website & Public UI** | **Odoo QWeb Templates**, Website Module, Bootstrap 5, FontAwesome | Menyuplai seluruh User Interface (UI/UX) Landing Page, Form PMB Modal, dan Portal Pelacakan Status. |
| **Controllers & Business Logic** | **Odoo Web Controllers (Python)**, ORM, Mail, Portal | Mengelola *routing*, pemrosesan form PMB, upload berkas KTP/KTM, otentikasi user, dan workflow approval. |
| **Database** | **PostgreSQL** | *Single source of truth* untuk seluruh akun, riwayat pendaftaran, hafalan, dan data kelembagaan. |
| **Deployment** | **Docker Compose** (`taruna_odoo` + `taruna_db`) | Deployment cepat terisolasi berbasis *High-Availability Containers*. |

---

## 3. Modul & Spesifikasi Fitur Utama

### Modul 1: Public Platform (Website Landing Page & Pendaftaran)
- **Hero & Branding Section**: Tampilan modern dengan tagline inspiratif dan ringkasan statistik capaian mahasantri.
- **Interactive Student Journey**: Timeline visual tahap pembinaan mahasantri dari nol hingga lulus 30 Juz.
- **Program & Facility Showcase**: Galeri interaktif rutinitas harian, tata tertib, profil ustadz/pengasuh, dan peta fasilitas kamar asrama.
- **Pendaftaran Online (PMB Modal)**:
  - Form pendaftaran interaktif dengan upload berkas fisik (KTP, KTM).
  - Penyimpanan berkas otomatis ke bidang *Binary Fields* Odoo `taruna.applicant`.
  - Halaman pelacakan status pendaftaran (`/pmb/status`).

### Modul 2: Santri & Ustadz Management (Odoo Core Addon)
- **Manajemen Pendaftar PMB (`taruna.applicant`)**: Verifikasi berkas, jadwal tes offline, hasil seleksi, dan konfirmasi check-in.
- **Manajemen Santri (`taruna.santri`)**: Data profil, total juz ziadah, murajaah, dan status aktif/alumni.
- **Manajemen Ustadz & Pembina (`taruna.ustadz`)**: Profil ustadz, spesialisasi, quote, dan halaqah bimbingan.
- **Manajemen Asrama & Kamar (`taruna.gedung` & `taruna.kamar`)**: Pengelolaan status kamar, kapasitas, dan alokasi bed mahasantri.

---

## 4. Tahapan Pengembangan (Product Roadmap)

```text
  Phase 1: Architecture Pivot & Cleanup
  ├── Remove unused React frontend directory and obsolete build configs
  └── Finalize Full Odoo Architecture PRD & Docker configuration

  Phase 2: Odoo Core & Website Module Setup
  ├── Configure Odoo models (Applicant, Santri, Ustadz, Gedung, Kamar)
  └── Create QWeb Templates & Web Controllers for Landing Page & PMB Portal

  Phase 3: Integration & Testing
  ├── Test PMB Registration Form submission & physical file uploads
  └── Verify status tracking lookup & Odoo ERP Admin views

  Phase 4: Final Deployment & Git Sync
  └── Commit & push clean codebase to branch 'saiful'
```

---

## 5. Kriteria Keberhasilan (Success Metrics / KPIs)

1. **Performance & Simplicity**: Satu server Odoo tunggal melayani seluruh antarmuka publik dan admin ERP tanpa latensi API eksternal.
2. **Reliability**: Pendaftaran PMB dan upload berkas tersimpan 100% secara fisik di database PostgreSQL Odoo.
3. **Clean Codebase**: Repository bebas dari folder/file sisa yang tidak digunakan.
