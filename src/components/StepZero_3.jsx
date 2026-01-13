import { useState } from 'react';
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
// X-RAY 콘텐츠 & 좌표 설정 (Center of Elements)
// ============================================
// side: 'left' | 'right'
// pos: {x, y} relative to Card (Elements Center)
const XRAY_CONTENT = {
    badge: {
        id: 'badge',
        label: "⚠️ 거짓 급함",
        explain: "실제로는 마감이 없다. '마감임박' 문구를 반복 표시하여 소비자의 판단력을 흐리게 만드는 수법이다.",
        side: 'left',
        pos: { x: 40, y: 20 }, // Top-Left Badge Center
    },
    tags: {
        id: 'tags',
        label: "⚠️ 과장 혜택",
        explain: "90% 할인은 비정상적이다. 정상적인 사업자라면 이런 할인은 불가능하다. 의심해야 한다.",
        side: 'left',
        pos: { x: 40, y: 300 }, // Tags Area Center
    },
    checkbox: {
        id: 'checkbox',
        label: "⚠️ 몰래 체크",
        explain: "기본값이 '선택됨'으로 설정되어 있다. 무심코 넘기면 추가 결제가 발생한다.",
        side: 'left',
        pos: { x: 200, y: 435 }, // Checkbox Area Center
    },
    footer: {
        id: 'footer',
        label: "⚠️ 불안감 조성",
        explain: "'품절되면 끝'이라는 문구로 불안감을 조성. 실제 재고 상황은 알 수 없다.",
        side: 'left',
        pos: { x: 200, y: 567 }, // Footer Text Center
    },
    // Right Side Group
    viewers: {
        id: 'viewers',
        label: "⚠️ 가짜 인기",
        explain: "실제 접속자 수인지 확인 불가. 허위 숫자로 '다들 사는데 나만 안 사나?' 하는 심리를 노린다.",
        side: 'right',
        pos: { x: 350, y: 205 }, // Viewers Badge Center (Bottom of Header)
    },
    price: {
        id: 'price',
        label: "⚠️ 뻥튀기 가격",
        explain: "원래 가격을 의도적으로 높게 설정. 할인율이 커 보이게 만드는 속임수다.",
        side: 'right',
        pos: { x: 350, y: 255 }, // Price Area Center (Right Top)
    },
    timer: {
        id: 'timer',
        label: "⚠️ 조급함 유도",
        explain: "타이머는 무한 반복된다. 새로고침해도 리셋. 목적은 오직 하나, 빠른 결제 유도다.",
        side: 'right',
        pos: { x: 200, y: 370 }, // Timer Area Center
    },
    button: {
        id: 'button',
        label: "⚠️ 충동 유도",
        explain: "강렬한 색상과 크기로 즉각적인 클릭을 유도한다. 누르기 전 3초만 생각하라.",
        side: 'right',
        pos: { x: 200, y: 515 }, // Button Center (545-30)
    },
};

