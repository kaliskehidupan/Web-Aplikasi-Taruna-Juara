import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const UserStatusBanner: React.FC<{ onOpenApplicantDashboard?: () => void }> = ({
  onOpenApplicantDashboard,
}) => {
  const {
    user,
    simulateAdminApproveFiles,
    simulateAdminPassSelection,
    confirmCheckInAndConvertToSantri,
    simulateGraduateToAlumni,
  } = useAuth();

  if (!user) return null;

  const stage = user.applicantStage || '1_DRAFT_PROFILE';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 text-white border-b border-neutral-800 shadow-xl relative z-40 py-2.5 px-4 text-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Side: Role Badge & Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {user.role === 'applicant' && (
              <span className="px-2.5 py-1 bg-amber-500 text-neutral-950 rounded-lg font-black uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Akun Pendaftar PMB
              </span>
            )}
            {user.role === 'santri' && (
              <span className="px-2.5 py-1 bg-[#D93829] text-white rounded-lg font-black uppercase text-[10px] tracking-wider flex items-center gap-1 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5" /> Santri Aktif (NIS: {user.nis})
              </span>
            )}
            {user.role === 'alumni' && (
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-black uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Alumni 30 Juz Mutqin
              </span>
            )}
            {user.role === 'ustadz' && (
              <span className="px-2.5 py-1 bg-purple-600 text-white rounded-lg font-black uppercase text-[10px] tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Ustadz Pembina (NIP: {user.nip})
              </span>
            )}
            {user.role === 'admin' && (
              <span className="px-2.5 py-1 bg-neutral-700 text-white rounded-lg font-black uppercase text-[10px] tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Odoo Core
              </span>
            )}
          </div>

          <span className="font-bold text-neutral-200 hidden sm:inline">
            {user.name} ({user.email})
          </span>
        </div>

        {/* Middle Status / Stage Indicator for Applicant */}
        {user.role === 'applicant' && (
          <div className="flex items-center gap-2 bg-neutral-800 px-3 py-1 rounded-xl border border-neutral-700 text-neutral-300">
            <span className="text-[10px] text-neutral-400 font-bold">Status PMB:</span>
            {stage === '1_DRAFT_PROFILE' && (
              <span className="text-amber-400 font-extrabold flex items-center gap-1">
                📝 Lengkapi Data, KTP, KTM & Foto
              </span>
            )}
            {stage === '2_WAITING_VERIFICATION' && (
              <span className="text-amber-300 font-extrabold flex items-center gap-1 animate-pulse">
                ⏳ Menunggu Verifikasi Berkas Admin
              </span>
            )}
            {stage === '3_OFFLINE_TEST_SCHEDULED' && (
              <span className="text-sky-300 font-extrabold flex items-center gap-1">
                📅 Jadwal Tes Offline di Asrama ({user.applicantProfile?.testDate || 'Segera'})
              </span>
            )}
            {stage === '4_SELECTION_PASSED' && (
              <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                🎉 DITERIMA! Konfirmasi Tanggal Masuk
              </span>
            )}
            {stage === '4_SELECTION_REJECTED' && (
              <span className="text-rose-400 font-extrabold">
                ❌ Belum Memenuhi Kualifikasi
              </span>
            )}
          </div>
        )}

        {/* Right Side Action & Simulation Controls */}
        <div className="flex items-center gap-2">
          {user.role === 'applicant' && (
            <button
              onClick={onOpenApplicantDashboard}
              className="px-3 py-1 bg-[#D93829] hover:bg-[#b8291b] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1 text-[11px]"
            >
              <span>Buka Dashboard Pendaftar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Interactive Admin Simulation Controls */}
          {user.role === 'applicant' && stage === '2_WAITING_VERIFICATION' && (
            <button
              onClick={simulateAdminApproveFiles}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" /> Simulasi ACC Berkas Admin
            </button>
          )}

          {user.role === 'applicant' && stage === '3_OFFLINE_TEST_SCHEDULED' && (
            <button
              onClick={() => simulateAdminPassSelection(true)}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" /> Simulasi Diterima Seleksi
            </button>
          )}

          {user.role === 'applicant' && stage === '4_SELECTION_PASSED' && (
            <button
              onClick={() => confirmCheckInAndConvertToSantri('1 September 2026')}
              className="px-2.5 py-1 bg-[#D93829] hover:bg-[#b8291b] text-white font-bold rounded-lg text-[10px] flex items-center gap-1"
            >
              <GraduationCap className="w-3 h-3" /> Masuk Asrama ➔ Otomatis Santri
            </button>
          )}

          {user.role === 'santri' && (
            <button
              onClick={simulateGraduateToAlumni}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black rounded-lg text-[10px] flex items-center gap-1"
            >
              <Award className="w-3 h-3" /> Simulasi Lulus 30 Juz ➔ Otomatis Alumni
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
