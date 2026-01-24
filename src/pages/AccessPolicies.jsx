import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldWarning, Plus, DotsThreeVertical, Clock, Globe, Laptop, Warning, CheckCircle } from '@phosphor-icons/react';
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
        const interval = setInterval(fetchPolicies, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 font-sans animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Access Policies
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className={`w-2 h-2 rounded-full ${error ? 'bg-[#FF453A]' : 'bg-[#30D158]'} animate-pulse`} />
                        PBAC Engine {error ? 'Offline' : 'Online'}
                    </div>
                </div>
                <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-white/10">
                    <Plus size={18} weight="bold" />
                    <span>Create Policy</span>
                </button>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-2xl flex items-center gap-3 text-[#FF453A]">
                    <Warning size={20} weight="fill" />
                    <div className="text-sm font-medium">
                        {error}. Unable to display policies.
                    </div>
                </div>
            )}

            {/* Policies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {(loading && policies.length === 0) ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-[#161617]/60 border border-white/5 rounded-2xl animate-pulse" />
                    ))
                ) : (
                    policies.map((p) => <PolicyCard key={p.id} {...p} />)
                )}
            </div>
        </div>
    );
};

const PolicyCard = ({ title, description, action, priority, conditions, active }) => {
    return (
        <div className={`p-6 rounded-2xl bg-[#161617]/60 backdrop-blur-xl border hover:border-[#2997FF]/30 transition-all duration-300 group hover:-translate-y-1 ${active ? 'border-white/5' : 'border-white/5 opacity-75'}`}>

            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${action === 'Allow'
                            ? 'bg-[#30D158]/10 text-[#30D158]'
                            : 'bg-[#FF453A]/10 text-[#FF453A]'
                        }`}>
                        {action === 'Allow' ? <ShieldCheck size={20} weight="fill" /> : <ShieldWarning size={20} weight="fill" />}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[#30D158]' : 'bg-gray-500'}`} />
                            Priority: {priority}
                        </div>
                    </div>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <DotsThreeVertical size={24} weight="bold" />
                </button>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {description}
            </p>

            <div className="space-y-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Conditions</div>
                <div className="flex flex-wrap gap-2">
                    {conditions.map((condition, idx) => {
                        const Icon = condition.type === 'geo' ? Globe : condition.type === 'device' ? Laptop : Clock;
                        return (
                            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-300 font-medium">
                                <Icon size={14} className="text-[#2997FF]" />
                                <span>{condition.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className={`text-xs font-semibold uppercase tracking-wide ${active ? 'text-[#30D158]' : 'text-gray-500'}`}>
                    {active ? 'Active' : 'Disabled'}
                </span>
                <button className="text-xs font-semibold text-[#2997FF] hover:text-[#2997FF]/80 transition-colors">
                    Edit Rule
                </button>
            </div>
        </div>
    );
};

export default AccessPolicies;

