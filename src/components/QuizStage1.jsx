import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

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

// Dock Icons
import dockPhone from '../assets/icon_phone.png';
import dockChat from '../assets/icon_chat.png';
import dockCamera from '../assets/icon_camera.png';
import dockCalendar from '../assets/icon_calendar.png';

const ARTIFACTS = [
    {
        id: 'basket',
        icon: basketImg,
        label: '장바구니',
        pastDesc: '구매한 물건을 직접 담아서 집으로 이동',
        appIcon: rocketImg,
        appName: '새벽배송',
        futureDesc: '터치로 주문하고 새벽에 받는 혁신',
        color: 'bg-blue-600'
    },
    {
        id: 'wallet',
        icon: walletImg,
        label: '지갑',
        pastDesc: '현금과 카드로 두툼해진 지갑을 가지고 다님',
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
        futureDesc: '복잡한 계산도 간단하고 빠르게',
        color: 'bg-gray-500'
    },
    {
        id: 'safe',
        icon: safeImg,
        label: '금고',
        pastDesc: '물리적 공간에 자산 보관',
        appIcon: securityImg,
        appName: '암호화폐',
        futureDesc: '암호화된 디지털 자산으로 영구 저장',
        color: 'bg-indigo-600'
    },
    {
        id: 'map',
        icon: mapImg,
        label: '지도',
        pastDesc: '종이 지도로 길을 확인하고 찾아감',
        appIcon: naviImg,
        appName: '네비게이션',
        futureDesc: '실시간 교통정보 기반 최적 경로',
        color: 'bg-green-500'
    },
    {
        id: 'music',
        icon: headphoneImg,
        label: '헤드폰',
        pastDesc: 'LP와 CD로 즐기는 정해진(또는 저장된) 음악',
        appIcon: musicImg,
        appName: '스트리밍',
        futureDesc: '전 세계 모든 음악을 실시간 감상',
        color: 'bg-pink-500'
    },
];

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
    playSuccess: () => {
        SoundEngine.playTone(800, 'sine', 0.1, 0.2);
        setTimeout(() => SoundEngine.playTone(1200, 'sine', 0.2, 0.2), 100);
    },
    playError: () => {
        SoundEngine.playTone(150, 'sawtooth', 0.3, 0.3);
        SoundEngine.playTone(100, 'square', 0.3, 0.3);
    }
};

