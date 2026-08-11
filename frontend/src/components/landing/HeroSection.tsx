import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Award, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenPMB: () => void;
  onExplorePrograms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPMB, onExplorePrograms }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden bg-[#FAF6F0]">
      {/* Curved Background Shape (Inspired by Reference UI) */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-[85%] bg-gradient-to-bl from-[#D93829] via-[#EA580C] to-[#F97316] rounded-b-[4rem] lg:rounded-bl-[8rem] lg:rounded-br-none -z-0 opacity-[0.95] shadow-2xl">
        {/* Subtle Decorative Pattern Circles */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 pt-4 lg:pt-0"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#D93829]/20 shadow-sm text-xs font-bold text-[#D93829] mb-6">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Penerimaan Mahasantri Baru (PMB) Periode 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.15] tracking-tight mb-6">
              Mencetak Generasi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D93829] to-[#EA580C]">
                Huffazh Modern
              </span>{' '}
              & Berdaya Saing.
            </h1>

            <p className="text-lg text-neutral-700 font-medium leading-relaxed mb-8 max-w-xl">
              Platform Digital Resmi <strong className="text-neutral-900">Rumah Tahfidz Taruna Juara Al-Qur'an Yogyakarta</strong>.
              Ekosistem modern yang mengelola, membina, dan memvisualisasikan seluruh perjalanan hafalan 30 Juz Mahasantri dari awal hingga menjadi Alumni.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenPMB}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-base font-extrabold text-white bg-neutral-900 hover:bg-[#D93829] shadow-xl shadow-neutral-900/15 hover:shadow-[#D93829]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Daftar PMB Online</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExplorePrograms}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300/80 shadow-md hover:-translate-y-0.5 transition-all"
              >
                <BookOpen className="w-5 h-5 text-[#D93829]" />
                <span>Jelajahi Program</span>
              </button>
            </div>

            {/* Trust Features Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-300/60">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Target 30 Juz Mutqin</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Beasiswa Full Nurturing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Jejaring Alumni Global</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Container & Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Visual Image Card with Upload Placeholder */}
            <div className="relative z-10 bg-white p-3 sm:p-4 rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/40">
              <div className="relative aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-gradient-to-tr from-neutral-800 to-neutral-700 flex flex-col items-center justify-center text-white p-6 text-center group">
                {/* Visual Placeholder Overlay */}
                <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/20 transition-all"></div>

                {/* Placeholder Guidance Banner */}
                <div className="relative z-10 flex flex-col items-center max-w-md">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-amber-300">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-3 py-1 rounded-full mb-2">
                    Visual Hero Banner Placeholder
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                    Rumah Tahfidz Taruna Juara Al-Qur'an Yogyakarta
                  </h3>
                  <p className="text-xs text-neutral-200 font-medium leading-relaxed">
                    [ Ruang untuk Foto Utama Kegiatan Mahasantri / Gedung Asrama ]
                  </p>
                </div>
              </div>

              {/* Bottom Quick Feature Highlights Inside Image Card */}
              <div className="mt-4 grid grid-cols-3 gap-2 px-2 pb-2">
                <div className="bg-[#FAF6F0] p-3 rounded-xl text-center">
                  <div className="text-lg font-black text-[#D93829]">30 Juz</div>
                  <div className="text-[10px] font-bold text-neutral-600 uppercase">Target Hafalan</div>
                </div>
                <div className="bg-[#FAF6F0] p-3 rounded-xl text-center">
                  <div className="text-lg font-black text-emerald-700">100%</div>
                  <div className="text-[10px] font-bold text-neutral-600 uppercase">Beasiswa Full</div>
                </div>
                <div className="bg-[#FAF6F0] p-3 rounded-xl text-center">
                  <div className="text-lg font-black text-amber-600">3 Divisi</div>
                  <div className="text-[10px] font-bold text-neutral-600 uppercase">Pengurusan 2026</div>
                </div>
              </div>
            </div>

            {/* Floating Floating Stat Badge Top Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 sm:right-2 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-black">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-neutral-900">Huffazh Unggulan</div>
                <div className="text-xs text-neutral-500 font-medium">Lulusan Berkarakter</div>
              </div>
            </motion.div>

            {/* Floating Floating Stat Badge Bottom Left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-4 sm:left-2 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D93829]/10 flex items-center justify-center text-[#D93829] font-black">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-neutral-900">Pembinaan Intensif</div>
                <div className="text-xs text-neutral-500 font-medium">Ustadz & Musyrif Dedikasi</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
