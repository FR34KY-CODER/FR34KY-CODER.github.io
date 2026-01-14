const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-800 text-gray-800 dark:text-dark-200 py-8 border-t border-gray-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold gradient-text dark:gradient-text-dark">Ojasvi Goyal</span>
            <p className="text-gray-600 dark:text-dark-400 mt-1">Data Scientist & Developer</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="mailto:ojasvigoyal275@gmail.com"
              className="text-gray-600 dark:text-dark-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ojasvi-goyal-85b82525b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-dark-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a
              href="https://github.com/FR34KY-CODER"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-dark-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700 text-center text-gray-500 dark:text-dark-500 text-sm">
          <p>© 2023 Ojasvi Goyal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
