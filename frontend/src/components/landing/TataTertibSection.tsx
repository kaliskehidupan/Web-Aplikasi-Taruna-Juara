import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Heart,
  AlertTriangle,
  Scale,
  CheckCircle2,
  ShieldAlert,
  Award,
  Sparkles,
  BookMarked,
  Info,
} from 'lucide-react';

export const TataTertibSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'target' | 'adab' | 'larangan' | 'sanksi'>('target');

  // B. TARGET TAHFIDZ WAJIB ASRAMA
  const targetPoints = [
    {
      title: 'Setoran Hafalan Harian',
      desc: 'Setoran hafalan minimal ½ halaman per hari kepada Ustadz / Musyrif pembimbing.',
      badge: 'Minimal ½ Halaman / Hari',
      icon: BookMarked,
    },
    {
      title: 'Tasmi’ 1 Juz Per-Tahap',
      desc: 'Mengikuti ujian tasmi’ 1 juz sekali duduk setelah menyelesaikan kelipatan target setoran hafalan.',
      badge: 'Sekali Duduk',
      icon: Award,
    },
    {
      title: 'Evaluasi Akhir Tahun (Desember)',
      desc: 'Mengikuti tasmi’ minimal 3 juz pada ujian dan evaluasi kelancaran hafalan akhir tahun (setiap bulan Desember).',
      badge: 'Minimal 3 Juz Tasmi’',
      icon: Sparkles,
    },
    {
      title: 'Satu Mushaf Standar Khusus',
      desc: 'Wajib menggunakan satu jenis mushaf hafalan khusus (Mushaf Bahriyah/Madinah) untuk menjaga visual memori ayat.',
      badge: '1 Mushaf Konsisten',
      icon: BookOpen,
    },
    {
      title: 'Pemeliharaan Kualitas Hafalan',
      desc: 'Menjaga kualitas & kelancaran hafalan dengan memperbanyak frekuensi murajaah mandiri dan tasmi’ sesama santri.',
      badge: 'Mutqin & Murajaah',
      icon: CheckCircle2,
    },
  ];

  // C. ADAB MAHASANTRI
  const adabPoints = [
    { text: 'Menjaga shalat berjamaah lima waktu tepat waktu di masjid/mushalla asrama.', icon: '🕌' },
    { text: 'Menghormati Ustadz, Musyrif, Pembina, dan sesama mahasantri.', icon: '🤝' },
    { text: 'Berkata sopan, santun, jujur, dan senantiasa menjaga ukhuwah Islamiyah.', icon: '💬' },
    { text: 'Menjaga amanah dan tanggung jawab sebagai pembawa syiar Al-Qur\'an.', icon: '🛡️' },
    { text: 'Berpakaian rapi, sopan, bersih, menutup aurat, dan sesuai norma syariat.', icon: '👔' },
    { text: 'Menjaga kebersihan kamar pribadi, masjid, dapur, dan lingkungan asrama.', icon: '🧹' },
    { text: 'Menjadi teladan yang baik (Uswah Hasanah) di lingkungan kampus maupun masyarakat.', icon: '🌟' },
    { text: 'Menjaga sarana & fasilitas asrama serta menggunakannya dengan penuh tanggung jawab.', icon: '🏫' },
  ];

  // D. LARANGAN ASRAMA (12 POIN)
  const laranganPoints = [
    { text: 'Meninggalkan shalat berjamaah tanpa uzur syar\'i.', severity: 'sedang' },
    { text: 'Meninggalkan kegiatan rutin asrama tanpa izin resmi dari Musyrif dan Ustadz.', severity: 'sedang' },
    { text: 'Merokok, menggunakan vape, narkoba, dan minuman keras di seluruh area asrama.', severity: 'berat' },
    { text: 'Berpacaran atau melakukan aktivitas apapun yang mendekati perbuatan zina.', severity: 'berat' },
    { text: 'Bermain game secara berlebihan hingga mengganggu hafalan dan tugas perkuliahan.', severity: 'sedang' },
    { text: 'Menonton atau mengakses konten yang tidak bermanfaat, tidak mendidik, atau melanggar syariat.', severity: 'sedang' },
    { text: 'Membuat kegaduhan yang mengganggu kenyamanan dan kekhusyukan penghuni asrama.', severity: 'ringan' },
    { text: 'Menyebarkan fitnah, ghibah, serta perkataan kasar/kotor.', severity: 'sedang' },
    { text: 'Berkelahi atau melakukan tindakan fisik/verbal yang merusak ukhuwah sesama santri.', severity: 'berat' },
    { text: 'Merusak fasilitas asrama (termasuk menempel & memaku tembok secara permanen).', severity: 'ringan' },
    { text: 'Membuang sampah sembarangan di dalam lingkungan dan kamar asrama.', severity: 'ringan' },
    { text: 'Membawa, menggunakan, atau menyimpan barang bertentangan dengan syariat/peraturan (jimat, benda mistis/syirik, dll).', severity: 'berat' },
  ];

  // E. SANKSI & PEMBINAAN EDUKATIF (6 POIN)
  const sanksiPoints = [
    {
      level: 'Prinsip Utama',
      title: 'Pembinaan Bertahap & Edukatif',
      desc: 'Setiap pelanggaran tata tertib akan diberikan pembinaan secara bertahap, adil, transparan, dan berorientasi edukatif.',
      style: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    },
    {
      level: 'Pelanggaran Ringan',
      title: 'Teguran Lisan & Tugas Pembinaan',
      desc: 'Diberikan teguran lisan secara kekeluargaan serta tugas pembinaan edukatif (seperti ziyaadah murajaah atau piket kebersihan).',
      style: 'bg-sky-50 text-sky-900 border-sky-200',
    },
    {
      level: 'Pelanggaran Sedang',
      title: 'Surat Peringatan & Pembinaan Khusus',
      desc: 'Diberikan Surat Peringatan (SP) tertulis dan program pembinaan khusus yang dipantau langsung oleh Musyrif.',
      style: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      level: 'Pelanggaran Berat',
      title: 'Sidang Dewan Pengelola & Ustadz',
      desc: 'Dibahas dalam rapat dewan Musyrif, Ustadz, dan Pengelola Asrama untuk menentukan tindak lanjut tegas yang sesuai.',
      style: 'bg-rose-50 text-rose-900 border-rose-200',
    },
    {
      level: 'Tindakan Berulang',
      title: 'Sanksi Tambahan & Disiplin Kebijakan',
      desc: 'Mahasantri yang berulang kali melakukan pelanggaran tanpa ada perbaikan akan dikenakan sanksi tegas sesuai kebijakan pengelola.',
      style: 'bg-purple-50 text-purple-900 border-purple-200',
    },
    {
      level: 'Tujuan Akhir',
      title: 'Mendidik & Menumbuhkan Kedisiplinan',
      desc: 'Seluruh bentuk sanksi bertujuan murni untuk mendidik, memperbaiki akhlak, serta menumbuhkan rasa tanggung jawab dan kesadaran diri.',
      style: 'bg-neutral-900 text-white border-neutral-800',
    },
  ];

  return (
    <section id="tata-tertib" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Pedoman & Komitmen Mahasantri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Target Wajib, Adab & <span className="text-[#D93829]">Tata Tertib Asrama</span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-medium leading-relaxed">
            Meskipun target kelulusan utama adalah <strong>30 Juz Mutqin</strong>, berikut adalah standar target wajib harian/tahunan, adab keasramaan, larangan, serta sistem pembinaan edukatif di Rumah Tahfidz Taruna Juara.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('target')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'target'
                ? 'bg-[#D93829] text-white shadow-lg shadow-[#D93829]/25 scale-105'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>Target Wajib Tahfidz</span>
          </button>

          <button
            onClick={() => setActiveCategory('adab')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'adab'
                ? 'bg-[#D93829] text-white shadow-lg shadow-[#D93829]/25 scale-105'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Adab Mahasantri</span>
          </button>

          <button
            onClick={() => setActiveCategory('larangan')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'larangan'
                ? 'bg-[#D93829] text-white shadow-lg shadow-[#D93829]/25 scale-105'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Larangan Asrama</span>
          </button>

          <button
            onClick={() => setActiveCategory('sanksi')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
              activeCategory === 'sanksi'
                ? 'bg-[#D93829] text-white shadow-lg shadow-[#D93829]/25 scale-105'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Sanksi & Pembinaan</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          
          {/* 1. TARGET TAHFIDZ WAJIB */}
          {activeCategory === 'target' && (
            <motion.div
              key="target"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-5xl mx-auto"
            >
              {/* Highlight Note */}
              <div className="bg-gradient-to-r from-[#FAF6F0] via-amber-50 to-orange-50 p-6 rounded-3xl border-2 border-amber-300/80 shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D93829] text-white flex items-center justify-center shrink-0 shadow-md font-bold">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-neutral-900 mb-1">
                    Catatan Target Standar Asrama Taruna Juara
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                    Setiap mahasantri berjuang untuk mencapai <strong>30 Juz Al-Qur'an</strong> selama masa studi. Namun untuk memastikan konsistensi dan progres harian yang terukur, setiap mahasantri <strong>wajib memenuhi 5 poin standar target hafalan di bawah ini</strong>.
                  </p>
                </div>
              </div>

              {/* Target Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {targetPoints.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-3xl border-2 border-neutral-200/90 hover:border-[#D93829] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#D93829]/10 text-[#D93829] group-hover:bg-[#D93829] group-hover:text-white flex items-center justify-center font-bold transition-colors">
                            <IconComp className="w-6 h-6" />
                          </div>
                          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[10px] font-black rounded-full uppercase tracking-wider">
                            {item.badge}
                          </span>
                        </div>
                        <h5 className="text-lg font-black text-neutral-900 mb-2 group-hover:text-[#D93829] transition-colors">
                          {idx + 1}. {item.title}
                        </h5>
                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-500">
                        <span>Status Evaluasi:</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                          Wajib Terpenuhi
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 2. ADAB MAHASANTRI */}
          {activeCategory === 'adab' && (
            <motion.div
              key="adab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-neutral-900 text-white p-8 rounded-3xl mb-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <span className="px-3 py-1 bg-amber-400 text-neutral-950 font-black text-[10px] uppercase tracking-wider rounded-md mb-3 inline-block">
                    Akhlak & Ukhuwah
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2">
                    8 Adab Utama Mahasantri Taruna Juara
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
                    Menjaga kehormatan al-Qur'an dimulai dari membentuk pribadi yang beradab tinggi, berakhlakul karimah, disiplin ibadah, serta menjadi pembawa keberkahan di manapun berada.
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D93829]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {adabPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border-2 border-neutral-200/80 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <div className="text-[11px] font-black text-[#D93829] uppercase tracking-wider mb-1">
                        Adab #{idx + 1}
                      </div>
                      <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center gap-1 text-[10px] font-extrabold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Standar Karakter
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 3. LARANGAN ASRAMA */}
          {activeCategory === 'larangan' && (
            <motion.div
              key="larangan"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <div className="bg-rose-50 border-2 border-rose-200 p-6 rounded-3xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-rose-950 mb-1">
                    12 Poin Larangan Resmi Asrama Taruna Juara
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
                    Setiap penghuni asrama wajib menjauhi larangan di bawah ini untuk menjaga kesucian lingkungan hafalan Al-Qur'an, ketertiban bersama, serta ukhuwah sesama mahasantri.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {laranganPoints.map((item, idx) => {
                  const isBerat = item.severity === 'berat';
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isBerat
                          ? 'bg-rose-50/60 border-rose-300 shadow-sm hover:shadow-md'
                          : 'bg-white border-neutral-200 hover:border-amber-400 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white font-extrabold text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              isBerat
                                ? 'bg-rose-600 text-white'
                                : item.severity === 'sedang'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            Kategori {item.severity}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-neutral-800 leading-relaxed mt-2">
                          {item.text}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-neutral-200/60 text-[10px] font-bold text-neutral-500 flex items-center justify-between">
                        <span>Kepatuhan:</span>
                        <span className="text-rose-700 font-extrabold">Dilarang Keras</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 4. SANKSI & PEMBINAAN EDUKATIF */}
          {activeCategory === 'sanksi' && (
            <motion.div
              key="sanksi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <div className="bg-[#FAF6F0] p-6 rounded-3xl border border-neutral-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Scale className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-neutral-900 mb-1">
                    Sistem Pembinaan & Sanksi Bertahap
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                    Sanksi di Taruna Juara bersifat <strong>edukatif, mendidik, dan berasaskan persaudaraan Islam</strong>. Penanganan pelanggaran dilakukan secara transparan untuk memperbaiki karakter santri secara berkelanjutan.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sanksiPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-3xl border-2 shadow-md flex flex-col justify-between ${item.style}`}
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider opacity-80 mb-1">
                        Tingkat #{idx + 1} • {item.level}
                      </div>
                      <h5 className="text-lg font-black mb-2">
                        {item.title}
                      </h5>
                      <p className="text-xs font-medium opacity-90 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-current/20 text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-between">
                      <span>Prosedur Penanganan</span>
                      <span>Terstruktur</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};
