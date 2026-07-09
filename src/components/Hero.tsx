import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function Hero() {
  const { settings } = useSupabase();

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <section id="home" className="flex flex-col lg:flex-row min-h-screen pt-[80px] border-b border-border-light bg-ivory">
      {/* Content */}
      <div className="flex-1 px-6 py-20 lg:p-[60px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-light">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif italic text-[18px] text-gold mb-[10px]"
        >
          {settings?.tagline || 'The Art of Marriage'}
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-[82px] leading-[0.9] text-text-heading mb-[24px] font-[300]"
          dangerouslySetInnerHTML={{ __html: settings?.hero_heading || 'Capturing<br />Emotions.' }}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[14px] leading-[1.8] text-text-main max-w-[400px] mb-[40px] font-[300]"
        >
          {settings?.hero_description || 'Experience the pinnacle of luxury wedding cinematography. We transform fleeting moments into timeless heirlooms for the world\'s most discerning couples.'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-[15px]"
        >
          <button
            onClick={handleWhatsApp}
            className="bg-gold hover:bg-gold-dark text-white px-[28px] py-[12px] text-[11px] uppercase tracking-[2px] font-medium transition-all duration-300 cursor-pointer"
          >
            Book Your Shoot
          </button>
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-white px-[28px] py-[12px] text-[11px] uppercase tracking-[2px] font-medium transition-all duration-300 cursor-pointer"
          >
            View Portfolio
          </button>
        </motion.div>
      </div>

      {/* Visual */}
      <div className="flex-1 relative bg-[#EAE4D9] overflow-hidden min-h-[50vh] lg:min-h-auto">
        <img
          src={settings?.hero_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1024'}
          alt="Luxury Wedding"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-0 left-0 right-0 p-[30px] bg-gradient-to-t from-black/40 to-transparent flex flex-wrap gap-[15px]">
          <span className="text-white text-[10px] uppercase tracking-[1px] border border-white/40 px-[12px] py-[4px] rounded-full">Wedding</span>
          <span className="text-white text-[10px] uppercase tracking-[1px] border border-white/40 px-[12px] py-[4px] rounded-full">Pre-Wedding</span>
          <span className="text-white text-[10px] uppercase tracking-[1px] border border-white/40 px-[12px] py-[4px] rounded-full">Candid</span>
        </div>
      </div>
    </section>
  );
}
