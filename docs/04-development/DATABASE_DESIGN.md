# Database Design & ERD Specification

## 1. Relational Database Overview (PostgreSQL)

All business entities are stored in a unified PostgreSQL database managed by Odoo ORM.

---

## 2. Core Entities & Schema Blueprint

### 2.1 `tj.santri` (Active & Alumni Students)
| Field | Type | Description |
| --- | --- | --- |
| `id` | Integer (PK) | Primary Key |
| `name` | Varchar | Full Name |
| `nis` | Varchar (Unique) | Nomor Induk Santri |
| `status` | Selection | `draft`, `active`, `alumni`, `graduated` |
| `current_juz` | Integer | Current Juz (1-30) |
| `ustadz_id` | Many2one | FK to `tj.ustadz` |
| `asrama_id` | Many2one | FK to `tj.asrama` |

### 2.2 `tj.setoran.hafalan` (Daily Hafalan Logs)
| Field | Type | Description |
| --- | --- | --- |
| `id` | Integer (PK) | Primary Key |
| `santri_id` | Many2one | FK to `tj.santri` |
| `type` | Selection | `ziadah`, `murajaah` |
| `surah_from` | Integer | Starting Surah ID |
| `surah_to` | Integer | Ending Surah ID |
| `page_count` | Float | Number of pages read |
| `score` | Selection | `mumtaz`, `jayyid_jiddan`, `jayyid`, `rasib` |
| `verified_by` | Many2one | FK to `tj.ustadz` |
