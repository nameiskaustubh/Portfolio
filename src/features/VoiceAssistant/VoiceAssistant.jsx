/**
 * VoiceAssistant.jsx
 *
 * FIXES APPLIED:
 * #1  — No OpenAI client in browser. TTS proxied via /api/speak.
 * #3  — Blob URLs cleaned up on unmount (in useVoiceAssistant).
 * #8  — generateResponse() is now a clean intent-map, not if-else chain.
 * #7  — Extracted into feature folder: hook / profiles / knowledge / formatters.
 * #22 — aria-labels on all icon-only buttons.
 *
 * Architecture:
 *   VoiceAssistant (UI shell, ~150 lines)
 *     ├── useVoiceAssistant (all state + logic)
 *     ├── MessageBubble     (message rendering)
 *     └── VOICE_PROFILES    (config)
 */

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, X, Send, Sparkles } from 'lucide-react';
import { useVoiceAssistant } from './useVoiceAssistant';
import { VOICE_PROFILES } from './voiceProfiles';
import MessageBubble from './components/MessageBubble';

const VoiceAssistant = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [userInput,    setUserInput]    = useState('');
  const messagesEndRef = useRef(null);

  const {
    isOpen, isListening, isSpeaking, isProcessing,
    isMuted, selectedVoice, transcript, messages, error,
    setIsOpen, handleUserMessage, toggleListening,
    toggleMute, closeAssistant, switchVoice,
  } = useVoiceAssistant();

  const profile = VOICE_PROFILES[selectedVoice] ?? VOICE_PROFILES.professional;

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTextSubmit = () => {
    if (!userInput.trim()) return;
    handleUserMessage(userInput);
    setUserInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  /* ── Trigger button (when closed) ── */
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI voice assistant"
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50"
      >
        <div className="relative">
          <Sparkles className="w-7 h-7 animate-pulse" aria-hidden="true" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div
          className="absolute bottom-full mb-3 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg"
          role="tooltip"
        >
          <p className="font-semibold mb-1">AI Voice Assistant</p>
          <p className="text-xs text-slate-300">Powered by OpenAI</p>
        </div>
      </button>
    );
  }

  /* ── Full panel ── */
  return (
    <div
      role="dialog"
      aria-label="AI Voice Assistant"
      aria-modal="true"
      className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${profile.color} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur" aria-hidden="true">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold flex items-center gap-2">
              AI Assistant
              {isProcessing && (
                <span aria-live="polite" aria-label="Processing" className="flex gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1 h-1 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              )}
            </div>
            <p className="text-xs text-white/80">{profile.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings((s) => !s)}
            aria-label="Change voice personality"
            aria-pressed={showSettings}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <Settings className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute voice output' : 'Mute voice output'}
            aria-pressed={isMuted}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isMuted
              ? <VolumeX className="w-5 h-5" aria-hidden="true" />
              : <Volume2 className="w-5 h-5" aria-hidden="true" />
            }
          </button>
          <button
            onClick={closeAssistant}
            aria-label="Close assistant"
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="p-4 border-b border-slate-200 bg-slate-50" role="region" aria-label="Voice selection">
          <h2 className="text-sm font-semibold mb-3 text-slate-700">Voice Personality</h2>
          <div className="space-y-2">
            {Object.values(VOICE_PROFILES).map((v) => (
              <button
                key={v.id}
                onClick={() => { switchVoice(v.id); setShowSettings(false); }}
                aria-pressed={selectedVoice === v.id}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedVoice === v.id
                    ? `bg-gradient-to-r ${v.color} text-white shadow-md`
                    : 'bg-white hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <p className="font-medium text-sm">{v.name}</p>
                <p className={`text-xs mt-1 ${selectedVoice === v.id ? 'text-white/80' : 'text-slate-500'}`}>
                  {v.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div role="alert" className="p-3 bg-amber-50 border-b border-amber-200 text-amber-800 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
        aria-live="polite"
        aria-label="Conversation"
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} profileColor={profile.color} />
        ))}

        {/* Live transcript preview */}
        {transcript && (
          <div className="flex justify-end" aria-live="polite">
            <div className="max-w-[85%] p-3 rounded-2xl bg-slate-200 text-slate-600 italic border border-slate-300">
              <p className="text-sm">{transcript}…</p>
            </div>
          </div>
        )}

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="flex justify-start" aria-live="assertive" aria-label="Assistant is speaking">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
              <div className="flex gap-1" aria-hidden="true">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className={`w-1 h-4 bg-gradient-to-t ${profile.color} rounded-full animate-pulse`}
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-medium">Speaking…</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex gap-2 mb-3">
          <label htmlFor="va-text-input" className="sr-only">Type your message</label>
          <input
            id="va-text-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            disabled={isProcessing}
            autoComplete="off"
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
            style={{ cursor: 'text' }}
          />
          <button
            onClick={handleTextSubmit}
            disabled={isProcessing || !userInput.trim()}
            aria-label="Send message"
            className={`p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${profile.color} text-white hover:shadow-md`}
          >
            <Send className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <button
          onClick={toggleListening}
          disabled={isProcessing}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          aria-pressed={isListening}
          className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening
              ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
              : `bg-gradient-to-r ${profile.color} text-white hover:shadow-md`
          }`}
        >
          {isListening ? (
            <><MicOff className="w-5 h-5" aria-hidden="true" /><span>Stop Listening</span></>
          ) : (
            <><Mic className="w-5 h-5" aria-hidden="true" /><span>Push to Talk</span></>
          )}
        </button>

        <p className="mt-2 text-center text-xs text-slate-500">Powered by OpenAI</p>
      </div>
    </div>
  );
};

export default VoiceAssistant;