import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/auth";
import { User, ShieldCheck, Mail, Fingerprint, Sparkles } from 'lucide-react';

const IdentityManagement = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 font-mono animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2"
                    style={{
                        background: 'linear-gradient(to right, #00ffff, #ff00ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
                    }}>
                    Verified Identities
                </h1>
                <p className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    MULTI-FACTOR AUTHENTICATION ACTIVE
                </p>
            </div>

            {/* Cyberpunk User Card */}
            <div className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 p-8 rounded relative overflow-hidden group"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)' }}>

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                {/* Background Glow */}
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Unique Avatar */}
                    <div className="w-32 h-32 rounded-full bg-black border-2 border-cyan-500/50 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500"
                        style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-pulse" />
                        <User size={64} className="text-cyan-400 relative z-10" />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-pink-500/50 bg-pink-500/10 text-pink-400 text-xs font-black uppercase tracking-widest mb-2"
                            style={{ boxShadow: '0 0 10px rgba(236, 72, 153, 0.2)' }}>
                            <ShieldCheck size={14} />
                            <span>MFA VERIFIED</span>
                        </div>

                        <h2 className="text-3xl font-black text-white uppercase tracking-tight break-all"
                            style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
                            {user?.email || 'AUTHENTICATED USER'}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoTag icon={Mail} label="NEURAL LINK" value={user?.email} />
                            <InfoTag icon={Fingerprint} label="AUTH PROTOCOL" value="SUPABASE OAUTH 2.0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoTag = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded hover:bg-cyan-500/10 transition-colors group">
        <Icon size={20} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
        <div className="text-left">
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">{label}</div>
            <div className="text-sm font-mono text-white break-all">{value}</div>
        </div>
    </div>
);

export default IdentityManagement;