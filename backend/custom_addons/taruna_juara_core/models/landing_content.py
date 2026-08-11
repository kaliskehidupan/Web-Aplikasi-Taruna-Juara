# -*- coding: utf-8 -*-
from odoo import models, fields, api

class TarunaLandingHero(models.Model):
    _name = 'taruna.landing.hero'
    _description = 'CMS Landing Page Hero Section'

    name = fields.Char(string='Nama Konfigurasi', default='Hero Section Utama', required=True)
    title = fields.Char(string='Headline Utama', required=True, default='Mencetak Generasi Rabbani & Pemimpin Juara')
    subtitle = fields.Text(string='Deskripsi Subtitle', default='Platform terintegrasi pembinaan mahasantri tahfidz Al-Qur\'an, kepemimpinan, dan kewirausahaan berbasis karakter Rabbani.')
    cta_primary_text = fields.Char(string='Teks Tombol Utama', default='Daftar PMB 2026')
    cta_secondary_text = fields.Char(string='Teks Tombol Sekunder', default='Jelajahi Asrama & Program')
    hero_image = fields.Binary(string='Foto / Gambar Hero')
    active = fields.Boolean(string='Aktif', default=True)

    # Statistic Cards
    stat_santri_count = fields.Integer(string='Jumlah Mahasantri', default=150)
    stat_hafalan_target = fields.Char(string='Target Hafalan', default='30 Juz')
    stat_scholarship_rate = fields.Char(string='Persentase Beasiswa', default='100%')
    stat_alumni_success = fields.Char(string='Tingkat Kelulusan', default='98%')


class TarunaLandingVisionMission(models.Model):
    _name = 'taruna.landing.vision_mission'
    _description = 'CMS Visi & Misi'

    name = fields.Char(string='Judul Konfigurasi', default='Visi & Misi Utama', required=True)
    vision_text = fields.Text(string='Teks Visi Utama', required=True, default='Menjadi pusat keunggulan pencetak huffazh Al-Qur\'an yang berjiwa pemimpin, mandiri, dan berdaya saing global pada tahun 2030.')
    mission_1 = fields.Text(string='Misi 1: Al-Qur\'an', default='Menyelenggarakan pendidikan tahfidz Al-Qur\'an 30 Juz secara mutqin dengan pemahaman tafsir Rabbani.')
    mission_2 = fields.Text(string='Misi 2: Kepemimpinan', default='Membentuk karakter kepemimpinan, kedisiplinan, dan etika Islam yang kuat.')
    mission_3 = fields.Text(string='Misi 3: Entrepreneurship', default='Mengembangkan potensi akademik, kewirausahaan, dan teknologi informasi mahasantri.')
    active = fields.Boolean(string='Aktif', default=True)


class TarunaLandingKegiatan(models.Model):
    _name = 'taruna.landing.kegiatan'
    _description = 'CMS Rutinitas & Kegiatan Harian'
    _order = 'sequence, jam_mulai asc'

    name = fields.Char(string='Nama Kegiatan', required=True)
    jam_mulai = fields.Char(string='Jam Mulai (misal: 04:00)', required=True)
    jam_selesai = fields.Char(string='Jam Selesai (misal: 05:30)')
    kategori = fields.Selection([
        ('ibadah', 'Ibadah & Zikir'),
        ('tahfidz', 'Tahfidz & Setoran'),
        ('akademik', 'Akademik & Kuliah'),
        ('pengembangan', 'Pengembangan Diri'),
        ('istirahat', 'Istirahat & Olahraga')
    ], string='Kategori', default='tahfidz', required=True)
    deskripsi = fields.Text(string='Deskripsi Kegiatan')
    sequence = fields.Integer(string='Urutan Tampil', default=10)
    active = fields.Boolean(string='Aktif', default=True)


class TarunaLandingJourney(models.Model):
    _name = 'taruna.landing.journey'
    _description = 'CMS Alur Pendidikan (Student Journey)'
    _order = 'step_number asc'

    step_number = fields.Integer(string='Nomor Tahap', required=True, default=1)
    title = fields.Char(string='Nama Tahapan', required=True)
    duration = fields.Char(string='Durasi / Semester', default='Semester 1-2')
    target_hafalan = fields.Char(string='Target Hafalan', default='10 Juz Mutqin')
    description = fields.Text(string='Deskripsi Program')
    badge_color = fields.Selection([
        ('blue', 'Biru (Awal)'),
        ('emerald', 'Hijau (Menengah)'),
        ('amber', 'Kuning (Lanjutan)'),
        ('purple', 'Ungu (Kelulusan)')
    ], string='Warna Badge', default='blue')
    active = fields.Boolean(string='Aktif', default=True)


class TarunaLandingTataTertib(models.Model):
    _name = 'taruna.landing.tata_tertib'
    _description = 'CMS Peraturan & Tata Tertib'
    _order = 'kategori, sequence asc'

    name = fields.Char(string='Judul Aturan / Poin', required=True)
    kategori = fields.Selection([
        ('kewajiban', 'Kewajiban Utama'),
        ('larangan', 'Larangan & Kedisiplinan'),
        ('sanksi', 'Ketentuan Sanksi'),
        ('penghargaan', 'Penghargaan & Apresiasi')
    ], string='Kategori Rules', default='kewajiban', required=True)
    poin = fields.Integer(string='Bobot Poin (Pelanggaran/Penghargaan)', default=10)
    deskripsi = fields.Text(string='Penjelasan Detail Aturan')
    sequence = fields.Integer(string='Urutan Tampil', default=10)
    active = fields.Boolean(string='Aktif', default=True)


class TarunaLandingPMBBatch(models.Model):
    _name = 'taruna.landing.pmb_batch'
    _description = 'CMS Gelombang PMB (Pendaftaran)'

    name = fields.Char(string='Nama Gelombang PMB', required=True, default='PMB Angkatan 2026/2027 Gelombang 1')
    date_start = fields.Date(string='Tanggal Buka', required=True)
    date_end = fields.Date(string='Tanggal Tutup', required=True)
    quota = fields.Integer(string='Kuota Penerimaan', default=30)
    is_open = fields.Boolean(string='Status Pendaftaran Dibuka', default=True)
    requirements = fields.Text(string='Syarat & Ketentuan', default='1. Mahasiswa aktif perguruan tinggi Yogyakarta\n2. Memiliki komitmen hafalan 30 Juz\n3. Lulus seleksi berkas & tes offline')
    tracks_info = fields.Text(string='Rincian Beasiswa & Program')


class TarunaPengurus(models.Model):
    _name = 'taruna.pengurus'
    _description = 'Struktur Kepengurusan & Organisasi'
    _order = 'sequence, name asc'

    name = fields.Char(string='Nama Lengkap', required=True)
    position = fields.Char(string='Jabatan / Posisi', required=True)
    division = fields.Selection([
        ('pimpinan', 'Pimpinan / Direktur'),
        ('pendidikan', 'Divisi Tahfidz & Pendidikan'),
        ('kesantrian', 'Divisi Keasramaan & Kesantrian'),
        ('operasional', 'Divisi Keuangan & Operasional'),
        ('humas', 'Divisi Humas & Media')
    ], string='Divisi', default='pendidikan', required=True)
    photo = fields.Binary(string='Foto Pengurus')
    phone = fields.Char(string='Nomor Kontak')
    email = fields.Char(string='Email')
    sequence = fields.Integer(string='Urutan Tampil', default=10)
    active = fields.Boolean(string='Aktif', default=True)
