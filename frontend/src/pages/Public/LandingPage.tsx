import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { UserStatusBanner } from '../../components/auth/UserStatusBanner';
import { AuthModal } from '../../components/auth/AuthModal';
import { ApplicantPortalPage } from '../Portal/ApplicantPortalPage';
import { HeroSection } from '../../components/landing/HeroSection';
import { AsramaBuildingMap } from '../../components/landing/AsramaBuildingMap';
import { VisionMissionSection } from '../../components/landing/VisionMissionSection';
import { TataTertibSection } from '../../components/landing/TataTertibSection';
import { UstadzPengasuhSection } from '../../components/landing/UstadzPengasuhSection';
import { StrukturKepengurusanSection } from '../../components/landing/StrukturKepengurusanSection';
import { KegiatanSection } from '../../components/landing/KegiatanSection';
import { StudentJourneySection } from '../../components/landing/StudentJourneySection';
import { PortalPreviewSection } from '../../components/landing/PortalPreviewSection';
import { PMBModal } from '../../components/landing/PMBModal';
import { Footer } from '../../components/common/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, UserCheck, Sparkles, ShieldCheck } from 'lucide-react';

export const LandingContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isPMBOpen, setIsPMBOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const [activePortalDemo, setActivePortalDemo] = useState<'santri' | 'ustadz' | 'alumni' | 'admin' | null>(null);

  const handleExplorePrograms = () => {
    const section = document.getElementById('dormitory');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePMBClick = () => {
    if (!isAuthenticated) {
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
    }
  };

  // IF USER IS AUTHENTICATED (LOGGED IN): DIRECTLY SHOW THE PORTAL APPLICATION VIEW!
  if (isAuthenticated) {
    return <ApplicantPortalPage />;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#D93829] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenPMBClick={handlePMBClick}
        onOpenPortal={(portalType) => setActivePortalDemo(portalType)}
      />

      {/* Persistent User Lifecycle Status & Simulation Controls Bar */}
      <div className="pt-20">
        <UserStatusBanner />
      </div>

      {/* Main Page Sections */}
      <main>
        <HeroSection
          onOpenPMB={handlePMBClick}
          onExplorePrograms={handleExplorePrograms}
        />
        <AsramaBuildingMap
          onOpenPMB={handlePMBClick}
        />
        <VisionMissionSection />
        <TataTertibSection />
        
        {/* Penempatan Pemilik Asrama, Ustadz & Musyrif DI ATAS Struktur Kepengurusan */}
        <UstadzPengasuhSection />
        
        <StrukturKepengurusanSection />
        <KegiatanSection />
        <StudentJourneySection />
        <PortalPreviewSection
          onOpenPortal={(portalType) => setActivePortalDemo(portalType)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <PMBModal isOpen={isPMBOpen} onClose={() => setIsPMBOpen(false)} />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Portal Demo Interactive Modal */}
      <AnimatePresence>
        {activePortalDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActivePortalDemo(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 font-bold"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#D93829]/10 text-[#D93829] rounded-full text-xs font-bold uppercase tracking-wider">
                  Pratinjau Portal Digital
                </span>
              </div>

              {activePortalDemo === 'santri' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#D93829] text-white flex items-center justify-center font-bold">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-neutral-900">Portal Santri (Mahasantri)</h3>
                      <p className="text-xs text-neutral-500 font-medium">Otentikasi & Ruang Pribadi Santri</p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 mb-4 space-y-3 text-xs">
                    <div className="flex justify-between font-bold text-neutral-800 border-b pb-2">
                      <span>Metode Login:</span>
                      <span className="text-[#D93829]">NIS (Nomor Induk Santri) & Password</span>
                    </div>
                    <div className="text-neutral-600 leading-relaxed font-medium">
                      Fitur Utama:
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Capaian Hafalan 30 Juz & Progress Bar Per-Surah</li>
                        <li>Daily Murajaah Check-in Heatmap</li>
                        <li>Pendaftaran Ujian Tasmi' Bil Ghaib</li>
                        <li>Jadwal Kegiatan & Giliran Piket Asrama</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activePortalDemo === 'ustadz' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-neutral-900">Portal Ustadz & Pembina</h3>
                      <p className="text-xs text-neutral-500 font-medium">Pusat Pembinaan & Halaqah</p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 mb-4 space-y-3 text-xs">
                    <div className="flex justify-between font-bold text-neutral-800 border-b pb-2">
                      <span>Metode Login:</span>
                      <span className="text-emerald-700">NIP Ustadz & SSO Odoo</span>
                    </div>
                    <div className="text-neutral-600 leading-relaxed font-medium">
                      Fitur Utama:
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Monitoring Kelompok Halaqah Bimbingan</li>
                        <li>Early Warning Alert untuk Santri Butuh Perhatian</li>
                        <li>Input Penilaian Tasmi' & Setoran Harian Fast-Entry</li>
                        <li>Rekapitulasi Laporan Perkembangan Pekanan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activePortalDemo === 'alumni' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-neutral-900">Portal Alumni Taruna Juara</h3>
                      <p className="text-xs text-neutral-500 font-medium">Jejaring & Pemeliharaan Hafalan</p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 mb-4 space-y-3 text-xs">
                    <div className="text-neutral-600 leading-relaxed font-medium">
                      Fitur Utama:
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Log Murajaah Mandiri Paska-Lulus 30 Juz</li>
                        <li>Tracer Study & Peta Sebaran Lokasi Alumni</li>
                        <li>Direktori Keahlian & Lowongan Karir Alumni</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activePortalDemo === 'admin' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-neutral-900">Odoo Core Backend Admin</h3>
                      <p className="text-xs text-neutral-500 font-medium">Single Source of Truth & ERP Engine</p>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 mb-4 text-xs font-medium text-neutral-700">
                    Odoo Core mengelola database terpusat PostgreSQL, workflow beasiswa, hak akses pengguna, serta integrasi modul custom <code className="bg-neutral-200 px-1 py-0.5 rounded font-mono text-[#D93829]">taruna_juara_core</code>.
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActivePortalDemo(null)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-neutral-900 hover:bg-[#D93829] transition-colors"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  return (
    <AuthProvider>
      <LandingContent />
    </AuthProvider>
  );
};
