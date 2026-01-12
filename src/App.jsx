import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GlacierLayout from './components/layout/GlacierLayout';

// Page Imports
import Landing from './pages/Landing';
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
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={
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

        <Route path="*" element={<Link to="/" className="text-icy-accent p-10 block">Page Not Found. Return Home.</Link>} />
      </Routes>
    </BrowserRouter>
  );
}