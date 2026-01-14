import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Clock, FileText, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLogs = async () => {
        try {
            const res = await api.get('/resource/logs');
            setLogs(res.data || []);
            setError(null);
        } catch (error) {
            console.error("ZTNA Sync Error:", error);
            setError(error.response?.data?.message || error.message || "Failed to connect to audit service");
            if (!logs.length) {
                setLogs([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 5000);
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
                        Live Audit Trail
                    </h1>
                    <p className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        ACCESS MONITORING ACTIVE
                    </p>
                </div>
                <div className="px-5 py-3 rounded border border-cyan-500/30 bg-cyan-500/5 text-xs text-cyan-400 flex items-center gap-3 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
                    <div className="relative">
                        <Clock size={16} />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                    </div>
                    <span className="font-bold uppercase tracking-widest">Live Sync</span>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-pink-500/10 border border-pink-500/50 rounded flex items-center gap-3 text-pink-500">
                    <AlertTriangle size={20} />
                    <div className="text-xs uppercase font-bold tracking-wider">
                        {error}. Audit trail may be incomplete.
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded relative overflow-hidden"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)' }}>

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-cyan-500/5 text-cyan-400 text-[10px] uppercase tracking-widest font-black border-b border-cyan-500/20">
                            <tr>
                                <th className="p-5">Timestamp</th>
                                <th className="p-5">Resource</th>
                                <th className="p-5">Identity</th>
                                <th className="p-5">Outcome</th>
                                <th className="p-5">Risk</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cyan-500/10">
                            {loading && logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-cyan-500/50">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                                            <span className="font-mono text-xs uppercase tracking-widest">Decrypting logs...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-cyan-500/50">
                                        <div className="flex flex-col items-center gap-3">
                                            <Sparkles size={32} className="opacity-50" />
                                            <span className="font-mono text-xs uppercase tracking-widest">No activity detected</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="text-sm text-gray-300 hover:bg-cyan-500/5 transition-colors group">
                                        <td className="p-5 font-mono text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </td>
                                        <td className="p-5 font-bold uppercase tracking-tight group-hover:text-white transition-colors">{log.endpoint}</td>
                                        <td className="p-5 font-mono text-xs group-hover:text-white transition-colors">{log.userEmail}</td>
                                        <td className="p-5">
                                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${log.outcome === 'ALLOWED'
                                                ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
                                                : 'text-pink-400 bg-pink-500/10 border-pink-500/30'
                                                }`}>
                                                {log.outcome}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-mono font-bold text-xs ${log.riskScore > 70 ? 'text-pink-400' : 'text-cyan-400'
                                                    }`}>{log.riskScore}%</span>
                                                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className={`h-full transition-all duration-500 ${log.riskScore > 70 ? 'bg-pink-500' :
                                                            log.riskScore > 40 ? 'bg-purple-500' : 'bg-cyan-500'
                                                            }`}
                                                        style={{ width: `${log.riskScore}%`, boxShadow: `0 0 10px currentColor` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
