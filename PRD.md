# Product Requirement Document (PRD)
## Taruna Juara Digital Platform

| Metadatas | Detail |
| --- | --- |
| **Nama Produk** | Taruna Juara Digital Platform |
| **Versi** | 1.0.0 |
| **Status** | Approved for Architecture & Design Phase |
| **Arsitektur** | Hybrid Headless Architecture (React Frontend + Odoo Backend) |
| **Tanggal** | 5 Agustus 2026 |

---

## 1. Visi & Filosofi Produk

### 1.1 Visi Produk
> **"A modern digital ecosystem for managing, nurturing, and empowering every journey of a Qur'anic student."**

Taruna Juara Digital Platform adalah platform digital terpadu yang mengelola seluruh *lifecycle* seorang mahasantri secara seamless:
1. **Prospective Student**: Mengenal Taruna Juara & mendaftar online.
2. **Active Student (Mahasantri)**: Menjalani pembinaan tahfidz, murajaah, tasmi', dan kehidupan asrama.
3. **Alumni**: Tetap terhubung, menjaga hafalan, membangun jejaring karir dan silaturahmi.

Platform ini tidak dirancang sebagai sekadar sistem administrasi ERP yang kaku, melainkan sebagai pusat operasional, media pembinaan, sarana komunikasi interaktif, dan representasi digital utama dari Rumah Tahfidz Taruna Juara.

### 1.2 Filosofi Produk & Mindset Pengembang
- **Experience-Driven**: Bukan sekadar *"Bagaimana cara menyimpan data?"*, melainkan *"Bagaimana cara menciptakan pengalaman digital terbaik bagi seluruh keluarga besar Taruna Juara?"*
- **Purposeful Design**: Setiap halaman memiliki tujuan spesifik. Tidak ada elemen visual tanpa fungsi.
- **Data with Meaning**: Data tidak disajikan dalam tabel mentah, melainkan dalam bentuk visualisasi yang menjelaskan kondisi dan perkembangan dalam hitungan detik.
- **Living Interaction**: Antarmuka responsif, dinamis, dan diperkaya dengan micro-animation serta motion design yang memberikan kesan modern, warm, dan premium.

---

## 2. Arsitektur Sistem & Strategi Teknologi

### 2.1 Arsitektur Hybrid: "React sebagai Wajah, Odoo sebagai Otak"

```text
                                TARUNA JUARA DIGITAL PLATFORM
                                             │
      ┌──────────────────────────────────────┴──────────────────────────────────────┐
      │                                                                             │
  PUBLIC PLATFORM                                                           INTERNAL PORTALS
  (Landing Page, Info, Pendaftaran)                                         (Santri, Alumni, Ustadz, Admin)
      │                                                                             │
      └──────────────────────────────────────┬──────────────────────────────────────┘
                                             │
                                   React Frontend (SPA / SSG)
                                  [Tailwind, Framer Motion, Charts]
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

### 2.2 Pembagian Peran Teknologi

| Layer | Teknologi | Peran & Tanggung Jawab Utama |
| --- | --- | --- |
| **Frontend (The Face)** | **React**, TypeScript, Vite, Tailwind CSS, Framer Motion, Chart.js / ECharts, Lottie | Menyuplai seluruh User Interface (UI/UX), animasi halaman, visualisasi grafik hafalan, portal personal, responsive mobile-first experience, dark mode, dan performa tinggi tanpa rasa "ERP kaku". |
| **Backend (The Brain)** | **Odoo Core**, Python, ORM, Role & Permission System | Mengelola *business logic*, otentikasi user, otorisasi hak akses, workflow approval, otomasi email/notifikasi, sinkronisasi data, dan pelaporan keuangan/administrasi. |
| **Database** | **PostgreSQL** | *Single source of truth* untuk seluruh akun, riwayat hafalan, transaksi, dan data kelembagaan. |
| **Deployment** | **Vercel** (Frontend) + **Ubuntu / Docker / Nginx** (Backend Odoo) | *High-availability hosting*, CI/CD deployment cepat untuk frontend, serta server backend terisolasi dan aman. |

---

## 3. Modul & Spesifikasi Fitur Utama

### Modul 1: Public Platform (Landing Page & Pendaftaran)
- **Hero & Branding Section**: Tampilan modern penuh impresi dengan latar hangat, tagline inspiratif, dan animasi pengenalan Taruna Juara.
- **Interactive Student Journey**: Timeline visual mengenai tahap pembinaan mahasantri dari nol hingga lulus 30 Juz.
- **Program & Facility Showcase**: Galeri interaktif mengenai program tahfidz, kehidupan asrama, profil ustadz/pengasuh, dan kegiatan harian.
- **Pendaftaran Online (PMB)**:
  - Form pendaftaran multi-step dengan validasi langsung.
  - Upload berkas (KTP, KK, ijazah) dengan feedback visual real-time.
  - Tracking status pendaftaran via nomor registrasi/akun.

### Modul 2: Santri Portal (Ruang Pribadi Mahasantri)
- **Personal Dashboard**:
  - Greeting personal dan visualisasi statistik hafalan (Capaian Juz, Ziadah bulan ini, Murajaah mingguan).
  - Target Hafalan Hari Ini (Personalized Daily Target Widget).
- **Hafalan & Murajaah Tracker**:
  - Chart progres hafalan per Surah/Juz dengan indikator warna kelancaran.
  - Form mandiri penandaan murajaah harian.
- **Tasmi' & Ujian Module**:
  - Pengajuan jadwal pendaftaran Tasmi' (1 Juz, 5 Juz, 10 Juz, 30 Juz).
  - Riwayat nilai dan catatan evaluasi dari Ustadz.
- **Jadwal & Pengumuman**: Jadwal kegiatan harian, giliran piket/tugas, dan papan pengumuman internal.

### Modul 3: Ustadz Portal (Pusat Pembinaan & Monitoring)
- **Monitoring Halaqah / Kelompok**:
  - Dashboard agregat kelompok bimbingan.
  - Daftar santri aktif beserta grafik kemajuan hafalan masing-masing.
- **Early Warning System (Santri Perlu Perhatian)**: Deteksi otomatis santri yang mengalami penurunan konsistensi ziadah/murajaah agar ustadz dapat langsung melakukan pendampingan (*nurturing*).
- **Input Evaluasi & Setoran**:
  - Modul quick-input setoran harian (Ziadah/Murajaah) santri.
  - Form penilaian Tasmi' & catatan karakter/kedisiplinan.
- **Statistik & Rekapitulasi**: Laporan mingguan/bulanan per halaqah yang siap diunduh atau dipresentasikan.

### Modul 4: Alumni Portal (Jejaring & Pemeliharaan Hafalan)
- **Post-Graduation Murajaah Hub**: Fitur pemeliharaan hafalan alumni dengan reminder dan check-in murajaah harian.
- **Tracer Study & Career Network**:
  - Pendataan aktivitas alumni (studi lanjut, karir, pengabdian, wirausaha).
  - Direktori alumni interaktif berbasis peta/lokasi dan keahlian.
- **Silaturahmi & Event Calendar**: Informasi reuni, kajian khusus alumni, dan forum jejaring sesama mahasantri.

### Modul 5: Admin & Institutional Analytics Portal (Integrasi Odoo Backend)
- **Master Data Management**: Pengelolaan data santri, ustadz, alumni, kamar/asrama, dan perkuliahan/kampus asal.
- **Asrama & Bed Allocation**: Status kamar visual (terisi, kosong, perawatan).
- **Financial & Beasiswa Workflow**: Manajemen beasiswa santri, donasi, dan operasional lembaga.
- **Role-Based Access Control (RBAC)**: Pengaturan hak akses terpusat berbasis aturan Odoo Security Groups.

---

## 4. Visual Language & Motion Design System

### 4.1 Color Palette & Theme
- **Primary Accent**: Energetic Warm Orange (`#F97316` / `#EA580C`) — Membawa kesan semangat, pemuda, dan kehangatan.
- **Secondary / Neutral**: Clean White (`#FFFFFF`), Soft Warm Gray (`#FAFAFA` / `#F4F4F5`), Charcoal Dark (`#18181B`).
- **Accent Success/Warning**: Emerald Green for Hafalan Completed, Amber for Pending Review.
- **Corner Radius**: Large rounded corners (`rounded-2xl`, `rounded-3xl`) memberikan kesan modern, friendly, dan *approachable*.

