import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { LogoIcon } from '../components/Icons';

const SignupPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth(); // Using login for demo purposes
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a registration API call
    // For the demo, we'll just log in the mock user
    login();
    navigate('/dashboard');
  };
  
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-full flex items-center justify-center animate-fade-in p-4">
      <div className="w-full max-w-4xl lg:grid lg:grid-cols-2 rounded-2xl shadow-2xl dark:shadow-2xl-dark overflow-hidden">
        {/* Left side with branding */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-fog-secondary to-teal-700 text-white">
            <div className="flex items-center space-x-3">
              <LogoIcon className="h-12 w-12" />
              <span className="text-4xl font-bold">FOG</span>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">Join a World of Opportunity.</h1>
            <p className="mt-4 text-teal-100">
                Create your account to hire top talent, find your next project, or complete local tasks.
            </p>
        </div>
        {/* Right side with form */}
        <div className="bg-fog-white dark:bg-fog-mid-dark p-8 sm:p-12">
            <div className="w-full">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Create your account
                  </h2>
                   <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                      Already have an account?{' '}
                      <Link to="/login" className="font-medium text-fog-accent hover:text-fog-accent-hover">
                          Log in
                      </Link>
                  </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                   <div>
                      <label htmlFor="full-name" className="sr-only">Full Name</label>
                      <input id="full-name" name="name" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-800 focus:outline-none focus:ring-fog-accent focus:border-fog-accent sm:text-sm" placeholder="Full Name" />
                  </div>
                   <div>
                      <label htmlFor="email-address-signup" className="sr-only">Email address</label>
                      <input id="email-address-signup" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-800 focus:outline-none focus:ring-fog-accent focus:border-fog-accent sm:text-sm" placeholder="Email address" />
                  </div>
                  <div>
                      <label htmlFor="password-signup" className="sr-only">Password</label>
                      <input id="password-signup" name="password" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-slate-800 focus:outline-none focus:ring-fog-accent focus:border-fog-accent sm:text-sm" placeholder="Password" />
                  </div>
                  <div>
                    <label htmlFor="role" className="sr-only">I am a...</label>
                    <select id="role" name="role" required className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white bg-fog-white dark:bg-slate-800 focus:outline-none focus:ring-fog-accent focus:border-fog-accent sm:text-sm">
                      <option>I want to hire talent (Client)</option>
                      <option>I want to find work (Professional)</option>
                    </select>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fog-accent hover:bg-fog-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-fog-light dark:ring-offset-fog-dark focus:ring-fog-accent"
                    >
                      Create Account (Demo)
                    </button>
                  </div>
                   <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      By creating an account, you agree to our{' '}
                      <Link to="/terms-of-service" className="underline hover:text-fog-accent">Terms of Service</Link> and{' '}
                      <Link to="/privacy-policy" className="underline hover:text-fog-accent">Privacy Policy</Link>.
                  </p>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;