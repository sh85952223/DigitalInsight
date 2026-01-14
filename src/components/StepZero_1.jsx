import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Crosshair from './common/Crosshair';

// Import Modern Images
import modernBed from '../assets/modern_bed.png';
import modernDoor from '../assets/modern_door.png';

// Import Full Market Sequence (Optimized)
import m1 from '../assets/optimized/시장1.jpg';
import m2 from '../assets/optimized/시장2.jpg';
import m3 from '../assets/optimized/시장3.jpg';
import m4 from '../assets/optimized/시장4.jpg';
import m5 from '../assets/optimized/시장5.jpg';
import m6 from '../assets/optimized/시장6.jpg';
import m7 from '../assets/optimized/시장7.jpg';
import m8 from '../assets/optimized/시장8.jpg';
import m9 from '../assets/optimized/시장9.jpg';
import m10 from '../assets/optimized/시장10.jpg';

const MARKET_SEQUENCE = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];

const ACTION_STEPS = [
    "과거엔...시장에 도착하면 둘러보고",
    "사고 싶은 물건 직접 살펴보며",
    "결정하면 지갑을 꺼냈다.",
    "현금(또는 카드)을 지불하고",
    "거스름돈(또는 카드)을 돌려받았다.",
    "물건을 가지고 집으로 돌아가는 길...",
    "집에서 출발하는 것부터",
    "물건을 구매하고",
    "돌아오기까지",
    "장보기에는 시간과 노력이 필요했다."
];

