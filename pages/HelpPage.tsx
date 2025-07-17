import React, { useState } from 'react';
import BackButton from '../components/BackButton';

const faqData = {
  'For Clients': [
    { q: 'How do I post a job?', a: 'To post a job, navigate to the "Post a Job" page from the header. You will be asked to choose between a "Freelance Job" for digital services or a "Local Task" for physical work. Fill in the required details like title, description, skills, and budget, and then submit.' },
    { q: 'How do I review proposals?', a: 'Once freelancers or taskers apply to your job, you will be notified. You can review their profiles, cover letters, and ratings from your dashboard under the "My Posts" section.' },
    { q: 'What are the payment options?', a: 'We support secure payments via credit card and bank transfer. All payments are held in escrow and released to the professional only when you mark the job as complete.' },
  ],
  'For Professionals': [
    { q: 'How do I apply for jobs?', a: 'Browse the "Freelance" or "Local Tasks" pages to find jobs that match your skills. On the job detail page, you can submit your application. We recommend using our AI Assistant to help generate a compelling cover letter.' },
    { q: 'How do I get paid?', a: 'Once a client accepts your proposal and funds the project, the payment is held securely in escrow. Upon successful completion and approval of your work, the funds are released to your FOG Wallet, from which you can withdraw.' },
    { q: 'How can I improve my profile?', a: 'A complete profile attracts more clients. Ensure you have a professional profile picture, a clear tagline, a detailed bio, and all your relevant skills listed. Getting ID and LinkedIn verification also boosts trust.' },
  ],
  'FOG Points & Wallet': [
    { q: 'What are FOG Points?', a: 'FOG Points are a reward currency on our platform. You can earn them by watching ads, completing surveys, or participating in other promotional activities. Points can be redeemed for discounts on platform fees or to boost your job posts.' },
    { q: 'How does the Wallet work?', a: 'Your FOG Wallet holds your USD earnings and FOG Points. You can deposit funds to hire professionals or withdraw your earnings using various methods like bank transfer, crypto, Easypaisa, or Jazzcash.' },
  ],
};

type FaqCategory = keyof typeof faqData;

const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('For Clients');

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in">
      <BackButton />
      <section className="text-center py-16 bg-fog-white dark:bg-fog-mid-dark rounded-2xl shadow-lg dark:shadow-2xl-dark">
        <h1 className="text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">
          FOG Help Center
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          Have a question? We're here to help. Find answers to common questions below.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <input
            type="search"
            placeholder="Search for answers (e.g., 'how to post a job')"
            className="w-full px-5 py-4 border border-gray-300 dark:border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-fog-accent bg-fog-white dark:bg-slate-800"
          />
        </div>
      </section>

      <section className="mt-16 max-w-5xl mx-auto">
        <div className="flex justify-center border-b border-gray-200 dark:border-slate-700 mb-8">
          {(Object.keys(faqData) as FaqCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 font-semibold text-lg border-b-2 transition-colors ${
                activeCategory === category
                  ? 'border-fog-accent text-fog-accent'
                  : 'border-transparent text-gray-500 hover:text-fog-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {faqData[activeCategory].map((faq, index) => (
            <div key={index} className="bg-fog-white dark:bg-fog-mid-dark rounded-lg shadow-sm dark:shadow-lg-dark overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-fog-dark dark:text-fog-light">{faq.q}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform text-fog-accent ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 animate-fade-in">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;