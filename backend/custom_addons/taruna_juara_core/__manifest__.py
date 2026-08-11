{
    'name': 'Taruna Juara Core Module',
    'version': '1.0.0',
    'category': 'Education/Tahfidz',
    'summary': 'Core Odoo Business Logic & API for Taruna Juara Digital Platform',
    'description': """
Taruna Juara Core Module
========================
Manages Mahasantri profiles, Ustadz halaqah allocations, daily hafalan setoran,
Tasmi' exams, dorm/asrama management, and alumni tracer study integration.
    """,
    'author': 'Rumah Tahfidz Taruna Juara',
    'website': 'https://tarunajuara.org',
    'license': 'LGPL-3',
    'depends': ['base', 'web', 'mail'],
    'data': [
        # 'security/ir.model.access.csv',
        # 'views/santri_views.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
