'use client';

import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Lock, 
  Zap, 
  Users, 
  Calendar, 
  Mic, 
  Trophy, 
  Sparkle,
  Search,
  Dna
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

type Tier = 'Common' | 'Rare' | 'Epic' | 'Legendary';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  tier: Tier;
  dateEarned?: string;
  progress?: number;
  isEarned: boolean;
}

const badges: Badge[] = [
  {
    id: '1',
    name: "Early Bird",
    description: "Mendaftar 7 hari sebelum acara dimulai.",
    icon: Calendar,
    tier: 'Rare',
    dateEarned: '12 Mei 2026',
    isEarned: true
  },
  {
    id: '2',
    name: "Penjelajah Tekno",
    description: "Menghadiri 3 acara teknologi yang berbeda.",
    icon: Dna,
    tier: 'Epic',
    dateEarned: '20 Apr 2026',
    isEarned: true
  },
  {
    id: '3',
    name: "Master Workshop",
    description: "Menyelesaikan 5 workshop intensitas tinggi.",
    icon: Trophy,
    tier: 'Legendary',
    isEarned: false,
    progress: 80
  },
  {
    id: '4',
    name: "Pro Networking",
    description: "Terhubung dengan 10+ peserta melalui jaringan AetherPass.",
    icon: Users,
    tier: 'Epic',
    dateEarned: '15 Mei 2026',
    isEarned: true
  },
  {
    id: '5',
    name: "Hadir Pertama",
    description: "Berhasil melakukan check-in pertama Anda di acara AetherPass.",
    icon: Zap,
    tier: 'Common',
    dateEarned: '02 Mar 2026',
    isEarned: true
  },
  {
    id: '6',
    name: "Penggemar Pembicara",
    description: "Menghadiri sesi pembicara utama pilihan.",
    icon: Mic,
    tier: 'Rare',
    isEarned: false,
    progress: 0
  }
];

const badgeTierStyles: Record<Tier, { border: string, ring: string, glow: string, text: string }> = {
  Common: {
    border: 'border-zinc-500/30',
    ring: 'from-zinc-500/20 to-zinc-800/10',
    glow: 'group-hover:shadow-[0_0_20px_rgba(113,113,122,0.2)]',
    text: 'text-zinc-400'
  },
  Rare: {
    border: 'border-brand-teal/30',
    ring: 'from-brand-teal/20 to-brand-teal/5',
    glow: 'group-hover:shadow-[0_0_20px_rgba(15,204,206,0.3)]',
    text: 'text-brand-teal'
  },
  Epic: {
    border: 'border-brand-violet/30',
    ring: 'from-brand-violet/20 to-brand-violet/5',
    glow: 'group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]',
    text: 'text-brand-violet'
  },
  Legendary: {
    border: 'border-amber-400/30',
    ring: 'from-amber-400/20 to-amber-600/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]',
    text: 'text-amber-400'
  }
};

const BadgeCard = ({ badge, index }: { badge: Badge, index: number }) => {
  const styles = badgeTierStyles[badge.tier];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group relative p-8 rounded-[40px] bg-[#111118] border transition-all duration-500",
        badge.isEarned ? styles.border : 'border-white/5 opacity-50',
        badge.isEarned && styles.glow
      )}
    >
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none rounded-[40px]",
        styles.ring
      )} />

      {/* Hex/Circle Avatar Container */}
      <div className="relative mb-6 flex justify-center">
        <div className="w-24 h-24 relative flex items-center justify-center">
          {/* Animated Background Rings for Legendary */}
          {badge.tier === 'Legendary' && badge.isEarned && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-400/20"
            />
          )}

          <div className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center relative bg-[#0A0A0F] border-2",
            badge.isEarned ? styles.border : 'border-white/5'
          )}>
            {badge.isEarned ? (
              <badge.icon className={cn("w-10 h-10", styles.text)} />
            ) : (
              <Lock className="w-8 h-8 text-white/20" />
            )}
            
            {/* Shimmer overlay */}
            <div className="absolute inset-0 holo-shimmer opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity" />
          </div>

          <AnimatePresence>
            {badge.isEarned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-[#111118]"
              >
                <Sparkle className="w-3 h-3 fill-current" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div>
          <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", styles.text)}>
            {badge.tier}
          </span>
          <h3 className="text-xl font-black text-white mt-1">{badge.name}</h3>
        </div>

        <p className="text-xs text-white/40 leading-relaxed min-h-[40px]">
          {badge.description}
        </p>

        <div className="pt-4 border-t border-white/5">
          {badge.isEarned ? (
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">Diperoleh Pada</span>
              <span className="text-xs font-bold text-white/70">{badge.dateEarned}</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/20 px-1">
                <span>Progres</span>
                <span>{badge.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${badge.progress}%` }}
                  className={cn("h-full rounded-full", styles.ring.split(' ')[0].replace('from-', 'bg-'))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function BadgeSystem({ onNavigate }: { onNavigate?: (view: any) => void }) {
  const earnedCount = badges.filter(b => b.isEarned).length;
  const totalCount = badges.length;
  const xp = (earnedCount * 250) + 120;

  return (
    <div className="min-h-screen bg-[#0A0A0F] py-20 px-6 max-w-6xl mx-auto space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-brand-violet text-xs font-black uppercase tracking-[0.3em] mb-2">
            <Award className="w-4 h-4" />
            <span>Pencapaian</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Koleksi Anda</h1>
          <p className="text-white/40 text-sm max-w-md">Setiap interaksi, workshop, dan koneksi yang Anda buat memberikan lencana digital unik.</p>
        </div>

        <div className="flex items-center space-x-8 bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-[20px]">
          <div className="text-center">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Lencana</p>
            <p className="text-3xl font-black text-white">{earnedCount}<span className="text-white/20">/{totalCount}</span></p>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] font-black text-brand-violet uppercase tracking-[0.2em] mb-1">Total XP</p>
            <p className="text-3xl font-black text-white">{xp.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-2xl bg-brand-violet/10 border border-brand-violet/20">
            <Sparkle className="w-6 h-6 text-brand-violet" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map((badge, i) => (
          <BadgeCard key={badge.id} badge={badge} index={i} />
        ))}
      </div>

      <div className="pt-12 text-center">
        <button 
          onClick={() => onNavigate?.('dashboard')}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
        >
          Jelajahi Semua Lencana
        </button>
      </div>
    </div>
  );
}
