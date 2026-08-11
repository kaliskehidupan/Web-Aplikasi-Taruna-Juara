import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface JourneyItem {
  step_number: number;
  title: string;
  duration?: string;
  target_hafalan?: string;
  description?: string;
  badge_color?: string;
}

interface StudentJourneyProps {
  journeyList?: JourneyItem[];
}

export const StudentJourneySection: React.FC<StudentJourneyProps> = ({ journeyList }) => {
  const defaultJourney: JourneyItem[] = [
    { step_number: 1, title: 'Tahap Matrikulasi & Adab', duration: 'Bulan 1 - 2', target_hafalan: '2 Juz Mutqin', description: 'Pembekalan adab penuntut ilmu, standar tajwid makhraj, dan penyesuaian budaya asrama.', badge_color: 'blue' },
    { step_number: 2, title: 'Tahap Akselerasi Ziyadah', duration: 'Semester 1 - 2', target_hafalan: '12 Juz Mutqin', description: 'Fokus setoran hafalan baru secara konsisten 1-2 halaman per hari disertai murajaah rutin.', badge_color: 'blue' },
    { step_number: 3, title: 'Tahap Matrikulasi 30 Juz', duration: 'Semester 3 - 4', target_hafalan: '30 Juz Kompleks', description: 'Penyelesaian seluruh setoran 30 Juz dilanjutkan dengan tasmi\' per-5 juz berkala.', badge_color: 'emerald' },
    { step_number: 4, title: 'Ujian Tasmi\' Bil Ghaib & Sanad', duration: 'Semester 5 - 6', target_hafalan: '30 Juz Sekali Duduk', description: 'Ujian komprehensif melafalkan 30 Juz Al-Qur\'an secara hafalan penuh di hadapan tim Ustadz.', badge_color: 'amber' },
    { step_number: 5, title: 'Wisuda & Pengabdian Alumni', duration: 'Kelulusan', target_hafalan: 'Alumni Huffazh', description: 'Pengukuhan gelar alumni mahasantri, pengabdian mengajar, dan jejaring karir profesional.', badge_color: 'purple' },
  ];

  const listToDisplay = journeyList && journeyList.length > 0 ? journeyList : defaultJourney;

  return (
    <section id="student-journey" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] text-xs font-black uppercase tracking-wider inline-block mb-3">
            Alur Pendidikan (Student Journey)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-4">
            Peta Perjalanan Hafalan Mahasantri
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Tahapan pendidikan yang dirancang terukur dan realistis untuk mendampingi mahasantri mencapai target 30 Juz Mutqin hingga Wisuda.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2"></div>

          <div className="space-y-8 lg:space-y-12">
            {listToDisplay.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.step_number || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full lg:w-1/2 p-2">
                    <div className="bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-sm relative hover:border-[#D93829]/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#D93829] text-white text-[10px] font-black uppercase tracking-wider">
                          Tahap 0{item.step_number}
                        </span>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-neutral-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <Trophy className="w-4 h-4 text-emerald-600" />
                        <span>Target: {item.target_hafalan}</span>
                      </div>
                    </div>
                  </div>

                  {/* Circle Badge */}
                  <div className="my-4 lg:my-0 lg:mx-auto relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-sm shadow-xl shadow-neutral-900/20 border-4 border-white">
                      0{item.step_number}
                    </div>
                  </div>

                  <div className="hidden lg:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
