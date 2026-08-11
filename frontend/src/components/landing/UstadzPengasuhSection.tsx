import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Quote, Image as ImageIcon, Building, BookOpen } from 'lucide-react';

export const UstadzPengasuhSection: React.FC = () => {
  const mentors = [
    {
      id: 'ust-1',
      roleTag: 'Ustadz Pembina Tahfidz 1',
      name: 'Ustadz Pengampu Ziadah',
      specialization: 'Pengampu Setoran Ziadah 30 Juz',
      description: 'Mendampingi penyetoran ziadah harian mahasantri bada Subuh & Maghrib dengan bimbingan tajwid & kelancaran.',
      quote: 'Kedisiplinan menyetor setiap hari adalah kunci kelancaran hafalan Al-Qur\'an.',
      photoPlaceholder: 'Foto Ustadz Pembina 1',
      accent: 'border-[#D93829]',
    },
    {
      id: 'ust-2',
      roleTag: 'Ustadz Pembina Tahfidz 2',
      name: 'Ustadz Pengampu Murajaah',
      specialization: 'Pembimbing Murajaah & Penguji Tasmi\'',
      description: 'Membimbing pengulangan hafalan mutqin dan menguji kelancaran Tasmi\' Bil Ghaib 1-30 Juz.',
      quote: 'Menjaga hafalan jauh lebih mulia dan membutuhkan ketabahan hati.',
      photoPlaceholder: 'Foto Ustadz Pembina 2',
      accent: 'border-amber-500',
    },
    {
      id: 'ust-3',
      roleTag: 'Musyrif Keasramaan (KRT)',
      name: 'Musyrif Kedisiplinan & Nurturing',
      specialization: 'Pengawas Asrama & Karakter Santri',
      description: 'Mengawal ketertiban harian, piket kebersihan asrama, serta mendampingi kehidupan sosial mahasantri.',
      quote: 'Asrama yang rapi dan ukhuwah yang hangat menciptakan ketenangan dalam menghafal.',
      photoPlaceholder: 'Foto Musyrif Keasramaan',
      accent: 'border-emerald-600',
    },
  ];

  return (
    <section id="mentors" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <UserCheck className="w-4 h-4" />
            <span>Pemilik Asrama, Pembina & Dewan Pengasuh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Pemilik Asrama, <span className="text-[#D93829]">Ustadz & Musyrif</span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-medium">
            Mengenal tokoh pemilik asrama/donatur utama serta para ustadz dan musyrif yang mendampingi perjalanan mahasantri Taruna Juara.
          </p>
        </div>

        {/* --- PEMILIK ASRAMA & DONATUR UTAMA (PROF. ANGGITO ABIMANYU & IBU ARMA) --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#FAF6F0] via-orange-50 to-amber-50 rounded-3xl p-8 sm:p-12 border-2 border-[#D93829]/20 shadow-2xl mb-16 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Visual Photo Placeholder Frame for Pak Anggito Abimanyu & Ibu Arma */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 flex flex-col items-center justify-center p-6 text-center text-white shadow-xl border-4 border-white">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 text-amber-300">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/50 px-3 py-1 rounded-full mb-1">
                  Foto Pemilik Asrama & Donatur Utama
                </span>
                <h4 className="text-base font-black text-white mt-1">
                  Prof. Dr. Anggito Abimanyu & Ibu Arma
                </h4>
                <span className="text-[11px] text-neutral-300 font-medium mt-0.5">
                  [ Upload Foto Prof. Anggito Abimanyu & Ibu Edharma Yati Latief ]
                </span>
              </div>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-7">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#D93829] bg-[#D93829]/10 mb-3">
                Pemilik Asrama & Donatur Utama
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-tight mb-2">
                Prof. Dr. Anggito Abimanyu, S.E., M.Sc., Ph.D. <br className="hidden sm:block" />
                <span className="text-lg sm:text-xl font-bold text-neutral-600">& Ibu Edharma Yati Latief (Ibu Arma)</span>
              </h3>

              {/* High-Impact Credential Badges */}
              <div className="flex flex-wrap gap-2 my-4">
                <span className="px-3 py-1 rounded-xl bg-neutral-900 text-white text-xs font-extrabold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  Ketua Dewan Komisioner LPS
                </span>
                <span className="px-3 py-1 rounded-xl bg-neutral-900 text-white text-xs font-extrabold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Guru Besar FEB UGM
                </span>
                <span className="px-3 py-1 rounded-xl bg-neutral-800 text-neutral-200 text-xs font-extrabold">
                  Eks Wamenkeu RI
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-300">
                  Ph.D. Univ. of Pennsylvania
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#D93829]/10 text-[#D93829] text-xs font-extrabold border border-[#D93829]/20">
                  Ibu Arma: Penggerak Sosial & DWP
                </span>
              </div>

              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-6">
                Dengan kepedulian tinggi terhadap pendidikan dan da'wah Qur'an, <strong>Prof. Anggito Abimanyu</strong> bersama sang istri, <strong>Ibu Edharma Yati Latief (Ibu Arma)</strong>, menyediakan dan mendonasikan fasilitas rumah asrama Taruna Juara di Yogyakarta. Tempat ini dihadirkan sebagai sarana pembinaan holistik bagi mahasiswa agar dapat menyelesaikan hafalan 30 Juz secara mutqin.
              </p>

              {/* Quote Container */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-md">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#D93829] uppercase tracking-wider mb-1.5">
                  <Quote className="w-4 h-4" /> Pesan Pendiri
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 italic font-semibold leading-relaxed">
                  "Semoga rumah asrama ini menjadi wadah melahirkan generasi huffazh Al-Qur'an berkarakter unggul, cerdas secara akademik, dan membawa keberkahan luas bagi masyarakat."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- DEWAN USTADZ (2 PERSON) & MUSYRIF (1 PERSON) --- */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-black text-neutral-900">
            Tim Ustadz Pembina & Musyrif Keasramaan
          </h3>
          <p className="text-xs text-neutral-500 font-semibold mt-1">
            2 Ustadz Pengampu Tahfidz & 1 Musyrif Kedisiplinan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={mentor.id}
              className={`bg-white rounded-3xl p-6 border-2 ${mentor.accent} shadow-xl transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Photo Placeholder Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-800 flex flex-col items-center justify-center p-4 text-center text-white mb-6 group-hover:scale-[1.02] transition-transform shadow-inner">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 text-amber-300">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-3 py-1 rounded-full mb-1">
                    Ruang Foto Pembimbing
                  </span>
                  <span className="text-xs font-semibold text-neutral-300">
                    [{mentor.photoPlaceholder}]
                  </span>
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[#D93829] bg-[#D93829]/10 mb-3">
                  {mentor.roleTag}
                </span>

                <h3 className="text-xl font-black text-neutral-900 mb-1 group-hover:text-[#D93829] transition-colors">
                  {mentor.name}
                </h3>
                <p className="text-xs font-bold text-amber-600 mb-4">
                  {mentor.specialization}
                </p>

                <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
                  {mentor.description}
                </p>
              </div>

              {/* Quote Block */}
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-neutral-200/80">
                <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#D93829] uppercase tracking-wider mb-1">
                  <Quote className="w-3 h-3" /> Pesan Pembinaan
                </div>
                <p className="text-xs text-neutral-700 italic font-semibold leading-relaxed">
                  "{mentor.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
