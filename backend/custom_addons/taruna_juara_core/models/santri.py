# -*- coding: utf-8 -*-
from odoo import models, fields, api

class TarunaSantri(models.Model):
    _name = 'taruna.santri'
    _description = 'Profil Mahasantri Taruna Juara'
    _order = 'nis asc'

    name = fields.Char(string='Nama Lengkap Mahasantri', required=True)
    nis = fields.Char(string='NIS (Nomor Induk Santri)', required=True, copy=False)
    nik = fields.Char(string='NIK')
    phone = fields.Char(string='Nomor Telepon / WA')
    email = fields.Char(string='Email')

    # Status & Academic Info
    status = fields.Selection([
        ('aktif', 'Mahasantri Aktif'),
        ('cuti', 'Cuti Akademik'),
        ('lulus_alumni', 'Lulus / Alumni'),
        ('drop_out', 'Non-Aktif')
    ], string='Status Keaktifan', default='aktif', required=True)

    university = fields.Char(string='Perguruan Tinggi')
    faculty = fields.Char(string='Fakultas')
    major = fields.Char(string='Program Studi')
    semester = fields.Integer(string='Semester', default=1)
    hafalan_juz = fields.Integer(string='Pencapaian Hafalan (Juz)', default=0)

    # Relations
    ustadz_id = fields.Many2one('taruna.ustadz', string='Ustadz Pembimbing Halaqah')
    kamar_id = fields.Many2one('taruna.kamar', string='Asrama / Kamar Tempat Tinggal')
    applicant_id = fields.Many2one('taruna.applicant', string='Data Pendaftaran PMB')
    user_id = fields.Many2one('res.users', string='Akun User Odoo')

    notes = fields.Text(string='Catatan Perkembangan / Prestasi')
