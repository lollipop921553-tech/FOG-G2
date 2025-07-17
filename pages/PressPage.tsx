import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../components/Icons';
import BackButton from '../components/BackButton';

interface PressRelease {
  id: number;
  title: string;
  date: string;
  source: string;
}

const pressReleases: PressRelease[] = [
  { id: 1, title: 'FOG Platform Launches to Unify Global Freelance and Local Task Economies', date: 'Oct 20, 2023', source: 'TechCrunch' },
  { id: 2, title: 'Islamabad-based Startup FOG Raises $5M in Seed Funding', date: 'Sep 15, 2023', source: 'MENAbytes' },
  { id: 3, title: 'The Future of Work is Hybrid: An Interview with FOG Founder Ruh Ul Hassnain', date: 'Aug 28, 2023', source: 'Forbes' },
];

const PressPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-20">
      <BackButton />
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">Press & Media</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          Welcome to the FOG press room. Here you'll find our latest news, media assets, and contact information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center bg-fog-white dark:bg-fog-mid-dark p-8 md:p-12 rounded-2xl shadow-xl dark:shadow-2xl-dark">
        <div>
          <h2 className="text-3xl font-bold text-fog-dark dark:text-fog-light">Media Kit</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Our media kit includes company information, founder bios, official logos, and high-resolution images. Download everything you need to tell the FOG story.
          </p>
          <button className="mt-6 px-8 py-3 bg-fog-accent text-white font-semibold rounded-lg shadow-md hover:bg-fog-accent-hover transition-transform transform hover:scale-105">
            Download Press Kit (.zip)
          </button>
        </div>
        <div className="flex justify-center items-center p-8 bg-gray-100 dark:bg-slate-800 rounded-xl">
          <LogoIcon className="h-24 w-24 text-fog-accent" />
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-center text-fog-dark dark:text-fog-light">FOG in the News</h2>
        <div className="mt-12 max-w-4xl mx-auto">
          <ul className="space-y-4">
            {pressReleases.map((release) => (
              <li key={release.id} className="bg-fog-white dark:bg-fog-mid-dark p-6 rounded-lg shadow-md dark:shadow-lg-dark hover:shadow-xl dark:hover:shadow-xl-dark transition-shadow">
                <Link to="#" className="group">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{release.date} &middot; <span className="font-semibold">{release.source}</span></p>
                  <h3 className="mt-2 text-xl font-semibold text-fog-dark dark:text-fog-light group-hover:text-fog-accent transition-colors">
                    {release.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="text-center bg-fog-light dark:bg-fog-mid-dark p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-fog-dark dark:text-fog-light">Media Contact</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          For all press and media inquiries, please reach out to our communications team.
        </p>
        <div className="mt-6">
          <a href="mailto:press@fog.com" className="text-xl font-semibold text-fog-accent hover:underline">
            press@fog.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default PressPage;