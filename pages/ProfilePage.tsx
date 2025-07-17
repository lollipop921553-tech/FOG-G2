
import React from 'react';
import { Navigate } from 'react-router-dom';
// This page is deprecated and now redirects to /dashboard.
// The new dashboard functionality is in pages/DashboardPage.tsx.
const ProfilePage: React.FC = () => {
  return <Navigate to="/dashboard" replace />;
};

export default ProfilePage;
