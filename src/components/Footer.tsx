import React from 'react';
import { ArrowUp, Terminal, Heart, Lock } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound } from '../utils/soundEffects';

interface FooterProps {
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminModal }) => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-bold text-lg">
              <span className="text-blue-400 font-extrabold">&lt;</span>
              <span className="tracking-tight">{personalInfo.fullName}</span>
              <span className="text-blue-400 font-extrabold">/&gt;</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {personalInfo.primaryTitle}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for AI & Full-Stack Opportunities</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-xl btn-secondary text-xs font-bold flex items-center gap-2 border border-slate-700"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Siddartha Jamandla. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>Built with React, Three.js & Tailwind</span>
            {onOpenAdminModal && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAdminModal();
                }}
                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                title="Owner Admin Access (Password protected)"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Owner Portal</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
