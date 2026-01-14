const Projects = () => {
  const projects = [
    {
      title: 'Legal Case Classifier & Summariser Using Transformers',
      category: 'Machine Learning',
      description:
        'A sophisticated system that extracts case data, preprocesses legal text, classifies cases using heuristic rules, and generates concise summaries with transformer models.',
      image: 'https://framerusercontent.com/images/YKMHCYuqVuwVPs8HT7ud60Cn9L0.png',
      features: [
        { title: 'Web Scraping', desc: 'Extracts case data from official court sources into CSV (~250MB)' },
        { title: 'Preprocessing', desc: 'Lowercasing, stop word removal, lemmatization, and n-gram generation' },
        { title: 'Classification', desc: 'Heuristic rule-based prediction using manually vectorized keywords' },
        { title: 'Summarization', desc: '100-word summaries using T5/BART with professional legal tone' },
      ],
      accuracy: 80,
      github: 'https://github.com/FR34KY-CODER/Legal-Case-Classification-and-Summarization',
      reverse: false,
    },
    {
      title: 'InstaApp - Social Media Application',
      category: 'Android Development',
      description:
        'A feature-rich social media Android application built with Kotlin and Firebase, offering Instagram-style functionality with modern UI and real-time updates.',
      image: 'https://framerusercontent.com/images/FhIwP5LfEvkvqdAhuCn8vRWBVQ.png',
      features: [
        { title: 'User account creation and authentication', desc: '' },
        { title: 'Photo posting with captions', desc: '' },
        { title: 'Follow system and news feed', desc: '' },
        { title: 'Like and comment functionality', desc: '' },
        { title: 'Instagram-style stories', desc: '' },
        { title: 'Real-time updates', desc: '' },
      ],
      tags: ['Kotlin', 'XML', 'Firebase'],
      github: 'https://github.com/FR34KY-CODER/InstaApp',
      reverse: true,
    },
    {
      title: 'ContriKarle - Expense Splitting App',
      category: 'Android Development',
      description:
        'A modern expense-splitting app designed to help friends, roommates, and groups manage shared expenses effortlessly with a sleek, dark-themed UI.',
      image: 'https://framerusercontent.com/images/He7Z7sKHS7GgUmVmUcjLEyhsij8.png',
      features: [
        { title: 'Track shared expenses among groups', desc: '' },
        { title: 'Instant settlement calculations', desc: '' },
        { title: 'Clean, transparent money tracking', desc: '' },
        { title: 'No ads or subscriptions', desc: '' },
        { title: 'Perfect for trips, parties, or daily living', desc: '' },
        { title: 'Built with Jetpack Compose', desc: '' },
      ],
      tags: ['Kotlin', 'Compose', 'Firebase'],
      github: 'https://github.com/FR34KY-CODER/ContriKarle',
      reverse: false,
    },
  ];

  return (
    <section id="projects" className="py-16 bg-white dark:bg-dark-900">
      <style>{`
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .dark .project-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text dark:gradient-text-dark">
          Featured Projects
        </h2>
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 rounded-xl shadow-md overflow-hidden mb-10 transition duration-300 border border-gray-200 dark:border-dark-600"
          >
            <div className={`md:flex ${project.reverse ? 'flex-row-reverse' : ''}`}>
              <div className="md:w-1/2">
                <img className="w-full h-full object-cover" src={project.image} alt={project.title} />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-100 mb-4">{project.title}</h3>
                <p className="text-gray-600 dark:text-dark-300 mb-6">{project.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 dark:text-dark-200 mb-2">
                    {project.features.length > 0 && (project.accuracy ? 'Key Features:' : 'Features:')}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-dark-300">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        {feature.title && feature.desc ? (
                          <>
                            <span className="font-medium">{feature.title}</span> – {feature.desc}
                          </>
                        ) : (
                          feature.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  {project.accuracy ? (
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 dark:bg-dark-600 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 h-2.5 rounded-full"
                          style={{ width: `${project.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-dark-300">
                        {project.accuracy}% Accuracy
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {project.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-2 py-1 rounded-full text-xs ${
                            tag === 'Kotlin'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                              : tag === 'XML'
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                              : tag === 'Compose'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                              : tag === 'Firebase'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
                  >
                    View on GitHub <i className="fas fa-external-link-alt ml-1 text-sm"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