export default function StepZero_1({ onComplete }) {
    // Internal Phase: 'cover' -> 'comparison'
    const [showCover, setShowCover] = useState(true);

    // Shared State for interactions (Comparison Phase)
    const [pastStep, setPastStep] = useState(0);
    const [pastCompleted, setPastCompleted] = useState(false);

    // Present Era State
    const [presentUnlocked, setPresentUnlocked] = useState(false);
    const [presentPhase, setPresentPhase] = useState('idle'); // idle, ordering, delivered

    // IMAGE PRELOADING (Optimization)
    useEffect(() => {
        MARKET_SEQUENCE.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // HIDE GLOBAL BACKGROUND & ANIMATIONS (User Request)
    useEffect(() => {
        const cyberBg = document.getElementById('cyber-bg');
        const scanlines = document.querySelector('.scanlines');

        if (cyberBg) cyberBg.style.display = 'none';
        if (scanlines) scanlines.style.display = 'none';

        return () => {
            if (cyberBg) cyberBg.style.display = '';
            if (scanlines) scanlines.style.display = '';
        };
    }, []);

    // Handlers
    const handlePastChange = (val) => {
        setPastStep(val);
        if (val === MARKET_SEQUENCE.length - 1) {
            setPastCompleted(true);
            setPresentUnlocked(true);
        }
    };

    const handlePresentOrder = () => {
        setPresentPhase('ordering');
        setTimeout(() => {
            setPresentPhase('delivered');
        }, 1000);
    };

    // Glitch Button Logic
    const [btnText, setBtnText] = useState("접근을 요청합니다");
    const intervalRef = useRef(null);
    const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleBtnEnter = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);
        const target = "접근 허가";

        intervalRef.current = setInterval(() => {
            setBtnText((prev) =>
                target
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return target[index];
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= target.length) clearInterval(intervalRef.current);
            iteration += 1 / 2;
        }, 30);
    };

    const handleBtnLeave = () => {
        clearInterval(intervalRef.current);
        setBtnText("접근을 요청합니다");
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
                {showCover ? (
                    /* ==================== COVER SCREEN ==================== */
                    <motion.div
                        key="cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="relative z-20 flex flex-col items-center justify-center text-center p-8"
                    >
                        <motion.h1
                            data-hover="true"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter cursor-none"
                        >
                            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Insight</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-400 font-light mb-12"
                        >
                            편리함 뒤에 숨겨진 진실을 마주하다
                        </motion.p>

                        <motion.button
                            data-hover="true"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(255,255,255)" }}
                            onMouseEnter={handleBtnEnter}
                            onMouseLeave={handleBtnLeave}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 0.8 }}
                            onClick={() => {
                                // SFX: Access Granted / Sci-Fi Interface Start
                                const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
                                audio.volume = 0.5;
                                audio.play().catch(e => console.error("Audio play failed:", e));

                                setShowCover(false);
                            }}
                            className="px-12 py-5 bg-white text-black text-xl font-bold rounded-none [clip-path:polygon(10%_0,100%_0,100%_80%,90%_100%,0_100%,0_20%)] shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all tracking-widest cursor-none relative overflow-hidden group"
                        >
                            {/* Glitch Tech Decos */}
                            <span className="absolute top-0 left-0 w-2 h-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></span>

                            {btnText}
                        </motion.button>

                        {/* Only Show Crosshair on Cover */}
                        <Crosshair color="#22d3ee" />
                    </motion.div>
                ) : (
                    /* ==================== COMPARISON SCREEN ==================== */
                    <motion.div
                        key="comparison"
                        className="relative z-10 w-full h-full flex items-center justify-center p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex gap-8 md:gap-16 items-center scale-90 md:scale-100 transition-transform">

                            {/* LEFT: PHYSICAL (Paper/Grit/Analog) */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative group"
                            >
                                {/* Shadow Decoration */}
                                <div className="absolute inset-0 bg-black/40 blur-xl transform rotate-[-2deg] translate-y-4" />

                                <div className="w-[400px] h-[600px] bg-[#f0f0f0] rounded-sm rotate-[-2deg] flex flex-col p-3 border border-gray-300 relative shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
                                    {/* Sticky Note Badge */}
                                    <div className="absolute -top-4 -left-4 w-36 h-10 bg-[#ffd700] shadow-md flex items-center justify-center transform -rotate-3 z-20 border border-yellow-400/50">
                                        <span className="font-hand text-black font-black tracking-tighter text-lg">PAST MEMORY</span>
                                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Polaroid-style Image Area */}
                                    <div className="flex-1 bg-white border border-gray-200 p-3 shadow-inner mb-3 relative overflow-hidden">
                                        <div className="w-full h-full bg-gray-100 relative overflow-hidden grayscale sepia-[0.2] contrast-125">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={pastStep}
                                                    src={MARKET_SEQUENCE[pastStep]}
                                                    alt="Past"
                                                    initial={{ opacity: 0.8, scale: 1.05 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="w-full h-full object-cover"
                                                />
                                            </AnimatePresence>

                                            {/* Scanlines overlay for slight texture */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />
                                        </div>

                                        {/* Step Stamp */}
                                        <div className="absolute top-4 right-4 border-2 border-black/20 text-black/40 font-black px-2 py-1 rotate-12 text-xs">
                                            STEP {pastStep + 1}-{MARKET_SEQUENCE.length}
                                        </div>
                                    </div>

                                    {/* Text & Control Area (Cardboard Texture) */}
                                    <div className="h-[180px] bg-[#e6e6e6] rounded border border-gray-300 p-5 flex flex-col justify-between shadow-inner relative">
                                        {/* Paper Texture Overlay */}
                                        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none mix-blend-multiply" />

                                        <div className="relative z-10">
                                            <p className="font-serif text-gray-800 text-center font-bold text-lg leading-tight mb-4 min-h-[3rem]">
                                                "{ACTION_STEPS[pastStep]}"
                                            </p>

                                            {/* Physical Slider */}
                                            <div className="relative w-full h-12 flex items-center justify-center mt-2">
                                                {/* Track */}
                                                <div className="absolute w-full h-3 bg-gray-400 rounded-full shadow-inner border border-gray-500 overflow-hidden">
                                                    <div className="w-full h-full bg-gray-300" />
                                                </div>
                                                {/* Progress */}
                                                <motion.div
                                                    className="absolute left-0 h-3 bg-gray-600 rounded-l-full pointer-events-none"
                                                    animate={{ width: `${(pastStep / (MARKET_SEQUENCE.length - 1)) * 100}%` }}
                                                />

                                                {/* Handle / Knob */}
                                                <motion.div
                                                    className="absolute top-1/2 w-8 h-8 -mt-4 bg-zinc-200 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-gray-400 flex items-center justify-center pointer-events-none"
                                                    animate={{ left: `calc(${(pastStep / (MARKET_SEQUENCE.length - 1)) * 100}% - 16px)` }}
                                                >
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full shadow-inner" />
                                                </motion.div>

                                                {/* Input - on top */}
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={MARKET_SEQUENCE.length - 1}
                                                    step={1}
                                                    value={pastStep}
                                                    onChange={(e) => handlePastChange(Number(e.target.value))}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing"
                                                    style={{ zIndex: 50 }}
                                                />
                                            </div>

                                            <div className="text-center text-[10px] font-mono text-gray-500 mt-2 tracking-widest uppercase">
                                                {pastCompleted ? "Memory Archived" : "Drag to Experience"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>


                            {/* VS BADGE */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <span className="font-black italic text-4xl text-white/20 my-4 transform -skew-x-12">VS</span>
                                <div className="h-20 w-[1px] bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                            </div>


                            {/* RIGHT: MODERN WEB BROWSER (Clean/Digital) */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className={`relative group transition-all duration-500 rotate-2 hover:rotate-0 hover:scale-[1.02] ${presentUnlocked ? 'opacity-100 filter-none' : 'opacity-30 blur-sm grayscale'}`}
                            >
                                {/* Shadow Decoration */}
                                <div className="absolute inset-0 bg-black/40 blur-xl transform rotate-[2deg] translate-y-4 transition-transform group-hover:rotate-0" />

                                {/* Glow Behind */}
                                <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-[10px]" />

                                {/* Browser Window Frame */}
                                <div className="w-[800px] md:w-[600px] max-w-[90vw] h-[600px] bg-[#1a1a1a] rounded-xl shadow-2xl flex flex-col overflow-hidden relative border border-gray-800 transition-all">

                                    {/* Browser Header (Traffic Lights & URL Bar) */}
                                    <div className="h-10 bg-[#2a2a2a] border-b border-[#333] flex items-center px-4 gap-4 select-none">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                        </div>
                                        {/* Fake URL Bar */}
                                        <div className="flex-1 bg-[#1a1a1a] rounded flex items-center px-3 py-1 text-xs text-gray-500 font-mono">
                                            <span className="text-green-500 mr-2">🔒</span> https://instant.shop/checkout
                                        </div>
                                    </div>

                                    {/* Main Browser Content Area */}
                                    <div className="flex-1 relative bg-black flex flex-col">

                                        {/* Image Content */}
                                        <div className="flex-1 relative overflow-hidden bg-black group-hover:brightness-110 transition-all">
                                            <AnimatePresence mode="wait">
                                                {presentPhase === 'delivered' ? (
                                                    <motion.div key="door" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                                                        <img src={modernDoor} alt="Arrived" className="w-full h-full object-cover invert opacity-80" />

                                                        {/* Delivery Notification Card (Modern Web Style) - FLOAT ANIMATION */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 30 }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: [0, -10, 0] // Floating bobbing effect
                                                            }}
                                                            transition={{
                                                                y: {
                                                                    duration: 4,
                                                                    repeat: Infinity,
                                                                    ease: "easeInOut"
                                                                },
                                                                opacity: { duration: 0.5 }
                                                            }}
                                                            className="absolute top-8 right-8 bg-[#1a1a1a]/90 backdrop-blur-md text-white p-4 rounded-xl border border-gray-700 shadow-2xl max-w-[200px]"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                                                <span className="text-xs font-bold uppercase tracking-wider text-green-500">Arrived</span>
                                                            </div>
                                                            <div className="text-lg font-bold">문 앞 배송 완료!</div>
                                                            <div className="text-xs text-gray-400 mt-1">방금 전 도착했습니다.</div>
                                                        </motion.div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="bed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                                                        <img src={modernBed} alt="Bed" className="w-full h-full object-cover invert opacity-80" />

                                                        {presentPhase === 'ordering' && (
                                                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                                                                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                                                                <div className="text-purple-400 font-mono tracking-widest animate-pulse">PROCESSING ORDER...</div>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Caption Overlay */}
                                            <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                                                <h2 className="text-3xl font-black text-white mb-1">
                                                    {presentPhase === 'idle' && "침대에 누워, 터치 한 번."}
                                                    {presentPhase === 'ordering' && "결제 진행 중..."}
                                                    {presentPhase === 'delivered' && "오늘 도착 완료."}
                                                </h2>
                                                <p className="text-gray-400 text-sm">
                                                    {presentPhase === 'idle' && "더 이상 발품 팔 필요가 없는 세상."}
                                                    {presentPhase === 'ordering' && "복잡한 과정은 생략되었습니다."}
                                                    {presentPhase === 'delivered' && "과거에 비해 생활은 더욱 편리해졌다."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Web Interaction Footer (Clean Toolbar) */}
                                        <div className="h-20 bg-[#111] border-t border-[#333] flex items-center justify-between px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="text-xs text-gray-500 font-mono">TOTAL</div>
                                                <div className="text-xl font-bold text-white">$ 29.99</div>
                                            </div>

                                            {/* Action Button */}
                                            {presentUnlocked ? (
                                                presentPhase === 'delivered' ? (
                                                    <button
                                                        onClick={onComplete}
                                                        className="bg-zinc-800 text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide transition-all border border-gray-600 flex items-center gap-2 group/btn hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:border-transparent hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                                    >
                                                        하지만 놓치고 있는건? <span className="text-gray-400 group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-white">→</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handlePresentOrder}
                                                        disabled={presentPhase === 'ordering'}
                                                        className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide shadow-lg shadow-purple-900/20 active:scale-95 transition-all flex items-center gap-2"
                                                    >
                                                        <span className="text-lg">⚡</span> 즉시 결제하기
                                                    </button>
                                                )
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <span>🔒</span>
                                                    <span className="text-xs uppercase tracking-wider">Locked</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
