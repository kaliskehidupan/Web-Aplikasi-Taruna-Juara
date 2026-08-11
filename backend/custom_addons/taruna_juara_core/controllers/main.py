# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request

class TarunaWebsiteController(http.Controller):

    @http.route('/', type='http', auth='public', website=True)
    def index(self, **kw):
        # Fetch CMS records for Landing Page
        hero = request.env['taruna.landing.hero'].sudo().search([('active', '=', True)], limit=1)
        vision_mission = request.env['taruna.landing.vision_mission'].sudo().search([('active', '=', True)], limit=1)
        kegiatan = request.env['taruna.landing.kegiatan'].sudo().search([('active', '=', True)])
        journey = request.env['taruna.landing.journey'].sudo().search([('active', '=', True)])
        tata_tertib = request.env['taruna.landing.tata_tertib'].sudo().search([('active', '=', True)])
        ustadz_list = request.env['taruna.ustadz'].sudo().search([('show_on_landing', '=', True)])
        pengurus_list = request.env['taruna.pengurus'].sudo().search([('active', '=', True)])
        pmb_batch = request.env['taruna.landing.pmb_batch'].sudo().search([('is_open', '=', True)], limit=1)
        asrama_list = request.env['taruna.gedung'].sudo().search([])

        values = {
            'hero': hero,
            'vision_mission': vision_mission,
            'kegiatan_list': kegiatan,
            'journey_list': journey,
            'tata_tertib_list': tata_tertib,
            'ustadz_list': ustadz_list,
            'pengurus_list': pengurus_list,
            'pmb_batch': pmb_batch,
            'asrama_list': asrama_list,
        }
        return request.render('taruna_juara_core.index_template', values)

    @http.route('/pmb/submit', type='http', auth='public', methods=['POST'], website=True, csrf=True)
    def submit_pmb(self, **post):
        name = post.get('name')
        nik = post.get('nik')
        phone = post.get('phone')
        email = post.get('email')

        if not name or not nik or not phone or not email:
            return request.redirect('/?error=missing_fields')

        vals = {
            'name': name,
            'nik': nik,
            'phone': phone,
            'email': email,
            'university': post.get('university', 'Universitas Ahmad Dahlan'),
            'faculty': post.get('faculty', ''),
            'major': post.get('major', ''),
            'semester': post.get('semester', '2'),
            'origin_city': post.get('origin_city', ''),
            'hafalan_count': post.get('hafalan_count', '5'),
            'target_juz': post.get('target_juz', '30'),
            'track': post.get('track', 'beasiswa_full'),
            'quran_experience': post.get('quran_experience', ''),
            'motivation': post.get('motivation', ''),
            'stage': '2_WAITING_VERIFICATION'
        }

        # Check uploaded files
        ktp = post.get('ktp_file')
        if ktp and hasattr(ktp, 'read'):
            vals['ktp_file'] = ktp.read()
            vals['ktp_filename'] = ktp.filename

        ktm = post.get('ktm_file')
        if ktm and hasattr(ktm, 'read'):
            vals['ktm_file'] = ktm.read()
            vals['ktm_filename'] = ktm.filename

        applicant = request.env['taruna.applicant'].sudo().create(vals)
        return request.redirect(f'/pmb/status?code={applicant.registration_code}&success=1')

    @http.route('/pmb/status', type='http', auth='public', website=True)
    def pmb_status(self, code=None, **kw):
        applicant = None
        if code:
            applicant = request.env['taruna.applicant'].sudo().search([('registration_code', '=', code.strip())], limit=1)

        values = {
            'code': code or '',
            'applicant': applicant,
            'success': kw.get('success') == '1',
        }
        return request.render('taruna_juara_core.status_template', values)
