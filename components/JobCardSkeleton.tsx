import React from 'react';

const JobCardSkeleton: React.FC = () => (
  <div className="bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-md dark:shadow-lg-dark p-6 animate-pulse">
    <div className="flex items-start mb-4">
      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-slate-700"></div>
      <div className="ml-4 flex-1">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
        <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
        <div className="h-5 w-12 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="h-7 w-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
        <div className="h-10 w-28 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
    </div>
  </div>
);

export default JobCardSkeleton;