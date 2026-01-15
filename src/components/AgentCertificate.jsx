// [REFACTORED] 미사용 React, Suspense, GlitchText import 제거
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from '@react-three/drei';
import Lanyard from './Lanyard';

// Sound Assets
import bgmSoundAsset from '../assets/sounds/innovative-tech-background-for-presentations-153299.mp3';
import stampSoundAsset from '../assets/sounds/traditional-stamp-44189.mp3';

export default function AgentCertificate({ onExit }) {
    // Audio Ref
    const bgmAudioRef = useRef(null);

    // Initialize and play background music on mount with fade in
    useEffect(() => {
        bgmAudioRef.current = new Audio(bgmSoundAsset);
        bgmAudioRef.current.preload = 'auto';
        bgmAudioRef.current.load();
        bgmAudioRef.current.volume = 0; // Start at 0 for fade in
        bgmAudioRef.current.loop = true;

        // Skip first 2 seconds (quiet part)
        bgmAudioRef.current.currentTime = 2;

        // Start playing
        bgmAudioRef.current.play().catch(() => { });

        // Fade in over 2 seconds
        const fadeDuration = 2000;
        const fadeSteps = 40;
        const fadeInterval = fadeDuration / fadeSteps;
        const targetVolume = 0.35;
        const volumeStep = targetVolume / fadeSteps;
        let currentStep = 0;

        const fadeTimer = setInterval(() => {
            currentStep++;
            if (bgmAudioRef.current) {
                bgmAudioRef.current.volume = Math.min(targetVolume, volumeStep * currentStep);
            }
            if (currentStep >= fadeSteps) {
                clearInterval(fadeTimer);
            }
        }, fadeInterval);

        // Play stamp sound after 0.5s (when stamp animation happens)
        const stampTimer = setTimeout(() => {
            const stampSound = new Audio(stampSoundAsset);
            stampSound.volume = 0.6;
            stampSound.play().catch(() => { });
        }, 500);

        return () => {
            clearInterval(fadeTimer);
            clearTimeout(stampTimer);
            if (bgmAudioRef.current) {
                bgmAudioRef.current.pause();
                bgmAudioRef.current = null;
            }
        };
    }, []);
    return (
        <div className="w-full h-full flex bg-zinc-950 relative overflow-hidden font-sans">
            {/* LEFT: 3D INTERACTION AREA */}
            <div className="w-1/2 h-full relative border-r border-cyan-900/30 bg-gradient-to-br from-black to-cyan-950/20">
                <div className="absolute top-8 left-8 z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-cyan-400 text-xs tracking-[0.2em] font-bold">PHYSICAL SIMULATION</span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter opacity-80">ID CARD<br />ISSUANCE</h2>
                </div>

                {/* Lanyard component is self-contained with its own Canvas */}
                <Lanyard />

            </div>

            {/* RIGHT: CERTIFICATE UI */}
            <div className="w-1/2 h-full flex items-center justify-center p-8 relative bg-zinc-950 overflow-hidden">
                {/* Background Decor - Cyber Grid */}
                <div
                    className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}
                />

                {/* Scanner Line Animation */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-[scanline_3s_linear_infinite]" />
                </div>

                <div className="relative z-10 w-full max-w-2xl px-8">
                    {/* Header */}
                    <div className="mb-10 text-right border-b border-gray-800 pb-6 relative">
                        {/* Decorative Corner */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />

                        <h1 className="text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            정식 요원<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">인증서</span>
                        </h1>
                        <div className="flex justify-end items-center gap-3">
                            <div className="h-[1px] w-12 bg-gray-700" />
                            <div className="text-gray-500 text-sm tracking-[0.4em] font-mono">DIGITAL INSIGHT BUREAU</div>
                        </div>
                    </div>

                    {/* Details - Horizontal Layout for better space usage */}
                    <div className="grid grid-cols-1 gap-8 font-mono relative">
                        <div className="group relative pl-6 border-l-2 border-transparent hover:border-cyan-500 transition-colors duration-300">
                            <label className="block text-sm text-cyan-600 font-bold tracking-widest mb-2 group-hover:text-cyan-400 transition-colors">요원명 (AGENT NAME)</label>
                            <div className="text-4xl text-white font-bold tracking-tight drop-shadow-md">디지털 수사관</div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="group relative pl-6 border-l-2 border-transparent hover:border-cyan-500 transition-colors duration-300">
                                <label className="block text-sm text-cyan-600 font-bold tracking-widest mb-2 group-hover:text-cyan-400 transition-colors">보안 등급 (CLEARANCE)</label>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-white">Lv. 1</span>
                                    <span className="text-sm font-bold text-cyan-500 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-700/50 tracking-wider">ROOKIE</span>
                                </div>
                            </div>

                            <div className="group relative pl-6 border-l-2 border-transparent hover:border-cyan-500 transition-colors duration-300">
                                <label className="block text-sm text-cyan-600 font-bold tracking-widest mb-2 group-hover:text-cyan-400 transition-colors">발급일 (DATE)</label>
                                <div className="text-3xl text-white font-bold tracking-tight">
                                    {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stamp - Realistic Official Seal Style with Stamping Animation */}
                    <motion.div
                        initial={{ scale: 2.5, opacity: 0, rotate: 15 }}
                        animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
                        transition={{
                            delay: 0.5,
                            duration: 0.15,
                            type: "spring",
                            stiffness: 500,
                            damping: 15
                        }}
                        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 w-56 h-56 pointer-events-none select-none z-0 mix-blend-plus-lighter"
                    >
                        <div className="w-full h-full border-4 border-double border-cyan-500 rounded-full flex items-center justify-center bg-cyan-900/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            {/* Inner Circle */}
                            <div className="w-[90%] h-[90%] border border-cyan-400 rounded-full flex items-center justify-center relative">
                                {/* Top/Bottom Text hints */}
                                <div className="absolute top-4 text-[10px] tracking-[0.4em] text-cyan-300 font-bold">DIGITAL INSIGHT</div>
                                <div className="absolute bottom-4 text-[10px] tracking-[0.4em] text-cyan-300 font-bold">OFFICIAL</div>

                                {/* Center Content */}
                                <div className="text-center z-10">
                                    <div className="text-xs text-cyan-400 tracking-widest mb-1">APPROVED</div>
                                    <div className="text-4xl font-black text-cyan-300 tracking-wider border-y-2 border-cyan-500/50 py-1 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                                        합 격
                                    </div>
                                    <div className="text-[10px] text-cyan-500 font-mono">{new Date().toISOString().split('T')[0].replace(/-/g, '.')}</div>
                                </div>

                                {/* Background Star */}
                                <div className="absolute text-9xl text-cyan-500/5 rotate-12">★</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="mt-12 flex gap-4 relative z-10">
                        <div className="flex-1 bg-cyan-950/30 border border-cyan-800/50 p-6 rounded text-sm text-cyan-400 leading-relaxed shadow-lg backdrop-blur-sm">
                            <strong className="block text-cyan-300 mb-2 text-base">접근 권한 승인됨</strong>
                            귀하는 디지털 전환 훈련을 성공적으로 마쳤습니다. 이제 모든 시스템에 접근할 수 있습니다.
                        </div>
                    </div>

                    <button onClick={onExit} className="mt-6 w-full py-4 bg-white text-black font-bold tracking-widest hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group">
                        <span>본부로 복귀</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>

            <Loader />
        </div>
    );
}
