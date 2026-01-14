import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Shield, Smartphone, Network,
    ShieldCheck, FileText, Settings, LogOut, Bell, User
} from 'lucide-react';
import PostureHeartbeat from '../security/PostureHeartbeat';
import { authService } from '../../lib/auth';
import ParticleBackground from './ParticleBackground';

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
        <div className="min-h-screen bg-black text-white flex overflow-hidden font-mono selection:bg-cyan-500/30">
            {/* Cyberpunk Grid Background */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            {/* Neon Glow Effects */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] animate-pulse"
                    style={{ transform: `translateY(${offset * 0.2}px)` }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[150px] animate-pulse"
                    style={{ animationDelay: '1s', transform: `translateY(${offset * -0.1}px)` }}
                />
                <div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-pulse"
                    style={{ animationDelay: '2s' }}
                />
            </div>

            {/* Scanline Effect */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan" />
            </div>

            {/* Particle Background for Futuristic Depth */}
            <ParticleBackground />

            {/* Cyberpunk Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-black/60 backdrop-blur-2xl border-r border-cyan-500/20 p-6 flex flex-col z-50">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10 pl-2">
                    <div className="relative">
                        <Shield className="text-cyan-400" size={32} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))' }} />
                        <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse" />
                    </div>
                    <div>
                        <span className="font-black tracking-tighter text-xl uppercase text-white" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
                            ZTNA.CORE
                        </span>
                        <div className="text-[8px] text-cyan-400 tracking-widest">NEURAL SECURITY v2.077</div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center gap-3 px-4 py-3 rounded transition-all duration-500 relative overflow-hidden transform ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50'
                                    : 'text-gray-400 hover:bg-cyan-500/5 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30 hover:translate-x-1'
                                    }`}
                                style={{
                                    boxShadow: isActive ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none',
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                {isActive && (
                                    <>
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 animate-pulse" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 animate-pulse" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 animate-shimmer-effect" style={{ backgroundSize: '200% 100%' }} />
                                    </>
                                )}
                                <item.icon size={18} className={`transition-all duration-300 ${isActive ? 'scale-110 text-cyan-400' : 'group-hover:scale-125 group-hover:rotate-6'}`} style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))' : 'none' }} />
                                <span className="font-bold text-xs uppercase tracking-widest relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="pt-6 border-t border-cyan-500/20">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 border border-transparent hover:border-pink-500/30 transition-all duration-300 group cursor-pointer"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-xs uppercase tracking-widest">Terminate</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative w-full">
                {/* Cyberpunk Header */}
                <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-cyan-500/20 px-8 py-4 flex justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/50 rounded text-cyan-400" style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 1)' }}></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest">SYSTEM ONLINE</span>
                        </div>
                        <div className="h-4 w-px bg-cyan-500/20 mx-2 hidden md:block"></div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden lg:block">
                            AES-256-GCM ENCRYPTION
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <PostureHeartbeat />
                        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px rgba(255, 0, 255, 1)' }}></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
                            <User size={16} className="text-black font-bold" />
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <main className="p-8 flex-1 w-full overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GlacierLayout;