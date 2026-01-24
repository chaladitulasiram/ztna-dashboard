import React, { useEffect, useState } from 'react';
import { DeviceMobile, LockKey, ArrowCounterClockwise, MapPin, Bell, Trash, ShieldCheck, Warning, CheckCircle } from '@phosphor-icons/react';
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
        const interval = setInterval(fetchDevices, 30000);
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
        <div className="space-y-8 font-sans animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Mobile Fleet
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-2 h-2 bg-[#2997FF] rounded-full animate-pulse" />
                        Managing {devices.length} Enrolled Devices
                    </div>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-4 bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-2xl flex items-center gap-3 text-[#FF453A]">
                    <Warning size={20} weight="fill" />
                    <div className="text-sm font-medium">
                        {error}. Unable to display devices.
                    </div>
                </div>
            )}

            {/* Action Status Banner */}
            {actionStatus && (
                <div className={`p-4 border rounded-2xl relative animate-slide-up flex items-center gap-3 ${actionStatus.type === 'success'
                    ? 'border-[#30D158]/20 bg-[#30D158]/10 text-[#30D158]'
                    : 'border-[#FF453A]/20 bg-[#FF453A]/10 text-[#FF453A]'
                    }`}>
                    {actionStatus.type === 'success' ? <CheckCircle size={20} weight="fill" /> : <Warning size={20} weight="fill" />}
                    <span className="text-sm font-medium tracking-wide">{actionStatus.message}</span>
                </div>
            )}

            {/* Device Card or Empty State */}
            {loading && devices.length === 0 ? (
                <div className="h-64 bg-[#161617]/60 border border-white/5 rounded-2xl animate-pulse" />
            ) : devices.length === 0 ? (
                <div className="bg-[#161617]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-16 text-center">
                    <DeviceMobile className="text-gray-600 mx-auto mb-4" size={64} weight="thin" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                        No Devices Enrolled
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Connect devices to monitor security status
                    </p>
                </div>
            ) : devices.map((device) => (
                <div key={device.id} className="bg-[#161617]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-[#2997FF]/30 transition-colors duration-300">

                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400">
                                <DeviceMobile size={32} weight="fill" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">{device.name}</h3>
                                <p className="text-sm text-gray-500 font-medium mt-1">
                                    Last seen: {device.lastSeen} • {device.osVersion}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${device.status === 'Secure'
                                ? 'border-[#30D158]/20 bg-[#30D158]/10 text-[#30D158]'
                                : 'border-[#FF453A]/20 bg-[#FF453A]/10 text-[#FF453A]'
                                }`}>
                                {device.status}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <ActionButton icon={LockKey} label="Lock" onClick={() => executeAction(device.id, 'lock')} disabled={actionLoading} />
                        <ActionButton icon={MapPin} label="Locate" onClick={() => executeAction(device.id, 'locate')} disabled={actionLoading} />
                        <ActionButton icon={Bell} label="Ring" onClick={() => executeAction(device.id, 'ring')} disabled={actionLoading} />
                        <ActionButton icon={ArrowCounterClockwise} label="Restart" onClick={() => executeAction(device.id, 'restart')} disabled={actionLoading} />
                        <ActionButton icon={Bell} label="Alert" onClick={() => executeAction(device.id, 'alert')} disabled={actionLoading} />
                        <ActionButton icon={Trash} label="Wipe" variant="danger" onClick={() => executeAction(device.id, 'wipe')} disabled={actionLoading} />
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
        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 group ${disabled ? 'opacity-50 cursor-not-allowed border-white/5 bg-transparent' :
            variant === 'danger'
                ? 'border-white/5 bg-white/5 hover:bg-[#FF453A]/10 hover:border-[#FF453A]/30 hover:text-[#FF453A] text-gray-400'
                : 'border-white/5 bg-white/5 hover:bg-[#2997FF]/10 hover:border-[#2997FF]/30 hover:text-[#2997FF] text-gray-400'
            }`}
    >
        <Icon size={24} className="mb-2 transition-transform group-hover:scale-110" weight="duotone" />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
);

export default MobileSecurity;