// ============================================
// COMPONENT
// ============================================
export default function StepZero_3({ onNext }) {
    const [phase, setPhase] = useState('intro');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [foundItems, setFoundItems] = useState([]);

    const TOTAL_ITEMS = 8;
    const allFound = foundItems.length >= TOTAL_ITEMS;

    // 마우스 이동 핸들러
    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // 다크패턴 클릭 핸들러
    const handleDarkPatternClick = (content, e) => {
        if (!foundItems.includes(content.id)) {
            setFoundItems([...foundItems, content.id]);
        }
    };

    // --------------------------------------------------------------------------------
    // RENDER: Sidebars (Stacked & Persistent)
    // --------------------------------------------------------------------------------
    const renderSidebars = () => {
        const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

        // 카드 위치
        const cardCenterX = windowWidth / 2;
        const cardCenterY = (windowHeight / 2) - 40;
        const cardLeft = cardCenterX - CARD_CONFIG.width / 2;
        const cardTop = cardCenterY - CARD_CONFIG.height / 2;

        // 찾은 아이템 필터링 및 사이드별 분류
        const visibleItems = Object.values(XRAY_CONTENT).filter(item => foundItems.includes(item.id));
        const leftItems = visibleItems.filter(item => item.side === 'left');
        const rightItems = visibleItems.filter(item => item.side === 'right');

        // 사이드바 설정
        const popupWidth = 300;
        const leftSidebarX = Math.max(40, cardLeft - 340);
        const rightSidebarX = Math.min(windowWidth - 340, cardLeft + CARD_CONFIG.width + 40);

        // 스택 렌더링 함수
        const renderStack = (items, isLeft) => {
            // 화면 높이에 따라 시작 위치 조정 (중앙 정렬 느낌으로 분산, 혹은 상단부터 차곡차곡)
            // 여기서는 상단 20% 지점부터 쌓기 시작 + 간격
            const startY = Math.max(100, (windowHeight - (items.length * 150)) / 2); // 수직 중앙 정렬 시도

            return items.map((item, index) => {
                const sidebarX = isLeft ? leftSidebarX : rightSidebarX;
                const sidebarY = startY + (index * 160); // 카드 높이 + 간격

                // 타겟 위치 (절대 좌표)
                const targetAbsX = cardLeft + item.pos.x;
                const targetAbsY = cardTop + item.pos.y;

                // 지시선 끝점 (상대 좌표)
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
                        {/* Glassmorphism Card */}
                        <div className={`
                            relative p-5 rounded-xl border border-white/20 
                            backdrop-blur-xl bg-gray-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                            ${isLeft ? 'text-right' : 'text-left'}
                         `}>
                            {/* Decorative Corner Line */}
                            <div className={`absolute top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_cyan] ${isLeft ? 'right-0 rounded-r-none' : 'left-0 rounded-l-none'}`} />

                            <div className="text-cyan-400 font-bold text-lg mb-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                                {item.label}
                            </div>
                            <p className="text-white/90 text-[15px] font-medium leading-relaxed break-keep drop-shadow-md">
                                {item.explain}
                            </p>
                        </div>

                        {/* SVG Leader Line (Overlay) */}
                        <svg
                            className="absolute top-0 left-0 w-[2000px] h-[2000px] pointer-events-none overflow-visible"
                            style={{
                                left: 0,
                                top: 0,
                                transform: 'translate(0, 0)', // 기준점: 팝업 좌상단
                            }}
                        >
                            {/* 
                                Start: 
                                Left Stack -> Right Edge of Popup (Width, Height/2 approx 60)
                                Right Stack -> Left Edge of Popup (0, Height/2 approx 60)
                            */}
                            <line
                                x1={isLeft ? popupWidth : 0}
                                y1={70} // Approx center height of popup
                                x2={lineEndX}
                                y2={lineEndY}
                                stroke="#00f3ff"
                                strokeWidth="1.5"
                                className="opacity-60 drop-shadow-[0_0_3px_cyan]"
                            />
                            {/* Target Dot - Pulse */}
                            <circle cx={lineEndX} cy={lineEndY} r="4" fill="#00f3ff" className="animate-pulse drop-shadow-[0_0_8px_cyan]" />
                            <circle cx={lineEndX} cy={lineEndY} r="8" fill="transparent" stroke="#00f3ff" className="opacity-30" />
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

    // ============================================
    // MAIN RENDER (동일)
    // ============================================
    const renderBeautifulCard = () => (
        <div
            className="absolute bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height }}
        >
            {/* Header */}
            <div
                className="absolute top-0 left-0 w-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-6xl"
                style={{ height: CARD_CONFIG.headerHeight }}
            >
                🎁
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm animate-bounce">
                    {BEAUTIFUL_CONTENT.badge}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    👀 {BEAUTIFUL_CONTENT.viewers}
                </div>
            </div>

            {/* Title & Price */}
            <div className="absolute top-[240px] left-6 right-6 flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{BEAUTIFUL_CONTENT.title}</h3>
                <div className="text-right">
                    <div className="text-red-500 font-black text-2xl">{BEAUTIFUL_CONTENT.price}</div>
                    <div className="text-gray-400 text-sm line-through">{BEAUTIFUL_CONTENT.originalPrice}</div>
                </div>
            </div>

            {/* Tags */}
            <div className="absolute top-[290px] left-6 flex gap-2">
                {BEAUTIFUL_CONTENT.tags.map((tag, i) => (
                    <span key={i} className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Timer */}
            <div className="absolute top-[340px] left-6 right-6 bg-red-50 border border-red-100 rounded-lg p-3 flex justify-between items-center">
                <span className="text-red-800 text-sm font-bold">남은 시간</span>
                <span className="text-red-600 font-mono font-black text-lg">{BEAUTIFUL_CONTENT.timer}</span>
            </div>

            {/* Checkbox */}
            <div className="absolute top-[410px] left-6 right-6 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-sm text-gray-700">{BEAUTIFUL_CONTENT.checkbox}</span>
            </div>

            {/* Button */}
            <button className="absolute bottom-[55px] left-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-4 rounded-xl text-lg">
                {BEAUTIFUL_CONTENT.button}
            </button>

            {/* Footer */}
            <div className="absolute bottom-[25px] left-0 w-full text-center text-gray-400 text-xs">
                {BEAUTIFUL_CONTENT.footer}
            </div>
        </div>
    );

    const renderXRayCard = () => (
        <div
            className="absolute bg-black rounded-3xl overflow-hidden border-2 border-red-500"
            style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height }}
        >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div
                className="absolute top-0 left-0 w-full bg-gray-900 border-b border-red-900/50 flex items-center justify-center text-red-900/30 text-6xl"
                style={{ height: CARD_CONFIG.headerHeight }}
            >
                👁️
                <button
                    onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.badge, e)}
                    className={`absolute top-4 left-4 border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm font-mono font-bold bg-red-900/20 hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('badge') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
                >
                    {XRAY_CONTENT.badge.label}
                </button>
                <button
                    onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.viewers, e)}
                    className={`absolute bottom-4 right-4 border border-red-500 text-red-500 px-2 py-1 rounded text-xs font-mono font-bold bg-red-900/20 hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('viewers') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
                >
                    {XRAY_CONTENT.viewers.label}
                </button>
            </div>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.price, e)}
                className={`absolute top-[240px] right-6 text-red-500 font-mono font-bold text-sm hover:bg-red-600 hover:text-white px-2 py-1 rounded transition-all cursor-pointer pointer-events-auto ${foundItems.includes('price') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.price.label}
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.tags, e)}
                className={`absolute top-[290px] left-6 border border-dashed border-red-500/50 text-red-400 text-xs font-mono font-bold px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('tags') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.tags.label}
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.timer, e)}
                className={`absolute top-[340px] left-6 right-6 border border-red-500 bg-red-900/20 rounded-lg p-3 flex justify-between items-center hover:bg-red-600 transition-all cursor-pointer pointer-events-auto ${foundItems.includes('timer') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                <span className="text-red-400 text-sm font-mono font-bold">{XRAY_CONTENT.timer.label}</span>
                <span className="text-red-500 font-mono font-black text-lg">∞ 반복</span>
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.checkbox, e)}
                className={`absolute top-[410px] left-6 right-6 flex items-center gap-3 p-3 border border-red-500/50 rounded-lg bg-red-900/10 hover:bg-red-600 transition-all cursor-pointer pointer-events-auto ${foundItems.includes('checkbox') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                <div className="w-5 h-5 border border-red-500 flex items-center justify-center text-red-500 text-xs font-bold">V</div>
                <span className="text-sm text-red-400 font-mono font-bold">{XRAY_CONTENT.checkbox.label}</span>
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.button, e)}
                className={`absolute bottom-[55px] left-6 right-6 border-2 border-red-500 text-red-500 font-mono font-bold py-4 rounded-xl text-center bg-red-900/20 hover:bg-red-600 hover:text-white transition-all cursor-pointer pointer-events-auto ${foundItems.includes('button') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
            >
                {XRAY_CONTENT.button.label}
            </button>
            <button
                onClick={(e) => handleDarkPatternClick(XRAY_CONTENT.footer, e)}
                className={`absolute bottom-[25px] left-6 right-6 text-center text-red-900/70 text-xs font-mono font-bold hover:text-white hover:bg-red-600 rounded py-1 transition-all cursor-pointer pointer-events-auto ${foundItems.includes('footer') ? 'ring-2 ring-cyan-400 bg-red-600/20' : ''}`}
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
            {/* Phase Title */}
            {phase !== 'revealed' && (
                <motion.div
                    className="absolute top-8 left-8 z-10 pointer-events-none"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="text-cyan-400 text-sm font-mono tracking-widest mb-1">PHASE 3</div>
                    <div className="text-white text-2xl font-black">AGENT AWAKENING</div>
                    <div className="text-gray-500 text-sm">요원의 각성</div>
                </motion.div>
            )}

            {/* INTRO PHASE */}
            {phase === 'intro' && (
                <motion.div
                    className="text-center z-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        보이는 것이 전부가 아니다.<br />
                        <span className="text-cyan-400">숨겨진 의도</span>를 파악하라.
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
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
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0,243,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* X-Ray Mode Frame (Corners) */}
                    <motion.div
                        className="fixed inset-0 pointer-events-none z-[5]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="absolute top-4 left-4">
                            <div className="w-16 h-1 bg-red-500" />
                            <div className="w-1 h-16 bg-red-500" />
                            <div className="absolute top-6 left-6 text-red-500 font-mono text-xs">X-RAY</div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <div className="w-16 h-1 bg-red-500 ml-auto" />
                            <div className="w-1 h-16 bg-red-500 ml-auto" />
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <div className="w-1 h-16 bg-red-500" />
                            <div className="w-16 h-1 bg-red-500" />
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <div className="w-1 h-16 bg-red-500 ml-auto" />
                            <div className="w-16 h-1 bg-red-500 ml-auto" />
                        </div>
                        <div className="absolute top-6 right-8 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-red-500 font-mono text-xs">REC</span>
                        </div>
                    </motion.div>

                    {/* Mission Progress */}
                    <motion.div
                        className="absolute top-8 left-1/2 -translate-x-1/2 z-30"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="bg-gray-900/90 px-6 py-2 rounded-full border border-cyan-500/50 backdrop-blur-md flex items-center gap-4 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                            <span className="text-cyan-400 font-mono text-xs font-bold whitespace-nowrap">[ 미션 진행 ]</span>
                            <div className="text-white font-black text-lg leading-none">
                                {foundItems.length} <span className="text-gray-500 font-normal text-sm">/ {TOTAL_ITEMS}</span>
                            </div>
                            {allFound ? (
                                <div className="text-cyan-400 text-xs font-bold animate-pulse whitespace-nowrap">✅ 수사 완료</div>
                            ) : (
                                <div className="text-gray-400 text-xs whitespace-nowrap hidden md:block">속임수를 찾아라</div>
                            )}
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

                    {/* Flashlight Glow */}
                    <div
                        className="fixed inset-0 pointer-events-none z-30 mix-blend-screen"
                        style={{ background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.15), transparent 70%)` }}
                    />

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
                            className={`px-8 py-4 rounded-full font-mono font-bold text-lg border backdrop-blur-md transition-all flex items-center gap-3 ${allFound
                                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:bg-cyan-400 cursor-pointer'
                                : 'bg-gray-800/50 text-gray-500 border-gray-600 cursor-not-allowed'
                                }`}
                        >
                            <span>{allFound ? '[ 수사 완료 ]' : `[ ${TOTAL_ITEMS - foundItems.length}개 남음 ]`}</span>
                            {allFound && <span className="bg-black text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>}
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
                        className="text-cyan-400 text-lg font-mono tracking-widest mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        [ ✅ 수사 완료 ]
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                        이제 너는 속지 않는다.<br />
                        <span className="text-cyan-400">'디지털 통찰력'</span>을 획득했다.
                    </h2>
                    <motion.p
                        className="text-gray-400 text-xl md:text-2xl mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        다음 미션을 준비하라.
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
                        MISSION START →
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}
