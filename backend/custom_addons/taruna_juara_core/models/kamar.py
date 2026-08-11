# -*- coding: utf-8 -*-
from odoo import models, fields, api

class TarunaGedung(models.Model):
    _name = 'taruna.gedung'
    _description = 'Gedung Asrama'
    _order = 'sequence, name asc'

    name = fields.Char(string='Nama Gedung', required=True, default='Gedung A - Al-Fatih')
    code = fields.Char(string='Kode Gedung', required=True, default='GEDUNG_A')
    description = fields.Text(string='Deskripsi Gedung & Fasilitas Utama')
    sequence = fields.Integer(string='Urutan Tampil', default=10)
    kamar_ids = fields.One2many('taruna.kamar', 'gedung_id', string='Daftar Kamar')


class TarunaKamar(models.Model):
    _name = 'taruna.kamar'
    _description = 'Kamar Asrama Santri'
    _order = 'gedung_id, lantai, name asc'

    name = fields.Char(string='Nomor / Nama Kamar', required=True, default='Kamar 101')
    gedung_id = fields.Many2one('taruna.gedung', string='Gedung Asrama', required=True)
    lantai = fields.Integer(string='Lantai', default=1, required=True)
    kapasitas = fields.Integer(string='Kapasitas Maksimal (Orang)', default=4, required=True)
    terisi = fields.Integer(string='Jumlah Terisi', compute='_compute_terisi', store=True)

    status = fields.Selection([
        ('tersedia', 'Tersedia'),
        ('penuh', 'Penuh'),
        ('perbaikan', 'Dalam Pemeliharaan')
    ], string='Status Kamar', compute='_compute_status', store=True, default='tersedia')

    fasilitas = fields.Text(string='Fasilitas Kamar', default='Kasur Busa Premium, Lemari Pakaian 2 Pintu, Meja Belajar, AC / Kipas, Kamar Mandi Dalam')
    catatan = fields.Text(string='Catatan Tambahan')

    santri_ids = fields.One2many('taruna.santri', 'kamar_id', string='Penghuni Mahasantri')

    @api.depends('santri_ids')
    def _compute_terisi(self):
        for rec in self:
            rec.terisi = len(rec.santri_ids)

    @api.depends('terisi', 'kapasitas')
    def _compute_status(self):
        for rec in self:
            if rec.status == 'perbaikan':
                continue
            if rec.terisi >= rec.kapasitas:
                rec.status = 'penuh'
            else:
                rec.status = 'tersedia'
