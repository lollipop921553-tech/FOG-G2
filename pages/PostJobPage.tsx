import React, { useState } from 'react';
import { JobType, Job } from '../types';
import { useAuth } from '../hooks/useAuth';
import { addJob } from '../services/mockDataService';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const PostJobPage: React.FC = () => {
  const [jobType, setJobType] = useState<JobType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    budget: '',
    location: '',
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobType || !user) return;

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      type: jobType,
      budget: Number(formData.budget),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      location: jobType === JobType.Task ? formData.location : undefined,
      postedBy: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        rating: user.rating,
        isPremium: user.isPremium
      },
      isSponsored: false,
      createdAt: new Date().toISOString(),
    };
    
    await addJob(newJob);

    alert('Job posted successfully!');

    if (jobType === JobType.Freelance) {
      navigate('/freelance');
    } else {
      navigate('/tasks');
    }
  };

  if (!jobType) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold text-fog-dark dark:text-fog-light">What would you like to post?</h1>
        <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Choose the type of work you need done.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-8">
          <button onClick={() => setJobType(JobType.Freelance)} className="p-8 bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-lg dark:shadow-lg-dark hover:shadow-2xl dark:hover:shadow-2xl-dark hover:-translate-y-1 transition-all duration-300 text-left">
            <h2 className="text-2xl font-bold text-fog-accent">Freelance Job</h2>
            <p className="mt-2 text-gray-600 dark:text-slate-300">Hire a global professional for a digital project (e.g., web design, writing).</p>
          </button>
          <button onClick={() => setJobType(JobType.Task)} className="p-8 bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-lg dark:shadow-lg-dark hover:shadow-2xl dark:hover:shadow-2xl-dark hover:-translate-y-1 transition-all duration-300 text-left">
            <h2 className="text-2xl font-bold text-fog-secondary">Local Task</h2>
            <p className="mt-2 text-gray-600 dark:text-slate-300">Find someone for a physical job in your area (e.g., plumbing, delivery).</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <BackButton onClick={() => setJobType(null)} />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fog-dark dark:text-fog-light">
          Post a New {jobType === JobType.Freelance ? 'Freelance Job' : 'Local Task'}
        </h1>
        <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Fill out the details below to attract the right talent.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-fog-white dark:bg-fog-mid-dark p-8 rounded-lg shadow-lg dark:shadow-lg-dark space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">e.g., "Build a Shopify Website", "Fix Leaky Kitchen Sink"</p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Be as detailed as possible about the requirements.</p>
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Required Skills</label>
          <input type="text" name="skills" id="skills" value={formData.skills} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Comma-separated, e.g., "React, TypeScript, Figma"</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget (USD)</label>
            <input type="number" name="budget" id="budget" value={formData.budget} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800" placeholder="e.g., 500"/>
          </div>
          {jobType === JobType.Task && (
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <select name="location" id="location" value={formData.location} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800">
                <option value="">Select city</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>
          )}
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-fog-accent hover:bg-fog-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fog-accent">
            Post {jobType === JobType.Freelance ? 'Job' : 'Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;