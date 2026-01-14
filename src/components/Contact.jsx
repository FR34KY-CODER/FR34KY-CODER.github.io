const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:bg-gradient-to-r dark:from-indigo-700 dark:to-purple-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg mb-8 opacity-90">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:ojasvigoyal275@gmail.com"
                className="px-6 py-3 bg-white text-indigo-600 dark:text-indigo-800 rounded-md hover:bg-gray-100 transition flex items-center"
              >
                <i className="fas fa-envelope mr-2"></i> Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/ojasvi-goyal-85b82525b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 rounded-md hover:bg-white/20 transition flex items-center"
              >
                <i className="fab fa-linkedin-in mr-2"></i> LinkedIn
              </a>
              <a
                href="https://github.com/FR34KY-CODER"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 rounded-md hover:bg-white/20 transition flex items-center"
              >
                <i className="fab fa-github mr-2"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
