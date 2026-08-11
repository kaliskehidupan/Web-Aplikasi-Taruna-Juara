import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface KegiatanItem {
  id: number | string;
  name: string;
  jam_mulai: string;
  jam_selesai?: string;
  kategori: string;
  deskripsi?: string;
}

interface KegiatanSectionProps {
  kegiatanList?: KegiatanItem[];
}

export const KegiatanSection: React.FC<KegiatanSectionProps> = ({ kegiatanList }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const defaultKegiatan: KegiatanItem[] = [
    { id: 1, jam_mulai: '04:00', jam_selesai: '05:30', name: 'Qiyamul Lail, Subuh Berjamaah & Zikir Ma\'tsurat', kategori: 'ibadah', deskripsi: 'Persiapan ibadah harian dan pembukaan ruhani santri.' },
    { id: 2, jam_mulai: '05:30', jam_selesai: '07:00', name: 'Halaqah Tahfidz Subuh (Setoran Ziyadah)', kategori: 'tahfidz', deskripsi: 'Setoran hafalan baru per-halaman kepada Ustadz pembimbing.' },
    { id: 3, jam_mulai: '07:00', jam_selesai: '16:00', name: 'Kuliah Perkuliahan di Kampus & Mandiri', kategori: 'akademik', deskripsi: 'Menghadiri jadwal perkuliahan resmi di kampus masing-masing.' },
    { id: 4, jam_mulai: '16:30', jam_selesai: '17:45', name: 'Halaqah Murajaah Ashar & Tasmi\' Pasangan', kategori: 'tahfidz', deskripsi: 'Penguatan hafalan lama secara berpasangan dengan sesama mahasantri.' },
    { id: 5, jam_mulai: '18:15', jam_selesai: '20:00', name: 'Maghrib Berjamaah, Kajian Kitab & Isya', kategori: 'ibadah', deskripsi: 'Pelajaran fiqh, adab, dan tafsir Al-Qur\'an bersama Pengasuh.' },
    { id: 6, jam_mulai: '20:00', jam_selesai: '21:30', name: 'Belajar Mandiri, Diskusi & IT Mentoring', kategori: 'pengembangan', deskripsi: 'Pengembangan skill coding, kewirausahaan, dan tugas kampus.' },
    { id: 7, jam_mulai: '21:30', jam_selesai: '03:45', name: 'Istirahat Malam & Sleep Protocol', kategori: 'istirahat', deskripsi: 'Waktu istirahat penuh untuk menjaga stamina jasmani.' },
  ];

  const listToDisplay = kegiatanList && kegiatanList.length > 0 ? kegiatanList : defaultKegiatan;

  const filteredList = activeCategory === 'all' 
    ? listToDisplay 
    : listToDisplay.filter(k => k.kategori === activeCategory);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'ibadah':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Ibadah &amp; Zikir</span>;
      case 'tahfidz':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Tahfidz &amp; Setoran</span>;
      case 'akademik':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">Akademik Kampus</span>;
      case 'pengembangan':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">Pengembangan Diri</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold">Istirahat</span>;
    }
  };

  return (
    <section id="kegiatan" className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] text-xs font-black uppercase tracking-wider inline-block mb-3">
            Rutinitas Harian Mahasantri
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
            Jadwal &amp; Agenda Kehidupan Asrama
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Kedisiplinan waktu adalah kunci sukses mahasantri dalam menyeimbangkan antara Hafalan 30 Juz dan prestasi di Bangku Kuliah.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { key: 'all', label: 'Semua Agenda' },
            { key: 'tahfidz', label: ' Tahfidz & Setoran' },
            { key: 'ibadah', label: ' Ibadah & Zikir' },
            { key: 'akademik', label: ' Akademik Kampus' },
            { key: 'pengembangan', label: ' Skill & Mentoring' }
          ].map(btn => (
            <button
              key={btn.key}
              onClick={() => setActiveCategory(btn.key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeCategory === btn.key
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200/80'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-black text-[#D93829] bg-[#D93829]/10 px-3 py-1 rounded-xl">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.jam_mulai} {item.jam_selesai ? `- ${item.jam_selesai}` : 'WIB'}</span>
                  </div>
                  {getCategoryBadge(item.kategori)}
                </div>

                <h3 className="text-base font-extrabold text-neutral-900 mb-2 leading-snug">
                  {item.name}
                </h3>

                <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
                  {item.deskripsi || 'Kegiatan terstruktur pembinaan mahasantri.'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
