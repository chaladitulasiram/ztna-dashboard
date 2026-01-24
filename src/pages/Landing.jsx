import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { ShieldCheck, LockKey, Pulse, Globe, ArrowRight, WifiHigh, TerminalWindow, Cpu } from '@phosphor-icons/react';
import ThreeBackground from '../components/ThreeBackground';

const Landing = () => {
    const navigate = useNavigate();

    const [systemStats, setSystemStats] = useState({
        activeTunnels: 0,
        threatLevel: 'CALCULATING...',
        uptime: '0h 0m',
        encryptionStatus: 'VERIFYING...',
        activeSegments: 0
    });

    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const res = await api.get('/system/public-status');
                setSystemStats({
                    activeTunnels: res.data.activeConnections || 0,
                    threatLevel: res.data.currentRiskScore > 50 ? 'ELEVATED' : 'NOMINAL',
                    uptime: res.data.uptime || '48h 12m',
                    encryptionStatus: 'AES-256-GCM',
                    activeSegments: res.data.segmentCount || 4
                });
                setIsOnline(true);
            } catch (error) {
                console.error("Telemetry Offline:", error);
                setSystemStats(prev => ({ ...prev, threatLevel: 'OFFLINE' }));
                setIsOnline(false);
            }
        };

        fetchTelemetry();
        const interval = setInterval(fetchTelemetry, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen text-[#F5F5F7] font-sans selection:bg-[#2997FF]/30 overflow-hidden">
            <ThreeBackground />

            {/* Navbar */}
            <nav className="relative z-50 flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/5">
                        <ShieldCheck size={24} weight="fill" className="text-[#2997FF]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold tracking-tight">Aegis Zero</span>
                        <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Enterprise Security</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md ${isOnline ? 'bg-[#30D158]/10 text-[#30D158]' : 'bg-[#FF453A]/10 text-[#FF453A]'}`}>
                        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#30D158]' : 'bg-[#FF453A]'}`} />
                        <span className="text-xs font-medium">{isOnline ? 'Systems Operational' : 'Systems Offline'}</span>
                    </div>
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-5 py-2 rounded-full bg-white text-black font-medium text-sm hover:scale-105 active:scale-95 transition-all duration-300">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
                        <Pulse size={16} className={systemStats.threatLevel === 'NOMINAL' ? 'text-[#30D158]' : 'text-[#FF453A]'} weight="bold" />
                        <span className="text-xs font-medium tracking-wide text-gray-300">
                            THREAT LEVEL: <span className={systemStats.threatLevel === 'NOMINAL' ? 'text-[#30D158]' : 'text-[#FF453A]'}>{systemStats.threatLevel}</span>
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] max-w-4xl">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Trust No One.</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#2997FF] to-[#2997FF]/60">Verify Everything.</span>
                    </h1>

                    <p className="max-w-xl text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                        Advanced Zero Trust Network Access securing <span className="text-white font-medium">{systemStats.activeTunnels} active sessions</span> with real-time quantum identity verification.
                    </p>

                    <button
                        onClick={() => navigate('/auth')}
                        className="group relative px-8 py-4 rounded-full bg-[#2997FF] text-white font-medium text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(41,151,255,0.5)] active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Initialize Console <ArrowRight size={20} weight="bold" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    </button>
                </div>

                {/* Glass Grid Stats */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
                    <GlassCard
                        icon={LockKey}
                        label="Encryption"
                        value={systemStats.encryptionStatus}
                        subtext="End-to-End"
                    />
                    <GlassCard
                        icon={Globe}
                        label="Global Zones"
                        value={`${systemStats.activeSegments} Regions`}
                        subtext="Low Latency"
                    />
                    <GlassCard
                        icon={Cpu}
                        label="System Uptime"
                        value={systemStats.uptime}
                        subtext="99.99% Availability"
                    />
                    <GlassCard
                        icon={WifiHigh}
                        label="Active Tunnels"
                        value={systemStats.activeTunnels}
                        subtext="Secured Connections"
                    />
                </div>
            </main>
        </div>
    );
};

const GlassCard = ({ icon: Icon, label, value, subtext }) => (
    <div className="p-6 rounded-2xl bg-[#161617]/60 backdrop-blur-xl border border-white/5 hover:border-[#2997FF]/30 transition-colors duration-300 group">
        <div className="flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#2997FF] group-hover:bg-[#2997FF]/10 transition-colors">
                <Icon size={20} weight="fill" />
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                <div className="text-xl font-semibold text-white mb-1 group-hover:text-shadow transition-all">{value}</div>
                <div className="text-xs text-gray-500">{subtext}</div>
            </div>
        </div>
    </div>
);

export default Landing;

