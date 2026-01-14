const Experience = () => {
  const experiences = [
    {
      title: 'Domain Lead',
      organization: 'Google Developer Groups',
      period: 'Jan 2024 - May 2025',
      description:
        'Led technical domains and initiatives within the Google Developer Group community, organizing events, workshops, and mentoring developers.',
    },
    {
      title: 'Data Science Job Simulation',
      organization: 'Lloyds Banking Group',
      period: 'July 2025',
      description:
        'Completed an intensive job simulation focused on real-world data science challenges in the banking sector.',
      certificate: 'https://drive.google.com/file/d/1fAwHZQGJ5SqGg24UYsOLZpRwlMOzMz2s/view?usp=drive_link',
    },
    {
      title: 'Data Analytics Job Simulation',
      organization: 'Deloitte Australia',
      period: 'Jun 2025',
      description:
        'Participated in a job simulation program focused on data analytics techniques and business intelligence applications.',
      certificate: 'https://drive.google.com/file/d/14CPhcZHABkz90e7Fl8Z_RFih369Nbr7N/view?usp=drive_link',
    },
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text dark:gradient-text-dark">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 transition duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-100">{experience.title}</h3>
                <span className="text-gray-600 dark:text-dark-300">{experience.organization}</span>
                <span className="text-gray-500 dark:text-dark-400">{experience.period}</span>
              </div>
              <p className="text-gray-600 dark:text-dark-300 mb-4">{experience.description}</p>
              {experience.certificate && (
                <a
                  href={experience.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
                >
                  View Certificate <i className="fas fa-external-link-alt ml-1 text-sm"></i>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
