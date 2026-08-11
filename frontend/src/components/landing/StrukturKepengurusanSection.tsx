import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Video, UserCheck, Search } from 'lucide-react';

export const StrukturKepengurusanSection: React.FC = () => {
  const [activeDivisionTab, setActiveDivisionTab] = useState<'all' | 'krt' | 'media' | 'psdm'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const ketua = {
    name: 'Leo Pandean',
    role: 'KETUA',
    code: 'LP',
  };

  const bPH = [
    { name: 'Fuad Miftahul Arifin', role: 'SEKRETARIS', code: 'FM' },
    { name: 'Ahmad Ibrahim', role: 'BENDAHARA', code: 'AI' },
  ];

  const divisions = [
    {
      id: 'krt',
      title: 'DIVISI KRT (KeRTan / Keasramaan)',
      icon: Shield,
      coordinator: 'Muhammad Fadlan Mutaqin',
      members: [
        'Rhadika Syahbana Hadi F.J',
        'Mulya Adi Putra',
        'M. Fakthurrahman Farid',
        'Ridho Sulaiman Panjaitan',
        'Farhanul Ibad',
      ],
      color: 'border-[#D93829] text-[#D93829] bg-[#D93829]/5',
    },
    {
      id: 'media',
      title: 'DIVISI MEDIA KREATIF',
      icon: Video,
      coordinator: 'M. Raihan As Syifa Hibatullah',
      members: [
        'Auli Robby Finaldy',
        'Muhammad Saiful Amin',
        'Adreano Hikmawan',
        'Muhammad Galang Islami',
        'Muhammad Rifa Alif Armansyah',
      ],
      color: 'border-emerald-600 text-emerald-700 bg-emerald-50',
    },
    {
      id: 'psdm',
      title: 'DIVISI PSDM',
      icon: UserCheck,
      coordinator: 'Al Fatta Budi Atmaja',
      members: [
        'Aldi Wahyu Purnomo',
        'Gibran Azhari',
        'Ashlih Farhamna Annisar',
        'Ronald Gozali',
        'Muhammad Aprizal Solahuddin',
      ],
      color: 'border-amber-500 text-amber-700 bg-amber-50',
    },
  ];

  const filteredDivisions = activeDivisionTab === 'all'
    ? divisions
    : divisions.filter((d) => d.id === activeDivisionTab);

  return (
    <section id="structure" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D93829]/10 text-[#D93829] font-bold text-xs uppercase tracking-wider mb-3">
            <Users className="w-4 h-4" />
            <span>Struktur Organisasi Offisial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Struktur Kepengurusan <span className="text-[#D93829]">Taruna Juara</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base font-bold text-neutral-500 uppercase tracking-widest">
            Taruna Juara Al-Qur'an Yogyakarta • Periode 2026
          </p>
        </div>

        {/* Search Bar & Division Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-[#FAF6F0] p-3 rounded-2xl border border-neutral-200">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveDivisionTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeDivisionTab === 'all'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Semua Pengurus
            </button>
            <button
              onClick={() => setActiveDivisionTab('krt')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeDivisionTab === 'krt'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Divisi KRT
            </button>
            <button
              onClick={() => setActiveDivisionTab('media')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeDivisionTab === 'media'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Media Kreatif
            </button>
            <button
              onClick={() => setActiveDivisionTab('psdm')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeDivisionTab === 'psdm'
                  ? 'bg-[#D93829] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Divisi PSDM
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama pengurus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-semibold bg-white border border-neutral-200 focus:outline-none focus:border-[#D93829]"
            />
          </div>
        </div>

        {/* Organogram Visual Display (Inspired by Official PDF Design) */}
        {activeDivisionTab === 'all' && searchQuery === '' && (
          <div className="mb-16">
            {/* Top Level: KETUA */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-6 border-2 border-[#D93829] shadow-xl max-w-sm w-full text-center relative group hover:-translate-y-1 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D93829] to-[#EA580C] text-white font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  {ketua.code}
                </div>
                <h3 className="text-xl font-black text-neutral-900">{ketua.name}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-[#D93829] bg-[#D93829]/10 mt-2 uppercase tracking-wider">
                  {ketua.role}
                </span>
              </motion.div>
            </div>

            {/* Tree Branch Connector */}
            <div className="w-0.5 h-8 bg-[#D93829]/40 mx-auto"></div>

            {/* Executive Level: SEKRETARIS & BENDAHARA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              {bPH.map((bph, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-md flex items-center gap-4 hover:border-[#D93829] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center shrink-0">
                    {bph.code}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-neutral-900">{bph.name}</h4>
                    <span className="text-xs font-extrabold text-[#D93829] tracking-wider uppercase">
                      {bph.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-0.5 bg-neutral-200 max-w-4xl mx-auto mb-12"></div>
          </div>
        )}

        {/* Divisions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredDivisions.map((div) => {
            const IconComp = div.icon;

            // Search filtering logic
            const filteredMembers = searchQuery
              ? div.members.filter((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
              : div.members;

            const matchesCoordinator = searchQuery
              ? div.coordinator.toLowerCase().includes(searchQuery.toLowerCase())
              : true;

            if (searchQuery && !matchesCoordinator && filteredMembers.length === 0) {
              return null;
            }

            return (
              <motion.div
                layout
                key={div.id}
                className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xl flex flex-col justify-between hover:border-[#D93829]/40 transition-all"
              >
                <div>
                  {/* Division Header */}
                  <div className={`p-3 rounded-2xl border ${div.color} flex items-center gap-3 mb-6`}>
                    <IconComp className="w-6 h-6 shrink-0" />
                    <h3 className="font-extrabold text-sm tracking-wide">{div.title}</h3>
                  </div>

                  {/* Coordinator / Koordinator */}
                  <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 mb-6">
                    <div className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">
                      Koordinator Divisi
                    </div>
                    <div className="text-base font-black text-neutral-900">
                      {div.coordinator}
                    </div>
                  </div>

                  {/* Anggota List */}
                  <div>
                    <div className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-3 px-1">
                      Anggota Divisi ({filteredMembers.length})
                    </div>
                    <ul className="space-y-2">
                      {filteredMembers.map((member, mIdx) => (
                        <li
                          key={mIdx}
                          className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-[#D93829]/5 px-3 py-2 rounded-xl transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D93829]"></span>
                          <span>{member}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                    Periode 2026
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
