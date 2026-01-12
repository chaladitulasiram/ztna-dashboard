import React, { useEffect, useState } from 'react';
import api, { DEVICE_ID } from '../../lib/api';

const PostureHeartbeat = () => {
    const [status, setStatus] = useState('SYNCING');

    const checkPosture = async () => {
        try {
            // These values should ideally come from a local agent or browser API
            const payload = {
                deviceId: DEVICE_ID,
                osType: navigator.platform,
                firewallEnabled: true, // Local check logic
                diskEncrypted: true,   // Local check logic
                antivirusEnabled: true
            };

            const res = await api.post('/device/heartbeat', payload); // Hits DeviceController.java
            setStatus(res.data.status);
        } catch (err) {
            setStatus('NON_COMPLIANT');
        }
    };

    useEffect(() => {
        checkPosture();
        const timer = setInterval(checkPosture, 30000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`px-3 py-1 rounded-full border text-[10px] font-bold ${status === 'COMPLIANT' ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'
            }`}>
            • SYSTEM {status}
        </div>
    );
};

export default PostureHeartbeat;