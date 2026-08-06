import React, { useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Check, User, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClickSound } from '../utils/soundEffects';

export const ProfilePhotoWidget: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  useEffect(() => {
    // Load custom profile photo from localStorage if saved
    const savedPhoto = localStorage.getItem('siddartha_profile_photo');
    if (savedPhoto) {
      setPhotoUrl(savedPhoto);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playClickSound();
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setPhotoUrl(base64Data);
        localStorage.setItem('siddartha_profile_photo', base64Data);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      playClickSound();
      setPhotoUrl(customUrlInput.trim());
      localStorage.setItem('siddartha_profile_photo', customUrlInput.trim());
      setShowUrlInput(false);
      setCustomUrlInput('');
    }
  };

  const handleRemovePhoto = () => {
    playClickSound();
    setPhotoUrl(null);
    localStorage.removeItem('siddartha_profile_photo');
  };

  return (
    <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Official Profile Photo
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          User Custom Picture
        </span>
      </div>

      {/* Avatar Display Area */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="relative group shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-900 border-2 border-blue-500/40 p-1 shadow-xl overflow-hidden flex items-center justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex flex-col items-center justify-center text-white p-2 text-center">
                <span className="text-3xl font-black tracking-wider">SJ</span>
                <span className="text-[10px] font-medium opacity-90">Siddartha Jamandla</span>
              </div>
            )}
          </div>

          <label
            htmlFor="profile-upload-input"
            className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg cursor-pointer transition-transform hover:scale-110"
            title="Upload photo from device"
          >
            <Camera className="w-4 h-4" />
          </label>
          <input
            id="profile-upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Instructions & Actions */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white">
            {photoUrl ? 'Your Real Profile Photo is Active!' : 'Upload Your Real Profile Photo'}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            Upload your exact photo from your phone or PC. Your picture will be displayed without any AI alterations!
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <label
              htmlFor="profile-upload-input"
              className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
            </label>

            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="glass-button px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
            >
              Paste Image Link
            </button>

            {photoUrl && (
              <button
                onClick={handleRemovePhoto}
                className="p-2 rounded-xl glass-button text-slate-400 hover:text-rose-400"
                title="Reset to Initials Badge"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* URL Input Form Option */}
      {showUrlInput && (
        <form onSubmit={handleUrlSubmit} className="pt-2 flex gap-2">
          <input
            type="url"
            value={customUrlInput}
            onChange={(e) => setCustomUrlInput(e.target.value)}
            placeholder="Paste direct photo image URL..."
            className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="btn-primary px-4 py-2.5 text-xs font-semibold"
          >
            Save
          </button>
        </form>
      )}

      {/* Export Tip */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
        <span>
          <strong>Pro Tip:</strong> When exporting this portfolio code, put your photo file named <code className="text-blue-300">profile.jpg</code> in the <code className="text-blue-300">/public/</code> folder!
        </span>
      </div>
    </div>
  );
};
