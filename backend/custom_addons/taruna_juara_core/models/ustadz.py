# -*- coding: utf-8 -*-
from odoo import models, fields, api

class TarunaUstadz(models.Model):
    _name = 'taruna.ustadz'
    _description = 'Ustadz Pengasuh & Pembimbing Halaqah'
    _order = 'sequence, name asc'

    name = fields.Char(string='Nama Ustadz', required=True)
    nip = fields.Char(string='NIP (Nomor Induk Pengasuh)')
    title = fields.Char(string='Gelar & Peran', default='Pengasuh & Musyrif Tahfidz')
    phone = fields.Char(string='Nomor Telepon')
    email = fields.Char(string='Email')
    specialization = fields.Char(string='Spesialisasi / Keahlian', default='Tahfidz Al-Qur\'an & Mutun Ilmiyyah')
    quote = fields.Text(string='Kutipan / Pesan Hikmah')
    bio = fields.Text(string='Biografi Singkat')
    photo = fields.Binary(string='Foto Profil')
    
    # CMS Landing Page Options
    show_on_landing = fields.Boolean(string='Tampilkan di Landing Page', default=True)
    sequence = fields.Integer(string='Urutan Tampil', default=10)

    # Relations
    santri_ids = fields.One2many('taruna.santri', 'ustadz_id', string='Daftar Mahasantri Bimbingan')
    user_id = fields.Many2one('res.users', string='Akun User Odoo')
