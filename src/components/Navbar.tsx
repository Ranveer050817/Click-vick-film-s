import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSupabase();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PACKAGES', href: '#packages' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center justify-between px-6 md:px-[60px] border-b border-border-light bg-ivory/90 backdrop-blur-[10px] transition-all duration-300`}
    >
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center z-50">
          <img src="https://oyddyqlqsxquzcbikpez.supabase.co/storage/v1/object/public/gallery/CVFLOGO.jpg" alt={settings?.business_name || 'CLICK VICK FILMS'} className="h-[78px] md:h-[98px] object-contain" fetchPriority="high" loading="eager" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-[30px]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[1.5px] text-text-main hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <button
            onClick={handleWhatsApp}
            className="bg-gold hover:bg-gold-dark text-white px-[28px] py-[12px] text-[11px] font-medium uppercase tracking-[2px] transition-all duration-300 cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 text-text-heading cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        <div
          className={`fixed inset-0 bg-ivory z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out lg:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[1.5px] text-text-main hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              handleWhatsApp();
              setIsMenuOpen(false);
            }}
            className="bg-gold hover:bg-gold-dark text-white px-[28px] py-[12px] text-[11px] font-medium uppercase tracking-[2px] mt-8 cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
