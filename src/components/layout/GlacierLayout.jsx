import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Shield, Smartphone, Network,
    ShieldCheck, FileText, Settings, LogOut, Bell, User
} from 'lucide-react';
import PostureHeartbeat from '../security/PostureHeartbeat';
import { authService } from '../../lib/Auth';

const GlacierLayout = ({ children }) => {
    const [offset, setOffset] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setOffset(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        navigate('/auth');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Shield, label: 'Identity Mgmt', path: '/identity' },
        { icon: Smartphone, label: 'Mobile Security', path: '/mobile' },
        { icon: Network, label: 'Network Segments', path: '/network' },
        { icon: ShieldCheck, label: 'Access Policies', path: '/policies' },
        { icon: FileText, label: 'Audit Logs', path: '/logs' },
    ];

    return (
        <div className="min-h-screen bg-glacier-950 text-slate-200 flex overflow-hidden font-sans selection:bg-icy-accent/30">
            {/* Dynamic Parallax Background */}
            <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
                <div
                    className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
                    style={{ transform: `translateY(${offset * 0.2}px)` }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
                    style={{ transform: `translateY(${offset * -0.1}px)` }}
                />
            </div>

            {/* Glass Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-glacier-900/40 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col z-50">
                <div className="flex items-center gap-3 mb-10 pl-2">
                    <div className="w-8 h-8 bg-icy-accent rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.5)] animate-pulse" />
                    <span className="font-black tracking-tighter text-xl italic uppercase text-white">ZTNA.Core</span>
                </div>

                <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-icy-accent/10 text-icy-accent border border-icy-accent/20 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                    }`}
                            >
                                <item.icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-300 group cursor-pointer"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-xs uppercase tracking-widest">Terminate</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative w-full">
                {/* Header with Widgets */}
                <header className="sticky top-0 z-40 bg-glacier-900/60 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">System Secure</span>
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-2 hidden md:block"></div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:block">
                            Encryption: AES-256-GCM
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <PostureHeartbeat />
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-icy-accent to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <User size={16} className="text-white" />
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <main className="p-8 flex-1 w-full overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GlacierLayout;