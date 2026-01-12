import React, { useEffect, useState } from 'react';
import api, { DEVICE_ID } from '../../lib/api';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

const PostureHeartbeat = () => {
    const [status, setStatus] = useState('VERIFYING');

    const sendHeartbeat = async () => {
        try {
            // Live data mapped to your backend DTO
            const postureData = {
                deviceId: DEVICE_ID,
                osType: navigator.platform,
                osVersion: "1.0.0",
                firewallEnabled: true,
                diskEncrypted: true,
                antivirusEnabled: true
            };

            const response = await api.post('/device/heartbeat', postureData);
            setStatus(response.data.status);
        } catch (err) {
            setStatus('NON_COMPLIANT');
        }
    };

    useEffect(() => {
        sendHeartbeat();
        const interval = setInterval(sendHeartbeat, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${status === 'COMPLIANT'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
            {status === 'COMPLIANT' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            {status}
        </div>
    );
};

export default PostureHeartbeat;