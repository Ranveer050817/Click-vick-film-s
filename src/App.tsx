/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Packages from './components/Packages';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { SupabaseProvider, useSupabase } from './context/SupabaseContext';

function AppContent() {
  const { loading, error } = useSupabase();

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-serif italic text-gold text-xl">Loading Experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <p className="font-serif italic text-red-500 text-xl mb-4">Connection Error</p>
          <p className="text-text-main font-light mb-6">{error}</p>
          <p className="text-sm text-text-main/60 uppercase tracking-widest">Please configure Supabase credentials and tables to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-text-main font-sans selection:bg-gold/30 selection:text-text-heading">
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Portfolio />
        <Services />
        <Packages />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <AppContent />
    </SupabaseProvider>
  );
}
