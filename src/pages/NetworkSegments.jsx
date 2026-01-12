import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Network, Lock, Unlock, AlertTriangle } from 'lucide-react';

const NetworkSegments = () => {
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                // Hits your ResourceController for live segment data
                const res = await api.get('/resource/segments');
                setSegments(res.data);
            } catch (error) {
                console.error("Failed to fetch network segments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSegments();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white uppercase italic tracking-tighter">Micro-Segmentation</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center text-slate-500 py-20">Scanning network topography...</div>
                ) : segments.map((seg) => (
                    <div key={seg.id} className="glacier-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-icy-accent/10 rounded-2xl text-icy-accent">
                                <Network size={24} />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${seg.status === 'ISOLATED' ? 'border-rose-500/30 text-rose-400 bg-rose-500/5' : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                                }`}>
                                {seg.status}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">{seg.name}</h3>
                        <p className="text-xs text-slate-500 font-mono mb-4">{seg.cidr}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {seg.status === 'ISOLATED' ? <Lock size={12} /> : <Unlock size={12} />}
                            {seg.policyType} POLICY ENFORCED
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NetworkSegments;