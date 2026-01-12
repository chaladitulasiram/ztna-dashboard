import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Clock } from 'lucide-react';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const res = await api.get('/resource/logs');
            setLogs(res.data);
        } catch (error) {
            console.error("ZTNA Sync Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 5000); // 5s refresh for real-time visibility
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white uppercase italic">Access Audit Trail</h1>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                    <Clock size={14} /> Live Sync Active
                </div>
            </div>

            <div className="glacier-card rounded-2xl overflow-hidden border border-white/10">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                        <tr>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Resource</th>
                            <th className="p-4">Identity</th>
                            <th className="p-4">Outcome</th>
                            <th className="p-4">Risk</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-500">Decrypting audit trail...</td></tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} className="text-sm text-slate-300 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-xs">{new Date(log.timestamp).toLocaleTimeString()}</td>
                                    <td className="p-4">{log.endpoint}</td>
                                    <td className="p-4">{log.userEmail}</td>
                                    <td className={`p-4 font-bold ${log.outcome === 'ALLOWED' ? 'text-emerald-400' : 'text-rose-400'}`}>{log.outcome}</td>
                                    <td className="p-4 font-mono">{log.riskScore}%</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogs;