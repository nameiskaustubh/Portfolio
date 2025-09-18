import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { FaFileDownload, FaEye, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-600 py-8 px-4 md:px-10">
      

      <div className="border-t border-gray-700 pt-6">
        <div className="flex flex-wrap gap-5 justify-center text-xl mb-4">
          <a
            href="https://linkedin.com/in/kaustubh-deshmukh8851"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/nameiskaustubh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaGithub />
          </a>
          <a
            href="https://leetcode.com/afcpwRGndV"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-600"
          >
            <SiLeetcode />
          </a>
          <a
            href="https://auth.geeksforgeeks.org/user/kaustubhvde2feq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600"
          >
            <SiGeeksforgeeks />
          </a>
          <a
            href="https://instagram.com/nameiskaustubh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600"
          >
            <FaInstagram />
          </a>
          <a
             href="https://mail.google.com/mail/?view=cm&fs=1&to=kaustubhvdeshmukh2001@gmail.com"
             target="_blank"
             rel="noopener noreferrer"
            className="hover:text-red-600"
>
  <FaEnvelope />
</a>
        </div>

        <div className="text-center text-sm text-gray-700">
          © {currentYear} Kaustubh Deshmukh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
