import React from 'react';

/**
 * Lanyard ID Card Component
 * Realistic leather strap with metal D-ring and carabiner clip.
 * Reference: White/gray leather strap with rivets style.
 */
export default function Lanyard() {
    return (
        <div className="w-full h-full flex flex-col items-center pt-0 select-none overflow-hidden">
            {/* ===== LANYARD STRAP SECTION ===== */}
            <div className="relative flex flex-col items-center">

                {/* Leather Strap - Going up (lighter gray/white leather) */}
                <div
                    className="relative"
                    style={{
                        width: '40px',
                        height: '140px',
                        background: 'linear-gradient(90deg, #030712 0%, #0a0f1a 20%, #111827 50%, #0a0f1a 80%, #030712 100%)',
                        borderRadius: '4px',
                        boxShadow: 'inset 3px 0 6px rgba(0,0,0,0.3), inset -3px 0 6px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.4)'
                    }}
                >
                    {/* Stitching effect on edges */}
                    <div className="absolute left-1 top-0 bottom-0 w-[2px] opacity-30"
                        style={{ background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 4px, #64748b 4px, #64748b 8px)' }}
                    />
                    <div className="absolute right-1 top-0 bottom-0 w-[2px] opacity-30"
                        style={{ background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 4px, #64748b 4px, #64748b 8px)' }}
                    />

                    {/* Metal rivets/holes */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 border border-gray-500 shadow-md" />
                    </div>
                    <div className="absolute top-16 left-1/2 -translate-x-1/2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 border border-gray-500 shadow-md" />
                    </div>
                    <div className="absolute top-[100px] left-1/2 -translate-x-1/2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 border border-gray-500 shadow-md" />
                    </div>
                </div>

                {/* Metal D-Ring / Swivel Ring */}
                <div className="relative -mt-2 z-10">
                    {/* Ring holder plate */}
                    <div
                        className="w-12 h-5 rounded-md flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(180deg, #d1d5db 0%, #9ca3af 40%, #6b7280 100%)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
                        }}
                    >
                        <div className="w-8 h-2 rounded-sm bg-gradient-to-b from-gray-500 to-gray-600" />
                    </div>

                    {/* D-Ring */}
                    <div className="flex justify-center -mt-1">
                        <div
                            className="w-8 h-6 rounded-b-full border-[4px] border-gray-500"
                            style={{
                                background: 'linear-gradient(180deg, #9ca3af 0%, #6b7280 100%)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)'
                            }}
                        />
                    </div>
                </div>

                {/* Carabiner / Lobster Claw Clip */}
                <div className="relative -mt-2 z-20">
                    {/* Clip body */}
                    <div className="flex flex-col items-center">
                        {/* Top connector ring */}
                        <div
                            className="w-4 h-4 rounded-full border-[3px]"
                            style={{
                                borderColor: '#6b7280',
                                background: 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)'
                            }}
                        />

                        {/* Clip main body */}
                        <div
                            className="w-5 h-10 -mt-1 rounded-b-lg relative"
                            style={{
                                background: 'linear-gradient(90deg, #6b7280 0%, #9ca3af 30%, #d1d5db 50%, #9ca3af 70%, #6b7280 100%)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                            }}
                        >
                            {/* Spring lever */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-sm" />
                        </div>

                        {/* Clip hook */}
                        <div
                            className="w-6 h-4 -mt-1 relative"
                            style={{
                                background: 'linear-gradient(180deg, #9ca3af 0%, #6b7280 100%)',
                                borderRadius: '0 0 8px 8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                            }}
                        >
                            {/* Hook curve */}
                            <div
                                className="absolute -bottom-2 left-0 w-3 h-4 rounded-bl-full border-l-[3px] border-b-[3px] border-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Small ring connecting to card */}
                <div className="mt-1">
                    <div
                        className="w-5 h-5 rounded-full border-[3px]"
                        style={{
                            borderColor: '#6b7280',
                            background: 'radial-gradient(circle at 30% 30%, #f1f5f9, #9ca3af)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>
            </div>

            {/* ===== ID CARD ===== */}
            <div
                className="relative rounded-2xl overflow-hidden mt-1 flex flex-col"
                style={{
                    width: '300px',
                    height: '440px',
                    background: 'linear-gradient(165deg, #020617 0%, #0c1929 30%, #0f172a 60%, #020617 100%)',
                    boxShadow: '0 30px 60px -15px rgba(0, 150, 255, 0.3), 0 0 50px rgba(0, 200, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
            >
                {/* Card hole for clip attachment */}
                <div className="flex justify-center pt-3 pb-2">
                    <div
                        className="w-6 h-4 rounded-full"
                        style={{
                            background: 'linear-gradient(180deg, #0a0a0a, #1a1a1a)',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)'
                        }}
                    />
                </div>

                {/* Header Band */}
                <div
                    className="h-14 flex items-center overflow-hidden relative"
                    style={{
                        background: 'linear-gradient(90deg, #0891b2 0%, #06b6d4 30%, #22d3ee 50%, #06b6d4 70%, #0891b2 100%)'
                    }}
                >
                    <div className="animate-marquee whitespace-nowrap flex">
                        <span className="text-base font-black text-black tracking-[0.4em] mx-8">DIGITAL INSIGHT</span>
                        <span className="text-base font-black text-black tracking-[0.4em] mx-8">★</span>
                        <span className="text-base font-black text-black tracking-[0.4em] mx-8">DIGITAL INSIGHT</span>
                        <span className="text-base font-black text-black tracking-[0.4em] mx-8">★</span>
                        <span className="text-base font-black text-black tracking-[0.4em] mx-8">DIGITAL INSIGHT</span>
                        <span className="text-base font-black text-black tracking-[0.4em] mx-8">★</span>
                    </div>
                </div>

                {/* Photo Area */}
                <div className="flex justify-center py-5">
                    <div
                        className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl"
                        style={{
                            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                            border: '2px solid rgba(6, 182, 212, 0.5)',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(6, 182, 212, 0.2)'
                        }}
                    >
                        🕵️
                    </div>
                </div>

                {/* Info Section */}
                <div className="px-8 text-center">
                    <div className="text-[11px] text-cyan-400 tracking-[0.5em] font-bold mb-1">CERTIFIED AGENT</div>
                    <div className="text-2xl font-black text-white tracking-tight">디지털 수사관</div>
                </div>

                {/* ID and Clearance Row */}
                <div className="mx-6 mt-5 flex justify-between items-center py-3 border-t border-b border-gray-800">
                    <div>
                        <div className="text-[10px] text-gray-500 tracking-wider">ID NUMBER</div>
                        <div className="text-sm text-gray-300 font-mono">DI-2026-0114</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-500 tracking-wider">CLEARANCE</div>
                        <div className="text-sm text-cyan-400 font-bold">LEVEL 1</div>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Barcode Section - pushed to very bottom */}
                <div className="px-6 pb-8 mt-4">
                    <div className="flex justify-center gap-[2px] h-9 mb-2">
                        {[...Array(35)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white/80 rounded-[1px]"
                                style={{
                                    width: [1, 2, 3, 2, 1][i % 5] + 'px',
                                    height: '100%'
                                }}
                            />
                        ))}
                    </div>
                    <div className="text-[10px] text-center text-gray-500 font-mono tracking-[0.3em]">★ AUTHORIZED ACCESS ★</div>
                </div>

                {/* Holographic Effect - Rainbow gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(
                            130deg,
                            transparent 0%,
                            rgba(255, 0, 150, 0.08) 15%,
                            rgba(0, 255, 255, 0.12) 30%,
                            transparent 45%,
                            rgba(120, 0, 255, 0.1) 60%,
                            rgba(0, 255, 100, 0.1) 75%,
                            rgba(255, 200, 0, 0.08) 90%,
                            transparent 100%
                        )`,
                        backgroundSize: '300% 300%',
                        animation: 'hologram 4s ease-in-out infinite'
                    }}
                />

                {/* Holographic shine sweep */}
                <div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                        backgroundSize: '200% 200%',
                        animation: 'shine 3s ease-in-out infinite'
                    }}
                />

                {/* Light flare effect */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 70% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 40%)',
                        animation: 'flare 5s ease-in-out infinite'
                    }}
                />

                {/* Corner accents */}
                <div className="absolute top-[75px] left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-500/30" />
                <div className="absolute top-[75px] right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-500/30" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-500/30" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-500/30" />
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes hologram {
                    0%, 100% { background-position: 0% 0%; opacity: 0.6; }
                    25% { background-position: 50% 100%; opacity: 0.9; }
                    50% { background-position: 100% 50%; opacity: 0.7; }
                    75% { background-position: 50% 0%; opacity: 0.85; }
                }
                @keyframes shine {
                    0%, 100% { background-position: -100% 0%; }
                    50% { background-position: 200% 0%; }
                }
                @keyframes flare {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
