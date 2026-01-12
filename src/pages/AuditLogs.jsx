import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLiveLogs = async () => {
            try {
                // Fetch real data from your ResourceController
                const res = await api.get('/resource/logs');
                setLogs(res.data);
            } catch (err) {
                console.error("Failed to fetch live ZTNA logs", err);
            }
        };

        fetchLiveLogs();
        const interval = setInterval(fetchLiveLogs, 5000); // Poll every 5 seconds for "real-time" feel
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Live Audit Trail</h1>
            <div className="glacier-card rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Endpoint</th>
                            <th className="p-4">Outcome</th>
                            <th className="p-4">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-t border-white/5 text-sm">
                                <td className="p-4 text-slate-300">{log.userEmail}</td>
                                <td className="p-4 font-mono text-xs">{log.endpoint}</td>
                                <td className={`p-4 ${log.outcome === 'ALLOWED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {log.outcome}
                                </td>
                                <td className="p-4 text-slate-500">{log.riskScore}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogs;