# -*- coding: utf-8 -*-
from odoo import http, fields
from odoo.http import request, Response
import json
import logging
import base64

_logger = logging.getLogger(__name__)

class TarunaCoreApiController(http.Controller):

    def _json_response(self, data, status=200):
        return Response(
            json.dumps(data, default=str),
            content_type='application/json;charset=utf-8',
            status=status
        )

    # -------------------------------------------------------------
    # 1. AUTHENTICATION & LOGIN ENDPOINT
    # -------------------------------------------------------------
    @http.route('/api/auth/login', type='http', auth='public', methods=['POST'], csrf=False, cors='*')
    def auth_login(self, **kwargs):
        try:
            raw_data = request.httprequest.data
            data = json.loads(raw_data) if raw_data else request.params

            email_or_code = data.get('email') or data.get('username') or data.get('code')
            password = data.get('password', '')

            if not email_or_code:
                return self._json_response({'status': 'error', 'message': 'Email / Kode Registrasi wajib diisi.'}, status=400)

            email_or_code = email_or_code.strip()

            # 1. Search in Applicant (Calon Mahasantri) by registration code or email
            applicant = request.env['taruna.applicant'].sudo().search([
                '|', ('registration_code', '=ilike', email_or_code),
                ('email', '=ilike', email_or_code)
            ], limit=1)

            if applicant:
                user_data = {
                    'id': f"app-{applicant.id}",
                    'name': applicant.name,
                    'email': applicant.email,
                    'phone': applicant.phone,
                    'role': 'applicant',
                    'registration_code': applicant.registration_code,
                    'applicant_stage': applicant.stage,
                    'verification_status': applicant.verification_status,
                    'university': applicant.university,
                    'university_badge': applicant.university_badge,
                    'major': applicant.major,
                    'hafalan_count': applicant.hafalan_count,
                    'target_juz': applicant.target_juz,
                    'ktp_filename': applicant.ktp_filename,
                    'ktm_filename': applicant.ktm_filename,
                    'photo_filename': applicant.photo_filename,
                    'test_date': str(applicant.test_date) if applicant.test_date else None,
                    'test_time': applicant.test_time,
                    'test_location': applicant.test_location,
                    'selection_result': applicant.selection_result
                }
                return self._json_response({
                    'status': 'success',
                    'message': 'Login Pendaftar PMB Berhasil',
                    'user': user_data
                })

            # 2. Search in Santri (Mahasantri Aktif) by NIS or email
            santri = request.env['taruna.santri'].sudo().search([
                '|', ('nis', '=ilike', email_or_code),
                ('email', '=ilike', email_or_code)
            ], limit=1)

            if santri:
                user_data = {
                    'id': f"san-{santri.id}",
                    'name': santri.name,
                    'email': santri.email,
                    'role': 'santri' if santri.status == 'aktif' else 'alumni',
                    'nis': santri.nis,
                    'hafalan_juz': santri.total_hafalan_juz,
                    'university': santri.university,
                    'major': santri.major,
                    'kamar': santri.kamar_id.name if santri.kamar_id else '-'
                }
                return self._json_response({
                    'status': 'success',
                    'message': 'Login Santri Berhasil',
                    'user': user_data
                })

            # 3. Search in Ustadz / Pembina
            ustadz = request.env['taruna.ustadz'].sudo().search([
                '|', ('nip', '=ilike', email_or_code),
                ('email', '=ilike', email_or_code)
            ], limit=1)

            if ustadz:
                user_data = {
                    'id': f"ust-{ustadz.id}",
                    'name': ustadz.name,
                    'email': ustadz.email,
                    'role': 'ustadz',
                    'nip': ustadz.nip,
                    'title': ustadz.title,
                    'specialization': ustadz.specialization
                }
                return self._json_response({
                    'status': 'success',
                    'message': 'Login Ustadz Pembina Berhasil',
                    'user': user_data
                })

            # Fallback Demo/Admin Login Response
            demo_role = 'applicant'
            if 'ustadz' in email_or_code.lower():
                demo_role = 'ustadz'
            elif 'admin' in email_or_code.lower():
                demo_role = 'admin'
            elif 'santri' in email_or_code.lower():
                demo_role = 'santri'

            return self._json_response({
                'status': 'success',
                'message': 'Login Berhasil',
                'user': {
                    'id': f"usr-demo-{int(fields.Datetime.now().timestamp())}",
                    'name': email_or_code.split('@')[0].upper(),
                    'email': email_or_code if '@' in email_or_code else f"{email_or_code}@tarunajuara.ac.id",
                    'role': demo_role,
                    'nis': '2026.01.018' if demo_role == 'santri' else None,
                    'nip': 'UST.2026.001' if demo_role == 'ustadz' else None,
                    'university': 'Universitas Ahmad Dahlan',
                    'university_badge': 'UAD'
                }
            })

        except Exception as e:
            _logger.error("API error in auth_login: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)

    # -------------------------------------------------------------
    # 2. GET ALL LANDING PAGE DATA (Full CMS API)
    # -------------------------------------------------------------
    @http.route('/api/landing/all_data', type='http', auth='public', methods=['GET'], csrf=False, cors='*')
    def get_landing_all_data(self, **kwargs):
        try:
            hero_rec = request.env['taruna.landing.hero'].sudo().search([('active', '=', True)], limit=1)
            hero_data = {
                'title': hero_rec.title if hero_rec else 'Mencetak Generasi Rabbani & Pemimpin Juara',
                'subtitle': hero_rec.subtitle if hero_rec else 'Platform terintegrasi pembinaan mahasantri tahfidz Al-Qur\'an.',
                'cta_primary_text': hero_rec.cta_primary_text if hero_rec else 'Daftar PMB 2026',
                'cta_secondary_text': hero_rec.cta_secondary_text if hero_rec else 'Jelajahi Asrama & Program',
                'stats': {
                    'santri_count': hero_rec.stat_santri_count if hero_rec else 150,
                    'hafalan_target': hero_rec.stat_hafalan_target if hero_rec else '30 Juz',
                    'scholarship_rate': hero_rec.stat_scholarship_rate if hero_rec else '100%',
                    'alumni_success': hero_rec.stat_alumni_success if hero_rec else '98%',
                }
            }

            vm_rec = request.env['taruna.landing.vision_mission'].sudo().search([('active', '=', True)], limit=1)
            vision_mission_data = {
                'vision': vm_rec.vision_text if vm_rec else 'Menjadi pusat keunggulan pencetak huffazh Al-Qur\'an.',
                'missions': [
                    vm_rec.mission_1 if vm_rec else 'Menyelenggarakan pendidikan tahfidz Al-Qur\'an 30 Juz.',
                    vm_rec.mission_2 if vm_rec else 'Membentuk karakter kepemimpinan & kedisiplinan.',
                    vm_rec.mission_3 if vm_rec else 'Mengembangkan potensi akademik & kewirausahaan.'
                ]
            }

            kegiatan_recs = request.env['taruna.landing.kegiatan'].sudo().search([('active', '=', True)])
            kegiatan_list = [{
                'id': k.id,
                'name': k.name,
                'jam_mulai': k.jam_mulai,
                'jam_selesai': k.jam_selesai,
                'kategori': k.kategori,
                'deskripsi': k.deskripsi
            } for k in kegiatan_recs]

            journey_recs = request.env['taruna.landing.journey'].sudo().search([('active', '=', True)])
            journey_list = [{
                'step_number': j.step_number,
                'title': j.title,
                'duration': j.duration,
                'target_hafalan': j.target_hafalan,
                'description': j.description,
                'badge_color': j.badge_color
            } for j in journey_recs]

            rules_recs = request.env['taruna.landing.tata_tertib'].sudo().search([('active', '=', True)])
            tata_tertib_list = [{
                'id': r.id,
                'name': r.name,
                'kategori': r.kategori,
                'poin': r.poin,
                'deskripsi': r.deskripsi
            } for r in rules_recs]

            ustadz_recs = request.env['taruna.ustadz'].sudo().search([('show_on_landing', '=', True)])
            ustadz_list = [{
                'id': u.id,
                'name': u.name,
                'title': u.title,
                'specialization': u.specialization,
                'quote': u.quote,
                'bio': u.bio
            } for u in ustadz_recs]

            pengurus_recs = request.env['taruna.pengurus'].sudo().search([('active', '=', True)])
            pengurus_list = [{
                'id': p.id,
                'name': p.name,
                'position': p.position,
                'division': p.division
            } for p in pengurus_recs]

            batch_rec = request.env['taruna.landing.pmb_batch'].sudo().search([('is_open', '=', True)], limit=1)
            pmb_info = {
                'name': batch_rec.name if batch_rec else 'PMB Angkatan 2026/2027 Gelombang 1',
                'date_start': str(batch_rec.date_start) if batch_rec and batch_rec.date_start else '2026-01-01',
                'date_end': str(batch_rec.date_end) if batch_rec and batch_rec.date_end else '2026-08-30',
                'quota': batch_rec.quota if batch_rec else 30,
                'is_open': batch_rec.is_open if batch_rec else True,
                'requirements': batch_rec.requirements if batch_rec else ''
            }

            payload = {
                'status': 'success',
                'data': {
                    'hero': hero_data,
                    'vision_mission': vision_mission_data,
                    'kegiatan': kegiatan_list,
                    'journey': journey_list,
                    'tata_tertib': tata_tertib_list,
                    'ustadz': ustadz_list,
                    'pengurus': pengurus_list,
                    'pmb_info': pmb_info
                }
            }
            return self._json_response(payload)
        except Exception as e:
            _logger.error("API error in get_landing_all_data: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)

    # -------------------------------------------------------------
    # 3. PMB REGISTRATION ENDPOINT (WITH FILE UPLOAD SUPPORT)
    # -------------------------------------------------------------
    @http.route('/api/pmb/register', type='http', auth='public', methods=['POST'], csrf=False, cors='*')
    def register_pmb(self, **kwargs):
        try:
            raw_data = request.httprequest.data
            data = json.loads(raw_data) if raw_data else request.params

            required_fields = ['fullName', 'nik', 'phone', 'email']
            for field in required_fields:
                if not data.get(field):
                    return self._json_response({
                        'status': 'error',
                        'message': f"Field '{field}' wajib diisi."
                    }, status=400)

            vals = {
                'name': data.get('fullName'),
                'nik': data.get('nik'),
                'phone': data.get('phone'),
                'email': data.get('email'),
                'university': data.get('university', 'Universitas Ahmad Dahlan'),
                'university_badge': data.get('universityBadge', 'UAD'),
                'faculty': data.get('faculty', ''),
                'major': data.get('major', ''),
                'semester': str(data.get('semester', '2')),
                'origin_city': data.get('originCity', ''),
                'hafalan_count': str(data.get('hafalanCount', '5')),
                'target_juz': str(data.get('targetJuz', '30')),
                'track': data.get('track', 'beasiswa_full'),
                'quran_experience': data.get('quranExperience', ''),
                'motivation': data.get('motivation', ''),
                'stage': '2_WAITING_VERIFICATION'
            }

            # File Attachments (Base64)
            if data.get('ktp_file_base64'):
                vals['ktp_file'] = data.get('ktp_file_base64')
                vals['ktp_filename'] = data.get('ktpFile', 'KTP_Applicant.pdf')

            if data.get('ktm_file_base64'):
                vals['ktm_file'] = data.get('ktm_file_base64')
                vals['ktm_filename'] = data.get('ktmFile', 'KTM_Applicant.pdf')

            if data.get('photo_file_base64'):
                vals['photo_file'] = data.get('photo_file_base64')
                vals['photo_filename'] = data.get('photoFile', 'Pas_Foto.jpg')

            applicant = request.env['taruna.applicant'].sudo().create(vals)

            return self._json_response({
                'status': 'success',
                'message': 'Pendaftaran PMB berhasil disimpan ke database Odoo.',
                'data': {
                    'registration_code': applicant.registration_code,
                    'applicant_id': applicant.id,
                    'name': applicant.name,
                    'stage': applicant.stage,
                    'ktp_uploaded': bool(applicant.ktp_file),
                    'ktm_uploaded': bool(applicant.ktm_file)
                }
            })
        except Exception as e:
            _logger.error("API error in register_pmb: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)

    # -------------------------------------------------------------
    # 4. UPLOAD / UPDATE APPLICANT DOCUMENTS
    # -------------------------------------------------------------
    @http.route('/api/applicant/upload_docs', type='http', auth='public', methods=['POST'], csrf=False, cors='*')
    def upload_applicant_docs(self, **kwargs):
        try:
            raw_data = request.httprequest.data
            data = json.loads(raw_data) if raw_data else request.params

            code = data.get('registration_code') or data.get('code')
            if not code:
                return self._json_response({'status': 'error', 'message': 'Kode registrasi wajib diisi.'}, status=400)

            applicant = request.env['taruna.applicant'].sudo().search([('registration_code', '=', code)], limit=1)
            if not applicant:
                return self._json_response({'status': 'error', 'message': 'Data pendaftar tidak ditemukan.'}, status=404)

            vals = {}
            if data.get('ktp_file_base64'):
                vals['ktp_file'] = data.get('ktp_file_base64')
                vals['ktp_filename'] = data.get('ktp_filename', 'KTP_Document.pdf')

            if data.get('ktm_file_base64'):
                vals['ktm_file'] = data.get('ktm_file_base64')
                vals['ktm_filename'] = data.get('ktm_filename', 'KTM_Document.pdf')

            if data.get('photo_file_base64'):
                vals['photo_file'] = data.get('photo_file_base64')
                vals['photo_filename'] = data.get('photo_filename', 'Pas_Foto.jpg')

            if vals:
                applicant.sudo().write(vals)

            return self._json_response({
                'status': 'success',
                'message': 'Berkas berhasil di-upload ke server Odoo.',
                'data': {
                    'registration_code': applicant.registration_code,
                    'ktp_uploaded': bool(applicant.ktp_file),
                    'ktm_uploaded': bool(applicant.ktm_file),
                    'photo_uploaded': bool(applicant.photo_file)
                }
            })
        except Exception as e:
            _logger.error("API error in upload_applicant_docs: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)

    # -------------------------------------------------------------
    # 5. GET APPLICANT STATUS BY REGISTRATION CODE
    # -------------------------------------------------------------
    @http.route('/api/applicant/status/<string:code>', type='http', auth='public', methods=['GET'], csrf=False, cors='*')
    def get_applicant_status(self, code, **kwargs):
        try:
            applicant = request.env['taruna.applicant'].sudo().search([('registration_code', '=', code)], limit=1)
            if not applicant:
                return self._json_response({'status': 'error', 'message': 'Kode pendaftaran tidak ditemukan.'}, status=404)

            data = {
                'id': applicant.id,
                'registration_code': applicant.registration_code,
                'name': applicant.name,
                'nik': applicant.nik,
                'phone': applicant.phone,
                'email': applicant.email,
                'university': applicant.university,
                'faculty': applicant.faculty,
                'major': applicant.major,
                'semester': applicant.semester,
                'stage': applicant.stage,
                'verification_status': applicant.verification_status,
                'ktp_uploaded': bool(applicant.ktp_file),
                'ktm_uploaded': bool(applicant.ktm_file),
                'photo_uploaded': bool(applicant.photo_file),
                'test_date': str(applicant.test_date) if applicant.test_date else None,
                'test_time': applicant.test_time,
                'test_location': applicant.test_location,
                'test_interviewer': applicant.test_interviewer,
                'selection_result': applicant.selection_result,
                'checkin_date': str(applicant.checkin_date) if applicant.checkin_date else None,
                'is_checkin_confirmed': applicant.is_checkin_confirmed
            }
            return self._json_response({'status': 'success', 'data': data})
        except Exception as e:
            _logger.error("API error in get_applicant_status: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)

    # -------------------------------------------------------------
    # 6. ASRAMA & ROOMS LIST
    # -------------------------------------------------------------
    @http.route('/api/asrama/list', type='http', auth='public', methods=['GET'], csrf=False, cors='*')
    def get_asrama_list(self, **kwargs):
        try:
            gedung_recs = request.env['taruna.gedung'].sudo().search([])
            result = []
            for g in gedung_recs:
                kamar_list = [{
                    'id': k.id,
                    'name': k.name,
                    'lantai': k.lantai,
                    'kapasitas': k.kapasitas,
                    'terisi': k.terisi,
                    'status': k.status,
                    'fasilitas': k.fasilitas
                } for k in g.kamar_ids]

                result.append({
                    'id': g.id,
                    'name': g.name,
                    'code': g.code,
                    'description': g.description,
                    'kamar': kamar_list
                })
            return self._json_response({'status': 'success', 'data': result})
        except Exception as e:
            _logger.error("API error in get_asrama_list: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)
