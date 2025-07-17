import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract';
}

const jobOpenings: JobOpening[] = [
  { id: 1, title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Product Manager, Tasker Experience', department: 'Product', location: 'Remote', type: 'Full-time' },
  { id: 3, title: 'Community Manager, Pakistan', department: 'Marketing', location: 'Islamabad', type: 'Full-time' },
  { id: 4, title: 'Data Scientist', department: 'Data & Analytics', location: 'Remote', type: 'Contract' },
  { id: 5, title: 'Head of Trust & Safety', department: 'Operations', location: 'Remote', type: 'Full-time' },
];

const CareersPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-20">
      <BackButton />
      <section className="text-center py-16 bg-gradient-to-r from-fog-secondary to-teal-600 rounded-2xl text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Shape the Future of Work With Us
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-teal-100">
          We're a passionate team of innovators, thinkers, and builders dedicated to revolutionizing the way the world works. If you're driven by impact, join us.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-fog-dark dark:text-fog-light">Current Openings</h2>
        <p className="text-center mt-2 text-fog-mid dark:text-slate-400">Find your next challenge. We're hiring across all departments.</p>

        <div className="mt-12 max-w-4xl mx-auto bg-fog-white dark:bg-fog-mid-dark rounded-xl shadow-lg dark:shadow-2xl-dark">
          <ul className="divide-y divide-gray-200 dark:divide-slate-700">
            {jobOpenings.map((job) => (
              <li key={job.id}>
                <Link to="#" className="block hover:bg-gray-50 dark:hover:bg-slate-700/50 p-6 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-fog-accent">{job.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {job.department} &middot; {job.location}
                      </p>
                    </div>
                    <div className="text-right">
                       <span className={`px-3 py-1 text-xs font-medium rounded-full ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>
                          {job.type}
                       </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="text-center bg-fog-light dark:bg-fog-mid-dark p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-fog-dark dark:text-fog-light">Don't See a Role For You?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          We're always looking for talented individuals. If you believe you have what it takes to contribute to our mission, we'd love to hear from you.
        </p>
        <div className="mt-6">
          <Link to="/contact" className="px-8 py-3 bg-fog-accent text-white font-semibold rounded-lg shadow-md hover:bg-fog-accent-hover">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;