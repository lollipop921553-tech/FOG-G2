import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { getFreelanceJobs } from '../services/mockDataService';
import JobCard from '../components/JobCard';
import JobCardSkeleton from '../components/JobCardSkeleton';

const FreelancePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    getFreelanceJobs().then(data => {
      setJobs(data.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    });
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-fog-dark dark:text-fog-light">Find Your Next Global Opportunity</h1>
        <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Browse thousands of freelance projects from clients around the world.</p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by title, skill, or keyword (e.g., 'React', 'UI/UX Designer')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fog-accent bg-fog-white dark:bg-fog-mid-dark dark:text-fog-light"
        />
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {filteredJobs.length === 0 && !loading && (
        <div className="text-center py-16 bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-md dark:shadow-lg-dark">
            <h3 className="text-xl font-semibold text-fog-dark dark:text-fog-light">No Jobs Found</h3>
            <p className="text-fog-mid dark:text-slate-400 mt-2">Try adjusting your search term. New opportunities are posted daily!</p>
        </div>
      )}
    </div>
  );
};

export default FreelancePage;
