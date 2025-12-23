import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Menu, X, Search, PlusCircle } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '팀 탐색', path: '/explore', icon: <Search size={18} /> },
    { name: '팀 만들기', path: '/teams/new', icon: <PlusCircle size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-white/10 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* 로고 */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-105">
            <Rocket size={20} className="text-white" />
          </div> */}
          {/* <span className="text-xl  font-jua  text-blue-500 tracking-tighter">
            우주매치
          </span> */}
          <img src="/logo.svg" alt="logo" width={100} height={40} />
        </div>

        {/* 중앙 메뉴 */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`relative text-sm font-bold tracking-tight transition-colors ${
                location.pathname === link.path
                  ? 'text-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="header-active"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                />
              )}
            </button>
          ))}
        </nav>

        {/* 우측 로그인/회원가입 */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            로그인
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-black hover:bg-blue-400 transition-all active:scale-95 shadow-lg"
          >
            회원가입
          </button>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 text-slate-300 font-bold"
              >
                {link.icon} {link.name}
              </button>
            ))}
            <div className="h-px bg-white/5 my-2" />
            <button
              onClick={() => navigate('/login')}
              className="p-4 text-center text-slate-400 font-bold"
            >
              로그인
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
