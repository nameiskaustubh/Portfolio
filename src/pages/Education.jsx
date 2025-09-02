import React from "react";

const Education = () => {
  const educationData = [
    {
      year: "2023 - 2025",
      degree: "Master of Computer Applications (MCA)",
      institution: "R.H. Sapat College Of Engineering",
      location: "Nashik, Maharashtra",
      grade: "7.29 CGPA",
      highlights: [
        "Built a strong foundation in Web Development using HTML, CSS, and JavaScript",
        "Worked with React, JavaScript, and explored frontend libraries",
        "Strengthened problem-solving skills through Data Structures and Algorithms (DSA)",
        "Developed foundations in Java, C++, and Database Management Systems (DBMS)"
      ]
    },
    {
      year: "2019 - 2023",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "K.T.H.M. College, Nashik", 
      location: "Nashik, Maharashtra",
      grade: "7.3 CGPA",
      highlights: [
        "Acquired a solid base in Programming Fundamentals and Data Structures",
        "Explored software development concepts through projects",
        "Actively participated in workshops and technical events, improving teamwork and collaboration"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900/80 pt-20">
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Heading */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  Education
                </span>
              </h1>
              <p className="text-gray-400 text-lg">
                Academic journey that shaped my technical foundation
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
              
              {educationData.map((edu, index) => (
                <div key={index} className="relative flex items-start mb-12 last:mb-0">
                  
                  {/* Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-900 z-10"></div>
                  
                  {/* Card */}
                  <div className="ml-16 flex-1">
                    <div className="rounded-2xl p-8 border border-gray-700 bg-slate-800 shadow-md 
                                    transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] 
                                    hover:shadow-xl hover:bg-slate-700/90">
                      
                      {/* Top Info */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                          <p className="text-blue-300 font-medium">{edu.institution}</p>
                          <p className="text-gray-400 text-sm">{edu.location}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <span className="inline-block bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                            {edu.year}
                          </span>
                          <p className="text-white font-bold text-lg mt-2">{edu.grade}</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-white font-semibold mb-3">Key Highlights:</h4>
                        <ul className="space-y-2">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
