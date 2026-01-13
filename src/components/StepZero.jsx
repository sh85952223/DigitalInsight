import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';
import HudContainer from './HudContainer';

// Import Modern Images
import modernBed from '../assets/modern_bed.png';
import modernDoor from '../assets/modern_door.png';
import hourglass3d from '../assets/hourglass_3d.png';

// Import Market Images
import m1 from '../assets/시장1.png';
import m2 from '../assets/시장2.png';
import m3 from '../assets/시장3.png';
import m4 from '../assets/시장4.png';
import m5 from '../assets/시장5.png';
import m6 from '../assets/시장6.png';
import m7 from '../assets/시장7.png';
import m8 from '../assets/시장8.png';
import m9 from '../assets/시장9.png';
import m10 from '../assets/시장10.png';

const MARKET_SEQUENCE = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];

// Updated captions to be more generic actions as per user request for manual stepping
const ACTION_STEPS = [
    "시장에 도착하고 둘러보기",
    "사고 싶은 물건 직접 살펴보기",
    "결정하면 지갑을 꺼내기",
    "현금(또는 카드) 지불하기",
    "거스름돈(또는 카드) 돌려받기",
    "구매한 물건 받고 집으로 돌아가기",
    "집에서 출발부터",
    "물건을 구매하고",
    "돌아오기까지",
    "시간과 노력이 필요했던 장보기"
];

