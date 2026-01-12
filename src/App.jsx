import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Shield, Smartphone, Network,
  FileText, Settings, Menu, X, ShieldCheck, LogOut
} from 'lucide-react';

// Services & Components
import { authService } from './lib/Auth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PostureHeartbeat from './components/security/PostureHeartbeat';

// Page Imports
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import MobileSecurity from './pages/MobileSecurity';
import NetworkSegments from './pages/NetworkSegments';
import IdentityManagement from './pages/IdentityManagement';
import AccessPolicies from './pages/AccessPolicies';
import AuditLogs from './pages/AuditLogs';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link
    to={path}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${active
      ? 'bg-icy-accent/20 text-icy-accent border border-icy-accent/30 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const GlacierLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Shield, label: 'Identity Mgmt', path: '/identity' },
    { icon: Smartphone, label: 'Mobile Security', path: '/mobile' },
    { icon: Network, label: 'Network Segments', path: '/network' },
    { icon: ShieldCheck, label: 'Access Policies', path: '/policies' },
    { icon: FileText, label: 'Audit Logs', path: '/logs' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-glacier-950 text-slate-200 flex overflow-hidden">
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-glacier-900/40 backdrop-blur-2xl border-r border-white/5 transform transition-transform lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-icy-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <Shield className="text-glacier-950" size={24} />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 uppercase italic tracking-tighter">
              ZTNA.Core
            </span>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} {...item} active={location.pathname === item.path} />
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-300 group cursor-pointer"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-xs uppercase tracking-widest">Terminate Session</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="sticky top-0 z-40 bg-glacier-900/40 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            <div className="hidden lg:block text-xs font-bold text-slate-500 uppercase tracking-widest">
              Security Control Plane v1.0
            </div>
          </div>
          <PostureHeartbeat />
        </header>
        <main className="p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><GlacierLayout><Dashboard /></GlacierLayout></ProtectedRoute>} />
        <Route path="/identity" element={<ProtectedRoute><GlacierLayout><IdentityManagement /></GlacierLayout></ProtectedRoute>} />
        <Route path="/mobile" element={<ProtectedRoute><GlacierLayout><MobileSecurity /></GlacierLayout></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><GlacierLayout><NetworkSegments /></GlacierLayout></ProtectedRoute>} />
        <Route path="/policies" element={<ProtectedRoute><GlacierLayout><AccessPolicies /></GlacierLayout></ProtectedRoute>} />
        <Route path="/logs" element={<ProtectedRoute><GlacierLayout><AuditLogs /></GlacierLayout></ProtectedRoute>} />
        <Route path="*" element={<Link to="/" className="text-icy-accent p-10 block">Session Invalid. Return to Terminal.</Link>} />
      </Routes>
    </BrowserRouter>
  );
}