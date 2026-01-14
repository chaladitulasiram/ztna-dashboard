import React, { useEffect, useState } from 'react';
import { Smartphone, Lock, RotateCcw, MapPin, Bell, Trash2, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import api from '../lib/api';

const MobileSecurity = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionStatus, setActionStatus] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                setLoading(true);
                const res = await api.get('/mobile/devices');
                setDevices(res.data || []);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch mobile devices:', err);
                setError(err.response?.data?.message || err.message || "Failed to connect to mobile device manager");
                setDevices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
        const interval = setInterval(fetchDevices, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const executeAction = async (deviceId, action) => {
        if (action === 'wipe') {
            const confirmed = window.confirm(`⚠️ WARNING: This will permanently wipe all data on the device. This action cannot be undone. Are you sure?`);
            if (!confirmed) return;
        }

        try {
            setActionLoading(true);
            setActionStatus(null);
            const res = await api.post(`/mobile/devices/${deviceId}/action`, { action });
            setActionStatus({
                type: 'success',
                message: res.data.message || `${action} command sent successfully`
            });
            setTimeout(() => setActionStatus(null), 5000);
        } catch (err) {
            console.error('Failed to execute device action:', err);
            setActionStatus({
                type: 'error',
                message: err.response?.data?.message || `Failed to execute ${action} action`
            });
            setTimeout(() => setActionStatus(null), 5000);
        } finally {
            setActionLoading(false);
        }
    };



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
                        Mobile Fleet
                    </h1>
                    <p className="text-cyan-400 font-bold tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        MANAGING {devices.length} ENROLLED DEVICES
                    </p>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-pink-500/10 border border-pink-500/50 rounded flex items-center gap-3 text-pink-500">
                    <AlertTriangle size={20} />
                    <div className="text-xs uppercase font-bold tracking-wider">
                        {error}. Unable to display devices.
                    </div>
                </div>
            )}

            {/* Action Status Banner */}
            {actionStatus && (
                <div className={`p-4 border rounded relative animate-in slide-in-from-top-4 flex items-center gap-3 ${actionStatus.type === 'success'
                    ? 'border-green-500/50 bg-green-500/10 text-green-400'
                    : 'border-red-500/50 bg-red-500/10 text-red-400'
                    }`}>
                    {actionStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    <span className="text-sm font-bold uppercase tracking-wider">{actionStatus.message}</span>
                </div>
            )}

            {/* Device Card or Empty State */}
            {loading && devices.length === 0 ? (
                <div className="h-64 bg-black/50 border border-cyan-500/20 rounded animate-pulse" />
            ) : devices.length === 0 ? (
                <div className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded p-16 text-center">
                    <Smartphone className="text-cyan-400/30 mx-auto mb-4" size={64} />
                    <h3 className="text-xl font-black text-cyan-400/50 uppercase tracking-wider mb-2">
                        No Devices Enrolled
                    </h3>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">
                        Connect devices to monitor security status
                    </p>
                </div>
            ) : devices.map((device) => (
                <div key={device.id} className="bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded relative overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)' }}>

                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

                    <div className="p-8 border-b border-cyan-500/20 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/50 relative group">
                                <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-pulse" />
                                <Smartphone className="text-cyan-400 relative z-10" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{device.name}</h3>
                                <p className="text-sm text-cyan-400/60 font-mono mt-1 uppercase tracking-widest">
                                    Last seen: {device.lastSeen} • {device.osVersion}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`px-4 py-2 rounded border uppercase font-bold text-xs tracking-widest ${device.status === 'Secure'
                                ? 'border-green-500/50 bg-green-500/10 text-green-400'
                                : 'border-red-500/50 bg-red-500/10 text-red-400'
                                }`}>
                                {device.status}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <ActionButton icon={Lock} label="Lock" onClick={() => executeAction(device.id, 'lock')} disabled={actionLoading} />
                        <ActionButton icon={MapPin} label="Locate" onClick={() => executeAction(device.id, 'locate')} disabled={actionLoading} />
                        <ActionButton icon={Bell} label="Ring" onClick={() => executeAction(device.id, 'ring')} disabled={actionLoading} />
                        <ActionButton icon={RotateCcw} label="Restart" onClick={() => executeAction(device.id, 'restart')} disabled={actionLoading} />
                        <ActionButton icon={Bell} label="Alert" onClick={() => executeAction(device.id, 'alert')} disabled={actionLoading} />
                        <ActionButton icon={Trash2} label="Wipe" variant="danger" onClick={() => executeAction(device.id, 'wipe')} disabled={actionLoading} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const ActionButton = ({ icon: Icon, label, variant = 'default', onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`flex flex-col items-center justify-center p-6 rounded border transition-all duration-300 group relative overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed border-gray-800' :
            variant === 'danger'
                ? 'border-pink-500/30 bg-pink-500/5 text-pink-400 hover:bg-pink-500/10 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]'
            }`}
    >
        <Icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
);

export default MobileSecurity;