### 4.2 Motion & Animation Principles (Framer Motion & Lottie)
- **Page Transitions**: Smooth fade & slide transitions saat berpindah modul/portal.
- **Scroll-Driven Reveal**: Elemen card dan statistik muncul secara sekuensial (*staggered*) saat pengguna melakukan scroll.
- **Interactive Micro-Animations**: Button click feedback, progress bar animation saat data bertambah, dan konfeti/celebration effect saat santri mencapai milestone hafalan baru.
- **Lightweight Loading States**: Skeleton screens dan spinner animasi halus yang mencegah rasa *lag*.

### 4.3 Data Visualization Standards
- **Radial Progress Chart**: Menampilkan persentase pencapaian 30 Juz santri.
- **Interactive Heatmap**: Visualisasi konsistensi murajaah harian (gaya GitHub contribution chart).
- **Line & Bar Charts**: Perkembangan ziadah per bulan vs target lembaga.
- **Clean Tooltips**: Informasi detail muncul saat hover tanpa menutupi area utama.

---

## 5. Tahapan Pengembangan (Product Roadmap)

```text
  Phase 1: Discovery & Requirements
  ├── Understand Taruna Juara business processes & user workflows
  └── Finalize PRD & technical architecture

  Phase 2: Design System & UX Prototyping
  ├── Define Tailwind tokens, color palette, typography & motion guidelines
  └── Build High-Fidelity UI/UX prototypes in Figma

  Phase 3: Headless Odoo Backend Setup
  ├── Configure Odoo models (Santri, Hafalan, Ustadz, Alumni, Asrama)
  └── Expose JSON-RPC / REST APIs for authentication & CRUD operations

  Phase 4: Frontend Development (React + Vite)
  ├── Public Landing Page & Online Registration
  ├── Santri Portal & Visual Progress Dashboard
  ├── Ustadz Nurturing Dashboard & Evaluation Forms
  └── Alumni Hub & Tracer Study

  Phase 5: Integration, QA & Deployment
  ├── End-to-End API Integration & Security Audit
  ├── Mobile Responsiveness & Performance Testing
  └── Deploy Frontend (Vercel) & Backend (Ubuntu Server / Docker)
```

---

## 6. Kriteria Keberhasilan (Success Metrics / KPIs)

1. **User Experience & Satisfaction**: Rating kepuasan tinggi dari Santri & Ustadz atas kemudahan penggunaan aplikasi.
2. **Data-Driven Nurturing**: Penurunan jumlah santri yang terlambat target hafalan berkat *Early Warning System* pada Portal Ustadz.
3. **Alumni Retention**: Minimal 70% alumni tetap aktif mencatatkan murajaah dan terhubung dalam tracer study.
4. **Performance & Speed**: First Contentful Paint (FCP) < 1.2 detik pada Landing Page & Dashboard Portal.
5. **Brand Image**: Meningkatnya reputasi digital Rumah Tahfidz Taruna Juara sebagai lembaga pencetak huffazh modern bertaraf profesional.
