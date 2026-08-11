import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  LogOut,
  Check,
  Award,
  Copy,
  ChevronRight,
  Search,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ApplicantProfile } from '../../types/auth';

// DATASET PERGURUAN TINGGI (UNIVERSITAS / PTN / PTS INDONESIA - KHUSUSNYA JOGJA & NASIONAL)
const INDONESIA_UNIVERSITIES = [
  // Yogyakarta (PTN & PTS)
  { name: 'Universitas Gadjah Mada (UGM)', badge: 'UGM', city: 'Yogyakarta' },
  { name: 'Universitas Ahmad Dahlan (UAD)', badge: 'UAD', city: 'Yogyakarta' },
  { name: 'Universitas Negeri Yogyakarta (UNY)', badge: 'UNY', city: 'Yogyakarta' },
  { name: 'Universitas Islam Indonesia (UII)', badge: 'UII', city: 'Yogyakarta' },
  { name: 'Universitas Muhammadiyah Yogyakarta (UMY)', badge: 'UMY', city: 'Yogyakarta' },
  { name: 'UIN Sunan Kalijaga Yogyakarta', badge: 'UIN-SUKA', city: 'Yogyakarta' },
  { name: 'Universitas Atma Jaya Yogyakarta (UAJY)', badge: 'UAJY', city: 'Yogyakarta' },
  { name: 'Universitas Pembangunan Nasional "Veteran" Yogyakarta (UPNVY)', badge: 'UPNVY', city: 'Yogyakarta' },
  { name: 'Universitas Sanata Dharma (USD)', badge: 'USD', city: 'Yogyakarta' },
  { name: 'Universitas Amikom Yogyakarta', badge: 'AMIKOM', city: 'Yogyakarta' },
  { name: 'Universitas Alma Ata Yogyakarta', badge: 'ALMA ATA', city: 'Yogyakarta' },
  { name: 'Universitas Mercu Buana Yogyakarta (UMBY)', badge: 'UMBY', city: 'Yogyakarta' },
  { name: 'Universitas Kristen Duta Wacana (UKDW)', badge: 'UKDW', city: 'Yogyakarta' },
  { name: 'Universitas PGRI Yogyakarta (UPY)', badge: 'UPY', city: 'Yogyakarta' },
  { name: 'Universitas Respati Yogyakarta (UNRIYO)', badge: 'UNRIYO', city: 'Yogyakarta' },
  { name: 'Universitas Aisyiyah Yogyakarta (UNISA)', badge: 'UNISA', city: 'Yogyakarta' },
  { name: 'STIE YKPN Yogyakarta', badge: 'STIE YKPN', city: 'Yogyakarta' },
  { name: 'Institut Seni Indonesia (ISI) Yogyakarta', badge: 'ISI', city: 'Yogyakarta' },
  { name: 'Politeknik LPP Yogyakarta', badge: 'POLTEK LPP', city: 'Yogyakarta' },
  { name: 'Universitas Nahdlatul Ulama (UNU) Yogyakarta', badge: 'UNU', city: 'Yogyakarta' },
  { name: 'Universitas Sarjanawiyata Tamansiswa (UST)', badge: 'UST', city: 'Yogyakarta' },
  { name: 'Universitas Cokroaminoto Yogyakarta', badge: 'UCY', city: 'Yogyakarta' },
  { name: 'Universitas Teknologi Yogyakarta (UTY)', badge: 'UTY', city: 'Yogyakarta' },

  // Jawa Tengah & DIY Sekitarnya
  { name: 'Universitas Diponegoro (UNDIP)', badge: 'UNDIP', city: 'Semarang' },
  { name: 'Universitas Sebelas Maret (UNS)', badge: 'UNS', city: 'Surakarta' },
  { name: 'Universitas Muhammadiyah Surakarta (UMS)', badge: 'UMS', city: 'Surakarta' },
  { name: 'Universitas Negeri Semarang (UNNES)', badge: 'UNNES', city: 'Semarang' },
  { name: 'Universitas Jenderal Soedirman (UNSOED)', badge: 'UNSOED', city: 'Purwokerto' },
  { name: 'UIN Walisongo Semarang', badge: 'UIN-WS', city: 'Semarang' },
  { name: 'Universitas Islam Sultan Agung (UNISSULA)', badge: 'UNISSULA', city: 'Semarang' },

  // DKI Jakarta, Jawa Barat, Banten
  { name: 'Universitas Indonesia (UI)', badge: 'UI', city: 'Depok / Jakarta' },
  { name: 'Institut Teknologi Bandung (ITB)', badge: 'ITB', city: 'Bandung' },
  { name: 'Universitas Padjadjaran (UNPAD)', badge: 'UNPAD', city: 'Sumedang / Bandung' },
  { name: 'IPB University (Institut Pertanian Bogor)', badge: 'IPB', city: 'Bogor' },
  { name: 'Universitas Telkom (Telkom University)', badge: 'TELKOM', city: 'Bandung' },
  { name: 'UIN Syarif Hidayatullah Jakarta', badge: 'UIN-JKT', city: 'Jakarta' },
  { name: 'Universitas Negeri Jakarta (UNJ)', badge: 'UNJ', city: 'Jakarta' },
  { name: 'Universitas Trisakti', badge: 'TRISAKTI', city: 'Jakarta' },
  { name: 'Universitas Bina Nusantara (BINUS)', badge: 'BINUS', city: 'Jakarta' },

  // Jawa Timur & Lainnya
  { name: 'Universitas Airlangga (UNAIR)', badge: 'UNAIR', city: 'Surabaya' },
  { name: 'Institut Teknologi Sepuluh Nopember (ITS)', badge: 'ITS', city: 'Surabaya' },
  { name: 'Universitas Brawijaya (UB)', badge: 'UB', city: 'Malang' },
  { name: 'Universitas Negeri Malang (UM)', badge: 'UM', city: 'Malang' },
  { name: 'UIN Maulana Malik Ibrahim Malang', badge: 'UIN-MLG', city: 'Malang' },
  { name: 'Universitas Jember (UNEJ)', badge: 'UNEJ', city: 'Jember' },

  // Luar Jawa Prominen
  { name: 'Universitas Lampung (UNILA)', badge: 'UNILA', city: 'Bandar Lampung' },
  { name: 'Universitas Sriwijaya (UNSRI)', badge: 'UNSRI', city: 'Palembang' },
  { name: 'Universitas Sumatera Utara (USU)', badge: 'USU', city: 'Medan' },
  { name: 'Universitas Andalas (UNAND)', badge: 'UNAND', city: 'Padang' },
  { name: 'Universitas Hasanuddin (UNHAS)', badge: 'UNHAS', city: 'Makassar' },
  { name: 'Universitas Udayana (UNUD)', badge: 'UNUD', city: 'Denpasar' },
  { name: 'Universitas Mulawarman (UNMUL)', badge: 'UNMUL', city: 'Samarinda' },
];

