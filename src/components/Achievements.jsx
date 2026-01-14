const Achievements = () => {
  const achievements = [
    {
      title: 'Codeforces Pupil',
      category: 'Competitive Programming',
      period: 'Nov 2023 - May 2025',
      description:
        'Solved Over 180 Problems in practice + Hands on 20+ rated contests and in total 25+ contests. Attained the Maximum Rating of 1237 with best ranked as 3847 Globally.',
      link: 'https://codeforces.com/profile/FR34KY_CODER',
      linkText: 'Codeforces Profile',
    },
    {
      title: 'LeetCode Competitor',
      category: 'Competitive Programming',
      period: 'Jan 2025 - Jun 2025',
      description:
        'Attained maximum rating of 1736 with a Global rank of 750 in Biweekly Contest 158 with solved Over 200+ Problems with Maintaining Daily Consistency.',
      link: 'https://leetcode.com/u/DSA_FR34K/',
      linkText: 'LeetCode Profile',
    },
  ];

  return (
    <section id="achievements" className="py-16 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text dark:gradient-text-dark">
          Achievements
        </h2>
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-600 transition duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-100">{achievement.title}</h3>
                <span className="text-gray-600 dark:text-dark-300">{achievement.category}</span>
                <span className="text-gray-500 dark:text-dark-400">{achievement.period}</span>
              </div>
              <p className="text-gray-600 dark:text-dark-300 mb-4">{achievement.description}</p>
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
              >
                {achievement.linkText} <i className="fas fa-external-link-alt ml-1 text-sm"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
