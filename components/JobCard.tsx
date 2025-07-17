import React from 'react';
import { Link } from 'react-router-dom';
import { Job, JobType } from '../types';
import { LocationPinIcon, StarIcon, ZapIcon } from './Icons';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className={`relative bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-md hover:shadow-xl dark:shadow-lg-dark dark:hover:shadow-xl-dark transition-all duration-300 border ${job.isSponsored ? 'border-fog-secondary' : 'border-transparent dark:border-slate-700'} hover:-translate-y-1`}>
      <div className="p-6">
        {job.isSponsored && (
          <div className="absolute top-0 right-0 -mt-3 -mr-3 z-10">
             <span className="flex items-center h-8 px-3 text-xs font-bold text-white bg-fog-secondary rounded-full shadow-lg">
                <ZapIcon className="w-4 h-4 mr-1"/> Sponsored
            </span>
          </div>
        )}
        <div className="flex items-start mb-4">
          <img className="h-12 w-12 rounded-full object-cover" src={job.postedBy.avatarUrl} alt={job.postedBy.name} />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-fog-dark dark:text-fog-light leading-tight hover:text-fog-accent transition-colors">
                <Link to={`/job/${job.id}`}>{job.title}</Link>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>by {job.postedBy.name}</span>
              <span className="inline-flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                <span className="font-semibold">{job.postedBy.rating}</span>
              </span>
            </p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden text-ellipsis">{job.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">{skill}</span>
          ))}
          {job.allowsPointDiscount && (
            <span className="px-2 py-1 bg-fog-secondary/20 text-fog-secondary text-xs font-medium rounded-full flex items-center gap-1">
                <ZapIcon className="w-3 h-3"/> FOG Points Accepted
            </span>
          )}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-700">
          <div>
            <p className="text-xl font-bold text-fog-dark dark:text-fog-white">${job.budget}</p>
            {job.type === JobType.Task && job.location && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <LocationPinIcon className="w-4 h-4 mr-1"/>
                {job.location}
              </p>
            )}
          </div>
          <Link to={`/job/${job.id}`} className="px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;