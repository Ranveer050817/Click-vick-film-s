import { motion } from 'motion/react';

export default function StatsStrip() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border-light">
      <div className="flex flex-col items-center justify-center py-[30px] border-r border-b md:border-b-0 border-border-light">
        <span className="font-serif text-[32px] text-gold">500+</span>
        <span className="text-[10px] uppercase tracking-[1px] text-text-main/60 mt-1">Weddings Shot</span>
      </div>
      <div className="flex flex-col items-center justify-center py-[30px] border-r border-b md:border-b-0 border-border-light">
        <span className="font-serif text-[32px] text-gold">12</span>
        <span className="text-[10px] uppercase tracking-[1px] text-text-main/60 mt-1">Global Awards</span>
      </div>
      <div className="flex flex-col items-center justify-center py-[30px] border-r border-border-light">
        <span className="font-serif text-[32px] text-gold">15+</span>
        <span className="text-[10px] uppercase tracking-[1px] text-text-main/60 mt-1">Countries</span>
      </div>
      <div className="flex flex-col items-center justify-center py-[30px]">
        <span className="font-serif text-[32px] text-gold">Elite</span>
        <span className="text-[10px] uppercase tracking-[1px] text-text-main/60 mt-1">Experience</span>
      </div>
    </section>
  );
}
