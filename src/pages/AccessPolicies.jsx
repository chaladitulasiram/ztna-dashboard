import React from 'react';
import { ShieldCheck, ShieldAlert, Plus, MoreVertical, Clock, Globe, Laptop } from 'lucide-react';

const PolicyCard = ({ title, description, action, priority, conditions, active }) => {
    return (
        <div className={`bg-slate-900/40 border ${active ? 'border-purple-500/50' : 'border-slate-800'} rounded-2xl p-6 transition-all hover:bg-slate-900/60`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${action === 'Allow' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {action === 'Allow' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{title}</h3>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Priority: {priority}</p>
                    </div>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            <p className="text-sm text-slate-400 mb-6">{description}</p>

            <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Conditions</p>
                <div className="flex flex-wrap gap-2">
                    {conditions.map((condition, idx) => {
                        const Icon = condition.type === 'geo' ? Globe : condition.type === 'device' ? Laptop : Clock;
                        return (
                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-300">
                                <Icon size={14} className="text-purple-400" />
                                {condition.label}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                    <span className="text-xs font-medium text-slate-400">{active ? 'Active' : 'Disabled'}</span>
                </div>
                <button className="text-xs font-bold text-purple-400 hover:text-purple-300">Edit Rule</button>
            </div>
        </div>
    );
};

const AccessPolicies = () => {
    const policies = [
        {
            title: "Admin Remote Access",
            description: "Require MFA and Managed Device for all administrative console access from outside the office.",
            action: "Allow",
            priority: "01",
            active: true,
            conditions: [
                { type: 'device', label: 'Managed Device' },
                { type: 'geo', label: 'Outside US/UK' },
                { type: 'time', label: '24/7' }
            ]
        },
        {
            title: "Block High-Risk Countries",
            description: "Automatic denial of access from identified high-risk IP ranges and blacklisted regions.",
            action: "Block",
            priority: "05",
            active: true,
            conditions: [
                { type: 'geo', label: 'Blacklisted IPs' },
                { type: 'device', label: 'Any' }
            ]
        },
        {
            title: "Legacy App Access",
            description: "Restrict access to legacy HR portal to internal network ranges only.",
            action: "Allow",
            priority: "10",
            active: false,
            conditions: [
                { type: 'geo', label: 'Office LAN' },
                { type: 'device', label: 'Compliant' }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Access Policies</h1>
                    <p className="text-slate-400">Policy-based access control (PBAC) engine</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                    <Plus size={18} />
                    <span className="font-semibold">Create Policy</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {policies.map((p, idx) => <PolicyCard key={idx} {...p} />)}
            </div>
        </div>
    );
};

export default AccessPolicies;