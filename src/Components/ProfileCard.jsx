import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const ProfileCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const techStack = [
    { name: 'Flutter', icon: '/images/flutter_3d.png', color: 'from-sky-400/20 to-blue-500/20', borderColor: 'group-hover:border-sky-500/50' },
    { name: 'React Native', icon: '/images/web_3d.png', color: 'from-purple-400/20 to-indigo-500/20', borderColor: 'group-hover:border-purple-500/50' },
    { name: 'Android', icon: '/images/android_3d.png', color: 'from-green-400/20 to-emerald-500/20', borderColor: 'group-hover:border-green-500/50' },
    { name: 'iOS', icon: '/images/apple_3d.png', color: 'from-gray-400/20 to-zinc-500/20', borderColor: 'group-hover:border-gray-400/50' }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md"
      >
        {/* Profile Image with depth */}
        <div style={{ transform: "translateZ(80px)" }} className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <img
            src='/images/mahendra31.png'
            alt="Mahendra Gurjar"
            className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto object-cover border-4 border-white/10 ring-2 ring-sky-500/50 shadow-2xl"
            loading="lazy"
          />
        </div>

        {/* Name & Title with depth */}
        <div style={{ transform: "translateZ(60px)" }} className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Mahendra Gurjar
          </h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400 font-black text-sm sm:text-base uppercase tracking-widest">
            Cross-Platform Expert
          </p>
        </div>

        {/* Tech Stack Grid with progressive depth */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {techStack.map((tech, idx) => (
            <div 
              key={tech.name}
              style={{ transform: `translateZ(${40 - idx * 5}px)` }}
              className={`group bg-gradient-to-br ${tech.color} rounded-xl p-3 flex items-center gap-3 border border-white/5 ${tech.borderColor} transition-all duration-300 hover:scale-105 active:scale-95`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-8 h-8 object-contain drop-shadow-lg group-hover:scale-110 transition-transform animate-float-icon" 
                  style={{ animationDelay: `${idx * 0.5}s` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Quote with depth */}
        <div style={{ transform: "translateZ(30px)" }} className="relative mb-6 p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-purple-500 opacity-50"></div>
          <div className="absolute -top-2 left-4 text-3xl text-sky-500/30">"</div>
          <p className="text-xs sm:text-sm text-zinc-300 italic text-center relative z-10 leading-relaxed font-medium">
            Transforming ideas into seamless experiences across every platform
          </p>
          <div className="absolute -bottom-2 right-4 text-3xl text-purple-500/30 rotate-180">"</div>
        </div>

        {/* Social Links with high depth */}
        <div style={{ transform: "translateZ(100px)" }} className="flex justify-center gap-4">
          {[
            { icon: FaGithub, href: 'https://github.com/mahigurjar123/mahendragurjar', color: 'hover:text-white hover:bg-zinc-800' },
            { icon: FaLinkedin, href: 'https://linkedin.com/in/mahendra121', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
            { icon: FaInstagram, href: 'https://instagram.com/m.gurjar131', color: 'hover:text-pink-500 hover:bg-pink-500/10' },
            { icon: FaTwitter, href: 'https://twitter.com', color: 'hover:text-blue-400 hover:bg-blue-400/10' }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              target="_blank" 
              rel="noreferrer"
              className={`p-3 rounded-xl bg-white/5 border border-white/10 ${social.color} border-transparent transition-all duration-300 hover:scale-125 hover:-translate-y-2 active:scale-90`}
            >
              <social.icon className={`w-5 h-5 text-zinc-400 transition-colors`} />
            </a>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </motion.div>
      
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }
        .animate-float-icon { animation: float-icon 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ProfileCard;