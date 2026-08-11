export type UserRole = 'applicant' | 'santri' | 'alumni' | 'ustadz' | 'admin';

export type ApplicantStage =
  | '1_DRAFT_PROFILE'           // Complete personal profile, upload KTP, KTM, Photo
  | '2_WAITING_VERIFICATION'    // Files submitted, waiting for Admin approval
  | '3_OFFLINE_TEST_SCHEDULED'   // Files approved, offline test date & time scheduled
  | '4_SELECTION_PASSED'        // Selection test PASSED (Diterima)
  | '4_SELECTION_REJECTED'      // Selection test REJECTED (Ditolak)
  | '5_CHECKIN_CONFIRMATION'    // Approved date agreement for moving into dormitory
  | '6_CONVERTED_SANTRI';       // Moved in & automatically converted to Santri account

export interface ApplicantProfile {
  fullName: string;
  nik: string;
  phone: string;
  email: string;
  university: string;
  universityBadge: string;
  faculty: string;
  major: string;
  semester: string;
  originCity: string;
  hafalanCount: string;
  targetJuz: string;
  track: string;
  quranExperience: string;
  motivation: string;
  ktpFile: string | null;
  ktmFile: string | null;
  photoFile: string | null;
  
  // Verification & Test Info
  verificationStatus: 'pending' | 'approved' | 'rejected';
  verificationDate?: string;
  
  // Offline Selection Test Details
  testDate?: string;
  testTime?: string;
  testLocation?: string;
  testInterviewer?: string;
  
  // Final Result
  selectionResult?: 'passed' | 'rejected';
  selectionNotes?: string;
  
  // Dormitory Move-in / Check-in Agreement
  checkInDate?: string;
  checkInNotes?: string;
  isCheckInConfirmed?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  nis?: string;
  nip?: string;
  hafalanJuz?: number;
  university?: string;
  universityBadge?: string;
  applicantStage?: ApplicantStage;
  applicantProfile?: ApplicantProfile;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