const QuizStage1 = ({ onComplete, ambienceAudioRef }) => {
    const [digitized, setDigitized] = useState([]);
    const [infoModalItem, setInfoModalItem] = useState(null);
    const [shakeItem, setShakeItem] = useState(null);
    const [hoveredSlot, setHoveredSlot] = useState(null);
    const constraintsRef = useRef(null);

    // Fade out background ambience over 4-5 seconds on mount
    useEffect(() => {
        if (ambienceAudioRef?.current) {
            const audio = ambienceAudioRef.current;
            const fadeDuration = 4500; // 4.5 seconds
            const fadeSteps = 50;
            const fadeInterval = fadeDuration / fadeSteps;
            const volumeStep = audio.volume / fadeSteps;

            let currentStep = 0;
            const fadeTimer = setInterval(() => {
                currentStep++;
                const newVolume = Math.max(0, audio.volume - volumeStep);
                audio.volume = newVolume;

                if (currentStep >= fadeSteps) {
                    clearInterval(fadeTimer);
                    audio.pause();
                }
            }, fadeInterval);

            return () => {
                clearInterval(fadeTimer);
            };
        }
    }, [ambienceAudioRef]);

    const handleDrag = (event, info, draggedItem) => {
        const point = {
            x: event.clientX || info.point.x,
            y: event.clientY || info.point.y
        };
        const padding = 30; // Slightly larger for hover feedback
        let activeSlot = null;

        // Check collision with ALL slots, not just the matching one
        for (const targetItem of ARTIFACTS) {
            const targetId = `slot-${targetItem.id}`;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                if (
                    point.x >= rect.left - padding &&
                    point.x <= rect.right + padding &&
                    point.y >= rect.top - padding &&
                    point.y <= rect.bottom + padding
                ) {
                    activeSlot = targetItem.id;
                    break;
                }
            }
        }
        setHoveredSlot(activeSlot);
    };

    const handleDragEnd = (event, info, item) => {
        setHoveredSlot(null);
        const targetId = `slot-${item.id}`;
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();

            // Check if the center of the dragged item is within the target slot
            const point = {
                x: event.clientX || info.point.x,
                y: event.clientY || info.point.y
            };

            // Allow some tolerance (padding) for easier drops
            const padding = 20;

            if (
                point.x >= rect.left - padding &&
                point.x <= rect.right + padding &&
                point.y >= rect.top - padding &&
                point.y <= rect.bottom + padding
            ) {
                if (!digitized.includes(item.id)) {
                    setDigitized(prev => [...prev, item.id]);
                    SoundEngine.playSuccess();
                    if (navigator.vibrate) navigator.vibrate(50);
                    setInfoModalItem(item);
                    return;
                }
            }
        }

        // If we get here, drop failed
        SoundEngine.playError();
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        setShakeItem(item.id);
        setTimeout(() => setShakeItem(null), 500);
    };

    const handleCloseModal = () => {
        setInfoModalItem(null);
    };

    useEffect(() => {
        if (digitized.length === ARTIFACTS.length && !infoModalItem) {
            setTimeout(onComplete, 1500);
        }
    }, [digitized, infoModalItem, onComplete]);

    return (
        <div className="w-full h-full relative bg-slate-950 flex overflow-hidden font-sans text-cyan-500" ref={constraintsRef} onClick={() => SoundEngine.init()}>
            {/* AGENT BACKGROUND GRID */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-0 pointer-events-none" />

            {/* TOP HEADER */}
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
                                "기존의 <strong className="text-white">아날로그 방식 아이콘</strong>을 디지털 방식의<strong className="text-cyan-400"> 앱 아이콘</strong>으로 드래그 하십시오."
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

            {/* ANALYSIS INFO MODAL */}
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
                            className="absolute left-0 top-24 bottom-24 w-[450px] bg-black/90 border-r-2 border-cyan-500 p-10 z-50 text-cyan-50 shadow-[0_0_100px_rgba(6,182,212,0.3)] flex flex-col justify-between"
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
                                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg tracking-widest text-sm transition-all shadow-lg hover:shadow-cyan-500/50 border border-cyan-300/30 flex items-center justify-center gap-2 group mt-6"
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

                {/* DEVICE CONTAINER */}
                <motion.div
                    id="phone-target"
                    animate={{ scale: digitized.length === ARTIFACTS.length ? 1.05 : 1 }}
                    className="relative w-[340px] h-[680px] z-20 select-none bg-black rounded-[3.5rem] border-[6px] border-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
                >
                    <div id="phone-screen-area" className="w-full h-full bg-slate-900 rounded-[3rem] overflow-hidden relative flex flex-col border border-gray-700">
                        {/* Status Bar Area */}
                        <div className="absolute top-0 w-full h-14 px-8 pt-5 flex justify-between items-start z-50 text-white font-medium">
                            <span className="text-sm tracking-wide font-semibold">9:41</span>

                            {/* Dynamic Island */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90px] h-[30px] bg-black rounded-full flex items-center justify-end pr-4 shadow-lg border-b border-white/10">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1b26] ring-1 ring-white/5 shadow-inner" />
                            </div>

                            {/* Status Icons */}
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-0.5 items-end h-3">
                                    <div className="w-1 h-1.5 bg-white rounded-[1px]" />
                                    <div className="w-1 h-2 bg-white rounded-[1px]" />
                                    <div className="w-1 h-2.5 bg-white rounded-[1px]" />
                                    <div className="w-1 h-3 bg-white/30 rounded-[1px]" />
                                </div>
                                <span className="text-[10px] font-bold">5G</span>
                                <div className="w-6 h-3 border border-white/40 rounded-[4px] relative p-0.5 flex items-center">
                                    <div className="h-full w-[60%] bg-white rounded-[1px]" />
                                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-white/40 rounded-r-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Wallpaper */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_80%)] z-0" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0 mix-blend-overlay" />

                        {/* App Grid - Targets */}
                        <div className="relative z-10 flex-1 p-6 grid grid-cols-2 gap-y-6 gap-x-4 content-start pt-24 place-items-center">
                            {ARTIFACTS.map(item => {
                                const isDigitized = digitized.includes(item.id);
                                return (
                                    <div key={item.id} className="flex flex-col items-center gap-2 w-24">
                                        <div className="relative w-24 h-24">
                                            {/* Placeholder (Empty Slot) - TARGET */}
                                            <div
                                                id={`slot-${item.id}`}
                                                className={`absolute inset-0 rounded-[1.5rem] border-2 border-dashed flex items-center justify-center transition-all duration-300 
                                                    ${isDigitized ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
                                                    ${hoveredSlot === item.id ? 'border-cyan-400 bg-cyan-400/20 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'border-white/10 bg-white/5'}
                                                `}
                                            >
                                                <div className={`text-[10px] font-mono text-center leading-tight p-1 transition-colors ${hoveredSlot === item.id ? 'text-cyan-200' : 'text-white/20'}`}>
                                                    APP<br />SLOT
                                                </div>
                                            </div>

                                            {/* Actual Digital App */}
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{
                                                    scale: isDigitized ? 1 : 0.8,
                                                    opacity: isDigitized ? 1 : 0
                                                }}
                                                className="w-full h-full rounded-[1.5rem] bg-black/40 backdrop-blur-md shadow-2xl overflow-hidden border border-white/10 absolute inset-0 z-10"
                                            >
                                                <img src={item.appIcon} className="w-full h-full object-cover" />
                                            </motion.div>
                                        </div>

                                        <span className={`text-sm text-center font-bold tracking-tight drop-shadow-md transition-colors duration-300 ${isDigitized ? 'text-white opacity-100' : 'text-gray-500 opacity-40'}`}>
                                            {item.appName}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Dock Info */}
                        <div className="relative z-10 h-24 mx-5 mb-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] flex justify-around items-center px-4 gap-4 border border-white/5 shadow-lg">
                            <div className="w-14 h-14 rounded-[1.2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"><img src={dockPhone} className="w-full h-full object-cover" /></div>
                            <div className="w-14 h-14 rounded-[1.2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"><img src={dockChat} className="w-full h-full object-cover" /></div>
                            <div className="w-14 h-14 rounded-[1.2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"><img src={dockCamera} className="w-full h-full object-cover" /></div>
                            <div className="w-14 h-14 rounded-[1.2rem] overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"><img src={dockCalendar} className="w-full h-full object-cover" /></div>
                        </div>
                    </div>
                </motion.div>

                {/* SCATTERED ARTIFACTS */}
                {ARTIFACTS.map((item, i) => {
                    if (digitized.includes(item.id)) return null;

                    const positions = [
                        { top: '30%', left: '15%', rotate: -15 },
                        { top: '48%', left: '8%', rotate: 10 },
                        { bottom: '10%', left: '17%', rotate: 25 },
                        { top: '20%', right: '25%', rotate: 15 },
                        { top: '48%', right: '15%', rotate: -10 },
                        { bottom: '12%', right: '20%', rotate: -25 }
                    ];
                    const pos = positions[i] || { top: '50%', left: '50%' };

                    return (
                        <motion.div
                            key={item.id}
                            drag={!infoModalItem}
                            dragConstraints={constraintsRef}
                            dragElastic={0.1}
                            dragSnapToOrigin
                            onDrag={(e, info) => handleDrag(e, info, item)}
                            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
                            whileHover={{ scale: 1.15, cursor: 'grab', zIndex: 100 }}
                            whileDrag={{ scale: 1.25, cursor: 'grabbing', zIndex: 100 }}
                            initial={pos}
                            className={`absolute flex flex-col items-center justify-center w-40 h-40 group z-30 transition-opacity ${infoModalItem ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
                        >
                            <div className="w-36 h-36 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-2"
                                />
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

export default QuizStage1;
