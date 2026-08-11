import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ApplicantProfile } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => void;
  loginWithUserData: (userData: User) => void;
  register: (name: string, email: string) => { verificationCode: string };
  verifyEmail: (code: string) => boolean;
  logout: () => void;
  
  // Applicant Lifecycle Methods
  updateApplicantProfile: (profile: Partial<ApplicantProfile>) => void;
  submitApplicantProfile: (profile: ApplicantProfile) => void;
  simulateAdminApproveFiles: () => void;
  simulateAdminPassSelection: (passed: boolean) => void;
  confirmCheckInAndConvertToSantri: (checkInDate: string) => void;
  simulateGraduateToAlumni: () => void;
  
  // Quick Preset Switches
  switchPreset: (preset: 'applicant_draft' | 'applicant_test' | 'applicant_passed' | 'santri' | 'alumni' | 'ustadz' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'taruna_juara_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [pendingVerificationCode, setPendingVerificationCode] = useState<string>('123456');

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user]);

  // Register New Applicant
  const register = (name: string, email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setPendingVerificationCode(code);

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'applicant',
      isEmailVerified: false,
      applicantStage: '1_DRAFT_PROFILE',
      applicantProfile: {
        fullName: name,
        nik: '3404012004050001',
        phone: '081234567890',
        email,
        university: 'Universitas Ahmad Dahlan',
        universityBadge: 'UAD',
        faculty: 'Teknologi Industri',
        major: 'Informatika',
        semester: '2',
        originCity: 'Yogyakarta',
        hafalanCount: '5',
        targetJuz: '30',
        track: 'beasiswa_full',
        quranExperience: 'Alumni SMA IT / Pondok Tahfidz',
        motivation: 'Ingin menjadi Hafiz Al-Qur\'an 30 juz berwawasan teknologi.',
        ktpFile: null,
        ktmFile: null,
        photoFile: null,
        verificationStatus: 'pending',
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    return { verificationCode: code };
  };

  // Verify Email via Server OTP
  const verifyEmail = (code: string) => {
    if (code === pendingVerificationCode || code === '123456') {
      if (user) {
        const updated = { ...user, isEmailVerified: true };
        setUser(updated);
      }
      return true;
    }
    return false;
  };

  // Login Function
  const login = (email: string, preferredRole: UserRole = 'applicant') => {
    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      return;
    }
    
    let defaultRole: UserRole = preferredRole;
    if (email.includes('ustadz')) defaultRole = 'ustadz';
    if (email.includes('admin')) defaultRole = 'admin';

    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: defaultRole,
      isEmailVerified: true,
      nis: defaultRole === 'santri' ? '2026.01.018' : undefined,
      nip: defaultRole === 'ustadz' ? 'UST.2024.001' : undefined,
      hafalanJuz: defaultRole === 'santri' ? 18 : defaultRole === 'alumni' ? 30 : 5,
      university: 'Universitas Ahmad Dahlan',
      universityBadge: 'UAD',
      applicantStage: defaultRole === 'applicant' ? '1_DRAFT_PROFILE' : undefined,
      applicantProfile: defaultRole === 'applicant' ? {
        fullName: email.split('@')[0],
        nik: '3404012004050001',
        phone: '081234567890',
        email,
        university: 'Universitas Ahmad Dahlan',
        universityBadge: 'UAD',
        faculty: 'Teknologi Industri',
        major: 'Informatika',
        semester: '2',
        originCity: 'Yogyakarta',
        hafalanCount: '5',
        targetJuz: '30',
        track: 'beasiswa_full',
        quranExperience: 'Alumni SMA IT',
        motivation: 'Konsisten murajaah & ziadah harian.',
        ktpFile: null,
        ktmFile: null,
        photoFile: null,
        verificationStatus: 'pending',
      } : undefined,
      createdAt: '2026-01-15',
    };

    setUser(loggedUser);
  };

  const loginWithUserData = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Applicant submits completed profile & uploaded files
  const submitApplicantProfile = (profileData: ApplicantProfile) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name: profileData.fullName || user.name,
      university: profileData.university,
      universityBadge: profileData.universityBadge,
      applicantStage: '2_WAITING_VERIFICATION',
      applicantProfile: {
        ...profileData,
        verificationStatus: 'pending',
      },
    };

    setUser(updatedUser);
  };

  const updateApplicantProfile = (profileData: Partial<ApplicantProfile>) => {
    if (!user || !user.applicantProfile) return;
    setUser({
      ...user,
      applicantProfile: {
        ...user.applicantProfile,
        ...profileData,
      },
    });
  };

  // Simulation: Admin approves files & schedules offline test
  const simulateAdminApproveFiles = () => {
    if (!user || !user.applicantProfile) return;

    const updatedUser: User = {
      ...user,
      applicantStage: '3_OFFLINE_TEST_SCHEDULED',
      applicantProfile: {
        ...user.applicantProfile,
        verificationStatus: 'approved',
        verificationDate: new Date().toISOString().split('T')[0],
        testDate: 'Sabtu, 15 Agustus 2026',
        testTime: '08:00 - 11:30 WIB',
        testLocation: 'Aula Utama Asrama Taruna Juara Yogyakarta',
        testInterviewer: 'Ustadz Pembina Halaqah 1',
      },
    };

    setUser(updatedUser);
  };

  // Simulation: Admin passes / rejects selection test
  const simulateAdminPassSelection = (passed: boolean) => {
    if (!user || !user.applicantProfile) return;

    const updatedUser: User = {
      ...user,
      applicantStage: passed ? '4_SELECTION_PASSED' : '4_SELECTION_REJECTED',
      applicantProfile: {
        ...user.applicantProfile,
        selectionResult: passed ? 'passed' : 'rejected',
        selectionNotes: passed
          ? 'Selamat! Anda dinyatakan LULUS Seleksi Wawancara & Bacaan Tahsin Qur\'an.'
          : 'Mohon maaf, Anda belum memenuhi kualifikasi beasiswa keasramaan tahun ini.',
      },
    };

    setUser(updatedUser);
  };

  // Move-in Confirmation: User confirms check-in date -> AUTOMATICALLY CONVERTED TO SANTRI ACCOUNT!
  const confirmCheckInAndConvertToSantri = (checkInDate: string) => {
    if (!user || !user.applicantProfile) return;

    const newNis = `2026.01.0${Math.floor(10 + Math.random() * 89)}`;

    const convertedUser: User = {
      ...user,
      role: 'santri',
      nis: newNis,
      hafalanJuz: parseInt(user.applicantProfile.hafalanCount) || 5,
      applicantStage: '6_CONVERTED_SANTRI',
      applicantProfile: {
        ...user.applicantProfile,
        checkInDate,
        isCheckInConfirmed: true,
      },
    };

    setUser(convertedUser);
  };

  // Simulation: Santri graduates -> AUTOMATICALLY CONVERTED TO ALUMNI ACCOUNT!
  const simulateGraduateToAlumni = () => {
    if (!user) return;
    setUser({
      ...user,
      role: 'alumni',
      hafalanJuz: 30,
    });
  };

  // Quick Preset Switcher
  const switchPreset = (preset: 'applicant_draft' | 'applicant_test' | 'applicant_passed' | 'santri' | 'alumni' | 'ustadz' | 'admin') => {
    if (preset === 'applicant_draft') {
      setUser({
        id: 'usr-app-1',
        name: 'Ahmad Raihan (Pendaftar)',
        email: 'raihan.pmb@student.uad.ac.id',
        role: 'applicant',
        isEmailVerified: true,
        applicantStage: '1_DRAFT_PROFILE',
        applicantProfile: {
          fullName: 'Ahmad Raihan',
          nik: '3404012004050001',
          phone: '081234567890',
          email: 'raihan.pmb@student.uad.ac.id',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'Teknologi Industri',
          major: 'Informatika',
          semester: '2',
          originCity: 'Lampung',
          hafalanCount: '5',
          targetJuz: '30',
          track: 'beasiswa_full',
          quranExperience: 'SMA IT / Rumah Tahfidz',
          motivation: 'Komitmen tinggi menghafal 30 juz al-Qur\'an.',
          ktpFile: null,
          ktmFile: null,
          photoFile: null,
          verificationStatus: 'pending',
        },
        createdAt: '2026-08-01',
      });
    } else if (preset === 'applicant_test') {
      setUser({
        id: 'usr-app-2',
        name: 'Fatih Al-Faruq (Jadwal Tes)',
        email: 'fatih.test@ugm.ac.id',
        role: 'applicant',
        isEmailVerified: true,
        applicantStage: '3_OFFLINE_TEST_SCHEDULED',
        applicantProfile: {
          fullName: 'Fatih Al-Faruq',
          nik: '3404012004050002',
          phone: '082198765432',
          email: 'fatih.test@ugm.ac.id',
          university: 'Universitas Gadjah Mada',
          universityBadge: 'UGM',
          faculty: 'Teknik',
          major: 'Teknik Elektro',
          semester: '2',
          originCity: 'Palembang',
          hafalanCount: '10',
          targetJuz: '30',
          track: 'beasiswa_full',
          quranExperience: 'Pondok Tahfidz Modern',
          motivation: 'Mengabdi di keasramaan dan khatam 30 juz.',
          ktpFile: 'KTP_Fatih_Validated.pdf',
          ktmFile: 'KTM_UGM_Fatih.pdf',
          photoFile: 'Foto_Fatih_Official.jpg',
          verificationStatus: 'approved',
          verificationDate: '2026-08-05',
          testDate: 'Sabtu, 15 Agustus 2026',
          testTime: '08:30 WIB',
          testLocation: 'Asrama Rumah Tahfidz Taruna Juara Yogyakarta',
          testInterviewer: 'Ustadz Pembina 1',
        },
        createdAt: '2026-08-02',
      });
    } else if (preset === 'applicant_passed') {
      setUser({
        id: 'usr-app-3',
        name: 'Muhammad Fadli (Diterima)',
        email: 'fadli.pass@uii.ac.id',
        role: 'applicant',
        isEmailVerified: true,
        applicantStage: '4_SELECTION_PASSED',
        applicantProfile: {
          fullName: 'Muhammad Fadli',
          nik: '3404012004050003',
          phone: '085712345678',
          email: 'fadli.pass@uii.ac.id',
          university: 'Universitas Islam Indonesia',
          universityBadge: 'UII',
          faculty: 'Ekonomi',
          major: 'Akuntansi',
          semester: '2',
          originCity: 'Surabaya',
          hafalanCount: '8',
          targetJuz: '30',
          track: 'beasiswa_full',
          quranExperience: 'SMA Pesantren',
          motivation: 'Ingin fokus mutqin hafalan di Taruna Juara.',
          ktpFile: 'KTP_Fadli.pdf',
          ktmFile: 'KTM_UII.pdf',
          photoFile: 'Foto_Fadli.jpg',
          verificationStatus: 'approved',
          testDate: '2026-08-05',
          selectionResult: 'passed',
          selectionNotes: 'Lulus Seleksi Wawancara & Tahsin dengan Nilai A.',
        },
        createdAt: '2026-08-03',
      });
    } else if (preset === 'santri') {
      setUser({
        id: 'usr-santri-1',
        name: 'Muhammad Fadlan Mutaqin',
        email: 'fadlan.santri@uad.ac.id',
        role: 'santri',
        isEmailVerified: true,
        nis: '2026.01.018',
        hafalanJuz: 18,
        university: 'Universitas Ahmad Dahlan',
        universityBadge: 'UAD',
        createdAt: '2026-01-10',
      });
    } else if (preset === 'alumni') {
      setUser({
        id: 'usr-alumni-1',
        name: 'Ustadz Alumni M. Raihan 30 Juz',
        email: 'alumni.raihan@tarunajuara.org',
        role: 'alumni',
        isEmailVerified: true,
        nis: '2024.01.001',
        hafalanJuz: 30,
        university: 'Universitas Ahmad Dahlan',
        universityBadge: 'UAD',
        createdAt: '2024-06-01',
      });
    } else if (preset === 'ustadz') {
      setUser({
        id: 'usr-ustadz-1',
        name: 'Ustadz Pembina Keasramaan',
        email: 'ustadz.pembina@tarunajuara.org',
        role: 'ustadz',
        isEmailVerified: true,
        nip: 'UST.2024.001',
        createdAt: '2024-01-01',
      });
    } else if (preset === 'admin') {
      setUser({
        id: 'usr-admin-1',
        name: 'Administrator Odoo Core',
        email: 'admin.odoo@tarunajuara.org',
        role: 'admin',
        isEmailVerified: true,
        nip: 'ADM.2026.001',
        createdAt: '2024-01-01',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithUserData,
        register,
        verifyEmail,
        logout,
        updateApplicantProfile,
        submitApplicantProfile,
        simulateAdminApproveFiles,
        simulateAdminPassSelection,
        confirmCheckInAndConvertToSantri,
        simulateGraduateToAlumni,
        switchPreset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
