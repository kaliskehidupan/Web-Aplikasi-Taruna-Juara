# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request, Response
import json
import logging

_logger = logging.getLogger(__name__)

class TarunaCoreApiController(http.Controller):

    def _json_response(self, data, status=200):
        return Response(
            json.dumps(data, default=str),
            content_type='application/json;charset=utf-8',
            status=status
        )

    # -------------------------------------------------------------
    # 1. GET ALL LANDING PAGE DATA (Full CMS API)
    # -------------------------------------------------------------
    @http.route('/api/landing/all_data', type='http', auth='public', methods=['GET'], csrf=False, cors='*')
    def get_landing_all_data(self, **kwargs):
        try:
            # Hero Section
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

            # Vision & Mission
            vm_rec = request.env['taruna.landing.vision_mission'].sudo().search([('active', '=', True)], limit=1)
            vision_mission_data = {
                'vision': vm_rec.vision_text if vm_rec else 'Menjadi pusat keunggulan pencetak huffazh Al-Qur\'an.',
                'missions': [
                    vm_rec.mission_1 if vm_rec else 'Menyelenggarakan pendidikan tahfidz Al-Qur\'an 30 Juz.',
                    vm_rec.mission_2 if vm_rec else 'Membentuk karakter kepemimpinan & kedisiplinan.',
                    vm_rec.mission_3 if vm_rec else 'Mengembangkan potensi akademik & kewirausahaan.'
                ]
            }

            # Rutinitas Kegiatan
            kegiatan_recs = request.env['taruna.landing.kegiatan'].sudo().search([('active', '=', True)])
            kegiatan_list = [{
                'id': k.id,
                'name': k.name,
                'jam_mulai': k.jam_mulai,
                'jam_selesai': k.jam_selesai,
                'kategori': k.kategori,
                'deskripsi': k.deskripsi
            } for k in kegiatan_recs]

            # Student Journey
            journey_recs = request.env['taruna.landing.journey'].sudo().search([('active', '=', True)])
            journey_list = [{
                'step_number': j.step_number,
                'title': j.title,
                'duration': j.duration,
                'target_hafalan': j.target_hafalan,
                'description': j.description,
                'badge_color': j.badge_color
            } for j in journey_recs]

            # Tata Tertib
            rules_recs = request.env['taruna.landing.tata_tertib'].sudo().search([('active', '=', True)])
            tata_tertib_list = [{
                'id': r.id,
                'name': r.name,
                'kategori': r.kategori,
                'poin': r.poin,
                'deskripsi': r.deskripsi
            } for r in rules_recs]

            # Ustadz
            ustadz_recs = request.env['taruna.ustadz'].sudo().search([('show_on_landing', '=', True)])
            ustadz_list = [{
                'id': u.id,
                'name': u.name,
                'title': u.title,
                'specialization': u.specialization,
                'quote': u.quote,
                'bio': u.bio
            } for u in ustadz_recs]

            # Pengurus
            pengurus_recs = request.env['taruna.pengurus'].sudo().search([('active', '=', True)])
            pengurus_list = [{
                'id': p.id,
                'name': p.name,
                'position': p.position,
                'division': p.division
            } for p in pengurus_recs]

            # PMB Batch Info
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
    # 2. PMB REGISTRATION ENDPOINT
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

            applicant = request.env['taruna.applicant'].sudo().create({
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
            })

            return self._json_response({
                'status': 'success',
                'message': 'Pendaftaran PMB berhasil dibuat.',
                'data': {
                    'registration_code': applicant.registration_code,
                    'applicant_id': applicant.id,
                    'name': applicant.name,
                    'stage': applicant.stage
                }
            })
        except Exception as e:
            _logger.error("API error in register_pmb: %s", str(e))
            return self._json_response({'status': 'error', 'message': str(e)}, status=500)

    # -------------------------------------------------------------
    # 3. GET APPLICANT STATUS
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
    # 4. ASRAMA & ROOMS LIST
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
