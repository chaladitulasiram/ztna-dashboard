import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Shield, Lock, Activity, Globe, ArrowRight, Wifi } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    // Default "Loading" State
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
                // Calls http://localhost:8080/api/system/public-status
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
        const interval = setInterval(fetchTelemetry, 5000); // Live poll
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-glacier-950 text-slate-200 overflow-hidden relative font-sans selection:bg-icy-accent/30">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

            <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Shield className="text-icy-accent" size={32} />
                    <span className="text-2xl font-black tracking-tighter uppercase italic">ZTNA.Core</span>
                </div>
                <div className="flex items-center gap-4">
                    {/* Status Indicator */}
                    <div className={`hidden md:flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border transition-colors duration-500 ${isOnline ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                        {isOnline ? 'SYSTEM OPERATIONAL' : 'OFFLINE'}
                    </div>
                    <button onClick={() => navigate('/auth')} className="glacier-card px-6 py-2 rounded-xl text-sm font-bold hover:text-icy-accent transition-all cursor-pointer">
                        Secure Login
                    </button>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icy-accent/10 border border-icy-accent/20 text-icy-accent text-[10px] font-black uppercase tracking-widest">
                        <Activity size={12} /> Threat Level: {systemStats.threatLevel}
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter text-white">
                        NEVER TRUST <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-icy-accent to-blue-500">ALWAYS VERIFY</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                        Zero Trust Architecture. Protecting <span className="text-white font-bold">{systemStats.activeTunnels} active sessions</span> with real-time identity verification.
                    </p>
                    <button onClick={() => navigate('/auth')} className="bg-icy-accent text-glacier-950 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(56,189,248,0.3)] cursor-pointer">
                        ACCESS CONSOLE <ArrowRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-1000">
                    <FeatureBox icon={Lock} title="Encryption" desc={systemStats.encryptionStatus} isLive={isOnline} />
                    <FeatureBox icon={Globe} title="Segments" desc={`${systemStats.activeSegments} Secure Zones`} isLive={isOnline} />
                    <FeatureBox icon={Activity} title="Uptime" desc={systemStats.uptime} isLive={isOnline} />
                    <FeatureBox icon={Wifi} title="Tunnels" desc={`${systemStats.activeTunnels} Active`} isLive={isOnline} />
                </div>
            </main>
        </div>
    );
};

const FeatureBox = ({ icon: Icon, title, desc, isLive }) => (
    <div className="glacier-card p-6 rounded-3xl border border-white/5 space-y-3 hover:border-icy-accent/30 transition-colors group">
        <div className="flex justify-between items-start">
            <Icon className="text-icy-accent group-hover:scale-110 transition-transform" size={24} />
            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-400 font-mono leading-relaxed uppercase tracking-wider">{desc}</p>
    </div>
);

export default Landing;