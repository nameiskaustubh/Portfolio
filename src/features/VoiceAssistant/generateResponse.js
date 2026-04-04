/**
 * generateResponse.js
 * Pure functions — no side effects, fully testable.
 * Maps intent IDs → formatted response strings.
 *
 * Each formatter accepts `voice` (profile ID) so responses
 * adapt their tone automatically.
 */

import { KNOWLEDGE_BASE, detectIntent } from './knowledgeBase';

const { profile, services, projects, expertise, contact } = KNOWLEDGE_BASE;

/* ── Individual formatters ──────────────────────────────────── */

const formatServices = (voice) => {
  if (voice === 'professor') {
    return `I offer three areas of engagement: teaching ${profile.institution.split(',')[0]} students C and Python programming, coordinating MCA projects with technical mentorship, and building production-ready web applications. Each combines academic rigor with industry standards.`;
  }
  if (voice === 'engineer') {
    return `Three exciting areas! Teaching real systems thinking with C and Python, guiding teams from idea to deployment, and building full-stack apps with React and Firebase. It's all about creating things that actually work in production.`;
  }
  return `Services include academic instruction in C and Python, MCA project coordination, and full-stack web application development. All engagements emphasise maintainability and long-term value.`;
};

const formatProjects = () => {
  const featured = projects.slice(0, 2);
  return `Recent work includes ${featured.map((p) => `${p.name}, built with ${p.tech.slice(0, 3).join(', ')}`).join('; and ')}. Both are deployed and serving real users. You can explore all projects in the Work section of this portfolio.`;
};

const formatTeaching = () =>
  `I teach C Programming and Python to first-year engineers at ${profile.institution}. I also coordinate MCA major projects and industry internships. The focus is preparing students for real industry problems — not just academic exercises.`;

const formatContact = () =>
  `Best way to reach me is ${contact.email}. I'm open to academic collaboration, technical consulting, and mentorship. Typical response time is ${contact.responseTime}.`;

const formatBackground = () =>
  `I'm ${profile.name}, ${profile.role} at ${profile.institution}. I bridge academic teaching with production engineering — building React applications while preparing the next generation of engineers.`;

const formatTech = () => {
  const { frontend, backend, database, languages } = expertise;
  return `Frontend: ${frontend.slice(0, 5).join(', ')}. Backend: ${backend.join(', ')}. Databases: ${database.join(', ')}. Core languages: ${languages.join(', ')}. My focus is modern web development and systems programming.`;
};

const formatPricing = () =>
  `Project pricing depends on scope, timeline, and complexity. For academic collaboration or consulting, let's discuss your specific needs directly. Email me at ${contact.email} to start the conversation.`;

const formatDSA = () =>
  `I practice DSA daily on LeetCode to stay sharp in the exact concepts I teach. It reinforces algorithmic thinking, improves my production code quality, and lets me model continuous learning for my students.`;

const formatDefault = () =>
  `I can tell you about my teaching experience, engineering projects, technical skills, or how to get in touch. What would you like to know?`;

/* ── Response map — O(1) lookup, no if-else chain ───────────── */
const RESPONSE_MAP = {
  services:   formatServices,
  projects:   () => formatProjects(),
  teaching:   () => formatTeaching(),
  contact:    () => formatContact(),
  background: () => formatBackground(),
  tech:       () => formatTech(),
  pricing:    () => formatPricing(),
  dsa:        () => formatDSA(),
  default:    () => formatDefault(),
};

/**
 * generateResponse
 * @param {string} userQuery - raw user input
 * @param {string} voice     - active voice profile ID
 * @returns {string}         - formatted response string
 */
export const generateResponse = (userQuery, voice = 'professional') => {
  const intent = detectIntent(userQuery);
  const formatter = RESPONSE_MAP[intent] ?? RESPONSE_MAP.default;
  // Services formatter uses voice for tone; others are voice-agnostic
  return formatter(voice);
};

/**
 * getWelcomeMessage
 * @param {string} voice - active voice profile ID
 * @returns {string}
 */
export const getWelcomeMessage = (voice) => {
  const messages = {
    professor: `Welcome. I'm ${profile.name}'s AI assistant. I can discuss academic work, engineering projects, or collaboration opportunities. What would you like to know?`,
    engineer:  `Hey! Welcome to ${profile.name.split(' ')[0]}'s portfolio. I'm here to talk projects, tech capabilities, or how we might work together. What brings you here?`,
    professional: `Hello. I'm ${profile.name}'s digital assistant. I provide information about services, projects, and collaboration. How may I assist you?`,
  };
  return messages[voice] ?? messages.professional;
};