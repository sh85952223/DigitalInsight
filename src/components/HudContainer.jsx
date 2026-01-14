import React from 'react';
import { motion } from 'framer-motion';

export default function HudContainer({ children, className = '', title, type = 'cyan', largeTitle = false }) {
    // Styles based on type
    const borderColor = type === 'red' ? 'var(--accent-red)' : 'var(--primary-cyan)';
    const glowClass = type === 'red' ? 'shadow-[0_0_15px_rgba(255,42,42,0.15)]' : 'shadow-[0_0_15px_rgba(0,243,255,0.15)]';
    const titleBgColor = type === 'red' ? 'bg-[var(--accent-red)]' : 'bg-[var(--primary-cyan)]';
    const titleTextColor = 'text-black';

    return (
        <motion.div
            className={`relative p-6 pt-12 border border-[color:var(--text-dim)]/20 bg-[var(--panel-bg)] backdrop-blur-sm ${glowClass} ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
        >
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2" style={{ borderColor }} />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2" style={{ borderColor }} />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2" style={{ borderColor }} />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2" style={{ borderColor }} />

            {/* HUD Header / Label - Enhanced for visibility */}
            {title && (
                <div className={`absolute top-0 left-8 px-4 py-2 -translate-y-1/2 ${titleBgColor} ${titleTextColor} font-bold tracking-widest uppercase flex items-center gap-2 ${largeTitle ? 'text-base' : 'text-s'}`}>
                    <span className={`w-2 h-2 rounded-full bg-black animate-pulse`} />
                    <span className="font-display">{title}</span>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Decorative Lines */}
            <div className="absolute right-[-1px] bottom-[20%] w-[2px] h-[30px]" style={{ backgroundColor: borderColor }} />
        </motion.div>
    );
}
