import { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Hero = () => {
  const { darkMode } = useDarkMode();
  const titles = ["Data Scientist", "Developer"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateTitle(true);
      setTimeout(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        setAnimateTitle(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const blobs = [
    { size: 64, left: '25%', top: '25%', color: darkMode ? '#6366f1' : '#93c5fd', delay: 0 },
    { size: 80, left: '75%', top: '33%', color: darkMode ? '#8b5cf6' : '#a5b4fc', delay: 2000 },
    { size: 96, left: '33%', top: '75%', color: darkMode ? '#7c3aed' : '#c4b5fd', delay: 4000 },
  ];

  return (
    <section id="about" className="pt-16 pb-16 md:pt-24 md:pb-24 relative overflow-hidden">
      <style>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.2;
          z-index: -1;
          animation: float 15s infinite ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(50px, -50px); }
          50% { transform: translate(0, -100px); }
          75% { transform: translate(-50px, -50px); }
        }
        .fluid-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          z-index: -1;
        }
        .dark .fluid-bg::before {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0) 100%);
        }
      `}</style>
      <div className="fluid-bg absolute inset-0"></div>
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="blob"
          style={{
            width: `${blob.size * 4}px`,
            height: `${blob.size * 4}px`,
            left: blob.left,
            top: blob.top,
            backgroundColor: blob.color,
            animationDelay: `${blob.delay}ms`,
          }}
        ></div>
      ))}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text dark:gradient-text-dark">Ojasvi Goyal</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-dark-200 mb-6">
              <span className={`inline-block ${animateTitle ? 'animate-popIn' : ''}`}>
                {titles[currentTitleIndex]}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-300 mb-8">
              Creative Developer | Machine Learning Enthusiast | Passionate about building impactful solutions with strong design sense and full-stack expertise.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://drive.google.com/file/d/1poUrRB62hjhjiqe_tIb7EDiyWXo1G0Du/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition flex items-center dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800"
              >
                <i className="fas fa-file-alt mr-2"></i> View Resume
              </a>
              <div className="flex space-x-4">
                <a
                  href="mailto:ojasvigoyal275@gmail.com"
                  className="text-gray-600 hover:text-indigo-600 transition text-2xl dark:text-dark-300 dark:hover:text-indigo-400"
                >
                  <i className="fas fa-envelope"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/ojasvi-goyal-85b82525b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition text-2xl dark:text-dark-300 dark:hover:text-indigo-400"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://github.com/FR34KY-CODER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition text-2xl dark:text-dark-300 dark:hover:text-indigo-400"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-dark-700 shadow-xl">
                <img
                  src="https://framerusercontent.com/images/E1aBzSGAWHg989RRNeBy0Jj9HR4.jpg"
                  alt="Ojasvi Goyal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-dark-700 p-2 rounded-full shadow-lg">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-2 rounded-full">
                  <i className="fas fa-code text-white text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
