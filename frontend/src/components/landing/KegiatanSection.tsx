import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  category: 'tahfidz' | 'krt' | 'media' | 'psdm';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  schedule: string;
  placeholderText: string;
  accentColor: string;
}

export const KegiatanSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<ActivityItem | null>(null);

  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      category: 'tahfidz',
      categoryLabel: 'Program Tahfidz Core',
      title: 'Halaqah Ziadah & Setoran Harian',
      subtitle: 'Target 1 Halaman / Hari',
      description: 'Kegiatan utama pembinaan hafalan Al-Qur\'an setiap bada Subuh & bada Maghrib. Didampingi Ustadz pengampu dengan metode penyetoran terstruktur.',
      schedule: 'Setiap Hari (Subuh & Maghrib)',
      placeholderText: 'Upload Foto Kegiatan Setoran Ziadah di Sini',
      accentColor: 'from-[#D93829] to-[#EA580C]',
    },
    {
      id: 'act-2',
      category: 'tahfidz',
      categoryLabel: 'Program Tahfidz Core',
      title: 'Ujian Tasmi\' Bil Ghaib 1 - 30 Juz',
      subtitle: 'Milestone Kelancaran Hafalan',
      description: 'Ujian pembuktian hafalan secara sekali duduk (1 Juz, 5 Juz, 10 Juz, hingga 30 Juz) di hadapan penguji dan disaksikan para mahasantri.',
      schedule: 'Mingguan & Bulanan',
      placeholderText: 'Upload Foto Ujian Tasmi\' Mahasantri di Sini',
      accentColor: 'from-amber-600 to-orange-500',
    },
    {
      id: 'act-3',
      category: 'krt',
      categoryLabel: 'Divisi KRT (Keasramaan)',
      title: 'Kebersihan & Ketertiban Asrama (KRT)',
      subtitle: 'Nurturing Character & Discipline',
      description: 'Pengelolaan lingkungan asrama, piket harian, pengawasan kedisiplinan, dan penyediaan fasilitas nyaman bagi seluruh mahasantri.',
      schedule: 'Setiap Hari & Gotong Royong Pekan',
      placeholderText: 'Upload Foto Kebersihan Asrama KRT di Sini',
      accentColor: 'from-emerald-600 to-teal-500',
    },
    {
      id: 'act-4',
      category: 'media',
      categoryLabel: 'Divisi Media Kreatif',
      title: 'Production Content & Da\'wah Digital',
      subtitle: 'Kreativitas & Syiar Media',
      description: 'Pengelolaan media sosial, podcast Qur\'an, fotografi kegiatan, dan desain publikasi syiar Rumah Tahfidz Taruna Juara.',
      schedule: 'Rutin Mingguan',
      placeholderText: 'Upload Foto Tim Media Kreatif di Sini',
      accentColor: 'from-sky-600 to-blue-500',
    },
    {
      id: 'act-5',
      category: 'psdm',
      categoryLabel: 'Divisi PSDM',
      title: 'Rihlah, Capacity Building & Silaturahmi',
      subtitle: 'Pengembangan SDM & Ukhuwah',
      description: 'Kegiatan pengembangan karakter, kajian keilmuan, keakraban mahasantri, serta forum silaturahmi alumni Taruna Juara.',
      schedule: 'Bulanan',
      placeholderText: 'Upload Foto Kegiatan Rihlah PSDM di Sini',
      accentColor: 'from-[#D93829] to-amber-600',
    },
    {
      id: 'act-6',
      category: 'tahfidz',
      categoryLabel: 'Program Tahfidz Core',
      title: 'Murajaah Mandiri & Pasangan (Ziyadah Check)',
      subtitle: 'Menjaga Kelancaran Hafalan',
      description: 'Sesi khusus saling simak murajaah antarsantri untuk memperkuat hafalan surah-surah yang telah dihafalkan sebelumnya.',
      schedule: 'Setiap Bada Ashar',
      placeholderText: 'Upload Foto Murajaah Santri di Sini',
      accentColor: 'from-[#D93829] to-[#EA580C]',
    },
  ];

  const filteredActivities = selectedCategory === 'all'
    ? activities
    : activities.filter((a) => a.category === selectedCategory);

  return (
    <section id="activities" className="py-24 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Program & Aktivitas Rutin</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
              Kegiatan <span className="text-[#D93829]">Taruna Juara</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base text-neutral-600 font-medium max-w-md">
            Rangkaian kegiatan harian, mingguan, dan bulanan yang dirancang untuk mendukung pembinaan tahfidz 30 Juz dan karakter kepemimpinan.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'Semua Kegiatan' },
            { id: 'tahfidz', label: 'Program Tahfidz' },
            { id: 'krt', label: 'Divisi KRT (Asrama)' },
            { id: 'media', label: 'Media Kreatif' },
            { id: 'psdm', label: 'PSDM & Alumni' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedCategory(btn.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
                selectedCategory === btn.id
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Grid of Cards (Inspired by Reference UI Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((act) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={act.id}
              onClick={() => setActiveModalItem(act)}
              className="bg-white rounded-3xl p-5 border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image Placeholder Box */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-800 flex flex-col items-center justify-center p-4 text-center text-white mb-5 group-hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 text-amber-300">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2.5 py-1 rounded-full mb-1">
                    Ruang Foto Kegiatan
                  </span>
                  <span className="text-xs font-semibold text-neutral-300">
                    {act.placeholderText}
                  </span>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-xl text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#D93829]" />
                  </div>
                </div>

                {/* Badge Category */}
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[#D93829] bg-[#D93829]/10 mb-3">
                  {act.categoryLabel}
                </span>

                <h3 className="text-xl font-black text-neutral-900 mb-2 group-hover:text-[#D93829] transition-colors">
                  {act.title}
                </h3>

                <p className="text-xs text-neutral-600 font-medium line-clamp-3 leading-relaxed mb-4">
                  {act.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-400">
                  {act.schedule}
                </span>
                <span className="text-xs font-extrabold text-[#D93829] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Detail <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 font-bold"
              >
                ✕
              </button>

              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#D93829] bg-[#D93829]/10 uppercase tracking-wider mb-3">
                {activeModalItem.categoryLabel}
              </span>

              <h3 className="text-2xl font-black text-neutral-900 mb-2">
                {activeModalItem.title}
              </h3>
              <p className="text-sm font-semibold text-[#D93829] mb-4">
                {activeModalItem.subtitle}
              </p>

              {/* Large Image Placeholder inside Modal */}
              <div className="aspect-video rounded-2xl bg-neutral-800 flex flex-col items-center justify-center p-4 text-center text-white mb-4">
                <ImageIcon className="w-10 h-10 text-amber-300 mb-2" />
                <span className="text-xs font-bold text-amber-300">
                  {activeModalItem.placeholderText}
                </span>
                <span className="text-[10px] text-neutral-400 mt-1">
                  Format disukai: JPG / PNG (Ratio 16:9)
                </span>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed mb-6 font-medium">
                {activeModalItem.description}
              </p>

              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 flex items-center justify-between text-xs font-bold text-neutral-700">
                <span>Jadwal Pelaksanaan:</span>
                <span className="text-[#D93829]">{activeModalItem.schedule}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
