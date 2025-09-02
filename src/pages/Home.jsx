import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profilePic from "../assets/profile.jpg";

// Variants for reusable animations
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// Floating star component for galaxy background
const Star = ({ size, top, left, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white shadow-md"
    style={{ width: size, height: size, top, left }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
  />
);

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-gray-200 overflow-hidden">
      {/* Galaxy Stars Background */}
      {[...Array(30)].map((_, i) => (
        <Star
          key={i}
          size={`${Math.random() * 3 + 1.5}px`}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          delay={Math.random() * 5}
        />
      ))}

      {/* Hero Section */}
      <section className="pt-20 pb-10 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
          {/* Left Text Content */}
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={fadeUp}
            >
              Hi, I'm{" "}
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Kaustubh
              </motion.span>
            </motion.h1>

            {/* Roles */}
            <motion.p
              className="text-lg text-gray-300 mb-6 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.span
                animate={{ x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                React Developer | Web Developer | Freelancer
              </motion.span>
            </motion.p>

            <motion.div className="flex gap-4" variants={fadeUp} custom={3}>
              <Link
                to="/projects"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
              >
                See My Work
              </Link>
              <a
                href="#about"
                className="inline-block border-2 border-blue-600 text-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Right Profile Image */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src={profilePic}
              alt="Kaustubh Profile"
              className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-blue-400/50"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-6 relative z-10 backdrop-blur-lg"
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h1 className="text-3xl font-bold mb-10 text-center text-white ">
            About Me
          </h1>

          {/* Flexbox Layout for Two Scrollable Cards */}
          <div className=" flex flex-col md:flex-row gap-8">
            {/* Bio Card */}
            <motion.div
  className="flex-1 bg-gray-900/80 rounded-xl p-6 shadow-lg 
             max-h-96 overflow-y-auto custom-scrollbar"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h1 className="text-2xl font-bold mb-4 text-gray-100">
    Professional Bio
  </h1>

  <p className="text-2xl text-gray-400 leading-relaxed mb-3">
    I am a <span className="text-indigo-300 font-medium">React & Web Developer</span>, 
    focused on building scalable, maintainable, and user-centered applications. 
    My approach emphasizes clean design, performance optimization, and accessibility.
  </p>
    <br />
  <p className="text-2xl text-gray-400 leading-relaxed mb-3">
    With hands-on experience in JavaScript, React, and TailwindCSS, 
    I specialize in creating responsive interfaces and seamless user experiences. 
    My goal is to translate complex problems into intuitive, functional solutions.
  </p>
  <br />

  <p className="text-gray-400
  text-2xl -gray-300 leading-relaxed mb-3">
    Beyond coding, I enjoy collaborating with developers and contributing 
    to projects that make a real impact. I'm continuously improving my skills 
    in <span className="text-indigo-300 font-medium">frontend engineering, DSA, and system design</span>.
  </p>
<br />
  <p className="text-2xl text-gray-400 leading-relaxed">
    Currently, I’m open to freelance projects, and opportunities 
    where I can apply my skills and grow with challenging problems.
  </p>
</motion.div>


            {/* Quick Facts Card */}
            <motion.div
              className="flex-1 bg-gray-800/90 rounded-xl p-6 shadow-lg max-h-96 overflow-y-auto custom-scrollbar"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-100">
                Quick Facts
              </h3>
              <ul className=" space-y-3 text-2xl text-gray-400">
                {[
                  "Based in Nashik, Maharashtra",
                  "MCA Graduate (2025)",
                  "Frontend Developer specializing in React",
                  "Strong interest in DSA & problem-solving",
                  "Exploring system design & scalable apps",
                  "Open to freelance and collaborative projects",
                ].map((fact, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    {fact}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            I’m always excited to work on new projects and collaborate with
            developers and teams to create impactful digital products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View My Projects
            </Link>
            <Link
              to="/skills"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Explore My Skills
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
