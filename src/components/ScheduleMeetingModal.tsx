import React, { useState } from 'react';
import { X, Calendar, Clock, Video, User, Building, Mail, CheckCircle, Sparkles, Send, PhoneCall } from 'lucide-react';
import { saveMessage } from '../utils/contactMessagesManager';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    meetingType: 'Technical Interview (30 min)',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '11:00 AM IST',
    notes: ''
  });

  if (!isOpen) return null;

  const timeSlots = [
    '10:00 AM IST',
    '11:30 AM IST',
    '02:00 PM IST',
    '04:00 PM IST',
    '06:00 PM IST',
    '08:00 PM IST'
  ];

  const meetingTypes = [
    'Technical Interview (30 min)',
    'HR / Talent Screening (15 min)',
    'Freelance / Client Project Discussion',
    'General Networking Call'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    const summaryMsg = `[SCHEDULED INTERVIEW REQUEST]\nCompany: ${formData.company || 'N/A'}\nFormat: ${formData.meetingType}\nRequested Date: ${formData.date}\nTime Slot: ${formData.timeSlot}\n\nAdditional Notes:\n${formData.notes || 'No extra notes provided.'}`;

    // Save directly to Siddartha's Owner Inbox
    saveMessage({
      name: formData.name,
      email: formData.email,
      subject: `[Interview Request] ${formData.meetingType} - ${formData.company || formData.name}`,
      message: summaryMsg
    });

    playSuccessSound();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Schedule an Interview / Call</h3>
              <p className="text-xs text-slate-400">Pick a time to connect with Siddartha</p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
              setStep('form');
            }}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            
            {/* Recruiter / Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Work Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Company / Organization</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Google, TechCorp, Freelance Project"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Call Purpose */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Meeting Topic / Format</label>
              <select
                value={formData.meetingType}
                onChange={e => setFormData({ ...formData, meetingType: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {meetingTypes.map((t, idx) => (
                  <option key={idx} value={t} className="bg-slate-900 text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Preferred Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Time Slot</label>
                <select
                  value={formData.timeSlot}
                  onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {timeSlots.map((s, idx) => (
                    <option key={idx} value={s} className="bg-slate-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Job Description / Notes (Optional)</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention job role, salary range, or tech stack..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm & Book Interview</span>
            </button>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-white">Interview Invite Sent!</h4>
              <p className="text-xs text-slate-300">
                Siddartha has received your booking details for <strong>{formData.date} at {formData.timeSlot}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 text-left">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Video className="w-4 h-4 text-blue-400" />
                <span>Format: Google Meet / Virtual Call</span>
              </div>
              <div>Topic: {formData.meetingType}</div>
              <div>Contact Email: {formData.email}</div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onClose();
                setStep('form');
              }}
              className="btn-primary w-full py-3 rounded-xl text-xs font-bold"
            >
              Done / Return to Portfolio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
