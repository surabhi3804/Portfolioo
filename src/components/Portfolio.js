import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import './portfolio.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const phrases = ['Web Developer', 'Problem Solver', 'Tech Enthusiast'];

  const skillsData = [
    { icon: '💻', title: 'Programming Languages', description: 'C, C++,Python, MySQL', color: '#6366f1' },
    { icon: '⚡', title: 'Web Development', description: 'HTML, CSS,Javascript', color: '#8b5cf6' },
    { icon: '🛠️', title: 'Tools', description: 'Git, GitHub, Google Colab,VS Code', color: '#06b6d4' },
    { icon: '🤝', title: 'Soft Skills', description: 'Time Management, Teamwork', color: '#10b981' },
    { icon: '⚡', title: 'Relevant Coursework', description: 'Database Management, Operating System.', color: '#8b5cf6' }
  ];

  const projectsData = [
    {
      title: 'Price Comparison Website',
      description: 'Developed a website using Drupal that allows users to compare product prices across e-commerce websites',
      tags: ['Drupal'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      link: 'https://drive.google.com/drive/folders/1LrJM6uEYpjJkh5YWFf3fTJc0bs-xvaT5?usp=drive_link'
    },
  ];

  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        if (charIndex > 0) {
          setTypewriterText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setTypewriterText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }
      }
    };

    let speed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === phrases[phraseIndex].length) {
      speed = 2000;
      setTimeout(() => setIsDeleting(true), speed);
      return;
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex(prev => (prev + 1) % phrases.length);
      speed = 500;
    }

    const timeout = setTimeout(typeWriter, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'resume', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Surabhi Tyagi
            </div>
            <div className="hidden md:flex gap-8">
              {['home', 'about', 'resume', 'skills', 'projects', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-violet-400 ${activeSection === section ? 'text-violet-400' : 'text-gray-400'}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 text-center px-6 animate-on-scroll max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Surabhi Tyagi</span>
          </h1>
          <div className="text-2xl md:text-3xl text-gray-300 mb-8 min-h-[3rem] flex items-center justify-center">
            <span>{typewriterText}</span>
            <span className="inline-block w-0.5 h-8 bg-violet-500 ml-1 animate-pulse">|</span>
          </div>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate about creating elegant solutions to complex problems. Transforming ideas into exceptional digital experiences.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all">
              View Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border-2 border-violet-500 rounded-full font-semibold hover:bg-violet-500/10 transition-all">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center animate-on-scroll">
            <div className="relative">
              <div className="about-image-container">
                {!imageError ? (
                  <img 
                    src={`${process.env.PUBLIC_URL}/aboutme.jpg`}
                    alt="Surabhi Tyagi" 
                    className="about-image"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="image-placeholder">Image not found</div>
                )} : (
                  <div className="image-placeholder">Image not found</div>
                )
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Passionate and self-motivated B.Tech Information Technology student with a strong interest in web development. Eager to build real-world applications and contribute to collaborative tech projects.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Actively seeking opportunities to learn, grow, and apply development skills in practical environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 animate-on-scroll">My Resume</h2>
          <p className="text-lg text-gray-400 mb-12 animate-on-scroll">
            Download my resume to learn more about my experience, education, and qualifications.
          </p>
          <div className="animate-on-scroll">
            <a 
              href="https://drive.google.com/file/d/1SHJi8NObqLJ-PytQVK1UHtWywYBS64U7/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll">Skills & Expertise</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skillsData.map((skill, index) => (
              <div key={index} className="animate-on-scroll p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/20" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4" style={{ background: skill.color }}>
                  {skill.icon}
                </div>
                <h3 className="font-semibold mb-2">{skill.title}</h3>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <a 
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-on-scroll group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-all hover:shadow-xl hover:shadow-violet-500/20 cursor-pointer block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 relative overflow-hidden" style={{ background: project.gradient }}>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="text-white" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-gray-400 mb-8">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <Mail className="text-violet-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">surabhityagi59@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 flex items-center justify-center">
                    <Phone className="text-fuchsia-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-gray-400 text-sm">7700034050</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <MapPin className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-gray-400 text-sm">Mumbai, India</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/surabhi3804" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 hover:border-violet-500 flex items-center justify-center transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/surabhi-tyagi-03643731b/" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 hover:border-violet-500 flex items-center justify-center transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Surabhi Tyagi"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="surabhityagi59@gmail.com"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button onClick={handleSubmit} className="w-full px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-zinc-900 text-center text-gray-500">
        <p>&copy; 2025 Surabhi Tyagi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;