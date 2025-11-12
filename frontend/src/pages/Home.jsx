import React from 'react';
import { ArrowRight, Code, Laptop, Rocket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="px-6 md:px-16 lg:px-32 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Hi, I'm <span className="text-indigo-600">Sujeet Kumar Sharma</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            A passionate MERN stack developer crafting clean, scalable, and user-friendly web experiences. I love turning complex problems into elegant digital solutions.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/about"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition flex items-center gap-2"
            >
              About Me <ArrowRight size={18} />
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-indigo-100 via-white to-sky-50 rounded-full shadow-xl flex items-center justify-center">
            <Rocket size={120} className="text-indigo-500 animate-bounce" />
            <div className="absolute -bottom-5 bg-white/90 px-4 py-2 rounded-full text-sm font-semibold shadow">
              MERN Developer 🚀
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 md:px-16 lg:px-32 py-16 bg-white border-t border-slate-100">
        <h2 className="text-3xl font-bold text-center">What I Do</h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          I build digital solutions using modern web technologies, focusing on clean code, performance, and user experience.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={<Code />} title="Frontend Development" desc="Building responsive and dynamic interfaces using React, Tailwind CSS, and modern JS frameworks." />
          <ServiceCard icon={<Laptop />} title="Backend Development" desc="Creating secure, scalable APIs and integrations using Node.js, Express, and MongoDB." />
          <ServiceCard icon={<Users />} title="Team Collaboration" desc="Working efficiently with designers, developers, and project managers to bring ideas to life." />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="px-6 md:px-16 lg:px-32 py-20">
        <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          A glimpse into some of my favorite work — built with care, passion, and precision.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer">
              <div className="h-40 bg-gradient-to-br from-slate-100 to-white rounded-lg flex items-center justify-center">
                <span className="text-slate-400">Project Preview</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Project Title {i + 1}</h3>
              <p className="text-slate-500 text-sm mt-1">A short description of what the project does and how it helps users.</p>
              <div className="mt-3 flex gap-2">
                <span className="text-xs border rounded-full px-2 py-1 text-slate-600">React</span>
                <span className="text-xs border rounded-full px-2 py-1 text-slate-600">Node.js</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold">Let’s Build Something Amazing Together!</h2>
        <p className="mt-4 text-white/90 max-w-xl mx-auto">
          I’m currently open for freelance work, collaborations, or full-time roles. Let’s create impactful digital products together.
        </p>
        <div className="mt-6">
          <a href="/contact" className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:shadow-lg transition">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-slate-500 border-t border-slate-100">
        © {new Date().getFullYear()} Sujeet Kumar Sharma — Built with ❤️ using React & Tailwind CSS
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl inline-block mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default Home;