import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Terminal, ShieldAlert, Activity, Clock } from 'lucide-react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // This connects to your Spring Boot Monitoring/Resource controller
                const res = await api.get('/resource/logs');
                setLogs(res.data);
            } catch (error) {
                console.error("Failed to fetch ZTNA audit logs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Access Audit Trail</h1>
                    <p className="text-slate-400 text-sm">Real-time immutable ledger of network events</p>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                    <Clock size={14} />
                    Live Sync Active
                </div>
            </div>

            <div className="glacier-card rounded-2xl overflow-hidden border border-white/10">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Resource & Method</th>
                            <th className="p-4">User Identity</th>
                            <th className="p-4">Outcome</th>
                            <th className="p-4">Risk Assessment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500 text-sm">
                                    Decrypting audit trail...
                                </td>
                            </tr>
                        ) : logs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500 text-sm">
                                    No access events recorded.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} className="text-sm text-slate-300 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-xs text-slate-500 font-mono">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-xs text-icy-accent">{log.method}</span>
                                            <span className="text-slate-200">{log.endpoint}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span>{log.userEmail}</span>
                                            <span className="text-[10px] text-slate-500 font-mono">{log.ipAddress}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.outcome === 'ALLOWED'
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            }`}>
                                            {log.outcome}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden min-w-[80px]">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${log.riskScore > 50 ? 'bg-rose-500' : 'bg-blue-400'
                                                        }`}
                                                    style={{ width: `${log.riskScore}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono text-slate-500">{log.riskScore}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// CRITICAL FIX: Add default export to resolve the esbuild error in App.jsx
export default AuditLogs;