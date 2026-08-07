import React from 'react';
import { Camera, Sparkles, Bike, Video, GraduationCap, Target, Cpu, Award, User, CheckCircle2 } from 'lucide-react';
import { TiltGlassCard } from './3d/TiltGlassCard';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto, DEFAULT_PROFILE_PHOTO } from '../utils/profilePhotoManager';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

export const AboutSection: React.FC = () => {
  const { photoUrl } = useProfilePhoto();

  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-amber-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Background & Core Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Architecting <span className="gradient-text-blue-cyan">Intelligent AI Solutions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Bridging machine learning concepts with production-ready full-stack software and interactive web applications.
          </p>
        </div>

        {/* Profile Card & Main Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Executive Profile Card with Photo */}
          <div className="lg:col-span-4 flex flex-col">
            <TiltGlassCard maxTilt={8} className="p-6 space-y-6 h-full flex flex-col items-center text-center justify-between rounded-2xl glass-panel border border-slate-800">
              <div className="space-y-4 w-full flex flex-col items-center">
                
                {/* Photo Container */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-slate-900 border-2 border-blue-500/40 p-1.5 shadow-2xl overflow-hidden relative group">
                  <img
                    src={photoUrl}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PROFILE_PHOTO;
                    }}
                  />
                  <div className="absolute top-3 right-3 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-lg" title="Active AIML Student" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-white">{personalInfo.fullName}</h3>
                  <p className="text-xs font-bold text-blue-400 tracking-wide uppercase">AIML Engineer</p>
                  <p className="text-xs text-slate-400">Balaji Institute of Technology & Science</p>
                </div>

                <div className="w-full pt-2 border-t border-slate-800/80 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Diploma in CSE (CGPA 8.03/10)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>6-Month CADD Web Dev Training</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Python, C++, Java & AI Tools</span>
                  </div>
                </div>
              </div>

              <div className="w-full pt-3">
                <a
                  href="#contact"
                  onClick={playClickSound}
                  className="w-full py-2.5 rounded-xl btn-primary text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Connect With Siddartha</span>
                </a>
              </div>
            </TiltGlassCard>
          </div>

          {/* Main Bio Card */}
          <div className="lg:col-span-8 flex flex-col">
            <TiltGlassCard maxTilt={5} className="p-8 sm:p-10 space-y-6 h-full flex flex-col justify-between rounded-2xl glass-panel border border-slate-800">
              <div className="space-y-5">
                <div className="flex items-center gap-3.5 border-b border-slate-800 pb-4">
                  <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">Academic Foundation & Student Mindset</h3>
                    <p className="text-xs text-blue-400 font-semibold">B.Tech AIML — Balaji Institute of Technology & Science (2026–2029)</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {personalInfo.bioParagraph1}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {personalInfo.bioParagraph2}
                </p>

                {/* Key Metrics Counter Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {personalInfo.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-blue-400">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Philosophy Quote */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 mt-4">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
                <p className="text-xs text-slate-300 italic font-medium">
                  "Discipline builds skill. Practical execution turns ambitious AI ideas into reliable, real-world software."
                </p>
              </div>
            </TiltGlassCard>
          </div>

        </div>

        {/* Interests & Hobbies Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Personal Interests & Creative Passions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalInfo.interests.map((interest, idx) => (
              <div
                key={idx}
                onMouseEnter={playHoverSound}
                className="p-6 rounded-2xl glass-panel-interactive border border-slate-800 space-y-3 group"
              >
                <div className="p-3 w-fit rounded-xl bg-slate-900/80 border border-slate-800 group-hover:border-blue-500/40 transition-colors">
                  {getInterestIcon(interest.icon)}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {interest.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

