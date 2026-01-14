import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// CARD DATA
// ============================================
const CARD_CONFIG = {
    width: 400,
    height: 600,
    headerHeight: 220,
};

const BEAUTIFUL_CONTENT = {
    badge: "마감임박",
    viewers: "1,204명이 보는 중",
    title: "프리미엄 미스테리 박스",
    price: "9,900원",
    originalPrice: "100,000원",
    tags: ["⚡ 90% 할인", "🚀 오늘 도착"],
    timer: "00:09:59",
    checkbox: "안심 케어 서비스 (월 4,900원)",
    button: "지금 구매하기",
    footer: "품절 시 재입고 예정 없음",
};

// ============================================
// X-RAY 콘텐츠 & 좌표 설정
// ============================================
const XRAY_CONTENT = {
    badge: {
        id: 'badge',
        label: "거짓 급함",
        explain: "실제로는 마감이 아닐 수 있음. '마감임박'문구로 판단력 흐리게 함",
        side: 'left',
        pos: { x: 50, y: 32 },
    },
    tags: {
        id: 'tags',
        label: "과장된 혜택",
        explain: "90% 할인? 비정상적. 현명한 소비자라면 불가능한 할인율을 의심할 것.",
        side: 'left',
        pos: { x: 40, y: 305 },
    },
    checkbox: {
        id: 'checkbox',
        label: "몰래 체크",
        explain: "기본값이 '선택됨'일 때, 원치 않는 결제가 발생할 가능성 있음.",
        side: 'left',
        pos: { x: 100, y: 435 },
    },
    footer: {
        id: 'footer',
        label: "불안감 조성",
        explain: "'품절되면 끝'이라는 불안감. 하지만 실제 재고는 알 수 없음.",
        side: 'left',
        pos: { x: 100, y: 562 },
    },
    viewers: {
        id: 'viewers',
        label: "가짜 인기",
        explain: "접속자 수는 진실일까? '나만 안 사나?' 하는 심리를 자극.",
        side: 'right',
        pos: { x: 350, y: 195 },
    },
    price: {
        id: 'price',
        label: "뻥튀기 가격",
        explain: "원가를 일부러 높~게 잡아 할인율이 커 보이게 만드는 속임수일지도",
        side: 'right',
        pos: { x: 350, y: 255 },
    },
    timer: {
        id: 'timer',
        label: "조급함 유도",
        explain: "타이머는 계속 리셋? 빠른 결제 유도 장치일 가능성 높음.",
        side: 'right',
        pos: { x: 300, y: 370 },
    },
    button: {
        id: 'button',
        label: "충동 구매 유도",
        explain: "강렬한 색상과 크기로 클릭을 유도. 누르기 전 3초만 다시 생각.",
        side: 'right',
        pos: { x: 300, y: 515 },
    },
};

