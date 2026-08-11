import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, UserCheck, Sparkles, RotateCw, UserPlus, Award, Quote, Camera, CheckCircle2 } from 'lucide-react';

export interface Resident {
  id: string;
  name: string;
  nickname?: string;
  university: string;
  universityBadge: string;
  faculty: string;
  major: string;
  majorBadge: string;
  semester: number;
  originCity: string;
  entryYear: number;
  currentJuz: number;
  targetJuzThisYear: number;
  ustadzName: string;
  quote: string;
  photoPlaceholder: string;
  photoUrl?: string;
}

export interface RoomData {
  id: string;
  code: string; // e.g. "Kamar A1", "Kamar A2"
  floor: number;
  capacity: number; // e.g. 2
  occupied: number; // e.g. 1
  residents: Resident[];
}

interface KamarDetailModalProps {
  room: RoomData | null;
  onClose: () => void;
  onOpenPMB: () => void;
}

export const KamarDetailModal: React.FC<KamarDetailModalProps> = ({ room, onClose, onOpenPMB }) => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  if (!room) return null;

  const isFull = room.occupied >= room.capacity;
  const availableSlots = room.capacity - room.occupied;

  const toggleFlip = (id: string) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 relative my-8 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D93829] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#D93829]/20">
              {room.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-neutral-900">{room.code}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    isFull
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {isFull ? '🟢 Terisi Full (2/2)' : `🔴 Tersedia ${availableSlots} Slot (${room.occupied}/${room.capacity})`}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                Lantai {room.floor} • Asrama Mahasantri Taruna Juara Yogyakarta
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 font-bold transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tip Instruction */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FAF6F0] to-amber-50 p-3.5 rounded-2xl border border-amber-200/80 mb-6 text-xs text-neutral-700 font-semibold">
          <div className="flex items-center gap-2.5">
            <RotateCw className="w-4 h-4 text-[#D93829] shrink-0 animate-spin-slow" />
            <span>Petunjuk: <strong>Klik pada kartu mahasantri</strong> untuk membalik kartu (Flip) dan melihat <strong>Foto Orangnya (Gambar Profil)</strong>!</span>
          </div>
          <span className="hidden sm:inline-flex px-2.5 py-1 bg-[#D93829] text-white text-[10px] font-black rounded-lg uppercase tracking-wider">
            Interaktif Flip 🔄
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Render Existing Residents */}
          {room.residents.map((resident) => {
            const isFlipped = flippedCardId === resident.id;

            return (
              <div
                key={resident.id}
                onClick={() => toggleFlip(resident.id)}
                className="perspective-1000 cursor-pointer min-h-[440px] group"
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative preserve-3d"
                >
                  {/* FRONT SIDE (Ringkasan Profil & Status) */}
                  <div className="absolute inset-0 backface-hidden bg-white p-6 rounded-3xl border-2 border-neutral-200/90 shadow-xl group-hover:border-[#D93829] transition-colors flex flex-col justify-between">
                    <div>
                      {/* Top Header & Flip Prompt */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D93829] bg-[#D93829]/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Mahasantri Aktif
                        </span>
                        <span className="text-xs text-[#D93829] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5 font-bold shadow-sm group-hover:scale-105 transition-transform">
                          <Camera className="w-3.5 h-3.5" /> <span>Lihat Foto 🔄</span>
                        </span>
                      </div>

                      {/* Photo Thumbnail & Identity */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D93829] shadow-md shrink-0 bg-neutral-900">
                          {resident.photoUrl ? (
                            <img
                              src={resident.photoUrl}
                              alt={resident.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-neutral-800 to-neutral-700 text-amber-300 font-extrabold flex items-center justify-center text-xs text-center p-1">
                              {resident.photoPlaceholder}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-neutral-900 leading-tight">
                            {resident.name}
                          </h4>
                          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                            {resident.faculty}
                          </p>
                        </div>
                      </div>

                      {/* Badges Info */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="px-3 py-1 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-extrabold border border-neutral-200">
                          {resident.universityBadge}
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200">
                          {resident.majorBadge}
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-sky-50 text-sky-800 text-xs font-extrabold border border-sky-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {resident.originCity}
                        </span>
                      </div>

                      {/* Visual Progress Hafalan */}
                      <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-neutral-200/80 mb-3">
                        <div className="flex items-center justify-between text-xs font-bold text-neutral-700 mb-1.5">
                          <span>Progress Hafalan Saat Ini</span>
                          <span className="text-[#D93829] font-black">{resident.currentJuz} / 30 Juz</span>
                        </div>
                        {/* Progress Bar Visual */}
                        <div className="w-full bg-neutral-200 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#D93829] to-amber-500 h-full rounded-full"
                            style={{ width: `${(resident.currentJuz / 30) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 text-center text-xs font-extrabold text-[#D93829] flex items-center justify-center gap-2">
                      <Camera className="w-4 h-4" />
                      <span>Klik kartu ini untuk FLIP ke Foto Orangnya →</span>
                    </div>
                  </div>

                  {/* BACK SIDE (Tampilan GAMBAR ORANGNYA / Foto Profil Mahasantri) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-neutral-900 text-white rounded-3xl border-2 border-amber-500/40 shadow-2xl overflow-hidden flex flex-col justify-between relative">
                    {/* Background Full Photo / Portrait Image Frame */}
                    <div className="absolute inset-0 z-0">
                      {resident.photoUrl ? (
                        <img
                          src={resident.photoUrl}
                          alt={`Foto ${resident.name}`}
                          className="w-full h-full object-cover object-top filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-[#D93829]/40 flex items-center justify-center">
                          <span className="text-xl font-black text-amber-300 uppercase tracking-widest">{resident.photoPlaceholder}</span>
                        </div>
                      )}
                      {/* Gradient Overlay for Readable Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-900/30"></div>
                    </div>

                    {/* Content Overlay on Photo */}
                    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                      {/* Top Bar inside Back Card */}
                      <div className="flex items-center justify-between border-b border-white/20 pb-3 bg-neutral-900/40 backdrop-blur-sm rounded-xl px-3 -mx-1">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-[#D93829]" /> Foto Mahasantri Taruna Juara
                        </span>
                        <span className="text-[11px] text-white/90 bg-[#D93829] px-2.5 py-0.5 rounded-lg flex items-center gap-1 font-bold">
                          <RotateCw className="w-3 h-3" /> Flip Back
                        </span>
                      </div>

                      {/* Main Profile Info overlaid on Photo */}
                      <div className="mt-auto space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 bg-amber-400 text-neutral-950 rounded-md text-[10px] font-black uppercase tracking-wider">
                              {resident.universityBadge}
                            </span>
                            <span className="px-2.5 py-0.5 bg-white/20 text-white backdrop-blur-md rounded-md text-[10px] font-bold">
                              {resident.majorBadge}
                            </span>
                          </div>
                          <h4 className="text-xl font-black text-white drop-shadow-md leading-tight">
                            {resident.name} {resident.nickname && `(${resident.nickname})`}
                          </h4>
                          <p className="text-xs text-neutral-300 font-medium flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#D93829]" /> Asal: {resident.originCity} • Angkatan {resident.entryYear}
                          </p>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="bg-neutral-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
                            <div className="text-neutral-400 text-[9px] font-bold">Pembina Halaqah</div>
                            <div className="font-extrabold text-emerald-400 flex items-center gap-1 truncate">
                              <UserCheck className="w-3 h-3 shrink-0" /> {resident.ustadzName}
                            </div>
                          </div>

                          <div className="bg-neutral-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
                            <div className="text-neutral-400 text-[9px] font-bold">Target Hafalan</div>
                            <div className="font-extrabold text-amber-300 flex items-center gap-1">
                              <Award className="w-3 h-3 text-amber-400 shrink-0" /> Juz {resident.targetJuzThisYear}
                            </div>
                          </div>
                        </div>

                        {/* Quote / Bio */}
                        <div className="bg-neutral-900/90 backdrop-blur-md p-3 rounded-xl border border-white/15 text-xs">
                          <div className="flex items-center gap-1 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider mb-0.5">
                            <Quote className="w-3 h-3 text-[#D93829]" /> Kutipan / Motto
                          </div>
                          <p className="text-neutral-200 italic font-medium leading-snug line-clamp-2">
                            "{resident.quote}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom Prompt */}
                      <div className="pt-2 mt-2 border-t border-white/15 text-center text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        <span>Klik kartu untuk membalik kembali ke info ringkas</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Render Promotional Card for Available Empty Slot */}
          {Array.from({ length: availableSlots }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="bg-gradient-to-br from-[#FAF6F0] to-orange-50 rounded-3xl p-6 border-2 border-dashed border-[#D93829]/40 shadow-md flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[440px]"
            >
              <div className="my-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#D93829]/10 text-[#D93829] flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-7 h-7" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-[#D93829] bg-[#D93829]/10 uppercase tracking-wider mb-2">
                  Slot Tersedia di {room.code}
                </span>
                <h4 className="text-xl font-black text-neutral-900 mb-2">
                  Tempat Ini Menunggu Anda!
                </h4>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed max-w-xs mx-auto mb-6">
                  Rumah Tahfidz Taruna Juara sedang menerima mahasantri baru. Dapatkan beasiswa full nurturing & hunian asrama nyaman.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenPMB();
                }}
                className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white bg-neutral-900 hover:bg-[#D93829] shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Daftar PMB Sekarang</span>
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

