/**
 * knowledgeBase.js
 * Single source of truth for VoiceAssistant responses.
 * Update this when you update your portfolio — one place, not two.
 *
 * FUTURE: import project/course data directly from page data files
 * so this stays in sync automatically.
 */

export const KNOWLEDGE_BASE = {
  profile: {
    name: 'Kaustubh Deshmukh',
    role: 'Assistant Professor & Software Engineer',
    institution: 'R.H. Sapat College of Engineering, Nashik',
    email: 'kaustubhvdeshmukh2001@gmail.com',
    location: 'Nashik, Maharashtra, India',
    experience: '2+ years',
  },

  services: {
    teaching:
      'I teach C Programming and Python to first-year engineering students. I coordinate MCA major projects and industry internships, preparing students for real industry challenges.',
    engineering:
      'I build production-ready web applications using React, JavaScript, and modern frontend technologies. Services include full-stack development, architecture review, and technical consulting.',
    mentorship:
      'I provide technical mentorship for MCA students, coordinate academic projects, and guide career development for aspiring developers.',
  },

  projects: [
    {
      name: 'Mentii — Mental Health Support Platform',
      tech: ['React', 'Firebase', 'TensorFlow.js', 'Tailwind CSS'],
      description:
        'Full-stack mental health platform with CBT chatbot, sentiment analysis, and mood prediction. Serving real users with sub-2-second load time.',
      github: 'https://github.com/nameiskaustubh/mentiii',
      live: 'https://mentiii-kaustubhds-projects.vercel.app/',
    },
    {
      name: 'Paste App — Clipboard Management',
      tech: ['React', 'Redux Toolkit', 'Tailwind CSS'],
      description:
        'Redux-powered clipboard manager with instant search and localStorage persistence.',
      github: 'https://github.com/nameiskaustubh/Paste-App',
      live: 'https://paste-app-silk-alpha.vercel.app/',
    },
    {
      name: 'Weather Application',
      tech: ['React', 'OpenWeather API', 'Material-UI'],
      description:
        'Location-based weather app with 5-day forecast, geolocation, and mobile-first responsive design.',
    },
  ],

  expertise: {
    frontend: ['React', 'JavaScript ES6+', 'Tailwind CSS', 'Bootstrap', 'Redux Toolkit', 'GSAP', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'Firebase'],
    database: ['MySQL', 'MongoDB', 'Firestore'],
    languages: ['C', 'Python', 'Java', 'C++'],
  },

  contact: {
    email: 'kaustubhvdeshmukh2001@gmail.com',
    linkedin: 'https://linkedin.com/in/kaustubh-deshmukh8851',
    github: 'https://github.com/nameiskaustubh',
    responseTime: '24–48 hours',
  },
};

/**
 * Intent definitions — maps keywords to response types.
 * Add new intents here without touching response logic.
 */
export const INTENTS = [
  { id: 'services',    keywords: ['service', 'offer', 'do you do', 'provide', 'available for'] },
  { id: 'projects',    keywords: ['project', 'work', 'built', 'portfolio', 'made', 'created'] },
  { id: 'teaching',    keywords: ['teach', 'professor', 'academic', 'student', 'course', 'class'] },
  { id: 'contact',     keywords: ['contact', 'email', 'reach', 'hire', 'collaborate', 'get in touch'] },
  { id: 'background',  keywords: ['who are you', 'about you', 'background', 'experience', 'introduce'] },
  { id: 'tech',        keywords: ['technology', 'tech stack', 'skills', 'language', 'framework', 'tools'] },
  { id: 'pricing',     keywords: ['cost', 'price', 'charge', 'rate', 'fee', 'pay'] },
  { id: 'dsa',         keywords: ['dsa', 'leetcode', 'algorithm', 'data structure', 'competitive'] },
];

/** Detect intent from raw query string */
export const detectIntent = (query) => {
  const lower = query.toLowerCase();
  return INTENTS.find((i) => i.keywords.some((k) => lower.includes(k)))?.id ?? 'default';
};