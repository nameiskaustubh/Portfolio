import React from "react";
import LeetCodeTracker from "../components/LeetCodeTracker";

const LeetCode = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-5 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Currently Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              LeetCode Progress
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Systematic approach to mastering data structures and algorithms through 
              consistent practice and strategic problem-solving.
            </p>
            
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-semibold text-blue-400">Daily</div>
                <div className="text-gray-500 text-sm">Practice</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-purple-400">Tracked</div>
                <div className="text-gray-500 text-sm">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-400">Focused</div>
                <div className="text-gray-500 text-sm">Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <LeetCodeTracker 
          username="afcpwRGndV" 
          displayName="Kaustubh"
        />
      </div>

      <div className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Current Focus</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { text: "Arrays and String manipulation problems", icon: "M4 6h16M4 12h16M4 18h16" },
                  { text: "Dynamic Programming pattern recognition", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { text: "Binary Trees and Graph traversal algorithms", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" },
                  { text: "Maintaining daily coding consistency", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-gray-300 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Recent Progress</h3>
              </div>
              
              <div className="space-y-5">
                {[
                  { text: "Established consistent daily solving routine", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { text: "Built solid foundation in core algorithms", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                  { text: "Actively participating in weekly contests", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                  { text: "Improved problem-solving efficiency", icon: "M13 10V3L4 14h7v7l9-11h-7z" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-gray-300 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold text-white mb-4">
                Learning Methodology
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A structured approach to algorithmic problem-solving and skill development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  title: "Pattern Recognition",
                  description: "Studying common algorithmic patterns and solution templates to build a strong problem-solving framework."
                },
                {
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                  title: "Consistent Practice",
                  description: "Solving 2-3 problems daily with emphasis on understanding underlying concepts and multiple solution approaches."
                },
                {
                  icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                  title: "Iterative Review",
                  description: "Regular revisiting of solved problems to reinforce learning and explore alternative optimization strategies."
                }
              ].map((method, index) => (
                <div key={index} className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center hover:border-gray-700 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={method.icon} />
                    </svg>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-4">{method.title}</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

         
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-2 mb-6">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-orange-400 font-medium">2025 Objectives</span>
              </div>
              
              <h3 className="text-3xl font-semibold text-white mb-4">
                Target Milestones
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-8">
              <div>
                <div className="text-5xl font-bold text-orange-400 mb-2">300+</div>
                <div className="text-gray-400 text-lg">Problems Solved</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-purple-400 mb-2">Top 20%</div>
                <div className="text-gray-400 text-lg">Global Ranking</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Focused preparation for technical interviews while building deep algorithmic 
              intuition and problem-solving expertise.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LeetCode;