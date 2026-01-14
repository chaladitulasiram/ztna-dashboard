import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-pink-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[30%] left-[40%] h-[30%] w-[30%] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
    );
};

export default AnimatedBackground;