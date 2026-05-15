'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Ticket, Users, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const Counter = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/[^0-9]/g, ''));
  const isPercent = value.includes('%');
  const isPlus = value.includes('+');

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    let timer: any;

    const run = () => {
      const startTime = Date.now();
      const tick = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          timer = requestAnimationFrame(tick);
        }
      };
      timer = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(run, delay * 1000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(timer);
    };
  }, [target, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.5 }}
      className="flex flex-col items-start"
    >
      <span className="text-[28px] font-bold text-white">
        {count.toLocaleString()}
        {isPercent ? '%' : isPlus ? '+' : ''}
      </span>
      <span className="text-[12px] text-white/40 uppercase tracking-widest mt-1 font-medium">{label}</span>
    </motion.div>
  );
};

export default function Hero({ onNavigate }: { onNavigate?: (view: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#0A0A0F] overflow-hidden flex flex-col items-center justify-center pt-20 px-6">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="glow-blob -top-[100px] -right-[100px] bg-brand-violet"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="glow-blob -bottom-[100px] -left-[100px] bg-brand-teal"
        />
      </div>

      {/* Particle Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-sm font-medium w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-violet opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-violet"></span>
            </span>
            <span>Ekosistem Acara Masa Depan</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-[-0.04em] bg-gradient-to-r from-white via-[#a78bfa] to-[#2dd4bf] bg-clip-text text-transparent">
            Rasakan Acara <br />
            Lebih dari Sekadar Kehadiran.
          </h1>

          <p className="text-lg text-white/50 max-w-lg leading-[1.6]">
            Daftar. Hadiri. Koleksi. Koneksi. Semua dalam satu platform premium yang dirancang untuk seminar kampus, bootcamp teknologi, dan konferensi global.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.('seats')}
              className="px-8 py-4 bg-gradient-to-r from-brand-violet to-brand-teal rounded-full font-bold text-white shadow-lg shadow-brand-violet/20 flex items-center group transition-all"
            >
              Jelajahi Acara
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.('dashboard')}
              className="px-8 py-4 border border-white/20 rounded-full font-bold text-white transition-colors"
            >
              Untuk Penyelenggara
            </motion.button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <Counter value="2,400+" label="Acara" delay={0.2} />
            <Counter value="18k" label="Peserta" delay={0.4} />
            <Counter value="96%" label="Kepuasan" delay={0.6} />
          </div>
        </motion.div>

        {/* Hero Image / Mockup Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative hidden lg:block perspective-1000"
        >
          {/* Main Card Mockup */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-full max-w-md mx-auto aspect-[3/4] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-8 overflow-hidden group shadow-2xl shadow-brand-violet/10"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 holo-shimmer opacity-30 pointer-events-none" />
            
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-10 w-48 bg-white/20 rounded-lg" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-violet/20 flex items-center justify-center border border-brand-violet/30">
                  <Ticket className="w-6 h-6 text-brand-violet" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] bg-zinc-800" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] bg-brand-teal flex items-center justify-center text-[10px] font-bold text-black">
                      +12
                    </div>
                  </div>
                  <div className="text-sm font-medium text-white/70">1.240 orang hadir</div>
                </div>

                <div className="aspect-square w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-8 group-hover:bg-white/10 transition-colors">
                  <div className="w-full h-full border-2 border-dashed border-white/20 rounded-xl relative flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={cn(
                          "w-4 h-4 rounded-sm",
                          i % 3 === 0 ? "bg-brand-violet" : "bg-white/10"
                        )} />
                      ))}
                    </div>
                    <span className="absolute -bottom-6 text-[10px] uppercase tracking-tighter text-white/30">ID Holografik: AE-294-XP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-10 -right-10 z-10 p-4 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 backdrop-blur-xl flex items-center space-x-3"
          >
            <div className="p-2 rounded-lg bg-brand-teal/20">
              <CheckCircle className="w-5 h-5 text-brand-teal" />
            </div>
            <div className="text-sm font-bold text-white">Tiket Terverifikasi</div>
          </motion.div>

          <motion.div
            animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-8 -left-8 z-30 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center space-x-3"
          >
            <div className="p-2 rounded-lg bg-zinc-800">
              <Users className="w-5 h-5 text-white/70" />
            </div>
            <div className="text-sm font-medium text-white/70">
              <span className="text-white font-bold">482</span> Koneksi terjalin
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
