import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Sparkles, BookOpen, ShieldCheck, HeartHandshake } from 'lucide-react';

export const VisionMissionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visi' | 'misi' | 'pilar'>('visi');

  const misis = [
    {
      title: 'Pembinaan Tahfidz Interaktif & Terukur',
      description: 'Menyelenggarakan sistem pengajaran Al-Qur\'an dengan target ziadah dan murajaah harian yang terpantau secara konsisten.',
      icon: BookOpen,
    },
    {
      title: 'Pengembangan Karakter & Kemandirian (KRT)',
      description: 'Membentuk kedisiplinan, ukhuwah islamiyah, serta kebersihan dan keteraturan kehidupan asrama mahasantri.',
      icon: ShieldCheck,
    },
    {
      title: 'Pemberdayaan Media & Da\'wah Digital',
      description: 'Melatih mahasantri dalam pembuatan konten media kreatif agar da\'wah Al-Qur\'an dapat menjangkau generasi muda.',
      icon: Sparkles,
    },
    {
      title: 'Pengembangan SDM & Jejaring Alumni (PSDM)',
      description: 'Meningkatkan kapasitas kepemimpinan mahasantri serta merawat silaturahmi alumni yang berkelanjutan.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="vision" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>Arah & Landasan Lembaga</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Visi & Misi <span className="text-[#D93829]">Taruna Juara</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-medium">
            Komitmen kami dalam melahirkan para penghafal Al-Qur'an yang tidak hanya kuat hafalannya, tetapi juga unggul secara karakter, kepemimpinan, dan kecakapan era digital.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200 shadow-inner">
            <button
              onClick={() => setActiveTab('visi')}
              className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
                activeTab === 'visi'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Visi Utama
            </button>
            <button
              onClick={() => setActiveTab('misi')}
              className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
                activeTab === 'misi'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              4 Misi Pembinaan
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'visi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#FAF6F0] to-orange-50 rounded-3xl p-8 sm:p-12 border border-[#D93829]/15 shadow-xl relative overflow-hidden"
          >
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-[#D93829] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D93829]/30">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight mb-6">
                "Menjadi Lembaga Pencetak Huffazh Al-Qur'an 30 Juz yang Berkarakter Islami, Berjiwa Pemimpin, dan Adaptif Terhadap Perkembangan Teknologi Digital."
              </h3>
              <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-2xl mx-auto">
                Taruna Juara Al-Qur'an Yogyakarta hadir bukan sekadar sebagai tempat menghafal, tetapi sebagai ekosistem pembinaan holistik yang membentuk mahasantri menjadi pribadi yang siap mengabdi untuk masyarakat dan agama.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'misi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {misis.map((misi, idx) => {
              const IconComp = misi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-lg hover:shadow-xl hover:border-[#D93829]/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#D93829]/10 text-[#D93829] group-hover:bg-[#D93829] group-hover:text-white flex items-center justify-center mb-6 transition-all">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-extrabold text-neutral-900 mb-3 group-hover:text-[#D93829] transition-colors">
                    {misi.title}
                  </h4>
                  <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                    {misi.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
