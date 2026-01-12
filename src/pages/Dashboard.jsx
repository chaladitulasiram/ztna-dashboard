import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { Shield, AlertTriangle, Activity, Zap } from 'lucide-react';
import api from '../lib/api';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        avgRisk: 0,
        activeDevices: 0,
        blockedAttempts: 0,
        complianceRate: 0
    });

    // Data for the 3D-effect Area Chart (Mocked trend based on your backend logic)
    const [trendData, setTrendData] = useState([
        { time: '00:00', risk: 20 }, { time: '04:00', risk: 35 },
        { time: '08:00', risk: 65 }, { time: '12:00', risk: 45 },
        { time: '16:00', risk: 80 }, { time: '20:00', risk: 30 },
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter">NETWORK PULSE</h1>
                    <p className="text-icy-accent/60 font-medium">Real-time Zero Trust Telemetry</p>
                </div>
                <div className="flex gap-2">
                    <div className="glacier-card px-4 py-2 rounded-xl flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400">BACKEND ONLINE</span>
                    </div>
                </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricTile icon={Activity} label="Avg Risk Score" value="24" color="text-blue-400" />
                <MetricTile icon={Shield} label="Compliance" value="98.2%" color="text-emerald-400" />
                <MetricTile icon={AlertTriangle} label="Blocked" value="142" color="text-rose-400" />
                <MetricTile icon={Zap} label="Active Sessions" value="1,024" color="text-amber-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Risk Trend Chart */}
                <div className="lg:col-span-2 glacier-card p-6 rounded-3xl relative overflow-hidden group">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity size={18} className="text-icy-accent" />
                        Threat Velocity (24h)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #38bdf833', borderRadius: '12px' }}
                                    itemStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="risk"
                                    stroke="#38bdf8"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRisk)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Posture Distribution */}
                <div className="glacier-card p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6">Device Health</h3>
                    <div className="space-y-6">
                        <PostureProgress label="Firewall Status" percent={100} color="bg-emerald-500" />
                        <PostureProgress label="Disk Encryption" percent={85} color="bg-blue-500" />
                        <PostureProgress label="OS Up-to-date" percent={62} color="bg-amber-500" />
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">Security Insight</p>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                                "Non-compliant devices are automatically routed to the isolation segment per ZTNA-Policy-04."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Sub-components
const MetricTile = ({ icon: Icon, label, value, color }) => (
    <div className="glacier-card p-6 rounded-2xl group cursor-default transition-all hover:scale-[1.02]">
        <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:bg-icy-accent/10 transition-colors`}>
            <Icon className={`${color} group-hover:scale-110 transition-transform`} size={24} />
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-black text-white mt-1">{value}</p>
    </div>
);

const PostureProgress = ({ label, percent, color }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">{label}</span>
            <span className="text-white">{percent}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                style={{ width: `${percent}%` }}
            />
        </div>
    </div>
);

export default Dashboard;