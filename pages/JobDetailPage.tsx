import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getJobById, getBidsByJobId, getCommentsByJobId, addBid, addComment } from '../services/mockDataService';
import { Job, Bid, Comment } from '../types';
import { LocationPinIcon, StarIcon, CheckBadgeIcon, ZapIcon, MessageIcon } from '../components/Icons';
import NotFoundPage from './NotFoundPage';
import BackButton from '../components/BackButton';

const JobDetailPage: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const { user, isAuthenticated } = useAuth();
    const [job, setJob] = useState<Job | null | undefined>(undefined);
    const [bids, setBids] = useState<Bid[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!jobId) return;
        setLoading(true);
        Promise.all([
            getJobById(jobId),
            getBidsByJobId(jobId),
            getCommentsByJobId(jobId)
        ]).then(([jobData, bidsData, commentsData]) => {
            setJob(jobData);
            setBids(bidsData);
            setComments(commentsData);
            setLoading(false);
        });
    }, [jobId]);

    const handlePlaceBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!jobId || !user) return;
        const formData = new FormData(form);
        const newBid = {
            user: { id: user.id, name: user.name, avatarUrl: user.avatarUrl, rating: user.rating, isPremium: user.isPremium, isIdVerified: user.isIdVerified },
            amount: Number(formData.get('amount')),
            message: String(formData.get('message')),
        };
        const addedBid = await addBid(jobId, newBid);
        setBids(prev => [addedBid, ...prev]);
        form.reset();
    };

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!jobId || !user) return;
        const formData = new FormData(form);
        const newComment = {
            user: { id: user.id, name: user.name, avatarUrl: user.avatarUrl },
            content: String(formData.get('comment')),
        };
        const addedComment = await addComment(jobId, newComment);
        setComments(prev => [...prev, addedComment]);
        form.reset();
    };


    if (loading) {
        return <div className="text-center text-fog-mid dark:text-slate-400">Loading job details...</div>;
    }

    if (!job) {
        return <NotFoundPage />;
    }

    const isOwner = user?.id === job.postedBy.id;

    return (
        <div className="animate-fade-in">
            <BackButton />
            <header className="bg-fog-white dark:bg-fog-mid-dark shadow-sm dark:shadow-lg-dark rounded-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <p className="text-sm text-fog-secondary font-semibold uppercase">{job.type}</p>
                        <h1 className="text-3xl font-bold text-fog-dark dark:text-fog-light mt-1">{job.title}</h1>
                        <div className="flex items-center text-sm text-gray-500 dark:text-slate-400 mt-2 gap-4 flex-wrap">
                            <span>Posted by <Link to="#" className="font-semibold text-fog-accent hover:underline">{job.postedBy.name}</Link></span>
                            {job.type === 'task' && job.location && (
                                <span className="flex items-center"><LocationPinIcon className="w-4 h-4 mr-1"/>{job.location}</span>
                            )}
                             <span>Budget: <span className="font-bold text-fog-dark dark:text-fog-light">${job.budget}</span></span>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-fog-white dark:bg-fog-mid-dark p-6 sm:p-8 rounded-lg shadow-sm dark:shadow-lg-dark">
                        <h2 className="text-xl font-bold text-fog-dark dark:text-fog-light border-b border-gray-200 dark:border-slate-700 pb-3 mb-4">Job Description</h2>
                        <p className="text-gray-700 dark:text-slate-300 whitespace-pre-wrap">{job.description}</p>
                        
                        <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light border-b border-gray-200 dark:border-slate-700 pb-3 mt-8 mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-sm font-medium rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                     <div className="bg-fog-white dark:bg-fog-mid-dark p-6 sm:p-8 rounded-lg shadow-sm dark:shadow-lg-dark">
                        <h2 className="text-xl font-bold text-fog-dark dark:text-fog-light mb-4">Comments ({comments.length})</h2>
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <div key={comment.id} className="flex items-start space-x-3">
                                    <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 bg-gray-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                        <p className="font-semibold text-sm text-fog-dark dark:text-fog-light">{comment.user.name}</p>
                                        <p className="text-gray-700 dark:text-slate-300">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isAuthenticated && (
                            <form className="mt-6 flex items-start space-x-3" onSubmit={handleAddComment}>
                                <img src={user?.avatarUrl} alt={user?.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <textarea name="comment" required placeholder="Add a public comment..." className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-fog-accent" rows={2}></textarea>
                                    <button type="submit" className="mt-2 px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors text-sm">Post Comment</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {isAuthenticated && !isOwner && (
                        <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-lg shadow-sm dark:shadow-lg-dark">
                             <h3 className="font-bold text-lg text-fog-dark dark:text-fog-light mb-4">Place Your Bid</h3>
                             <form onSubmit={handlePlaceBid} className="space-y-4">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Bid Amount ($)</label>
                                    <input type="number" name="amount" required placeholder={String(job.budget)} className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-fog-accent"/>
                                </div>
                                 <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Message</label>
                                    <textarea name="message" required placeholder="Introduce yourself and explain why you're a good fit..." className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-fog-accent" rows={4}></textarea>
                                </div>
                                <button type="submit" className="w-full px-4 py-3 bg-fog-accent text-white font-bold rounded-lg shadow-md hover:bg-fog-accent-hover transition-colors">Submit Bid</button>
                             </form>
                        </div>
                    )}

                     <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-lg shadow-sm dark:shadow-lg-dark">
                        <h3 className="font-bold text-lg text-fog-dark dark:text-fog-light mb-4">Bids ({bids.length})</h3>
                        <ul className="space-y-4">
                            {bids.map(bid => (
                                <li key={bid.id} className="border-b border-gray-100 dark:border-slate-800 pb-4 last:border-b-0 last:pb-0">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <img src={bid.user.avatarUrl} alt={bid.user.name} className="w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-sm text-fog-dark dark:text-fog-light">{bid.user.name}</p>
                                                <p className="text-xs flex items-center gap-1 text-gray-500 dark:text-slate-400"><StarIcon className="w-3 h-3 text-yellow-400"/> {bid.user.rating}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-fog-dark dark:text-fog-light">${bid.amount}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 pl-10">{bid.message}</p>
                                </li>
                            ))}
                            {bids.length === 0 && <p className="text-sm text-center text-gray-500 dark:text-slate-400 py-4">Be the first to bid!</p>}
                        </ul>
                    </div>

                    <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-lg shadow-sm dark:shadow-lg-dark">
                         {job.allowsPointDiscount && (
                            <div className="mb-4 p-3 bg-fog-secondary/10 text-fog-secondary rounded-lg text-sm font-semibold flex items-center gap-2">
                                <ZapIcon className="w-5 h-5"/> Client accepts FOG Points
                            </div>
                        )}
                        <h3 className="font-bold text-lg text-fog-dark dark:text-fog-light mb-4">About the Client</h3>
                        <div className="flex items-center gap-4">
                            <img src={job.postedBy.avatarUrl} alt={job.postedBy.name} className="w-16 h-16 rounded-full" />
                            <div>
                                <p className="font-bold text-fog-dark dark:text-fog-light">{job.postedBy.name}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-slate-400 mt-1">
                                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                    {job.postedBy.rating} Rating
                                </div>
                                {job.postedBy.isPremium && <span className="mt-1 flex items-center text-xs font-bold text-yellow-600 dark:text-yellow-400"><ZapIcon className="w-3 h-3 mr-1"/>Premium Client</span>}
                            </div>
                        </div>
                        <div className="mt-4 text-sm space-y-2 text-gray-600 dark:text-slate-300">
                             <p className="flex items-center gap-2"><CheckBadgeIcon className="w-5 h-5 text-fog-secondary"/>Payment method verified</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;