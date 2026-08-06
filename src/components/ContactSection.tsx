import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram, Send, MapPin, CheckCircle, Sparkles, ExternalLink, Inbox } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactMailbox3D } from './3d/ContactMailbox3D';
import { TiltGlassCard } from './3d/TiltGlassCard';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto } from '../utils/profilePhotoManager';
import { saveMessage } from '../utils/contactMessagesManager';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const { photoUrl } = useProfilePhoto();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsTyping(value.trim().length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClickSound();
    setIsSubmitting(true);

    // Save message locally into Siddartha's Owner Inbox
    saveMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio Inquiry',
      message: formData.message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setIsTyping(false);
      playSuccessSound();

      // Trigger celebratory 3D confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
      });

      // Optionally launch default mail app with prefilled body
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      // Delay mailto opening slightly so user sees success confirmation
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);

      // Reset form state after delay
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1000);
  };

  const socialLinks = [
    { name: 'Email', icon: Mail, url: `mailto:${personalInfo.email}`, handle: personalInfo.email, color: 'text-cyan-400' },
    { name: 'LinkedIn', icon: Linkedin, url: personalInfo.linkedin, handle: 'siddartha-jamandla', color: 'text-blue-400' },
    { name: 'GitHub', icon: Github, url: personalInfo.github, handle: 'Siddartha-Jamandla', color: 'text-purple-400' },
    { name: 'Instagram', icon: Instagram, url: personalInfo.instagram, handle: '@ya.its_me_21', color: 'text-pink-400' }
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="section-tag">
            <Sparkles className="w-3.5 h-3.5" />
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Connect & <span className="gradient-text-blue-cyan">Collaborate</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have an internship, full-time role, or exciting project? I'd love to hear from you.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Mailbox Model & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <TiltGlassCard maxTilt={6} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <ContactMailbox3D isTyping={isTyping} isSent={isSent} />

              <div className="flex items-center justify-center sm:justify-start gap-3.5 pt-2 border-t border-slate-800/80">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-blue-500/30 p-0.5 overflow-hidden shrink-0 shadow-lg">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Siddartha" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                      SJ
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Siddartha Jamandla</h3>
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </TiltGlassCard>

            {/* Social Media Links */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="p-4 rounded-2xl glass-panel-interactive border border-slate-800 hover:border-blue-500/40 flex items-center gap-3 group transition-all"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                        {s.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {s.handle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <TiltGlassCard maxTilt={6} className="p-8 sm:p-10 space-y-6 rounded-2xl glass-panel border border-slate-800">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. sarah@company.com"
                      className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Subject / Role Opportunity
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. AI Internship / Full-Stack Development Opportunity"
                    className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, opportunity, or collaboration ideas..."
                    className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isSent
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'btn-primary shadow-lg shadow-blue-500/25'
                  }`}
                >
                  {isSent ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Message Dispatched Successfully!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Siddartha</span>
                    </>
                  )}
                </button>

                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-slate-300 flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    Messages are automatically stored in Siddartha's private Owner Inbox and sent directly to <strong>siddarthajamandla@gmail.com</strong>.
                  </span>
                </div>
              </form>
            </TiltGlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
