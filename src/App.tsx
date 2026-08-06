import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminModal } from './components/AdminModal';
import { RecruiterPitchModal } from './components/RecruiterPitchModal';
import { ScheduleMeetingModal } from './components/ScheduleMeetingModal';
import { CodeShowcaseModal } from './components/CodeShowcaseModal';
import { PortfolioChatWidget } from './components/PortfolioChatWidget';
import { BackgroundCanvas } from './components/3d/BackgroundCanvas';
import { IllusionMode } from './types';

export default function App() {
  const [illusionMode, setIllusionMode] = useState<IllusionMode>('quantum');
  const [isLightMode, setIsLightMode] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [recruiterPitchOpen, setRecruiterPitchOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [codeShowcaseOpen, setCodeShowcaseOpen] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [isLightMode]);

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div className={`min-h-screen text-slate-100 relative selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden ${isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#0b0f19]'}`}>
      {/* Background Subtle Atmospheric Lighting & Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-[-10%] left-[20%] w-[45%] h-[45%] bg-blue-600/40 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[15%] w-[45%] h-[45%] bg-indigo-600/30 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute inset-0 bg-grid-dots" />
      </div>

      {/* 3D Dynamic Interactive Particle Background Canvas */}
      <BackgroundCanvas mode={illusionMode} />

      {/* Main Glass Navigation Header */}
      <Navbar
        illusionMode={illusionMode}
        onSelectIllusionMode={setIllusionMode}
        isLightMode={isLightMode}
        onToggleLightMode={toggleLightMode}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onOpenRecruiterPitch={() => setRecruiterPitchOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        onOpenCodeShowcase={() => setCodeShowcaseOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          illusionMode={illusionMode}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenRecruiterPitch={() => setRecruiterPitchOpen(true)}
          onOpenSchedule={() => setScheduleModalOpen(true)}
          onOpenCodeShowcase={() => setCodeShowcaseOpen(true)}
        />
        <AboutSection />
        <SkillsSection illusionMode={illusionMode} />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Full Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Password-Protected Owner Admin Portal Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Recruiter Quick Pitch Cheat Sheet Modal */}
      <RecruiterPitchModal
        isOpen={recruiterPitchOpen}
        onClose={() => setRecruiterPitchOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
      />

      {/* Interview & Meeting Scheduler Modal */}
      <ScheduleMeetingModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />

      {/* Interactive Code Quality Showcase Modal */}
      <CodeShowcaseModal
        isOpen={codeShowcaseOpen}
        onClose={() => setCodeShowcaseOpen(false)}
      />

      {/* Interactive AI Assistant Floating Chat Widget */}
      <PortfolioChatWidget
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenSchedule={() => setScheduleModalOpen(true)}
        onOpenRecruiterPitch={() => setRecruiterPitchOpen(true)}
        onOpenCodeShowcase={() => setCodeShowcaseOpen(true)}
      />

      {/* Footer */}
      <Footer onOpenAdminModal={() => setAdminModalOpen(true)} />
    </div>
  );
}
