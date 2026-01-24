import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Network, LockKey, ShieldCheck, Warning, Globe } from '@phosphor-icons/react';

const NetworkSegments = () => {
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const res = await api.get('/resource/segments');
                setSegments(res.data || []);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch network segments:", error);
                setError(error.response?.data?.message || error.message || "Failed to connect to network topology service");
                setSegments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSegments();
        const interval = setInterval(fetchSegments, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 font-sans animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Network Segments
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-2 h-2 bg-[#2997FF] rounded-full animate-pulse" />
                        Micro-segmentation Enforced
                    </div>
                </div>
                <div className="px-3 py-1.5 bg-[#2997FF]/10 border border-[#2997FF]/20 rounded-lg flex items-center gap-2 text-[#2997FF] text-xs font-medium tracking-wide">
                    <Globe size={16} weight="bold" />
                    <span>Topology Active</span>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-2xl flex items-center gap-3 text-[#FF453A]">
                    <Warning size={20} weight="fill" />
                    <div className="text-sm font-medium">
                        {error}. Unable to display network topology.
                    </div>
                </div>
            )}

            {/* Segments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading && segments.length === 0 ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-[#161617]/60 border border-white/5 rounded-2xl animate-pulse" />
                    ))
                ) : segments.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-500 font-medium">
                        No segments detected
                    </div>
                ) : (
                    segments.map((seg) => (
                        <div key={seg.id} className="p-6 rounded-2xl bg-[#161617]/60 backdrop-blur-xl border border-white/5 hover:border-[#2997FF]/30 transition-all duration-300 group hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#2997FF] group-hover:bg-[#2997FF]/10 transition-colors">
                                    <Network size={20} weight="fill" />
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${seg.status === 'ISOLATED'
                                    ? 'border-[#FF453A]/20 text-[#FF453A] bg-[#FF453A]/10'
                                    : 'border-[#30D158]/20 text-[#30D158] bg-[#30D158]/10'
                                    }`}>
                                    {seg.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#2997FF] transition-colors">
                                {seg.name}
                            </h3>
                            <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 mb-6 text-xs text-gray-400 font-mono inline-block">
                                {seg.cidr}
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-gray-500">
                                {seg.status === 'ISOLATED' ? (
                                    <LockKey size={14} className="text-[#FF453A]" weight="fill" />
                                ) : (
                                    <ShieldCheck size={14} className="text-[#30D158]" weight="fill" />
                                )}
                                <span>{seg.policyType} Policy</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NetworkSegments;

