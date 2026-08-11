# -*- coding: utf-8 -*-
from odoo import models, fields, api
import random
import string

class TarunaApplicant(models.Model):
    _name = 'taruna.applicant'
    _description = 'Calon Mahasantri / Pendaftar PMB'
    _order = 'create_date desc'

    name = fields.Char(string='Nama Lengkap', required=True)
    registration_code = fields.Char(string='Kode Pendaftaran', required=True, readonly=True, copy=False, default=lambda self: self._generate_reg_code())
    nik = fields.Char(string='NIK (Nomor Induk Kependudukan)', required=True)
    phone = fields.Char(string='Nomor WhatsApp / HP', required=True)
    email = fields.Char(string='Email Aktif', required=True)
    
    # Academic & Origin
    university = fields.Char(string='Perguruan Tinggi / Universitas', default='Universitas Ahmad Dahlan')
    university_badge = fields.Char(string='Singkatan Kampus', default='UAD')
    faculty = fields.Char(string='Fakultas')
    major = fields.Char(string='Program Studi / Jurusan')
    semester = fields.Char(string='Semester', default='2')
    origin_city = fields.Char(string='Kota / Kabupaten Asal')
    
    # Quran & Motivation
    hafalan_count = fields.Char(string='Jumlah Hafalan Saat Ini (Juz)', default='5')
    target_juz = fields.Char(string='Target Hafalan', default='30')
    track = fields.Selection([
        ('beasiswa_full', 'Beasiswa Full Tahfidz'),
        ('beasiswa_parsial', 'Beasiswa Parsial'),
        ('reguler', 'Jalur Reguler Mandiri')
    ], string='Jalur Pendaftaran', default='beasiswa_full', required=True)
    quran_experience = fields.Text(string='Latar Belakang Pendidikan Agama / Pesantren')
    motivation = fields.Text(string='Motivasi Bergabung')

    # Documents Upload
    ktp_file = fields.Binary(string='File KTP')
    ktp_filename = fields.Char(string='Nama File KTP')
    ktm_file = fields.Binary(string='File KTM / Kartu Pelajar')
    ktm_filename = fields.Char(string='Nama File KTM')
    photo_file = fields.Binary(string='Pas Foto Resmi')
    photo_filename = fields.Char(string='Nama File Pas Foto')

    # Pipeline Stage & Verification
    stage = fields.Selection([
        ('1_DRAFT_PROFILE', '1. Draft Profil'),
        ('2_WAITING_VERIFICATION', '2. Menunggu Verifikasi Berkas'),
        ('3_OFFLINE_TEST_SCHEDULED', '3. Jadwal Tes Offline / Seleksi'),
        ('4_SELECTION_PASSED', '4. Diterima (Lulus Seleksi)'),
        ('4_SELECTION_REJECTED', '4. Ditolak (Belum Lulus)'),
        ('5_CHECKIN_CONFIRMATION', '5. Konfirmasi Masuk Asrama'),
        ('6_CONVERTED_SANTRI', '6. Resmi Menjadi Mahasantri')
    ], string='Tahapan Seleksi', default='2_WAITING_VERIFICATION', tracking=True)

    verification_status = fields.Selection([
        ('pending', 'Menunggu'),
        ('approved', 'Disetujui'),
        ('rejected', 'Ditolak')
    ], string='Status Verifikasi Berkas', default='pending')
    verification_date = fields.Datetime(string='Tanggal Verifikasi')
    verification_notes = fields.Text(string='Catatan Verifikasi Admin')

    # Offline Test Details
    test_date = fields.Date(string='Tanggal Tes Offline')
    test_time = fields.Char(string='Waktu Tes', default='08:30 - 11:30 WIB')
    test_location = fields.Char(string='Lokasi Tes', default='Aula Utama Asrama Taruna Juara')
    test_interviewer = fields.Char(string='Ustadz Penguji', default='Ustadz Dr. H. Ahmad Dahlan, M.A.')

    # Selection Result
    selection_result = fields.Selection([
        ('pending', 'Proses Seleksi'),
        ('passed', 'LULUS'),
        ('rejected', 'TIDAK LULUS')
    ], string='Hasil Akhir Seleksi', default='pending')
    selection_notes = fields.Text(string='Catatan Tim Penguji')

    # Dormitory Move-in / Check-in
    checkin_date = fields.Date(string='Rencana Tanggal Masuk Asrama')
    checkin_notes = fields.Text(string='Catatan Check-in')
    is_checkin_confirmed = fields.Boolean(string='Konfirmasi Masuk Asrama', default=False)

    # Link to Odoo User & Santri Record
    user_id = fields.Many2one('res.users', string='Akun Pengguna Odoo')
    santri_id = fields.Many2one('taruna.santri', string='Data Mahasantri (Setelah Lulus)')

    @api.model
    def _generate_reg_code(self):
        random_digits = ''.join(random.choices(string.digits, k=4))
        return f"PMB-2026-TJ-{random_digits}"

    def action_approve_verification(self):
        for rec in self:
            rec.verification_status = 'approved'
            rec.verification_date = fields.Datetime.now()
            rec.stage = '3_OFFLINE_TEST_SCHEDULED'

    def action_pass_selection(self):
        for rec in self:
            rec.selection_result = 'passed'
            rec.stage = '4_SELECTION_PASSED'

    def action_reject_selection(self):
        for rec in self:
            rec.selection_result = 'rejected'
            rec.stage = '4_SELECTION_REJECTED'

    def action_convert_to_santri(self):
        for rec in self:
            if not rec.santri_id:
                nis_random = ''.join(random.choices(string.digits, k=5))
                santri = self.env['taruna.santri'].create({
                    'name': rec.name,
                    'nis': f"TJ-2026-{nis_random}",
                    'nik': rec.nik,
                    'phone': rec.phone,
                    'email': rec.email,
                    'university': rec.university,
                    'faculty': rec.faculty,
                    'major': rec.major,
                    'semester': int(rec.semester) if rec.semester and rec.semester.isdigit() else 1,
                    'hafalan_juz': int(rec.hafalan_count) if rec.hafalan_count and rec.hafalan_count.isdigit() else 0,
                    'status': 'aktif',
                    'applicant_id': rec.id,
                })
                rec.santri_id = santri.id
                rec.stage = '6_CONVERTED_SANTRI'
