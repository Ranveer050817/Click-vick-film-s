import React, { useState } from 'react';
import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';
import { Phone, Instagram, Mail, MapPin, ChevronDown, Youtube } from 'lucide-react';
import { useSupabase } from '../context/SupabaseContext';

export default function Contact() {
  const { settings, categories } = useSupabase();
  const [formData, setFormData] = useState({
    name: '',
    occasion: '',
    eventDate: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(settings?.whatsapp || '', {
      name: formData.name,
      eventType: formData.occasion,
      eventDate: formData.eventDate,
      location: formData.location
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <div>
            <p className="font-serif italic text-[18px] text-gold mb-[10px]">
              Get in Touch
            </p>
            <h2 className="font-serif text-[48px] text-text-heading font-[300] mb-8 leading-[1.1]">
              Let's Create Magic
            </h2>
            <p className="text-[14px] leading-[1.8] font-[300] text-text-main/70 mb-12">
              We would be honored to be a part of your celebration. Reach out to us to discuss your vision, check availability, and request a detailed proposal.
            </p>

            <div className="space-y-8">
              {settings?.phone && (
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[1.5px] uppercase text-text-main/50 mb-1">Phone & WhatsApp</h4>
                    <a href={`tel:${settings.phone}`} className="font-serif text-[24px] font-[300] text-text-heading hover:text-gold transition-colors block">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings?.instagram && (
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Instagram size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[1.5px] uppercase text-text-main/50 mb-1">Instagram</h4>
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="font-serif text-[24px] font-[300] text-text-heading hover:text-gold transition-colors block">
                      @theclickvickfilmsstudio
                    </a>
                  </div>
                </div>
              )}

              {settings?.youtube && (
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Youtube size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[1.5px] uppercase text-text-main/50 mb-1">YouTube</h4>
                    <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="font-serif text-[24px] font-[300] text-text-heading hover:text-gold transition-colors block">
                      Click Vick Films
                    </a>
                  </div>
                </div>
              )}

              {settings?.email && (
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <Mail size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[1.5px] uppercase text-text-main/50 mb-1">Email</h4>
                    <a href={`mailto:${settings.email}`} className="font-serif text-[24px] font-[300] text-text-heading hover:text-gold transition-colors block">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}
              
              {settings?.address && (
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-ivory rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <MapPin size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[10px] tracking-[1.5px] uppercase text-text-main/50 mb-1">Studio</h4>
                    <address className="font-serif text-[24px] font-[300] text-text-heading not-italic">
                      {settings.address}
                    </address>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enquiry Form Concept (Opens WhatsApp) */}
          <div className="bg-ivory p-10 md:p-14 border border-border-light">
            <h3 className="font-serif text-[32px] font-[300] text-text-heading mb-8">Direct Enquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-text-main/60 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light pb-2 focus:outline-none focus:border-gold transition-colors text-[14px] text-text-heading"
                  placeholder="Your Full Name"
                />
              </div>
              <div className="relative">
                <label className="block text-[10px] tracking-[1.5px] uppercase text-text-main/60 mb-2">Occasion</label>
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light pb-2 focus:outline-none focus:border-gold transition-colors text-[14px] text-text-heading appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-text-main/50">Select Event Type</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name} className="text-text-main">{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-0 bottom-3 text-text-main/50 pointer-events-none" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-text-main/60 mb-2">Event Date</label>
                <input 
                  type="date" 
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light pb-2 focus:outline-none focus:border-gold transition-colors text-[14px] text-text-heading uppercase"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-text-main/60 mb-2">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border-light pb-2 focus:outline-none focus:border-gold transition-colors text-[14px] text-text-heading"
                  placeholder="City, Venue"
                />
              </div>
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-white py-[12px] px-[28px] text-[11px] uppercase tracking-[2px] font-medium transition-colors cursor-pointer"
                >
                  SEND ENQUIRY
                </button>
                <p className="text-center text-[10px] text-text-main/40 mt-4 italic">
                  * This will seamlessly open WhatsApp to continue the conversation.
                </p>
              </div>
            </form>
          </div>

        </div>

        {/* Map Placeholder */}
        <div className="mt-24 h-96 bg-ivory-dark w-full relative flex items-center justify-center overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop" 
            alt="Studio Location Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white px-8 py-4 flex items-center gap-3 shadow-2xl">
              <MapPin size={20} className="text-gold" />
              <span className="text-sm tracking-widest uppercase font-medium">Studio Location</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
