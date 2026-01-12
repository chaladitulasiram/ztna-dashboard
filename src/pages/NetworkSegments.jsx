import React from 'react';
import { Globe, Users, Lock, ShieldAlert, Plus } from 'lucide-react';

const SegmentCard = ({ name, type, devices, cidr, status }) => {
    const typeStyles = {
        Public: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        Internal: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Restricted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        Critical: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    };

    const Icon = {
        Public: Globe,
        Internal: Users,
        Restricted: Lock,
        Critical: ShieldAlert
    }[type];

    return (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${typeStyles[type].split(' ')[0]} ${typeStyles[type].split(' ')[1]}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${typeStyles[type]}`}>
                    {type.toUpperCase()}
                </span>
            </div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-sm text-slate-500 font-mono mt-1">{cidr}</p>

            <div className="mt-6 flex justify-between items-end">
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Active Devices</p>
                    <p className="text-xl font-semibold text-slate-200">{devices}</p>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px]">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px]">
                        +5
                    </div>
                </div>
            </div>
        </div>
    );
};

const NetworkSegments = () => {
    const segments = [
        { name: "Public DMZ", type: "Public", devices: 12, cidr: "10.0.1.0/24" },
        { name: "Corporate Office", type: "Internal", devices: 142, cidr: "10.0.2.0/23" },
        { name: "Finance Vault", type: "Restricted", devices: 8, cidr: "192.168.50.0/24" },
        { name: "Core Production", type: "Critical", devices: 24, cidr: "172.16.0.0/16" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Network Segments</h1>
                    <p className="text-slate-400">Micro-segmentation control plane</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors">
                    <Plus size={18} />
                    <span>New Segment</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {segments.map((s, idx) => <SegmentCard key={idx} {...s} />)}
            </div>
        </div>
    );
};

export default NetworkSegments;