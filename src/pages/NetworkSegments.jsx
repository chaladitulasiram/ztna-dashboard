import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Network, Lock, Unlock, AlertTriangle, Sparkles, Globe, Shield } from 'lucide-react';

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
        const interval = setInterval(fetchSegments, 60000); // Refresh every 60 seconds
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
                        Network Segments
                    </h1>
                    <p className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        MICRO-SEGMENTATION ENFORCED
                    </p>
                </div>
                <div className="px-4 py-2 bg-black border border-cyan-500/50 rounded flex items-center gap-2 text-cyan-400 uppercase font-bold text-xs tracking-widest">
                    <Globe size={16} />
                    <span>Topology Active</span>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-pink-500/10 border border-pink-500/50 rounded flex items-center gap-3 text-pink-500">
                    <AlertTriangle size={20} />
                    <div className="text-xs uppercase font-bold tracking-wider">
                        {error}. Unable to display network topology.
                    </div>
                </div>
            )}

            {/* Segments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading && segments.length === 0 ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-black/50 border border-cyan-500/20 rounded animate-pulse" />
                    ))
                ) : segments.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-500 font-mono uppercase">
                        No segments detected
                    </div>
                ) : (
                    segments.map((seg) => (
                        <div key={seg.id} className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 p-6 rounded relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                            style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.05)' }}>

                            {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-500 transition-colors">
                                    <Network className="text-cyan-400" size={24} />
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${seg.status === 'ISOLATED'
                                    ? 'border-pink-500/50 text-pink-400 bg-pink-500/10'
                                    : 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10'
                                    }`}>
                                    {seg.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                {seg.name}
                            </h3>
                            <div className="bg-black/50 border border-gray-800 rounded px-3 py-2 mb-6 font-mono text-sm text-gray-400 inline-block">
                                {seg.cidr}
                            </div>

                            <div className="pt-4 border-t border-gray-800 flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-gray-500">
                                {seg.status === 'ISOLATED' ? (
                                    <Lock size={14} className="text-pink-400" />
                                ) : (
                                    <Shield size={14} className="text-cyan-400" />
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
