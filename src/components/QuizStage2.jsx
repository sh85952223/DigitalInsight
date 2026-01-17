import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_DATA = [
    { id: 1, text: "버튼의 색상", category: "UI", hint: "시각적 요소" },
    { id: 2, text: "사용자 만족도", category: "UX", hint: "감정적 반응" },
    { id: 3, text: "페이지 레이아웃", category: "UI", hint: "구조적 설계" },
    { id: 4, text: "로딩 시간", category: "UX", hint: "성능 체감" },
    { id: 5, text: "아이콘 모양", category: "UI", hint: "그래픽 자산" },
    { id: 6, text: "사용성", category: "UX", hint: "얼마나 쉬운가" },
    { id: 7, text: "폰트 스타일", category: "UI", hint: "타이포그래피" },
];

// --- SOUND ENGINE (Web Audio API) ---
const SoundEngine = {
    audioCtx: null,

    init: () => {
        if (!SoundEngine.audioCtx) {
            SoundEngine.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    playTone: (freq, type, duration, vol = 0.1) => {
        if (!SoundEngine.audioCtx) SoundEngine.init();
        const osc = SoundEngine.audioCtx.createOscillator();
        const gain = SoundEngine.audioCtx.createGain();

        osc.frequency.value = freq;
        osc.type = type;
        gain.gain.setValueAtTime(vol, SoundEngine.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, SoundEngine.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(SoundEngine.audioCtx.destination);

        osc.start();
        osc.stop(SoundEngine.audioCtx.currentTime + duration);
    },

    playAmbience: () => {
        if (!SoundEngine.audioCtx) SoundEngine.init();
        // Low drone
        const osc = SoundEngine.audioCtx.createOscillator();
        const gain = SoundEngine.audioCtx.createGain();
        osc.frequency.value = 50;
        osc.type = 'sawtooth';
        gain.gain.value = 0.05;

        // Lowpass filter to make it "deep"
        const filter = SoundEngine.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 100;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(SoundEngine.audioCtx.destination);

        osc.start();
        SoundEngine.ambienceOsc = osc;
        SoundEngine.ambienceGain = gain;
    },

    stopAmbience: () => {
        if (SoundEngine.ambienceOsc) {
            SoundEngine.ambienceGain.gain.exponentialRampToValueAtTime(0.001, SoundEngine.audioCtx.currentTime + 1);
            SoundEngine.ambienceOsc.stop(SoundEngine.audioCtx.currentTime + 1);
            SoundEngine.ambienceOsc = null;
        }
    },

    playSuccess: () => {
        // High-tech beep ("Access Granted")
        SoundEngine.playTone(800, 'sine', 0.1, 0.2);
        setTimeout(() => SoundEngine.playTone(1200, 'sine', 0.2, 0.2), 100);
    },

    playError: () => {
        // Harsh buzz ("Access Denied")
        SoundEngine.playTone(150, 'sawtooth', 0.3, 0.3);
        SoundEngine.playTone(100, 'square', 0.3, 0.3);
    }
};


const QuizStage2 = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [exitX, setExitX] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'success' | 'error'
    const [shake, setShake] = useState(0);
    const [showIntro, setShowIntro] = useState(true); // New state for instruction popup

    const containerRef = useRef(null);

    useEffect(() => {
        // Start Ambiance on mount
        SoundEngine.init();
        SoundEngine.playAmbience();

        return () => {
            SoundEngine.stopAmbience();
        };
    }, []);

    const currentCard = QUIZ_DATA[index];

    const triggerFeedback = (type) => {
        setFeedback(type);
        if (type === 'success') {
            SoundEngine.playSuccess();
        } else {
            SoundEngine.playError();
            setShake(1);
            setTimeout(() => setShake(0), 500);
        }

        setTimeout(() => {
            setFeedback(null);
        }, 600);
    };

    const handleDragEnd = (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            handleSwipe(1); // Right (UX)
        } else if (info.offset.x < -threshold) {
            handleSwipe(-1); // Left (UI)
        }
    };

    const handleSwipe = (dir) => {
        const isUI = dir === -1;
        const correct = (isUI && currentCard.category === 'UI') || (!isUI && currentCard.category === 'UX');

        if (correct) {
            triggerFeedback('success');
            setExitX(dir * 500);
            setTimeout(() => {
                const next = index + 1;
                if (next >= QUIZ_DATA.length) {
                    onComplete();
                } else {
                    setIndex(next);
                    setExitX(0);
                }
            }, 300);
        } else {
            triggerFeedback('error');
            // Shake effect is handled by triggerFeedback setting shake state
            // We DO NOT proceed to next card, giving the user a chance to retry.
        }
    };

    return (
        <div
            className="w-full h-full relative bg-black flex flex-col items-center justify-center overflow-hidden font-sans"
            ref={containerRef}
            onClick={() => SoundEngine.init()} // Ensure audio context starts on interaction
        >
            {/* --- BACKGROUND EFFECTS --- */}
            {/* Scanlines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 0, 0.2) 50%)', backgroundSize: '100% 4px' }}
            />
            {/* Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* --- FEEDBACK OVERLAYS --- */}
            <AnimatePresence>
                {feedback === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-green-500 z-40 pointer-events-none mix-blend-screen"
                    />
                )}
                {feedback === 'error' && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-red-600 z-40 pointer-events-none mix-blend-overlay"
                        />
                        {/* Error Toast - Centered */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-24 left-0 right-0 z-50 flex justify-center pointer-events-none"
                        >
                            <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(220,38,38,0.6)] flex items-center gap-2 border border-red-400">
                                <span>⚠️ Incorrect Classification! Try Again.</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- INSTRUCTION POPUP (Redesigned) --- */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.05, opacity: 0 }}
                            className="w-full max-w-3xl border-2 border-green-500 bg-black p-12 flex flex-col items-center text-center shadow-[0_0_100px_rgba(0,255,0,0.15)] relative overflow-hidden"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_#22c55e]"></div>
                            <div className="absolute bottom-0 right-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_#06b6d4]"></div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                            <div className="text-green-500 text-lg font-mono mb-6 animate-pulse tracking-[0.2em] uppercase">
                                &gt;&gt;&gt; Incoming Transmission
                            </div>

                            {/* Title with breathing room */}
                            <div className="mb-5">
                                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
                                    UI와 UX <span className="text-green-500">이해도</span> 분석
                                </h2>
                            </div>

                            {/* Description - Block-based layout for better vertical rhythm */}
                            <div className="mb-7 space-y-5 text-xl text-gray-300 leading-relaxed font-ui max-w-2xl break-keep text-center" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
                                <p>제시되는 키워드를 확인하고</p>
                                <p>
                                    <span className="text-green-400 font-bold px-2 py-1 bg-green-950/50 rounded border border-green-800">
                                        UI (디자인)
                                    </span>
                                    는 왼쪽,
                                </p>
                                <p>
                                    <span className="text-cyan-400 font-bold px-2 py-1 bg-cyan-950/50 rounded border border-cyan-800">
                                        UX (경험)
                                    </span>
                                    는 오른쪽으로
                                </p>
                                <p>신속하게 분류하십시오.</p>
                            </div>

                            {/* Visual Aid with Large Drag Animation - Increased height */}
                            <div className="relative w-full max-w-lg h-40 mb-7 flex items-center justify-between px-5">
                                {/* Left Target (UI) */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 border-2 border-green-500 rounded-xl flex items-center justify-center text-green-500 bg-green-950/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                        <span className="text-4xl">←</span>
                                    </div>
                                    <span className="text-green-500 text-sm font-bold tracking-widest">UI / SYSTEM</span>
                                </div>

                                {/* Animated Card Demo */}
                                <motion.div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-28 bg-zinc-800 border-2 border-zinc-500 rounded-lg flex items-center justify-center z-10 shadow-2xl"
                                    animate={{
                                        x: [0, -80, 0, 80, 0],
                                        rotate: [0, -10, 0, 10, 0],
                                        opacity: [1, 0.8, 1, 0.8, 1],
                                        scale: [1, 0.95, 1, 0.95, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.25, 0.5, 0.75, 1]
                                    }}
                                >
                                    <span className="text-4xl filter drop-shadow-lg">👆</span>
                                </motion.div>

                                {/* Right Target (UX) */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 border-2 border-cyan-500 rounded-xl flex items-center justify-center text-cyan-500 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                                        <span className="text-4xl">→</span>
                                    </div>
                                    <span className="text-cyan-500 text-sm font-bold tracking-widest">UX / FEELING</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowIntro(false)}
                                className="w-full max-w-md py-6 bg-green-600 hover:bg-green-500 text-white font-black text-2xl transition-all tracking-[0.2em] shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] clipped-corner hover:-translate-y-1"
                            >
                                MISSION START
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- UI LAYER --- */}
            <motion.div
                animate={{ x: shake ? [0, -20, 20, -20, 20, 0] : 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-4xl flex flex-col items-center"
            >
                {/* Header */}
                <div className="w-full flex justify-between items-end mb-12 px-8 border-b border-green-900/50 pb-4">
                    <div className="text-left">
                        <div className="text-xs text-green-700 font-mono mb-1">OPERATION ID: 2024-UX-TEST</div>
                        <h2 className="text-3xl font-black text-white tracking-tighter" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
                            <span className="text-green-500">UI</span> 와 <span className="text-cyan-500">UX</span> 이해도 분석
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-red-500 font-mono animate-pulse">LIVE FEED // SECURE</div>
                        <div className="text-xl font-mono text-green-400">
                            {index + 1} <span className="text-gray-600">/ {QUIZ_DATA.length}</span>
                        </div>
                    </div>
                </div>

                {/* Instructions (Updated Colors & Size) */}
                <div className="flex w-full justify-between items-center px-10 mb-8 font-mono opacity-90 select-none">
                    <div className="text-green-500 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                        <span className="text-4xl animate-pulse">←</span>
                        <span className="text-xl font-bold tracking-tight">UI (디자인)</span>
                    </div>
                    <div className="text-cyan-500 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <span className="text-xl font-bold tracking-tight">UX (경험)</span>
                        <span className="text-4xl animate-pulse">→</span>
                    </div>
                </div>

                {/* Card Area */}
                <div className="relative w-80 h-96 perspective-1000">
                    <AnimatePresence mode="popLayout">
                        {currentCard && (
                            <motion.div
                                key={currentCard.id}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                whileTap={{ cursor: 'grabbing' }}
                                animate={{
                                    x: exitX,
                                    opacity: exitX === 0 ? 1 : 0,
                                    rotate: exitX === 0 ? 0 : exitX > 0 ? 20 : -20,
                                    scale: 1
                                }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="absolute inset-0 bg-black/90 rounded-none border border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.15)] flex flex-col items-center justify-center p-8 cursor-grab backdrop-blur-sm group"
                            >
                                {/* Holographic Corner Decors */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500" />

                                <div className="text-5xl mb-8 opacity-80 grayscale group-hover:grayscale-0 transition-all duration-300">
                                    {/* Abstract icon based on category logic could go here, using emoji for now */}
                                    Analyzing...
                                </div>
                                <h3 className="text-3xl font-black text-center text-white break-keep leading-snug mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
                                    {currentCard.text}
                                </h3>
                                <div className="px-3 py-1 bg-green-900/30 border border-green-800 text-green-400 text-xs font-mono rounded">
                                    HINT: {currentCard.hint}
                                </div>

                                {/* Drag Indicators (Fade in on Drag attempt could be nice, but simple static is fine) */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status Log */}
                <div className="mt-12 w-full max-w-md bg-black/50 border-t border-green-900/50 p-4 font-mono text-[10px] text-green-800 leading-tight">
                    <div>&gt; SYSTEM READY</div>
                    <div>&gt; NEURAL LINK ESTABLISHED</div>
                    {feedback === 'error' && <div className="text-red-500">&gt; ERROR: INCORRECT CLASSIFICATION DETECTED</div>}
                    {feedback === 'success' && <div className="text-green-500">&gt; SUCCESS: DATA PATTERN MATCHED</div>}
                    <div className="animate-pulse">&gt; AWAITING INPUT...</div>
                </div>
            </motion.div>
        </div>
    );
};

export default QuizStage2;
