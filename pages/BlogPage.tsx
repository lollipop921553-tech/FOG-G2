import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Freelancing: Trends to Watch in 2024',
    excerpt: 'The freelance economy is evolving faster than ever. From AI integration to the rise of niche specializations, here are the key trends that will shape the world of independent work this year.',
    imageUrl: 'https://picsum.photos/seed/blog1/600/400',
    author: 'Jane Doe',
    date: 'October 25, 2023',
    category: 'Industry Insights',
  },
  {
    id: 2,
    title: '5 Tips for Writing the Perfect Job Post on FOG',
    excerpt: 'Attracting top talent starts with a great job post. Learn how to write clear, compelling descriptions that will get you the right applicants for your freelance or local task needs.',
    imageUrl: 'https://picsum.photos/seed/blog2/600/400',
    author: 'Alex Doe',
    date: 'October 18, 2023',
    category: 'Platform Tips',
  },
  {
    id: 3,
    title: 'How a Local Tasker Transformed Their Side Hustle into a Full-Time Business',
    excerpt: 'Meet Ahmed, a tasker from Islamabad who turned his handyman skills into a thriving business using the FOG platform. A truly inspirational story of entrepreneurship.',
    imageUrl: 'https://picsum.photos/seed/blog3/600/400',
    author: 'FOG Team',
    date: 'October 12, 2023',
    category: 'Success Stories',
  },
    {
    id: 4,
    title: 'Maximizing Your Productivity: A Guide for Remote Workers',
    excerpt: 'Working from home has its perks, but staying productive can be a challenge. Discover our top strategies and tools for maintaining focus and achieving your goals.',
    imageUrl: 'https://picsum.photos/seed/blog4/600/400',
    author: 'Alishba Sundas',
    date: 'October 5, 2023',
    category: 'Productivity',
  },
];

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="bg-fog-white dark:bg-fog-mid-dark rounded-xl shadow-lg dark:shadow-lg-dark overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-2xl-dark hover:-translate-y-2 flex flex-col">
    <Link to="#" className="block">
      <img className="w-full h-56 object-cover" src={post.imageUrl} alt={post.title} />
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold text-fog-accent uppercase tracking-wide">{post.category}</p>
      <Link to="#" className="block mt-2">
        <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light hover:text-fog-accent transition-colors">{post.title}</h3>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300 flex-grow">{post.excerpt}</p>
      </Link>
      <div className="mt-6 flex items-center">
        <div>
          <p className="text-sm font-medium text-fog-dark dark:text-fog-light">{post.author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
        </div>
      </div>
    </div>
  </article>
);

const BlogPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <BackButton />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-fog-dark dark:text-fog-light">The FOG Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-fog-mid dark:text-slate-400">
          Insights, tips, and stories from the forefront of the freelance and on-demand economy.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;