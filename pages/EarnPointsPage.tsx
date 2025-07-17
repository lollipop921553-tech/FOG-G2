import React, { useState, useEffect } from 'react';
import { Survey, RewardTask } from '../types';
import { getSurveys, getRewardTasks } from '../services/mockDataService';
import { ZapIcon, CheckBadgeIcon, AIIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

const EarnPointsPage: React.FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [rewardTasks, setRewardTasks] = useState<RewardTask[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getSurveys(), getRewardTasks()]).then(([surveyData, taskData]) => {
            setSurveys(surveyData);
            setRewardTasks(taskData);
            setLoading(false);
        });
    }, []);

    const handleAction = (reward: string) => {
        alert(`Action completed! You earned ${reward}. (This is a demo)`);
    };
    
    const RewardCard: React.FC<{title: string; description: string; icon: React.ReactNode; children: React.ReactNode;}> = ({title, description, icon, children}) => (
        <div className="bg-fog-white dark:bg-fog-mid-dark rounded-xl shadow-lg dark:shadow-lg-dark p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-fog-accent/10 text-fog-accent p-3 rounded-lg">{icon}</div>
                <div>
                    <h2 className="text-xl font-bold text-fog-dark dark:text-fog-light">{title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                </div>
            </div>
            <div className="flex-grow space-y-3 overflow-y-auto pr-2 -mr-2">
                {children}
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-fog-dark dark:text-fog-light">FOG Rewards Hub</h1>
                <p className="mt-2 text-lg text-fog-mid dark:text-slate-400 max-w-2xl mx-auto">Boost your earnings and unlock platform perks by completing various activities.</p>
            </div>

            {loading ? (
                <div className="text-center text-fog-mid dark:text-slate-400">Loading opportunities...</div>
            ) : (
                 <div className="grid md:grid-cols-2 gap-8">
                    {/* Watch Ads */}
                    <RewardCard 
                        title="Watch & Earn" 
                        description="Earn cash for watching short ads." 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m3.75-3.75v3.75M9 15l3 3m3-3l-3 3m-3-6h6m-6 4.5h6m-6-4.5V6a3 3 0 013-3h6a3 3 0 013 3v6a3 3 0 01-3 3H9a3 3 0 01-3-3v-1.5z" /></svg>}
                    >
                        <Link to="/watch-ads" className="block p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all group">
                           <div className="flex justify-between items-center">
                               <div>
                                   <h3 className="font-semibold text-fog-dark dark:text-fog-light">Watch Partner Ad</h3>
                                   <p className="text-sm text-gray-500 dark:text-gray-400">A 15-second video from our sponsors.</p>
                               </div>
                               <div className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-sm font-bold rounded-full transition-transform group-hover:scale-110">
                                   $0.50
                               </div>
                           </div>
                       </Link>
                    </RewardCard>

                    {/* Surveys */}
                    <RewardCard 
                        title="Surveys for Points" 
                        description="Share your opinion and earn FOG Points." 
                        icon={<AIIcon className="w-6 h-6"/>}
                    >
                        {surveys.map(survey => (
                            <div key={survey.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all group">
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 pr-4">
                                        <h3 className="font-semibold text-fog-dark dark:text-fog-light">{survey.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{survey.description}</p>
                                    </div>
                                    <button onClick={() => handleAction(`${survey.points} Points`)} className="flex-shrink-0 px-3 py-1.5 bg-fog-secondary/20 text-fog-secondary text-sm font-bold rounded-full transition-transform group-hover:scale-110">
                                        {survey.points} <span className="hidden sm:inline">Points</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </RewardCard>

                    {/* Micro-Tasks */}
                     <RewardCard 
                        title="Complete Micro-Tasks" 
                        description="Finish small tasks for various rewards." 
                        icon={<CheckBadgeIcon className="w-6 h-6"/>}
                    >
                        {rewardTasks.filter(t => !t.title.includes("Social")).map(task => (
                           <div key={task.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all group">
                               <div className="flex justify-between items-center">
                                   <div className="flex-1 pr-4">
                                       <h3 className="font-semibold text-fog-dark dark:text-fog-light">{task.title}</h3>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.description}</p>
                                   </div>
                                   <button onClick={() => handleAction(task.reward)} className={`flex-shrink-0 px-3 py-1.5 text-sm font-bold rounded-full transition-transform group-hover:scale-110 ${task.reward.includes('$') ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-fog-secondary/20 text-fog-secondary'}`}>
                                       {task.reward}
                                   </button>
                               </div>
                           </div>
                        ))}
                    </RewardCard>

                     {/* Promotions */}
                      <RewardCard 
                        title="Promotions" 
                        description="Promote products or services." 
                        icon={<ZapIcon className="w-6 h-6"/>}
                    >
                        {rewardTasks.filter(t => t.title.includes("Social")).map(task => (
                           <div key={task.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all group">
                               <div className="flex justify-between items-center">
                                   <div className="flex-1 pr-4">
                                       <h3 className="font-semibold text-fog-dark dark:text-fog-light">{task.title}</h3>
                                       <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{task.description}</p>
                                   </div>
                                   <button onClick={() => handleAction(task.reward)} className={`flex-shrink-0 px-3 py-1.5 text-sm font-bold rounded-full transition-transform group-hover:scale-110 ${task.reward.includes('$') ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-fog-secondary/20 text-fog-secondary'}`}>
                                       {task.reward}
                                   </button>
                               </div>
                           </div>
                        ))}
                    </RewardCard>
                </div>
            )}
        </div>
    );
};

export default EarnPointsPage;
