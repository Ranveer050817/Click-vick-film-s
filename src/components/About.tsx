import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden bg-ivory-dark">
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2940&auto=format&fit=crop"
                alt="Elegant Indian Bride"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-gold hidden md:block"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-gold tracking-[0.2em] text-sm font-medium mb-4 uppercase">
              The Art of Visual Storytelling
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-text-heading mb-8 leading-snug">
              Defining Luxury in <br />
              <span className="italic">Wedding Photography</span>
            </h2>
            
            <div className="space-y-6 text-[14px] leading-[1.8] font-[300] text-text-main/80 mb-[40px]">
              <p>
                At Click Vick Films, we don't just take photographs; we craft editorial masterpieces. 
                With a deep appreciation for authentic emotion and exquisite detail, our approach is rooted in luxury, elegance, and timelessness.
              </p>
              <p>
                Every wedding is a unique piece of art. Our team blends into your celebration seamlessly, capturing the unseen glances, the grand gestures, and the quiet moments in between, ensuring your memories are preserved with the grace they deserve.
              </p>
            </div>

            <div>
              <button
                onClick={openWhatsApp}
                className="bg-gold hover:bg-gold-dark text-white px-[28px] py-[12px] text-[11px] uppercase tracking-[2px] font-medium transition-all duration-300"
              >
                DISCOVER OUR STYLE
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
