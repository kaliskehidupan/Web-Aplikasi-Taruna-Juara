import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface PengurusItem {
  id: number | string;
  name: string;
  position: string;
  division: string;
}

interface StrukturKepengurusanProps {
  pengurusList?: PengurusItem[];
}

export const StrukturKepengurusanSection: React.FC<StrukturKepengurusanProps> = ({ pengurusList }) => {
  const defaultPengurus: PengurusItem[] = [
    { id: 1, name: 'H. Bambang Sulistyo, M.M.', position: 'Direktur Utama Pengelola', division: 'pimpinan' },
    { id: 2, name: 'Ustadz Ahmad Dahlan, M.A.', position: 'Kepala Divisi Pendidikan & Tahfidz', division: 'pendidikan' },
    { id: 3, name: 'Muhammad Hanif, S.T.', position: 'Kepala Divisi Keasramaan & Sarpras', division: 'kesantrian' },
    { id: 4, name: 'Rahmat Syarif, S.E.', position: 'Kepala Divisi Keuangan & Operasional', division: 'operasional' },
    { id: 5, name: 'Dwi Prasetyo, S.Kom.', position: 'Kepala Divisi IT & Digital System', division: 'humas' },
  ];

  const listToDisplay = pengurusList && pengurusList.length > 0 ? pengurusList : defaultPengurus;

  return (
    <section id="struktur-organisasi" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-black uppercase tracking-wider inline-block mb-3">
            Bagan Organisasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
            Struktur Kepengurusan &amp; Pengelola
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Tim pengelola profesional yang berdedikasi menjaga kualitas operasional, pendidikan, dan fasilitas asrama mahasantri.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {listToDisplay.map((pengurus, idx) => (
            <motion.div
              key={pengurus.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#FAF6F0] p-6 rounded-3xl border border-neutral-200/80 text-center flex flex-col justify-between hover:border-[#D93829]/40 transition-colors"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white text-neutral-900 flex items-center justify-center mx-auto mb-4 font-black shadow-md border border-neutral-200">
                  <Briefcase className="w-6 h-6 text-[#D93829]" />
                </div>

                <h3 className="text-sm font-black text-neutral-900 mb-1 leading-snug">
                  {pengurus.name}
                </h3>

                <p className="text-xs font-bold text-[#D93829] mb-3">
                  {pengurus.position}
                </p>
              </div>

              <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-wider text-neutral-600 border border-neutral-200 inline-block">
                {pengurus.division}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
