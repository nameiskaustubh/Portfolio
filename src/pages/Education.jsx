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
        "Specialized in Software Development & Database Management",
        "Led team projects in React and Java development",
        "Completed dissertation on Modern Web Technologies"
      ],
      color: "purple"
    },
    {
      year: "2019 - 2023",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "K.T.H.M. College, Nashik", 
      location: "Nashik, Maharashtra",
      grade: "7.3 CGPA",
      highlights: [
        "Strong foundation in Programming & Data Structures",
        "Participated in multiple WorkShops"
      ],
      color: "blue"
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: "from-purple-900 to-purple-800",
        border: "border-purple-400",
        dot: "bg-purple-400",
        text: "text-purple-300"
      },
      blue: {
        bg: "from-blue-900 to-blue-800", 
        border: "border-blue-400",
        dot: "bg-blue-400",
        text: "text-blue-300"
      },
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Education</span>
              </h1>
              <p className="text-gray-400 text-xl">Academic journey that shaped my technical foundation</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mt-4"></div>
            </div>

            
            <div className="relative">
             
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-green-400"></div>
              
              {educationData.map((edu, index) => {
                const colors = getColorClasses(edu.color);
                return (
                  <div key={index} className="relative flex items-start mb-12 last:mb-0">
                    
                    <div className={`absolute left-6 w-4 h-4 ${colors.dot} rounded-full border-4 border-slate-900 z-10`}></div>
                    
                   
                    <div className="ml-16 flex-1">
                      <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border ${colors.border} border-opacity-50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                       
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{edu.degree}</h3>
                            <p className={`${colors.text} font-medium`}>{edu.institution}</p>
                            <p className="text-gray-400 text-sm">{edu.location}</p>
                          </div>
                          <div className="mt-4 md:mt-0 text-right">
                            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                              {edu.year}
                            </span>
                            <p className="text-white font-bold text-lg mt-2">{edu.grade}</p>
                          </div>
                        </div>

                        
                        <div>
                          <h4 className="text-white font-semibold mb-3">Key Highlights:</h4>
                          <ul className="space-y-2">
                            {edu.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-300">
                                <span className={`w-2 h-2 ${colors.dot} rounded-full mt-2 flex-shrink-0`}></span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;