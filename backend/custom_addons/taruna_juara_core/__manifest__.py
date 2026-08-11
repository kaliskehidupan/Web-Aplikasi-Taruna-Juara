{
    'name': 'Taruna Juara Core Module & CMS',
    'version': '1.0.0',
    'category': 'Education/Tahfidz',
    'summary': 'Core Odoo Business Logic, Full Landing Page CMS & REST API for Taruna Juara Digital Platform',
    'description': """
Taruna Juara Core Module & Full Landing Page CMS
================--------------------------------
Pusat logika bisnis & CMS terintegrasi untuk Platform Digital Taruna Juara:
- CMS Landing Page (Hero, Visi-Misi, Rutinitas Kegiatan, Student Journey, Tata Tertib, Pengurus)
- PMB & Pendaftaran Calon Mahasantri
- Manajemen Mahasantri & Alumni
- Pembimbingan Ustadz & Halaqah
- Manajemen Gedung & Kamar Asrama
- REST API Controller untuk Frontend Integration
    """,
    'author': 'Rumah Tahfidz Taruna Juara',
    'website': 'https://tarunajuara.org',
    'license': 'LGPL-3',
    'depends': ['base', 'web', 'mail'],
    'data': [
        'security/ir.model.access.csv',
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
