import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Sparkles, ArrowUpRight } from 'lucide-react';
import { KamarDetailModal, RoomData } from './KamarDetailModal';
import { apiService } from '../../api/client';

interface AsramaBuildingMapProps {
  onOpenPMB: () => void;
}

export const AsramaBuildingMap: React.FC<AsramaBuildingMapProps> = ({ onOpenPMB }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [liveRoomsData, setLiveRoomsData] = useState<any[]>([]);

  useEffect(() => {
    apiService.getAsramaList().then(res => {
      if (res && res.status === 'success' && res.data) {
        setLiveRoomsData(res.data);
        console.log('Live Odoo Asrama Data Loaded:', res.data.length, 'buildings');
      }
    }).catch(err => {
      console.warn('Using default rooms layout while Odoo loads:', err);
    });
  }, [liveRoomsData.length]);

  // 11 Kamar Total (5 di Lantai 2 / Atas, 6 di Lantai 1 / Bawah)
  const rooms: RoomData[] = [
    // --- LANTAI 2 (5 KAMAR: A1 - A5) ---
    {
      id: 'kamar-a1',
      code: 'Kamar A1',
      floor: 2,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-1',
          name: 'Muhammad Fadlan Mutaqin',
          nickname: 'Fadlan',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'Fakultas Teknologi Industri',
          major: 'Informatika',
          majorBadge: 'Informatika',
          semester: 4,
          originCity: 'Lampung',
          entryYear: 2024,
          currentJuz: 18,
          targetJuzThisYear: 22,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Saat ini sedang menyelesaikan hafalan Juz 18 dan aktif sebagai koordinator KRT Taruna Juara.',
          photoPlaceholder: 'FOTO FADLAN',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-2',
          name: 'Rhadika Syahbana Hadi F.J',
          nickname: 'Rhadika',
          university: 'Universitas Gadjah Mada',
          universityBadge: 'UGM',
          faculty: 'Fakultas Teknik',
          major: 'Teknik Elektro',
          majorBadge: 'Teknik Elektro',
          semester: 2,
          originCity: 'Palembang',
          entryYear: 2025,
          currentJuz: 12,
          targetJuzThisYear: 16,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Fokus murajaah juz 12 dan aktif dalam divisi keasramaan Taruna Juara.',
          photoPlaceholder: 'FOTO RHADIKA',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-a2',
      code: 'Kamar A2',
      floor: 2,
      capacity: 2,
      occupied: 1, // 1 Kosong
      residents: [
        {
          id: 'res-3',
          name: 'M. Raihan As Syifa Hibatullah',
          nickname: 'Raihan',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'Sastra & Budaya',
          major: 'Ilmu Komunikasi',
          majorBadge: 'Ilmu Komunikasi',
          semester: 6,
          originCity: 'Bandung',
          entryYear: 2023,
          currentJuz: 24,
          targetJuzThisYear: 30,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Target mutqin 30 juz tahun ini dan aktif mengelola konten media kreatif da\'wah Taruna Juara.',
          photoPlaceholder: 'FOTO RAIHAN',
          photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-a3',
      code: 'Kamar A3',
      floor: 2,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-4',
          name: 'Al Fatta Budi Atmaja',
          nickname: 'Al Fatta',
          university: 'Universitas Negeri Yogyakarta',
          universityBadge: 'UNY',
          faculty: 'Ilmu Pendidikan',
          major: 'Manajemen Pendidikan',
          majorBadge: 'Manajemen Pd',
          semester: 4,
          originCity: 'Solo',
          entryYear: 2024,
          currentJuz: 20,
          targetJuzThisYear: 25,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Mengabdi di divisi PSDM dan konsisten mengulang hafalan juz 15-20.',
          photoPlaceholder: 'FOTO FATTA',
          photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-5',
          name: 'Auli Robby Finaldy',
          nickname: 'Robby',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FTI',
          major: 'Sistem Informasi',
          majorBadge: 'Sistem Informasi',
          semester: 4,
          originCity: 'Medan',
          entryYear: 2024,
          currentJuz: 15,
          targetJuzThisYear: 20,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Menikmati dinamika kuliah IT sambil menjaga hafalan di Rumah Tahfidz.',
          photoPlaceholder: 'FOTO ROBBY',
          photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-a4',
      code: 'Kamar A4',
      floor: 2,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-6',
          name: 'Muhammad Saiful Amin',
          nickname: 'Saiful',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FTI',
          major: 'Informatika',
          majorBadge: 'Informatika',
          semester: 4,
          originCity: 'Malang',
          entryYear: 2024,
          currentJuz: 16,
          targetJuzThisYear: 20,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Aktif di tim media kreatif dan fokus persiapan Tasmi 15 Juz sekali duduk.',
          photoPlaceholder: 'FOTO SAIFUL',
          photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-7',
          name: 'Adreano Hikmawan',
          nickname: 'Adreano',
          university: 'Universitas Gadjah Mada',
          universityBadge: 'UGM',
          faculty: 'MIPA',
          major: 'Ilmu Komputer',
          majorBadge: 'Ilmu Komputer',
          semester: 2,
          originCity: 'Bogor',
          entryYear: 2025,
          currentJuz: 11,
          targetJuzThisYear: 16,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Mahasiswa CS UGM yang bercita-cita menjadi Hafiz Al-Qur\'an berwawasan sains.',
          photoPlaceholder: 'FOTO ADREANO',
          photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-a5',
      code: 'Kamar A5',
      floor: 2,
      capacity: 2,
      occupied: 1, // 1 Kosong
      residents: [
        {
          id: 'res-8',
          name: 'Muhammad Galang Islami',
          nickname: 'Galang',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FKM',
          major: 'Kesehatan Masyarakat',
          majorBadge: 'Kesmas',
          semester: 2,
          originCity: 'Semarang',
          entryYear: 2025,
          currentJuz: 8,
          targetJuzThisYear: 12,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Semangat belajar ziadah 1 halaman per hari dan aktif di kegiatan media.',
          photoPlaceholder: 'FOTO GALANG',
          photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },

    // --- LANTAI 1 (6 KAMAR: B1 - B6) ---
    {
      id: 'kamar-b1',
      code: 'Kamar B1',
      floor: 1,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-9',
          name: 'Aldi Wahyu Purnomo',
          nickname: 'Aldi',
          university: 'Universitas Islam Indonesia',
          universityBadge: 'UII',
          faculty: 'Fakultas Ekonomi',
          major: 'Akuntansi',
          majorBadge: 'Akuntansi',
          semester: 2,
          originCity: 'Surabaya',
          entryYear: 2025,
          currentJuz: 10,
          targetJuzThisYear: 15,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Semangat belajar ziadah harian dan aktif di divisi PSDM.',
          photoPlaceholder: 'FOTO ALDI',
          photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-10',
          name: 'Gibran Azhari',
          nickname: 'Gibran',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FHB',
          major: 'Hukum Ekonomi Syariah',
          majorBadge: 'Hukum Syariah',
          semester: 4,
          originCity: 'Bekasi',
          entryYear: 2024,
          currentJuz: 14,
          targetJuzThisYear: 18,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Fokus murajaah kelancaran juz 1-14 bersama ustadz pembimbing.',
          photoPlaceholder: 'FOTO GIBRAN',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-b2',
      code: 'Kamar B2',
      floor: 1,
      capacity: 2,
      occupied: 1, // 1 Kosong
      residents: [
        {
          id: 'res-11',
          name: 'Ashlih Farhamna Annisar',
          nickname: 'Ashlih',
          university: 'Universitas Gadjah Mada',
          universityBadge: 'UGM',
          faculty: 'Fakultas Farmasi',
          major: 'Farmasi',
          majorBadge: 'Farmasi',
          semester: 4,
          originCity: 'Yogyakarta',
          entryYear: 2024,
          currentJuz: 19,
          targetJuzThisYear: 24,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Menyeimbangkan rutinitas praktikum farmasi dan hafalan Qur\'an.',
          photoPlaceholder: 'FOTO ASHLIH',
          photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-b3',
      code: 'Kamar B3',
      floor: 1,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-12',
          name: 'Ronald Gozali',
          nickname: 'Ronald',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FTI',
          major: 'Teknik Kimia',
          majorBadge: 'Teknik Kimia',
          semester: 2,
          originCity: 'Tangerang',
          entryYear: 2025,
          currentJuz: 9,
          targetJuzThisYear: 14,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Menikmati suasana kekeluargaan di asrama Taruna Juara.',
          photoPlaceholder: 'FOTO RONALD',
          photoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-13',
          name: 'Muhammad Aprizal Solahuddin',
          nickname: 'Aprizal',
          university: 'Universitas Negeri Yogyakarta',
          universityBadge: 'UNY',
          faculty: 'FIK',
          major: 'Pendidikan Olahraga',
          majorBadge: 'Olahraga',
          semester: 4,
          originCity: 'Kebumen',
          entryYear: 2024,
          currentJuz: 13,
          targetJuzThisYear: 18,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Menjaga kebugaran fisik dan konsistensi murajaah Al-Qur\'an.',
          photoPlaceholder: 'FOTO APRIZAL',
          photoUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-b4',
      code: 'Kamar B4',
      floor: 1,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-14',
          name: 'Mulya Adi Putra',
          nickname: 'Mulya',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FAI',
          major: 'Ilmu Hadis',
          majorBadge: 'Ilmu Hadis',
          semester: 4,
          originCity: 'Riau',
          entryYear: 2024,
          currentJuz: 21,
          targetJuzThisYear: 26,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Mendalami keilmuan hadis dan menargetkan khatam hafalan 30 juz.',
          photoPlaceholder: 'FOTO MULYA',
          photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-15',
          name: 'M. Fakthurrahman Farid',
          nickname: 'Farid',
          university: 'Universitas Gadjah Mada',
          universityBadge: 'UGM',
          faculty: 'FIB',
          major: 'Sastra Arab',
          majorBadge: 'Sastra Arab',
          semester: 2,
          originCity: 'Makassar',
          entryYear: 2025,
          currentJuz: 15,
          targetJuzThisYear: 20,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Aktif di keasramaan dan memperdalam kaidah kebahasaan Al-Qur\'an.',
          photoPlaceholder: 'FOTO FARID',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-b5',
      code: 'Kamar B5',
      floor: 1,
      capacity: 2,
      occupied: 1, // 1 Kosong
      residents: [
        {
          id: 'res-16',
          name: 'Ridho Sulaiman Panjaitan',
          nickname: 'Ridho',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FTI',
          major: 'Informatika',
          majorBadge: 'Informatika',
          semester: 2,
          originCity: 'Medan',
          entryYear: 2025,
          currentJuz: 7,
          targetJuzThisYear: 12,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Semangat belajar koding dan menyetorkan ziadah harian.',
          photoPlaceholder: 'FOTO RIDHO',
          photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 'kamar-b6',
      code: 'Kamar B6',
      floor: 1,
      capacity: 2,
      occupied: 2,
      residents: [
        {
          id: 'res-17',
          name: 'Farhanul Ibad',
          nickname: 'Ibad',
          university: 'Universitas Islam Indonesia',
          universityBadge: 'UII',
          faculty: 'FPSB',
          major: 'Psikologi',
          majorBadge: 'Psikologi',
          semester: 4,
          originCity: 'Banten',
          entryYear: 2024,
          currentJuz: 17,
          targetJuzThisYear: 22,
          ustadzName: 'Ustadz Pembina 2',
          quote: 'Aktif di KRT keasramaan dan memperdalam pemahaman psikologi islami.',
          photoPlaceholder: 'FOTO IBAD',
          photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'res-18',
          name: 'Muhammad Rifa Alif Armansyah',
          nickname: 'Rifa',
          university: 'Universitas Ahmad Dahlan',
          universityBadge: 'UAD',
          faculty: 'FSB',
          major: 'Sastra Inggris',
          majorBadge: 'Sustra Inggris',
          semester: 2,
          originCity: 'Ciamis',
          entryYear: 2025,
          currentJuz: 11,
          targetJuzThisYear: 16,
          ustadzName: 'Ustadz Pembina 1',
          quote: 'Aktif di tim media publikasi dan rutin menyimak murajaah sesama santri.',
          photoPlaceholder: 'FOTO RIFA',
          photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
  ];

  return (
    <section id="dormitory" className="py-24 bg-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <Home className="w-4 h-4" />
            <span>Denah Interaktif Asrama (11 Kamar)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Denah Kamar <span className="text-[#D93829]">Mahasantri</span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-medium">
            Bangunan 2 Lantai Rumah Tahfidz Taruna Juara (5 Kamar Lantai Top & 6 Kamar Lantai Dasar). Klik kamar untuk membuka profil mahasantri 2 sisi (flip card).
          </p>
        </div>

        {/* HOUSE SHAPE BUILDING CONTAINER */}
        <div className="max-w-6xl mx-auto relative">
          {/* Roof Graphic Header */}
          <div className="relative mx-auto w-[92%] sm:w-[85%] h-24 sm:h-32 bg-gradient-to-tr from-[#D93829] to-[#EA580C] clip-roof rounded-t-3xl shadow-xl flex items-center justify-center text-white text-center p-4">
            <div className="relative z-10 flex items-center gap-3">
              <Home className="w-8 h-8 text-amber-300 hidden sm:block" />
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-wide">
                  RUMAH TAHFIDZ TARUNA JUARA
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-200">
                  Denah Asrama 11 Kamar • Yogyakarta
                </span>
              </div>
            </div>
          </div>

          {/* Main House Building Frame */}
          <div className="bg-white rounded-b-3xl rounded-t-none p-6 sm:p-10 border-4 border-[#D93829]/20 shadow-2xl relative z-10 space-y-10">
            
            {/* LANTAI 2 (5 KAMAR: A1 - A5) */}
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D93829]"></span>
                  <h4 className="text-lg font-black text-neutral-900 uppercase tracking-wider">
                    Lantai 2 (5 Kamar: A1 - A5)
                  </h4>
                </div>
                <span className="text-xs font-extrabold text-[#D93829] bg-[#D93829]/10 px-3 py-1 rounded-full">
                  Lantai Atas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {rooms.slice(0, 5).map((room) => {
                  const isFull = room.occupied >= room.capacity;
                  return (
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden group flex flex-col justify-between ${
                        isFull
                          ? 'bg-white border-neutral-200 hover:border-[#D93829]'
                          : 'bg-gradient-to-br from-amber-50/60 to-orange-50/60 border-amber-400 hover:border-[#D93829]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-extrabold flex items-center justify-center text-xs">
                            {room.code.replace('Kamar ', '')}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                              isFull ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {isFull ? '🟢 FULL' : '🔴 1 KOSONG'}
                          </span>
                        </div>

                        <h5 className="text-sm font-black text-neutral-900 mb-2 group-hover:text-[#D93829] transition-colors">
                          {room.code}
                        </h5>

                        <div className="space-y-1.5 mb-3">
                          {room.residents.map((res) => (
                            <div
                              key={res.id}
                              className="flex items-center justify-between bg-neutral-50 p-1.5 rounded-lg border border-neutral-200/80 text-[11px] font-bold text-neutral-800"
                            >
                              <span className="truncate pr-1">{res.nickname || res.name.split(' ')[0]}</span>
                              <span className="px-1.5 py-0.2 bg-neutral-200 text-[9px] rounded font-extrabold shrink-0">
                                {res.universityBadge}
                              </span>
                            </div>
                          ))}

                          {!isFull && (
                            <div className="bg-amber-100/80 border border-dashed border-amber-400 p-1.5 rounded-lg text-center text-[10px] font-extrabold text-amber-900 flex items-center justify-center gap-1">
                              <Sparkles className="w-3 h-3" /> Slot PMB
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-extrabold text-[#D93829]">
                        <span>Detail</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* LANTAI 1 (6 KAMAR: B1 - B6) */}
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500"></span>
                  <h4 className="text-lg font-black text-neutral-900 uppercase tracking-wider">
                    Lantai 1 (6 Kamar: B1 - B6)
                  </h4>
                </div>
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  Lantai Dasar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {rooms.slice(5).map((room) => {
                  const isFull = room.occupied >= room.capacity;
                  return (
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden group flex flex-col justify-between ${
                        isFull
                          ? 'bg-white border-neutral-200 hover:border-[#D93829]'
                          : 'bg-gradient-to-br from-amber-50/60 to-orange-50/60 border-amber-400 hover:border-[#D93829]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-extrabold flex items-center justify-center text-xs">
                            {room.code.replace('Kamar ', '')}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                              isFull ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {isFull ? '🟢 FULL' : '🔴 1 KOSONG'}
                          </span>
                        </div>

                        <h5 className="text-sm font-black text-neutral-900 mb-2 group-hover:text-[#D93829] transition-colors">
                          {room.code}
                        </h5>

                        <div className="space-y-1.5 mb-3">
                          {room.residents.map((res) => (
                            <div
                              key={res.id}
                              className="flex items-center justify-between bg-neutral-50 p-1.5 rounded-lg border border-neutral-200/80 text-[11px] font-bold text-neutral-800"
                            >
                              <span className="truncate pr-1">{res.nickname || res.name.split(' ')[0]}</span>
                              <span className="px-1.5 py-0.2 bg-neutral-200 text-[9px] rounded font-extrabold shrink-0">
                                {res.universityBadge}
                              </span>
                            </div>
                          ))}

                          {!isFull && (
                            <div className="bg-amber-100/80 border border-dashed border-amber-400 p-1.5 rounded-lg text-center text-[10px] font-extrabold text-amber-900 flex items-center justify-center gap-1">
                              <Sparkles className="w-3 h-3" /> Slot PMB
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-extrabold text-[#D93829]">
                        <span>Detail</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Kamar Detail Modal */}
      <KamarDetailModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onOpenPMB={onOpenPMB}
      />
    </section>
  );
};
