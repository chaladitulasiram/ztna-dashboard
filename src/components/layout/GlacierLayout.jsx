import React, { useState, useEffect } from 'react';
import PostureHeartbeat from '../security/PostureHeartbeat';

const GlacierLayout = ({ children }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffset(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen text-slate-200">
            {/* Parallax Orbs */}
            <div
                className="fixed top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
                style={{ transform: `translateY(${offset * 0.2}px)` }}
            />
            <div
                className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"
                style={{ transform: `translateY(${offset * -0.1}px)` }}
            />

            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 glacier-card border-x-0 border-t-0 py-4 px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-icy-accent rounded shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                    <span className="font-black tracking-tighter text-xl italic uppercase">ZTNA.Core</span>
                </div>
                <PostureHeartbeat />
            </nav>

            <main className="max-w-7xl mx-auto p-8 relative z-10">
                {children}
            </main>
        </div>
    );
};

export default GlacierLayout;