export const ApplicantPortalPage: React.FC = () => {
  const {
    user,
    logout,
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
    faculty: p?.faculty || 'Fakultas Teknologi Industri',
    major: p?.major || 'S1 Informatika',
    semester: p?.semester || '2',
    originCity: p?.originCity || 'Lampung',
    hafalanCount: p?.hafalanCount || '5',
    targetJuz: p?.targetJuz || '30',
    track: p?.track || 'beasiswa_full',
    quranExperience: p?.quranExperience || 'Alumni Pondok Tahfidz / SMA IT',
    motivation: p?.motivation || 'Ingin menghafal al-Qur\'an 30 juz secara mutqin sambil menempuh pendidikan tinggi.',
    ktpFile: p?.ktpFile || null,
    ktmFile: p?.ktmFile || null,
    photoFile: p?.photoFile || null,
    verificationStatus: p?.verificationStatus || 'pending',
  });

  // AUTOCOMPLETE SUGGESTIONS STATE FOR UNIVERSITY
  const [univSearchQuery, setUnivSearchQuery] = useState<string>(formData.university);
  const [showUnivSuggestions, setShowUnivSuggestions] = useState<boolean>(false);
  const univWrapperRef = useRef<HTMLDivElement>(null);

  const [checkInDate, setCheckInDate] = useState<string>('1 September 2026');
  const [copiedNis, setCopiedNis] = useState<boolean>(false);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (univWrapperRef.current && !univWrapperRef.current.contains(event.target as Node)) {
        setShowUnivSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const stage = user.applicantStage || '1_DRAFT_PROFILE';

  // Filtered universities based on user query
  const filteredUniversities = INDONESIA_UNIVERSITIES.filter(
    (item) =>
      item.name.toLowerCase().includes(univSearchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(univSearchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(univSearchQuery.toLowerCase())
  );

  const handleSelectUniversity = (univName: string, badgeName: string) => {
    setUnivSearchQuery(univName);
    setFormData((prev) => ({
      ...prev,
      university: univName,
      universityBadge: badgeName,
    }));
    setShowUnivSuggestions(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleHafalanChange = (field: 'hafalanCount' | 'targetJuz', rawVal: string) => {
    let num = parseInt(rawVal, 10);
    if (isNaN(num)) num = field === 'hafalanCount' ? 0 : 30;

    setFormData((prev) => {
      let currentHafalan = field === 'hafalanCount' ? num : parseInt(prev.hafalanCount, 10) || 0;
      let targetHafalan = field === 'targetJuz' ? num : parseInt(prev.targetJuz, 10) || 30;

      // Rule: cannot be less than 0 or 1, max 30
      if (currentHafalan < 0) currentHafalan = 0;
      if (currentHafalan > 30) currentHafalan = 30;

      if (targetHafalan < 1) targetHafalan = 1;
      if (targetHafalan > 30) targetHafalan = 30;

      // Rule: Target hafalan cannot be less than hafalan saat ini
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

  const handleUploadSim = (field: 'ktpFile' | 'ktmFile' | 'photoFile', filename: string) => {
    setFormData((prev) => ({ ...prev, [field]: filename }));
  };

  const handleSubmitProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplicantProfile(formData);
    setActiveTab('profile');
  };

  const handleConfirmMoveIn = () => {
    confirmCheckInAndConvertToSantri(checkInDate);
  };

  const handleCopyNis = () => {
    if (user.nis) {
      navigator.clipboard.writeText(user.nis);
      setCopiedNis(true);
      setTimeout(() => setCopiedNis(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-neutral-900 font-sans flex flex-col selection:bg-[#D93829] selection:text-white">
      
      {/* FULL APP HEADER BAR */}
      <header className="bg-neutral-900 text-white shadow-xl border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Application Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D93829] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#D93829]/30">
              TJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  PORTAL PENDAFTARAN PMB
                </h1>
                <span className="px-2.5 py-0.5 bg-[#D93829] text-white text-[10px] font-black uppercase rounded-md">
                  TA 2026/2027
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-semibold">
                Rumah Tahfidz Taruna Juara Al-Qur'an Yogyakarta
              </p>
            </div>
          </div>

          {/* User Logged In Profile & Logout Action (NO BACK TO LANDING BUTTON) */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-neutral-800 p-2 pr-4 rounded-2xl border border-neutral-700">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D93829] to-amber-500 text-white font-black flex items-center justify-center text-sm shadow-md">
                {user.name.charAt(0)}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-black text-white truncate max-w-[140px]">{user.name}</div>
                <div className="text-[10px] text-amber-400 font-bold uppercase">
                  {user.role === 'applicant' ? 'Calon Mahasantri' : user.role === 'santri' ? `Santri (${user.nis})` : user.role}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30"
              title="Keluar Akun"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN APPLICATION WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: USER STATUS & TIMELINE PROGRESS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Applicant Profile Card */}
            <div className="bg-white p-6 rounded-3xl border-2 border-neutral-200/80 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-amber-400 font-black text-2xl flex items-center justify-center border-2 border-amber-400 shadow-md shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-black text-[10px] uppercase rounded-md mb-1 inline-block">
                    {formData.universityBadge}
                  </span>
                  <h3 className="text-lg font-black text-neutral-900 leading-tight">
                    {user.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                    {formData.major}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-100 text-xs font-semibold text-neutral-600">
                <div className="flex justify-between">
                  <span>Perguruan Tinggi:</span>
                  <strong className="text-neutral-900 truncate max-w-[170px]">{formData.university}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Fakultas:</span>
                  <strong className="text-neutral-900 truncate max-w-[170px]">{formData.faculty}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Prodi / Jurusan:</span>
                  <strong className="text-neutral-900 truncate max-w-[170px]">{formData.major}</strong>
                </div>
                <div className="flex justify-between border-t border-neutral-100 pt-2">
                  <span>Hafalan Saat Ini:</span>
                  <strong className="text-emerald-700 font-bold">{formData.hafalanCount} Juz</strong>
                </div>
                <div className="flex justify-between">
                  <span>Target Hafalan:</span>
                  <strong className="text-[#D93829] font-black">{formData.targetJuz} Juz Mutqin</strong>
                </div>
              </div>
            </div>

            {/* PMB Timeline Progress Bar */}
            <div className="bg-white p-6 rounded-3xl border-2 border-neutral-200/80 shadow-xl space-y-4">
              <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D93829]" />
                <span>Tahapan Seleksi PMB</span>
              </h4>

              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                
                {/* Step 1 */}
                <div className={`flex items-start gap-3 relative z-10 ${stage !== '1_DRAFT_PROFILE' ? 'text-emerald-700 font-bold' : 'text-neutral-900 font-black'}`}>
                  <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${stage !== '1_DRAFT_PROFILE' ? 'bg-emerald-600 text-white' : 'bg-[#D93829] text-white'}`}>
                    {stage !== '1_DRAFT_PROFILE' ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <div>
                    <div className="text-xs leading-snug">Lengkapi Biodata & Berkas</div>
                    <div className="text-[10px] text-neutral-400 font-medium">Upload KTP, KTM, Foto</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`flex items-start gap-3 relative z-10 ${stage === '3_OFFLINE_TEST_SCHEDULED' || stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? 'text-emerald-700 font-bold' : 'text-neutral-800 font-medium'}`}>
                  <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${stage === '3_OFFLINE_TEST_SCHEDULED' || stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? 'bg-emerald-600 text-white' : stage === '2_WAITING_VERIFICATION' ? 'bg-amber-500 text-white animate-pulse' : 'bg-neutral-200 text-neutral-600'}`}>
                    {stage === '3_OFFLINE_TEST_SCHEDULED' || stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? <Check className="w-4 h-4" /> : '2'}
                  </div>
                  <div>
                    <div className="text-xs leading-snug">Verifikasi Berkas Admin</div>
                    <div className="text-[10px] text-neutral-400 font-medium">Approval Tim Seleksi</div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`flex items-start gap-3 relative z-10 ${stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? 'text-emerald-700 font-bold' : 'text-neutral-800 font-medium'}`}>
                  <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? 'bg-emerald-600 text-white' : stage === '3_OFFLINE_TEST_SCHEDULED' ? 'bg-[#D93829] text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                    {stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? <Check className="w-4 h-4" /> : '3'}
                  </div>
                  <div>
                    <div className="text-xs leading-snug">Tes Seleksi Offline</div>
                    <div className="text-[10px] text-neutral-400 font-medium">Ujian Wawancara & Tahsin</div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className={`flex items-start gap-3 relative z-10 ${stage === '6_CONVERTED_SANTRI' ? 'text-emerald-700 font-bold' : 'text-neutral-800 font-medium'}`}>
                  <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${stage === '6_CONVERTED_SANTRI' ? 'bg-emerald-600 text-white' : stage === '4_SELECTION_PASSED' ? 'bg-emerald-500 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                    {stage === '6_CONVERTED_SANTRI' ? <Check className="w-4 h-4" /> : '4'}
                  </div>
                  <div>
                    <div className="text-xs leading-snug">Pengumuman & Tanggal Masuk</div>
                    <div className="text-[10px] text-neutral-400 font-medium">Check-in Ke Asrama</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Admin Simulation Box for Fast Testing */}
            <div className="bg-neutral-900 text-white p-5 rounded-3xl shadow-xl space-y-3 border border-neutral-800">
              <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center justify-between">
                <span>⚡ Kontrol Simulasi Admin:</span>
                <span>Demo Test</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <button
                  onClick={simulateAdminApproveFiles}
                  className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black rounded-xl transition-colors text-left flex items-center justify-between"
                >
                  <span>1. Simulasi ACC Berkas oleh Admin</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => simulateAdminPassSelection(true)}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-colors text-left flex items-center justify-between"
                >
                  <span>2. Simulasi Diterima Seleksi Offline</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => confirmCheckInAndConvertToSantri('1 September 2026')}
                  className="w-full py-2 px-3 bg-[#D93829] hover:bg-[#b8291b] text-white font-black rounded-xl transition-colors text-left flex items-center justify-between"
                >
                  <span>3. Masuk Asrama ➔ Otomatis Santri</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT MAIN WORKSPACE: TABBED APP CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2 rounded-3xl border-2 border-neutral-200/80 shadow-lg text-xs font-extrabold">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-2 rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'profile'
                    ? 'bg-[#D93829] text-white shadow-md font-black'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Data & Berkas</span>
              </button>

              <button
                onClick={() => setActiveTab('test')}
                className={`py-3 px-2 rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'test'
                    ? 'bg-[#D93829] text-white shadow-md font-black'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>2. Jadwal Tes</span>
              </button>

              <button
                onClick={() => setActiveTab('result')}
                className={`py-3 px-2 rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'result'
                    ? 'bg-[#D93829] text-white shadow-md font-black'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>3. Pengumuman</span>
              </button>

              <button
                onClick={() => setActiveTab('checkin')}
                className={`py-3 px-2 rounded-2xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'checkin'
                    ? 'bg-[#D93829] text-white shadow-md font-black'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>4. Masuk Asrama</span>
              </button>
            </div>

            {/* TAB CONTENT PANELS */}
            <AnimatePresence mode="wait">
              
              {/* TAB 1: FORMULIR DATA DIRI & UPLOAD DOKUMEN */}
              {activeTab === 'profile' && (
                <motion.div
                  key="tab-app-profile"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-neutral-200/80 shadow-xl space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-neutral-900">Formulir Data Diri & Berkas PMB</h3>
                      <p className="text-xs text-neutral-500 font-medium">Lengkapi biodata dan unggah dokumen KTP, KTM, serta Pas Foto.</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-extrabold rounded-full">
                      {formData.track === 'beasiswa_full' ? 'Beasiswa Full' : 'Reguler'}
                    </span>
                  </div>

                  <form onSubmit={handleSubmitProfileForm} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Nama Lengkap */}
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
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* NIK / KTP */}
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
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                          Nomor WhatsApp (Aktif) *
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                          Email Student *
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* PERGURUAN TINGGI (WITH SEARCH AUTOCOMPLETE SUGGESTION) */}
                      <div className="sm:col-span-2 relative" ref={univWrapperRef}>
                        <label className="block text-xs font-extrabold text-neutral-700 mb-1 flex items-center justify-between">
                          <span>Perguruan Tinggi / Universitas (Ketik & Klik Rekomendasi) *</span>
                          <span className="text-[10px] text-[#D93829] font-bold">PTN/PTS Indonesia (Fokus DIY)</span>
                        </label>
                        
                        <div className="relative">
                          <input
                            required
                            type="text"
                            placeholder="Ketik nama kampus Anda (contoh: UAD, UGM, UNY, UII, UMY...)"
                            value={univSearchQuery}
                            onFocus={() => setShowUnivSuggestions(true)}
                            onChange={(e) => {
                              setUnivSearchQuery(e.target.value);
                              setFormData((prev) => ({
                                ...prev,
                                university: e.target.value,
                              }));
                              setShowUnivSuggestions(true);
                            }}
                            className="w-full px-4 py-3 pl-10 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-bold text-neutral-900 focus:outline-none focus:border-[#D93829] focus:bg-white transition-all"
                          />
                          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                        </div>

                        {/* Autocomplete Dropdown List */}
                        <AnimatePresence>
                          {showUnivSuggestions && filteredUniversities.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-neutral-200 max-h-60 overflow-y-auto z-50 p-2 space-y-1"
                            >
                              <div className="px-3 py-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                                Rekomendasi Kampus / Universitas
                              </div>
                              {filteredUniversities.map((univ) => (
                                <button
                                  key={univ.name}
                                  type="button"
                                  onClick={() => handleSelectUniversity(univ.name, univ.badge)}
                                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs hover:bg-[#D93829]/10 hover:text-[#D93829] transition-all flex items-center justify-between font-semibold"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-black rounded-md">
                                      {univ.badge}
                                    </span>
                                    <span className="font-bold">{univ.name}</span>
                                  </div>
                                  <span className="text-[10px] text-neutral-400 font-medium">{univ.city}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* FAKULTAS (DIPISAHKAN TERPISAH) */}
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
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* PROGRAM STUDI / JURUSAN (DIPISAHKAN TERPISAH) */}
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                          Program Studi / Jurusan (Prodi) *
                        </label>
                        <input
                          required
                          type="text"
                          name="major"
                          placeholder="Contoh: S1 Informatika / Teknik Elektro"
                          value={formData.major}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* Semester */}
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 mb-1 flex justify-between">
                          <span>Semester Kuliah Saat Ini *</span>
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
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* Asal Kota */}
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                          Asal Kota / Kabupaten *
                        </label>
                        <input
                          required
                          type="text"
                          name="originCity"
                          value={formData.originCity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                        />
                      </div>

                      {/* SECTION INFORMASI HAFALAN AL-QUR'AN & MOTIVASI */}
                      <div className="sm:col-span-2 pt-4 border-t border-neutral-100">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#D93829]" />
                          <span>Informasi Hafalan Al-Qur'an & Motivasi</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-black text-emerald-800 focus:outline-none focus:border-[#D93829]"
                            />
                            <p className="text-[10px] text-neutral-400 mt-1">
                              Jumlah juz Al-Qur'an yang sudah dihafal (0 s/d 30 juz).
                            </p>
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
                              className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-black text-[#D93829] focus:outline-none focus:border-[#D93829]"
                            />
                            <p className="text-[10px] text-neutral-400 mt-1">
                              Target tidak boleh kurang dari hafalan saat ini ({formData.hafalanCount} Juz) & maks 30 Juz.
                            </p>
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
                              className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                            />
                          </div>

                          {/* Motivasi */}
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-extrabold text-neutral-700 mb-1">
                              Motivasi Menghafal Al-Qur'an *
                            </label>
                            <textarea
                              required
                              rows={3}
                              name="motivation"
                              placeholder="Tuliskan motivasi utama Anda ingin bergabung dan menghafal Al-Qur'an di Rumah Tahfidz Taruna Juara..."
                              value={formData.motivation}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl text-sm bg-neutral-50 border border-neutral-200 font-semibold focus:outline-none focus:border-[#D93829]"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Section Upload Dokumen */}
                    <div className="pt-2">
                      <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <UploadCloud className="w-4 h-4 text-[#D93829]" />
                        <span>Upload Berkas Wajib (KTP, KTM, & Foto Pas)</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-neutral-50 p-4 rounded-2xl border-2 border-dashed border-neutral-300 text-center hover:border-[#D93829] transition-colors">
                          <FileText className="w-7 h-7 text-[#D93829] mx-auto mb-1.5" />
                          <span className="block text-xs font-extrabold text-neutral-800">1. Foto KTP</span>
                          <span className="block text-[10px] text-neutral-400 mb-3">Format PDF/JPG Max 2MB</span>
                          <button
                            type="button"
                            onClick={() => handleUploadSim('ktpFile', 'KTP_Validated_Official.pdf')}
                            className={`w-full py-2 text-[11px] font-extrabold rounded-xl transition-all ${
                              formData.ktpFile
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-neutral-900 text-white hover:bg-[#D93829]'
                            }`}
                          >
                            {formData.ktpFile ? `✅ ${formData.ktpFile}` : 'Upload Berkas KTP'}
                          </button>
                        </div>

                        <div className="bg-neutral-50 p-4 rounded-2xl border-2 border-dashed border-neutral-300 text-center hover:border-[#D93829] transition-colors">
                          <Building2 className="w-7 h-7 text-[#D93829] mx-auto mb-1.5" />
                          <span className="block text-xs font-extrabold text-neutral-800">2. Foto KTM</span>
                          <span className="block text-[10px] text-neutral-400 mb-3">Format PDF/JPG Max 2MB</span>
                          <button
                            type="button"
                            onClick={() => handleUploadSim('ktmFile', 'KTM_Student_Card.pdf')}
                            className={`w-full py-2 text-[11px] font-extrabold rounded-xl transition-all ${
                              formData.ktmFile
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-neutral-900 text-white hover:bg-[#D93829]'
                            }`}
                          >
                            {formData.ktmFile ? `✅ ${formData.ktmFile}` : 'Upload Berkas KTM'}
                          </button>
                        </div>

                        <div className="bg-neutral-50 p-4 rounded-2xl border-2 border-dashed border-neutral-300 text-center hover:border-[#D93829] transition-colors">
                          <Camera className="w-7 h-7 text-[#D93829] mx-auto mb-1.5" />
                          <span className="block text-xs font-extrabold text-neutral-800">3. Pas Foto Rapi</span>
                          <span className="block text-[10px] text-neutral-400 mb-3">Format JPG/PNG Max 2MB</span>
                          <button
                            type="button"
                            onClick={() => handleUploadSim('photoFile', 'Pas_Foto_Formal_3x4.jpg')}
                            className={`w-full py-2 text-[11px] font-extrabold rounded-xl transition-all ${
                              formData.photoFile
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-neutral-900 text-white hover:bg-[#D93829]'
                            }`}
                          >
                            {formData.photoFile ? `✅ ${formData.photoFile}` : 'Upload Pas Foto'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-xs text-neutral-500 font-semibold">
                        * Data akan diverifikasi secara resmi oleh tim admin seleksi PMB.
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-3.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-[#D93829] to-[#EA580C] hover:from-[#c22e20] shadow-lg shadow-[#D93829]/25 transition-all flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Kirim & Simpan Berkas Pendaftaran</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* TAB 2: KARTU JADWAL TES SELEKSI OFFLINE */}
              {activeTab === 'test' && (
                <motion.div
                  key="tab-app-test"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {stage === '1_DRAFT_PROFILE' || stage === '2_WAITING_VERIFICATION' ? (
                    <div className="bg-white p-8 rounded-3xl border-2 border-neutral-200/80 shadow-xl text-center space-y-4">
                      <Clock className="w-12 h-12 text-[#D93829] mx-auto animate-bounce" />
                      <h4 className="text-xl font-black text-neutral-900">
                        Menunggu Verifikasi & ACC Berkas Admin
                      </h4>
                      <p className="text-xs text-neutral-600 font-medium leading-relaxed max-w-md mx-auto">
                        Jadwal tes seleksi offline (Wawancara & Tahsin Al-Qur'an) akan otomatis diterbitkan di halaman ini setelah berkas Anda disetujui tim seleksi.
                      </p>
                      <button
                        onClick={simulateAdminApproveFiles}
                        className="px-6 py-3 bg-[#D93829] text-white font-black text-xs rounded-2xl shadow-lg"
                      >
                        ⚡ Simulasi ACC Berkas oleh Admin ➔
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white p-8 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-6 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-neutral-700 pb-4">
                        <span className="px-3 py-1 bg-amber-400 text-neutral-950 font-black text-[10px] uppercase rounded-md">
                          KARTU UJIAN TES SELEKSI OFFLINE
                        </span>
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Status Berkas: APPROVED
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
                          <div className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">Hari & Tanggal Ujian</div>
                          <div className="font-extrabold text-amber-300 text-base flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#D93829]" />
                            <span>{p?.testDate || 'Sabtu, 15 Agustus 2026'}</span>
                          </div>
                        </div>

                        <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700">
                          <div className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">Waktu / Jam Pelaksanaan</div>
                          <div className="font-extrabold text-white text-base flex items-center gap-2">
                            <Clock className="w-5 h-5 text-sky-400" />
                            <span>{p?.testTime || '08:00 - 11:30 WIB'}</span>
                          </div>
                        </div>

                        <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700 sm:col-span-2">
                          <div className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">Lokasi Seleksi Offline</div>
                          <div className="font-extrabold text-white text-sm flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#D93829] shrink-0" />
                            <span>{p?.testLocation || 'Aula Utama Asrama Rumah Tahfidz Taruna Juara Yogyakarta'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-800/90 p-4 rounded-2xl border border-neutral-700 text-xs space-y-1">
                        <div className="font-bold text-amber-300">Instruksi Penting Bagi Peserta Ujian:</div>
                        <ul className="list-disc list-inside space-y-1 text-neutral-300 text-[11px]">
                          <li>Hadir 15 menit sebelum tes dimulai di lokasi Asrama Taruna Juara.</li>
                          <li>Membawa Mushaf Al-Qur'an hafalan pribadi dan bukti identitas asli.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 3: PENGUMUMAN HASIL SELEKSI (DITERIMA / DITOLAK) */}
              {activeTab === 'result' && (
                <motion.div
                  key="tab-app-result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {stage === '4_SELECTION_PASSED' || stage === '6_CONVERTED_SANTRI' ? (
                    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-400 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-2xl">
                      <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-600/30">
                        <Sparkles className="w-10 h-10 text-amber-300" />
                      </div>

                      <div>
                        <span className="px-3.5 py-1 bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-full inline-block mb-3">
                          PENGUMUMAN RESMI DEWAN PENGUJI
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-black text-emerald-950">
                          SELAMAT! ANDA DITERIMA 🎉
                        </h3>
                        <p className="text-sm text-emerald-900 font-medium max-w-lg mx-auto mt-2 leading-relaxed">
                          Berdasarkan hasil Evaluasi Tes Wawancara & Bacaan Tahsin Al-Qur'an, saudara <strong className="text-emerald-950 font-black">{user.name}</strong> resmi dinyatakan <strong>DITERIMA SEBAGAI MAHASANTRI TARUNA JUARA 2026</strong>.
                        </p>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-emerald-200 text-left text-xs space-y-1 max-w-md mx-auto shadow-sm">
                        <div className="font-black text-emerald-900 text-xs">Catatan Hasil Penguji:</div>
                        <p className="text-neutral-700 italic">"{p?.selectionNotes || 'Lulus Seleksi Wawancara & Tahsin dengan Nilai A (Sangat Baik).'}"</p>
                      </div>

                      <button
                        onClick={() => setActiveTab('checkin')}
                        className="px-8 py-4 bg-neutral-900 hover:bg-[#D93829] text-white font-extrabold text-xs rounded-2xl shadow-xl transition-all flex items-center gap-2 mx-auto"
                      >
                        <span>Lanjut ke Form Persetujuan Tanggal Masuk Asrama</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : stage === '4_SELECTION_REJECTED' ? (
                    <div className="bg-rose-50 border-2 border-rose-300 p-8 rounded-3xl text-center space-y-4 shadow-md max-w-lg mx-auto">
                      <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-black text-rose-950">
                        Mohon Maaf, Belum Memenuhi Kualifikasi
                      </h3>
                      <p className="text-xs text-rose-900 font-medium leading-relaxed">
                        Terima kasih atas partisipasi Anda dalam seleksi PMB Taruna Juara. Kuota tahun ini telah penuh, namun Anda tetap berada dalam daftar cadangan beasiswa.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white p-8 rounded-3xl border-2 border-neutral-200/80 shadow-xl text-center space-y-3">
                      <Clock className="w-10 h-10 text-neutral-400 mx-auto" />
                      <h4 className="text-lg font-black text-neutral-900">
                        Pengumuman Hasil Seleksi Belum Diterbitkan
                      </h4>
                      <p className="text-xs text-neutral-500 font-medium max-w-sm mx-auto">
                        Pengumuman kelulusan resmi akan ditampilkan di halaman ini setelah seluruh proses tes seleksi offline selesai dilaksanakan.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: PERSETUJUAN TANGGAL MASUK ASRAMA & OTOMATIS KONVERSI AKUN SANTRI */}
              {activeTab === 'checkin' && (
                <motion.div
                  key="tab-app-checkin"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {stage === '4_SELECTION_PASSED' ? (
                    <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-amber-300 shadow-2xl space-y-6">
                      <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#D93829] text-white flex items-center justify-center font-bold shrink-0 shadow-lg">
                          <Calendar className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-neutral-900">
                            Formulir Persetujuan Tanggal Masuk Asrama
                          </h3>
                          <p className="text-xs text-neutral-500 font-medium">
                            Pilih dan konfirmasi tanggal kepindahan / masuk asrama (Check-in) Anda.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-neutral-200/80 space-y-4">
                        <div>
                          <label className="block text-xs font-extrabold text-neutral-700 mb-1.5">
                            Pilih Gelombang Tanggal Kedatangan / Check-in Asrama *
                          </label>
                          <select
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl text-sm bg-white border border-neutral-300 font-extrabold text-neutral-900 focus:outline-none focus:border-[#D93829]"
                          >
                            <option value="1 September 2026">Gelombang 1: 1 September 2026</option>
                            <option value="5 September 2026">Gelombang 2: 5 September 2026</option>
                            <option value="10 September 2026">Gelombang 3: 10 September 2026</option>
                          </select>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-2">
                          <div className="font-black text-[#D93829] text-xs">Persyaratan & Ketentuan Check-in:</div>
                          <ul className="list-disc list-inside space-y-1 text-[11px]">
                            <li>Membawa perlengkapan ibadah, pakaian rapi, dan mushaf hafalan pribadi.</li>
                            <li>Setelah Anda mengonfirmasi tanggal di atas, akun pendaftar Anda **otomatis berubah menjadi Akun Santri Aktif** lengkap dengan NIS (Nomor Induk Santri).</li>
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
                    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white p-8 sm:p-10 rounded-3xl border-2 border-amber-400 shadow-2xl text-center space-y-6">
                      <div className="w-20 h-20 rounded-3xl bg-[#D93829] text-white flex items-center justify-center mx-auto shadow-xl">
                        <GraduationCap className="w-10 h-10" />
                      </div>

                      <div>
                        <span className="px-3.5 py-1 bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-md inline-block mb-3">
                          AKUN SANTRI AKTIF TERVERIFIKASI
                        </span>
                        <h3 className="text-3xl font-black text-white">
                          Selamat Datang, Mahasantri Baru!
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-md mx-auto mt-2">
                          Akun Anda telah <strong>otomatis bertransisi menjadi Akun Santri Aktif</strong>.
                        </p>
                      </div>

                      {/* NIS Display Card */}
                      <div className="bg-neutral-800 p-5 rounded-2xl border border-neutral-700 max-w-sm mx-auto flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-[10px] text-neutral-400 font-bold uppercase">Nomor Induk Santri (NIS):</div>
                          <div className="font-mono text-xl font-black text-amber-300 tracking-wider">{user.nis}</div>
                        </div>

                        <button
                          onClick={handleCopyNis}
                          className="px-3 py-1.5 bg-neutral-700 hover:bg-[#D93829] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedNis ? 'Tersalin!' : 'Salin NIS'}</span>
                        </button>
                      </div>

                      <button
                        onClick={logout}
                        className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-2xl shadow-xl transition-colors inline-flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar Akun (Logout)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white p-8 rounded-3xl border-2 border-neutral-200/80 shadow-xl text-center space-y-3">
                      <ShieldCheck className="w-10 h-10 text-neutral-400 mx-auto" />
                      <h4 className="text-lg font-black text-neutral-900">
                        Formulir Masuk Asrama Belum Aktif
                      </h4>
                      <p className="text-xs text-neutral-500 font-medium max-w-sm mx-auto">
                        Tahap persetujuan tanggal masuk asrama hanya dapat diisi jika Anda telah dinyatakan DITERIMA pada hasil seleksi offline.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </main>

    </div>
  );
};
