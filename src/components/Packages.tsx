import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function Packages() {
  const { packages, settings } = useSupabase();

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <section id="packages" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
          <p className="font-serif italic text-[18px] text-gold mb-[10px]">
            Investment
          </p>
          <h2 className="font-serif text-[48px] text-text-heading font-[300] mb-6 leading-[1.1]">
            Curated Packages
          </h2>
          <p className="text-[14px] leading-[1.8] font-[300] text-text-main/70 max-w-2xl mx-auto">
            Every celebration is unique. Our packages are designed to provide a comprehensive luxury experience, tailored to your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-white p-10 md:p-12 border ${
                pkg.is_popular ? 'border-gold shadow-2xl scale-100 lg:scale-105 z-10' : 'border-border-light shadow-lg'
              }`}
            >
              {pkg.is_popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white text-[10px] tracking-[1.5px] font-medium uppercase px-6 py-2">
                  Most Requested
                </div>
              )}
              
              <div className="text-center mb-8 border-b border-border-light pb-8">
                <h3 className="font-serif text-[32px] font-[300] text-text-heading mb-2">{pkg.name}</h3>
                <p className="text-[10px] tracking-[1.5px] text-text-main/60 uppercase mb-6">{pkg.subtitle}</p>
                <p className="font-serif text-[28px] text-gold">{pkg.price}</p>
                {pkg.price !== "Custom" && <p className="text-[11px] text-text-main/50 mt-1">Starting from</p>}
              </div>

              <ul className="space-y-4 mb-12">
                {pkg.features?.map((feature, i) => (
                  <li key={i} className="flex items-center text-[13px] font-[300] text-text-main/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mr-4"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleWhatsApp}
                className={`w-full py-[12px] px-[28px] text-[11px] uppercase tracking-[2px] font-medium transition-all duration-300 cursor-pointer ${
                  pkg.is_popular 
                    ? 'bg-gold hover:bg-gold-dark text-white' 
                    : 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-white'
                }`}
              >
                REQUEST QUOTE
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
