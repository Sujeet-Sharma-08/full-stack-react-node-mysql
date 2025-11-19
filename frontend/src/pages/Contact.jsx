import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import apiConnector from '../api/apiConnector';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const { fullname, email, message} = formData;
      const response =  await apiConnector.post('/contact/createContact',
        {fullname, email, message},
        {withCredentials : true}
      )
      toast.success(response.data.message);
      setFormData({ fullname: '', email: '', message: '' });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message. Please try again later.");
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white px-6 py-16 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Contact Info */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Let’s Connect</h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Have a question, collaboration idea, or just want to say hi? I’d love to hear from you!
            Fill out the form or reach out directly via email or social links.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl"><Mail className="text-indigo-600" size={22} /></div>
              <div>
                <p className="font-semibold text-slate-800">Email</p>
                <a href="mailto:sujeet@example.com" className="text-indigo-600 hover:underline">sujeet@example.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl"><Phone className="text-indigo-600" size={22} /></div>
              <div>
                <p className="font-semibold text-slate-800">Phone</p>
                <a href="tel:+91-9876543210" className="text-indigo-600 hover:underline">+91 98765 43210</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl"><MapPin className="text-indigo-600" size={22} /></div>
              <div>
                <p className="font-semibold text-slate-800">Location</p>
                <p className="text-slate-600">Patna, Bihar, India</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex gap-4">
            <a href="https://github.com/sujeet" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-full hover:bg-indigo-100 transition"><i className="fa-brands fa-github text-xl text-slate-700"></i></a>
            <a href="https://linkedin.com/in/sujeet" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-full hover:bg-indigo-100 transition"><i className="fa-brands fa-linkedin-in text-xl text-slate-700"></i></a>
            <a href="https://twitter.com/sujeet" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-full hover:bg-indigo-100 transition"><i className="fa-brands fa-twitter text-xl text-slate-700"></i></a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 px-4 py-2 border placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-2 px-4 py-2 border placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Sujeet Kumar Sharma — Built with ❤️ using React & Tailwind CSS
      </footer>
    </div>
  );
}

export default Contact;