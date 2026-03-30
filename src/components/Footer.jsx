/**
 * Footer — Dark Theme Version
 * Matches the cinematic dark portfolio aesthetic.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--bg-1)',
        borderTop: '1px solid var(--border)',
        padding: '5rem 2.5rem 3rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Identity */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                letterSpacing: '0.06em',
                color: 'var(--text-1)',
                marginBottom: '0.75rem',
              }}
            >
              KD
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-3)',
                lineHeight: 1.7,
                maxWidth: '260px',
              }}
            >
              Assistant Professor at R.H. Sapat College of Engineering,
              Nashik. Full-stack engineer building production systems and
              teaching engineers how to think.
            </p>
          </div>

          {/* Pages */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: '1.25rem',
              }}
            >
              Navigate
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { path: '/work',        label: 'Work' },
                { path: '/teaching',    label: 'Teaching' },
                { path: '/capabilities', label: 'Capabilities' },
                { path: '/dsa',         label: 'DSA' },
                { path: '/contact',     label: 'Contact' },
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--text-3)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                marginBottom: '1.25rem',
              }}
            >
              Connect
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <FaLinkedin />, label: 'LinkedIn',    href: 'https://linkedin.com/in/kaustubh-deshmukh8851' },
                { icon: <FaGithub />,   label: 'GitHub',      href: 'https://github.com/nameiskaustubh' },
                { icon: <SiLeetcode />, label: 'LeetCode',    href: 'https://leetcode.com/afcpwRGndV' },
                { icon: <FaEnvelope />, label: 'Email',        href: 'mailto:kaustubhvdeshmukh2001@gmail.com' },
                { icon: <FaFilePdf />,  label: 'Resume',       href: '/assets/Kaustubh_Deshmukh_Resume1.pdf' },
              ].map(({ icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--text-3)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
                  >
                    <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              color: 'var(--text-3)',
            }}
          >
            © {year} Kaustubh Deshmukh. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              color: 'var(--text-3)',
            }}
          >
            React · GSAP · Framer Motion · Lenis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;