import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[30%] left-[40%] h-[30%] w-[30%] rounded-full bg-indigo-900/10 blur-[100px]" />
        </div>
    );
};

export default AnimatedBackground;