// Central API Service Client for Taruna Juara Digital Platform

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8069';

export interface PMBRegisterPayload {
  fullName: string;
  nik: string;
  phone: string;
  email: string;
  university?: string;
  universityBadge?: string;
  faculty?: string;
  major?: string;
  semester?: string;
  originCity?: string;
  hafalanCount?: string;
  targetJuz?: string;
  track?: string;
  quranExperience?: string;
  motivation?: string;
  ktpFile?: string | null;
  ktmFile?: string | null;
  photoFile?: string | null;
  ktp_file_base64?: string;
  ktm_file_base64?: string;
  photo_file_base64?: string;
}

export const apiService = {
  // 1. Submit PMB Registration to Odoo Backend
  async registerPMB(payload: PMBRegisterPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pmb/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Error registerPMB:', error);
      throw error;
    }
  },

  // 2. Auth Login to Odoo Backend
  async login(emailOrCode: string, password?: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailOrCode, password }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Error login:', error);
      throw error;
    }
  },

  // 3. Upload Applicant Documents to Odoo
  async uploadApplicantDocs(registrationCode: string, docs: {
    ktp_file_base64?: string;
    ktm_file_base64?: string;
    photo_file_base64?: string;
    ktp_filename?: string;
    ktm_filename?: string;
    photo_filename?: string;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applicant/upload_docs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_code: registrationCode,
          ...docs,
        }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Error uploadApplicantDocs:', error);
      throw error;
    }
  },

  // 4. Fetch Applicant Status by Registration Code
  async getApplicantStatus(code: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applicant/status/${code}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Error getApplicantStatus:', error);
      throw error;
    }
  },

  // 5. Fetch All Landing Page CMS Data from Odoo
  async getLandingAllData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/landing/all_data`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Error getLandingAllData:', error);
      throw error;
    }
  },

  // 6. Fetch Asrama & Room List
  async getAsramaList() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/asrama/list`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Error getAsramaList:', error);
      throw error;
    }
  },
};
