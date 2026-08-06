import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Sparkles, Send, X, User, Volume2, VolumeX, RotateCcw, 
  Calendar, Download, Zap, Code, Mail, Check, Copy, ArrowRight,
  Briefcase, GraduationCap, Cpu, Layers, ShieldCheck, Clock
} from 'lucide-react';
import { personalInfo, educationData, skillsData, projectsData } from '../data/portfolioData';
import { playClickSound, playSuccessSound } from '../utils/soundEffects';

interface PortfolioChatWidgetProps {
  onOpenResume?: () => void;
  onOpenSchedule?: () => void;
  onOpenRecruiterPitch?: () => void;
  onOpenCodeShowcase?: () => void;
}

type AssistantMode = 'recruiter' | 'tech' | 'general';

interface ActionButton {
  label: string;
  icon: 'schedule' | 'cheat' | 'resume' | 'code' | 'contact';
  action: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; type: 'schedule' | 'cheat' | 'resume' | 'code' | 'contact' }[];
}

export const PortfolioChatWidget: React.FC<PortfolioChatWidgetProps> = ({
  onOpenResume,
  onOpenSchedule,
  onOpenRecruiterPitch,
  onOpenCodeShowcase
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [activeMode, setActiveMode] = useState<AssistantMode>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! 👋 I'm Siddartha's Portfolio AI Assistant v2.0.\n\nI can answer questions about Siddartha Jamandla's B.Tech in AIML (Currently in 2nd Year), Diploma in CSE (8.03 CGPA), CADD web certification, full-stack & AI skills, top projects, or schedule an interview directly with him!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '⚡ Recruiter Cheat Sheet', type: 'cheat' },
        { label: '📅 Book Interview', type: 'schedule' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Speech Synthesis
  const speakText = (text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Clean text of markdown
    const cleanText = text.replace(/[*_#•`]/g, '').replace(/\n+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 250));
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleActionClick = (type: 'schedule' | 'cheat' | 'resume' | 'code' | 'contact') => {
    playClickSound();
    if (type === 'schedule' && onOpenSchedule) onOpenSchedule();
    if (type === 'cheat' && onOpenRecruiterPitch) onOpenRecruiterPitch();
    if (type === 'resume' && onOpenResume) onOpenResume();
    if (type === 'code' && onOpenCodeShowcase) onOpenCodeShowcase();
    if (type === 'contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickPrompts = [
    { label: '⚡ 30s Cheat Sheet', query: 'Give me the 30-second recruiter cheat sheet' },
    { label: '⏱️ Notice Period?', query: 'What is Siddartha\'s notice period and availability?' },
    { label: '🎓 Degree & CGPA', query: 'Tell me about Siddartha\'s education and CGPA' },
    { label: '🚀 Top Projects', query: 'What are Siddartha\'s top projects?' },
    { label: '💻 Full-Stack Skills', query: 'What is his core technical skill stack?' },
    { label: '📅 Schedule Interview', query: 'How can I schedule an interview or hire him?' }
  ];

  const generateAIAnswer = (query: string, mode: AssistantMode) => {
    const q = query.toLowerCase();
    let text = '';
    let actions: { label: string; type: 'schedule' | 'cheat' | 'resume' | 'code' | 'contact' }[] = [];

    // Notice Period / Availability
    if (q.includes('notice') || q.includes('available') || q.includes('join') || q.includes('start') || q.includes('hire')) {
      text = `⚡ **Immediate Joiner (0 Days Notice Period)**\n\nSiddartha is ready to start immediately without any waiting period. He is actively seeking Full-Stack Software Engineer, React Developer, or Software Engineer Associate roles.\n\n📍 **Location:** Hyderabad, India (Open to Remote & Relocation)`;
      actions = [
        { label: '📅 Schedule Interview Slot', type: 'schedule' },
        { label: '⚡ Recruiter Cheat Sheet', type: 'cheat' }
      ];
    }
    // Education & Qualification
    else if (q.includes('education') || q.includes('cgpa') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('cadd') || q.includes('diploma') || q.includes('aiml')) {
      text = `🎓 **Academic & Professional Qualifications:**\n\n• **B.Tech in Artificial Intelligence & Machine Learning (AIML)**\nBalaji Institute of Technology and Science, Narsampet (Affiliated with JNTUH)\nStatus: **Currently Pursuing (2nd Year AIML Student)**\n\n• **Diploma in Computer Science & Engineering (CSE)**\nWarangal Institute of Technology and Science\nCGPA: **8.03 / 10**\n\n• **Industrial Web Development Certification**\nCADD Centre, Warangal (6 Months Training)`;
      actions = [
        { label: '📄 View Official Resume PDF', type: 'resume' },
        { label: '⚡ Recruiter Cheat Sheet', type: 'cheat' }
      ];
    }
    // Technical Skills
    else if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('node') || q.includes('database') || q.includes('python')) {
      if (mode === 'tech') {
        text = `💻 **Deep-Dive Technical Stack:**\n\n• **AIML & Data Science:** Python, Scikit-Learn, Pandas, NumPy, Prompt Engineering, Gemini API\n• **Frontend Architecture:** React 18, TypeScript, Tailwind CSS, Three.js (WebGL), Vite\n• **Backend & APIs:** Node.js, Express.js, RESTful Microservices, C, C++, Java\n• **Databases & Tooling:** MySQL, PostgreSQL, MongoDB, Git, GitHub, Postman, Linux`;
      } else {
        text = `🛠️ **Core Technology Stack:**\n\n• **AIML & Languages:** Python, Java, C, C++, Gemini API\n• **Frontend:** React, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript\n• **Backend & Databases:** Node.js, Express, MySQL, PostgreSQL, MongoDB\n• **Developer Tools:** Git, GitHub, Vite, Postman, Linux`;
      }
      actions = [
        { label: '💻 Inspect Code Showcase', type: 'code' },
        { label: '⚡ Recruiter Cheat Sheet', type: 'cheat' }
      ];
    }
    // Projects
    else if (q.includes('project') || q.includes('built') || q.includes('bus') || q.includes('career') || q.includes('portfolio') || q.includes('app')) {
      text = `🚀 **Featured Engineered Applications:**\n\n1. **Reliable Bus Travels Website** - Responsive ticket booking & seat reservation portal built with Node.js, HTML, CSS, JavaScript & Tailwind.\n2. **Career Plus Platform** - Guidance and career roadmap tool for tech students.\n3. **Interactive AIML 3D Portfolio** - Immersive dynamic portfolio featuring WebGL particles and AI assistant integration.`;
      actions = [
        { label: '💻 Inspect Code Showcase', type: 'code' },
        { label: '📄 Download Resume', type: 'resume' }
      ];
    }
    // Recruiter Pitch / Cheat Sheet
    else if (q.includes('cheat') || q.includes('why hire') || q.includes('overview') || q.includes('summary') || q.includes('pitch')) {
      text = `🌟 **Why Siddartha Jamandla is a High-Impact Candidate:**\n\n• **Academic Background:** 2nd Year B.Tech AIML student & Diploma in CSE (8.03/10 CGPA).\n• **Industry Training:** 6 Months Web Development Industrial Certification from CADD Centre.\n• **Full-Stack & AIML Skills:** Proficient in Python, Java, React, Node.js, and LLM integrations.\n• **Leadership:** Google Student Ambassador Lead & active tech community builder.`;
      actions = [
        { label: '⚡ Open 30s Cheat Sheet Modal', type: 'cheat' },
        { label: '📅 Schedule Interview', type: 'schedule' }
      ];
    }
    // Contact & Interview
    else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('schedule') || q.includes('reach') || q.includes('interview')) {
      text = `📧 **Direct Contact Channels:**\n\n• **Email:** siddarthajamandla@gmail.com\n• **Phone:** +91 8374589272\n• **Location:** Warangal / Hyderabad, Telangana, India\n• **LinkedIn:** linkedin.com/in/siddartha-jamandla-97350b384\n• **GitHub:** github.com/Siddartha-Jamandla\n\nYou can also pick a meeting time directly on his interview scheduler!`;
      actions = [
        { label: '📅 Schedule Interview Slot', type: 'schedule' },
        { label: '✉️ Send Direct Message', type: 'contact' }
      ];
    }
    // Default fallback
    else {
      text = `Siddartha Jamandla is an AIML & Full-Stack Developer currently in 2nd year B.Tech AIML at Balaji Inst. of Tech & Science (Diploma in CSE: 8.03 CGPA, CADD Certified).\n\nFeel free to ask about his AIML projects, technical skills, certifications, or book a meeting with him directly!`;
      actions = [
        { label: '⚡ Recruiter Cheat Sheet', type: 'cheat' },
        { label: '📅 Schedule Interview', type: 'schedule' }
      ];
    }

    return { text, actions };
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    playClickSound();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { text, actions } = generateAIAnswer(q, activeMode);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      playSuccessSound();
      speakText(text);
    }, 550);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playSuccessSound();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    playClickSound();
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: `Hello! 👋 I'm Siddartha's Portfolio AI Assistant v2.0.\n\nI can answer questions about Siddartha Jamandla's B.Tech degree, CADD web certification, full-stack skills, top projects, or schedule an interview directly with him!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: '⚡ Recruiter Cheat Sheet', type: 'cheat' },
          { label: '📅 Book Interview', type: 'schedule' }
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            playClickSound();
            setIsOpen(!isOpen);
          }}
          className="relative p-4 rounded-full btn-primary shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group border-2 border-blue-400/40"
          title="Ask Siddartha's AI Portfolio Assistant"
        >
          <div className="relative">
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
          </div>
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Drawer Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[94vw] sm:w-[420px] max-h-[600px] h-[560px] rounded-3xl glass-panel border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-fadeIn text-slate-100">
          
          {/* Header */}
          <div className="p-3.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Portfolio AI Assistant v2.0
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Smart AI companion for Siddartha</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Read Aloud Toggle */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsVoiceEnabled(!isVoiceEnabled);
                }}
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  isVoiceEnabled 
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title={isVoiceEnabled ? 'Voice output enabled' : 'Turn voice output on'}
              >
                {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Reset Chat */}
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Assistant Persona Mode Selector Bar */}
          <div className="px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-semibold">AI Persona Mode:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveMode('general');
                }}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  activeMode === 'general' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ✨ Overview
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveMode('recruiter');
                }}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  activeMode === 'recruiter' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                💼 HR / Recruiter
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveMode('tech');
                }}
                className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                  activeMode === 'tech' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🛠️ Tech Lead
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3 rounded-2xl space-y-2 relative group ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>

                  {/* Interactive Action Chips inside AI responses */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="pt-1.5 flex flex-wrap gap-1.5 border-t border-slate-800/80">
                      {m.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act.type)}
                          className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/35 border border-blue-500/40 text-blue-300 hover:text-white font-bold text-[10px] flex items-center gap-1 transition-all"
                        >
                          {act.type === 'schedule' && <Calendar className="w-3 h-3 text-amber-400" />}
                          {act.type === 'cheat' && <Zap className="w-3 h-3 text-blue-400" />}
                          {act.type === 'resume' && <Download className="w-3 h-3 text-emerald-400" />}
                          {act.type === 'code' && <Code className="w-3 h-3 text-indigo-400" />}
                          {act.type === 'contact' && <Mail className="w-3 h-3 text-purple-400" />}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[9px] opacity-70 pt-0.5">
                    {m.sender === 'ai' ? (
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="hover:text-blue-300 flex items-center gap-0.5"
                        title="Copy answer"
                      >
                        {copiedId === m.id ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    ) : (
                      <span></span>
                    )}
                    <span>{m.timestamp}</span>
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-slate-500 ml-1">Analyzing Siddartha's profile...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300 hover:text-blue-300 hover:border-blue-500/40 whitespace-nowrap shrink-0 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, CGPA, degree, notice period..."
              className="flex-1 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl btn-primary disabled:opacity-50 text-white shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
