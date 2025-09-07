import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaFileDownload, FaEye, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-10">
      {/* <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pb-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Kaustubh Deshmukh</h2>
          <p className="text-sm text-gray-400">
            Web Developer | Freelancer | <br />
            ReactJs | JavaScript | NodeJs
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="/assets/Kaustubh_Deshmukh_Resume1.pdf"
            download
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl text-sm transition-all"
          >
            <FaFileDownload /> Download Resume
          </a>
          <a
            href="/assets/Kaustubh_Deshmukh_Resume1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl text-sm transition-all"
          >
            <FaEye /> View Resume
          </a>
        </div>
      </div> */}

      <div className="border-t border-gray-700 pt-6">
        <div className="flex flex-wrap gap-5 justify-center text-xl mb-4">
          <a
            href="https://linkedin.com/in/kaustubh-deshmukh8851"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/nameiskaustubh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://leetcode.com/afcpwRGndV"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400"
          >
            <SiLeetcode />
          </a>
          <a
            href="https://auth.geeksforgeeks.org/user/kaustubhvde2feq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400"
          >
            <SiGeeksforgeeks />
          </a>
          <a
            href="https://instagram.com/nameiskaustubh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            <FaInstagram />
          </a>
          <a
             href="https://mail.google.com/mail/?view=cm&fs=1&to=kaustubhvdeshmukh2001@gmail.com"
             target="_blank"
             rel="noopener noreferrer"
            className="hover:text-red-400"
>
  <FaEnvelope />
</a>
        </div>

        <div className="text-center text-sm text-gray-400">
          © {currentYear} Kaustubh Deshmukh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
