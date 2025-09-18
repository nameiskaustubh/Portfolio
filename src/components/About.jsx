// import React, { useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
  
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  const float = {
    hidden: { y: 0 },
    visible: {
      y: [0, -6, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const educationData = [
    {
      year: "2023 - 2025",
      degree: "Master of Computer Applications (MCA)",
      institution: "R.H. Sapat College Of Engineering",
      location: "Nashik, Maharashtra",
      grade: "7.29 CGPA",
      highlights: [
        "Built strong foundation in web development (HTML, CSS, JS)",
        "Worked extensively with React & modern frontend libraries",
        "Solved DSA problems to enhance problem-solving skills",
        "Hands-on experience in Java, C++, MySQL, and DBMS",
      ],
    },
    {
      year: "2019 - 2023",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "K.T.H.M. College, Nashik",
      location: "Nashik, Maharashtra",
      grade: "7.3 CGPA",
      highlights: [
        "Mastered programming fundamentals and data structures",
        "Built academic and side projects in web technologies",
        "Actively participated in technical events & workshops",
      ],
    },
  ];

  
 

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-200 text-blue-500 ">
    
      {/* <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div> */}

  
      <main className="flex-1 mt-5 max-w-6xl mx-auto px-6 py-16 w-full">
        
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h1>

      
        <motion.section
          className="bg-blue-300/95 backdrop-blur-sm  rounded-3xl p-8 shadow-lg"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          <div className="md:flex md:items-start md:justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                I&apos;m Kaustubh Deshmukh – React Developer & Freelancer
              </h2>
              <p className="text-gray-700 mt-3 leading-relaxed">
                I specialize in building{" "}
                <span className="text-red-800">modern, responsive, and scalable</span> web applications.
                My toolkit includes React, Tailwind CSS, JavaScript, and Firebase.  
                <br />
                <br />
                I enjoy solving real-world problems, continuously practicing DSA, 
                and working on freelance projects that turn ideas into{" "}
                <span className="text-sky-700">polished digital experiences</span>.  
                Beyond tech, I&apos;m passionate about collaborating, mentoring peers, 
                and contributing to developer communities.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {["React", "Tailwind CSS", "JavaScript", "Firebase", "Freelance"].map(
                  (skill, i) => (
                    <motion.span
                      key={i}
                      className="inline-block text-xs font-medium bg-slate-200/60 px-3 py-1 rounded-full"
                      variants={float}
                      initial="hidden"
                      animate="visible"
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            </div>

          
            <div className="mt-6 md:mt-0 flex-shrink-0 flex gap-4">
              <a
                href="/projects"
                className="px-5 py-2 rounded-xl bg-blue-500 text-white hover:bg-sky-500 hover:text-black font-semibold text-sm shadow-md transition"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="px-5 py-2 rounded-xl border  text-sm font-medium hover:bg-white transition"
              >
                Contact
              </a>
            </div>
          </div>
        </motion.section>

      
        <motion.div
          className="mt-14 mb-6 text-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
        >
          <h3 className="text-4xl font-bold">Education</h3>
          <p className="text-gray-400 text-sm mt-1">
            My academic journey that shaped my technical foundation
          </p>
        </motion.div>

       
        <div className="max-h-[360px] overflow-y-auto about-scroll pr-2 space-y-6">
          {educationData.map((edu, idx) => (
            <motion.article
              key={idx}
              className="bg-gray-400/50  rounded-2xl p-6 shadow-md hover:shadow-sky-500/10 transition"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              custom={idx + 1}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold">{edu.degree}</h4>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-800">{edu.location}</p>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-slate-800/70 px-3 py-1 rounded-full text-xs font-medium">
                    {edu.year}
                  </div>
                  <p className="text-sm font-semibold mt-2">{edu.grade}</p>
                </div>
              </div>

              <div className="mt-3 max-h-28 overflow-y-auto about-scroll pr-2 text-gray-100 text-sm space-y-2">
                <ul className="list-disc list-inside">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

     
    </div>
  );
};

export default About;
