import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';
import HudContainer from './HudContainer';

// Import Modern Images
import modernBed from '../assets/modern_bed.png';
import modernDoor from '../assets/modern_door.png';

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
    // Phase: 'cover' -> 'comparison' -> 'reflection' -> 'mission_start'
    const [phase, setPhase] = useState('cover');

    // Past Era State
    const [pastStep, setPastStep] = useState(0);
    const [pastCompleted, setPastCompleted] = useState(false);

    // Present Era State
    const [presentUnlocked, setPresentUnlocked] = useState(false);
    const [presentPhase, setPresentPhase] = useState('idle'); // idle, ordering, delivered

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
            className="w-full h-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4"
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
                                현명한 소비 생활의 시작과 끝
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
                                            onClick={() => onNext()}
                                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xl rounded shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-105 transition-transform"
                                        >
                                            다음 단계로 넘어가기 &rarr;
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
            </AnimatePresence>
        </motion.div>
    );
}
