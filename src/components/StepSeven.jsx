import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';
import HudContainer from './HudContainer';

// --- ASSETS & DATA ---
import basketImg from '../assets/장바구니.png';
import walletImg from '../assets/지갑.png';
import calcImg from '../assets/계산기.png';
import safeImg from '../assets/금고.png';
import mapImg from '../assets/지도.png';
import headphoneImg from '../assets/헤드폰.png';

import rocketImg from '../assets/로켓배송.png';
import payImg from '../assets/페이.png';
import securityImg from '../assets/휴대폰 보안.png';
import naviImg from '../assets/네비게이션.png';
import smartphoneIcon from '../assets/스마트폰.png';
import musicImg from '../assets/음악앱.png';

const ARTIFACTS = [
    {
        id: 'basket',
        icon: basketImg,
        label: '장바구니',
        pastDesc: '직접 물건을 담고 집으로 이동',
        appIcon: rocketImg,
        appName: '새벽배송',
        futureDesc: '터치로 주문하고 새벽에 받는 혁신',
        color: 'bg-blue-600'
    },
    {
        id: 'wallet',
        icon: walletImg,
        label: '지갑',
        pastDesc: '현금과 카드로 두툼해진 지갑 소지',
        appIcon: payImg,
        appName: '간편결제',
        futureDesc: '폰 하나로 모든 인증과 결제 완료',
        color: 'bg-yellow-400'
    },
    {
        id: 'calculator',
        icon: calcImg,
        label: '계산기',
        pastDesc: '복잡한 수식을 직접 입력',
        appIcon: smartphoneIcon,
        appName: '스마트 계산',
        futureDesc: '조금 더 복잡하고 빠른 계산을 쉽게',
        color: 'bg-gray-500'
    },
    {
        id: 'safe',
        icon: safeImg,
        label: '금고',
        pastDesc: '물리적 공간에 자산 보관',
        appIcon: securityImg,
        appName: '클라우드',
        futureDesc: '암호화된 가상 공간에 영구 저장',
        color: 'bg-indigo-600'
    },
    {
        id: 'map',
        icon: mapImg,
        label: '종이 지도',
        pastDesc: '종이로 된 지도로 주기적으로 길을 확인',
        appIcon: naviImg,
        appName: '네비게이션',
        futureDesc: '실시간 교통정보 기반 최적 경로',
        color: 'bg-green-500'
    },
    {
        id: 'music',
        icon: headphoneImg,
        label: '헤드폰',
        pastDesc: 'LP와 CD로 즐기는 저장된 음악',
        appIcon: musicImg,
        appName: '스트리밍',
        futureDesc: '전 세계 모든 음악을 실시간 감상',
        color: 'bg-pink-500'
    },
];

const QUIZ_DATA = [
    { id: 1, text: "Button Color", category: "UI", hint: "Visual Element" },
    { id: 2, text: "User Satisfaction", category: "UX", hint: "Emotional Response" },
    { id: 3, text: "Page Layout", category: "UI", hint: "Structural Design" },
    { id: 4, text: "Load Time", category: "UX", hint: "Performance Feel" },
    { id: 5, text: "Icon Shape", category: "UI", hint: "Graphical Asset" },
];

// --- COMPONENTS ---

