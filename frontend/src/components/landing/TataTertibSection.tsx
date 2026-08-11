import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Award, Scale } from 'lucide-react';

interface TataTertibItem {
  id: number | string;
  name: string;
  kategori: string;
  poin: number;
  deskripsi?: string;
}

interface TataTertibSectionProps {
  tataTertibList?: TataTertibItem[];
}

export const TataTertibSection: React.FC<TataTertibSectionProps> = ({ tataTertibList }) => {
  const [activeTab, setActiveTab] = useState<string>('kewajiban');

  const defaultTataTertib: TataTertibItem[] = [
    { id: 1, kategori: 'kewajiban', name: 'Melaksanakan Salat Fardhu Berjamaah Tepat Waktu', poin: 10, deskripsi: 'Wajib hadir di masjid asrama sebelum adzan berkumandang.' },
    { id: 2, kategori: 'kewajiban', name: 'Mengikuti Halaqah Setoran Subuh & Ashar Konsisten', poin: 10, deskripsi: 'Disiplin hadir halaqah tepat waktu sesuai jadwal kelompok.' },
    { id: 3, kategori: 'kewajiban', name: 'Menjaga Kebersihan Kamar & Piket Asrama', poin: 5, deskripsi: 'Piket kebersihan area bersama sesuai jadwal divisi kesantrian.' },
    
    { id: 4, kategori: 'larangan', name: 'Keterlambatan / Membolos Halaqah Tanpa Izin Valid', poin: 15, deskripsi: 'Pelanggaran kehadiran tanpa surat izin pengasuh.' },
    { id: 5, kategori: 'larangan', name: 'Membawa / Menggunakan Gadget Pada Jam Wajib Hening', poin: 20, deskripsi: 'Penggunaan ponsel di luar jam yang diizinkan.' },
    { id: 6, kategori: 'larangan', name: 'Meninggalkan Asrama Menginap Tanpa Surat Izin Musyrif', poin: 30, deskripsi: 'Menginap di luar asrama tanpa persetujuan bertuliskan.' },

    { id: 7, kategori: 'sanksi', name: 'Peringatan Lisan & Penugasan Murajaah Tambahan', poin: 30, deskripsi: 'Diberikan untuk akumulasi poin pelanggaran ringan (10-30 poin).' },
    { id: 8, kategori: 'sanksi', name: 'Surat Peringatan (SP 1 / SP 2) & Pemanggilan Pengasuh', poin: 60, deskripsi: 'Diberikan untuk akumulasi poin sedang (31-60 poin).' },
    { id: 9, kategori: 'sanksi', name: 'Sidang Kedisiplinan & Evaluasi Status Beasiswa', poin: 100, deskripsi: 'Pencabutan beasiswa atau pengeluaran dari asrama.' },

    { id: 10, kategori: 'penghargaan', name: 'Predikat Mahasantri Teladan Pekanan (Juara Discipline)', poin: 50, deskripsi: 'Kehadiran 100% halaqah dan kebersihan kamar terbaik.' },
    { id: 11, kategori: 'penghargaan', name: 'Apresiasi Khusus Tasmi\' 5/10/30 Juz Sekali Duduk', poin: 100, deskripsi: 'Insentif kitab, sertifikat penghargaan, dan voucher pendidikan.' },
  ];

  const listToDisplay = tataTertibList && tataTertibList.length > 0 ? tataTertibList : defaultTataTertib;

  const filteredItems = listToDisplay.filter(item => item.kategori === activeTab);

  return (
    <section id="tata-tertib" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-black uppercase tracking-wider inline-block mb-3">
            Tata Tertib &amp; Kedisiplinan
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
            Komitmen Karakter &amp; Kedisiplinan Asrama
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Sistem poin terukur untuk membentuk kedisiplinan Rabbani, kebersamaan, dan kenyamanan seluruh mahasantri Taruna Juara.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { key: 'kewajiban', label: 'Kewajiban Utama', icon: ShieldCheck, color: 'emerald' },
            { key: 'larangan', label: 'Larangan Kedisiplinan', icon: AlertTriangle, color: 'amber' },
            { key: 'sanksi', label: 'Ketentuan Sanksi', icon: Scale, color: 'red' },
            { key: 'penghargaan', label: 'Penghargaan & Apresiasi', icon: Award, color: 'blue' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-sm ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((rule, idx) => (
            <motion.div
              key={rule.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#FAF6F0] p-6 rounded-3xl border border-neutral-200/80 shadow-sm hover:border-neutral-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    Poin Bobot
                  </span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full font-mono text-xs font-black text-[#D93829]">
                    {rule.poin} Poin
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-neutral-900 mb-2 leading-snug">
                  {rule.name}
                </h3>

                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {rule.deskripsi || 'Aturan baku kedisiplinan mahasantri.'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
