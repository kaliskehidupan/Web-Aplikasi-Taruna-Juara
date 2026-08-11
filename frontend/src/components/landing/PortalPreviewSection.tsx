import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, UserCheck, Sparkles, LayoutDashboard, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PortalPreviewSectionProps {
  onOpenPortal: (portalType: 'santri' | 'ustadz' | 'alumni' | 'admin') => void;
}

export const PortalPreviewSection: React.FC<PortalPreviewSectionProps> = ({ onOpenPortal }) => {
  const [activePortalTab, setActivePortalTab] = useState<'santri' | 'ustadz' | 'alumni'>('santri');

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <LayoutDashboard className="w-4 h-4" />
            <span>Integrasi Portal Digital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Ruang Digital Khusus <span className="text-[#D93829]">Keluarga Besar</span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-medium">
            Pengalaman antarmuka khusus yang disesuaikan untuk Santri, Ustadz Pembina, dan Alumni.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200">
            <button
              onClick={() => setActivePortalTab('santri')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activePortalTab === 'santri'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Portal Santri</span>
            </button>
            <button
              onClick={() => setActivePortalTab('ustadz')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activePortalTab === 'ustadz'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Portal Ustadz</span>
            </button>
            <button
              onClick={() => setActivePortalTab('alumni')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                activePortalTab === 'alumni'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Portal Alumni</span>
            </button>
          </div>
        </div>

        {/* Portal Preview Screen Mockup */}
        <motion.div
          key={activePortalTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-800 relative overflow-hidden"
        >
          {/* Top Window Dots Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-neutral-400 font-mono ml-2">
                app.tarunajuara.org/{activePortalTab}
              </span>
            </div>
            <button
              onClick={() => onOpenPortal(activePortalTab)}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#D93829] text-white hover:bg-[#c22e20] transition-colors"
            >
              Uji Coba Portal Demo
            </button>
          </div>

          {/* Portal Content Previews */}
          {activePortalTab === 'santri' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <span className="text-xs font-bold text-[#D93829] uppercase tracking-wider">
                  Ruang Pribadi Mahasantri
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4">
                  Visualisasi Progress Hafalan 30 Juz & Murajaah Harian
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium">
                  Begitu login, Santri disambut dengan grafik perkembangan hafalan per Surah/Juz, target ziadah hari ini, serta riwayat nilai ujian Tasmi'.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Target Ziadah Hari Ini: Surah Al-Kahfi Ayat 1 - 30</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Tracker Heatmap Murajaah Konsisten</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Pendaftaran Tasmi' Online 1-30 Juz</span>
                  </div>
                </div>
              </div>

              {/* Mockup Widget */}
              <div className="md:col-span-6 bg-neutral-800/80 p-6 rounded-2xl border border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-neutral-400 font-bold">Progress Hafalan</div>
                    <div className="text-xl font-extrabold text-white">18 dari 30 Juz (60%)</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                    On Track
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-neutral-700 h-3 rounded-full overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-[#D93829] to-amber-500 h-full w-[60%] rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                    <div className="text-neutral-400 font-medium">Setoran Pekan Ini</div>
                    <div className="text-base font-bold text-amber-400">12 Halaman</div>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                    <div className="text-neutral-400 font-medium">Nilai Tasmi' Terakhir</div>
                    <div className="text-base font-bold text-emerald-400">96 / 100 (Mumtaz)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === 'ustadz' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Pusat Pembinaan Ustadz
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4">
                  Dashboard Halaqah & Early Warning System Santri
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium">
                  Ustadz pembina dapat memantau seluruh perkembangan santri halaqah bimbingan dan langsung mendapatkan notifikasi apabila ada santri yang membutuhkan perhatian ekstra.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Statistik Perkembangan Hafalan Halaqah</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Early Warning Alert untuk Santri Tertinggal</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>Form Evaluasi Setoran & Nilai Tasmi' Fast-Input</span>
                  </div>
                </div>
              </div>

              {/* Mockup Widget */}
              <div className="md:col-span-6 bg-neutral-800/80 p-6 rounded-2xl border border-neutral-700">
                <div className="text-xs text-neutral-400 font-bold mb-3">Monitoring Halaqah Bimbingan (12 Santri)</div>
                <div className="space-y-2">
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Ahmad Fauzi</div>
                      <div className="text-neutral-400 text-[10px]">Setoran: 2 Halaman (Jayyid Jiddan)</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg">
                      Lancar
                    </span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-amber-500/40 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Muhammad Rizky</div>
                      <div className="text-amber-400 text-[10px]">Belum Setoran 2 Hari</div>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold rounded-lg flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Perlu Perhatian
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === 'alumni' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Jejaring & Silaturahmi Alumni
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4">
                  Pemeliharaan Hafalan Paska-Lulus & Tracer Study
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium">
                  Hubungan alumni yang tetap terjaga melalui fitur murajaah mandiri paska-lulus, pendataan studi/karir, serta jejaring sesama alumni.
                </p>
              </div>

              {/* Mockup Widget */}
              <div className="md:col-span-6 bg-neutral-800/80 p-6 rounded-2xl border border-neutral-700 text-xs text-neutral-300">
                <div className="font-bold text-white text-sm mb-2">Tracer Study & Karir Alumni</div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                    <div className="text-amber-400 font-bold text-lg">95%</div>
                    <div className="text-[10px] text-neutral-400">Alumni Aktif Murajaah</div>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                    <div className="text-sky-400 font-bold text-lg">100+</div>
                    <div className="text-[10px] text-neutral-400">Jejaring Karir & Studi</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
