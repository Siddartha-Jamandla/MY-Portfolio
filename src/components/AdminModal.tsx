import React, { useState, useEffect } from 'react';
import { X, Lock, Key, Upload, Camera, Trash2, Check, Sparkles, UserCheck, ShieldAlert, Image as ImageIcon, Inbox, Mail, Calendar, RefreshCw, Reply } from 'lucide-react';
import { useProfilePhoto } from '../utils/profilePhotoManager';
import { getStoredMessages, deleteMessage, clearAllMessages, StoredMessage } from '../utils/contactMessagesManager';
import { personalInfo } from '../data/portfolioData';
import { playClickSound } from '../utils/soundEffects';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { photoUrl, setPhoto } = useProfilePhoto();
  const [activeTab, setActiveTab] = useState<'photo' | 'inbox'>('photo');
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('siddartha_admin_auth') === 'true';
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [messages, setMessages] = useState<StoredMessage[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      setMessages(getStoredMessages());
    }

    const handleMessagesUpdate = () => {
      setMessages(getStoredMessages());
    };

    window.addEventListener('siddartha_messages_updated', handleMessagesUpdate);
    return () => {
      window.removeEventListener('siddartha_messages_updated', handleMessagesUpdate);
    };
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    const cleanPass = passwordInput.trim().toLowerCase();
    
    // Accept admin143 as the owner password
    if (cleanPass === 'admin143') {
      setIsAuthenticated(true);
      sessionStorage.setItem('siddartha_admin_auth', 'true');
      setErrorMsg('');
      setPasswordInput('');
    } else {
      setErrorMsg('Incorrect owner password. Access denied.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playClickSound();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setPhoto(base64Data);
        setSuccessMsg('Profile photo updated instantly across all sections!');
        setTimeout(() => setSuccessMsg(''), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      playClickSound();
      setPhoto(customUrl.trim());
      setCustomUrl('');
      setShowUrlInput(false);
      setSuccessMsg('Profile photo URL updated instantly across all sections!');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleRemovePhoto = () => {
    playClickSound();
    setPhoto(null);
    setSuccessMsg('Profile photo reset to default avatar badge.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleLogoutAdmin = () => {
    playClickSound();
    setIsAuthenticated(false);
    sessionStorage.removeItem('siddartha_admin_auth');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {isAuthenticated ? <UserCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Owner Access Portal
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {isAuthenticated ? 'Private Profile Photo Management' : 'Restricted for Siddartha Jamandla'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl glass-button text-slate-400 hover:text-white border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication State Check */}
        {!isAuthenticated ? (
          /* PASSWORD FORM */
          <form onSubmit={handlePasswordSubmit} className="space-y-5 py-2">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-400">
                <Key className="w-4 h-4" />
                <span>Owner Authentication Required</span>
              </div>
              <p>
                To protect your portfolio from unauthorized edits, changing your profile photo & reading inbox messages is restricted to Siddartha.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="owner-password-input" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Enter Owner Password:
              </label>
              <input
                id="owner-password-input"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 font-sans"
              />
              {errorMsg && (
                <div className="text-xs text-rose-400 flex items-center gap-1.5 font-medium pt-1">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl btn-primary text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Owner Portal</span>
            </button>
          </form>
        ) : (
          /* AUTHENTICATED: TABS & CONTENT */
          <div className="space-y-5 py-1">
            
            {/* Tab Navigation Controls */}
            <div className="flex rounded-xl bg-slate-900/90 p-1 border border-slate-800">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('photo');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'photo'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Profile Photo</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('inbox');
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all relative ${
                  activeTab === 'inbox'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Inbox Messages</span>
                {messages.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                    {messages.length}
                  </span>
                )}
              </button>
            </div>

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* TAB 1: PROFILE PHOTO MANAGER */}
            {activeTab === 'photo' && (
              <div className="space-y-5">
                <div className="flex flex-col items-center sm:flex-row gap-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border-2 border-blue-500/40 p-1 overflow-hidden shrink-0 shadow-xl flex items-center justify-center relative group">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={personalInfo.fullName}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex flex-col items-center justify-center text-white text-center p-2">
                        <span className="text-2xl font-black">SJ</span>
                        <span className="text-[10px] font-medium opacity-90">Siddartha Jamandla</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left flex-1">
                    <h4 className="text-sm font-bold text-white">
                      {photoUrl ? 'Custom Profile Photo Active' : 'Default Avatar Badge Active'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Upload your image or paste a link. It updates everywhere instantly!
                    </p>
                    <div className="text-[11px] font-semibold text-blue-400">
                      Hidden from public view (Owner protected)
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      htmlFor="admin-file-upload-input"
                      className="btn-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload From Device</span>
                    </label>
                    <input
                      id="admin-file-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <button
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="glass-button py-3 rounded-xl text-xs font-bold text-slate-200 hover:text-white flex items-center justify-center gap-2 border border-slate-700"
                    >
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      <span>Paste Image Link</span>
                    </button>
                  </div>

                  {showUrlInput && (
                    <form onSubmit={handleUrlSubmit} className="pt-1 flex gap-2">
                      <input
                        type="url"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="Paste image URL (https://...)"
                        className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="btn-primary px-4 py-3 text-xs font-semibold"
                      >
                        Save URL
                      </button>
                    </form>
                  )}

                  {photoUrl && (
                    <button
                      onClick={handleRemovePhoto}
                      className="w-full py-2.5 rounded-xl glass-button text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Reset / Remove Custom Photo</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: INBOX MESSAGES MANAGER */}
            {activeTab === 'inbox' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Received Portfolio Inquiries ({messages.length})</span>
                  </div>

                  {messages.length > 0 && (
                    <button
                      onClick={() => {
                        playClickSound();
                        clearAllMessages();
                        setMessages([]);
                      }}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {messages.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <Inbox className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs font-semibold text-slate-300">No Messages Received Yet</p>
                    <p className="text-[11px] text-slate-400">
                      When recruiters or clients use your portfolio's "Send Message" form, their messages will appear right here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-left relative group hover:border-blue-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2">
                          <div>
                            <span className="text-xs font-bold text-white block">{m.name}</span>
                            <a
                              href={`mailto:${m.email}`}
                              className="text-[11px] font-semibold text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              <span>{m.email}</span>
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {m.timestamp}
                            </span>
                            <button
                              onClick={() => {
                                playClickSound();
                                deleteMessage(m.id);
                                setMessages(getStoredMessages());
                              }}
                              className="p-1 rounded text-slate-500 hover:text-rose-400"
                              title="Delete message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs font-bold text-slate-200">
                          Subject: {m.subject}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50 whitespace-pre-wrap">
                          {m.message}
                        </p>

                        <div className="pt-1 flex justify-end">
                          <a
                            href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + m.subject)}&body=${encodeURIComponent(`Hi ${m.name},\n\nThank you for reaching out through my portfolio!\n\nBest regards,\nSiddartha Jamandla`)}`}
                            className="btn-primary px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1.5"
                          >
                            <Reply className="w-3 h-3" />
                            <span>Reply via Email</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Logout / Exit Admin */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handleLogoutAdmin}
                className="text-xs text-slate-400 hover:text-slate-200 underline"
              >
                Lock Owner Portal
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="btn-secondary px-5 py-2 text-xs font-bold"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
