import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function Portfolio() {
  const { categories, galleryImages, settings } = useSupabase();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length > 0 && activeCategoryId === null) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const filteredPortfolio = galleryImages
    .filter(item => item.category_id === activeCategoryId);

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif italic text-[18px] text-gold mb-[10px]">
            Curated Galleries
          </p>
          <h2 className="font-serif text-[48px] text-text-heading font-[300] mb-12 leading-[1.1]">
            The Portfolio
          </h2>
        </motion.div>

        {/* Categories (Horizontal Scrollable on small screens) */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 justify-start md:justify-center mb-16 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`whitespace-nowrap text-sm tracking-widest transition-all duration-300 pb-2 border-b-2 ${
                activeCategoryId === cat.id 
                  ? 'border-gold text-gold font-medium' 
                  : 'border-transparent text-text-main/60 hover:text-text-main'
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredPortfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[3/4] overflow-hidden bg-ivory cursor-pointer border border-border-light"
                onClick={handleWhatsApp}
              >
                <img
                  src={item.image_url}
                  alt={item.title || "Gallery Image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-5 left-5 text-white z-10">
                  <p className="text-[10px] uppercase tracking-[2px] opacity-80">{item.title}</p>
                  <h4 className="font-serif text-[24px] font-[300]">View Gallery</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredPortfolio.length === 0 && (
          <div className="py-20 text-text-main/50 tracking-widest text-sm uppercase">
            More images coming soon
          </div>
        )}

      </div>
    </section>
  );
}
