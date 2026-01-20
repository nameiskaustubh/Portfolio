import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf
} from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">

          {/* Identity */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">
              Kaustubh Deshmukh
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Assistant Professor at R.H. Sapat College of Engineering, Nashik.
              Frontend Engineer focused on React systems, teaching engineering
              fundamentals, and preparing students for real-world development.
            </p>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Professional Presence
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://linkedin.com/in/kaustubh-deshmukh8851"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/nameiskaustubh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
                >
                  <FaGithub /> GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://leetcode.com/afcpwRGndV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
                >
                  <SiLeetcode /> LeetCode
                </a>
              </li>

              <li>
                <a
                  href="https://auth.geeksforgeeks.org/user/kaustubhvde2feq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
                >
                  <SiGeeksforgeeks /> GeeksforGeeks
                </a>
              </li>
            </ul>
          </div>

          {/* Collaboration */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Collaboration
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              Open to academic partnerships, technical consulting, mentorship,
              and frontend engineering projects.
            </p>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:kaustubhvdeshmukh2001@gmail.com"
                className="inline-flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
              >
                <FaEnvelope /> Email
              </a>

              <a
                href="/assets/Kaustubh_Deshmukh_Resume1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-slate-700 hover:text-slate-900 transition"
              >
                <FaFilePdf /> View Resume
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            © {currentYear} Kaustubh Deshmukh. All rights reserved.
          </p>
          <p>
            Built with React • Tailwind CSS • Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
