import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { Shield, AlertTriangle, Activity, Zap, TrendingUp, Lock, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const start = 0;
        const end = value;
        const increment = (end - start) / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
};

// Interactive Metric Card Component
const AnimatedMetricCard = ({ title, value, suffix = '', icon: Icon, gradient, delay = 0, tooltip }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="cyber-card p-6 rounded relative overflow-hidden group cursor-pointer will-animate"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-tooltip={tooltip}
            style={{
                animationDelay: `${delay}ms`,
                boxShadow: isHovered ? '0 0 30px rgba(0, 255, 255, 0.3)' : '0 0 10px rgba(0, 255, 255, 0.1)'
            }}
        >
            {/* Corner Brackets */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500 transition-all duration-300 ${isHovered ? 'w-6 h-6' : ''}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500 transition-all duration-300 ${isHovered ? 'w-6 h-6' : ''}`} />

            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-20 backdrop-blur-sm`}>
                        <Icon className="text-white" size={24} />
                    </div>
                    <div className={`text-xs uppercase font-bold tracking-widest px-2 py-1 rounded border ${isHovered ? 'border-cyan-400 text-cyan-400' : 'border-gray-700 text-gray-500'} transition-colors`}>
                        LIVE
                    </div>
                </div>

                <div className="mb-2">
                    <div className="text-4xl font-black text-white mb-1 transition-all duration-300 group-hover:scale-110 origin-left">
                        <AnimatedCounter value={value} />
                        {suffix && <span className="text-2xl text-cyan-400">{suffix}</span>}
                    </div>
                    <div className="text-xs uppercase font-bold tracking-widest text-gray-500 group-hover:text-cyan-400 transition-colors">
                        {title}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

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
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-cyan-500/30 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest animate-pulse">
                        Initializing Quantum Tunnel...
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Loading threat intelligence</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/50 rounded flex items-center gap-4 animate-bounce-in">
                <AlertTriangle className="text-red-500 shrink-0" size={24} />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-500 uppercase tracking-widest">Connection Error</h3>
                    <p className="text-red-400 font-mono text-sm">{error}</p>
                </div>
                {error.includes("Session") && (
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold uppercase rounded border border-red-500/50 transition-all hover:scale-105"
                    >
                        Re-Authenticate
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8 font-mono">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-slide-up">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 animate-text-glow"
                        style={{
                            background: 'linear-gradient(to right, #00ffff, #ff00ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                        Command Center
                    </h1>
                    <p className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        REAL-TIME THREAT MONITORING
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs font-bold uppercase tracking-widest hover:bg-green-500/20 transition-colors cursor-pointer">
                    <Activity size={16} className="animate-pulse" />
                    <span>All Systems Operational</span>
                </div>
            </div>

            {/* Interactive Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatedMetricCard
                    title="Risk Score"
                    value={metrics.avgRisk}
                    suffix="%"
                    icon={Shield}
                    gradient="from-cyan-500 to-blue-500"
                    delay={0}
                    tooltip="Average risk score across all access attempts"
                />
                <AnimatedMetricCard
                    title="Active Devices"
                    value={metrics.activeDevices}
                    icon={Cpu}
                    gradient="from-purple-500 to-pink-500"
                    delay={100}
                    tooltip="Currently connected devices"
                />
                <AnimatedMetricCard
                    title="Blocked Attacks"
                    value={metrics.blockedAttempts}
                    icon={AlertTriangle}
                    gradient="from-pink-500 to-red-500"
                    delay={200}
                    tooltip="Threats blocked in the last 24 hours"
                />
                <AnimatedMetricCard
                    title="Compliance"
                    value={metrics.complianceRate}
                    suffix="%"
                    icon={Lock}
                    gradient="from-green-500 to-emerald-500"
                    delay={300}
                    tooltip="Device compliance rate"
                />
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 cyber-card p-6 rounded relative group animate-slide-up">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h3 className="text-xl font-black text-white uppercase flex items-center gap-2">
                                <TrendingUp size={20} className="text-cyan-400" />
                                Risk Analytics
                            </h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Real-time Threat Vectors</p>
                        </div>
                        <div className="flex gap-2">
                            {['1H', '24H', '7D', '30D'].map(range => (
                                <button key={range} className="px-3 py-1.5 text-xs font-bold border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 rounded transition-all hover:scale-110">
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[300px] min-h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00ffff" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    stroke="#4b5563"
                                    tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#4b5563"
                                    tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(0, 0, 0, 0.9)',
                                        border: '1px solid rgba(0, 255, 255, 0.3)',
                                        borderRadius: '4px',
                                        fontFamily: 'monospace',
                                        fontSize: '12px'
                                    }}
                                    labelStyle={{ color: '#00ffff' }}
                                    itemStyle={{ color: '#ffffff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="risk"
                                    stroke="#00ffff"
                                    strokeWidth={2}
                                    fill="url(#colorRisk)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Device Health Panel */}
                <div className="cyber-card p-6 rounded relative group animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />

                    <h3 className="text-lg font-black uppercase mb-6 text-white relative z-10">Device Health</h3>

                    <div className="space-y-6 relative z-10">
                        <HealthBar label="Firewall Active" value={deviceHealth.firewallStatus} color="cyan" />
                        <HealthBar label="Disk Encrypted" value={deviceHealth.diskEncryption} color="purple" />
                        <HealthBar label="OS Updated" value={deviceHealth.osUpToDate} color="green" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const HealthBar = ({ label, value, color }) => {
    const colorMap = {
        cyan: 'from-cyan-500 to-blue-500',
        purple: 'from-purple-500 to-pink-500',
        green: 'from-green-500 to-emerald-500'
    };

    return (
        <div className="group cursor-pointer">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                    {label}
                </span>
                <span className="text-sm font-black text-white">
                    <AnimatedCounter value={value} />%
                </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${colorMap[color]} transition-all duration-1000 ease-out group-hover:animate-glow-pulse`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
