import React, { useState } from "react";
import { BookOpen, Users, Code, MessageSquare, ArrowRight } from "lucide-react";

const engagements = [
  {
    title: "Academic & Teaching Engagements",
    description: "Programming instruction in C and Python for engineering students. Curriculum development, academic mentorship, and preparation for technical practice.",
    icon: <BookOpen className="w-6 h-6" />,
    details: [
      "Foundational programming and computational thinking",
      "Curriculum design aligned with industry requirements",
      "Academic guidance for project work and research",
      "Technical interview and professional preparation"
    ]
  },
  {
    title: "Student Projects & Internship Guidance",
    description: "MCA major project coordination, including scope evaluation and feasibility assessment. Industry internship oversight and technical mentorship.",
    icon: <Users className="w-6 h-6" />,
    details: [
      "Project scope definition and feasibility analysis",
      "Internship coordination and evaluation",
      "Guidance on production-oriented implementations",
      "Technical mentorship through development lifecycle"
    ]
  },
  {
    title: "Production-Ready Web & Software Applications",
    description: "End-to-end web application development with React frontends and backend integration. Architecture, maintainability, and deployment for long-term production use.",
    icon: <Code className="w-6 h-6" />,
    details: [
      "Full-stack application architecture and implementation",
      "React-based frontend with backend API integration",
      "Database design and data flow management",
      "Performance optimization and deployment strategy",
      "Code structure for maintainability and team handoff"
    ]
  },
  {
    title: "Mentorship & Technical Reviews",
    description: "Code and architecture reviews for teams and individual developers. Technical decision guidance and career mentorship with focus on system thinking.",
    icon: <MessageSquare className="w-6 h-6" />,
    details: [
      "Code quality and architecture assessments",
      "Technical decision frameworks and trade-off analysis",
      "Career guidance for engineers and developers",
      "System design review and long-term impact evaluation"
    ]
  },
];

const ProfessionalEngagements = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500 tracking-wider uppercase">
              <div className="w-8 h-px bg-slate-300"></div>
              <span>Professional Engagements</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
            Areas of Engagement
          </h2>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            The contexts in which professional and technical engagement is appropriate. Each area carries specific responsibilities and standards.
          </p>
        </div>

        {/* Engagements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-28">
          {engagements.map((engagement, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-slate-900 to-slate-400 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                  {engagement.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight leading-tight pr-4">
                    {engagement.title}
                  </h3>
                  <ArrowRight 
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1 transition-all duration-500 ${
                      expandedIndex === index ? 'rotate-90 text-slate-900' : 'group-hover:translate-x-1'
                    }`}
                  />
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {engagement.description}
                </p>

                {/* Expandable Details */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-4 border-t border-slate-200">
                    <ul className="space-y-3">
                      {engagement.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Standards & Approach */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Standards & Approach
            </h3>
            <p className="text-slate-600 leading-relaxed">
              These engagements balance academic responsibility with production engineering. Each requires clear communication, honest feasibility assessment, and commitment to outcomes that serve their purpose beyond initial delivery.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether coordinating student work, building systems, or providing technical guidance, the focus remains on maintainability, responsible decision-making, and long-term impact.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Core Principles
            </h4>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">Honest assessment over optimism</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">Maintainability over rapid delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">System thinking over isolated fixes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1 h-1 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">Long-term outcomes over immediate wins</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Scope Definition */}
        <div className="border-t border-slate-200 pt-12">
          <div className="max-w-4xl">
            <p className="text-lg text-slate-700 leading-relaxed">
              Professional engagement means understanding context, constraints, and consequences. It requires evaluating technical trade-offs, communicating clearly about what's feasible, and maintaining responsibility for decisions that affect students, systems, and outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalEngagements;