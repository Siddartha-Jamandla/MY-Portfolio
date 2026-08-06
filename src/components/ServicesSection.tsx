import React, { useState } from 'react';
import { Brain, Globe, Boxes, Award, CheckCircle2, Quote, ExternalLink, Sparkles } from 'lucide-react';
import { TiltGlassCard } from './3d/TiltGlassCard';
import { servicesData, certificationsData, testimonialsData } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

export const ServicesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certificationsData[0] | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-purple-400" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-emerald-400" />;
      default:
        return <Brain className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Capabilities & Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            High-Impact <span className="gradient-text-blue-cyan">AI & Web Solutions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            End-to-end AI pipelines, full-stack application engineering, and interactive web software solutions.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <TiltGlassCard
              key={service.id}
              maxTilt={6}
              className="p-8 space-y-6 flex flex-col justify-between rounded-2xl glass-panel border border-slate-800"
            >
              <div className="space-y-4">
                <div className="p-3.5 w-fit rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="text-xl font-bold text-white">{service.title}</h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Core Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-900 text-blue-300 text-xs font-medium border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltGlassCard>
          ))}
        </div>

        {/* Certifications Showcase */}
        <div className="space-y-8 pt-10 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">Certifications & Verified Credentials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setSelectedCert(cert);
                }}
                className="p-6 rounded-2xl glass-panel-interactive border border-slate-800 space-y-3 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                    Verified
                  </span>
                  <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {cert.title}
                </h4>

                <p className="text-xs font-semibold text-slate-400">{cert.issuer}</p>

                <p className="text-xs text-slate-400 line-clamp-2">{cert.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="pt-10">
          {testimonialsData.map((test) => (
            <div key={test.id} className="max-w-3xl mx-auto p-8 rounded-2xl glass-panel border border-slate-800 space-y-4 text-center relative overflow-hidden shadow-xl">
              <Quote className="w-10 h-10 text-blue-500/20 mx-auto" />
              <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                "{test.quote}"
              </p>
              <div>
                <div className="text-sm font-bold text-blue-400">{test.name}</div>
                <div className="text-xs text-slate-400">{test.role} • {test.organization}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certification Verification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
                <p className="text-xs text-cyan-400 font-medium">{selectedCert.issuer}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedCert.details}
            </p>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Verified Credential recorded in Siddartha's portfolio profile.</span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
