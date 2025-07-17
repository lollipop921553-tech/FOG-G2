import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../types';
import { getTestimonials } from '../services/mockDataService';
import { CheckBadgeIcon, LinkedInIcon, TwitterIcon } from '../components/Icons';

const FeatureCard: React.FC<{title: string; description: string; icon: React.ReactNode}> = ({title, description, icon}) => (
    <div className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-lg shadow-md dark:shadow-lg-dark text-center transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl-dark hover:-translate-y-1 h-full">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);


const HomePage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <div className="space-y-24 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-fog-light to-blue-100 dark:from-fog-dark dark:to-slate-800 rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-fog-dark dark:text-fog-light tracking-tight">
          <span className="block">Freelance. On-demand. Global.</span>
          <span className="block text-fog-accent mt-2">Productivity Starts Here.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-fog-mid dark:text-slate-400">
          FOG is a serious platform for professionals. Hire expert freelancers for digital projects or find reliable taskers for local, physical jobs. No distractions, just results.
        </p>
        <div className="mt-8 flex justify-center flex-wrap gap-4">
          <Link to="/freelance" className="px-8 py-3 bg-fog-accent text-white font-semibold rounded-lg shadow-md hover:bg-fog-accent-hover transition-transform transform hover:scale-105">
            Find Talent
          </Link>
          <Link to="/post-job" className="px-8 py-3 bg-fog-white text-fog-accent dark:bg-slate-200 dark:text-fog-accent font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-slate-300 transition-transform transform hover:scale-105">
            Post a Job
          </Link>
           <Link to="/rewards-hub" className="px-8 py-3 bg-fog-secondary text-white font-semibold rounded-lg shadow-md hover:bg-fog-secondary-hover transition-transform transform hover:scale-105">
            Earn Rewards
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-fog-dark dark:text-fog-light">A Platform for Every Need</h2>
        <p className="text-center mt-2 text-fog-mid dark:text-slate-400 max-w-2xl mx-auto">Whether you're a global freelancer, a local tasker, or a business looking to hire, FOG has you covered.</p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Link to="/freelance" className="block"><FeatureCard title="Global Freelancers" description="Access a worldwide pool of talent for any digital service—from development to design." icon={<img src="https://picsum.photos/seed/dev/80/80" className="rounded-full" alt="Global"/>} /></Link>
            <Link to="/tasks" className="block"><FeatureCard title="Local Taskers" description="Find trustworthy individuals for physical jobs in your area. Verified and reliable." icon={<img src="https://picsum.photos/seed/hardware/80/80" className="rounded-full" alt="Task"/>} /></Link>
            <Link to="/rewards-hub" className="block"><FeatureCard title="Earn Rewards" description="Not looking for work? Complete surveys or tasks to earn points and platform discounts." icon={<img src="https://picsum.photos/seed/data/80/80" className="rounded-full" alt="Rewards"/>} /></Link>
        </div>
      </section>

      {/* Our Motive Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-fog-dark dark:text-fog-light">Our Motive</h2>
        <p className="text-center mt-2 text-fog-mid dark:text-slate-400 max-w-3xl mx-auto">
            We believe in a world where opportunity is not bound by geography and productivity is seamless. FOG was born from a simple idea: to create a single, serious platform that empowers professionals to connect, collaborate, and achieve their goals, whether they're digital nomads or local experts.
        </p>
      </section>
      
      {/* Trust & Safety Section */}
      <section className="bg-fog-white dark:bg-fog-mid-dark rounded-xl shadow-lg dark:shadow-lg-dark p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold text-fog-dark dark:text-fog-light">Built on a Foundation of Trust</h2>
                <p className="mt-4 text-fog-mid dark:text-slate-300">We prioritize your safety and security. Our verification systems and transparent profiles ensure you can hire and work with confidence.</p>
                <ul className="mt-6 space-y-4">
                    <li className="flex items-start">
                        <CheckBadgeIcon className="h-6 w-6 text-fog-secondary mr-3 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-fog-dark dark:text-fog-light">ID & LinkedIn Verification</h4>
                            <p className="text-fog-mid dark:text-slate-400">Profiles are vetted through identity checks and professional network verification to build a trustworthy community.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <CheckBadgeIcon className="h-6 w-6 text-fog-secondary mr-3 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-fog-dark dark:text-fog-light">Transparent Ratings & History</h4>
                            <p className="text-fog-mid dark:text-slate-400">Make informed decisions with access to detailed work history and honest, verified reviews from other users.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex justify-center">
              <img src="https://picsum.photos/seed/security/400/300" alt="Trust and safety" className="rounded-lg shadow-md" />
            </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-fog-dark dark:text-fog-light">Meet the Founders</h2>
        <p className="text-center mt-2 text-fog-mid dark:text-slate-400 max-w-2xl mx-auto">The visionaries behind the FOG platform.</p>
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-fog-white dark:bg-fog-mid-dark p-8 rounded-xl shadow-lg dark:shadow-lg-dark text-center transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl-dark hover:-translate-y-1">
            <img className="h-24 w-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-fog-accent/20" src="https://i.ibb.co/C7Yp1x5/founder-avatar.png" alt="Animated avatar of Ruh Ul Hassnain" />
            <h3 className="font-semibold text-xl text-fog-dark dark:text-fog-light">Ruh Ul Hassnain</h3>
            <p className="text-fog-accent text-sm font-bold uppercase tracking-wider">Founder & Visionary</p>
            <p className="text-gray-600 dark:text-gray-400 mt-4 italic">"We're building more than a platform; we're building a new paradigm for productivity and opportunity. My vision is to break down barriers, one task at a time."</p>
             <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-fog-accent"><TwitterIcon/></a>
              <a href="#" className="text-gray-400 hover:text-fog-accent"><LinkedInIcon/></a>
            </div>
          </div>
          <div className="bg-fog-white dark:bg-fog-mid-dark p-8 rounded-xl shadow-lg dark:shadow-lg-dark text-center transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl-dark hover:-translate-y-1">
            <img className="h-24 w-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-fog-secondary/20" src="https://i.ibb.co/SNs0c4f/cofounder-avatar.png" alt="Animated avatar of Alishba Sundas" />
            <h3 className="font-semibold text-xl text-fog-dark dark:text-fog-light">Alishba Sundas</h3>
            <p className="text-fog-secondary text-sm font-bold uppercase tracking-wider">Co-founder & CTO</p>
            <p className="text-gray-600 dark:text-gray-400 mt-4 italic">"Our focus is on leveraging technology to create a seamless, efficient, and trustworthy experience for every user."</p>
             <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-fog-secondary"><TwitterIcon/></a>
              <a href="#" className="text-gray-400 hover:text-fog-secondary"><LinkedInIcon/></a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-fog-dark dark:text-fog-light">Trusted by Professionals Worldwide</h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;