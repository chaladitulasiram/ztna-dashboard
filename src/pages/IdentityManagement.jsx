import React, { useEffect, useState } from 'react';
import { supabase } from "../lib/auth";
import { User, ShieldCheck, Envelope, Fingerprint, LockKey } from '@phosphor-icons/react';

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
        <div className="max-w-4xl mx-auto space-y-8 font-sans animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Verified Identities
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-2 h-2 bg-[#2997FF] rounded-full animate-pulse" />
                    Multi-Factor Authentication Active
                </div>
            </div>

            {/* Profile Card */}
            <div className="p-8 rounded-3xl bg-[#161617]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#2997FF]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Unique Avatar */}
                    <div className="w-32 h-32 rounded-full bg-black/40 border border-white/10 flex items-center justify-center relative shadow-2xl">
                        <User size={64} weight="duotone" className="text-[#2997FF]" />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20 text-xs font-medium tracking-wide mb-2">
                            <ShieldCheck size={16} weight="fill" />
                            <span>MFA Verified</span>
                        </div>

                        <h2 className="text-3xl font-bold text-white tracking-tight break-all">
                            {user?.email || 'Authenticated User'}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <InfoTag icon={Envelope} label="Email Address" value={user?.email} />
                            <InfoTag icon={Fingerprint} label="Auth Protocol" value="Supabase OAuth 2.0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoTag = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
        <div className="p-2 bg-[#2997FF]/10 rounded-lg text-[#2997FF]">
            <Icon size={20} weight="fill" />
        </div>
        <div className="text-left">
            <div className="text-xs text-gray-500 font-medium mb-0.5">{label}</div>
            <div className="text-sm font-semibold text-white break-all">{value}</div>
        </div>
    </div>
);

export default IdentityManagement;
