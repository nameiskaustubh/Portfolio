/**
 * voiceProfiles.js
 * Centralized voice profile configuration.
 * Add new profiles here — UI picks them up automatically.
 */

export const VOICE_PROFILES = {
  professor: {
    id: 'professor',
    name: 'The Professor',
    description: 'Deep, authoritative, mentor-like',
    color: 'from-slate-900 to-slate-700',
    openaiVoice: 'onyx',
    speed: 0.9,
  },
  engineer: {
    id: 'engineer',
    name: 'The Engineer',
    description: 'Energetic, problem-solver, enthusiastic',
    color: 'from-green-900 to-green-700',
    openaiVoice: 'fable',
    speed: 1.05,
  },
  professional: {
    id: 'professional',
    name: 'The Professional',
    description: 'Neutral, polished, globally accessible',
    color: 'from-blue-900 to-blue-700',
    openaiVoice: 'nova',
    speed: 1.0,
  },
};