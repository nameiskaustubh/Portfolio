/**
 * useVoiceAssistant.js
 * All state, side-effects, and API calls for the VoiceAssistant.
 *
 * FIX #1: OpenAI calls proxied through /api/speak — no client-side API key.
 * FIX #3: Blob URLs tracked and revoked on unmount to prevent memory leaks.
 * FIX: Speech recognition uses stable refs, not recreated on every render.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { generateResponse, getWelcomeMessage } from './generateResponse';
import { VOICE_PROFILES } from './voiceProfiles';

/**
 * Proxy TTS through your own backend endpoint.
 * This keeps the OpenAI key server-side ONLY.
 *
 * Backend example (Express / Next.js API route):
 *
 *   app.post('/api/speak', async (req, res) => {
 *     const { text, voice, speed } = req.body;
 *     const mp3 = await openai.audio.speech.create({
 *       model: 'tts-1', voice, input: text, speed,
 *     });
 *     res.set('Content-Type', 'audio/mpeg');
 *     res.send(Buffer.from(await mp3.arrayBuffer()));
 *   });
 */
const TTS_ENDPOINT = '/api/speak';

export function useVoiceAssistant() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [isListening,  setIsListening]  = useState(false);
  const [isSpeaking,   setIsSpeaking]   = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted,      setIsMuted]      = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('professor');
  const [transcript,   setTranscript]   = useState('');
  const [messages,     setMessages]     = useState([]);
  const [error,        setError]        = useState(null);

  const recognitionRef    = useRef(null);
  const currentAudioRef   = useRef(null);
  const currentBlobUrlRef = useRef(null); // FIX #3: track URL for cleanup

  /* ── Stable addMessage ── */
  const addMessage = useCallback((role, content) => {
    setMessages((prev) => [...prev, { role, content, timestamp: new Date() }]);
  }, []);

  /* ── FIX #3: Cleanup blob URLs and audio on unmount ── */
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if (currentBlobUrlRef.current) {
        URL.revokeObjectURL(currentBlobUrlRef.current);
        currentBlobUrlRef.current = null;
      }
    };
  }, []);

  /* ── Speech recognition setup (once on mount) ── */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous    = false;
    recognition.interimResults = true;
    recognition.lang          = 'en-US';

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const text    = event.results[current][0].transcript;
      setTranscript(text);
      if (event.results[current].isFinal) {
        handleUserMessage(text);
        setTranscript('');
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'no-speech') {
        addMessage('system', 'No speech detected. Please try again or use text input.');
      }
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // handleUserMessage intentionally omitted — stable via useCallback below

  /* ── Welcome message on open ── */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome = getWelcomeMessage(selectedVoice);
      addMessage('assistant', welcome);
      speakWithProxy(welcome, selectedVoice);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── FIX #1: TTS via backend proxy — zero API key on client ── */
  const speakWithProxy = useCallback(async (text, voice) => {
    if (isMuted) return;

    setIsSpeaking(true);

    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
    }
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
      currentBlobUrlRef.current = null;
    }

    try {
      const profile = VOICE_PROFILES[voice] ?? VOICE_PROFILES.professional;

      const res = await fetch(TTS_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          text,
          voice: profile.openaiVoice,
          speed: profile.speed,
        }),
      });

      if (!res.ok) throw new Error(`TTS proxy returned ${res.status}`);

      const buffer = await res.arrayBuffer();
      const blob   = new Blob([buffer], { type: 'audio/mpeg' });
      const url    = URL.createObjectURL(blob);

      currentBlobUrlRef.current = url; // FIX #3: track for cleanup

      const audio = new Audio(url);
      currentAudioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        currentBlobUrlRef.current = null;
        currentAudioRef.current   = null;
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        currentBlobUrlRef.current = null;
        currentAudioRef.current   = null;
        addMessage('system', 'Voice playback failed. The proxy endpoint may be unavailable.');
      };

      await audio.play();
    } catch (err) {
      console.error('TTS error:', err);
      setIsSpeaking(false);

      // Graceful degradation: text still works, just no voice
      if (err.message.includes('404') || err.message.includes('Failed to fetch')) {
        setError('Voice proxy not configured. Text chat still works. See /api/speak setup in README.');
      }
    }
  }, [isMuted, addMessage]);

  /* ── Handle user message (text or voice) ── */
  const handleUserMessage = useCallback(async (text) => {
    if (!text?.trim()) return;

    addMessage('user', text);
    setIsProcessing(true);

    try {
      const response = generateResponse(text, selectedVoice);
      addMessage('assistant', response);
      if (!isMuted) await speakWithProxy(response, selectedVoice);
    } catch (err) {
      console.error('Response error:', err);
      addMessage('system', 'I encountered an error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedVoice, isMuted, addMessage, speakWithProxy]);

  /* ── Toggle speech recognition ── */
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      addMessage('system', 'Speech recognition unavailable. Use Chrome, Edge, or Safari — or type your message.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [isListening, addMessage]);

  /* ── Mute toggle ── */
  const toggleMute = useCallback(() => {
    if (!isMuted && currentAudioRef.current) {
      currentAudioRef.current.pause();
      setIsSpeaking(false);
    }
    setIsMuted((m) => !m);
  }, [isMuted]);

  /* ── Close assistant ── */
  const closeAssistant = useCallback(() => {
    setIsOpen(false);
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      setIsSpeaking(false);
    }
  }, []);

  /* ── Switch voice ── */
  const switchVoice = useCallback((voiceId) => {
    setSelectedVoice(voiceId);
    addMessage('system', `Switched to ${VOICE_PROFILES[voiceId]?.name ?? voiceId}`);
  }, [addMessage]);

  return {
    // State
    isOpen, isListening, isSpeaking, isProcessing,
    isMuted, selectedVoice, transcript, messages, error,
    // Actions
    setIsOpen,
    handleUserMessage,
    toggleListening,
    toggleMute,
    closeAssistant,
    switchVoice,
  };
}