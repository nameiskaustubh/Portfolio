import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const appropriateInquiries = [
    {
      category: "Academic Collaboration",
      examples: "Curriculum development, guest lectures, technical workshops"
    },
    {
      category: "Technical Work",
      examples: "Web application development, architecture review, code assessment"
    },
    {
      category: "Student Mentorship",
      examples: "Industry guidance for student teams, project evaluation"
    },
    {
      category: "Professional Guidance",
      examples: "Career mentorship, technical decision consultation"
    }
  ];

  const contactInfo = [
    {
      label: "Email",
      value: "kaustubhvdeshmukh2001@gmail.com",
      link: "mailto:kaustubhvdeshmukh2001@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Institution",
      value: "R.H. Sapat College of Engineering, Nashik",
      link: null,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      label: "Location",
      value: "Nashik, Maharashtra, India",
      link: null,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const professionalLinks = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/kaustubh-deshmukh8851",
      purpose: "Professional networking"
    },
    {
      platform: "GitHub",
      url: "https://github.com/nameiskaustubh",
      purpose: "Code repositories"
    },
    {
      platform: "LeetCode",
      url: "https://leetcode.com/afcpwRGndV",
      purpose: "Problem-solving practice"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = "service_35jfvll";
    const templateId = "template_i18ju09";
    const publicKey = "Q-h55re78pcIna9G1";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      inquiry: formData.inquiry,
      message: formData.message,
      reply_to: formData.email,
      time: new Date().toLocaleString()
    };

    const emailjs = window.emailjs;
    if (!emailjs) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', organization: '', inquiry: '', message: '' });
      })
      .catch((error) => {
        console.error('Email error:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Contact
          </h1>
          <p className="text-3xl md:text-4xl text-slate-900 font-light max-w-4xl">
            For academic collaboration, technical work, or mentorship aligned with teaching, project coordination, or production engineering.
          </p>
        </motion.div>

        {/* Appropriate Inquiries */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Appropriate Inquiries
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {appropriateInquiries.map((type, idx) => (
              <motion.div
                key={idx}
                className="border-l-2 border-slate-200 pl-6 py-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={idx}
              >
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {type.category}
                </h3>
                <p className="text-sm text-slate-600">
                  {type.examples}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
              Send Message
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  Message sent. I'll respond within 24-48 hours.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  Failed to send. Please email directly at kaustubhvdeshmukh2001@gmail.com
                </p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none transition-colors"
                  placeholder="Institution or company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-slate-400 focus:outline-none transition-colors"
                >
                  <option value="">Select type</option>
                  <option value="academic">Academic Collaboration</option>
                  <option value="technical">Technical Work</option>
                  <option value="student">Student Mentorship</option>
                  <option value="guidance">Professional Guidance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none transition-colors resize-none"
                  placeholder="Describe your inquiry..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={1}
          >
            {/* Direct Contact */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">
                Direct Contact
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="text-slate-600 mt-0.5">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 mb-1">
                        {info.label}
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-sm text-slate-600 hover:text-slate-900 transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-sm text-slate-600">
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">
                Professional Profiles
              </h3>
              <div className="space-y-3">
                {professionalLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-900 group-hover:text-slate-700">
                        {link.platform}
                      </span>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600">
                      {link.purpose}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Response Time
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Typical response within 24-48 hours. For urgent academic matters, mention the timeline in your message.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;