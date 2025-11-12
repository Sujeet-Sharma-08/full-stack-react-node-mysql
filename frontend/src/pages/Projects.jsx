import React from "react";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "EdTech Learning Platform",
    description:
      "An interactive MERN-based platform for students to learn online, track progress, and connect with mentors.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/sujeet/edtech-platform",
    demo: "https://edtech-platform.vercel.app",
  },
  {
    id: 2,
    title: "Job Portal System",
    description:
      "A job portal where employers can post jobs and candidates can apply directly with smart filtering features.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Redux", "Node.js", "MySQL"],
    // github: "https://github.com/sujeet/job-portal",
    // demo: "https://job-portal.vercel.app",
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "A sleek portfolio website built using React and Tailwind CSS to showcase my work, skills, and contact info.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    // github: "https://github.com/sujeet/portfolio",
    // demo: "https://sujeet.vercel.app",
  },
];

const Projects=()=> {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-6 py-16 md:px-16 lg:px-32">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-slate-800 mb-12">
        My <span className="text-indigo-600">Projects</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-between items-center">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium"
                >
                  <Github size={18} /> Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Live Demo <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Sujeet Kumar Sharma — Crafted with ❤️ using React & Tailwind CSS
      </footer>
    </div>
  );
}
export default Projects;