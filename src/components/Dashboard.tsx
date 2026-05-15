'use client';

import { motion } from 'motion/react';
import { 
  Users, 
  ScanLine, 
  Ticket, 
  Zap, 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell,
  Search,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

const data = [
  { time: '08:00', attendance: 120, sales: 400 },
  { time: '10:00', attendance: 450, sales: 650 },
  { time: '12:00', attendance: 840, sales: 800 },
  { time: '14:00', attendance: 1100, sales: 950 },
  { time: '16:00', attendance: 1350, sales: 1100 },
  { time: '18:00', attendance: 1580, sales: 1240 },
  { time: '20:00', attendance: 1650, sales: 1300 },
];

const StatCard = ({ title, value, icon: Icon, color, delay }: any) => {
  const [displayValue, setDisplayValue] = useState(0);
  const target = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => requestAnimationFrame(tick), delay * 100);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-[20px] hover:border-brand-violet/30 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-xl bg-opacity-20", color)}>
          <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
        </div>
        <div className="flex items-center text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3 mr-1" />
          +12%
        </div>
      </div>
      <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <div className="flex items-baseline space-x-2 mt-1">
        <span className="text-3xl font-black text-white">
          {typeof value === 'string' && value.includes('%') ? `${displayValue}%` : displayValue.toLocaleString()}
        </span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1.5, delay }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </motion.div>
  );
};

const heatmapData = [
  [30, 45, 60, 90, 70, 50, 40],
  [40, 60, 80, 100, 85, 60, 45],
  [20, 35, 50, 75, 60, 40, 30],
  [10, 20, 40, 55, 45, 30, 20],
];

export default function Dashboard({ onNavigate }: { onNavigate?: (view: any) => void }) {
  const [activeTimeRange, setActiveTimeRange] = useState('Jam');

  return (
    <div className="flex min-h-screen bg-[#0A0A0F] text-white">
      {/* Sidebar - Collapsed Desktop */}
      <aside className="w-20 border-r border-white/10 flex flex-col items-center py-8 space-y-8 sticky top-0 h-screen bg-[#0A0A0F]/80 backdrop-blur-xl z-50">
        <button 
          onClick={() => onNavigate?.('hero')}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-teal flex items-center justify-center p-0.5 hover:scale-110 transition-transform"
        >
          <div className="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
            <span className="font-black text-sm">A</span>
          </div>
        </button>
        
        <nav className="flex flex-col space-y-4">
          {[
            { icon: LayoutDashboard, view: 'dashboard' },
            { icon: Calendar, view: 'hero' },
            { icon: BarChart3, view: 'badges' },
            { icon: Users, view: 'seats' },
            { icon: Settings, view: 'ticket' }
          ].map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
              onClick={() => onNavigate?.(item.view)}
              className={cn(
                "p-3 rounded-xl transition-colors",
                i === 0 ? "text-brand-violet border border-brand-violet/20 bg-brand-violet/10" : "text-white/40"
              )}
            >
              <item.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-black">Konsol Penyelenggara</h1>
              <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Langsung</span>
              </span>
            </div>
            <p className="text-white/40 text-sm mt-1">TechNexus Summit 2026 • Aula Utama</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-violet transition-colors" />
              <input 
                type="text" 
                placeholder="Cari peserta..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-violet/50 transition-all w-64"
              />
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all relative">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-violet rounded-full border-2 border-[#0A0A0F]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 cursor-pointer hover:border-brand-violet/50 transition-colors" />
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Terdaftar" value="1.240" icon={Users} color="bg-white/10" delay={1} />
          <StatCard title="Sudah Hadir" value="847" icon={ScanLine} color="bg-brand-teal" delay={2} />
          <StatCard title="Tiket Terjual" value="1.180" icon={Ticket} color="bg-brand-violet" delay={3} />
          <StatCard title="Interaksi" value="94%" icon={Zap} color="bg-amber-400" delay={4} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-[20px]"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-lg font-bold">Alur Kehadiran</h3>
                  <p className="text-white/40 text-xs">Pelacakan waktu nyata selama acara</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  {['Jam', 'Hari', 'Minggu'].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setActiveTimeRange(t)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                        activeTimeRange === t ? "bg-brand-violet text-white" : "text-white/30 hover:text-white"
                      )}>{t}</button>
                  ))}
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0FCCCE" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0FCCCE" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#F1F0FF' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#7C3AED" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorAttendance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Bottom: Arrival Heatmap */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-[20px]">
              <h3 className="text-lg font-bold mb-6">Kepadatan Kedatangan Puncak</h3>
              <div className="grid grid-cols-7 gap-3">
                {heatmapData.flat().map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="aspect-square rounded-lg relative group"
                    style={{ 
                      backgroundColor: `rgba(124, 58, 237, ${val / 100})`,
                      boxShadow: val > 80 ? '0 0 15px rgba(124, 58, 237, 0.3)' : 'none'
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 rounded-lg flex items-center justify-center transition-opacity">
                      <span className="text-[10px] font-black">{val}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-6 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
                <span>Min</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Recent Check-ins */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-[20px] flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Kehadiran Langsung</h3>
                <button className="text-xs text-brand-violet font-bold hover:underline">Lihat Semua</button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', time: '2m lalu', badge: 'Diamond', color: 'text-brand-violet' },
                  { name: 'Marcus Bell', time: '5m lalu', badge: 'Speaker', color: 'text-amber-400' },
                  { name: 'Elena Rodriguez', time: '8m lalu', badge: 'Early Bird', color: 'text-brand-teal' },
                  { name: 'David Kim', time: '12m lalu', badge: 'VIP', color: 'text-zinc-400' },
                  { name: 'Jordan Hayes', time: '15m lalu', badge: 'Hadir Pertama', color: 'text-emerald-400' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-bold truncate max-w-[100px]">{item.name}</p>
                        <p className="text-[10px] text-white/40">{item.time}</p>
                      </div>
                    </div>
                    <div className={cn("text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-white/5 border border-white/10", item.color)}>
                      {item.badge}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-brand-violet/20">
                    <ScanLine className="w-4 h-4 text-brand-violet" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">Mode Pemindai</p>
                    <p className="text-white/50">Siap untuk masuk</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
