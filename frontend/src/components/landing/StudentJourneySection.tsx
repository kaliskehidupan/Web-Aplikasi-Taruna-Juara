import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, BookOpen, Award, GraduationCap, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const StudentJourneySection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: "Pendaftaran PMB Online",
      description: "Mendaftar secara online via platform digital, mengisi berkas administrasi dan memilih jalur beasiswa.",
      icon: UserPlus,
      color: "bg-[#D93829] text-white",
    },
    {
      number: '02',
      title: "Seleksi & Masa Ta'aruf",
      description: "Tes bacaan Al-Qur'an (Tahsin), wawancara komitmen hafalan, serta pengenalan budaya asrama Taruna Juara.",
      icon: BookOpen,
      color: "bg-amber-600 text-white",
    },
    {
      number: '03',
      title: "Proses Pembinaan Tahfidz & Asrama",
      description: "Menjalani setoran ziadah harian, murajaah, pembinaan karakter (KRT), media da'wah, dan organisasi (PSDM).",
      icon: Award,
      color: "bg-emerald-600 text-white",
    },
    {
      number: '04',
      title: "Ujian Tasmi' 30 Juz Bil Ghaib",
      description: "Ujian penyelesaian hafalan 30 Juz sekali duduk di hadapan penguji majelis tahfidz.",
      icon: GraduationCap,
      color: "bg-sky-600 text-white",
    },
    {
      number: '05',
      title: "Alumni & Continuous Nurturing",
      description: "Resmi menjadi Alumni Taruna Juara, menjaga hafalan via Portal Alumni, dan berjejaring karir.",
      icon: HeartHandshake,
      color: "bg-neutral-900 text-white",
    },
  ];

  return (
    <section id="journey" className="py-24 bg-[#FAF6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Alur Perjalanan Mahasantri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Perjalanan Dari <span className="text-[#D93829]">PMB Hingga Alumni</span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-medium">
            Tahapan sistematis yang mengawal setiap mahasantri mencapai target hafalan 30 Juz Mutqin dan karakter berdaya saing.
          </p>
        </div>

        {/* Timeline Horizontal / Responsive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-lg flex flex-col justify-between relative group hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-neutral-300 group-hover:text-[#D93829] transition-colors">
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center shadow-md`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-neutral-900 mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Terstruktur</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
