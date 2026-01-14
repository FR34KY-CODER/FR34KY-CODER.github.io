import { useEffect } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const blobs = document.querySelectorAll('.blob');
      const scrollPosition = window.pageYOffset;

      blobs.forEach((blob, index) => {
        const speed = 0.1 + (index * 0.05);
        const offset = scrollPosition * speed;
        blob.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DarkModeProvider>
      <div className="font-sans antialiased text-gray-800 bg-white dark:bg-dark-900 dark:text-dark-100 transition-colors duration-300">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;
