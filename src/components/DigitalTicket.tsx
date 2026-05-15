'use client';

import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Calendar, MapPin, User, Star, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface TicketProps {
  eventName?: string;
  date?: string;
  venue?: string;
  attendeeName?: string;
  seat?: string;
  tier?: 'VIP' | 'General';
  status?: 'Valid' | 'Checked In';
  ticketId?: string;
}

export default function DigitalTicket({
  eventName = "TechNexus Summit 2026",
  date = "Oct 24 • 10:00 AM",
  venue = "Modern Arts Pavilion, NY",
  attendeeName = "Alex Thorne",
  seat = "Row A • Seat 12",
  tier = "VIP",
  status: initialStatus = "Valid",
  ticketId = "AE-2026-X94"
}: TicketProps) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className="flex flex-col items-center space-y-12 py-20 px-4 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black bg-gradient-to-r from-brand-violet to-brand-teal bg-clip-text text-transparent uppercase tracking-tight">Tiket Masuk Anda</h2>
        <p className="text-white/40 text-sm">Tunjukkan QR ini di pintu masuk untuk verifikasi</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        className="w-full max-w-3xl relative group cursor-pointer perspective-1000"
      >
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-brand-violet/20 to-brand-teal/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Main Ticket Container */}
        <div className="relative flex flex-col md:flex-row bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-[20px] shadow-2xl">
          {/* Holographic Shimmer Overlay */}
          <div className="absolute inset-0 holo-shimmer opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity duration-700" />

          {/* Left Side: Info */}
          <div className="flex-1 p-8 md:p-12 relative flex flex-col justify-between overflow-hidden">
            {/* Perforation Line (Right edge of this section) */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] md:flex flex-col justify-center items-center py-4 hidden">
              <div className="bg-white/10 w-full h-full border-r border-dashed border-white/20" />
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center space-x-2",
                  tier === 'VIP' ? "bg-amber-400/10 text-amber-400 border border-amber-400/20" : "bg-brand-violet/10 text-brand-violet border border-brand-violet/20"
                )}>
                  {tier === 'VIP' && <Star className="w-3 h-3 fill-amber-400" />}
                  <span>Akses {tier}</span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                      status === 'Valid' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-brand-teal/10 border-brand-teal/20 text-brand-teal"
                    )}
                  >
                    <span className={cn("w-2 h-2 rounded-full", status === 'Valid' ? "bg-green-500 animate-pulse" : "bg-brand-teal")} />
                    <span>{status === 'Valid' ? 'Berlaku' : 'Sudah Masuk'}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <h3 className="text-4xl md:text-5xl font-black leading-tight bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                  {eventName === "TechNexus Summit 2026" ? "KTT TeknoNexus 2026" : eventName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/40 group/item">
                    <Calendar className="w-5 h-5 group-hover/item:text-brand-violet transition-colors" />
                    <span className="text-sm font-medium">{date}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/40 group/item">
                    <MapPin className="w-5 h-5 group-hover/item:text-brand-teal transition-colors" />
                    <span className="text-sm font-medium">{venue === "Modern Arts Pavilion, NY" ? "Paviliun Seni Modern, NY" : venue}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/40 group/item">
                    <User className="w-5 h-5 group-hover/item:text-brand-violet transition-colors" />
                    <span className="text-sm font-medium">{attendeeName}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/40 group/item">
                    <QrCode className="w-5 h-5 group-hover/item:text-brand-teal transition-colors" />
                    <span className="text-sm font-medium">Kursi {seat.replace('Row', 'Baris').replace('Seat', 'No')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between items-end relative z-10">
              <div className="font-mono text-white/20 text-xs tracking-widest">
                #{ticketId}
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-6 h-1.5 bg-white/5 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: QR Code Section */}
          <div className="w-full md:w-[280px] bg-white/[0.03] p-10 md:p-12 flex flex-col items-center justify-center relative">
            {/* Visual Cutouts for perforation look */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A0A0F] border border-white/10 hidden md:block" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, bounce: 0.5, type: "spring" }}
              className="relative p-6 rounded-3xl bg-white border border-white/10 shadow-2xl group/qr"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.1, 1, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className={cn(
                      "rounded-sm",
                      (i === 0 || i === 3 || i === 12 || i === 15 || i % 5 === 0) ? "bg-black" : "bg-black/10"
                    )}
                  />
                ))}
              </div>
              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }} 
                className="absolute inset-0 border-2 border-brand-violet/30 rounded-3xl group-hover/qr:border-brand-violet transition-colors pointer-events-none" 
              />
            </motion.div>

            <div className="mt-8 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Pindai untuk Masuk</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => setStatus(status === 'Valid' ? 'Checked In' : 'Valid')}
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-violet/50 transition-all text-xs font-bold uppercase tracking-wider"
        >
          <CheckCircle2 className={cn("w-4 h-4", status === 'Checked In' ? "text-brand-teal" : "text-white/40")} />
          <span>Demo Ganti Status</span>
        </button>
      </div>
    </div>
  );
}
