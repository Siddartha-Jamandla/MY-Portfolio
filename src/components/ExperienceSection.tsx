import React from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { TiltGlassCard } from './3d/TiltGlassCard';
import { experienceData } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Experience & Education
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Career & Academic <span className="gradient-text-blue-cyan">Timeline</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tracing academic milestones, Google Student Ambassador leadership, and technical achievements.
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Track Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-slate-800 -translate-x-1/2 opacity-60" />

          <div className="space-y-12">
            {experienceData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  onMouseEnter={playHoverSound}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Point in Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center z-20 shadow-md shadow-blue-500/30">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                  </div>

                  {/* Content Card Side */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <TiltGlassCard maxTilt={6} className="p-6 sm:p-8 space-y-4 rounded-2xl glass-panel border border-slate-800">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {item.type === 'Work' ? (
                              <Briefcase className="w-4 h-4" />
                            ) : (
                              <GraduationCap className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                              {item.type}
                            </span>
                            <h3 className="text-lg font-bold text-white">{item.role}</h3>
                          </div>
                        </div>

                        {item.badge && (
                          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium">
                        <span className="text-white font-bold">{item.organization}</span>
                        <div className="flex items-center gap-1 text-blue-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <ul className="space-y-2 pt-2">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                    </TiltGlassCard>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Grid */}
                  <div className="hidden sm:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
