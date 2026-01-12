import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Activity, Globe, ArrowRight } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-glacier-950 text-slate-200 overflow-hidden relative">
            {/* Parallax Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

            <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Shield className="text-icy-accent" size={32} />
                    <span className="text-2xl font-black tracking-tighter uppercase italic">ZTNA.Core</span>
                </div>
                <button
                    onClick={() => navigate('/auth')}
                    className="glacier-card px-6 py-2 rounded-xl text-sm font-bold hover:text-icy-accent transition-all cursor-pointer"
                >
                    Authorize Session
                </button>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-icy-accent/10 border border-icy-accent/20 text-icy-accent text-[10px] font-black uppercase tracking-widest">
                        <Activity size={12} /> Real-Time Trust Evaluation Active
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter text-white">
                        NEVER TRUST <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-icy-accent to-blue-500">
                            ALWAYS VERIFY
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                        Enterprise-grade Zero Trust Network Access. Continuous posture check,
                        identity-aware proxying, and immutable audit trails for every request.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/auth')}
                            className="bg-icy-accent text-glacier-950 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(56,189,248,0.3)] cursor-pointer"
                        >
                            GET STARTED <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FeatureBox icon={Lock} title="Encryption" desc="End-to-end TLS 1.3 tunnels" />
                    <FeatureBox icon={Globe} title="Segments" desc="Micro-segmented access" />
                    <FeatureBox icon={Activity} title="Monitoring" desc="Real-time risk scoring" />
                    <FeatureBox icon={Shield} title="Posture" desc="Device health validation" />
                </div>
            </main>
        </div>
    );
};

const FeatureBox = ({ icon: Icon, title, desc }) => (
    <div className="glacier-card p-6 rounded-3xl border border-white/5 space-y-3">
        <Icon className="text-icy-accent" size={24} />
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

export default Landing;