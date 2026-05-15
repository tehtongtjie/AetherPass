/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { 
  Home, 
  LayoutDashboard, 
  Ticket, 
  MapPin, 
  Award,
  Menu,
  X
} from 'lucide-react';

import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import DigitalTicket from './components/DigitalTicket';
import SeatPicker from './components/SeatPicker';
import BadgeSystem from './components/BadgeSystem';

type View = 'hero' | 'dashboard' | 'ticket' | 'seats' | 'badges';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('hero');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const navItems: { id: View; label: string; icon: any }[] = [
    { id: 'hero', label: 'Beranda', icon: Home },
    { id: 'dashboard', label: 'Analisis', icon: LayoutDashboard },
    { id: 'ticket', label: 'Tiket', icon: Ticket },
    { id: 'seats', label: 'Pilih Kursi', icon: MapPin },
    { id: 'badges', label: 'Lencana', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] font-sans selection:bg-brand-violet selection:text-white">
      {/* Persisted Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-brand-violet/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-brand-teal/5 blur-[150px] rounded-full" />
      </div>

      {/* Main Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-20 px-6 md:px-12 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-violet to-brand-teal flex items-center justify-center shadow-lg shadow-brand-violet/20">
            <span className="font-black text-xs text-white">A</span>
          </div>
          <span className="font-black text-xl tracking-tighter text-white">AetherPass</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all",
                currentView === item.id 
                  ? "text-brand-violet" 
                  : "text-white/40 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              const btn = document.activeElement as HTMLButtonElement;
              if (btn) {
                const originalText = btn.innerText;
                btn.innerText = 'Memproses...';
                btn.disabled = true;
                setTimeout(() => {
                  btn.innerText = 'Berhasil!';
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                  }, 1000);
                }, 1000);
              }
            }}
            className="hidden sm:block px-6 py-2 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-50"
          >
            Masuk
          </button>
          <button 
            className="md:hidden p-2 text-white/70"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 md:hidden"
            >
              <div className="bg-[#111118]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsMobileNavOpen(false);
                    }}
                    className={cn(
                      "w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all flex items-center space-x-4",
                      currentView === item.id 
                        ? "bg-brand-violet/20 text-brand-violet border border-brand-violet/20" 
                        : "text-white/40 hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label} Section</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* View Content */}
      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="w-full"
          >
            {currentView === 'hero' && <Hero onNavigate={setCurrentView} />}
            {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
            {currentView === 'ticket' && <DigitalTicket />}
            {currentView === 'seats' && <SeatPicker onNavigate={setCurrentView} />}
            {currentView === 'badges' && <BadgeSystem onNavigate={setCurrentView} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Info */}
      <footer className="py-12 px-6 border-t border-white/5 text-center bg-[#0A0A0F] relative z-10">
        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em] mb-4">AetherPass Experience • 2026</p>
        <div className="flex justify-center space-x-8">
          {['Privacy', 'Terms', 'Support'].map(f => (
            <button key={f} className="text-xs text-white/40 hover:text-white transition-colors">{f}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