// 1. STAGE 1: DIGITAL TRANSFORMATION (Agent Desk Theme)
const StageOne = ({ onComplete }) => {
    const [digitized, setDigitized] = useState([]);
    const [infoModalItem, setInfoModalItem] = useState(null); // Used for the modal explanation
    const constraintsRef = useRef(null);

    const handleDragEnd = (event, info, item) => {
        // Drop on Phone Logic
        const dropZone = document.getElementById('phone-screen-area');
        if (dropZone) {
            const rect = dropZone.getBoundingClientRect();
            const x = event.clientX || info.point.x;
            const y = event.clientY || info.point.y;

            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                if (!digitized.includes(item.id)) {
                    // 1. Mark as digitized
                    setDigitized(prev => [...prev, item.id]);
                    if (navigator.vibrate) navigator.vibrate(50);

                    // 2. Open Explanation Modal
                    setInfoModalItem(item);
                }
            }
        }
    };

    const handleCloseModal = () => {
        setInfoModalItem(null);
    };

    useEffect(() => {
        // Only complete if all digitized AND modal is closed
        if (digitized.length === ARTIFACTS.length && !infoModalItem) {
            setTimeout(onComplete, 1500);
        }
    }, [digitized, infoModalItem, onComplete]);

    return (
        <div className="w-full h-full relative bg-slate-950 flex overflow-hidden font-sans text-cyan-500" ref={constraintsRef}>
            {/* AGENT BACKGROUND GRID */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-0 pointer-events-none" />

            {/* TOP HEADER - MISSION BRIEFING */}
            <div className="absolute top-0 left-0 right-0 p-10 z-10 select-none pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col items-start gap-6">
                        <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            STAGE 1: DIGITAL TRANSFORMATION
                        </h1>

                        <div className="flex flex-col gap-3 ml-2">
                            <div className="inline-flex items-center gap-3 text-lg text-cyan-300 font-bold bg-cyan-950/60 px-6 py-3 rounded-lg border border-cyan-400/30 backdrop-blur-sm shadow-lg w-fit">
                                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                                MISSION: 아날로그와 디지털 연결
                            </div>
                            <p className="text-base text-gray-300 max-w-xl leading-relaxed border-l-4 border-cyan-500 pl-6 py-2 bg-gradient-to-r from-cyan-900/20 to-transparent">
                                "과거의 <strong className="text-white">아날로그 방식</strong>을 스마트폰에 있는 <strong className="text-cyan-400">대응하는 앱 아이콘</strong>으로 드래그하여 변환하십시오."
                            </p>
                        </div>
                    </div>
                    <div className="text-right hidden xl:block opacity-70">
                        <div className="text-sm font-bold mb-1 text-cyan-600">SECURE CONNECTION</div>
                        <div className="text-5xl font-mono text-white tracking-widest">{digitized.length} <span className="text-2xl text-gray-500">/ {ARTIFACTS.length}</span></div>
                        <div className="text-xs tracking-[0.3em] text-cyan-400 mt-1">ARTIFACTS PROCESSED</div>
                    </div>
                </div>
            </div>

            {/* ANALYSIS INFO MODAL (BLOCKING) */}
            <AnimatePresence>
                {infoModalItem && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Side Panel Modal */}
                        <motion.div
                            initial={{ x: -450, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -450, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute left-0 top-40 bottom-20 w-[450px] bg-black/90 border-r-2 border-cyan-500 p-10 z-50 text-cyan-50 shadow-[0_0_100px_rgba(6,182,212,0.3)] flex flex-col justify-between"
                        >
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                <div className="flex items-center justify-between mb-6 border-b-2 border-cyan-500/30 pb-4">
                                    <span className="text-sm font-bold tracking-[0.2em] text-cyan-400 animate-pulse">ANALYSIS COMPLETE</span>
                                    <span className="text-xs bg-cyan-900 text-cyan-300 px-3 py-1 rounded font-mono">CODE: {infoModalItem.id.toUpperCase()}</span>
                                </div>

                                {/* PAST SECTION */}
                                <div className="mb-6 relative group">
                                    <h3 className="text-lg font-bold text-gray-400 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-gray-500 rounded-sm" /> 과거 (Legacy)
                                    </h3>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-2 grayscale opacity-60 shrink-0">
                                            <img src={infoModalItem.icon} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-300 mb-1">{infoModalItem.label}</div>
                                            <div className="text-sm text-gray-500 leading-snug break-keep">{infoModalItem.pastDesc}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* TRANSITION GRAPHIC */}
                                <div className="flex flex-col items-center justify-center mb-6 opacity-80 gap-1">
                                    <div className="text-cyan-500 text-xl">⬇</div>
                                    <div className="text-cyan-400 text-[10px] font-bold tracking-widest border border-cyan-500/50 px-3 py-0.5 rounded-full">DIGITAL EVOLUTION</div>
                                </div>

                                {/* FUTURE SECTION */}
                                <div className="relative mb-4">
                                    <h3 className="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-sm animate-pulse" /> 현재 (Digital)
                                    </h3>
                                    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-cyan-950/60 to-black border border-cyan-500/50 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                                        <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center p-0 border border-cyan-500/30 shadow-lg shrink-0">
                                            <img src={infoModalItem.appIcon} className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-cyan-100 mb-1">{infoModalItem.appName}</div>
                                            <div className="text-sm text-cyan-200/90 leading-snug break-keep font-medium">{infoModalItem.futureDesc}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CLOSE BUTTON */}
                            <button
                                onClick={handleCloseModal}
                                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg tracking-widest text-sm transition-all shadow-lg hover:shadow-cyan-500/50 border border-cyan-300/30 flex items-center justify-center gap-2 group"
                            >
                                <span>CONFIRM & CLOSE</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* CENTRAL WORKSPACE */}
            <div className="flex-1 relative flex items-center justify-center pt-20">

                {/* DECORATIVE RINGS (Targeting) */}
                <div className="absolute w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
                <div className="absolute w-[500px] h-[500px] border border-dashed border-cyan-500/15 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

                {/* DEVICE CONTAINER (Reduced Size) */}
                <motion.div
                    id="phone-target"
                    animate={{ scale: digitized.length === ARTIFACTS.length ? 1.05 : 1 }}
                    className="relative w-[320px] h-[650px] z-20 select-none bg-black rounded-[3rem] border-[6px] border-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
                >
                    {/* Device Screen */}
                    <div id="phone-screen-area" className="w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden relative flex flex-col border border-gray-700">
                        {/* Dynamic Island */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-50 flex items-center justify-center z-50 border-b border-white/5">
                            <div className="w-20 h-4 bg-[#0a0a0a] rounded-full" />
                        </div>

                        {/* Status Bar */}
                        <div className="h-14 w-full flex justify-between px-6 items-end pb-3 text-[10px] text-white/60 font-medium z-40 bg-gradient-to-b from-black/80 to-transparent">
                            <span>AGENT_NET</span>
                            <div className="flex gap-1.5 align-middle items-center">
                                <span>100%</span>
                                <div className="w-4 h-2 border border-white/30 rounded-sm relative"><div className="absolute inset-0.5 bg-white/80 rounded-xs w-[80%]" /></div>
                            </div>
                        </div>

                        {/* Wallpaper */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_80%)] z-0" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0 mix-blend-overlay" />

                        {/* App Grid - Targets */}
                        <div className="relative z-10 flex-1 p-5 grid grid-cols-2 gap-4 content-start pt-16 place-items-center">
                            {ARTIFACTS.map(item => {
                                const isDigitized = digitized.includes(item.id);
                                return (
                                    <div key={item.id} className="flex flex-col items-center gap-2 w-20">
                                        <div className="relative w-16 h-16">
                                            {/* Placeholder (Empty Slot) */}
                                            <div className={`absolute inset-0 rounded-[1.2rem] border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center transition-opacity duration-300 ${isDigitized ? 'opacity-0' : 'opacity-100'}`}>
                                                <div className="text-[9px] text-white/20 font-mono text-center leading-tight p-1">
                                                    APP<br />SLOT
                                                </div>
                                            </div>

                                            {/* Actual Digital App (Appears upon Success) */}
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{
                                                    scale: isDigitized ? 1 : 0.8,
                                                    opacity: isDigitized ? 1 : 0
                                                }}
                                                className="w-full h-full rounded-[1.2rem] bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden border border-white/5 absolute inset-0 z-10"
                                            >
                                                <img src={item.appIcon} className="w-full h-full object-cover" />
                                            </motion.div>
                                        </div>

                                        {/* App Name */}
                                        <span className={`text-[10px] text-gray-400 font-medium tracking-tight drop-shadow-md transition-colors ${isDigitized ? 'text-white opacity-100' : 'text-gray-600 opacity-50'}`}>
                                            {item.appName}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Dock */}
                        <div className="relative z-10 h-20 mx-4 mb-5 bg-white/5 backdrop-blur-xl rounded-[2rem] flex justify-around items-center px-2 border border-white/5 shadow-lg">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-2xl bg-gray-800/40 border border-white/5" />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* SCATTERED ARTIFACTS */}
                {ARTIFACTS.map((item, i) => {
                    if (digitized.includes(item.id)) return null;

                    const positions = [
                        // Left Side
                        { top: '20%', left: '8%', rotate: -15 },  // Top Left
                        { top: '48%', left: '5%', rotate: 10 },   // Mid Left
                        { bottom: '15%', left: '8%', rotate: 25 }, // Bottom Left

                        // Right Side
                        { top: '20%', right: '8%', rotate: 15 },  // Top Right
                        { top: '48%', right: '5%', rotate: -10 }, // Mid Right
                        { bottom: '15%', right: '8%', rotate: -25 } // Bottom Right
                    ];
                    const pos = positions[i] || { top: '50%', left: '50%' };

                    return (
                        <motion.div
                            key={item.id}
                            drag={!infoModalItem} // Disable drag if modal is open
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                            whileHover={{ scale: 1.15, cursor: 'grab', zIndex: 100 }}
                            whileDrag={{ scale: 1.25, cursor: 'grabbing', zIndex: 100 }}
                            initial={pos}
                            className={`absolute flex flex-col items-center justify-center w-40 h-40 group z-30 transition-opacity ${infoModalItem ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
                        >
                            <div className="w-36 h-36 relative flex items-center justify-center">
                                {/* Glowing Selection Ring on Hover */}
                                <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-2"
                                />

                                {/* Label Tag */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-cyan-300 text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none font-bold tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0">
                                    DETECTED: {item.label}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// 2. STAGE 2: THE EASY ZONE (Thumb Reach)
const StageTwo = ({ onComplete }) => {
    const [score, setScore] = useState(0);
    const [targetPos, setTargetPos] = useState({ x: '50%', y: '80%' });
    const phoneRef = useRef(null);

    const moveTarget = () => {
        const rX = 40 + Math.random() * 50;
        const rY = 60 + Math.random() * 30;
        setTargetPos({ x: `${rX}%`, y: `${rY}%` });
    };

    useEffect(() => { moveTarget(); }, []);

    const handleClick = () => {
        const newScore = score + 1;
        setScore(newScore);
        if (navigator.vibrate) navigator.vibrate(50);
        if (newScore >= 5) {
            onComplete();
        } else {
            moveTarget();
        }
    };

    return (
        <div className="w-full h-full relative bg-zinc-950 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] pointer-events-none" />

            <HudContainer title="STAGE 2: THUMB ZONE" type="red" className="absolute top-8 z-20 pointer-events-none opacity-80 backdrop-blur-sm">
                <p className="text-gray-300 text-sm drop-shadow-md">
                    스마트폰을 <span className="text-green-400 font-bold">한 손으로 잡았을 때</span> 가장 편한 위치는? <br />
                    <span className="text-green-400 font-bold underline">엄지 영역(Green Zone)</span>에 나타나는 백신을 터치하세요.
                </p>
            </HudContainer>

            <div ref={phoneRef} className="relative w-[360px] h-[720px] rounded-[50px] border-[12px] border-[#1a1a1a] bg-black shadow-2xl overflow-hidden flex flex-col relative z-10 ring-1 ring-white/10">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-full z-50 flex items-start justify-center overflow-hidden">
                    <div className="w-20 h-full bg-[#111] rounded-b-2xl opacity-50" />
                </div>

                <div className="w-full h-full relative bg-gray-900 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
                        <div className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-gradient-to-tl from-green-500 via-green-900 to-transparent opacity-80 rounded-full blur-3xl" />
                        <div className="absolute top-[-50px] left-[-50px] w-[400px] h-[400px] bg-gradient-to-br from-red-500 via-red-900 to-transparent opacity-60 rounded-full blur-3xl" />
                    </div>

                    <div className="absolute top-16 left-6 right-6 z-20">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-white/30 mb-1">
                            <span>Vaccine Upload</span>
                            <span>{score}/5</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: `${(score / 5) * 100}%` }}
                                className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                            />
                        </div>
                    </div>

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="absolute top-24 left-4 w-48 bg-white/5 backdrop-blur-md border border-red-500/30 p-3 rounded-xl z-20"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-bold text-red-400 tracking-wider">VIRUS DETECTED</span>
                        </div>
                        <div className="text-[10px] text-gray-400 leading-tight">System compromised. Do not touch.</div>
                    </motion.div>

                    <div className="absolute top-32 right-[-20px] opacity-50 pointer-events-none rotate-12">
                        <div className="px-4 py-2 bg-gray-700 rounded-lg text-xs text-gray-400 font-mono border border-gray-600">UNREACHABLE</div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        <motion.button
                            key={score}
                            layout
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={handleClick}
                            onTap={() => navigator.vibrate?.(50)}
                            style={{ left: targetPos.x, top: targetPos.y, position: 'absolute', transform: 'translate(-50%, -50%)' }}
                            className="z-50 w-16 h-16 rounded-full bg-green-500 text-black flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.6)] hover:bg-white transition-colors border-2 border-white/50 group"
                        >
                            <span className="text-2xl group-active:scale-125 transition-transform">💉</span>
                        </motion.button>
                    </AnimatePresence>

                    <div className="absolute bottom-10 right-10 pointer-events-none">
                        <div className="w-32 h-32 border border-white/10 rounded-full opacity-20" />
                        <div className="absolute inset-0 border border-dotted border-white/20 rounded-full shrink-0 m-4 opacity-30 animate-spin-slow" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] bg-contain bg-no-repeat bg-center opacity-10 pointer-events-none"
                style={{ backgroundImage: 'url(/hand-holding-phone-outline.png)' }}
            />
        </div>
    );
};

// 3. STAGE 3: UI vs UX (Card Sorting)
const StageThree = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [exitX, setExitX] = useState(0);

    const currentCard = QUIZ_DATA[index];

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 150) {
            handleSwipe(1); // Right (UX)
        } else if (info.offset.x < -150) {
            handleSwipe(-1); // Left (UI)
        }
    };

    const handleSwipe = (dir) => {
        const isUI = dir === -1;
        const correct = (isUI && currentCard.category === 'UI') || (!isUI && currentCard.category === 'UX');

        if (correct) {
            if (navigator.vibrate) navigator.vibrate(50);
            setExitX(dir * 500);
            setTimeout(() => {
                const next = index + 1;
                if (next >= QUIZ_DATA.length) {
                    onComplete();
                } else {
                    setIndex(next);
                    setExitX(0);
                }
            }, 200);
        } else {
            if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
        }
    };

    return (
        <div className="w-full h-full relative bg-black flex flex-col items-center justify-center overflow-hidden">

            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-900/20 to-transparent flex items-center justify-start pl-10 z-0">
                <h1 className="text-[120px] font-black text-blue-500/10 rotate-90 origin-left">UI</h1>
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-900/20 to-transparent flex items-center justify-end pr-10 z-0">
                <h1 className="text-[120px] font-black text-purple-500/10 -rotate-90 origin-right">UX</h1>
            </div>

            <div className="relative z-10 mb-10 text-center pointer-events-none">
                <h2 className="text-2xl font-bold text-white">ARCHITECT'S DECISION</h2>
                <p className="text-gray-400">Left for UI (Design), Right for UX (Experience)</p>
            </div>

            <div className="relative w-80 h-96 perspective-1000">
                <AnimatePresence mode="popLayout">
                    {currentCard && (
                        <motion.div
                            key={currentCard.id}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={handleDragEnd}
                            animate={{ x: exitX, opacity: exitX === 0 ? 1 : 0, rotate: exitX === 0 ? 0 : exitX > 0 ? 15 : -15 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border-8 border-gray-100 cursor-grab active:cursor-grabbing"
                        >
                            <span className="text-6xl mb-6">✨</span>
                            <h3 className="text-3xl font-black text-center text-gray-800 break-keep">{currentCard.text}</h3>
                            <p className="mt-4 text-center text-gray-500 font-medium">{currentCard.hint}</p>

                            <div className="absolute bottom-6 w-full px-6 flex justify-between font-bold text-xs text-gray-300">
                                <span>&larr; UI</span>
                                <span>UX &rarr;</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default function StepSeven({ onNext }) {
    const [step, setStep] = useState(0);

    return (
        <div className="fixed inset-0 z-[9999] bg-black font-sans select-none">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setStep(1)}
                        className="w-full h-full flex flex-col items-center justify-center bg-black cursor-pointer text-center"
                    >
                        <GlitchText text="FINAL EXAM" className="text-7xl font-black text-cyan-400 mb-4" />
                        <motion.div
                            initial={{ width: 0 }} animate={{ width: 200 }}
                            className="h-1 bg-cyan-500 mb-8"
                        />
                        <p className="text-gray-400 text-xl font-light">
                            Tap to Begin Certification
                        </p>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div key="st1" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <StageOne onComplete={() => setStep(2)} />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="st2" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <StageTwo onComplete={() => setStep(3)} />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="st3" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <StageThree onComplete={() => setStep(4)} />
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="finish"
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-6"
                    >
                        <div className="w-full max-w-2xl bg-white text-black p-12 rounded-lg shadow-2xl relative overflow-hidden border-[10px] border-double border-gray-300">
                            <div className="absolute top-0 right-0 p-8 opacity-20 text-[100px]">🏆</div>
                            <h1 className="text-5xl font-black mb-2 tracking-tighter">DIGITAL INSIGHT</h1>
                            <h2 className="text-2xl font-bold text-gray-500 mb-10">CERTIFICATE OF MASTERY</h2>

                            <div className="space-y-4 border-l-4 border-black pl-8 mb-10">
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Agent Name</div>
                                    <div className="text-2xl font-serif italic">Master Agent</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase">Authority</div>
                                    <div className="text-2xl font-serif italic">Anti-Dark Pattern Bureau</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className="text-sm font-bold opacity-50">VERIFIED VALID</div>
                                <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center font-black animate-pulse shadow-xl">
                                    PASSED
                                </div>
                            </div>
                        </div>

                        <button onClick={() => onSuccess()} className="mt-8 px-6 py-3 rounded-full border border-white/20 text-white/50 hover:bg-white hover:text-black transition-all">
                            EXIT
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
