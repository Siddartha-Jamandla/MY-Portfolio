import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, Sparkles, GraduationCap, Briefcase, Award, Code2, Phone, Mail, MapPin, Linkedin, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto, DEFAULT_PROFILE_PHOTO } from '../utils/profilePhotoManager';
import { playClickSound } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { photoUrl } = useProfilePhoto();

  if (!isOpen) return null;

  const handleCopy = () => {
    playClickSound();
    const resumeText = `
SIDDARTHA JAMANDLA
AIML ENGINEER
Phone: ${personalInfo.phone}
Email: ${personalInfo.email}
Location: ${personalInfo.location}
LinkedIn: ${personalInfo.linkedin}
Portfolio: ${personalInfo.portfolioUrl}

CAREER OBJECTIVE
${personalInfo.careerObjective}

PROFESSIONAL SUMMARY
${personalInfo.professionalSummary}

EDUCATION
1. B.Tech – Artificial Intelligence & Machine Learning (AIML)
   Balaji Institute of Technology and Science, Narsampet (JNTUH) | Currently Pursuing (2nd Year Student)
2. Diploma in Computer Science and Engineering (CSE)
   Warangal Institute of Technology and Science, Guddepad, Warangal (SBTET) | CGPA: 8.03 / 10

PROJECTS
1. Reliable Bus Travels Website (HTML, CSS, JavaScript, Node.js)
   - Designed and developed a responsive Bus Travels website frontend enabling users to search routes, schedules, seats, and book tickets.
   - Built Stays, About Us, and Admin Panel sections with team leadership.
2. Career Plus – AI Resume Analyzer (Python, FastAPI, React, Tailwind)
   - Automated ATS score evaluation, keyword matching, and skill gap analysis.

INDUSTRIAL TRAINING
- Web Designing and Development Training at CADD Centre Warangal (6 Months | 2025)

TECHNICAL SKILLS
- Programming: Python, C++, Java, C, HTML, CSS
- Web Dev: Frontend Development, Responsive Web Design, UI Design
- Tools & Tech: VS Code, GitHub Copilot, ChatGPT, Google Gemini, Perplexity AI
- Strengths: Problem Solving, Quick Learning, Teamwork, Communication, Leadership
- Languages: English, Telugu, Hindi
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 space-y-8 my-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Siddartha Jamandla — Resume</h2>
              <p className="text-xs text-slate-400">Official Curriculum Vitae & Resume Sheet</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 px-3 rounded-xl glass-button text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <span>{copied ? 'Copied Text' : 'Copy Resume'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 px-3 rounded-xl btn-primary text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

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
        </div>

        {/* Formatted Resume Body */}
        <div id="printable-resume" className="space-y-8 bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
          
          {/* Header Contact Block */}
          <div className="border-b border-slate-800 pb-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {/* Photo Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-blue-500/30 p-1 overflow-hidden shrink-0 shadow-lg">
                  <img
                    src={photoUrl}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PROFILE_PHOTO;
                    }}
                  />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    SIDDARTHA JAMANDLA
                  </h1>
                  <p className="text-sm font-bold text-blue-400 tracking-wider uppercase mt-0.5">
                    AIML ENGINEER
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                  Available for Internships
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300 pt-2 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline hover:text-blue-300">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Warangal, Telangana – 506132</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300 truncate">
                  {personalInfo.linkedinHandle}
                </a>
              </div>
              <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
                <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={personalInfo.portfolioUrl} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300 truncate">
                  {personalInfo.portfolioUrl}
                </a>
              </div>
            </div>
          </div>

          {/* Career Objective & Professional Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Career Objective
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {personalInfo.careerObjective}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                Professional Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {personalInfo.professionalSummary}
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              Education
            </h3>

            <div className="space-y-3">
              {personalInfo.educationList.map((edu, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-300">{edu.institution} • <span className="text-slate-400">{edu.affiliation}</span></div>
                  <p className="text-xs text-slate-400 pt-1">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              Key Engineering Projects
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Reliable Bus Travels Website</h4>
                  <span className="text-xs font-medium text-slate-400">HTML, CSS, JavaScript, Node.js</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>Designed and developed a responsive Bus Travels website frontend enabling users to search routes, view bus schedules, select seats, and book tickets through an intuitive interface.</li>
                  <li>Built with modern web technologies featuring user-friendly design, smooth navigation, and mobile-friendly responsiveness for an enhanced travel booking experience.</li>
                  <li>Guided team members, designed & developed the Stays, About Us, and Admin Panel sections.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Career Plus – AI Resume Analyzer</h4>
                  <span className="text-xs font-medium text-slate-400">Python, FastAPI, React, Tailwind CSS</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>Evaluates resumes using automated ATS score feedback, keyword matching, and skill gap detection algorithms.</li>
                  <li>Delivers real-time recommendations and formatting suggestions to optimize resume compatibility for competitive job roles.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Industrial Training */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              Industrial Training
            </h3>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white">Web Designing and Development Training</h4>
                <span className="text-xs text-blue-400 font-semibold">6 Months | Year 2025</span>
              </div>
              <p className="text-xs text-slate-300">CADD Centre, Mulugu Road, Warangal, Telangana</p>
              <p className="text-xs text-slate-400 pt-1">Hands-on practical training in frontend architectures, HTML5, CSS3, JavaScript, and responsive web design.</p>
            </div>
          </div>

          {/* Technical Skills & Areas of Interest */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase">Programming Languages</h4>
              <div className="flex flex-wrap gap-1.5">
                {["Python", "C++", "Java", "C", "HTML", "CSS"].map(skill => (
                  <span key={skill} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[11px] font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {["VS Code", "GitHub Copilot", "ChatGPT", "Google Gemini", "Perplexity AI"].map(tool => (
                  <span key={tool} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 text-[11px] font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-blue-400 uppercase">Languages & Strengths</h4>
              <div className="text-xs text-slate-300 space-y-1">
                <div><strong className="text-white">Languages:</strong> English, Telugu, Hindi</div>
                <div><strong className="text-white">Strengths:</strong> Problem Solving, Leadership, Quick Learning</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Close */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="btn-secondary px-6 py-2.5 text-xs font-bold"
          >
            Close Resume
          </button>
        </div>

      </div>
    </div>
  );
};
