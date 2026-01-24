import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ShieldCheck, Warning, Pulse, Lightning, TrendUp, LockKey, Cpu } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import MetricCard from '../components/dashboard/MetricCard';

const Dashboard = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({
        avgRisk: 0,
        activeDevices: 0,
        blockedAttempts: 0,
        complianceRate: 0
    });

    const [trendData, setTrendData] = useState([]);
    const [deviceHealth, setDeviceHealth] = useState({
        firewallStatus: 0,
        diskEncryption: 0,
        osUpToDate: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const metricsRes = await api.get('/system/metrics');
                setMetrics({
                    avgRisk: metricsRes.data.avgRiskScore || 0,
                    activeDevices: metricsRes.data.activeDevices || 0,
                    blockedAttempts: metricsRes.data.blockedAttempts || 0,
                    complianceRate: metricsRes.data.complianceRate || 0
                });

                const trendRes = await api.get('/system/risk-trends');
                setTrendData(trendRes.data || []);

                const healthRes = await api.get('/system/device-health');
                setDeviceHealth({
                    firewallStatus: healthRes.data.firewallStatus || 0,
                    diskEncryption: healthRes.data.diskEncryption || 0,
                    osUpToDate: healthRes.data.osUpToDate || 0
                });

                setError(null);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                if (err.response && err.response.status === 401) {
                    setError("Session expired. Re-authentication required.");
                    setLoading(false);
                    return;
                }
                setError(err.response?.data?.message || err.message || "Failed to load dashboard data. System may be offline.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 border-2 border-[#2997FF] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm font-medium">Loading Telemetry...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-2xl flex items-center gap-4">
                <Warning className="text-[#FF453A]" size={24} weight="fill" />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#FF453A]">Connection Error</h3>
                    <p className="text-[#FF453A]/80 text-sm">{error}</p>
                </div>
                {error.includes("Session") && (
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-4 py-2 bg-[#FF453A]/20 hover:bg-[#FF453A]/30 text-[#FF453A] font-medium rounded-lg transition-colors"
                    >
                        Re-Authenticate
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Command Center
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-2 h-2 bg-[#30D158] rounded-full animate-pulse" />
                        Real-time Threat Monitoring
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#30D158]/10 border border-[#30D158]/20 rounded-lg text-[#30D158] text-xs font-medium cursor-default">
                    <Pulse size={16} weight="bold" />
                    <span>Systems Operational</span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Risk Score"
                    value={metrics.avgRisk}
                    icon={ShieldCheck}
                    trend="down"
                    trendValue={12}
                />
                <MetricCard
                    title="Active Devices"
                    value={metrics.activeDevices}
                    icon={Cpu}
                    trend="up"
                    trendValue={5}
                />
                <MetricCard
                    title="Blocked Attacks"
                    value={metrics.blockedAttempts}
                    icon={Warning}
                    trend="up"
                    trendValue={8}
                />
                <MetricCard
                    title="Compliance Rate"
                    value={`${metrics.complianceRate}%`}
                    icon={LockKey}
                    trend="up"
                    trendValue={2}
                />
            </div>

            {/* Bento Grid - Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161617]/60 backdrop-blur-xl border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <TrendUp size={20} className="text-[#2997FF]" weight="bold" />
                                Risk Analytics
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">7-Day Threat Vector Analysis</p>
                        </div>
                        <div className="flex gap-2 bg-black/20 p-1 rounded-lg">
                            {['24H', '7D', '30D'].map(range => (
                                <button key={range} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${range === '7D' ? 'bg-[#2997FF] text-white' : 'text-gray-400 hover:text-white'}`}>
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2997FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2997FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    stroke="#525252"
                                    tick={{ fill: '#737373', fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#525252"
                                    tick={{ fill: '#737373', fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(22, 22, 23, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        color: '#F5F5F7'
                                    }}
                                    itemStyle={{ color: '#F5F5F7' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="risk"
                                    stroke="#2997FF"
                                    strokeWidth={3}
                                    fill="url(#colorRisk)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device Health Panel */}
                <div className="p-6 rounded-2xl bg-[#161617]/60 backdrop-blur-xl border border-white/5 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-white mb-6">Device Health</h3>
                    <div className="space-y-8">
                        <HealthBar label="Firewall Active" value={deviceHealth.firewallStatus} color="blue" />
                        <HealthBar label="Disk Encrypted" value={deviceHealth.diskEncryption} color="purple" />
                        <HealthBar label="OS Updated" value={deviceHealth.osUpToDate} color="green" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const HealthBar = ({ label, value, color }) => {
    const getColor = (c) => {
        switch (c) {
            case 'blue': return 'bg-[#2997FF]';
            case 'purple': return 'bg-[#AF52DE]'; // Apple Purple
            case 'green': return 'bg-[#30D158]';
            default: return 'bg-[#2997FF]';
        }
    };

    const bgColor = getColor(color);

    return (
        <div className="group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium tracking-wide text-gray-400 group-hover:text-white transition-colors">
                    {label}
                </span>
                <span className="text-sm font-bold text-white">
                    {value}%
                </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full ${bgColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

export default Dashboard;

