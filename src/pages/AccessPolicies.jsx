import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, Plus, MoreVertical, Clock, Globe, Laptop, Sparkles, AlertTriangle, Shield } from 'lucide-react';
import api from '../lib/api';

const AccessPolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                setLoading(true);
                const res = await api.get('/policies/list');
                setPolicies(res.data || []);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch policies:', err);
                setError(err.response?.data?.message || err.message || "Failed to connect to policy engine");
                setPolicies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
        const interval = setInterval(fetchPolicies, 60000); // Refresh every 60 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 font-mono animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2"
                        style={{
                            background: 'linear-gradient(to right, #00ffff, #ff00ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
                        }}>
                        Access Policies
                    </h1>
                    <p className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        PBAC ENGINE {error ? <span className="text-pink-400">(OFFLINE)</span> : 'ONLINE'}
                    </p>
                </div>
                <button className="group px-6 py-3 bg-black border border-cyan-500/50 text-cyan-400 font-black uppercase hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-2"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}>
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span>Create Policy</span>
                </button>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-pink-500/10 border border-pink-500/50 rounded flex items-center gap-3 text-pink-500">
                    <AlertTriangle size={20} />
                    <div className="text-xs uppercase font-bold tracking-wider">
                        {error}. Unable to display policies.
                    </div>
                </div>
            )}

            {/* Policies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {(loading && policies.length === 0) ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-black/50 border border-cyan-500/20 rounded animate-pulse" />
                    ))
                ) : (
                    policies.map((p) => <CyberPolicyCard key={p.id} {...p} />)
                )}
            </div>
        </div>
    );
};

const CyberPolicyCard = ({ title, description, action, priority, conditions, active }) => {
    return (
        <div className={`bg-black/50 backdrop-blur-xl border ${active ? 'border-cyan-500/50' : 'border-gray-800'} p-6 rounded relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
            style={{ boxShadow: active ? '0 0 20px rgba(0, 255, 255, 0.1)' : 'none' }}>

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded border ${action === 'Allow' ? 'border-green-500/50 bg-green-500/10 text-green-400' : 'border-pink-500/50 bg-pink-500/10 text-pink-400'}`}>
                        {action === 'Allow' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight">{title}</h3>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
                            Priority: {priority}
                        </div>
                    </div>
                </div>
                <button className="text-gray-500 hover:text-cyan-400 transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>

            <p className="text-xs text-gray-400 mb-6 font-mono leading-relaxed border-l-2 border-gray-800 pl-3">
                {description}
            </p>

            <div className="space-y-3">
                <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Conditions Protocol</div>
                <div className="flex flex-wrap gap-2">
                    {conditions.map((condition, idx) => {
                        const Icon = condition.type === 'geo' ? Globe : condition.type === 'device' ? Laptop : Clock;
                        return (
                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/50 rounded text-[10px] text-cyan-300 transition-all font-mono uppercase">
                                <Icon size={12} className="text-cyan-400" />
                                <span>{condition.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-green-400' : 'text-gray-500'}`}>
                    {active ? 'Active' : 'Disabled'}
                </span>
                <button className="text-xs font-bold text-cyan-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1">
                    Edit Rule
                </button>
            </div>
        </div>
    );
};

export default AccessPolicies;
