const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: 'fa-code',
      skills: [
        { name: 'C++', color: 'blue' },
        { name: 'Python', color: 'green' },
        { name: 'Kotlin', color: 'purple' },
        { name: 'SQL', color: 'yellow' },
        { name: 'HTML/CSS', color: 'red' },
        { name: 'JavaScript', color: 'indigo' },
        { name: 'XML', color: 'gray' },
      ],
    },
    {
      title: 'Tech Stack',
      icon: 'fa-layer-group',
      skills: [
        { name: 'Android Studio', color: 'blue' },
        { name: 'Firebase', color: 'green' },
        { name: 'Git', color: 'purple' },
        { name: 'VSCode', color: 'yellow' },
        { name: 'Unity', color: 'red' },
        { name: 'Jupyter', color: 'indigo' },
        { name: 'Figma', color: 'gray' },
      ],
    },
    {
      title: 'Domains',
      icon: 'fa-shapes',
      skills: [
        { name: 'Machine Learning', color: 'blue' },
        { name: 'Android Development', color: 'green' },
        { name: 'Deep Learning', color: 'purple' },
        { name: 'NLP', color: 'yellow' },
        { name: 'Game Development', color: 'red' },
        { name: 'Data Analysis', color: 'indigo' },
        { name: 'UI/UX', color: 'gray' },
        { name: 'Web Scraping', color: 'pink' },
      ],
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
    gray: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
  };

  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-dark-800">
      <style>{`
        .skill-badge:hover {
          transform: scale(1.05);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text dark:gradient-text-dark">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-700 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center dark:text-dark-100">
                <i className={`fas ${category.icon} mr-2 gradient-text dark:gradient-text-dark`}></i>{' '}
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`skill-badge px-3 py-1 rounded-full text-sm transition ${
                      colorClasses[skill.color]
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
