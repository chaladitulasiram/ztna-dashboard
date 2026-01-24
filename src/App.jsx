import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

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
            <MainLayout><Dashboard /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/identity" element={
          <ProtectedRoute>
            <MainLayout><IdentityManagement /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/mobile" element={
          <ProtectedRoute>
            <MainLayout><MobileSecurity /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/network" element={
          <ProtectedRoute>
            <MainLayout><NetworkSegments /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/policies" element={
          <ProtectedRoute>
            <MainLayout><AccessPolicies /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/logs" element={
          <ProtectedRoute>
            <MainLayout><AuditLogs /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Link to="/" className="text-blue-500 p-10 block">Page Not Found. Return Home.</Link>} />
      </Routes>
    </BrowserRouter>
  );
}
