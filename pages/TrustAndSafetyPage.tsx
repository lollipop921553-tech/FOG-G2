import React from 'react';
import { Link } from 'react-router-dom';
import { CheckBadgeIcon, ShieldCheckIcon, CurrencyDollarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import BackButton from '../components/BackButton';

const safetyFeatures = [
  {
    name: 'Profile Verification',
    description: 'We encourage users to verify their identity and link professional profiles like LinkedIn. Look for the verification badges on user profiles to hire with more confidence.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  },
  {
    name: 'Secure Payments',
    description: 'Our escrow system protects both clients and professionals. Clients fund the project upfront, and we hold the payment securely, releasing it only after the work is completed and approved.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  },
  {
    name: 'Ratings and Reviews',
    description: 'Make informed decisions by reviewing a professional\'s work history and ratings from previous clients. Honest feedback helps maintain a high-quality community.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
  },
  {
    name: 'Dispute Resolution',
    description: 'In the rare event of a disagreement, our dedicated support team is here to help mediate and find a fair resolution. Your peace of mind is our priority.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fog-accent"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.007H12v-.007z" /></svg>,
  },
];

const TrustAndSafetyPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-20">
      <BackButton />
      <section className="text-center">
        <div className="inline-block p-4 bg-fog-secondary/10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-fog-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">
          Your Trust is Our Foundation
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          We are committed to creating a secure and reliable environment for everyone on the FOG platform. Learn about the measures we take to protect our community.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safetyFeatures.map((feature) => (
            <div key={feature.name} className="flex items-start gap-4 p-6 bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-md dark:shadow-lg-dark">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light">{feature.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-fog-light dark:bg-fog-mid-dark p-12 rounded-2xl text-center">
        <h2 className="text-3xl font-bold text-fog-dark dark:text-fog-light">Have a Safety Concern?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          If you encounter any suspicious activity or have a concern about a user or job posting, please do not hesitate to report it. Your reports help us keep the community safe.
        </p>
        <div className="mt-8">
          <Link to="/contact" className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">
            Report an Issue
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TrustAndSafetyPage;