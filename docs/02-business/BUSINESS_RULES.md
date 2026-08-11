# Business Rules & Operational Logic

## 1. Student Lifecycle Rules (Mahasantri)

### BR-SAN-001: Account Transition Matrix
- **Prospective (Calon Santri)**: Created upon online registration. Can view admission status only.
- **Active Santri**: Activated upon approval by Admin/Pengasuh in Odoo. Gains full access to Santri Portal.
- **Alumni**: Auto-migrated upon passing the 30 Juz graduation exam (*Tasmi' 30 Juz*). Gains access to Alumni Portal.

### BR-SAN-002: Hafalan Setoran & Murajaah Logging
- Daily Ziadah target: [Default 1 Halaman / Day or customized per student plan].
- Daily Murajaah target: [Default 1/2 Juz to 1 Juz / Day].
- Unverified logs are marked as `Pending Review` until confirmed by assigned Ustadz.

---

## 2. Ustadz & Nurturing Rules

### BR-UST-001: Halaqah Allocation
- Each Ustadz is assigned to maximum [10-15] active students per halaqah.
- Early Warning System triggers an alert if a student has no setoran entries for 3 consecutive days.

---

## 3. Tasmi' & Graduation Certification Rules

### BR-TAS-001: Tasmi' Milestones
- Tasmi' levels: 1 Juz, 5 Juz, 10 Juz, 15 Juz, 20 Juz, 25 Juz, 30 Juz Bil Ghaib.
- Passing grade: Minimum score 85/100 assessed by a panel of 2 Ustadz.
