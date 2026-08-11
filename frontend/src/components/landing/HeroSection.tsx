import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenPMB: () => void;
  onExplorePrograms: () => void;
  heroData?: {
    title?: string;
    subtitle?: string;
    cta_primary_text?: string;
    cta_secondary_text?: string;
    stats?: {
      santri_count?: number;
      hafalan_target?: string;
      scholarship_rate?: string;
      alumni_success?: string;
    };
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPMB, onExplorePrograms, heroData }) => {
  const title = heroData?.title || 'Mencetak Generasi Huffazh Modern & Berdaya Saing.';
  const subtitle = heroData?.subtitle || 'Platform Digital Resmi Rumah Tahfidz Taruna Juara Al-Qur\'an Yogyakarta. Ekosistem modern yang mengelola, membina, dan memvisualisasikan seluruh perjalanan hafalan 30 Juz Mahasantri dari awal hingga menjadi Alumni.';
  const ctaPrimary = heroData?.cta_primary_text || 'Daftar PMB Online';
  const ctaSecondary = heroData?.cta_secondary_text || 'Jelajahi Program';

  const stats = heroData?.stats || {
    santri_count: 150,
    hafalan_target: '30 Juz',
    scholarship_rate: '100%',
    alumni_success: '98%'
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 overflow-hidden bg-[#FAF6F0]">
      {/* Curved Background Shape */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-[85%] bg-gradient-to-bl from-[#D93829] via-[#EA580C] to-[#F97316] rounded-b-[4rem] lg:rounded-bl-[8rem] lg:rounded-br-none -z-0 opacity-[0.95] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy */}
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
              {title}
            </h1>

            <p className="text-lg text-neutral-700 font-medium leading-relaxed mb-8 max-w-xl">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenPMB}
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-base font-extrabold text-white bg-neutral-900 hover:bg-[#D93829] shadow-xl shadow-neutral-900/15 hover:shadow-[#D93829]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExplorePrograms}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300/80 shadow-md hover:-translate-y-0.5 transition-all"
              >
                <BookOpen className="w-5 h-5 text-[#D93829]" />
                <span>{ctaSecondary}</span>
              </button>
            </div>

            {/* Trust Checklist Badges */}
            <div className="flex flex-wrap gap-4 text-xs font-bold text-neutral-600 border-t border-neutral-200/80 pt-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Target 30 Juz Mutqin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Beasiswa Full Nurturing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Jejaring Alumni Global</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Card Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="bg-white p-4 sm:p-6 rounded-[2.5rem] shadow-2xl border border-white/50 backdrop-blur-xl relative">
              <div className="aspect-[4/3] rounded-[2rem] bg-neutral-900 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-amber-400 border border-white/20">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Rumah Tahfidz Taruna Juara Al-Qur'an Yogyakarta
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md">
                    Gedung Asrama &amp; Pusat Pembinaan Mahasantri Rabbani
                  </p>
                </div>
              </div>

              {/* Floating Stat Pills */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-black text-amber-700">{stats.hafalan_target}</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900">Target Hafalan</div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-700">{stats.scholarship_rate}</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900">Beasiswa Full</div>
                </div>

                <div className="bg-[#D93829]/10 border border-[#D93829]/20 p-3 rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#D93829]">{stats.santri_count}+</div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#D93829]">Mahasantri</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
