import React from 'react';
import { supabase } from "../lib/Auth"; // Capital 'A'
import { User, ShieldCheck, Mail, Fingerprint } from 'lucide-react';

const IdentityManagement = () => {
    // Get the user from Supabase session
    const user = supabase.auth.getUser();

    return (
        <div className="space-y-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-white italic uppercase">Verified Identities</h1>

            <div className="glacier-card p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-icy-accent to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <User size={48} className="text-glacier-950" />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck size={12} /> MFA Verified Identity
                    </div>
                    <h2 className="text-2xl font-bold text-white">{user?.email || 'Authenticated User'}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoTag icon={Mail} label="Email" value={user?.email} />
                        <InfoTag icon={Fingerprint} label="Provider" value="Supabase Auth" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoTag = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
        <Icon size={16} className="text-slate-500" />
        <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</p>
            <p className="text-sm text-slate-200 font-mono">{value}</p>
        </div>
    </div>
);

export default IdentityManagement;