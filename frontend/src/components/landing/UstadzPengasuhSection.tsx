import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

interface UstadzItem {
  id: number | string;
  name: string;
  title?: string;
  specialization?: string;
  quote?: string;
  bio?: string;
}

interface UstadzPengasuhSectionProps {
  ustadzList?: UstadzItem[];
}

export const UstadzPengasuhSection: React.FC<UstadzPengasuhSectionProps> = ({ ustadzList }) => {
  const defaultUstadz: UstadzItem[] = [
    { id: 1, name: 'Ustadz Dr. H. Ahmad Dahlan, M.A.', title: 'Pengasuh Utama & Pembina Tahfidz', specialization: 'Tafsir Al-Qur\'an & Mutun Ilmiyyah', quote: 'Al-Qur\'an bukan hanya untuk dihafal, tapi menjadi kompas kepemimpinan hidup.', bio: 'Doktor Bidang Al-Qur\'an & Tafsir, Pembina Utama Rumah Tahfidz Taruna Juara.' },
    { id: 2, name: 'Ustadz Muhammad Ridwan, S.Ud., Al-Hafizh', title: 'Musyrif Senior Halaqah Subuh', specialization: 'Tahfidz 30 Juz & Qira\'at Asyara', quote: 'Kedisiplinan setoran harian adalah kunci utama kemutqinan hafalan.', bio: 'Hafizh 30 Juz Mutqin berpemegang Sanad Qira\'at.' },
    { id: 3, name: 'Ustadz Faisal Rahman, M.Pd.', title: 'Pembina Keasramaan & Karakter', specialization: 'Manajemen Diri & Kepemimpinan', quote: 'Mahasantri Rabbani adalah mereka yang kuat ruhaninya dan unggul akademisnya.', bio: 'Magister Pendidikan Islam & Konsultan Karakter Pemuda.' },
  ];

  const listToDisplay = ustadzList && ustadzList.length > 0 ? ustadzList : defaultUstadz;

  return (
    <section id="ustadz" className="py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] text-xs font-black uppercase tracking-wider inline-block mb-3">
            Pembina &amp; Pengasuh
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
            Ustadz &amp; Musyrif Pembimbing Halaqah
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Didampingi oleh pengasuh yang berpengalaman dalam bimbingan tahfidz 30 Juz dan pengembangan karakter Rabbani.
          </p>
        </div>

        {/* Ustadz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listToDisplay.map((ustadz, idx) => (
            <motion.div
              key={ustadz.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-neutral-900 to-neutral-800 text-amber-400 flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-400/30 shrink-0">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-900 leading-tight">
                      {ustadz.name}
                    </h3>
                    <p className="text-xs font-bold text-[#D93829] mt-0.5">
                      {ustadz.title || 'Pengasuh Halaqah'}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                    Spesialisasi Bimbingan:
                  </span>
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-900 rounded-xl text-xs font-extrabold inline-block">
                    {ustadz.specialization || 'Tahfidz Al-Qur\'an 30 Juz'}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 font-medium leading-relaxed italic bg-[#FAF6F0] p-4 rounded-2xl border border-neutral-200/60 mb-4">
                  "{ustadz.quote || 'Al-Qur\'an adalah sebaik-baik pedoman hidup.'}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-[11px] font-semibold text-neutral-500">
                {ustadz.bio || 'Pembimbing aktif di Rumah Tahfidz Taruna Juara.'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
