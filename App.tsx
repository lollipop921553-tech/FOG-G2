import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import MessageWidget from './components/MessageWidget';
import HomePage from './pages/HomePage';
import FreelancePage from './pages/FreelancePage';
import TasksPage from './pages/TasksPage';
import RewardsHubPage from './pages/RewardsHubPage';
import PostJobPage from './pages/PostJobPage';
import EditJobPage from './pages/EditJobPage';
import DashboardPage from './pages/DashboardPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import BlogPage from './pages/BlogPage';
import HelpPage from './pages/HelpPage';
import TrustAndSafetyPage from './pages/TrustAndSafetyPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import WalletPage from './pages/WalletPage';

const App: React.FC = () => {

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-fog-light dark:bg-fog-dark">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Core Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> 
            <Route path="/freelance" element={<FreelancePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/rewards-hub" element={<RewardsHubPage />} />
            <Route path="/job/:jobId" element={<JobDetailPage />} />
            
            {/* Static Content Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/trust-and-safety" element={<TrustAndSafetyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />

            {/* Protected Routes */}
            <Route path="/post-job" element={<ProtectedRoute><PostJobPage /></ProtectedRoute>} />
            <Route path="/edit-job/:jobId" element={<ProtectedRoute><EditJobPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
        <MessageWidget />
      </div>
    </HashRouter>
  );
};

export default App;