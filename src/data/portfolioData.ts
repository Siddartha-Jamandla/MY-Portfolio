import { Project, Skill, Experience, Service, Certification, Testimonial } from '../types';

export const personalInfo = {
  fullName: "Siddartha Jamandla",
  primaryTitle: "AIML Engineer | B.Tech Artificial Intelligence & Machine Learning",
  secondaryTitles: [
    "AIML Engineer",
    "Full-Stack Web Developer",
    "AI & ML Undergraduate",
    "Google Student Ambassador Lead"
  ],
  phone: "8374589272",
  email: "siddarthajamandla@gmail.com",
  location: "Itikalapally, Narsampet, Warangal, Telangana – 506132",
  linkedin: "https://linkedin.com/in/siddartha-jamandla-97350b384",
  linkedinHandle: "siddartha-jamandla-97350b384",
  github: "https://github.com/Siddartha-Jamandla",
  portfolioUrl: "https://full-stack-portfolio-vuwy.bolt.host",
  tagline: "Motivated and detail-oriented Artificial Intelligence and Machine Learning undergraduate passionate about building intelligent solutions.",
  
  careerObjective: "Motivated and detail-oriented Artificial Intelligence and Machine Learning undergraduate with a strong foundation in programming, web development, and problem-solving. Seeking internships, research opportunities, and software engineering roles where I can apply AI/ML knowledge, contribute to innovative projects, and continuously enhance my technical expertise. Passionate about building intelligent solutions and pursuing a career as an AIML Engineer.",

  professionalSummary: "Aspiring Artificial Intelligence and Machine Learning Engineer with a strong academic background in Computer Science and Engineering and currently pursuing B.Tech in AI & ML through lateral entry. Skilled in Python, Java, C, C++, HTML, CSS, and web development. Experienced in designing and developing responsive web applications, with proven leadership, teamwork, and problem-solving abilities. Seeking internships, research opportunities, and software engineering roles to apply technical expertise and contribute to innovative AI-driven solutions.",

  elevatorPitch: "I design and build responsive web applications and AI tools like Career Plus and Reliable Bus Travels. Experienced in Python, Java, C++, web technologies, and AI/ML model integration.",

  bioParagraph1: "I am an AIML Engineer and student currently pursuing B.Tech in Artificial Intelligence and Machine Learning at Balaji Institute of Technology and Science, Narsampet (Affiliated with JNTUH University, 2026–2029) through lateral entry after completing my Diploma in CSE (CGPA: 8.03/10 at Warangal Institute of Technology and Science).",

  bioParagraph2: "My technical experience spans Python, C++, Java, C, HTML, CSS, and web development, alongside hands-on 6-month Industrial Training in Web Designing and Development at CADD Centre Warangal. I actively build projects, lead student tech communities, and explore cutting-edge AI tools including Copilot, Gemini, ChatGPT, and Perplexity AI.",

  metrics: [
    { label: "B.Tech AIML", value: "2nd Year", sub: "Pursuing @ Balaji Inst." },
    { label: "Diploma CSE", value: "8.03 / 10", sub: "CGPA (SBTET Affiliated)" },
    { label: "Industrial Training", value: "6 Months", sub: "Web Design @ CADD Centre" },
    { label: "Core Competency", value: "AI & Full-Stack", sub: "Python, C++, Java, Web" }
  ],

  educationList: [
    {
      degree: "B.Tech – Artificial Intelligence & Machine Learning (AIML)",
      institution: "Balaji Institute of Technology and Science, Narsampet",
      affiliation: "Affiliated with JNTUH University",
      period: "2nd Year Student (Pursuing)",
      details: "Currently pursuing 2nd year B.Tech in AIML through lateral entry, focusing on Machine Learning, Neural Networks, Python, Data Structures, and Web Development."
    },
    {
      degree: "Diploma in Computer Science and Engineering (CSE)",
      institution: "Warangal Institute of Technology and Science, Guddepad, Warangal",
      affiliation: "Affiliated with SBTET",
      period: "Completed",
      details: "CGPA: 8.03 / 10 — Core computer science foundations, programming languages (C, C++, Java, Python), web basics, and database management."
    }
  ],

  languages: ["English", "Telugu", "Hindi"],

  strengths: ["Problem Solving", "Quick Learning", "Teamwork", "Communication", "Leadership"],

  interests: [
    {
      title: "Artificial Intelligence & ML",
      description: "Building neural networks, predictive models, and intelligent AI features.",
      icon: "Sparkles"
    },
    {
      title: "Web Development",
      description: "Designing responsive, intuitive full-stack web applications and UI interfaces.",
      icon: "Layout"
    },
    {
      title: "Software Engineering & R&D",
      description: "Writing clean, efficient code in Python, C++, and Java for scalable systems.",
      icon: "Code2"
    },
    {
      title: "Community & Leadership",
      description: "Guiding team members, leading workshops, and conducting technical sessions.",
      icon: "Users"
    }
  ]
};

