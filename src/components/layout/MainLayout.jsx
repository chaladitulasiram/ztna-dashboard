import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    SquaresFour, UserCircle, DeviceMobile, Globe,
    ShieldCheck, FileText, SignOut, Bell, MagnifyingGlass
} from '@phosphor-icons/react';
import { authService } from '../../lib/auth';
import PostureHeartbeat from '../security/PostureHeartbeat';
import ThreeBackground from '../ThreeBackground';

const MainLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        navigate('/auth');
    };

    const menuItems = [
        { icon: SquaresFour, label: 'Dashboard', path: '/dashboard' },
        { icon: UserCircle, label: 'Identity', path: '/identity' },
        { icon: DeviceMobile, label: 'Devices', path: '/mobile' },
        { icon: Globe, label: 'Network', path: '/network' },
        { icon: ShieldCheck, label: 'Policies', path: '/policies' },
        { icon: FileText, label: 'Logs', path: '/logs' },
    ];

    return (
        <div className="min-h-screen bg-aegis-black text-[#F5F5F7] flex font-sans selection:bg-aegis-blue/30 relative overflow-hidden">
            <ThreeBackground />

            {/* Glass Sidebar - Fixed Left, Expandable */}
            <aside className="fixed inset-y-0 left-0 w-16 hover:w-60 bg-aegis-glass backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 transition-all duration-300 group overflow-hidden">
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-center group-hover:justify-start group-hover:px-6 transition-all duration-300 border-b border-white/5">
                    <div className="bg-aegis-blue p-1.5 rounded-lg shrink-0">
                        <ShieldCheck size={20} weight="fill" className="text-white" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap delay-100">
                        Aegis Zero
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 flex flex-col gap-1 overflow-x-hidden">
                    <div className="text-[10px] font-bold text-gray-500 px-6 mb-2 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Platform
                    </div>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center h-10 px-4 mx-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap relative ${isActive
                                    ? 'bg-aegis-blue text-white shadow-[0_4px_12px_rgba(41,151,255,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="shrink-0 flex items-center justify-center w-5">
                                    <item.icon
                                        size={20}
                                        weight={isActive ? "fill" : "regular"}
                                        className={isActive ? "text-white" : "text-gray-500 group-hover:text-white transition-colors"}
                                    />
                                </div>
                                <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    {item.label}
                                </span>
                                {!isActive && (
                                    <div className="absolute left-0 w-1 h-0 bg-aegis-blue rounded-r-full transition-all duration-200 group-hover/link:h-6 opacity-0 group-hover/link:opacity-100" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile / Logout */}
                <div className="p-2 border-t border-white/5">
                    <div className="p-2 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            AD
                        </div>
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            <span className="text-xs font-semibold text-white">Admin User</span>
                            <span className="text-[10px] text-gray-400">admin@aegis.zero</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-auto opacity-0 group-hover:opacity-100 text-gray-500 hover:text-[#FF453A] transition-all"
                        >
                            <SignOut size={16} weight="bold" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen relative transition-all duration-300 ml-16`}>
                {/* Glass Top Navigation */}
                <header className={`sticky top-0 z-40 px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-aegis-glass backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
                    }`}>
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative group max-w-md w-full">
                            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-aegis-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-[#1C1C1E] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-aegis-blue/50 focus:border-aegis-blue/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                        <PostureHeartbeat />
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-[#1C1C1E] rounded-full border border-white/5 hover:border-white/10">
                            <Bell size={18} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF453A] border-2 border-black rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 px-8 py-6 w-full max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
