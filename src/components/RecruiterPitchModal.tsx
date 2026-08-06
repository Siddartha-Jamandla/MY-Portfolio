import React from 'react';
import { X, Sparkles, Zap, CheckCircle2, Award, Calendar, MapPin, Download, Send, Briefcase, Code, ShieldCheck, Clock, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound } from '../utils/soundEffects';

interface RecruiterPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
}

export const RecruiterPitchModal: React.FC<RecruiterPitchModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenSchedule,
}) => {
  if (!isOpen) return null;

  const keyHighlights = [
    { title: 'Notice Period', value: 'Immediate Joiner (0 Days)', icon: Clock, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { title: 'Experience Level', value: 'AIML & Full-Stack Eng.', icon: Briefcase, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { title: 'Education', value: 'B.Tech AIML (2nd Year)', icon: Award, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { title: 'Certification', value: 'CADD Web Dev Certified', icon: ShieldCheck, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  ];

  const coreCompetencies = [
    'Full-Stack Architecture (React, TypeScript, Node.js, Express)',
    'Database Engineering (PostgreSQL, MySQL, MongoDB)',
    'AI Model Integration (Gemini API, LLM Prompt Engineering, RAG)',
    'Responsive & Immersive UI Design (Tailwind CSS, Three.js, Canvas)',
    'RESTful API Design, Async State Management & Clean Architecture',
    'Version Control & CI/CD Pipelines (Git, GitHub, Vite)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl glass-panel border border-blue-500/30 shadow-2xl overflow-hidden flex flex-col text-slate-100">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border-b border-blue-500/20 relative">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full glass-button text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              Recruiter Cheat Sheet (30-Second Overview)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Why Hire Siddartha Jamandla?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Summary tailored for HR Managers, Technical Recruiters & Team Leads.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* 4 Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {keyHighlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className={`p-3 rounded-2xl border ${h.color} space-y-1`}>
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{h.title}</span>
                  </div>
                  <div className="font-extrabold text-xs text-white leading-tight">{h.value}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Fit Summary */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Candidate Value Proposition</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              Siddartha is a proactive, production-focused AIML & Full-Stack Developer currently in his 2nd year of B.Tech in Artificial Intelligence & Machine Learning (Balaji Institute of Technology and Science, JNTUH) with a strong foundation in CSE (Diploma CGPA: 8.03/10) and specialized CADD web development certification. He delivers clean, maintainable code with rapid turnaround times and AI-driven features.
            </p>
          </div>

          {/* Core Competencies Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-300">
              Verified Technical Strengths:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {coreCompetencies.map((c, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Roles & Work Arrangement */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-bold text-blue-300 block mb-1">Target Roles:</span>
              <p className="text-slate-200">Full-Stack Engineer, React Developer, Frontend Specialist, Software Engineer Trainee/Associate</p>
            </div>
            <div>
              <span className="font-bold text-blue-300 block mb-1">Preferred Location:</span>
              <p className="text-slate-200">Hyderabad, India (Open to Remote / Relocation)</p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                playClickSound();
                onClose();
                onOpenResume();
              }}
              className="flex-1 sm:flex-none btn-primary px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onClose();
                onOpenSchedule();
              }}
              className="flex-1 sm:flex-none btn-secondary px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Schedule Interview</span>
            </button>
          </div>

          <a
            href={`mailto:${personalInfo.email}?subject=${encodeURIComponent('Interview Opportunity - Siddartha Jamandla')}`}
            className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Email</span>
          </a>
        </div>

      </div>
    </div>
  );
};
