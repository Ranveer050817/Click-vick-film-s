import { Phone, Instagram } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { useSupabase } from '../context/SupabaseContext';

export default function FloatingActions() {
  const { settings } = useSupabase();

  const handleWhatsApp = () => {
    openWhatsApp(settings?.whatsapp || '');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp / Chat Bubble */}
      {settings?.whatsapp && (
        <button
          onClick={handleWhatsApp}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span className="absolute right-16 bg-white text-text-heading text-xs tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            Enquire on WhatsApp
          </span>
        </button>
      )}

      {/* Call Bubble */}
      {settings?.phone && (
        <a
          href={`tel:${settings.phone}`}
          className="w-14 h-14 bg-text-heading text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
          aria-label="Call Us"
        >
          <Phone size={24} />
          <span className="absolute right-16 bg-white text-text-heading text-xs tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            Call Now
          </span>
        </a>
      )}

      {/* Instagram Bubble */}
      {settings?.instagram && (
        <a
          href={settings.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
          aria-label="Follow on Instagram"
        >
          <Instagram size={24} />
          <span className="absolute right-16 bg-white text-text-heading text-xs tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            View Instagram
          </span>
        </a>
      )}
    </div>
  );
}
