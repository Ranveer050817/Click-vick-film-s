import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function Footer() {
  const { settings } = useSupabase();

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <footer className="bg-text-heading text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-serif text-[24px] tracking-[4px] mb-6 uppercase">{settings?.business_name || 'CLICK VICK FILMS'}</h2>
            <p className="text-white/60 font-[300] text-[14px] leading-[1.8] max-w-sm">
              {settings?.hero_description || 'Capturing Emotions, Creating Timeless Memories. We are a luxury wedding photography studio dedicated to documenting your most precious moments with an editorial, elegant, and timeless approach.'}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[2px] uppercase mb-6 text-white/50">Explore</h4>
            <ul className="space-y-4 text-[13px] font-[300]">
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
              <li><a href="#packages" className="hover:text-gold transition-colors">Packages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[2px] uppercase mb-6 text-white/50">Connect</h4>
            <ul className="space-y-4 text-[13px] font-[300]">
              <li>
                <button onClick={handleWhatsApp} className="hover:text-gold transition-colors cursor-pointer">
                  WhatsApp Us
                </button>
              </li>
              {settings?.instagram && (
                <li>
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    Instagram
                  </a>
                </li>
              )}
              {settings?.youtube && (
                <li>
                  <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    YouTube
                  </a>
                </li>
              )}
              <li>
                <button onClick={handleWhatsApp} className="hover:text-gold transition-colors cursor-pointer">
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-[300] text-white/40">
          <p>&copy; {new Date().getFullYear()} {settings?.business_name || 'Click Vick Films'}. All rights reserved.</p>
          <p className="mt-4 md:mt-0 uppercase tracking-[2px] text-[10px]">{settings?.tagline || 'Premium Wedding Photography'}</p>
        </div>
      </div>
    </footer>
  );
}
