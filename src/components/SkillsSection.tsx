import React, { useState } from 'react';
import { Cpu, Code2, Server, Database, BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';
import { SkillSphere3D } from './3d/SkillSphere3D';
import { skillsData } from '../data/portfolioData';
import { Skill, IllusionMode } from '../types';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

interface SkillsSectionProps {
  illusionMode: IllusionMode;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ illusionMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillsData[0]);

  const categories = [
    'All',
    'Frontend & 3D',
    'Backend & AI/ML',
    'Tools & Databases',
    'Core Competencies',
  ];

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Technical Expertise & Skills
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive <span className="gradient-text-blue-cyan">3D Skill Orbital Cloud</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag to rotate the 360° technology sphere or click any node to view proficiency metrics and real-world applications.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
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

        {/* 3D Sphere + Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3D Orbital Cloud */}
          <div className="lg:col-span-7">
            <SkillSphere3D
              skills={filteredSkills}
              selectedSkill={selectedSkill}
              onSelectSkill={(skill) => {
                playClickSound();
                setSelectedSkill(skill);
              }}
              mode={illusionMode}
            />
          </div>

          {/* Right Column: Selected Skill Detail Inspector */}
          <div className="lg:col-span-5 space-y-4">
            {selectedSkill ? (
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: selectedSkill.color || '#3b82f6' }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: (selectedSkill.color || '#3b82f6') + '22', border: `1px solid ${selectedSkill.color || '#3b82f6'}` }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: selectedSkill.color || '#3b82f6' }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                      <span className="text-xs text-slate-400 font-medium">{selectedSkill.category}</span>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-blue-400">{selectedSkill.level}%</span>
                </div>

                {/* Level Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span>Proficiency Index</span>
                    <span className="text-blue-400 font-semibold">
                      {selectedSkill.level >= 90 ? 'Advanced / Expert' : 'Proficient'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${selectedSkill.level}%`,
                        backgroundColor: selectedSkill.color || '#3b82f6',
                        boxShadow: `0 0 12px ${selectedSkill.color || '#3b82f6'}`,
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedSkill.description}
                </div>

                <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Applied in Siddartha's production AI & full-stack projects</span>
                </div>
              </div>
            ) : null}

            {/* Quick Skill Chips Grid */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-3 max-h-[220px] overflow-y-auto">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Technology Node:
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.map((sk) => (
                  <button
                    key={sk.name}
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playClickSound();
                      setSelectedSkill(sk);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSkill?.name === sk.name
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                        : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {sk.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
