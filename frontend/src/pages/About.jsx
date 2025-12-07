import React, { useEffect, useState } from 'react';
import apiConnector from '../api/ApiConnector';
import { toast } from 'react-toastify';


const About = () => {
  const [yearsExperience, setYearsExperience] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  const [say, setSay] = useState(false);

  const sayHandler = () => {
    setSay(!say);
  }


  useEffect(() => {
    // simple number animation
    const animate = (setter, end, duration = 900) => {
      let start = 0;
      const stepTime = Math.max(10, Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        setter(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);
    };

    animate(setYearsExperience, 2); // Sujeet graduated 2024 -> ~2 years experience (example)
    animate(setProjectsCount, 18);
    animate(setClientsCount, 6);
  }, []);

  const skills = [
    { name: 'React', lvl: 'Advanced', icon: ReactIcon() },
    { name: 'Node.js', lvl: 'Advanced', icon: NodeIcon() },
    { name: 'MongoDB', lvl: 'Intermediate', icon: DatabaseIcon() },
    { name: 'Tailwind CSS', lvl: 'Advanced', icon: TailwindIcon() },
    { name: 'Redux', lvl: 'Intermediate', icon: ReduxIcon() },
    { name: 'Docker', lvl: 'Beginner', icon: DockerIcon() },
  ];

  const [ideaData, setIdeaData] = useState({ name: "", idea: "" })

  function changeHandler(e) {
    setIdeaData({ ...ideaData, [e.target.name]: e.target.value })
  }

  const ideaSumitHandler = async (e) => {
    e.preventDefault();
    try {
      const { name, idea } = ideaData;
      const response = await apiConnector.post('/idea/create-idea',
        { name, idea }
      );
      toast.success(response.data.message);
      setIdeaData({ name: "", idea: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit idea. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header / Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Hi — I’m <span className="text-indigo-600">Sujeet Kumar Sharma</span>
            </h1>
            <p className="mt-4 text-slate-700 text-lg">
              A CSE graduate (Class of 2024) and MERN-stack developer who loves building
              clean, responsive web apps. I focus on readable code, good UX, and shipping
              features fast. I work with React, Node.js, Tailwind CSS, and familiar tooling
              like Redux, Axios, Vite and Postman.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:shadow-lg transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                Get In Touch
              </a>
            </div>

            {/* Key highlights */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <StatCard label="Years" value={yearsExperience} unit="yrs" />
              <StatCard label="Projects" value={projectsCount} unit="+" />
              <StatCard label="Clients" value={clientsCount} unit="+" />
            </div>
          </div>

          {/* Visual / Avatar */}
          <aside className="flex items-center justify-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-indigo-100 via-white to-sky-50 rounded-2xl shadow-2xl p-4 flex items-center justify-center">
              {/* Stylized avatar illustration */}
              <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-44 h-44">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" rx="18" fill="url(#g1)" />
                  <g transform="translate(30,30)" fill="white">
                    <circle cx="70" cy="40" r="26" opacity="0.95" />
                    <rect x="20" y="86" width="100" height="48" rx="12" opacity="0.9" />
                  </g>
                </svg>
              </div>
              <div className="absolute -bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow">
                MERN • React • Tailwind
              </div>
            </div>
          </aside>
        </div>

        {/* Skills & Tools */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold">Skills & Tools</h3>
          <p className="mt-2 text-slate-600">Technologies I use to build production-ready apps.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((s) => (
              <div key={s.name} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 rounded-lg">{s.icon}</div>
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-slate-500">{s.lvl}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience timeline */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold">Experience</h3>
          <div className="mt-6 space-y-4">
            <TimelineItem date="2024" title="B.Tech — Computer Science" place="University / College" desc="Graduated with focus on web development and data structures." />
            <TimelineItem date="2024 - Present" title="MERN Developer" place="Freelance / Projects" desc="Building full-stack applications using React, Node.js, Express and MongoDB. Worked on dashboards, auth flows, and APIs." />
            <TimelineItem date="2025" title="Open Source Contributions" place="Personal & GitHub" desc="Contributed to small open source tools and shared UI components." />
          </div>
        </section>

        {/* Projects preview */}
        <section id="projects" className="mt-12">
          <h3 className="text-2xl font-semibold">Selected Projects</h3>
          <p className="mt-2 text-slate-600">A quick peek — tap to explore (links are placeholders).</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer">
                <div className="h-40 rounded-lg bg-gradient-to-br from-slate-100 to-white flex items-center justify-center">
                  <div className="text-slate-400">Project screenshot</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold">Project Title {i + 1}</h4>
                  <p className="mt-2 text-sm text-slate-500">Short summary of the project, tech used and impact.</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full border text-slate-600">React</span>
                    <span className="text-xs px-2 py-1 rounded-full border text-slate-600">Node</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-12 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Let’s build something together</h3>
            <p className="mt-2 text-slate-600">I’m open to freelance gigs, internships, and collaborations. Send a quick message and I’ll reply within a day.</p>
            <div onClick={sayHandler} className="mt-6">
              <button className="inline-block px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow">
                Say Hello
              </button>
            </div>

            <div
              className={`flex justify-center items-center rounded-lg h-10 w-[6.7rem] bg-amber-300 text-blue-600
    transition-all duration-500 ease-out
    ${say ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
  `}
            >
              <p>
                Hi,<span className="animate-pulse">🖐</span>
              </p>
            </div>
          </div>

            <form className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                onChange={changeHandler}
                value={ideaData.name}
                className="mt-2 w-full rounded-md border px-3 py-2 placeholder:text-gray-400"
                placeholder="Your name"
                name='name'
              />
              <label className="block text-sm font-medium text-slate-700 mt-4">Message</label>
              <textarea
                onChange={changeHandler}
                value={ideaData.idea}
                className="mt-2 w-full rounded-md border px-3 py-2 placeholder:text-gray-400"
                rows={4} placeholder="Have an idea? Let's discuss!"
                name='idea'
              />
              <div className="mt-4 flex justify-end">
                <button onClick={ideaSumitHandler} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Send</button>
              </div>
            </form>
        </section>

        <footer className="text-sm text-slate-500 text-center mt-8">© {new Date().getFullYear()} Sujeet Kumar Sharma — Built with React & Tailwind</footer>
      </div>
    </div>
  );
}

/* --------------------- Reusable subcomponents & Icons --------------------- */

function StatCard({ label, value, unit }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-start">
      <div className="text-3xl font-bold">{value}<span className="text-indigo-500 ml-1">{unit}</span></div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function TimelineItem({ date, title, place, desc }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-indigo-600 mt-1" />
        <div className="w-px h-full bg-slate-200 ml-1" />
      </div>
      <div>
        <div className="text-sm text-slate-500">{date} • {place}</div>
        <div className="font-medium mt-1">{title}</div>
        <div className="text-sm text-slate-500 mt-1">{desc}</div>
      </div>
    </div>
  );
}

/* --------------------- Simple inline icons --------------------- */
function ReactIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15.6a3.6 3.6 0 100-7.2 3.6 3.6 0 000 7.2z" fill="#6366F1" />
      <path d="M19.2 12c0 1.3-.6 2.9-1.6 4.4-1.1 1.7-2.6 3.1-4.1 3.6-1.5.5-3 .1-4.1-.4-1.1-.5-2.1-1.5-2.9-2.7C4.8 14 4 12.3 4 12s.8-2 .5-3.1c-.8-1.2-1.8-2.2-2.9-2.7C-.5 5.4.9 5 2.4 4.5 3.9 4 5.4 2.6 6.5.9 7.6-.8 9.2-2.2 11-2.2c1.8 0 3.4 1.4 4.5 3.1 1.1 1.7 2.6 3.1 4.1 3.6 1.5.5 3 .1 4.1-.4 1.1-.5 2.1-1.5 2.9-2.7C27.2 9.8 26.4 11.5 24.8 13c-1.6 1.6-3.8 2.6-5.6 2.6z" fill="#93C5FD" opacity="0.3" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l8 4v8l-8 4-8-4V6l8-4z" fill="#16A34A" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#64748B" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="#94A3B8" opacity="0.9" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6c-4 0-6 3-6 3s2 3 6 3c4 0 6-3 6-3s-2-3-6-3z" fill="#06B6D4" />
    </svg>
  );
}

function ReduxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#7C3AED" opacity="0.9" />
      <path d="M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="4" height="3" rx="1" fill="#0891B2" />
      <rect x="8" y="7" width="4" height="3" rx="1" fill="#06B6D4" />
      <rect x="13" y="7" width="4" height="3" rx="1" fill="#7DD3FC" />
    </svg>
  );
}

export default About;