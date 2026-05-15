'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Armchair, Check, Info, Ticket } from 'lucide-react';

type SeatState = 'available' | 'booked' | 'selected';
type SeatTier = 'premium' | 'general';

interface Seat {
  id: string;
  row: string;
  col: number;
  state: SeatState;
  tier: SeatTier;
}

const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats: Seat[] = [];
  rows.forEach((row, rowIndex) => {
    for (let col = 1; col <= 10; col++) {
      const id = `${row}${col}`;
      // Randomly book some seats
      const isBooked = Math.random() < 0.2 && !(rowIndex === 0 && col === 1); 
      seats.push({
        id,
        row,
        col,
        state: isBooked ? 'booked' : 'available',
        tier: rowIndex < 2 ? 'premium' : 'general'
      });
    }
  });
  return seats;
};

export default function SeatPicker({ onNavigate }: { onNavigate?: (view: any) => void }) {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const toggleSeat = (id: string) => {
    const seat = seats.find(s => s.id === id);
    if (!seat || seat.state === 'booked' || isConfirming) return;

    if (selectedSeatIds.includes(id)) {
      setSelectedSeatIds(prev => prev.filter(sId => sId !== id));
    } else {
      setSelectedSeatIds(prev => [...prev, id]);
    }
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    // Simulate processing
    setTimeout(() => {
      onNavigate?.('ticket');
    }, 1500);
  };

  const selectedSeats = seats.filter(s => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((sum, s) => sum + (s.tier === 'premium' ? 149 : 79), 0);

  return (
    <div className="min-h-screen bg-[#0A0A0F] py-20 px-6 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto items-center lg:items-start group/picker">
      <div className="flex-1 w-full space-y-12">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-black text-white">Pilih Tempat Anda</h2>
          <p className="text-white/40 text-sm">KTT TeknoNexus 2026 • Denah Kursi Aula Utama</p>
        </div>

        {/* Stage */}
        <div className="relative w-full py-8 text-center group">
          <div className="h-2 w-full bg-gradient-to-r from-transparent via-brand-violet/50 to-transparent rounded-full shadow-[0_10px_30px_rgba(124,58,237,0.3)]" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-brand-violet mt-4 inline-block group-hover:tracking-[0.6em] transition-all">Panggung</span>
        </div>

        {/* Seating Grid */}
        <div className="grid grid-cols-10 gap-3 md:gap-4 justify-items-center">
          {seats.map((seat, i) => (
            <div key={seat.id} className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.005 }}
                onMouseEnter={() => setHoveredSeat(seat)}
                onMouseLeave={() => setHoveredSeat(null)}
                onClick={() => toggleSeat(seat.id)}
                disabled={isConfirming}
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all relative border",
                  seat.state === 'booked' 
                    ? "bg-zinc-800/50 border-white/5 cursor-not-allowed opacity-50" 
                    : selectedSeatIds.includes(seat.id)
                    ? "bg-brand-violet border-brand-violet shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                    : seat.tier === 'premium'
                    ? "bg-amber-400/5 border-amber-400/20 hover:border-brand-teal/50 hover:bg-brand-teal/10"
                    : "bg-white/5 border-white/10 hover:border-brand-teal/50 hover:bg-brand-teal/10"
                )}
              >
                {selectedSeatIds.includes(seat.id) ? (
                  <Check className="w-4 h-4 text-white" />
                ) : seat.state === 'booked' ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                ) : seat.tier === 'premium' ? (
                  <Star className="w-3.5 h-3.5 text-amber-400/30" />
                ) : (
                  <Armchair className="w-4 h-4 text-white/10 group-hover:text-brand-teal/50 transition-colors" />
                )}
              </motion.button>
              
              {/* Row Label (Left side) */}
              {seat.col === 1 && (
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20">{seat.row}</span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          {[
            { label: 'Tersedia', class: 'bg-white/5 border-white/10' },
            { label: 'Dipilih', class: 'bg-brand-violet border-brand-violet' },
            { label: 'Terpesan', class: 'bg-zinc-800/50 border-white/5 opacity-50' },
            { label: 'Kursi VIP', class: 'bg-amber-400/5 border-amber-400/20' }
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className={cn("w-4 h-4 rounded-md border", item.class)} />
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel: Selection Summary */}
      <div className="w-full lg:w-[400px] sticky top-20">
        <AnimatePresence>
          {selectedSeatIds.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              className="p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-[20px] shadow-2xl relative overflow-hidden group/card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/5 to-brand-teal/5 opacity-50" />
              
              <div className="relative space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black">Pilihan Anda</h3>
                    <p className="text-white/40 text-xs text-brand-teal uppercase tracking-widest font-bold">Langkah Terakhir</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-brand-violet/20 border border-brand-violet/30">
                    <Ticket className="w-5 h-5 text-brand-violet" />
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedSeats.map((seat) => (
                    <motion.div
                      layout
                      key={seat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover/card:bg-white/[0.05] transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm",
                          seat.tier === 'premium' ? "bg-amber-400/10 text-amber-400" : "bg-white/10 text-white"
                        )}>
                          {seat.id}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{seat.tier === 'premium' ? 'Kursi VIP' : 'Tiket Umum'}</p>
                          <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Lantai {seat.row === 'A' || seat.row === 'B' ? 'A' : 'B'}</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-white/80">${seat.tier === 'premium' ? '149' : '79'}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Total Pembayaran</span>
                  <span className="text-3xl font-black text-white">${totalPrice}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  disabled={isConfirming}
                  className={cn(
                    "w-full py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center",
                    isConfirming 
                      ? "bg-zinc-800 text-white/50 cursor-not-allowed" 
                      : "bg-gradient-to-r from-brand-violet to-brand-teal text-white shadow-brand-violet/20"
                  )}
                >
                  {isConfirming ? (
                    <div className="flex items-center space-x-2">
                       <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                       <span>Memproses...</span>
                    </div>
                  ) : "Konfirmasi Kursi"}
                </motion.button>
                
                <p className="text-[10px] text-center text-white/30 font-medium">Biaya admin berlaku saat pembayaran</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 border-dashed backdrop-blur-[20px] flex flex-col items-center justify-center text-center space-y-4 h-[400px]"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <Armchair className="w-8 h-8 text-white/10" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white/50">Tidak Ada Kursi Dipilih</p>
                <p className="text-xs text-white/20 max-w-[150px]">Pilih kursi yang Anda inginkan dari denah di samping</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip Hover Info */}
      <AnimatePresence>
        {hoveredSeat && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed pointer-events-none z-50 p-4 rounded-2xl bg-[#111118] border border-white/20 shadow-2xl backdrop-blur-2xl"
            style={{ 
              left: 20, 
              bottom: 20,
            }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-black",
                hoveredSeat.state === 'booked' ? "bg-white/5 text-white/20" : "bg-brand-violet/20 text-brand-violet"
              )}>
                {hoveredSeat.id}
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-tight">{hoveredSeat.tier} Section</p>
                <p className={cn(
                  "text-[10px] font-bold uppercase",
                  hoveredSeat.state === 'available' ? "text-brand-teal" : "text-brand-violet"
                )}>{hoveredSeat.state}</p>
              </div>
            </div>
            <p className="text-xs text-white/40 italic">"{hoveredSeat.tier === 'premium' ? 'Best view of the stage' : 'Great acoustics'}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
