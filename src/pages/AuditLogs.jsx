import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Clock, FileText, Sparkle, TrendUp, Warning, CheckCircle, XCircle } from '@phosphor-icons/react';

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
        <div className="space-y-8 font-sans animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Live Audit Trail
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-2 h-2 bg-[#2997FF] rounded-full animate-pulse" />
                        Access Monitoring Active
                    </div>
                </div>
                <div className="px-3 py-1.5 rounded-lg border border-[#2997FF]/20 bg-[#2997FF]/10 text-[#2997FF] flex items-center gap-2 shadow-sm">
                    <Clock size={16} weight="fill" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Live Sync</span>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-2xl flex items-center gap-3 text-[#FF453A]">
                    <Warning size={20} weight="fill" />
                    <div className="text-sm font-medium">
                        {error}. Audit trail may be incomplete.
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-[#161617]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-[#2997FF]/30 transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs font-semibold uppercase tracking-wide border-b border-white/5">
                            <tr>
                                <th className="p-6">Timestamp</th>
                                <th className="p-6">Resource</th>
                                <th className="p-6">Identity</th>
                                <th className="p-6">Outcome</th>
                                <th className="p-6">Risk Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading && logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-6 h-6 border-2 border-[#2997FF] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs font-medium">Decrypting logs...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <Sparkle size={24} weight="duotone" />
                                            <span className="text-xs font-medium">No activity detected</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="text-sm text-gray-300 hover:bg-white/5 transition-colors group">
                                        <td className="p-6 font-mono text-xs text-gray-500">
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </td>
                                        <td className="p-6 font-medium text-white tracking-tight">{log.endpoint}</td>
                                        <td className="p-6 text-gray-400">{log.userEmail}</td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${log.outcome === 'ALLOWED'
                                                ? 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20'
                                                : 'text-[#FF453A] bg-[#FF453A]/10 border-[#FF453A]/20'
                                                }`}>
                                                {log.outcome === 'ALLOWED' ? <CheckCircle size={12} weight="fill" /> : <XCircle size={12} weight="fill" />}
                                                {log.outcome}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-semibold text-xs ${log.riskScore > 70 ? 'text-[#FF453A]' : 'text-gray-400'
                                                    }`}>{log.riskScore}</span>
                                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[80px]">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${log.riskScore > 70 ? 'bg-[#FF453A]' :
                                                            log.riskScore > 40 ? 'bg-[#AF52DE]' : 'bg-[#2997FF]'
                                                            }`}
                                                        style={{ width: `${log.riskScore}%` }}
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