export const projectsData: Project[] = [
  {
    id: "reliable-bus",
    title: "Reliable Bus Travels Website",
    subtitle: "Responsive Transportation & Ticket Booking Application",
    description: "Designed and developed a responsive Bus Travels website frontend that enables users to search routes, view bus schedules, select seats, and book tickets through an intuitive interface.",
    longDescription: "Built with modern web technologies (HTML, CSS, JavaScript, Node.js) featuring user-friendly design, smooth navigation, and mobile-friendly responsiveness for an enhanced travel booking experience. Guided team members, designed & developed the Stays, About Us, and Admin Panel sections.",
    category: "Web Application",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Tailwind CSS"],
    liveDemoUrl: "https://github.com/Siddartha-Jamandla",
    githubUrl: "https://github.com/Siddartha-Jamandla",
    features: [
      "Intuitive Route Search, Bus Schedules & Ticket Booking",
      "Interactive Seat Selection Grid & Real-time Fare Calculation",
      "Designed & Developed Stays, About Us, and Admin Panel sections",
      "Mobile-Friendly Responsiveness & Smooth Navigation"
    ],
    highlight: "Featured Live Web Application",
    imageFallbackGradient: "from-blue-600 via-indigo-600 to-slate-900"
  },
  {
    id: "career-plus",
    title: "Career Plus – AI Resume Analyzer",
    subtitle: "AI-Powered Resume Evaluation & ATS Optimization Platform",
    description: "An intelligent platform designed to help students and professionals evaluate resumes, detect skill gaps, calculate ATS compatibility scores, and deliver personalized actionable feedback in real time.",
    longDescription: "Career Plus leverages automated ATS feedback algorithms and NLP models to break down resumes section-by-section. It measures keyword matching against target job descriptions, highlights formatting issues, and generates tailored resume recommendations.",
    category: "AI / Machine Learning",
    technologies: ["Python", "FastAPI", "React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    liveDemoUrl: "https://full-stack-portfolio-vuwy.bolt.host",
    githubUrl: "https://github.com/Siddartha-Jamandla",
    features: [
      "Automated ATS Score Evaluation & Skill Gap Detection",
      "AI-Driven Quality Feedback & Resume Optimization Suggestions",
      "High-Performance, Fast, and Responsive Interface"
    ],
    highlight: "Featured Flagship AI Web Application",
    imageFallbackGradient: "from-cyan-600 via-blue-600 to-indigo-900"
  }
];

export const skillsData: Skill[] = [
  // Programming Languages
  { name: "Python", category: "Backend & AI/ML", level: 92, iconName: "Terminal", description: "Scripting, machine learning logic, data processing & web backends", color: "#3776AB" },
  { name: "C++", category: "Backend & AI/ML", level: 88, iconName: "Code2", description: "Object-oriented programming, data structures & algorithm optimization", color: "#00599C" },
  { name: "Java", category: "Backend & AI/ML", level: 85, iconName: "FileCode", description: "Core Java, OOP principles, collection framework & backend logic", color: "#5382A1" },
  { name: "C", category: "Backend & AI/ML", level: 85, iconName: "Code", description: "Procedural programming, memory management & system fundamentals", color: "#A8B9CC" },

  // Web Development
  { name: "HTML5 & CSS3", category: "Frontend & 3D", level: 95, iconName: "Layout", description: "Semantic web structure, flexbox, CSS grid & modern styling", color: "#E34F26" },
  { name: "JavaScript", category: "Frontend & 3D", level: 90, iconName: "FileCode", description: "DOM manipulation, async programming, ES6+ & SPA interactivity", color: "#F7DF1E" },
  { name: "Responsive Web Design", category: "Frontend & 3D", level: 92, iconName: "Smartphone", description: "Cross-device responsiveness, mobile-first design & UI polish", color: "#38BDF8" },
  { name: "Frontend Development", category: "Frontend & 3D", level: 92, iconName: "Palette", description: "Building intuitive, user-friendly UI interfaces and components", color: "#ec4899" },

  // Tools & Technologies
  { name: "Visual Studio Code", category: "Tools & Databases", level: 95, iconName: "Code", description: "Primary IDE, debugging, extension ecosystem & version control", color: "#007ACC" },
  { name: "GitHub Copilot", category: "Tools & Databases", level: 90, iconName: "Bot", description: "AI-assisted code generation, rapid prototyping & refactoring", color: "#24292E" },
  { name: "ChatGPT & Gemini", category: "Tools & Databases", level: 92, iconName: "Sparkles", description: "AI prompt engineering, problem solving & technical research", color: "#10A37F" },
  { name: "Perplexity AI", category: "Tools & Databases", level: 88, iconName: "Search", description: "Technical research, documentation synthesis & verification", color: "#20B2AA" },

  // Core Competencies
  { name: "Problem Solving", category: "Core Competencies", level: 90, iconName: "BrainCircuit", description: "Analytical thinking, algorithmic logic & debugging complex issues", color: "#A855F7" },
  { name: "Team Collaboration", category: "Core Competencies", level: 92, iconName: "Users", description: "Working effectively in team projects & guiding fellow developers", color: "#3b82f6" },
  { name: "Leadership", category: "Core Competencies", level: 88, iconName: "Award", description: "Leading project teams, organizing events & student advocacy", color: "#f59e0b" },
  { name: "Quick Learning", category: "Core Competencies", level: 95, iconName: "Zap", description: "Rapidly mastering new programming languages, frameworks & AI tools", color: "#10b981" }
];

export const experienceData: Experience[] = [
  {
    id: "exp-cadd",
    role: "Industrial Training — Web Designing & Development",
    organization: "CADD Centre, Mulugu Road, Warangal, Telangana",
    period: "Year: 2025 (Duration: 6 Months)",
    type: "Work",
    location: "Warangal, Telangana",
    badge: "Certified Training",
    responsibilities: [
      "Completed 6 months of comprehensive hands-on industrial training in Web Designing and Development.",
      "Mastered HTML5, CSS3, JavaScript, UI design principles, and responsive layout architectures.",
      "Designed real-world web pages and interactive UI components following industry standards."
    ]
  },
  {
    id: "edu-btech",
    role: "B.Tech – Artificial Intelligence & Machine Learning (AIML)",
    organization: "Balaji Institute of Technology and Science, Narsampet",
    period: "2026 – 2029 (Expected)",
    type: "Education",
    location: "Narsampet, Warangal, Telangana",
    badge: "Lateral Entry",
    responsibilities: [
      "Currently pursuing B.Tech in AI & ML (Affiliated with JNTUH University).",
      "Focusing on Machine Learning models, Neural Networks, Python development, and Software Engineering.",
      "Google Student Ambassador lead and active open-source developer."
    ]
  },
  {
    id: "edu-diploma",
    role: "Diploma in Computer Science and Engineering (CSE)",
    organization: "Warangal Institute of Technology and Science, Guddepad, Warangal",
    period: "2023 – 2026",
    type: "Education",
    location: "Warangal, Telangana",
    badge: "CGPA: 8.03 / 10",
    responsibilities: [
      "Graduated with 8.03 / 10 CGPA under SBTET affiliation.",
      "Gained strong foundations in C, C++, Java, Data Structures, Web basics, and Computer Networks."
    ]
  }
];

export const servicesData: Service[] = [
  {
    id: "service-1",
    title: "AI & Machine Learning Engineering",
    description: "Developing intelligent AI features, predictive ML models, and integrating AI API engines into web platforms.",
    icon: "Brain",
    tags: ["Python", "Machine Learning", "AI Tools", "ChatGPT", "Gemini API"]
  },
  {
    id: "service-2",
    title: "Responsive Web Development",
    description: "Creating clean, responsive, and intuitive web applications using HTML5, CSS3, JavaScript, Node.js, and modern frameworks.",
    icon: "Globe",
    tags: ["Frontend Dev", "HTML5 & CSS3", "JavaScript", "Responsive Design", "UI Design"]
  },
  {
    id: "service-3",
    title: "Software & Systems Development",
    description: "Writing well-structured, maintainable code in Python, C++, Java, and C for desktop applications, data processing, and algorithms.",
    icon: "Code2",
    tags: ["Python", "C++", "Java", "C", "VS Code", "GitHub"]
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-1",
    title: "Web Designing and Development Training Certification",
    issuer: "CADD Centre, Mulugu Road, Warangal, Telangana",
    date: "2025 (6 Months)",
    details: "6 Months Industrial Training in Web Designing, HTML5, CSS3, JavaScript, and Responsive UI Design."
  },
  {
    id: "cert-2",
    title: "Diploma in Computer Science & Engineering (CSE)",
    issuer: "SBTET / Warangal Institute of Technology & Science",
    date: "2023 – 2026",
    details: "Graduated with 8.03 / 10 CGPA covering Computer Science fundamentals, C, C++, Java, and Web Development."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Department of Computer Science & AIML",
    role: "Academic Faculty & Team Members",
    organization: "Balaji Institute of Technology and Science",
    quote: "Siddartha is an exceptionally dedicated AIML undergraduate with strong technical skills in Python, Java, and Web Development, paired with impressive leadership and team guidance.",
    avatarText: "BIT"
  }
];