export default function StepZero_3({ onNext }) {
    const [phase, setPhase] = useState('intro');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [foundItems, setFoundItems] = useState([]);

    const TOTAL_ITEMS = 8;
    const allFound = foundItems.length >= TOTAL_ITEMS;

    // Force HIDE global scanlines and vignette (App.jsx)
    useEffect(() => {
        const scanlines = document.querySelector('.scanlines');
        const vignette = document.querySelector('.vignette');

        if (scanlines) scanlines.style.display = 'none';
        if (vignette) vignette.style.display = 'none';

        return () => {
            if (scanlines) scanlines.style.display = '';
            if (vignette) vignette.style.display = '';
        };
    }, []);

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleDarkPatternClick = (content, e) => {
        if (!foundItems.includes(content.id)) {
            setFoundItems([...foundItems, content.id]);
        }
    };

    const renderSidebars = () => {
        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

        const cardCenterX = windowWidth / 2;
        const cardCenterY = (windowHeight / 2) - 40;
        const cardLeft = cardCenterX - CARD_CONFIG.width / 2;
        const cardTop = cardCenterY - CARD_CONFIG.height / 2;

        const visibleItems = Object.values(XRAY_CONTENT).filter(item => foundItems.includes(item.id));
        const leftItems = visibleItems.filter(item => item.side === 'left');
        const rightItems = visibleItems.filter(item => item.side === 'right');
        const popupWidth = 300;
        const leftSidebarX = Math.max(40, cardLeft - 340);
        const rightSidebarX = Math.min(windowWidth - 340, cardLeft + CARD_CONFIG.width + 40);

        const renderStack = (items, isLeft) => {
            const startY = Math.max(100, (windowHeight - (items.length * 150)) / 2);

            return items.map((item, index) => {
                const sidebarX = isLeft ? leftSidebarX : rightSidebarX;
                const sidebarY = startY + (index * 160);

                const targetAbsX = cardLeft + item.pos.x;
                const targetAbsY = cardTop + item.pos.y;
                const lineEndX = targetAbsX - sidebarX;
                const lineEndY = targetAbsY - sidebarY;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        className="fixed z-[60]"
                        style={{
                            left: sidebarX,
                            top: sidebarY,
                            width: popupWidth,
                        }}
                    >
                        <div className={`
                            relative p-6 rounded-2xl border border-gray-700
                            backdrop-blur-md bg-gray-900/90 shadow-2xl
                            ${isLeft ? 'text-right' : 'text-left'}
                         `}>
                            {/* Accent Line */}
                            <div className={`absolute top-6 bottom-6 w-1 bg-cyan-400 ${isLeft ? 'right-0 rounded-l-none' : 'left-0 rounded-r-none'}`} />

                            {/* Title: Clean, Bold, Standard Tracking */}
                            <div className="text-white text-xl font-bold mb-2 flex items-center gap-2 justify-end flex-row-reverse">
                                {isLeft ? (
                                    <>
                                        {item.label}
                                        <span className="text-cyan-400 text-sm">⚠️</span>
                                    </>
                                ) : (
                                    <div className="flex gap-2 items-center flex-row-reverse w-full justify-end">
                                        <span className="text-cyan-400 text-sm">⚠️</span>
                                        {item.label}
                                    </div>
                                )}
                            </div>

                            {/* Body: Clean Sans, High Contrast */}
                            <p className="text-gray-300 text-[15px] font-medium leading-7 break-keep tracking-normal">
                                {item.explain}
                            </p>
                        </div>

                        {/* Leader Line */}
                        <svg
                            className="absolute top-0 left-0 w-[2000px] h-[2000px] pointer-events-none overflow-visible"
                            style={{ left: 0, top: 0 }}
                        >
                            <line
                                x1={isLeft ? popupWidth : 0}
                                y1={70}
                                x2={lineEndX}
                                y2={lineEndY}
                                stroke="#22d3ee"
                                strokeWidth="2"
                                className="opacity-40"
                                strokeDasharray="6 4"
                            />
                            <circle cx={lineEndX} cy={lineEndY} r="4" fill="#22d3ee" className="animate-pulse" />
                        </svg>
                    </motion.div>
                );
            });
        };

        return (
            <>
                {renderStack(leftItems, true)}
                {renderStack(rightItems, false)}
            </>
        );
    };

    const renderBeautifulCard = () => (
        <div
            className="absolute bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height }}
        >
            <div
                className="absolute top-0 left-0 w-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-6xl"
                style={{ height: CARD_CONFIG.headerHeight }}
            >
                🎁
                <div className="absolute top-5 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm animate-bounce">
                    {BEAUTIFUL_CONTENT.badge}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    👀 {BEAUTIFUL_CONTENT.viewers}
                </div>
            </div>
            <div className="absolute top-[240px] left-6 right-6 flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{BEAUTIFUL_CONTENT.title}</h3>
                <div className="text-right">
                    <div className="text-red-500 font-black text-2xl">{BEAUTIFUL_CONTENT.price}</div>
                    <div className="text-gray-400 text-sm line-through">{BEAUTIFUL_CONTENT.originalPrice}</div>
                </div>
            </div>
            <div className="absolute top-[290px] left-6 flex gap-2">
                {BEAUTIFUL_CONTENT.tags.map((tag, i) => (
                    <span key={i} className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="absolute top-[340px] left-6 right-6 bg-red-50 border border-red-100 rounded-lg p-3 flex justify-between items-center">
                <span className="text-red-800 text-sm font-bold">남은 시간</span>
                <span className="text-red-600 font-mono font-black text-lg">{BEAUTIFUL_CONTENT.timer}</span>
            </div>
            <div className="absolute top-[410px] left-6 right-6 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-sm text-gray-700">{BEAUTIFUL_CONTENT.checkbox}</span>
            </div>
            <button className="absolute bottom-[55px] left-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-4 rounded-xl text-lg">
                {BEAUTIFUL_CONTENT.button}
            </button>
            <div className="absolute bottom-[25px] left-0 w-full text-center text-gray-400 text-xs">
                {BEAUTIFUL_CONTENT.footer}
            </div>
        </div>
    );

    const renderXRayCard = () => (
        <div
            className="absolute bg-black rounded-3xl overflow-hidden border-2 border-red-500 bg-[linear-gradient(rgba(255,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.08)_1px,transparent_1px)] bg-[size:20px_20px]"
            style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height }}
        >
            <div
                className="absolute top-0 left-0 w-full bg-gray-900 border-b border-red-900/50 flex items-center justify-center text-red-900/30 text-6xl"
                style={{ height: CARD_CONFIG.headerHeight }}
            >
                👁️
                <button
                    onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.badge, e)}
                    className={`absolute top-4 left-4 border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm font-bold bg-red-900/20 hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('badge') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
                >
                    {XRAY_CONTENT.badge.label}
                </button>
                <button
                    onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.viewers, e)}
                    className={`absolute bottom-4 right-4 border border-red-500 text-red-500 px-2 py-1 rounded text-xs font-bold bg-red-900/20 hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('viewers') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
                >
                    {XRAY_CONTENT.viewers.label}
                </button>
            </div>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.price, e)}
                className={`absolute top-[240px] right-6 text-red-500 font-bold text-sm hover:bg-red-600 hover:text-white px-2 py-1 rounded transition-all cursor-pointer pointer-events-auto ${foundItems.includes('price') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.price.label}
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.tags, e)}
                className={`absolute top-[290px] left-6 border border-dashed border-red-500/50 text-red-400 text-xs font-bold px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('tags') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.tags.label}
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.timer, e)}
                className={`absolute top-[340px] left-6 right-6 border border-red-500 bg-red-900/20 rounded-lg p-3 flex justify-between items-center hover:bg-red-600 transition-all cursor-pointer pointer-events-auto group ${foundItems.includes('timer') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                <span className="text-red-400 text-s font-bold group-hover:text-white">{XRAY_CONTENT.timer.label}</span>
                <span className="text-red-500 font-black text-lg group-hover:text-white">∞ 반복</span>
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.checkbox, e)}
                className={`absolute top-[410px] left-6 right-6 flex items-center gap-3 p-2 border border-red-500/50 rounded-lg bg-red-900/10 hover:bg-red-600 transition-all cursor-pointer pointer-events-auto group ${foundItems.includes('checkbox') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                <div className="w-5 h-4 border border-red-500 flex items-center justify-center text-red-500 text-xs font-bold group-hover:text-white group-hover:border-white">V</div>
                <span className="text-s text-red-400 font-bold group-hover:text-white">{XRAY_CONTENT.checkbox.label}</span>
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.button, e)}
                className={`absolute bottom-[53px] left-6 right-6 border-2 border-red-500 text-red-500 font-bold py-4 rounded-xl text-center bg-red-900/20 hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('button') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.button.label}
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.footer, e)}
                className={`absolute bottom-[18px] left-6 right-6 text-center text-red-900/70 text-sm font-bold hover:text-white hover:bg-red-600 rounded py-1 transition-all cursor-pointer pointer-events-auto ${foundItems.includes('footer') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.footer.label}
            </button>
        </div>
    );

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseMove={handleMouseMove}
        >
            {/* GLOBAL OVERLAYS HIDDEN BY USEEFFECT */}

            {/* HUD Status Text */}
            {phase === 'xray' && (
                <div className="fixed bottom-8 left-8 text-cyan-500 font-mono text-xs z-40 opacity-70 leading-relaxed pointer-events-none hidden md:block">
                    SYSTEM: ONLINE<br />
                    MODE: X-RAY ANALYSIS<br />
                    STATUS: ACTIVE
                </div>
            )}

            {/* PHASE TITLE */}
            {phase !== 'revealed' && (
                <motion.div
                    className="absolute top-8 left-8 z-50 pointer-events-none"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="text-cyan-400 text-sm font-mono tracking-widest mb-1">PHASE 3</div>
                    <div className="text-white text-3xl font-black">AGENT AWAKENING</div>
                    <div className="text-gray-500 text-sm font-medium">요원으로 깨어나다</div>
                </motion.div>
            )}

            {/* INTRO PHASE */}
            {phase === 'intro' && (
                <motion.div
                    className="text-center z-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                        보이는 것이 전부가 아니다.<br />
                        <span className="text-cyan-400">숨겨진 의도</span>를 파악하라.
                    </h2>
                    <p className="text-gray-300 text-lg mb-10 font-medium">
                        아름다운 화면 뒤에 무엇이 숨어있는지 X-RAY로 확인하라.
                    </p>
                    <motion.button
                        onClick={() => setPhase('xray')}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-red-600 text-white font-black text-xl rounded-sm shadow-lg uppercase tracking-widest"
                    >
                        🔍 수사 개시
                    </motion.button>
                </motion.div>
            )}

            {/* X-RAY PHASE */}
            {phase === 'xray' && (
                <>
                    {/* Mission Progress - VERTICAL STACK SIDEBAR (BIGGER) */}
                    <motion.div
                        className="absolute top-32 left-8 z-[60] hidden md:block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="text-cyan-400 font-bold text-xs tracking-widest mb-4">PROGRESS</div>
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: TOTAL_ITEMS }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-36 h-5 rounded-md border ${i < foundItems.length
                                        ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_cyan]'
                                        : 'bg-transparent border-gray-700'}`}
                                    initial={false}
                                    animate={{
                                        scaleX: i < foundItems.length ? [1, 1.1, 1] : 1,
                                        backgroundColor: i < foundItems.length ? '#22d3ee' : 'transparent'
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </div>
                        <div className="mt-4 text-white font-black text-3xl font-mono">
                            {foundItems.length}<span className="text-lg text-gray-500 font-medium">/{TOTAL_ITEMS}</span>
                        </div>
                    </motion.div>

                    {/* Card Container */}
                    {(() => {
                        const cardCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 512;
                        const cardCenterY = typeof window !== 'undefined' ? (window.innerHeight / 2) - 40 : 300;
                        const cardLeft = cardCenterX - CARD_CONFIG.width / 2;
                        const cardTop = cardCenterY - CARD_CONFIG.height / 2;
                        const maskX = mousePos.x - cardLeft;
                        const maskY = mousePos.y - cardTop;

                        return (
                            <>
                                <div className="fixed z-10" style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height, left: cardLeft, top: cardTop }}>
                                    {renderBeautifulCard()}
                                </div>
                                <div
                                    className="fixed z-20"
                                    style={{
                                        width: CARD_CONFIG.width,
                                        height: CARD_CONFIG.height,
                                        left: cardLeft,
                                        top: cardTop,
                                        maskImage: `radial-gradient(circle 150px at ${maskX}px ${maskY}px, black 30%, transparent 100%)`,
                                        WebkitMaskImage: `radial-gradient(circle 150px at ${maskX}px ${maskY}px, black 30%, transparent 100%)`,
                                    }}
                                >
                                    {renderXRayCard()}
                                </div>
                            </>
                        );
                    })()}

                    {/* Lens Ring */}
                    <div
                        className="fixed pointer-events-none z-[40] w-[300px] h-[300px] border border-cyan-500/30 rounded-full"
                        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)', boxShadow: '0 0 20px rgba(0, 243, 255, 0.1), inset 0 0 20px rgba(0, 243, 255, 0.1)' }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-cyan-500 text-[10px] font-mono px-2">X-RAY LENS</div>
                    </div>

                    {/* 설명 사이드바 (스택형) */}
                    <AnimatePresence>
                        {renderSidebars()}
                    </AnimatePresence>

                    {/* 수사 완료 버튼 */}
                    <motion.div
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: allFound ? 1 : 0.4, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <button
                            onClick={() => allFound && setPhase('revealed')}
                            disabled={!allFound}
                            className={`px-10 py-5 rounded-full font-black text-xl border backdrop-blur-md transition-all flex items-center gap-3 tracking-wide ${allFound
                                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:bg-cyan-400 cursor-pointer'
                                : 'bg-gray-800/80 text-gray-500 border-gray-600 cursor-not-allowed'
                                }`}
                        >
                            <span>{allFound ? '수사 완료' : `${TOTAL_ITEMS - foundItems.length}개 남음`}</span>
                            {allFound && <span className="bg-black text-cyan-400 rounded-full w-8 h-8 flex items-center justify-center text-lg">✓</span>}
                        </button>
                    </motion.div>
                </>
            )}

            {/* REVEALED PHASE */}
            {phase === 'revealed' && (
                <motion.div
                    className="text-center z-30 px-8"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="text-cyan-400 text-lg font-bold tracking-widest mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        테스트의 시작
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
                        버튼 속 숨겨진 설계들<br />
                        <span className="text-cyan-400">'통찰있는 소비 생활'</span>을 위한 여정 시작.
                    </h2>
                    <motion.p
                        className="text-gray-300 text-xl md:text-2xl mb-12 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        당신에게 디지털 수사 요원이 되기 위한 테스트 자격을 부여합니다.
                    </motion.p>
                    <motion.button
                        onClick={onNext}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,243,255,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 bg-white text-black font-black text-2xl rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-cyan-50 transition-all uppercase tracking-widest"
                    >
                        미션 시작 →
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
