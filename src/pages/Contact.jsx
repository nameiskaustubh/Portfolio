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
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email
    };

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
    { name: "LinkedIn", url: "https://linkedin.com/in/kaustubh-deshmukh8851", icon: <FaLinkedin />, color: "hover:text-blue-400", description: "Professional Network" },
    { name: "GitHub", url: "https://github.com/nameiskaustubh", icon: <FaGithub />, color: "hover:text-gray-300", description: "Code Repository" },
    { name: "LeetCode", url: "https://leetcode.com/afcpwRGndV", icon: <SiLeetcode />, color: "hover:text-yellow-400", description: "Coding Practice" },
    { name: "GeeksforGeeks", url: "https://auth.geeksforgeeks.org/user/kaustubhvde2feq", icon: <SiGeeksforgeeks />, color: "hover:text-green-400", description: "Programming Platform" },
    { name: "Instagram", url: "https://instagram.com/nameiskaustubh", icon: <FaInstagram />, color: "hover:text-pink-400", description: "Personal Updates" },
    { name: "Email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=kaustubhvdeshmukh2001@gmail.com", icon: <FaEnvelope />, color: "hover:text-red-400", description: "Direct Contact" }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, title: "Email", value: "kaustubhvdeshmukh2001@gmail.com", link: "mailto:kaustubhvdeshmukh2001@gmail.com" },
    { icon: <FaMapMarkerAlt />, title: "Location", value: "Nashik, Maharashtra, India", link: null },
    { icon: <FaPhone />, title: "Availability", value: "Open to opportunities +91-7775864001", link: null }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
    
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-24 pb-20">
        <div className="container mx-auto px-6">
         
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-5 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Available for Work</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Let's Connect</h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Ready to collaborate on exciting projects or discuss opportunities. Feel free to reach out through any of the channels below.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
             
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Send a Message</h2>
                </div>

                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-400 text-sm">Message sent successfully! I'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-400 text-sm">Failed to send message. ❌ Please try again or contact me directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors" 
                        placeholder="Your name" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors" 
                        placeholder="your.email@example.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors" 
                      placeholder="What's this about?" 
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      required 
                      rows={6} 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors resize-none" 
                      placeholder="Tell me about your project or opportunity..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : "Send Message"}
                  </button>
                </form>
              </div>

              
              <div className="space-y-8">
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 flex-shrink-0 mt-1">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">{info.title}</h3>
                          {info.link ? (
                            <a href={info.link} className="text-gray-400 hover:text-blue-400 transition-colors">{info.value}</a>
                          ) : (
                            <p className="text-gray-400">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Find Me Online</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`text-2xl text-gray-400 transition-colors ${social.color}`}>{social.icon}</div>
                          <div>
                            <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">{social.name}</h3>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">{social.description}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-blue-300 font-medium mb-2">Quick Response</h3>
                      <p className="text-blue-200/80 text-sm leading-relaxed">I typically respond to messages within 24 hours. For urgent matters, feel free to reach out via LinkedIn or email directly.</p>
                    </div>
                  </div>
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