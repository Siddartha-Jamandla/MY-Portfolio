import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Menu, X, ArrowUpRight, Palette, Sun, Moon, FileText, Lock, Zap, Calendar, Code } from 'lucide-react';
import { IllusionMode } from '../types';
import { useProfilePhoto } from '../utils/profilePhotoManager';
import { getStoredMessages } from '../utils/contactMessagesManager';
import { playClickSound, playModeSwitchSound, setSoundMuted, getSoundMuted } from '../utils/soundEffects';

interface NavbarProps {
  illusionMode: IllusionMode;
  onSelectIllusionMode: (mode: IllusionMode) => void;
  isLightMode: boolean;
  onToggleLightMode: () => void;
  onOpenResumeModal: () => void;
  onOpenAdminModal: () => void;
  onOpenRecruiterPitch?: () => void;
  onOpenSchedule?: () => void;
  onOpenCodeShowcase?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  illusionMode,
  onSelectIllusionMode,
  isLightMode,
  onToggleLightMode,
  onOpenResumeModal,
  onOpenAdminModal,
  onOpenRecruiterPitch,
  onOpenSchedule,
  onOpenCodeShowcase
}) => {
  const { photoUrl } = useProfilePhoto();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(getSoundMuted());
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const msgs = getStoredMessages();
      setUnreadCount(msgs.length);
    };
    updateCount();
    window.addEventListener('siddartha_messages_updated', updateCount);
    return () => window.removeEventListener('siddartha_messages_updated', updateCount);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) playClickSound();
  };

  const modes: { id: IllusionMode; label: string; colorClass: string }[] = [
    { id: 'quantum', label: 'Quantum Cyan', colorClass: 'bg-cyan-500' },
    { id: 'matrix', label: 'Matrix Emerald', colorClass: 'bg-emerald-500' },
    { id: 'cyberpunk', label: 'Cyber Neon', colorClass: 'bg-pink-500' },
    { id: 'gold', label: 'Solar Gold', colorClass: 'bg-amber-500' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#0b0f19]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Personal Name Badge */}
        <a
          href="#hero"
          onClick={playClickSound}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden">
            {photoUrl ? (
              <img src={photoUrl} alt="Siddartha" className="w-full h-full object-cover rounded-[11px]" />
            ) : (
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center text-blue-400 font-bold text-base group-hover:scale-105 transition-transform">
                SJ
              </div>
            )}
          </div>
          <div className="leading-tight">
            <span className="text-base font-bold text-white group-hover:text-blue-400 transition-colors block">
              Siddartha Jamandla
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI & ML Engineer</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={playClickSound}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Controls (Theme, Sound, Resume, Owner Access, Contact CTA) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              onToggleLightMode();
            }}
            className="p-2 px-3 rounded-xl glass-button text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold border border-slate-800 transition-colors"
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light</span>
              </>
            )}
          </button>

          {/* Theme / Illusion Mode Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playClickSound();
                setThemeDropdownOpen(!themeDropdownOpen);
              }}
              className="p-2 px-3 rounded-xl glass-button text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-medium border border-slate-800"
              title="Change 3D Effect Mode"
            >
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              <span className="capitalize">{illusionMode}</span>
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-slate-800 p-2 shadow-2xl z-50">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 mb-1">
                  3D Visual Effect
                </div>
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      playModeSwitchSound();
                      onSelectIllusionMode(m.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                      illusionMode === m.id
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${m.colorClass}`} />
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl glass-button text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Resume Viewer CTA Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenResumeModal();
            }}
            className="glass-button px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 border border-slate-700"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume</span>
          </button>

          {/* Recruiter Quick Pitch Cheat Sheet */}
          {onOpenRecruiterPitch && (
            <button
              onClick={() => {
                playClickSound();
                onOpenRecruiterPitch();
              }}
              className="glass-button px-3 py-2 rounded-xl text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1.5 border border-blue-500/30 bg-blue-500/10"
              title="Recruiter 30-Second Cheat Sheet"
            >
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Cheat Sheet</span>
            </button>
          )}

          {/* Secret Owner Admin Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenAdminModal();
            }}
            className="p-2 rounded-xl glass-button text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-blue-500/30 transition-colors relative"
            title="Owner Portal (Inbox & Profile Photo)"
          >
            <Lock className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* CTA Contact Button */}
          <a
            href="#contact"
            onClick={playClickSound}
            className="btn-primary px-3.5 py-2 text-xs flex items-center gap-1.5"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              playClickSound();
              onToggleLightMode();
            }}
            className="p-2 rounded-xl glass-button text-slate-300"
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl glass-button text-slate-300"
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl glass-button text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-6 py-6 mt-3 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900/60 text-sm font-medium text-slate-200 hover:text-cyan-300 border border-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full py-3 rounded-xl glass-button text-xs font-bold text-white flex items-center justify-center gap-2 border border-slate-700"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>View Resume Sheet</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Owner Access Portal</span>
            </button>

            <div className="text-xs font-semibold text-slate-400">Illusion Theme:</div>
            <div className="grid grid-cols-2 gap-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playModeSwitchSound();
                    onSelectIllusionMode(m.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${
                    illusionMode === m.id
                      ? 'bg-slate-800 text-cyan-300 border-cyan-500'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${m.colorClass}`} />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-center text-sm shadow-lg shadow-cyan-500/20"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
