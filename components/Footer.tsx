import React from 'react';
import { LogoIcon } from './Icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    Platform: [
      { name: 'Freelance', href: '/freelance' },
      { name: 'Local Tasks', href: '/tasks' },
      { name: 'Rewards Hub', href: '/rewards-hub' }
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Trust & Safety', href: '/trust-and-safety' },
      { name: 'Contact Us', href: '/contact' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ],
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-fog-white dark:bg-fog-dark border-t border-gray-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2 text-2xl font-bold text-fog-dark dark:text-fog-white">
              <LogoIcon />
              <span>FOG</span>
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Freelance. On-demand. Global. The future of productive work.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">{title}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} onClick={handleLinkClick} className="text-base text-gray-600 dark:text-gray-300 hover:text-fog-accent dark:hover:text-fog-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} FOG Platform, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;