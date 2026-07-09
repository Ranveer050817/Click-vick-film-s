import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function Services() {
  const { services, settings } = useSupabase();

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-ivory-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <p className="font-serif italic text-[18px] text-gold mb-[10px]">
            What We Do
          </p>
          <h2 className="font-serif text-[48px] text-text-heading font-[300] leading-[1.1]">
            Premium Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-white p-6 md:p-8 flex flex-col hover:shadow-xl transition-shadow duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden mb-8 relative">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="font-serif text-[28px] font-[300] text-text-heading mb-4">{service.title}</h3>
              <p className="text-[14px] leading-[1.8] font-[300] text-text-main/70 mb-8 flex-grow">
                {service.description}
              </p>
              <button
                onClick={handleWhatsApp}
                className="self-start text-[11px] tracking-[2px] uppercase font-medium text-text-heading border-b border-text-heading pb-1 hover:text-gold hover:border-gold transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
