import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-fog-accent">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-fog-dark dark:text-fog-light">Page Not Found</h2>
      <p className="mt-4 text-lg text-fog-mid dark:text-slate-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-fog-accent text-white font-semibold rounded-lg shadow-md hover:bg-fog-accent-hover transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;