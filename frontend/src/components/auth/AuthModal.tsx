import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Lock,
  Sparkles,
  KeyRound,
  ArrowRight,
  Info,
  Send,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../api/client';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, loginWithUserData, register, verifyEmail, switchPreset } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'verify_email'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password) {
      setErrorMsg('Harap lengkapi semua kolom pendaftaran.');
      return;
    }

    const { verificationCode } = register(name, email);
    setServerOtp(verificationCode);
    setSuccessMsg(`Kode verifikasi OTP telah dikirimkan ke email server (${email}).`);
    setMode('verify_email');
  };

  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const verified = verifyEmail(otpCode);
    if (verified) {
      onClose();
    } else {
      setErrorMsg('Kode OTP verifikasi salah. Silakan coba 123456 atau cek kode di layar.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Harap isi Email / Kode Registrasi dan Password Anda.');
      return;
    }

    try {
      const res = await apiService.login(email, password);
      if (res && res.status === 'success' && res.user) {
        loginWithUserData({
          id: res.user.id || `usr-${Date.now()}`,
          name: res.user.name || email.split('@')[0].toUpperCase(),
          email: res.user.email || email,
          role: res.user.role || 'applicant',
          isEmailVerified: true,
          nis: res.user.nis,
          nip: res.user.nip,
          university: res.user.university || 'Universitas Ahmad Dahlan',
          universityBadge: res.user.university_badge || 'UAD',
          applicantStage: res.user.applicant_stage || '1_DRAFT_PROFILE',
          applicantProfile: res.user.role === 'applicant' ? {
            fullName: res.user.name,
            nik: '3404012004050001',
            phone: res.user.phone || '081234567890',
            email: res.user.email || email,
            university: res.user.university || 'Universitas Ahmad Dahlan',
            universityBadge: res.user.university_badge || 'UAD',
            faculty: 'Teknologi Industri',
            major: res.user.major || 'Informatika',
            semester: '2',
            originCity: 'Yogyakarta',
            hafalanCount: res.user.hafalan_count || '5',
            targetJuz: res.user.target_juz || '30',
            track: 'beasiswa_full',
            quranExperience: 'Alumni SMA IT',
            motivation: 'Konsisten murajaah & ziadah harian.',
            ktpFile: res.user.ktp_filename || null,
            ktmFile: res.user.ktm_filename || null,
            photoFile: res.user.photo_filename || null,
            verificationStatus: res.user.verification_status || 'pending',
          } : undefined,
          createdAt: new Date().toISOString().split('T')[0],
        });
        onClose();
      } else {
        login(email);
        onClose();
      }
    } catch (err) {
      console.warn('Backend login fallback:', err);
      login(email);
      onClose();
    }
  };

  const handleQuickPreset = (
    preset: 'applicant_draft' | 'applicant_test' | 'applicant_passed' | 'santri' | 'alumni' | 'ustadz' | 'admin'
  ) => {
    switchPreset(preset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative my-8 overflow-hidden"
      >
        {/* Top Decor */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D93829] to-[#EA580C]"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 font-bold transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#D93829]/10 text-[#D93829] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-neutral-900">
            {mode === 'login' && 'Masuk Akun Platform'}
            {mode === 'register' && 'Daftar Akun Pendaftar'}
            {mode === 'verify_email' && 'Verifikasi Email Server'}
          </h3>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            {mode === 'login' && 'Masuk ke Portal Pendaftar, Santri, Ustadz, atau Admin'}
            {mode === 'register' && 'Buat akun pendaftar baru & verifikasi email server'}
            {mode === 'verify_email' && 'Masukkan 6-digit kode OTP verifikasi email server'}
          </p>
        </div>

        {/* Mode Selector Tabs (Login / Register) */}
        {mode !== 'verify_email' && (
          <div className="grid grid-cols-2 gap-2 mb-6 bg-neutral-100 p-1.5 rounded-2xl text-xs font-extrabold text-neutral-600">
            <button
              onClick={() => setMode('login')}
              className={`py-2 rounded-xl transition-all ${
                mode === 'login' ? 'bg-white text-[#D93829] shadow-sm font-black' : 'hover:text-neutral-900'
              }`}
            >
              Masuk Akun
            </button>
            <button
              onClick={() => setMode('register')}
              className={`py-2 rounded-xl transition-all ${
                mode === 'register' ? 'bg-white text-[#D93829] shadow-sm font-black' : 'hover:text-neutral-900'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>
        )}

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold">
            ✅ {successMsg}
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* LOGIN FORM */}
          {mode === 'login' && (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleLoginSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                  Email Terdaftar *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#D93829] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#D93829] font-semibold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#D93829] to-[#EA580C] hover:from-[#c22e20] shadow-lg shadow-[#D93829]/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Masuk ke Akun Saya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleRegisterSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                  Nama Lengkap Pendaftar *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Raihan"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#D93829] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                  Email Server Aktif *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@student.ac.id"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#D93829] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                  Buat Password Akun *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 Karakter"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#D93829] font-semibold"
                  />
                </div>
              </div>

              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 font-medium leading-relaxed">
                📧 Setelah mendaftar, kode verifikasi OTP akan dikirimkan ke Email Server untuk otentikasi akun.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white bg-neutral-900 hover:bg-[#D93829] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Kirim Verifikasi Email Server</span>
                <Send className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {/* VERIFY EMAIL OTP FORM */}
          {mode === 'verify_email' && (
            <motion.form
              key="verify_email"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleVerifyOtpSubmit}
              className="space-y-4"
            >
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs font-semibold text-amber-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span>Kode Verifikasi Email Server: </span>
                  <strong className="font-mono text-sm font-black text-[#D93829] bg-white px-2 py-0.5 rounded border border-amber-300">
                    {serverOtp || '123456'}
                  </strong>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                  Masukkan 6-Digit Kode OTP *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    maxLength={6}
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Masukkan 123456"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-base font-mono tracking-widest text-center bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-[#D93829] font-black"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOtpCode(serverOtp || '123456')}
                  className="w-1/2 py-2.5 rounded-xl text-xs font-bold bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                >
                  Isi Otomatis OTP
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl text-xs font-black text-white bg-[#D93829] hover:bg-[#b8291b]"
                >
                  Verifikasi Akun
                </button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>

        {/* Quick Testing Preset Switcher */}
        <div className="mt-8 pt-5 border-t border-neutral-100">
          <div className="text-[10px] font-black text-neutral-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>⚡ Pilihan Uji Coba Cepat (Presets):</span>
            <span className="text-[#D93829]">1-Click Demo</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
            <button
              onClick={() => handleQuickPreset('applicant_draft')}
              className="p-2 text-left bg-neutral-50 hover:bg-amber-50 rounded-xl border border-neutral-200 text-neutral-800"
            >
              <div className="font-extrabold text-[#D93829]">1. Pendaftar (Draft)</div>
              <div className="text-[9px] text-neutral-500">Lengkapi KTP/KTM</div>
            </button>

            <button
              onClick={() => handleQuickPreset('applicant_test')}
              className="p-2 text-left bg-neutral-50 hover:bg-amber-50 rounded-xl border border-neutral-200 text-neutral-800"
            >
              <div className="font-extrabold text-amber-700">2. Jadwal Tes Offline</div>
              <div className="text-[9px] text-neutral-500">Berkas di-ACC</div>
            </button>

            <button
              onClick={() => handleQuickPreset('applicant_passed')}
              className="p-2 text-left bg-neutral-50 hover:bg-emerald-50 rounded-xl border border-neutral-200 text-neutral-800"
            >
              <div className="font-extrabold text-emerald-700">3. Hasil Diterima</div>
              <div className="text-[9px] text-neutral-500">Konfirmasi Masuk</div>
            </button>

            <button
              onClick={() => handleQuickPreset('santri')}
              className="p-2 text-left bg-neutral-50 hover:bg-sky-50 rounded-xl border border-neutral-200 text-neutral-800"
            >
              <div className="font-extrabold text-sky-700">4. Santri Aktif (NIS)</div>
              <div className="text-[9px] text-neutral-500">Otomatis Terkonversi</div>
            </button>

            <button
              onClick={() => handleQuickPreset('alumni')}
              className="p-2 text-left bg-neutral-50 hover:bg-amber-50 rounded-xl border border-neutral-200 text-neutral-800"
            >
              <div className="font-extrabold text-amber-800">5. Akun Alumni 30Juz</div>
              <div className="text-[9px] text-neutral-500">Otomatis Lulus</div>
            </button>

            <button
              onClick={() => handleQuickPreset('ustadz')}
              className="p-2 text-left bg-neutral-50 hover:bg-purple-50 rounded-xl border border-neutral-200 text-neutral-800"
            >
              <div className="font-extrabold text-purple-700">6. Akun Privat Ustadz</div>
              <div className="text-[9px] text-neutral-500">NIP & Halaqah</div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
