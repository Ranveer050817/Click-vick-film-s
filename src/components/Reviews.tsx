import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useSupabase } from '../context/SupabaseContext';

export default function Reviews() {
  const { reviews } = useSupabase();

  return (
    <section id="reviews" className="py-24 md:py-32 bg-ivory-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <p className="font-serif italic text-[18px] text-gold mb-[10px]">
            Client Stories
          </p>
          <h2 className="font-serif text-[48px] text-text-heading font-[300] leading-[1.1]">
            Words of Love
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-ivory p-10 border border-border-light relative"
            >
              <Quote className="absolute top-8 right-8 text-gold/20" size={48} />
              <div className="mb-8 pt-4">
                <p className="text-[14px] leading-[1.8] font-[300] text-text-main/80 italic">
                  "{review.text}"
                </p>
              </div>
              <div className="border-t border-border-light pt-6">
                <h4 className="font-serif text-[24px] font-[300] text-text-heading mb-1">{review.name}</h4>
                <p className="text-[10px] tracking-[1.5px] text-text-main/50 uppercase">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
