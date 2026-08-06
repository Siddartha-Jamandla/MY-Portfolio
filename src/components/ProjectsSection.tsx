import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Check, ArrowRight, Play, Eye } from 'lucide-react';
import { TiltGlassCard } from './3d/TiltGlassCard';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { ResumeAnalyzerModal } from './ResumeAnalyzerModal';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  const categories = ['All', 'AI / Machine Learning', 'Web Application', 'EdTech / Concept'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Portfolio & Featured Projects
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="gradient-text-blue-cyan">Engineering Projects</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Exploring practical AI solutions, full-stack web applications, and interactive software systems.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-105'
                  : 'glass-panel text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <TiltGlassCard
              key={project.id}
              maxTilt={8}
              className="p-6 space-y-6 flex flex-col justify-between rounded-2xl glass-panel-interactive border border-slate-800 group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Visual Header / Gradient Fallback Header */}
                <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${project.imageFallbackGradient} p-5 flex flex-col justify-between relative overflow-hidden border border-slate-700/50 shadow-inner`}>
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 text-[11px] font-semibold text-blue-400 border border-blue-500/30">
                      {project.category}
                    </span>
                    {project.highlight && (
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-md shadow-blue-500/30 uppercase tracking-wider">
                        {project.highlight}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Key Capabilities:
                  </div>
                  <ul className="space-y-1.5">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[11px] font-medium border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                {project.id === 'career-plus' ? (
                  <button
                    onClick={() => {
                      playClickSound();
                      setResumeModalOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Try AI Resume Demo</span>
                  </button>
                ) : (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="flex-1 py-2.5 rounded-xl btn-secondary text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    <span>Live Preview</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="p-2.5 rounded-xl glass-button text-slate-300 hover:text-white border border-slate-800"
                  title="View GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    playClickSound();
                    setActiveProject(project);
                  }}
                  className="p-2.5 rounded-xl glass-button text-slate-300 hover:text-blue-400 border border-slate-800"
                  title="Detailed Specs"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </TiltGlassCard>
          ))}
        </div>

      </div>

      {/* Career Plus Live Interactive Resume Analyzer Modal */}
      <ResumeAnalyzerModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* General Project Detailed Breakdown Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-panel border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {activeProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{activeProject.title}</h3>
                <p className="text-xs text-slate-400">{activeProject.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-xl glass-button text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeProject.longDescription || activeProject.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Key Architecture & Features</div>
              <ul className="space-y-2">
                {activeProject.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 text-cyan-300 text-xs font-mono border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-800">
              <a
                href={activeProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs text-center flex items-center justify-center gap-2"
              >
                <span>Launch Live Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl glass-button text-white font-bold text-xs flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
