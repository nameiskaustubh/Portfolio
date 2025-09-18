import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = "service_35jfvll";
    const templateId = "template_i18ju09";
    const publicKey = "Q-h55re78pcIna9G1";

    const templateParams = {
      name: formData.name,           
      email: formData.email,         
      subject: formData.subject,     
      message: formData.message,     
      reply_to: formData.email,      
      time: new Date().toLocaleString() 
    };

    console.log("Sending EmailJS params:", templateParams);

    try {
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log("EmailJS result:", result.status, result.text);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/kaustubh-deshmukh8851", icon: <FaLinkedin />, color: "hover:text-blue-600", description: "Professional Network" },
    { name: "GitHub", url: "https://github.com/nameiskaustubh", icon: <FaGithub />, color: "hover:text-gray-800", description: "Code Repository" },
    { name: "LeetCode", url: "https://leetcode.com/afcpwRGndV", icon: <SiLeetcode />, color: "hover:text-yellow-600", description: "Coding Practice" },
    { name: "GeeksforGeeks", url: "https://auth.geeksforgeeks.org/user/kaustubhvde2feq", icon: <SiGeeksforgeeks />, color: "hover:text-green-600", description: "Programming Platform" },
    { name: "Instagram", url: "https://instagram.com/nameiskaustubh", icon: <FaInstagram />, color: "hover:text-pink-600", description: "Personal Updates" },
    { name: "Email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=kaustubhvdeshmukh2001@gmail.com", icon: <FaEnvelope />, color: "hover:text-red-600", description: "Direct Contact" }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, title: "Email", value: "kaustubhvdeshmukh2001@gmail.com", link: "mailto:kaustubhvdeshmukh2001@gmail.com" },
    { icon: <FaMapMarkerAlt />, title: "Location", value: "Nashik, Maharashtra, India", link: null },
    { icon: <FaPhone />, title: "Phone", value: "+91-7775864001", link: null }
  ];

  return (
    <div className="bg-gray-200 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mt-5 text-blue-500 mb-4">
            Let's Work Together
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
         
          <div className="lg:col-span-3">
            <div className="bg-white shadow-lg border border-gray-300 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Send Message</h2>
              </div>

            
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-700 text-sm">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700 text-sm">Failed to send message. Please try again or contact me directly.</p>
                  </div>
                </div>
              )}

              <div onSubmit={handleSubmit} as="form">
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all" 
                        placeholder="Your full name" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all" 
                        placeholder="your.email@example.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all" 
                      placeholder="What's this about?" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      required 
                      rows={4} 
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none" 
                      placeholder="Tell me about your project or opportunity..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : "Send Message"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white shadow-lg border border-gray-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaPhone className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Contact Info</h3>
              </div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800">{info.title}</p>
                      {info.link ? (
                        <a href={info.link} className="text-sm text-blue-500 hover:text-blue-600 break-all transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-sm text-gray-600 break-words">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-white shadow-lg border border-gray-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Connect</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all group"
                  >
                    <div className={`text-lg text-gray-600 transition-colors ${social.color} flex-shrink-0`}>
                      {social.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate group-hover:text-gray-900 transition-colors">{social.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Quick Response</h4>
                  <p className="text-sm text-blue-700">I typically respond within 24 hours. For urgent matters, connect via LinkedIn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;