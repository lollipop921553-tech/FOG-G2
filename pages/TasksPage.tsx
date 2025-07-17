import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { getLocalTasks } from '../services/mockDataService';
import JobCard from '../components/JobCard';
import { LocationPinIcon } from '../components/Icons';
import JobCardSkeleton from '../components/JobCardSkeleton';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    getLocalTasks().then(data => {
      setTasks(data.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    });
  }, []);

  const filteredTasks = tasks.filter(task => {
    const termMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = locationFilter === 'All' || task.location === locationFilter;
    return termMatch && locationMatch;
  });

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-fog-dark dark:text-fog-light">Local Tasks, Real-World Work</h1>
        <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Find physical jobs and tasks that need doing right in your city.</p>
        <div className="mt-4 inline-flex items-center bg-fog-light dark:bg-fog-mid-dark border border-fog-mid/20 dark:border-slate-700 text-fog-mid dark:text-slate-300 text-sm font-medium px-4 py-2 rounded-full">
            <LocationPinIcon className="w-5 h-5 mr-2 text-fog-accent" />
            Currently serving: <strong className="mx-1 text-fog-dark dark:text-fog-light">Islamabad & Rawalpindi</strong>
        </div>
      </div>

      <div className="mb-8 max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title or keyword (e.g., 'plumbing', 'delivery')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fog-accent bg-fog-white dark:bg-fog-mid-dark"
        />
        <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fog-accent bg-fog-white dark:bg-fog-mid-dark"
        >
            <option>All</option>
            <option>Islamabad</option>
            <option>Rawalpindi</option>
        </select>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTasks.map(task => (
            <JobCard key={task.id} job={task} />
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && !loading && (
        <div className="text-center py-16 bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-md dark:shadow-lg-dark">
            <h3 className="text-xl font-semibold text-fog-dark dark:text-fog-light">No Tasks Found</h3>
            <p className="text-fog-mid dark:text-slate-400 mt-2">Try adjusting your search or location filter.</p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
