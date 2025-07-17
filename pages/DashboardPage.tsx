import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { CheckBadgeIcon, StarIcon, ZapIcon, WalletIcon, MessageIcon, BriefcaseIcon, ArrowRightIcon } from '../components/Icons';
import { Job, Activity } from '../types';
import { getJobsByUserId, getActivities, getEarningsBreakdown, getMonthlyActivity } from '../services/mockDataService';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<Job[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [earningsData, setEarningsData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getJobsByUserId(user.id).then(posts => setMyPosts(posts.slice(0, 5))); // show recent 5
      getActivities(user.id).then(setActivities);
      getEarningsBreakdown().then(setEarningsData);
      getMonthlyActivity().then(setActivityData);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const StatCard: React.FC<{label: string; value: string | number; icon: React.ReactNode}> = ({ label, value, icon }) => (
      <div className="bg-fog-light dark:bg-fog-dark p-4 rounded-lg flex items-center">
          <div className="p-3 rounded-full bg-fog-accent/10 text-fog-accent">{icon}</div>
          <div className="ml-3">
              <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
              <p className="text-lg font-bold text-fog-dark dark:text-fog-light">{value}</p>
          </div>
      </div>
  );

  const ActivityIcon: React.FC<{type: Activity['type']}> = ({ type }) => {
    const iconClass = "w-5 h-5";
    switch(type) {
        case 'message': return <MessageIcon className={iconClass} />;
        case 'bid': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass}><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>;
        case 'job_completed': return <CheckBadgeIcon className={iconClass} />;
        case 'withdrawal': return <WalletIcon className={iconClass} />;
        case 'job_posted': return <BriefcaseIcon className={iconClass} />;
        default: return <ZapIcon className={iconClass} />;
    }
  };

  const ActivityItem: React.FC<{activity: Activity}> = ({ activity }) => (
    <li className="flex items-start space-x-4 py-3">
        <div className={`relative flex-shrink-0 mt-1 rounded-full p-2 ${activity.isRead ? 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400' : 'bg-fog-accent/10 text-fog-accent'}`}>
            <ActivityIcon type={activity.type}/>
            {!activity.isRead && <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-fog-accent"></span>}
        </div>
        <div className="flex-1">
             <p className="text-sm text-fog-dark dark:text-fog-light">{activity.text}</p>
            <p className="text-xs text-gray-400 dark:text-slate-500">{new Date(activity.timestamp).toLocaleString()}</p>
        </div>
        {activity.link && (
            <Link to={activity.link} className="p-2 text-gray-400 hover:text-fog-accent rounded-full transition-colors">
                <ArrowRightIcon className="w-5 h-5" />
            </Link>
        )}
    </li>
  );

  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
      {/* Left Sidebar */}
      <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
        <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark text-center">
          {user.isPremium && <span className="absolute top-4 right-4 text-xs font-bold text-yellow-800 bg-yellow-300/50 px-2 py-1 rounded-full uppercase tracking-wider">PREMIUM</span>}
          <img className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-fog-accent/20" src={user.avatarUrl} alt={user.name} />
          <h1 className="mt-4 text-2xl font-bold text-fog-dark dark:text-fog-light">{user.name}</h1>
          <p className="text-fog-mid dark:text-slate-400 text-sm">{user.tagline}</p>
          <div className="mt-4 flex justify-center items-center space-x-4">
            {user.isIdVerified && <span className="flex items-center text-xs text-green-600 dark:text-green-400"><CheckBadgeIcon className="w-4 h-4 mr-1" /> ID Verified</span>}
            {user.isLinkedInVerified && <span className="flex items-center text-xs text-blue-600 dark:text-blue-400"><CheckBadgeIcon className="w-4 h-4 mr-1" /> LinkedIn</span>}
          </div>
        </div>

        <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark">
            <h3 className="font-bold text-lg text-fog-dark dark:text-fog-light mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-fog-accent/10 text-fog-accent text-xs font-medium rounded-full">{skill}</span>
                ))}
            </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="lg:col-span-8 xl:col-span-9 space-y-8">
         <section className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark">
            <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light">Welcome back, {user.name.split(' ')[0]}!</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <StatCard label="USD Balance" value={`$${user.usdBalance.toFixed(2)}`} icon={<WalletIcon className="w-5 h-5" />} />
                <StatCard label="FOG Points" value={user.points} icon={<ZapIcon className="w-5 h-5"/>} />
                <StatCard label="Rating" value={user.rating.toFixed(1)} icon={<StarIcon className="w-5 h-5" />} />
                <StatCard label="Jobs Done" value={user.workHistory.length} icon={<CheckBadgeIcon className="w-5 h-5"/>} />
            </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark">
                <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light mb-4">Earnings Breakdown</h3>
                <div className="h-48">
                    <PieChart data={earningsData} />
                </div>
            </div>
             <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark">
                <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light mb-4">Monthly Activity</h3>
                 <div className="h-48">
                    <BarChart data={activityData} />
                 </div>
            </div>
        </section>
        
        <section className="grid lg:grid-cols-2 gap-8">
            <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark">
                <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light mb-2">Activity Feed</h3>
                <ul className="divide-y divide-gray-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                    {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
                </ul>
            </div>

            <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-xl shadow-lg dark:shadow-2xl-dark">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light">My Active Posts</h3>
                    <Link to="/post-job" className="px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover text-sm">Post New Job</Link>
                </div>
                 {myPosts.length > 0 ? (
                   <ul className="space-y-3">
                       {myPosts.map(job => (
                           <li key={job.id} className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-center">
                                <div>
                                    <Link to={`/job/${job.id}`} className="font-semibold text-fog-dark dark:text-fog-light hover:text-fog-accent transition-colors">{job.title}</Link>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">
                                        <span className={`capitalize ${job.type === 'freelance' ? 'text-blue-500' : 'text-teal-500'}`}>{job.type}</span> - ${job.budget}
                                    </p>
                                </div>
                                <Link to={`/job/${job.id}`} className="p-2 text-gray-400 hover:text-fog-accent rounded-full transition-colors">
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                            </li>
                       ))}
                   </ul>
                ) : (
                    <p className="text-gray-500 dark:text-slate-400 text-center py-4">You haven't posted any jobs or tasks yet.</p>
                )}
            </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;