import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

interface VisionMissionProps {
  visionMissionData?: {
    vision?: string;
    missions?: string[];
  };
}

export const VisionMissionSection: React.FC<VisionMissionProps> = ({ visionMissionData }) => {
  const vision = visionMissionData?.vision || 'Menjadi pusat keunggulan pencetak huffazh Al-Qur\'an 30 Juz yang berjiwa pemimpin Rabbani, mandiri, dan berdaya saing global pada tahun 2030.';
  const missions = visionMissionData?.missions || [
    'Menyelenggarakan pendidikan tahfidz Al-Qur\'an 30 Juz secara mutqin dengan pemahaman tafsir Rabbani.',
    'Membentuk karakter kepemimpinan, kedisiplinan, dan etika Islam yang kuat berbasis ketaatan.',
    'Mengembangkan potensi akademik, kewirausahaan, dan teknologi informasi mahasantri.'
  ];

  return (
    <section id="vision-mission" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] text-xs font-black uppercase tracking-wider inline-block mb-3">
            Visi, Misi &amp; Core Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
            Landasan Filosofis Pembinaan Mahasantri
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Taruna Juara didirikan atas komitmen kokoh dalam mencetak hafizh Qur'an yang unggul di bidang akademis dan mandiri secara ekonomi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#D93829] flex items-center justify-center text-white mb-6 shadow-lg shadow-[#D93829]/30">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 mb-2 block">
                Visi Utama 2030
              </span>
              <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                Pusat Kaderisasi Huffazh Rabbani Global
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed mb-6">
                "{vision}"
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-400">
              <span>Fokus: Tahfidz + Leadership</span>
              <span className="text-amber-400">Target 100% Mutqin</span>
            </div>
          </motion.div>

          {/* Missions Card List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#FAF6F0] p-8 sm:p-10 rounded-3xl border border-neutral-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-neutral-900">Misi Strategis</h3>
                  <p className="text-xs text-neutral-500 font-medium">Langkah Nyata Pembinaan Harian</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {missions.map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200/60 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-[#D93829] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-3 gap-3 border-t border-neutral-200 pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-700">Integritas</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-700">Ukhuwah</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D93829] shrink-0" />
                <span className="text-xs font-bold text-neutral-700">Kemandirian</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
