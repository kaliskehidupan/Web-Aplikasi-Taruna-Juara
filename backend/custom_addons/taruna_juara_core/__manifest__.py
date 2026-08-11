{
    'name': 'Taruna Juara Core & Full Website Platform',
    'version': '1.0.0',
    'category': 'Education/Tahfidz',
    'summary': 'Full Odoo Stack Website, PMB Portal, & ERP Management for Taruna Juara Digital Platform',
    'description': """
Taruna Juara Full Odoo Website & ERP Platform
================================================
Platform terpadu berbasis Full Odoo Stack (Website, QWeb Templates, & ERP):
- Public Landing Page Website (Hero, Visi-Misi, Rutinitas Kegiatan, Student Journey, Tata Tertib, Ustadz, Asrama)
- Form Pendaftaran PMB Online dengan Upload File KTP/KTM
- Portal Pemeriksaan Status Pendaftaran
- Pembinaan Mahasantri Tahfidz 30 Juz & Asrama
- Manajemen Backend Admin Odoo ERP
    """,
    'author': 'Rumah Tahfidz Taruna Juara',
    'website': 'https://tarunajuara.org',
    'license': 'LGPL-3',
    'depends': ['base', 'web', 'mail', 'website', 'portal'],
    'data': [
        'security/ir.model.access.csv',
        'views/templates.xml',
        'views/landing_content_views.xml',
        'views/applicant_views.xml',
        'views/santri_views.xml',
        'views/ustadz_views.xml',
        'views/kamar_views.xml',
        'views/menu_views.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
