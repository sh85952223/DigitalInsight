import React from 'react';
import { motion } from 'framer-motion';

export default function CyberBackground() {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[var(--bg-color)]">
            {/* 1. Base Grid Layer */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />

            {/* 2. Moving Gradient Orbs */}
            <motion.div
                className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full opacity-20 filter blur-[120px]"
                style={{ background: 'radial-gradient(circle, var(--primary-cyan) 0%, transparent 70%)' }}
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full opacity-10 filter blur-[150px]"
                style={{ background: 'radial-gradient(circle, var(--accent-red) 0%, transparent 70%)' }}
                animate={{
                    x: [0, -80, 40, 0],
                    y: [0, 60, -40, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* 3. Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* 4. Scanning Line (Vertical) */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary-cyan)] opacity-20 shadow-[0_0_10px_var(--primary-cyan)]"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
