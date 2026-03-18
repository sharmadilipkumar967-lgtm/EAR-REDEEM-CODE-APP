/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Gift, 
  Gamepad2, 
  PlayCircle, 
  CheckCircle2, 
  User, 
  Download, 
  TrendingUp, 
  History,
  Info,
  ChevronRight,
  Star,
  Trophy,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Task {
  id: string;
  title: string;
  reward: number;
  icon: React.ReactNode;
  type: 'daily' | 'video' | 'game' | 'install';
  description: string;
}

interface Reward {
  id: string;
  name: string;
  cost: number;
  image: string;
  brand: string;
}

const TASKS: Task[] = [
  { id: '1', title: 'Daily Check-in', reward: 50, icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, type: 'daily', description: 'Claim your daily bonus coins!' },
  { id: '2', title: 'Watch Video Ad', reward: 20, icon: <PlayCircle className="w-6 h-6 text-blue-500" />, type: 'video', description: 'Watch a short video to earn coins.' },
  { id: '3', title: 'Play Quiz Master', reward: 100, icon: <Gamepad2 className="w-6 h-6 text-purple-500" />, type: 'game', description: 'Win games to get massive rewards.' },
  { id: '4', title: 'Install Partner App', reward: 500, icon: <Download className="w-6 h-6 text-orange-500" />, type: 'install', description: 'Try out new apps and get paid.' },
];

const REWARDS: Reward[] = [
  { id: 'r1', name: '₹10 Google Play Code', cost: 1000, brand: 'Google Play', image: 'https://picsum.photos/seed/google/200/200' },
  { id: 'r2', name: '₹50 Google Play Code', cost: 5000, brand: 'Google Play', image: 'https://picsum.photos/seed/play/200/200' },
  { id: 'r3', name: '₹100 Amazon Voucher', cost: 10000, brand: 'Amazon', image: 'https://picsum.photos/seed/amazon/200/200' },
  { id: 'r4', name: '₹250 Flipkart Gift Card', cost: 25000, brand: 'Flipkart', image: 'https://picsum.photos/seed/flipkart/200/200' },
];

export default function App() {
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('user_coins');
    return saved ? parseInt(saved) : 100;
  });
  const [activeTab, setActiveTab] = useState<'earn' | 'redeem' | 'profile'>('earn');
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('user_coins', coins.toString());
  }, [coins]);

  const addCoins = (amount: number, taskName: string) => {
    setCoins(prev => prev + amount);
    setMessage(`+${amount} coins earned from ${taskName}!`);
    setTimeout(() => setMessage(null), 3000);
  };

  const redeemReward = (reward: Reward) => {
    if (coins >= reward.cost) {
      setCoins(prev => prev - reward.cost);
      setMessage(`Success! Your ${reward.name} will be sent to your email.`);
      setTimeout(() => setMessage(null), 5000);
    } else {
      setMessage(`Not enough coins! You need ${reward.cost - coins} more.`);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 px-4 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-bold text-xl tracking-tight">EarnRedeem</h1>
        </div>
        <div className="bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
          <Coins className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          <span className="font-bold text-amber-700">{coins.toLocaleString()}</span>
        </div>
      </header>

      {/* Toast Message */}
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10"
          >
            <span className="text-sm font-medium">{message}</span>
            <button onClick={() => setMessage(null)} className="text-white/60 hover:text-white">
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto px-4 pt-6">
        {activeTab === 'earn' && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-1">Earn Daily Rewards</h2>
                <p className="text-indigo-100 text-sm mb-4">Complete simple tasks to get free redeem codes.</p>
                <button 
                  onClick={() => setShowInstallModal(true)}
                  className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <Trophy className="w-32 h-32" />
              </div>
            </section>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today</p>
                  <p className="font-bold">+250</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</p>
                  <p className="font-bold">1.2k</p>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Available Tasks
              </h3>
              <div className="space-y-3">
                {TASKS.map((task) => (
                  <motion.button
                    key={task.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addCoins(task.reward, task.title)}
                    className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                      {task.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{task.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Coins className="w-3 h-3" />
                        <span>{task.reward}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto mt-1" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'redeem' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-1">Redeem Shop</h2>
                <p className="text-slate-400 text-sm">Exchange your hard-earned coins for real rewards.</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              {REWARDS.map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="aspect-square bg-slate-100 relative">
                    <img 
                      src={reward.image} 
                      alt={reward.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {reward.brand}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-bold text-sm mb-2 line-clamp-2">{reward.name}</h4>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1 text-amber-600 font-bold text-sm mb-3">
                        <Coins className="w-4 h-4" />
                        <span>{reward.cost.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => redeemReward(reward)}
                        className={`w-full py-2 rounded-xl font-bold text-xs transition-colors ${
                          coins >= reward.cost 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Redeem Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-600 border-4 border-white shadow-lg">
                <User className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold">Dilip Kumar</h2>
              <p className="text-slate-500 text-sm mb-6">sharmadilipkumar967@gmail.com</p>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-1">Level</p>
                  <p className="font-bold text-indigo-600">12</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-1">Rank</p>
                  <p className="font-bold text-indigo-600">#42</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-1">Streak</p>
                  <p className="font-bold text-indigo-600">5d</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <History className="w-5 h-5" />
                  </div>
                  <span className="font-bold">Transaction History</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
              <button className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <Star className="w-5 h-5" />
                  </div>
                  <span className="font-bold">Rate App</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
              <button className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <Info className="w-5 h-5" />
                  </div>
                  <span className="font-bold">Help & Support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40 max-w-md mx-auto rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <NavButton 
          active={activeTab === 'earn'} 
          onClick={() => setActiveTab('earn')} 
          icon={<Zap className="w-6 h-6" />} 
          label="Earn" 
        />
        <NavButton 
          active={activeTab === 'redeem'} 
          onClick={() => setActiveTab('redeem')} 
          icon={<Gift className="w-6 h-6" />} 
          label="Redeem" 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<User className="w-6 h-6" />} 
          label="Profile" 
        />
      </nav>

      {/* Install Modal */}
      <AnimatePresence>
        {showInstallModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-200">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Install EarnRedeem</h3>
              <p className="text-slate-500 text-center mb-8">Add this app to your home screen for faster access and exclusive rewards!</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowInstallModal(false)}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
                >
                  Install Now
                </button>
                <button 
                  onClick={() => setShowInstallModal(false)}
                  className="w-full bg-slate-50 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Safe</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Fast</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Free</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}
    >
      <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-indigo-50' : 'bg-transparent'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      {active && <motion.div layoutId="nav-dot" className="w-1 h-1 bg-indigo-600 rounded-full" />}
    </button>
  );
}