export default function StepZero({ onNext }) {
    // Phase: 'cover' -> 'comparison' -> 'friction_loss' -> 'agent_awakening'
    const [phase, setPhase] = useState('cover');

    // Agent Awakening Phase State
    const [xRayMode, setXRayMode] = useState(false);
    const [insightRevealed, setInsightRevealed] = useState(false);

    // Past Era State
    const [pastStep, setPastStep] = useState(0);
    const [pastCompleted, setPastCompleted] = useState(false);

    // Present Era State
    const [presentUnlocked, setPresentUnlocked] = useState(false);
    const [presentPhase, setPresentPhase] = useState('idle'); // idle, ordering, delivered

    // Friction Loss Phase - Pop-up Game State
    const [showReflection, setShowReflection] = useState(false);
    const [closedPopups, setClosedPopups] = useState(0);
    const [gamePopups, setGamePopups] = useState([
        { id: 1, visible: false, x: '15%', y: '20%', text: '🎁 FREE GIFT!', bg: 'bg-pink-500' },
        { id: 2, visible: false, x: '70%', y: '15%', text: '⚡ FLASH SALE!', bg: 'bg-yellow-400 text-black' },
        { id: 3, visible: false, x: '20%', y: '65%', text: '🔥 HOT DEAL!', bg: 'bg-red-500' },
        { id: 4, visible: false, x: '75%', y: '60%', text: '💰 SAVE 90%!', bg: 'bg-green-500' },
        { id: 5, visible: false, x: '45%', y: '25%', text: '⏰ HURRY UP!', bg: 'bg-orange-500' },
    ]);
    const REQUIRED_CLOSES = 3;

    const handlePastStep = () => {
        if (pastStep < MARKET_SEQUENCE.length - 1) {
            setPastStep(prev => prev + 1);
        } else {
            setPastCompleted(true);
            setPresentUnlocked(true);
        }
    };

    const handlePresentOrder = () => {
        setPresentPhase('ordering');
        setTimeout(() => {
            setPresentPhase('delivered');
        }, 1000); // 1s delivery time
    };

    return (
        <motion.div
            className="w-full h-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <AnimatePresence mode="wait">

                {/* 1. COVER SCREEN */}
                {phase === 'cover' && (
                    <motion.div
                        key="cover"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                        className="flex flex-col items-center text-center z-10"
                    >
                        <div className="mb-8 p-8 border-2 border-cyan-500/30 bg-black/50 backdrop-blur-sm rounded-lg shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 mb-4">
                                DIGITAL<br />CONSUMER
                            </h1>
                            <p className="text-xl md:text-2xl font-ui text-gray-400 tracking-widest uppercase">
                                현명한 소비 생활의 시작
                            </p>
                        </div>

                        <motion.button
                            onClick={() => setPhase('comparison')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-cyan-500 text-black font-bold text-xl rounded shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:bg-cyan-400 transition-colors"
                        >
                            시작해보기
                        </motion.button>
                    </motion.div>
                )}

                {/* 2. COMPARISON SCREEN (Past vs Present) */}
                {phase === 'comparison' && (
                    <motion.div
                        key="comparison"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                    >
                        {/* LEFT: PAST (Slider Interaction) */}
                        <div className="flex flex-col gap-4">
                            <div className="text-center mb-2">
                                <h3 className="text-2xl font-bold text-gray-400">PAST</h3>
                                <p className="text-sm text-gray-500">직접 발로 뛰던 시절</p>
                            </div>

                            <HudContainer className="relative aspect-[4/3] w-full flex flex-col p-0 overflow-hidden border-gray-600">
                                {/* Image */}
                                <img
                                    src={MARKET_SEQUENCE[pastStep]}
                                    alt="Past Shopping"
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                />

                                {/* Step Overlay */}
                                <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 text-cyan-500 border border-cyan-500/50 font-code text-sm rounded">
                                    STEP {pastStep + 1} / {MARKET_SEQUENCE.length}
                                </div>

                                {/* Caption Overlay */}
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-12">
                                    <p className="text-xl text-white font-ui font-medium min-h-[3.5rem]">
                                        {ACTION_STEPS[pastStep]}
                                    </p>
                                </div>
                            </HudContainer>

                            {/* Custom Interactive Slider */}
                            <div className="w-full bg-black/40 p-6 rounded-xl border border-gray-800 backdrop-blur-sm relative select-none min-h-[180px] flex flex-col justify-center">
                                {/* Track */}
                                <div className="relative w-full h-12 flex items-center justify-center cursor-pointer"
                                    ref={(el) => {
                                        if (!el) return;
                                        // Store ref to calculate widths for drag constraints
                                        window.sliderTrack = el;
                                    }}
                                >
                                    {/* Base Line */}
                                    <div className="absolute w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                        {/* Progress Fill */}
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-cyan-900 via-cyan-500 to-white"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(pastStep / (MARKET_SEQUENCE.length - 1)) * 100}%` }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    </div>

                                    {/* Ticks */}
                                    <div className="absolute w-full flex justify-between px-1 pointer-events-none">
                                        {MARKET_SEQUENCE.map((_, idx) => (
                                            <div key={idx} className={`w-1 h-3 rounded-full transition-colors ${idx <= pastStep ? 'bg-cyan-300 shadow-[0_0_8px_rgba(0,243,255,0.8)]' : 'bg-gray-700'}`} />
                                        ))}
                                    </div>

                                    {/* Draggable Handle */}
                                    <div className="absolute inset-0 mx-[-12px]"> {/* Negative margin to align handle center to start/end */}
                                        <input
                                            type="range"
                                            min="0" // Changed min to 0
                                            max={MARKET_SEQUENCE.length - 1}
                                            step="1" // Explicit step
                                            value={pastStep}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                setPastStep(val);
                                                if (val === MARKET_SEQUENCE.length - 1) {
                                                    setPastCompleted(true);
                                                    setPresentUnlocked(true);
                                                }
                                            }}
                                            className="w-full h-full opacity-0 cursor-ew-resize z-20 absolute top-0 left-0" // Invisible input on top
                                        />

                                        {/* Visual Handle (Follows State) */}
                                        <motion.div
                                            className="absolute top-1/2 w-8 h-8 -mt-4 bg-black border-2 border-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,243,255,0.5)] flex items-center justify-center z-10 pointer-events-none"
                                            initial={{ left: '0%' }}
                                            animate={{ left: `${(pastStep / (MARKET_SEQUENCE.length - 1)) * 100}%` }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className="flex justify-between text-[10px] font-code text-cyan-500/50 mt-2 uppercase tracking-widest">
                                    <span>Start</span>
                                    <span>Market</span>
                                    <span>Finish</span>
                                </div>

                                <p className="text-center text-sm text-cyan-400 mt-2 font-bold animate-pulse">
                                    {pastCompleted ? "체험 완료!" : "DRAG TO EXPERIENCE >"}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: PRESENT (Modern Visuals) */}
                        <div className={`flex flex-col gap-4 transition-all duration-1000 ${presentUnlocked ? 'opacity-100' : 'opacity-30 blur-sm grayscale'}`}>
                            <div className="text-center mb-2">
                                <h3 className="text-2xl font-bold text-white">PRESENT</h3>
                                <p className="text-sm text-gray-400">터치 한 번으로 끝나는 마법</p>
                            </div>

                            <HudContainer className="relative aspect-[4/3] w-full flex flex-col p-0 overflow-hidden bg-white border-white/20">
                                {/* Image Switcher */}
                                <AnimatePresence mode="wait">
                                    {presentPhase === 'delivered' ? (
                                        <motion.div
                                            key="door"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="w-full h-full relative"
                                        >
                                            <img src={modernDoor} alt="Delivery Arrived" className="w-full h-full object-cover invert" />
                                            <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-4 py-2 rounded-full animate-bounce shadow-lg">
                                                문 앞 배송 완료!
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="bed"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="w-full h-full relative"
                                        >
                                            <img src={modernBed} alt="Ordering in Bed" className="w-full h-full object-cover invert" />
                                            {presentPhase === 'ordering' && (
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <div className="text-4xl animate-spin">⏳</div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Caption Overlay */}
                                <div className="absolute bottom-0 w-full bg-white/90 p-6 border-t border-gray-200">
                                    <p className="text-xl text-black font-ui font-bold">
                                        {presentPhase === 'idle' && "침대에 누워 스마트폰 켜기"}
                                        {presentPhase === 'ordering' && "결제 처리 중..."}
                                        {presentPhase === 'delivered' && "물건이 현관문 앞에 도착했습니다!"}
                                    </p>
                                </div>
                            </HudContainer>

                            {/* Present Action Control Panel */}
                            <div className="w-full bg-black/40 p-6 rounded-xl border border-gray-800 backdrop-blur-sm relative select-none min-h-[180px] flex flex-col justify-center items-center">
                                {presentUnlocked ? (
                                    presentPhase === 'delivered' ? (
                                        <button
                                            onClick={() => setPhase('friction_loss')}
                                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xl rounded shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-105 transition-transform"
                                        >
                                            달라진 소비 생활, 하지만 &rarr;
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handlePresentOrder}
                                            disabled={presentPhase === 'ordering'}
                                            className="w-full py-4 bg-black border-2 border-black text-white font-bold text-xl rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {presentPhase === 'ordering' ? '주문 처리 중...' : '👆 지금 즉시 결제하기 (Click)'}
                                        </button>
                                    )
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                                        <span className="text-3xl">🔒</span>
                                        <span className="text-sm font-code tracking-widest">LOCKED</span>
                                        <p className="text-xs text-center text-gray-600">PAST 미션 완료 시 잠금 해제</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 3. PHASE 2: VANISHING FRICTION */}
                {phase === 'friction_loss' && (
                    <motion.div
                        key="friction_loss"
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ perspective: '1000px' }}
                    >
                        {/* Dark Pattern Pop-ups - More & Bigger! */}

                        {/* Pop-up 1: Price Badge - TOP LEFT */}
                        <motion.div
                            className="absolute top-[10%] left-[5%] z-30"
                            initial={{ opacity: 0, scale: 0, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: -5 }}
                            transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
                        >
                            <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-black text-3xl shadow-2xl">
                                Only $5.99*
                            </div>
                        </motion.div>

                        {/* Pop-up 2: LAST CHANCE Starburst - TOP RIGHT */}
                        <motion.div
                            className="absolute top-[8%] right-[10%] z-30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                            transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
                        >
                            <div className="bg-black text-white px-10 py-10 font-black text-2xl text-center"
                                style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
                                LAST<br />CHANCE!
                            </div>
                        </motion.div>

                        {/* Pop-up 3: Social Proof - BOTTOM LEFT */}
                        <motion.div
                            className="absolute bottom-[15%] left-[5%] z-30"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.4 }}
                        >
                            <div className="bg-white text-black p-6 rounded-xl shadow-2xl">
                                <div className="text-5xl font-black">756</div>
                                <div className="text-lg text-gray-600">Items sold this hour!</div>
                                <button className="mt-3 w-full bg-black text-white py-3 font-bold text-lg rounded">BUY NOW</button>
                            </div>
                        </motion.div>

                        {/* Pop-up 4: Timer - BOTTOM RIGHT */}
                        <motion.div
                            className="absolute bottom-[12%] right-[5%] z-30"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.4 }}
                        >
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-2xl">
                                <div className="text-sm font-bold text-yellow-200">⏰ LIMITED TIME:</div>
                                <div className="text-4xl font-black">21:39:23</div>
                                <button className="mt-3 w-full bg-black text-white py-3 font-bold text-lg rounded">GET 10% OFF</button>
                            </div>
                        </motion.div>

                        {/* Pop-up 5: You Won - LEFT CENTER */}
                        <motion.div
                            className="absolute top-[30%] left-[3%] z-30"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.8, duration: 0.3, type: "spring" }}
                        >
                            <div className="bg-blue-600 text-white p-5 rounded-xl shadow-2xl border-4 border-yellow-400">
                                <div className="text-2xl">😊 😊 😊</div>
                                <div className="text-3xl font-black">YOU WON!!</div>
                                <div className="text-yellow-300 text-2xl font-black">$100,000,000</div>
                                <button className="mt-3 bg-black text-white px-6 py-2 font-bold rounded">CLICK HERE</button>
                            </div>
                        </motion.div>

                        {/* Pop-up 6: Visitor Badge - RIGHT CENTER */}
                        <motion.div
                            className="absolute top-[25%] right-[3%] z-30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.1, duration: 0.3 }}
                        >
                            <div className="bg-cyan-400 text-black px-6 py-4 rounded-2xl font-bold text-xl shadow-2xl">
                                🎉 You are the<br /><span className="text-3xl font-black">10,000th visitor!</span>
                            </div>
                        </motion.div>

                        {/* Pop-up 7: Don't Miss Out Badge */}
                        <motion.div
                            className="absolute top-[18%] left-[25%] z-30"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.4, duration: 0.3 }}
                        >
                            <div className="bg-green-500 text-white px-5 py-3 rounded-lg font-black text-xl shadow-xl">
                                Don't miss out!
                            </div>
                        </motion.div>

                        {/* Pop-up 8: The Best Offer */}
                        <motion.div
                            className="absolute top-[15%] right-[30%] z-30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.7, duration: 0.3, type: "spring" }}
                        >
                            <div className="bg-pink-500 text-white px-5 py-3 rounded-lg font-black text-xl shadow-xl">
                                ✨ The best offer!
                            </div>
                        </motion.div>

                        {/* Pop-up 9: Friend Invite */}
                        <motion.div
                            className="absolute bottom-[35%] right-[20%] z-30"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 3, duration: 0.4 }}
                        >
                            <div className="bg-green-400 text-black p-5 rounded-xl shadow-2xl">
                                <div className="text-lg font-bold">Your friend invited you</div>
                                <div className="text-sm text-gray-700">and 10K others to join us!</div>
                                <button className="mt-3 w-full bg-cyan-500 text-white py-2 font-bold rounded">JOIN US</button>
                            </div>
                        </motion.div>

                        {/* Pop-up 10: Only $8.99 */}
                        <motion.div
                            className="absolute top-[5%] right-[45%] z-30"
                            initial={{ opacity: 0, rotate: 15 }}
                            animate={{ opacity: 1, rotate: 10 }}
                            transition={{ delay: 3.3, duration: 0.3 }}
                        >
                            <div className="bg-yellow-300 text-black px-5 py-2 rounded-full font-black text-2xl shadow-xl">
                                Only $8.99
                            </div>
                        </motion.div>

                        {/* Pop-up 11: Shame Button Modal */}
                        <motion.div
                            className="absolute bottom-[30%] left-[25%] z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.6, duration: 0.4 }}
                        >
                            <div className="bg-white text-black p-4 rounded-lg shadow-2xl text-center">
                                <button className="w-full bg-pink-500 text-white py-3 px-6 font-bold text-lg rounded mb-2">GET 10% OFF</button>
                                <div className="text-gray-500 text-sm underline cursor-pointer">No, I Don't Want to Save Money.</div>
                            </div>
                        </motion.div>

                        {/* Pop-up 12: Only $1.99 */}
                        <motion.div
                            className="absolute bottom-[8%] left-[30%] z-30"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.9, duration: 0.3 }}
                        >
                            <div className="bg-yellow-400 text-black px-5 py-2 rounded-full font-black text-2xl shadow-xl">
                                Only $1.99*
                            </div>
                        </motion.div>

                        {/* SCROLLING MARQUEE BANNER - Fixed full width */}
                        <motion.div
                            className="absolute top-[48%] left-0 w-[200vw] z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            style={{ marginLeft: '-50vw' }}
                        >
                            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 py-5 -rotate-2">
                                <motion.div
                                    className="whitespace-nowrap flex"
                                    animate={{ x: [0, -2000] }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                >
                                    <span className="text-5xl font-black text-white tracking-wider mx-4">
                                        🔥 DON'T MISS OUT! — LIMITED TIME OFFER — ACT NOW — HURRY UP — DON'T MISS OUT! — LIMITED TIME OFFER — ACT NOW — HURRY UP — DON'T MISS OUT! — LIMITED TIME OFFER — ACT NOW — HURRY UP — DON'T MISS OUT! — LIMITED TIME OFFER —
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* All pop-ups fade out */}
                        <motion.div
                            className="absolute inset-0 bg-black z-40 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 0, 0, 1] }}
                            transition={{ duration: 10, times: [0, 0.5, 0.7, 0.9, 1] }}
                            onAnimationComplete={() => {
                                setShowReflection(true);
                                // Start showing game popups one by one
                                gamePopups.forEach((popup, index) => {
                                    setTimeout(() => {
                                        setGamePopups(prev => prev.map(p =>
                                            p.id === popup.id ? { ...p, visible: true } : p
                                        ));
                                    }, 500 + (index * 800));
                                });
                            }}
                        />

                        {/* REFLECTION QUESTION with CIRCULAR GAUGE */}
                        {showReflection && closedPopups < REQUIRED_CLOSES && (
                            <motion.div
                                className="absolute z-45 text-center px-8 flex flex-col items-center"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            >
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                                    편리하지만...<br />
                                    <span className="text-cyan-400">무엇을 놓치고 있는 걸까요?</span>
                                </h2>

                                {/* CIRCULAR GAUGE */}
                                <div className="relative w-32 h-32 mb-4">
                                    {/* Background circle */}
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#1f2937"
                                            strokeWidth="8"
                                        />
                                        {/* Progress circle */}
                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="url(#gaugeGradient)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 45}`}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                                            animate={{
                                                strokeDashoffset: 2 * Math.PI * 45 * (1 - closedPopups / REQUIRED_CLOSES),
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            style={{
                                                filter: closedPopups > 0 ? 'drop-shadow(0 0 10px #06b6d4)' : 'none'
                                            }}
                                        />
                                        <defs>
                                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#06b6d4" />
                                                <stop offset="100%" stopColor="#22d3ee" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Percentage text */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.span
                                            className="text-2xl font-black text-cyan-400"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                textShadow: closedPopups > 0 ? ['0 0 0px #06b6d4', '0 0 20px #06b6d4', '0 0 10px #06b6d4'] : 'none'
                                            }}
                                            transition={{ duration: 0.3 }}
                                            key={closedPopups}
                                        >
                                            {Math.round(closedPopups / REQUIRED_CLOSES * 100)}%
                                        </motion.span>
                                    </div>

                                    {/* Glow effect when progress made */}
                                    {closedPopups > 0 && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full"
                                            initial={{ opacity: 0, scale: 1 }}
                                            animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
                                            transition={{ duration: 0.5 }}
                                            style={{
                                                background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)'
                                            }}
                                            key={`glow-${closedPopups}`}
                                        />
                                    )}
                                </div>


                            </motion.div>
                        )}

                        {/* HINT POPUP - Center, closeable, appears after delay */}
                        {showReflection && closedPopups === 0 && (
                            <motion.div
                                className="absolute z-50 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2, type: "spring", duration: 0.5 }}
                            >
                                <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-2xl text-center">
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="text-white text-lg">💡 팝업이 시야를 가리네요...</span>
                                        <button
                                            onClick={() => setClosedPopups(prev => prev + 1)}
                                            className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-2">닫아서 메시지를 확인하세요</p>
                                </div>
                            </motion.div>
                        )}

                        {/* POP-UP CLOSING GAME - Interactive popups appear over the message */}
                        {showReflection && closedPopups < REQUIRED_CLOSES && gamePopups.map((popup) => (
                            popup.visible && (
                                <motion.div
                                    key={popup.id}
                                    className={`absolute z-50 ${popup.bg} p-6 rounded-xl shadow-2xl cursor-pointer`}
                                    style={{ left: popup.x, top: popup.y }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: "spring", duration: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl font-black">{popup.text}</span>
                                        <button
                                            onClick={() => {
                                                setGamePopups(prev => prev.map(p =>
                                                    p.id === popup.id ? { ...p, visible: false } : p
                                                ));
                                                setClosedPopups(prev => prev + 1);
                                            }}
                                            className="w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="mt-2 text-sm opacity-80">
                                        Click here to claim!
                                    </div>
                                </motion.div>
                            )
                        ))}

                        {/* KEY MESSAGE - Appears after closing enough popups */}
                        {closedPopups >= REQUIRED_CLOSES && (
                            <>
                                {/* EXPLOSION EFFECT */}
                                <motion.div
                                    className="absolute z-45 pointer-events-none"
                                    initial={{ opacity: 1, scale: 0 }}
                                    animate={{ opacity: [1, 1, 0], scale: [0, 2, 3] }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <div
                                        className="w-64 h-64 rounded-full"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.3) 40%, transparent 70%)'
                                        }}
                                    />
                                </motion.div>

                                {/* Burst particles */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute z-45 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none"
                                        initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                        animate={{
                                            opacity: 0,
                                            scale: 0,
                                            x: Math.cos(i * Math.PI / 4) * 200,
                                            y: Math.sin(i * Math.PI / 4) * 200
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                ))}

                                {/* Screen flash */}
                                <motion.div
                                    className="absolute inset-0 bg-cyan-500 z-44 pointer-events-none"
                                    initial={{ opacity: 0.8 }}
                                    animate={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Key Message */}
                                <motion.div
                                    className="absolute z-50 text-center"
                                    initial={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                                >
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
                                        불편함이 사라진 자리에,<br />
                                        <span className="text-cyan-400">'신중함'</span>도 사라졌습니다.
                                    </h2>
                                    <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
                                        우리에게 필요한 건 바로, <span className="text-white border-b-2 border-cyan-500 pb-1 font-bold">생각할 시간</span>
                                    </p>

                                    <motion.button
                                        onClick={() => setPhase('agent_awakening')}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5, duration: 0.5 }}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,243,255,0.5)' }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-5 bg-white text-black font-black text-2xl rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-cyan-50 transition-all uppercase tracking-widest"
                                    >
                                        CONTINUE &rarr;
                                    </motion.button>
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                )}

                {/* 4. PHASE 3: AGENT AWAKENING */}
                {phase === 'agent_awakening' && (
                    <motion.div
                        key="agent_awakening"
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onMouseMove={(e) => {
                            // Update mouse position for X-Ray effect
                            const x = e.clientX;
                            const y = e.clientY;
                            document.documentElement.style.setProperty('--cursor-x', `${x}px`);
                            document.documentElement.style.setProperty('--cursor-y', `${y}px`);
                        }}
                    >
                        {/* Title - Always visible until insight revealed */}
                        {!insightRevealed && (
                            <motion.div
                                className="absolute top-8 left-8 z-10 pointer-events-none"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="text-cyan-400 text-sm font-mono tracking-widest mb-1">PHASE 3</div>
                                <div className="text-white text-2xl font-black">AGENT AWAKENING</div>
                                <div className="text-gray-500 text-sm">요원의 각성</div>
                            </motion.div>
                        )}

                        {/* Main Message Before X-Ray */}
                        {!xRayMode && !insightRevealed && (
                            <motion.div
                                className="text-center z-20 relative"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            >
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    보이지 않는 설계를<br />
                                    <span className="text-cyan-400">꿰뚫어 볼 눈</span>이 필요합니다.
                                </h2>
                                <p className="text-gray-400 text-lg mb-10">
                                    화려한 UI 뒤에 숨겨진 의도를 확인해보세요.
                                </p>
                                <motion.button
                                    onClick={() => setXRayMode(true)}
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-red-600 text-white font-black text-xl rounded-sm shadow-lg uppercase tracking-widest"
                                >
                                    🔍 INVESTIGATE (수사 개시)
                                </motion.button>
                            </motion.div>
                        )}

                        {/* X-RAY MODE - Interactive Lens Effect */}
                        {xRayMode && !insightRevealed && (
                            <>
                                {/* Background Grid */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                    style={{
                                        backgroundImage: 'linear-gradient(rgba(0,243,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.1) 1px, transparent 1px)',
                                        backgroundSize: '40px 40px'
                                    }}
                                />

                                {/* X-Ray Header */}
                                <motion.div
                                    className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center gap-3 bg-red-900/50 px-6 py-3 rounded-full border border-red-500 backdrop-blur-md">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-red-400 font-mono text-sm tracking-wider">X-RAY MODE ACTIVE</span>
                                    </div>
                                    <div className="text-center mt-2 text-gray-400 text-xs">
                                        마우스를 움직여 숨겨진 의도를 찾아보세요
                                    </div>
                                </motion.div>

                                {/* Central Content Container - Korean Commerce Style */}
                                <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">

                                    {/* LAYER 1: Beautiful UI (Bottom Layer) */}
                                    <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none opacity-50 blur-[2px] scale-95 transition-all duration-500">
                                        {/* This is a ghost decorative layer to fill space if needed, mainly we focus on the central card below */}
                                    </div>

                                    {/* THE NOTORIOUS CARD - Beautiful Version (Always Visible) */}
                                    <div className="relative z-10 w-[400px] bg-white rounded-3xl overflow-hidden shadow-2xl">
                                        {/* Header Image Area */}
                                        <div className="h-48 bg-gray-200 relative">
                                            <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm animate-bounce">
                                                마감임박
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                                <span>👀</span> 1,204명이 보는 중
                                            </div>
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 text-6xl">
                                                🎁
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">프리미엄 미스테리 박스</h3>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-red-500 font-black text-2xl">9,900원</span>
                                                    <span className="text-gray-400 text-sm line-through">100,000원</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mb-6">
                                                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                                                    ⚡ 90% 할인
                                                </span>
                                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                                                    🚀 오늘 도착
                                                </span>
                                            </div>

                                            {/* Timer */}
                                            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4 flex justify-between items-center">
                                                <span className="text-red-800 text-sm font-bold">남은 시간</span>
                                                <span className="text-red-600 font-mono font-black text-lg">00:09:59</span>
                                            </div>

                                            {/* Checkbox option */}
                                            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">✓</div>
                                                <div className="text-sm text-gray-700">
                                                    <span className="font-bold">안심 케어 서비스</span> (월 4,900원)
                                                </div>
                                            </div>

                                            {/* Purchase Button */}
                                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-4 rounded-xl shadow-lg transform active:scale-95 transition-transform text-lg">
                                                지금 구매하기
                                            </button>
                                            <div className="text-center mt-3 text-gray-400 text-xs">
                                                품절 시 재입고 예정 없음
                                            </div>
                                        </div>
                                    </div>


                                    {/* LAYER 2: Wireframe/Intent Version (Masked Reveal) */}
                                    {/* This layer sits ON TOP but is usually invisible. It is revealed by the mask. */}
                                    <div
                                        className="absolute z-20 w-[400px] bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.5)] border-2 border-red-500"
                                        style={{
                                            // The core magic: Reveal this layer only around the cursor
                                            maskImage: 'radial-gradient(circle 120px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)',
                                            WebkitMaskImage: 'radial-gradient(circle 120px at var(--cursor-x) calc(var(--cursor-y) - 50px), black 0%, transparent 100%)', // Offset adjustment might be needed depending on container
                                            // Note: Since this is fixed centered, mapped coordinates might be tricky.
                                            // Let's use a simpler fixed overlay approach if possible or stick to global coordinates mapping.
                                            // To make it robust, let's use global fixed positioning for the mask or simpler: 
                                            // Actually, since this element is centered, the mask coordinates need to be relative to the element.
                                            // But standard tracking gives clientX/Y. 
                                            // A fixed overlay approach is safer.
                                        }}
                                    >
                                        {/* To ensure coordinates match perfectly, let's just duplicate the structure but with different styling */}
                                        {/* BUT wait, mask-image coordinates are relative to the element. 
                                           So we need to subtract the element's bounding rect from clientX/Y.
                                           OR simplified approach: Use a full-screen overlay that contains the wireframe card in the EXACT same position.
                                        */}
                                    </div>

                                    {/* Let's try the Fullscreen Overlay approach for perfect alignment without complex math */}
                                    <div
                                        className="fixed inset-0 z-40  pointer-events-none flex items-center justify-center pt-14"
                                        style={{
                                            maskImage: 'radial-gradient(circle 150px at var(--cursor-x) var(--cursor-y), black 30%, transparent 100%)',
                                            WebkitMaskImage: 'radial-gradient(circle 150px at var(--cursor-x) var(--cursor-y), black 30%, transparent 100%)',
                                        }}
                                    >
                                        <div className="w-[400px] bg-black rounded-3xl overflow-hidden border-2 border-red-500 relative">
                                            {/* Wireframe Header */}
                                            <div className="h-48 bg-gray-900 relative border-b border-red-900/50">

                                                {/* Hidden Intent 1 */}
                                                <div className="absolute top-4 left-4 border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm font-mono bg-red-900/20">
                                                    ⚠️ [가짜 희소성]
                                                </div>

                                                {/* Hidden Intent 2 */}
                                                <div className="absolute bottom-4 right-4 border border-red-500 text-red-500 px-2 py-1 rounded text-xs flex items-center gap-1 font-mono bg-red-900/20">
                                                    ⚠️ [소셜 프루프 압박]
                                                </div>

                                                <div className="w-full h-full flex items-center justify-center text-red-900 text-6xl opacity-20">
                                                    👁️
                                                </div>

                                                {/* Grid lines */}
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
                                            </div>

                                            {/* Wireframe Content */}
                                            <div className="p-6 relative">
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="text-gray-500 font-mono text-sm">[상품명 텍스트]</div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-red-500 font-mono text-sm">⚠️ [앵커링 가격]</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 mb-6">
                                                    <span className="border border-dashed border-red-500/50 text-red-400 text-xs font-mono px-2 py-1 rounded">
                                                        [과장된 할인율]
                                                    </span>
                                                </div>

                                                {/* Hidden Intent 3: Timer */}
                                                <div className="border border-red-500 bg-red-900/20 rounded-lg p-3 mb-4 flex justify-between items-center relative overflow-hidden">
                                                    <span className="text-red-400 text-sm font-mono">⚠️ 불안감 조성 타이머</span>
                                                    <span className="text-red-500 font-mono text-lg">LOOP:INFINITE</span>
                                                </div>

                                                {/* Hidden Intent 4: Checkbox */}
                                                <div className="flex items-center gap-3 mb-6 p-3 border border-red-500/50 rounded-lg bg-red-900/10">
                                                    <div className="w-5 h-5 border border-red-500 flex items-center justify-center text-red-500 text-xs">V</div>
                                                    <div className="text-sm text-red-400 font-mono">
                                                        ⚠️ [다크 패턴: 프리 셀렉션]
                                                        <br /><span className="text-xs text-gray-500">부주의한 결제 유도</span>
                                                    </div>
                                                </div>

                                                {/* Hidden Intent 5: Button */}
                                                <div className="w-full border-2 border-red-500 text-red-500 font-mono py-4 rounded-xl text-center bg-red-900/20 relative shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                                                    ⚠️ [충동적 행동 유도 장치]
                                                </div>
                                                <div className="text-center mt-3 text-red-900/50 text-xs font-mono">
                                                    [손실 회피 심리 자극 문구]
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Flashlight Glow Effect (Follows cursor) */}
                                <div
                                    className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
                                    style={{
                                        background: 'radial-gradient(circle 150px at var(--cursor-x) var(--cursor-y), rgba(0,255,255,0.15), transparent 70%)',
                                    }}
                                />

                                {/* X-Ray Ring UI */}
                                <div
                                    className="fixed pointer-events-none z-[60] w-[300px] h-[300px] border border-cyan-500/30 rounded-full"
                                    style={{
                                        left: 'var(--cursor-x)',
                                        top: 'var(--cursor-y)',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: '0 0 20px rgba(0, 243, 255, 0.1), inset 0 0 20px rgba(0, 243, 255, 0.1)'
                                    }}
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-cyan-500 text-[10px] font-mono px-2">X-RAY LENS</div>
                                    <div className="absolute inset-0 border-[20px] border-cyan-500/5 rounded-full" />
                                    {/* Crosshair */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-cyan-500/50" />
                                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-cyan-500/50" />
                                    </div>
                                </div>


                                {/* Insight Acquired Button - Appears after delay or interaction */}
                                <motion.div
                                    className="absolute bottom-[10%] z-40"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 3 }}
                                >
                                    <button
                                        onClick={() => setInsightRevealed(true)}
                                        className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all duration-300 backdrop-blur-md border border-cyan-500/50" />
                                        <div className="relative flex items-center gap-2">
                                            <span className="text-cyan-400 font-black text-xl tracking-widest uppercase group-hover:text-white transition-colors">
                                                Insight Acquired
                                            </span>
                                            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">✓</div>
                                        </div>
                                    </button>
                                </motion.div>
                            </>
                        )}

                        {/* Final Message - Digital Insight */}
                        {insightRevealed && (
                            <motion.div
                                className="text-center z-30 px-8"
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1 }}
                            >
                                <motion.div
                                    className="text-cyan-400 text-lg font-mono tracking-widest mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    [ DIGITAL INSIGHT ACTIVATED ]
                                </motion.div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                                    편리함의 흐름에 휩쓸리지 않으려면,<br />
                                    설계된 의도를 파악하는<br />
                                    <span className="text-cyan-400">'디지털 통찰력'</span>이 필요합니다.
                                </h2>
                                <motion.p
                                    className="text-gray-400 text-xl md:text-2xl mb-12"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    준비되셨습니까?
                                </motion.p>

                                <motion.button
                                    onClick={() => onNext()}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,243,255,0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-5 bg-white text-black font-black text-2xl rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-cyan-50 transition-all uppercase tracking-widest"
                                >
                                    MISSION START &rarr;
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}



