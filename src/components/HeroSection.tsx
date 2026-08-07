import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, ArrowRight, Download, Terminal, ChevronDown, FileText, Zap, Calendar, Code, Clock } from 'lucide-react';
import { HeroCore3D } from './3d/HeroCore3D';
import { personalInfo } from '../data/portfolioData';
import { IllusionMode } from '../types';
import { useProfilePhoto, DEFAULT_PROFILE_PHOTO } from '../utils/profilePhotoManager';
import { playClickSound } from '../utils/soundEffects';

interface HeroSectionProps {
  illusionMode: IllusionMode;
  onOpenResumeModal: () => void;
  onOpenRecruiterPitch?: () => void;
  onOpenSchedule?: () => void;
  onOpenCodeShowcase?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  illusionMode,
  onOpenResumeModal,
  onOpenRecruiterPitch,
  onOpenSchedule,
  onOpenCodeShowcase
}) => {
  const { photoUrl } = useProfilePhoto();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.secondaryTitles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            {/* Status & Location Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Internships & Projects</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Main Name Heading with Profile Photo Avatar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border-2 border-blue-500/40 p-1 shadow-2xl overflow-hidden shrink-0">
                  <img
                    src={photoUrl}
                    alt="Siddartha Jamandla"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PROFILE_PHOTO;
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <span className="section-tag inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI & Full-Stack Software Engineer
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Hi, I'm <span className="gradient-text-blue-cyan">Siddartha Jamandla</span>
                  </h1>
                </div>
              </div>

              {/* Dynamic Role Switcher */}
              <div className="h-10 sm:h-12 flex items-center pt-1">
                <span className="text-lg sm:text-2xl font-bold text-slate-200 flex items-center gap-2.5">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 transition-all duration-500 ease-in-out">
                    {personalInfo.secondaryTitles[roleIndex]}
                  </span>
                </span>
              </div>
            </div>

            {/* Catchphrase & Elevator Pitch */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {personalInfo.tagline}
            </p>
            
            <div className="p-5 rounded-2xl glass-panel text-sm text-slate-300 max-w-2xl border border-slate-800/90 leading-relaxed">
              {personalInfo.elevatorPitch}
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                onClick={playClickSound}
                className="btn-primary px-7 py-3.5 text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenResumeModal();
                }}
                className="btn-secondary px-7 py-3.5 text-sm flex items-center gap-2 border border-slate-700"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>View Full Resume</span>
              </button>

              {onOpenSchedule && (
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenSchedule();
                  }}
                  className="glass-button px-5 py-3.5 rounded-xl text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book / Schedule Interview</span>
                </button>
              )}
            </div>

            {/* Recruiter Quick Tools Banner */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              {onOpenRecruiterPitch && (
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenRecruiterPitch();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:text-white font-semibold flex items-center gap-1.5 transition-all hover:bg-blue-500/25"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Recruiter 30s Cheat Sheet</span>
                </button>
              )}

              {onOpenCodeShowcase && (
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenCodeShowcase();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:text-white font-semibold flex items-center gap-1.5 transition-all hover:bg-indigo-500/25"
                >
                  <Code className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Interactive Code Quality Showcase</span>
                </button>
              )}
            </div>

            {/* Highlights Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Education</div>
                <div className="text-xs font-bold text-blue-400">B.Tech AIML (2025–2029)</div>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Flagship App</div>
                <div className="text-xs font-bold text-slate-100">Career Plus AI Engine</div>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Leadership</div>
                <div className="text-xs font-bold text-indigo-400">Google Student Lead</div>
              </div>
            </div>
          </div>

          {/* Right Hero 3D Interactive Model */}
          <div className="lg:col-span-5 relative">
            <HeroCore3D mode={illusionMode} />
          </div>

        </div>
      </div>

      {/* Bottom Scroll Down Indicator */}
      <a
        href="#about"
        onClick={playClickSound}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full glass-panel text-slate-400 hover:text-cyan-300 transition-colors animate-bounce hidden sm:block"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};
