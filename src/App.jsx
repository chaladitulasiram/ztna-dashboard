// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GlacierLayout from './components/layout/GlacierLayout';

// Page Imports
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import MobileSecurity from './pages/MobileSecurity';
import NetworkSegments from './pages/NetworkSegments';
import IdentityManagement from './pages/IdentityManagement';
import AccessPolicies from './pages/AccessPolicies';
import AuditLogs from './pages/AuditLogs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Identity Portal - Public */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Dashboard Shell */}
        {/* Ensure the path here matches the 'to' prop in Sidebar items */}
        <Route path="/" element={
          <ProtectedRoute>
            <GlacierLayout><Dashboard /></GlacierLayout>
          </ProtectedRoute>
        } />

        <Route path="/identity" element={
          <ProtectedRoute>
            <GlacierLayout><IdentityManagement /></GlacierLayout>
          </ProtectedRoute>
        } />

        <Route path="/mobile" element={
          <ProtectedRoute>
            <GlacierLayout><MobileSecurity /></GlacierLayout>
          </ProtectedRoute>
        } />

        <Route path="/network" element={
          <ProtectedRoute>
            <GlacierLayout><NetworkSegments /></GlacierLayout>
          </ProtectedRoute>
        } />

        <Route path="/policies" element={
          <ProtectedRoute>
            <GlacierLayout><AccessPolicies /></GlacierLayout>
          </ProtectedRoute>
        } />

        <Route path="/logs" element={
          <ProtectedRoute>
            <GlacierLayout><AuditLogs /></GlacierLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Link to="/" className="text-icy-accent p-10 block">Invalid Session. Return to Dashboard.</Link>} />
      </Routes>
    </BrowserRouter>
  );
}