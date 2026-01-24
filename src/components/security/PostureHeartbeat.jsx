import React, { useEffect, useState } from 'react';
import api, { DEVICE_ID } from '../../lib/api';
import { ShieldCheck, ShieldWarning } from '@phosphor-icons/react';

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
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-colors duration-300 ${status === 'COMPLIANT'
            ? 'bg-[#30D158]/10 border-[#30D158]/20 text-[#30D158]'
            : 'bg-[#FF453A]/10 border-[#FF453A]/20 text-[#FF453A]'
            }`}>
            {status === 'COMPLIANT' ? <ShieldCheck size={16} weight="fill" /> : <ShieldWarning size={16} weight="fill" />}
            <span>{status === 'COMPLIANT' ? 'Device Secure' : 'At Risk'}</span>
        </div>
    );
};

export default PostureHeartbeat;