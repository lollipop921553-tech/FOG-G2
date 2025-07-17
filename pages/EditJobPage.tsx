import React, { useState, useEffect } from 'react';
import { JobType, Job } from '../types';
import { useAuth } from '../hooks/useAuth';
import { getJobById, updateJob } from '../services/mockDataService';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import BackButton from '../components/BackButton';

const EditJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    budget: '',
    location: '',
  });

  useEffect(() => {
    getJobById(jobId).then(jobData => {
        if (jobData && jobData.postedBy.id === user?.id) {
            setJob(jobData);
            setFormData({
                title: jobData.title,
                description: jobData.description,
                skills: jobData.skills.join(', '),
                budget: String(jobData.budget),
                location: jobData.location || '',
            });
        } else {
            setJob(null); // Job not found or user is not the owner
        }
    });
  }, [jobId, user]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    const updatedJob: Job = {
      ...job,
      title: formData.title,
      description: formData.description,
      budget: Number(formData.budget),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      location: job.type === JobType.Task ? formData.location : undefined,
    };
    
    await updateJob(updatedJob);
    alert('Job updated successfully!');
    navigate('/dashboard');
  };

  if (job === undefined) {
    return <div className="text-center">Loading...</div>;
  }
  
  if (job === null) {
      return <NotFoundPage />; // Or an "Access Denied" page
  }


  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <BackButton />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fog-dark dark:text-fog-light">
          Edit {job.type === JobType.Freelance ? 'Freelance Job' : 'Local Task'}
        </h1>
        <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Update the details for your post.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-fog-white dark:bg-fog-mid-dark p-8 rounded-lg shadow-lg dark:shadow-lg-dark space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-fog-accent focus:border-fog-accent bg-fog-white dark:bg-slate-800"/>
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
          {job.type === JobType.Task && (
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPage;