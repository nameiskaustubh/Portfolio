import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, X, Send, Sparkles } from 'lucide-react';
import OpenAI from 'openai';

const VOICE_PROFILES = {
  professor: {
    id: 'professor',
    name: 'The Professor',
    description: 'Deep, authoritative, mentor-like',
    color: 'from-slate-900 to-slate-700',
    openaiVoice: 'onyx', // Deep, authoritative male voice
    pitch: 0.9,
    speed: 0.9
  },
  engineer: {
    id: 'engineer',
    name: 'The Engineer',
    description: 'Energetic, problem-solver, enthusiastic',
    color: 'from-green-900 to-green-700',
    openaiVoice: 'fable', // Energetic, British accent
    pitch: 1.0,
    speed: 1.05
  },
  professional: {
    id: 'professional',
    name: 'The Professional',
    description: 'Neutral, polished, globally accessible',
    color: 'from-blue-900 to-blue-700',
    openaiVoice: 'nova', // Professional, clear female voice
    pitch: 1.0,
    speed: 1.0
  }
};

const KNOWLEDGE_BASE = {
  profile: {
    name: "Kaustubh Deshmukh",
    role: "Assistant Professor & Software Engineer",
    institution: "R.H. Sapat College of Engineering, Nashik",
    email: "kaustubhvdeshmukh2001@gmail.com"
  },
  
  services: {
    teaching: "I teach C Programming and Python to first-year engineering students. I coordinate MCA major projects and industry internships, preparing students for real industry challenges.",
    
    engineering: "I build production-ready web applications using React, JavaScript, and modern frontend technologies. Services include full-stack development, architecture review, and technical consulting.",
    
    mentorship: "I provide technical mentorship for MCA students, coordinate academic projects, and guide career development for aspiring developers."
  },
  
  projects: {
    mentii: {
      name: "Mentii - Mental Health Support Platform",
      tech: "React, Firebase, TensorFlow.js, Tailwind CSS",
      description: "Full-stack mental health platform with CBT chatbot, sentiment analysis, and mood prediction. Serving real users with sub-2-second load time.",
      links: {
        github: "https://github.com/nameiskaustubh/mentiii",
        live: "https://mentiii-kaustubhds-projects.vercel.app/"
      }
    },
    pasteApp: {
      name: "Paste App - Clipboard Management",
      tech: "React, Redux Toolkit, Tailwind CSS",
      description: "Redux-powered clipboard manager with instant search and localStorage persistence. Production-ready CRUD application.",
      links: {
        github: "https://github.com/nameiskaustubh/Paste-App",
        live: "https://paste-app-silk-alpha.vercel.app/"
      }
    },
    weather: {
      name: "Weather Application",
      tech: "React, OpenWeather API, Material-UI",
      description: "Location-based weather app with 5-day forecast, geolocation, and mobile-first responsive design."
    }
  },
  
  expertise: {
    frontend: ["React", "JavaScript ES6+", "Tailwind CSS", "Bootstrap", "Redux Toolkit"],
    backend: ["Node.js", "Express", "Firebase"],
    database: ["MySQL", "MongoDB", "Firestore"],
    languages: ["C", "Python", "Java", "C++"]
  },
  
  philosophy: "I prepare students for industry problems, evaluate project complexity, and make technical decisions that outlast implementation. This requires understanding constraints, consequences, and what matters beyond delivery."
};

