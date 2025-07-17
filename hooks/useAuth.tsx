
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Role, JobType } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const MOCK_USER: User = {
  id: 'user123',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user123/200/200',
  tagline: 'Full-Stack Developer & Local Handyman',
  roles: [Role.Freelancer, Role.Tasker, Role.Client, Role.Viewer],
  points: 1250,
  usdBalance: 250.75,
  rating: 4.9,
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Firebase', 'Plumbing', 'Electrical Repair', 'Project Management', 'UI/UX Design'],
  isIdVerified: true,
  isLinkedInVerified: true,
  isPremium: true,
  unreadMessages: 2,
  bio: 'Highly skilled and motivated professional with proven experience in both digital and physical domains. With a 4.9 star rating over 2 completed jobs, I am committed to delivering high-quality results. My expertise spans across modern web technologies like React and TypeScript, as well as practical skills for local tasks. Looking forward to tackling new challenges on FOG.',
  workHistory: [
    { id: 'f1', title: 'Build a marketing website', description: 'Completed a full-stack marketing website build for a new startup.', type: JobType.Freelance, budget: 1500, skills: ['React', 'Next.js'], postedBy: { id: 'client1', name: 'Innovate Corp', avatarUrl: 'https://picsum.photos/seed/client1/100/100', rating: 5, isPremium: true}, isSponsored: false, createdAt: '2023-10-15T14:48:00.000Z' },
    { id: 't1', title: 'Fix a leaky faucet', description: 'Responded to an urgent request and fixed a leaky faucet within an hour.', type: JobType.Task, budget: 75, skills: ['Plumbing'], location: 'Islamabad', postedBy: { id: 'client2', name: 'Homeowner H.', avatarUrl: 'https://picsum.photos/seed/client2/100/100', rating: 4.8, isPremium: false}, isSponsored: false, createdAt: '2023-10-12T09:20:00.000Z' },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // In a real app, you'd pass user credentials
    setUser(MOCK_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};