import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Shield, Lock, Activity, Globe, ArrowRight, Wifi, Terminal, Cpu } from 'lucide-react';

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
    const [glitchActive, setGlitchActive] = useState(false);

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

    // Random glitch effect
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);
        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative font-mono selection:bg-cyan-500/30">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 opacity-20">
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
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Matrix Rain Effect */}
            <MatrixRain />

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan" />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Cyberpunk Nav */}
                <nav className="flex justify-between items-center p-6 md:p-8 max-w-7xl mx-auto border-b border-cyan-500/20">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Shield className="text-cyan-400" size={36} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))' }} />
                            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse" />
                        </div>
                        <div>
                            <span className={`text-2xl md:text-3xl font-black tracking-tighter uppercase ${glitchActive ? 'glitch' : ''}`}
                                style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)' }}>
                                ZTNA.CORE
                            </span>
                            <div className="text-[8px] text-cyan-400 tracking-widest">NEURAL SECURITY INTERFACE v2.077</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Status Indicator */}
                        <div className={`hidden sm:flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded border transition-all duration-500 ${isOnline
                            ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            }`} style={{ boxShadow: isOnline ? '0 0 20px rgba(0, 255, 255, 0.3)' : '0 0 20px rgba(255, 0, 0, 0.3)' }}>
                            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`}
                                style={{ boxShadow: isOnline ? '0 0 10px rgba(0, 255, 255, 1)' : '0 0 10px rgba(255, 0, 0, 1)' }} />
                            <span className="hidden md:inline">{isOnline ? 'SYSTEM ONLINE' : 'OFFLINE'}</span>
                        </div>
                        <button
                            onClick={() => navigate('/auth')}
                            className="px-4 md:px-6 py-2 md:py-2.5 rounded bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black text-sm hover:scale-105 transition-transform relative overflow-hidden group"
                            style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
                            <span className="relative z-10">ACCESS</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 md:pt-20 pb-16 md:pb-32">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            {/* Threat Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-pink-500/50 bg-pink-500/10 text-pink-400 text-xs font-black uppercase tracking-widest"
                                style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}>
                                <Activity size={14} className="animate-pulse" />
                                <span className="hidden sm:inline">THREAT LEVEL:</span> {systemStats.threatLevel}
                            </div>

                            {/* Main Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter">
                                <div className={`${glitchActive ? 'glitch' : ''}`}
                                    style={{
                                        background: 'linear-gradient(to right, #00ffff, #ff00ff, #00ffff)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                                    }}>
                                    NEVER TRUST
                                </div>
                                <div className="text-white mt-2" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
                                    ALWAYS VERIFY
                                </div>
                            </h1>

                            {/* Description */}
                            <p className="text-base md:text-lg text-cyan-300/80 max-w-md leading-relaxed">
                                <span className="text-pink-400 font-bold">&gt;</span> Zero Trust Neural Architecture
                                <br />
                                <span className="text-pink-400 font-bold">&gt;</span> Protecting <span className="text-cyan-400 font-bold">{systemStats.activeTunnels} active sessions</span>
                                <br />
                                <span className="text-pink-400 font-bold">&gt;</span> Real-time quantum identity verification
                            </p>

                            {/* CTA Button */}
                            <button
                                onClick={() => navigate('/auth')}
                                className="group px-6 md:px-8 py-3 md:py-4 rounded bg-black border-2 border-cyan-500 text-cyan-400 font-black flex items-center gap-3 hover:bg-cyan-500 hover:text-black transition-all relative overflow-hidden"
                                style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}>
                                <Terminal size={20} className="group-hover:rotate-12 transition-transform" />
                                <span>INITIALIZE CONSOLE</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </button>
                        </div>

                        {/* Right Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 animate-in fade-in slide-in-from-right-8 duration-1000">
                            <CyberBox icon={Lock} title="ENCRYPTION" desc={systemStats.encryptionStatus} isLive={isOnline} color="cyan" />
                            <CyberBox icon={Globe} title="SEGMENTS" desc={`${systemStats.activeSegments} ZONES`} isLive={isOnline} color="pink" />
                            <CyberBox icon={Cpu} title="UPTIME" desc={systemStats.uptime} isLive={isOnline} color="purple" />
                            <CyberBox icon={Wifi} title="TUNNELS" desc={`${systemStats.activeTunnels} ACTIVE`} isLive={isOnline} color="cyan" />
                        </div>
                    </div>

                    {/* Bottom Stats Bar */}
                    <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        <StatBar label="FIREWALL" value="ACTIVE" color="cyan" />
                        <StatBar label="QUANTUM SHIELD" value="ENABLED" color="pink" />
                        <StatBar label="AI MONITOR" value="LEARNING" color="purple" />
                        <StatBar label="NEURAL NET" value="SYNCED" color="cyan" />
                    </div>
                </main>
            </div>
        </div>
    );
};

// Matrix Rain Component
const MatrixRain = () => {
    const [drops, setDrops] = useState([]);

    useEffect(() => {
        const columns = Math.floor(window.innerWidth / 20);
        const newDrops = Array.from({ length: columns }, (_, i) => ({
            id: i,
            x: i * 20,
            y: Math.random() * -500,
            speed: Math.random() * 2 + 1
        }));
        setDrops(newDrops);
    }, []);

    // Cyberpunk characters: 0-9, A-Z, special symbols
    const generateMatrixCharacters = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?/~';
        return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('\n');
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {drops.map(drop => (
                <div
                    key={drop.id}
                    className="absolute text-cyan-400 text-xs font-mono animate-fall"
                    style={{
                        left: `${drop.x}px`,
                        animationDuration: `${10 / drop.speed}s`,
                        animationDelay: `${Math.random() * 5}s`
                    }}>
                    {generateMatrixCharacters()}
                </div>
            ))}
        </div>
    );
};


// Cyberpunk Box Component
const CyberBox = ({ icon: Icon, title, desc, isLive, color }) => {
    const colors = {
        cyan: { border: 'border-cyan-500/50', bg: 'bg-cyan-500/5', text: 'text-cyan-400', shadow: '0 0 20px rgba(0, 255, 255, 0.3)' },
        pink: { border: 'border-pink-500/50', bg: 'bg-pink-500/5', text: 'text-pink-400', shadow: '0 0 20px rgba(236, 72, 153, 0.3)' },
        purple: { border: 'border-purple-500/50', bg: 'bg-purple-500/5', text: 'text-purple-400', shadow: '0 0 20px rgba(168, 85, 247, 0.3)' }
    };
    const c = colors[color];

    return (
        <div className={`relative p-4 md:p-6 rounded border ${c.border} ${c.bg} backdrop-blur-sm group hover:scale-105 transition-all duration-300`}
            style={{ boxShadow: c.shadow }}>
            <div className="absolute top-0 right-0 w-2 h-2 bg-current rounded-full" style={{ boxShadow: `0 0 10px currentColor` }} />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-current rounded-full" style={{ boxShadow: `0 0 10px currentColor` }} />

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <Icon className={`${c.text} group-hover:rotate-12 transition-transform`} size={24} style={{ filter: `drop-shadow(0 0 10px currentColor)` }} />
                    {isLive && <div className={`w-1.5 h-1.5 ${c.text} rounded-full animate-pulse`} style={{ boxShadow: '0 0 10px currentColor' }} />}
                </div>
                <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{title}</div>
                    <div className={`text-sm md:text-base font-black ${c.text}`}>{desc}</div>
                </div>
            </div>

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-50" />
        </div>
    );
};

// Stat Bar Component
const StatBar = ({ label, value, color }) => {
    const colors = {
        cyan: 'text-cyan-400 border-cyan-500/50',
        pink: 'text-pink-400 border-pink-500/50',
        purple: 'text-purple-400 border-purple-500/50'
    };

    return (
        <div className={`p-3 md:p-4 rounded border ${colors[color]} bg-black/50 backdrop-blur-sm`}>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{label}</div>
            <div className={`text-xs md:text-sm font-black ${colors[color].split(' ')[0]}`}>{value}</div>
        </div>
    );
};

export default Landing;