const VoiceAssistant= () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('professor');
  const [showSettings, setShowSettings] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const openaiRef = useRef(null);
  const currentAudioRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      setError('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file.');
      return;
    }

    openaiRef.current = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleWelcomeMessage();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          handleUserMessage(transcriptText);
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          addMessage('system', 'No speech detected. Please try again or use text input.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleWelcomeMessage = async () => {
    const welcomeText = getWelcomeMessage();
    addMessage('assistant', welcomeText);
    await speakWithOpenAI(welcomeText);
  };

  const getWelcomeMessage = () => {
    if (selectedVoice === 'professor') {
      return "Welcome. I'm Kaustubh Deshmukh's AI assistant. I can discuss academic work, engineering projects, or collaboration opportunities. What would you like to know?";
    } else if (selectedVoice === 'engineer') {
      return "Hey! Welcome to Kaustubh's portfolio. I'm here to talk projects, tech capabilities, or how we might work together. What brings you here?";
    } else {
      return "Hello. I'm Kaustubh Deshmukh's digital assistant. I provide information about services, projects, and collaboration. How may I assist you?";
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      addMessage('system', 'Speech recognition is not supported in your browser. Please use Chrome, Safari, or Edge, or try text input.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleUserMessage = async (text) => {
    if (!text.trim()) return;
    
    addMessage('user', text);
    setUserInput('');
    setIsProcessing(true);
    
    try {
      const response = generateResponse(text);
      addMessage('assistant', response);
      
      if (!isMuted) {
        await speakWithOpenAI(response);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      addMessage('system', 'I apologize, but I encountered an error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // Services
    if (query.includes('service') || query.includes('offer') || query.includes('do you do')) {
      return formatServicesResponse();
    }
    
    // Projects
    if (query.includes('project') || query.includes('work') || query.includes('built') || query.includes('portfolio')) {
      return formatProjectsResponse();
    }
    
    // Teaching
    if (query.includes('teach') || query.includes('professor') || query.includes('academic') || query.includes('student')) {
      return formatTeachingResponse();
    }
    
    // Contact
    if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire')) {
      return formatContactResponse();
    }
    
    // Background
    if (query.includes('who are you') || query.includes('about you') || query.includes('background') || query.includes('experience')) {
      return formatBackgroundResponse();
    }
    
    // Tech Stack
    if (query.includes('technology') || query.includes('tech stack') || query.includes('skills') || query.includes('languages')) {
      return formatTechResponse();
    }
    
    // Pricing
    if (query.includes('cost') || query.includes('price') || query.includes('charge') || query.includes('rate')) {
      return formatPricingResponse();
    }
    
    // Default
    return "I can tell you about Kaustubh's teaching experience, engineering projects, technical services, or how to get in touch. What interests you?";
  };

  const formatServicesResponse = () => {
    if (selectedVoice === 'professor') {
      return "I offer three areas of engagement: teaching C and Python programming to engineering students, coordinating MCA projects with technical mentorship, and building production-ready web applications. Each combines academic rigor with industry standards.";
    } else if (selectedVoice === 'engineer') {
      return "I work across three exciting areas: teaching students to build real systems with C and Python, guiding teams through projects from idea to deployment, and developing full-stack web apps with React. It's all about creating systems that work!";
    } else {
      return "Services include academic instruction in C and Python, MCA project coordination with technical oversight, and full-stack web application development. All engagements emphasize maintainability and long-term value.";
    }
  };

  const formatProjectsResponse = () => {
    return "Recent work includes Mentii, a mental health platform built with React and Firebase serving real users with sentiment analysis. Also developed Paste App, a clipboard manager using Redux Toolkit, and a weather application with real-time forecasting. All demonstrate production-grade architecture.";
  };

  const formatTeachingResponse = () => {
    return "I teach C Programming and Python to first-year engineers at R.H. Sapat College in Nashik. I coordinate MCA major projects and industry internships. The focus is preparing students for real industry problems, not just academic exercises.";
  };

  const formatContactResponse = () => {
    return "You can reach me at kaustubhvdeshmukh2001@gmail.com. I'm open to academic collaboration, technical consulting, and mentorship opportunities that align with teaching or production engineering.";
  };

  const formatBackgroundResponse = () => {
    return "I'm Kaustubh Deshmukh, Assistant Professor at R.H. Sapat College of Engineering in Nashik. I bridge academic teaching with production engineering, building React applications while preparing students for industry.";
  };

  const formatTechResponse = () => {
    return "Frontend: React, JavaScript, Tailwind CSS, and Redux. Backend: Node.js, Express, and Firebase. Databases: MySQL, MongoDB, and Firestore. Languages: C, Python, Java, and C++. I focus on modern web development and systems programming.";
  };

  const formatPricingResponse = () => {
    return "Pricing depends on project scope, timeline, and complexity. For academic collaboration or technical consulting, let's discuss your specific needs. Email me at kaustubhvdeshmukh2001@gmail.com to start the conversation.";
  };

  const speakWithOpenAI = async (text) => {
    if (isMuted || !openaiRef.current) return;
    
    setIsSpeaking(true);
    
    try {
      // Stop any currently playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      const profile = VOICE_PROFILES[selectedVoice];
      
      const mp3 = await openaiRef.current.audio.speech.create({
        model: "tts-1",
        voice: profile.openaiVoice,
        input: text,
        speed: profile.speed
      });

      const buffer = await mp3.arrayBuffer();
      const blob = new Blob([buffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      const audio = new Audio(url);
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        currentAudioRef.current = null;
      };
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setIsSpeaking(false);
        currentAudioRef.current = null;
      };
      
      await audio.play();
      
    } catch (error) {
      console.error('OpenAI TTS error:', error);
      setIsSpeaking(false);
      addMessage('system', 'Voice output failed. Please check your API key and try again.');
    }
  };

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }]);
  };

  const handleTextSubmit = () => {
    if (userInput.trim()) {
      handleUserMessage(userInput);
    }
  };

  const selectedProfile = VOICE_PROFILES[selectedVoice];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50"
        >
          <div className="relative">
            <Sparkles className="w-7 h-7 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-full mb-3 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            <div className="font-semibold mb-1">AI Voice Assistant</div>
            <div className="text-xs text-slate-300">Powered by OpenAI</div>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden">
          <div className={`bg-gradient-to-r ${selectedProfile.color} text-white p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold flex items-center gap-2">
                  AI Assistant
                  {isProcessing && (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/80">{selectedProfile.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
                title="Change voice"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (currentAudioRef.current && !isMuted) {
                    currentAudioRef.current.pause();
                    setIsSpeaking(false);
                  }
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (currentAudioRef.current) {
                    currentAudioRef.current.pause();
                    setIsSpeaking(false);
                  }
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="text-sm font-semibold mb-3 text-slate-700">Voice Personality</div>
              <div className="space-y-2">
                {Object.values(VOICE_PROFILES).map(voice => (
                  <button
                    key={voice.id}
                    onClick={() => {
                      setSelectedVoice(voice.id);
                      setShowSettings(false);
                      addMessage('system', `Switched to ${voice.name}`);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedVoice === voice.id
                        ? `bg-gradient-to-r ${voice.color} text-white shadow-md`
                        : 'bg-white hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className="font-medium text-sm">{voice.name}</div>
                    <div className={`text-xs mt-1 ${selectedVoice === voice.id ? 'text-white/80' : 'text-slate-500'}`}>
                      {voice.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border-b border-red-200 text-red-800 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? `bg-gradient-to-r ${selectedProfile.color} text-white`
                      : msg.role === 'system'
                      ? 'bg-yellow-50 text-yellow-900 border border-yellow-200'
                      : 'bg-white text-slate-900 border border-slate-200'
                  }`}
                >
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                  <div className={`text-xs mt-1 ${
                    msg.role === 'user' ? 'text-white/70' : 
                    msg.role === 'system' ? 'text-yellow-700' : 
                    'text-slate-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {transcript && (
              <div className="flex justify-end">
                <div className="max-w-[85%] p-3 rounded-2xl bg-slate-200 text-slate-600 italic border border-slate-300">
                  <div className="text-sm">{transcript}...</div>
                </div>
              </div>
            )}
            
            {isSpeaking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
                  <div className="flex gap-1">
                    <div className={`w-1 h-4 bg-gradient-to-t ${selectedProfile.color} rounded-full animate-pulse`} style={{ animationDelay: '0ms' }} />
                    <div className={`w-1 h-5 bg-gradient-to-t ${selectedProfile.color} rounded-full animate-pulse`} style={{ animationDelay: '150ms' }} />
                    <div className={`w-1 h-4 bg-gradient-to-t ${selectedProfile.color} rounded-full animate-pulse`} style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">Speaking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder="Type your message..."
                disabled={isProcessing}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
              />
              <button
                onClick={handleTextSubmit}
                disabled={isProcessing || !userInput.trim()}
                className={`p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${selectedProfile.color} text-white hover:shadow-md`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={toggleListening}
              disabled={isProcessing}
              className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                isListening
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
                  : `bg-gradient-to-r ${selectedProfile.color} text-white hover:shadow-md`
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5" />
                  <span>Stop Listening</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  <span>Push to Talk</span>
                </>
              )}
            </button>
            
            <div className="mt-2 text-center text-xs text-slate-500">
              Powered by OpenAI
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;