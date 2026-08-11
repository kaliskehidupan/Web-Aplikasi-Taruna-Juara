import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Instagram, Youtube, Facebook, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand & Vision */}
          <div className="md:col-span-5">
            <div className="bg-white p-3 rounded-2xl inline-block mb-4">
              <Logo size="md" />
            </div>
            <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-sm mb-6">
              Platform digital modern untuk mengelola, membina, dan memvisualisasikan seluruh perjalanan hafalan Al-Qur'an mahasantri di Rumah Tahfidz Taruna Juara Al-Qur'an Yogyakarta.
            </p>
            <div className="flex items-center space-x-3 text-neutral-400">
              <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-[#D93829] hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-[#D93829] hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-[#D93829] hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Navigasi Utama
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-neutral-400">
              <li><a href="#hero" className="hover:text-[#D93829] transition-colors">Beranda Utama</a></li>
              <li><a href="#vision" className="hover:text-[#D93829] transition-colors">Visi & Misi</a></li>
              <li><a href="#activities" className="hover:text-[#D93829] transition-colors">Kegiatan & Program</a></li>
              <li><a href="#structure" className="hover:text-[#D93829] transition-colors">Struktur Kepengurusan 2026</a></li>
              <li><a href="#journey" className="hover:text-[#D93829] transition-colors">Alur Perjalanan Mahasantri</a></li>
            </ul>
          </div>

          {/* Contact & Location Info */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Sekretariat & Asrama
            </h4>
            <ul className="space-y-3 text-xs font-medium text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D93829] shrink-0 mt-0.5" />
                <span>Rumah Tahfidz Taruna Juara Al-Qur'an, Daerah Istimewa Yogyakarta, Indonesia.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D93829] shrink-0" />
                <span>+62 812-3456-7890 (Sekretariat PMB)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D93829] shrink-0" />
                <span>info@tarunajuara.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-medium">
          <div>
            © 2026 Rumah Tahfidz Taruna Juara Al-Qur'an Yogyakarta. Hak Cipta Dilindungi.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-1">
            <span>Built with passion & precision for Huffazh Al-Qur'an</span>
            <Heart className="w-3.5 h-3.5 text-[#D93829] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
