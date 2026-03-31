/**
 * Contact.jsx — Animated Contact Experience
 *
 * Fixes applied:
 * 1. SendButton: type="button" to prevent double form submission
 * 2. emailjs.init() moved to useEffect — called ONCE on mount, not on every submit
 * 3. inputStyle: cursor changed from 'none' to 'text' so cursor is visible while typing
 * 4. Added `subject` field to templateParams (template uses {{subject}} but it was never sent)
 * 5. EmailJS template "From Name" should use {{name}} not {{reply_to}} — fix in dashboard
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

/* ---- Animated input field ---- */
const MagneticField = ({ label, children, required }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: focused ? 'var(--accent)' : 'var(--text-3)',
          marginBottom: '0.6rem',
          transition: 'color 0.3s ease',
        }}
      >
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: '2px' }}>*</span>}
      </label>
      <div
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={() => setFocused(false)}
        style={{
          position: 'relative',
          borderRadius: '10px',
          border: `1px solid ${focused ? 'rgba(129,140,248,0.5)' : 'var(--border)'}`,
          background: focused ? 'rgba(129,140,248,0.04)' : 'var(--bg-1)',
          transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
          boxShadow: focused ? '0 0 0 3px rgba(129,140,248,0.08)' : 'none',
        }}
      >
        {/* Animated accent line at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            height: '2px',
            width: '100%',
            background: 'var(--accent)',
            borderRadius: '0 0 10px 10px',
            transform: focused ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {children}
      </div>
    </div>
  );
};

// FIX #3: cursor changed from 'none' to 'text' so the text cursor is visible while typing
const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: 'var(--text-1)',
  borderRadius: '10px',
  cursor: 'text',
};

/* ---- Send button with ripple ---- */
const SendButton = ({ isSubmitting, onClick }) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute; border-radius:50%; background:rgba(255,255,255,0.3);
      width:10px; height:10px;
      top:${e.clientY - rect.top - 5}px;
      left:${e.clientX - rect.left - 5}px;
      pointer-events:none; z-index:10;
    `;
    btn.appendChild(ripple);
    gsap.to(ripple, {
      scale: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });

    onClick(e);
  };

  return (
    <motion.button
      ref={btnRef}
      type="button" // FIX #1: prevents double form submission (default is type="submit")
      onClick={handleClick}
      disabled={isSubmitting}
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        width: '100%',
        padding: '1rem',
        borderRadius: '12px',
        border: 'none',
        background: isSubmitting
          ? 'var(--bg-2)'
          : 'linear-gradient(135deg, var(--accent), #6366f1)',
        color: 'var(--text-1)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: isSubmitting ? 'not-allowed' : 'pointer',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        boxShadow: isSubmitting ? 'none' : '0 4px 24px rgba(129,140,248,0.3)',
      }}
    >
      {isSubmitting ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          <span
            style={{
              width: '14px', height: '14px', borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: 'var(--text-1)',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          Sending...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </span>
      ) : (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          Send Message
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </span>
      )}
    </motion.button>
  );
};

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '', email: '', organization: '', inquiry: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    // FIX #2: emailjs.init() moved here — called ONCE on mount, not on every form submit.
    // Calling it inside handleSubmit was wasteful and could cause race conditions.
    if (window.emailjs) {
      window.emailjs.init('Q-h55re78pcIna9G1');
    }

    // GSAP form reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const emailjs = window.emailjs;
    if (!emailjs) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      inquiry: formData.inquiry,
      message: formData.message,
      // FIX #4: Added `subject` — your EmailJS template uses {{subject}} but it was
      // never included in templateParams, so the subject line was always blank.
      subject: `[${formData.inquiry || 'General'}] Message from ${formData.name}`,
      reply_to: formData.email,
      time: new Date().toLocaleString(),
    };

    // NOTE — EmailJS Dashboard Fix #5:
    // Change "From Name" in your template from {{reply_to}} to {{name}}.
    // {{reply_to}} is an email address, so the sender was showing as an email
    // instead of the person's actual name. Fix this directly in the dashboard.

    try {
      await emailjs.send(
        'service_35jfvll',
        'template_i18ju09',
        templateParams,
        'Q-h55re78pcIna9G1'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', organization: '', inquiry: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 2.5rem 6rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem' }}
        >
          <div className="label" style={{ marginBottom: '1.5rem' }}>Get in Touch</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '0.01em',
              lineHeight: 0.95,
              marginBottom: '1.5rem',
              color: 'var(--text-1)',
            }}
          >
            LET'S
            <br />
            <span style={{ color: 'var(--accent)' }}>CONNECT</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-3)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            For academic collaboration, technical work, or mentorship aligned
            with teaching, project coordination, or production engineering.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left — Form */}
          <div>
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  style={{
                    marginBottom: '1.5rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(52, 211, 153, 0.08)',
                    border: '1px solid rgba(52, 211, 153, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>✓</span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#34d399' }}>
                    Message sent. I'll respond within 24–48 hours.
                  </p>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginBottom: '1.5rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#f87171' }}>
                    Failed to send. Email directly:{' '}
                    <a href="mailto:kaustubhvdeshmukh2001@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                      kaustubhvdeshmukh2001@gmail.com
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <MagneticField label="Name" required>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    style={{ ...inputStyle }}
                  />
                </MagneticField>
                <MagneticField label="Email" required>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    style={{ ...inputStyle }}
                  />
                </MagneticField>
              </div>

              <MagneticField label="Organization">
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Institution or company"
                  style={{ ...inputStyle }}
                />
              </MagneticField>

              <MagneticField label="Inquiry Type" required>
                <select
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="" style={{ background: 'var(--bg-1)' }}>Select type</option>
                  <option value="academic"  style={{ background: 'var(--bg-1)' }}>Academic Collaboration</option>
                  <option value="technical" style={{ background: 'var(--bg-1)' }}>Technical Work</option>
                  <option value="student"   style={{ background: 'var(--bg-1)' }}>Student Mentorship</option>
                  <option value="guidance"  style={{ background: 'var(--bg-1)' }}>Professional Guidance</option>
                  <option value="other"     style={{ background: 'var(--bg-1)' }}>Other</option>
                </select>
              </MagneticField>

              <MagneticField label="Message" required>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your inquiry..."
                  rows={5}
                  required
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </MagneticField>

              <SendButton isSubmitting={isSubmitting} onClick={handleSubmit} />
            </form>
          </div>

          {/* Right — Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Direct contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.75rem',
              }}
            >
              <div className="label" style={{ marginBottom: '1.25rem' }}>Direct Contact</div>
              {[
                {
                  icon: (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'kaustubhvdeshmukh2001@gmail.com',
                  link: 'mailto:kaustubhvdeshmukh2001@gmail.com',
                },
                {
                  icon: (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  label: 'Institution',
                  value: 'R.H. Sapat College, Nashik',
                  link: null,
                },
                {
                  icon: (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Location',
                  value: 'Nashik, Maharashtra, India',
                  link: null,
                },
              ].map(({ icon, label, value, link }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-3)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {label}
                    </div>
                    {link ? (
                      <a
                        href={link}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          color: 'var(--text-2)',
                          textDecoration: 'none',
                          wordBreak: 'break-all',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-2)')}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-2)' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Professional profiles */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.75rem',
              }}
            >
              <div className="label" style={{ marginBottom: '1.25rem' }}>Professional Profiles</div>
              {[
                { platform: 'LinkedIn',  url: 'https://linkedin.com/in/kaustubh-deshmukh8851', detail: 'Professional networking' },
                { platform: 'GitHub',    url: 'https://github.com/nameiskaustubh',              detail: 'Code repositories' },
                { platform: 'LeetCode',  url: 'https://leetcode.com/afcpwRGndV',                detail: 'Problem-solving practice' },
              ].map(({ platform, url, detail }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    marginBottom: '0.5rem',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-1)',
                        marginBottom: '0.1rem',
                      }}
                    >
                      {platform}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-3)', letterSpacing: '0.06em' }}>
                      {detail}
                    </div>
                  </div>
                  <svg width="14" height="14" fill="none" stroke="var(--text-3)" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </motion.div>

            {/* Response time */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(129,140,248,0.2)',
                background: 'rgba(129,140,248,0.04)',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', marginTop: '6px', flexShrink: 0, boxShadow: '0 0 8px var(--accent)' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-3)', lineHeight: 1.6 }}>
                Typical response within{' '}
                <span style={{ color: 'var(--text-1)' }}>24–48 hours</span>.
                For urgent academic matters, mention the timeline in your message.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;