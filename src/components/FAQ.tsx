import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Do you travel for destination weddings?",
    a: "Absolutely. We are available for destination weddings worldwide. Whether it's a royal palace in Rajasthan or a scenic villa in Tuscany, our team is equipped to travel and capture your story anywhere."
  },
  {
    q: "How far in advance should we book?",
    a: "To ensure availability, especially during peak wedding seasons, we recommend booking our services 6 to 9 months in advance."
  },
  {
    q: "What is your photography style?",
    a: "Our signature style is a blend of editorial luxury and authentic candid storytelling. We focus on capturing genuine emotions, fine details, and creating a timeless, cinematic aesthetic."
  },
  {
    q: "When will we receive our photos and films?",
    a: "We provide a curated set of preview images within 48 hours of the event. The complete gallery and cinematic films are meticulously edited and delivered within 8 to 10 weeks."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-[48px] text-text-heading font-[300] mb-6 leading-[1.1]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-border-light pb-4"
            >
              <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-serif text-[24px] font-[300] text-text-heading pr-8">{faq.q}</span>
                <span className="text-gold flex-shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[14px] leading-[1.8] font-[300] text-text-main/70">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
