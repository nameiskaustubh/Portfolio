/**
 * MessageBubble.jsx
 * Individual chat message. Handles user / assistant / system variants.
 */

import React from 'react';

const MessageBubble = ({ message, profileColor }) => {
  const { role, content, timestamp } = message;

  const isUser      = role === 'user';
  const isSystem    = role === 'system';
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
          isUser
            ? `bg-gradient-to-r ${profileColor} text-white`
            : isSystem
            ? 'bg-yellow-50 text-yellow-900 border border-yellow-200'
            : 'bg-white text-slate-900 border border-slate-200'
        }`}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <time
          className={`text-xs mt-1 block ${
            isUser ? 'text-white/70' : isSystem ? 'text-yellow-700' : 'text-slate-500'
          }`}
          dateTime={timestamp.toISOString()}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  );
};

export default React.memo(MessageBubble);