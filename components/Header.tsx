import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { NAV_LINKS } from '../constants';
import { LogoIcon, MenuIcon, XIcon, SunIcon, MoonIcon, ComputerDesktopIcon, ChartPieIcon, WalletIcon, BriefcaseIcon, LogoutIcon } from './Icons';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  return (
    <header className="bg-fog-white/80 dark:bg-fog-dark/80 backdrop-blur-md shadow-sm dark:shadow-md-dark sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-fog-dark dark:text-fog-white">
              <LogoIcon />
              <span>FOG</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-fog-accent' : 'text-fog-mid hover:text-fog-dark dark:hover:text-fog-light'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
             <div className="relative">
              <button onClick={() => setIsThemeOpen(!isThemeOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-fog-mid-dark focus:outline-none focus:ring-2 focus:ring-fog-accent">
                <SunIcon className="h-5 w-5 hidden dark:block" />
                <MoonIcon className="h-5 w-5 block dark:hidden" />
              </button>
              {isThemeOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-fog-white dark:bg-fog-mid-dark ring-1 ring-black ring-opacity-5 z-50">
                  <button onClick={() => { setTheme('light'); setIsThemeOpen(false); }} className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm ${theme === 'light' ? 'text-fog-accent' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-slate-700`}>
                    <SunIcon className="h-4 w-4" /> Light
                  </button>
                  <button onClick={() => { setTheme('dark'); setIsThemeOpen(false); }} className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm ${theme === 'dark' ? 'text-fog-accent' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-slate-700`}>
                    <MoonIcon className="h-4 w-4" /> Dark
                  </button>
                   <button onClick={() => { setTheme('system'); setIsThemeOpen(false); }} className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm ${theme === 'system' ? 'text-fog-accent' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-slate-700`}>
                    <ComputerDesktopIcon className="h-4 w-4" /> System
                  </button>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <div className="relative">
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full pl-3 pr-2 py-1.5 text-sm transition-colors">
                      <div className="flex items-center space-x-2">
                        <span title="USD Balance" className="font-bold text-fog-dark dark:text-fog-light">${user.usdBalance.toFixed(2)}</span>
                        <span className="text-gray-300 dark:text-gray-500">|</span>
                        <span title="FOG Points" className="font-bold text-fog-secondary">{user.points} pts</span>
                      </div>
                      <img className="h-7 w-7 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
                    </button>
                    {isProfileOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-fog-white dark:bg-fog-mid-dark ring-1 ring-black dark:ring-white/10 ring-opacity-5 z-50">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700" onClick={() => setIsProfileOpen(false)}><ChartPieIcon className="w-5 h-5"/> Dashboard</Link>
                          <Link to="/wallet" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700" onClick={() => setIsProfileOpen(false)}><WalletIcon className="w-5 h-5"/> Wallet</Link>
                          <Link to="/post-job" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700" onClick={() => setIsProfileOpen(false)}><BriefcaseIcon className="w-5 h-5"/> Post a Job</Link>
                        </div>
                        <div className="py-1"><div className="border-t border-gray-200 dark:border-slate-700"></div></div>
                        <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                          <LogoutIcon className="w-5 h-5"/> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-base font-medium text-fog-mid hover:text-fog-dark dark:hover:text-fog-light">Log in</Link>
                  <Link to="/signup" className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-fog-accent hover:bg-fog-accent-hover">Sign up</Link>
                </>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-fog-mid-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fog-accent">
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-fog-white dark:bg-fog-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} to={link.href} onClick={() => setIsMenuOpen(false)} className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-fog-accent text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-fog-mid-dark'
                  }`
                }>
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-slate-700">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center px-5">
                  <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-fog-mid-dark">Dashboard</Link>
                    <Link to="/wallet" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-fog-mid-dark">Wallet</Link>
                    <Link to="/post-job" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-fog-mid-dark">Post a Job</Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-fog-mid-dark">Sign Out</button>
                </div>
              </>
            ) : (
              <div className="px-5">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-fog-accent hover:bg-fog-accent-hover">Sign up</Link>
                <p className="mt-3 text-center text-base font-medium text-gray-500 dark:text-gray-400">
                  Existing user?{' '}
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-fog-accent hover:underline">Log in</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;