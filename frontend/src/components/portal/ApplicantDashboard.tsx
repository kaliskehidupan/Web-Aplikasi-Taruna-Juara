import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Building2,
  UploadCloud,
  FileText,
  Camera,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  GraduationCap,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ApplicantProfile } from '../../types/auth';

interface ApplicantDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({ isOpen, onClose }) => {
  const {
    user,
    submitApplicantProfile,
    simulateAdminApproveFiles,
    simulateAdminPassSelection,
    confirmCheckInAndConvertToSantri,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'test' | 'result' | 'checkin'>('profile');

  // Form State initialized from user profile
  const p = user?.applicantProfile;
  const [formData, setFormData] = useState<ApplicantProfile>({
    fullName: p?.fullName || user?.name || '',
    nik: p?.nik || '3404012004050001',
    phone: p?.phone || '081234567890',
    email: p?.email || user?.email || '',
    university: p?.university || 'Universitas Ahmad Dahlan',
    universityBadge: p?.universityBadge || 'UAD',
    faculty: p?.faculty || 'Teknologi Industri',
    major: p?.major || 'Informatika',
    semester: p?.semester || '2',
    originCity: p?.originCity || 'Lampung',
    hafalanCount: p?.hafalanCount || '5',
    targetJuz: p?.targetJuz || '30',
    track: p?.track || 'beasiswa_full',
    quranExperience: p?.quranExperience || 'SMA IT / Pondok Tahfidz',
    motivation: p?.motivation || 'Ingin menghafal 30 juz al-Qur\'an sambil kuliah.',
    ktpFile: p?.ktpFile || null,
    ktmFile: p?.ktmFile || null,
    photoFile: p?.photoFile || null,
    verificationStatus: p?.verificationStatus || 'pending',
  });

  const [checkInDate, setCheckInDate] = useState<string>('1 September 2026');

  if (!isOpen || !user) return null;

  const stage = user.applicantStage || '1_DRAFT_PROFILE';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'university') {
      let badge = 'UAD';
      if (value.includes('Gadjah Mada')) badge = 'UGM';
      else if (value.includes('Negeri Yogyakarta')) badge = 'UNY';
      else if (value.includes('Islam Indonesia')) badge = 'UII';
      else if (value.includes('Muhammadiyah Yogyakarta')) badge = 'UMY';
      setFormData({ ...formData, university: value, universityBadge: badge });
    } else {
      setFormData({ ...formData, [name]: value as any });
    }
  };

  const handleHafalanChange = (field: 'hafalanCount' | 'targetJuz', rawVal: string) => {
    let num = parseInt(rawVal, 10);
    if (isNaN(num)) num = field === 'hafalanCount' ? 0 : 30;

    setFormData((prev) => {
      let currentHafalan = field === 'hafalanCount' ? num : parseInt(prev.hafalanCount, 10) || 0;
      let targetHafalan = field === 'targetJuz' ? num : parseInt(prev.targetJuz, 10) || 30;

      if (currentHafalan < 0) currentHafalan = 0;
      if (currentHafalan > 30) currentHafalan = 30;

      if (targetHafalan < 1) targetHafalan = 1;
      if (targetHafalan > 30) targetHafalan = 30;

      if (targetHafalan < currentHafalan) {
        targetHafalan = currentHafalan;
      }

      return {
        ...prev,
        hafalanCount: currentHafalan.toString(),
        targetJuz: targetHafalan.toString(),
      };
    });
  };

  const handleSemesterChange = (rawVal: string) => {
    let num = parseInt(rawVal, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 14) num = 14;

    setFormData((prev) => ({
      ...prev,
      semester: num.toString(),
    }));
  };

  const handleRealFileUpload = (field: 'ktpFile' | 'ktmFile' | 'photoFile', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  const handleSubmitProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplicantProfile(formData);
    setActiveTab('profile');
  };

  const handleConfirmMoveIn = () => {
    confirmCheckInAndConvertToSantri(checkInDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative my-8 overflow-hidden"
      >
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D93829] via-amber-500 to-[#EA580C]"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 font-bold transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Dashboard Pendaftar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#D93829] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#D93829]/20">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-neutral-900">{user.name}</h3>
                <span className="px-2.5 py-0.5 bg-amber-400 text-neutral-950 font-black text-[10px] uppercase rounded-md">
                  {formData.universityBadge}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                Dashboard Portal Pendaftar PMB • Rumah Tahfidz Taruna Juara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF6F0] p-3 rounded-2xl border border-amber-200 text-xs font-bold">
            <Clock className="w-4 h-4 text-[#D93829] shrink-0" />
            <div>
              <div className="text-[10px] text-neutral-400 font-bold uppercase">Tahap Pendaftaran:</div>
              <div className="text-[#D93829] font-black">
                {stage === '1_DRAFT_PROFILE' && '1. Lengkapi Data & Upload Berkas'}
                {stage === '2_WAITING_VERIFICATION' && '2. Menunggu ACC Berkas Admin'}
                {stage === '3_OFFLINE_TEST_SCHEDULED' && '3. Jadwal Tes Seleksi Offline'}
                {stage === '4_SELECTION_PASSED' && '4. DITERIMA! Persetujuan Masuk'}
                {stage === '4_SELECTION_REJECTED' && '4. Hasil Seleksi: Belum Lolos'}
                {stage === '6_CONVERTED_SANTRI' && '5. Menjadi Santri Aktif (NIS)'}
              </div>
            </div>
          </div>
        </div>

        {/* PMB Lifecycle Step Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 bg-neutral-100 p-2 rounded-2xl text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 px-2 text-center rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            1. Biodata & Upload
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`py-2.5 px-2 text-center rounded-xl transition-all ${
              activeTab === 'test'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            2. Jadwal Tes Offline
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`py-2.5 px-2 text-center rounded-xl transition-all ${
              activeTab === 'result'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            3. Pengumuman Seleksi
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`py-2.5 px-2 text-center rounded-xl transition-all ${
              activeTab === 'checkin'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            4. Tanggal Masuk Asrama
          </button>
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">

          {/* TAB 1: FORM LENGKAPI DATA DIRI & UPLOAD BERKAS */}
          {activeTab === 'profile' && (
            <motion.form
              key="tab-profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmitProfileForm}
              className="space-y-6"
            >
              {stage === '2_WAITING_VERIFICATION' && (
                <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-900 font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 animate-spin-slow" />
                    <span>Berkas pendaftaran Anda telah dikirim dan <strong>sedang ditinjau oleh Admin</strong>.</span>
                  </div>
                  <button
                    type="button"
                    onClick={simulateAdminApproveFiles}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shrink-0"
                  >
                    Simulasi ACC Berkas oleh Admin ➔
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Nama Lengkap Mahasantri *
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Nomor NIK / KTP *
                  </label>
                  <input
                    required
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Nomor WhatsApp Active *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Email Mahasiswa *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Perguruan Tinggi *
                  </label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  >
                    <option value="Universitas Ahmad Dahlan">Universitas Ahmad Dahlan (UAD)</option>
                    <option value="Universitas Gadjah Mada">Universitas Gadjah Mada (UGM)</option>
                    <option value="Universitas Negeri Yogyakarta">Universitas Negeri Yogyakarta (UNY)</option>
                    <option value="Universitas Islam Indonesia">Universitas Islam Indonesia (UII)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Fakultas *
                  </label>
                  <input
                    required
                    type="text"
                    name="faculty"
                    placeholder="Contoh: Fakultas Teknologi Industri"
                    value={formData.faculty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Program Studi (Prodi) *
                  </label>
                  <input
                    required
                    type="text"
                    name="major"
                    placeholder="Contoh: S1 Informatika"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1 flex justify-between">
                    <span>Semester Kuliah *</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Min: 1, Max: 14</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="14"
                    name="semester"
                    placeholder="1 - 14"
                    value={formData.semester}
                    onChange={(e) => handleSemesterChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                {/* Hafalan Saat Ini */}
                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1 flex justify-between">
                    <span>Capaian Hafalan Saat Ini (Juz) *</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Min: 0, Max: 30 Juz</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    max="30"
                    name="hafalanCount"
                    placeholder="0 - 30"
                    value={formData.hafalanCount}
                    onChange={(e) => handleHafalanChange('hafalanCount', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-black text-emerald-800"
                  />
                </div>

                {/* Target Hafalan */}
                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1 flex justify-between">
                    <span>Target Hafalan Di Asrama (Juz) *</span>
                    <span className="text-[10px] text-[#D93829] font-bold">≥ {formData.hafalanCount} Juz, Max: 30</span>
                  </label>
                  <input
                    required
                    type="number"
                    min={formData.hafalanCount || "1"}
                    max="30"
                    name="targetJuz"
                    placeholder={`${formData.hafalanCount || 1} - 30`}
                    value={formData.targetJuz}
                    onChange={(e) => handleHafalanChange('targetJuz', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-black text-[#D93829]"
                  />
                </div>

                {/* Pengalaman Tahfidz */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Pengalaman / Latar Belakang Tahfidz *
                  </label>
                  <input
                    required
                    type="text"
                    name="quranExperience"
                    placeholder="Contoh: Alumni SMA IT / Pondok Tahfidz / Belajar Mandiri"
                    value={formData.quranExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>

                {/* Motivasi */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                    Motivasi Menghafal Al-Qur'an *
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="motivation"
                    placeholder="Tuliskan motivasi utama Anda..."
                    value={formData.motivation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold"
                  />
                </div>
              </div>

              {/* Upload Box Mandatory: KTP, KTM, Foto Profil */}
              <div>
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <UploadCloud className="w-4 h-4 text-[#D93829]" />
                  <span>Upload Berkas Wajib (KTP, KTM, & Foto Profil)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Upload KTP */}
                  <div className="bg-neutral-50 p-3.5 rounded-2xl border-2 border-dashed border-neutral-300 text-center hover:border-[#D93829] transition-colors relative">
                    <FileText className="w-6 h-6 text-[#D93829] mx-auto mb-1" />
                    <span className="block text-xs font-bold text-neutral-800">1. Foto KTP</span>
                    <span className="block text-[10px] text-neutral-400 mb-2">PDF/JPG Max 5MB</span>
                    <label className={`block w-full py-1.5 px-2 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      formData.ktpFile
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-neutral-900 text-white hover:bg-[#D93829]'
                    }`}>
                      <span>{formData.ktpFile ? `✅ ${formData.ktpFile}` : 'Pilih File KTP'}</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleRealFileUpload('ktpFile', e)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Upload KTM */}
                  <div className="bg-neutral-50 p-3.5 rounded-2xl border-2 border-dashed border-neutral-300 text-center hover:border-[#D93829] transition-colors relative">
                    <Building2 className="w-6 h-6 text-[#D93829] mx-auto mb-1" />
                    <span className="block text-xs font-bold text-neutral-800">2. Foto KTM</span>
                    <span className="block text-[10px] text-neutral-400 mb-2">PDF/JPG Max 5MB</span>
                    <label className={`block w-full py-1.5 px-2 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      formData.ktmFile
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-neutral-900 text-white hover:bg-[#D93829]'
                    }`}>
                      <span>{formData.ktmFile ? `✅ ${formData.ktmFile}` : 'Pilih File KTM'}</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleRealFileUpload('ktmFile', e)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Upload Foto Profil */}
                  <div className="bg-neutral-50 p-3.5 rounded-2xl border-2 border-dashed border-neutral-300 text-center hover:border-[#D93829] transition-colors relative">
                    <Camera className="w-6 h-6 text-[#D93829] mx-auto mb-1" />
                    <span className="block text-xs font-bold text-neutral-800">3. Pas Foto Rapi</span>
                    <span className="block text-[10px] text-neutral-400 mb-2">JPG/PNG Max 5MB</span>
                    <label className={`block w-full py-1.5 px-2 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      formData.photoFile
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-neutral-900 text-white hover:bg-[#D93829]'
                    }`}>
                      <span>{formData.photoFile ? `✅ ${formData.photoFile}` : 'Pilih Pas Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleRealFileUpload('photoFile', e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                <span className="text-xs text-neutral-500 font-semibold">
                  * Pastikan data & berkas terisi dengan benar.
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl text-xs font-black text-white bg-neutral-900 hover:bg-[#D93829] shadow-lg transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Simpan & Kirim Berkas Pendaftaran</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* TAB 2: KARTU JADWAL TES SELEKSI OFFLINE */}
          {activeTab === 'test' && (
            <motion.div
              key="tab-test"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {stage === '1_DRAFT_PROFILE' || stage === '2_WAITING_VERIFICATION' ? (
                <div className="bg-[#FAF6F0] p-8 rounded-3xl border-2 border-dashed border-amber-300 text-center max-w-lg mx-auto">
                  <Clock className="w-12 h-12 text-[#D93829] mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-black text-neutral-900 mb-1">
                    Menunggu Verifikasi & ACC Berkas
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
                    Jadwal tes seleksi offline akan diterbitkan secara otomatis setelah berkas (KTP, KTM, Foto) Anda disetujui oleh tim verifikasi admin PMB.
                  </p>

                  <button
                    onClick={simulateAdminApproveFiles}
                    className="px-5 py-2.5 bg-[#D93829] text-white font-extrabold text-xs rounded-xl shadow-md"
                  >
                    ⚡ Klik Simulasi ACC Berkas Admin
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Kartu Ujian Official */}
                  <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white p-6 sm:p-8 rounded-3xl border-2 border-amber-400 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-neutral-700 pb-4 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-400 text-neutral-950 font-black text-[10px] uppercase tracking-wider rounded-md">
                          KARTU UJIAN RESMI
                        </span>
                        <span className="text-xs text-neutral-400 font-bold">PMB-2026-TJ-OFFLINE</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Berkas ACC & Terverifikasi
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-neutral-800/80 p-3.5 rounded-2xl border border-neutral-700">
                        <div className="text-neutral-400 text-[10px] font-bold uppercase mb-0.5">Hari & Tanggal Tes</div>
                        <div className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#D93829]" />
                          <span>{p?.testDate || 'Sabtu, 15 Agustus 2026'}</span>
                        </div>
                      </div>

                      <div className="bg-neutral-800/80 p-3.5 rounded-2xl border border-neutral-700">
                        <div className="text-neutral-400 text-[10px] font-bold uppercase mb-0.5">Waktu / Jam Tes</div>
                        <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-sky-400" />
                          <span>{p?.testTime || '08:00 - 11:30 WIB'}</span>
                        </div>
                      </div>

                      <div className="bg-neutral-800/80 p-3.5 rounded-2xl border border-neutral-700 sm:col-span-2">
                        <div className="text-neutral-400 text-[10px] font-bold uppercase mb-0.5">Lokasi Seleksi Offline</div>
                        <div className="font-extrabold text-white text-xs flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#D93829] shrink-0" />
                          <span>{p?.testLocation || 'Aula Utama Asrama Rumah Tahfidz Taruna Juara Yogyakarta'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700 text-xs text-neutral-300 space-y-1">
                      <div className="font-bold text-amber-300 text-[11px] mb-1">Materi & Hal yang Wajib Dibawa:</div>
                      <ul className="list-disc list-inside space-y-1 text-[11px]">
                        <li>Membawa Mushaf Al-Qur'an hafalan pribadi.</li>
                        <li>Membawa KTP & KTM asli untuk verifikasi fisik.</li>
                        <li>Tes seleksi mencakup Ujian Wawancara Motivasi & Tes Kelancaran Tahsin Al-Qur'an.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Admin Simulation Action */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => simulateAdminPassSelection(true)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl shadow-md flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Simulasi Admin: Nyatakan DITERIMA (Lolos)</span>
                    </button>
                    <button
                      onClick={() => simulateAdminPassSelection(false)}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-2xl"
                    >
                      Simulasi: Ditolak
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: PENGUMUMAN HASIL SELEKSI (DITERIMA / DITOLAK) */}
          {activeTab === 'result' && (
            <motion.div
              key="tab-result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {stage === '4_SELECTION_PASSED' ? (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 p-8 rounded-3xl text-center max-w-xl mx-auto shadow-xl">
                  <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                    <Sparkles className="w-10 h-10 text-amber-300" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider rounded-full inline-block mb-2">
                    PENGUMUMAN SELEKSI OFFICIAL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-2">
                    SELAMAT! ANDA DITERIMA 🎉
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed mb-6">
                    Berdasarkan hasil Tes Wawancara & Bacaan Tahsin Al-Qur'an, saudara <strong className="text-emerald-950">{user.name}</strong> dinyatakan <strong>DITERIMA SEBAGAI MAHASANTRI TARUNA JUARA 2026</strong>.
                  </p>

                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-2 mb-6">
                    <div className="font-extrabold text-emerald-900 border-b pb-1">Catatan Dewan Penguji:</div>
                    <p className="text-neutral-700 italic">"{p?.selectionNotes || 'Lulus Seleksi Wawancara & Tahsin dengan Nilai Sangat Baik.'}"</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('checkin')}
                    className="px-6 py-3.5 bg-neutral-900 hover:bg-[#D93829] text-white font-extrabold text-xs rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <span>Lanjut ke Formulir Tanggal Masuk Asrama</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : stage === '4_SELECTION_REJECTED' ? (
                <div className="bg-rose-50 border-2 border-rose-200 p-8 rounded-3xl text-center max-w-xl mx-auto shadow-md">
                  <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-rose-950 mb-2">
                    Mohon Maaf, Belum Memenuhi Kualifikasi
                  </h3>
                  <p className="text-xs text-rose-900 font-medium leading-relaxed mb-4">
                    Terima kasih atas partisipasi Anda dalam seleksi PMB Taruna Juara. Kuota tahun ini telah terpenuhi, namun Anda tetap terdaftar sebagai cadangan beasiswa.
                  </p>
                </div>
              ) : (
                <div className="bg-[#FAF6F0] p-8 rounded-3xl border border-neutral-300 text-center max-w-md mx-auto">
                  <Clock className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                  <h4 className="text-base font-black text-neutral-900 mb-1">
                    Hasil Seleksi Belum Diterbitkan
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium">
                    Pengumuman kelulusan resmi akan dipublikasikan di halaman ini setelah pelaksanaan tes seleksi offline di asrama selesai.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: PERSETUJUAN TANGGAL MASUK ASRAMA & OTOMATIS KONVERSI AKUN SANTRI */}
          {activeTab === 'checkin' && (
            <motion.div
              key="tab-checkin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {stage === '4_SELECTION_PASSED' ? (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-xl max-w-2xl mx-auto space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#D93829] text-white flex items-center justify-center font-bold shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-neutral-900">
                        Formulir Persetujuan Tanggal Masuk Asrama
                      </h4>
                      <p className="text-xs text-neutral-500 font-medium">
                        Silakan pilih tanggal kepindahan / masuk asrama (Check-in) Anda.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-neutral-200/80 space-y-3">
                    <div>
                      <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                        Pilih Tanggal Kedatangan / Check-in Asrama *
                      </label>
                      <select
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm bg-white border border-neutral-300 font-bold text-neutral-900"
                      >
                        <option value="1 September 2026">Gelombang 1: 1 September 2026</option>
                        <option value="5 September 2026">Gelombang 2: 5 September 2026</option>
                        <option value="10 September 2026">Gelombang 3: 10 September 2026</option>
                      </select>
                    </div>

                    <div className="text-xs text-neutral-600 font-medium leading-relaxed bg-white p-3 rounded-xl border border-neutral-200">
                      ℹ️ <strong>Ketentuan Masuk Asrama:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-[11px]">
                        <li>Membawa peralatan ibadah, kasur lipat/sprei pribadi, dan mushaf hafalan.</li>
                        <li>Setelah dikonfirmasi, akun pendaftar Anda akan <strong>otomatis berubah menjadi Akun Santri Aktif</strong> lengkap dengan NIS (Nomor Induk Santri).</li>
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmMoveIn}
                    className="w-full py-4 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#D93829] to-[#EA580C] hover:from-[#c22e20] shadow-xl shadow-[#D93829]/25 flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Konfirmasi Masuk Asrama ➔ Otomatis Konversi Akun Santri</span>
                  </button>
                </div>
              ) : stage === '6_CONVERTED_SANTRI' ? (
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-8 rounded-3xl text-center max-w-xl mx-auto shadow-2xl border-2 border-amber-400">
                  <div className="w-16 h-16 rounded-3xl bg-[#D93829] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider rounded-md inline-block mb-2">
                    AKUN SANTRI AKTIF TERVERIFIKASI
                  </span>
                  <h3 className="text-2xl font-black mb-1">
                    Selamat Datang, Mahasantri Baru!
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium mb-4">
                    Akun Anda telah <strong>otomatis bertransisi menjadi Akun Santri</strong> dengan NIS: <strong className="text-amber-300 font-mono text-base">{user.nis}</strong>.
                  </p>

                  <button
                    onClick={onClose}
                    className="px-6 py-3.5 bg-[#D93829] hover:bg-[#b8291b] text-white font-black text-xs rounded-2xl shadow-lg transition-colors"
                  >
                    Akses Portal Santri Sekarang
                  </button>
                </div>
              ) : (
                <div className="bg-[#FAF6F0] p-8 rounded-3xl border border-neutral-300 text-center max-w-md mx-auto">
                  <ShieldCheck className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                  <h4 className="text-base font-black text-neutral-900 mb-1">
                    Tahap Persetujuan Belum Aktif
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium">
                    Tahap persetujuan tanggal masuk asrama hanya dapat diisi jika Anda telah dinyatakan DITERIMA pada pengumuman tes seleksi offline.
                  </p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>

      </motion.div>
    </div>
  );
};
