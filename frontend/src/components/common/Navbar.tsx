import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import {
  Menu,
  X,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  User,
  ChevronDown,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onOpenPMBClick: () => void;
  onOpenPortal: (portalType: 'santri' | 'ustadz' | 'alumni' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPMBClick,
  onOpenPortal,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Denah Asrama', href: '#dormitory' },
    { name: 'Visi & Misi', href: '#vision' },
    { name: 'Tata Tertib', href: '#tata-tertib' },
    { name: 'Kegiatan & Program', href: '#activities' },
    { name: 'Struktur Organisasi', href: '#structure' },
    { name: 'Pembina & Ustadz', href: '#mentors' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3 border-b border-neutral-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="group">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-neutral-200/60 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 text-xs font-bold text-neutral-700 hover:text-[#D93829] hover:bg-[#D93829]/5 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          
          {/* 1. ORIGINAL MASUK PORTAL DROPDOWN (TIDAK DIHAPUS) */}
          <div className="relative">
            <button
              onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 shadow-sm transition-all"
            >
              <User className="w-4 h-4 text-[#D93829]" />
              <span>Masuk Portal</span>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isPortalDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isPortalDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 overflow-hidden"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">
                    Pilih Portal Akses Digital
                  </div>
                  <button
                    onClick={() => {
                      onOpenPortal('santri');
                      setIsPortalDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-[#D93829]/10 hover:text-[#D93829] rounded-xl transition-all text-left"
                  >
                    <GraduationCap className="w-4 h-4 text-[#D93829]" />
                    <div>
                      <div className="font-bold">Portal Santri</div>
                      <div className="text-[10px] text-neutral-400 font-normal">Hafalan & Murajaah</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onOpenPortal('ustadz');
                      setIsPortalDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-[#D93829]/10 hover:text-[#D93829] rounded-xl transition-all text-left"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold">Portal Ustadz</div>
                      <div className="text-[10px] text-neutral-400 font-normal">Pembinaan & Halaqah</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onOpenPortal('alumni');
                      setIsPortalDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-[#D93829]/10 hover:text-[#D93829] rounded-xl transition-all text-left"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-bold">Portal Alumni</div>
                      <div className="text-[10px] text-neutral-400 font-normal">Jejaring & Murajaah</div>
                    </div>
                  </button>
                  <div className="border-t border-neutral-100 my-1"></div>
                  <button
                    onClick={() => {
                      onOpenPortal('admin');
                      setIsPortalDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all text-left"
                  >
                    <ShieldCheck className="w-4 h-4 text-neutral-500" />
                    <span className="font-semibold text-xs">Odoo Admin Core</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. USER ACCOUNT PROFILE BADGE (IF LOGGED IN) */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-black text-neutral-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 shadow-sm transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-[#D93829] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="truncate max-w-[90px] text-neutral-900">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-2 bg-neutral-50 rounded-xl mb-1 border border-neutral-100">
                      <div className="text-[9px] font-bold text-neutral-400 uppercase">Akun Aktif:</div>
                      <div className="text-xs font-black text-neutral-900 truncate">{user.name}</div>
                      <div className="text-[9px] font-bold text-[#D93829] uppercase">{user.role}</div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 3. PRIMARY PENDAFTARAN PMB BUTTON */}
          <button
            onClick={onOpenPMBClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#D93829] to-[#EA580C] hover:from-[#c22e20] hover:to-[#d94e09] shadow-md shadow-[#D93829]/25 hover:shadow-lg transition-all"
          >
            <span>Pendaftaran PMB</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={onOpenPMBClick}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#D93829] rounded-xl"
          >
            Pendaftaran PMB
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-[#D93829] rounded-xl bg-neutral-100 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-semibold text-neutral-800 hover:bg-[#D93829]/10 hover:text-[#D93829] rounded-xl"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-2">
                Akses Portal Internal
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenPortal('santri');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 text-left bg-neutral-50 hover:bg-[#D93829]/10 rounded-xl border border-neutral-100"
                >
                  <div className="font-bold text-xs text-[#D93829]">Portal Santri</div>
                  <div className="text-[10px] text-neutral-500">Hafalan & Murajaah</div>
                </button>
                <button
                  onClick={() => {
                    onOpenPortal('ustadz');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 text-left bg-neutral-50 hover:bg-emerald-50 rounded-xl border border-neutral-100"
                >
                  <div className="font-bold text-xs text-emerald-700">Portal Ustadz</div>
                  <div className="text-[10px] text-neutral-500">Halaqah & Evaluasi</div>
                </button>
                <button
                  onClick={() => {
                    onOpenPortal('alumni');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 text-left bg-neutral-50 hover:bg-amber-50 rounded-xl border border-neutral-100"
                >
                  <div className="font-bold text-xs text-amber-600">Portal Alumni</div>
                  <div className="text-[10px] text-neutral-500">Jejaring & Murajaah</div>
                </button>
                <button
                  onClick={() => {
                    onOpenPortal('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-3 text-left bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-100"
                >
                  <div className="font-bold text-xs text-neutral-700">Odoo Core</div>
                  <div className="text-[10px] text-neutral-500">System Admin</div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
