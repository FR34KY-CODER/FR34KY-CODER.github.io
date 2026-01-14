import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#achievements', label: 'Achievements' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`w-[95%] ${darkMode ? 'nav-dark' : 'nav-light'} backdrop-blur-sm rounded-3xl mt-4 mx-auto sticky top-4 z-50 transition-all duration-300`}>
      <style>{`
        .nav-light {
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(209, 213, 219, 0.5);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-dark {
          background-color: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(55, 65, 81, 0.5);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500 dark:border-indigo-400">
              <img
                src="https://framerusercontent.com/images/HAaqsG46Fh1li9RmjNWPayHOhxs.png?scale-down-to=512"
                alt="FR34K"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-purple-600 transition dark:text-dark-200 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800"
            >
              Contact
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-700 dark:text-indigo-400`}></i>
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-700 dark:text-indigo-400`}></i>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-dark-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 py-2 px-4 shadow-lg dark:shadow-none">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-gray-700 hover:text-purple-600 transition dark:text-dark-200 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition dark:from-indigo-600 dark:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 text-center"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
