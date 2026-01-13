import { useState } from 'react';
import { motion } from 'framer-motion';

// ============================================
// CARD DATA - 쉬운 수정을 위해 데이터 분리
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

const XRAY_CONTENT = {
    badge: "⚠️ [가짜 희소성]",
    viewers: "⚠️ [소셜 프루프 압박]",
    title: "[상품명 텍스트]",
    price: "⚠️ [앵커링 가격]",
    tags: ["[과장된 할인율]"],
    timerLabel: "⚠️ 불안감 조성 타이머",
    timerValue: "LOOP:INFINITE",
    checkboxTitle: "⚠️ [다크 패턴: 프리 셀렉션]",
    checkboxSub: "부주의한 결제 유도",
    button: "⚠️ [충동적 행동 유도 장치]",
    footer: "[손실 회피 심리 자극 문구]",
};

// ============================================
// COMPONENT
// ============================================
export default function StepZero_3({ onNext }) {
    const [phase, setPhase] = useState('intro'); // 'intro' | 'xray' | 'revealed'
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // 마우스 이동 핸들러 (인라인)
    const handleMouseMove = (e) => {
        // 전체화면 기준 좌표 사용 (container가 inset-0이므로 offset 불필요)
        setMousePos({
            x: e.clientX,
            y: e.clientY,
        });
    };

    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    // 아름다운 카드 (기본 레이어)
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

    // X-Ray 카드 (마스크 레이어)
    const renderXRayCard = () => (
        <div
            className="absolute bg-black rounded-3xl overflow-hidden border-2 border-red-500"
            style={{ width: CARD_CONFIG.width, height: CARD_CONFIG.height }}
        >
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Header */}
            <div
                className="absolute top-0 left-0 w-full bg-gray-900 border-b border-red-900/50 flex items-center justify-center text-red-900/30 text-6xl"
                style={{ height: CARD_CONFIG.headerHeight }}
            >
                👁️
                <div className="absolute top-4 left-4 border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm font-mono font-bold bg-red-900/20">
                    {XRAY_CONTENT.badge}
                </div>
                <div className="absolute bottom-4 right-4 border border-red-500 text-red-500 px-2 py-1 rounded text-xs font-mono font-bold bg-red-900/20">
                    {XRAY_CONTENT.viewers}
                </div>
            </div>

            {/* Title & Price */}
            <div className="absolute top-[240px] left-6 right-6 flex justify-between items-start">
                <span className="text-gray-500 font-mono font-bold text-sm">{XRAY_CONTENT.title}</span>
                <span className="text-red-500 font-mono font-bold text-sm">{XRAY_CONTENT.price}</span>
            </div>

            {/* Tags */}
            <div className="absolute top-[290px] left-6 flex gap-2">
                {XRAY_CONTENT.tags.map((tag, i) => (
                    <span key={i} className="border border-dashed border-red-500/50 text-red-400 text-xs font-mono font-bold px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Timer */}
            <div className="absolute top-[340px] left-6 right-6 border border-red-500 bg-red-900/20 rounded-lg p-3 flex justify-between items-center">
                <span className="text-red-400 text-sm font-mono font-bold">{XRAY_CONTENT.timerLabel}</span>
                <span className="text-red-500 font-mono font-black text-lg">{XRAY_CONTENT.timerValue}</span>
            </div>

            {/* Checkbox */}
            <div className="absolute top-[410px] left-6 right-6 flex items-center gap-3 p-3 border border-red-500/50 rounded-lg bg-red-900/10">
                <div className="w-5 h-5 border border-red-500 flex items-center justify-center text-red-500 text-xs font-bold">V</div>
                <div className="text-sm text-red-400 font-mono font-bold">
                    {XRAY_CONTENT.checkboxTitle}
                    <br /><span className="text-xs text-gray-500">{XRAY_CONTENT.checkboxSub}</span>
                </div>
            </div>

            {/* Button */}
            <div className="absolute bottom-[55px] left-6 right-6 border-2 border-red-500 text-red-500 font-mono font-bold py-4 rounded-xl text-center bg-red-900/20 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                {XRAY_CONTENT.button}
            </div>

            {/* Footer */}
            <div className="absolute bottom-[25px] left-0 w-full text-center text-red-900/50 text-xs font-mono font-bold">
                {XRAY_CONTENT.footer}
            </div>
        </div>
    );

    // ============================================
    // MAIN RENDER
    // ============================================
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
                        보이지 않는 설계를<br />
                        <span className="text-cyan-400">꿰뚫어 볼 눈</span>이 필요합니다.
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        화려한 UI 뒤에 숨겨진 의도를 확인해보세요.
                    </p>
                    <motion.button
                        onClick={() => setPhase('xray')}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-red-600 text-white font-black text-xl rounded-sm shadow-lg uppercase tracking-widest"
                    >
                        🔍 INVESTIGATE
                    </motion.button>
                </motion.div>
            )}

            {/* X-RAY PHASE */}
            {phase === 'xray' && (
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

                    {/* X-Ray Mode Badge */}
                    <motion.div
                        className="absolute top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 bg-red-900/50 px-6 py-3 rounded-full border border-red-500 backdrop-blur-md">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-red-400 font-mono text-sm tracking-wider">X-RAY MODE ACTIVE</span>
                        </div>
                        <div className="text-center mt-2 text-gray-400 text-xs">마우스를 움직여 숨겨진 의도를 찾아보세요</div>
                    </motion.div>

                    {/* Card Container - 뷰포트 중앙 고정 배치 */}
                    {(() => {
                        // 카드 중심 좌표 계산 (뷰포트 중앙, 약간 위로)
                        const cardCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 512;
                        const cardCenterY = typeof window !== 'undefined' ? (window.innerHeight / 2) - 20 : 300;
                        const cardLeft = cardCenterX - CARD_CONFIG.width / 2;
                        const cardTop = cardCenterY - CARD_CONFIG.height / 2;

                        // 마스크 좌표: 마우스 위치를 카드 내부 상대 좌표로 변환
                        const maskX = mousePos.x - cardLeft;
                        const maskY = mousePos.y - cardTop;

                        return (
                            <>
                                {/* Beautiful Card (Base Layer) - 고정 위치 */}
                                <div
                                    className="fixed z-10"
                                    style={{
                                        width: CARD_CONFIG.width,
                                        height: CARD_CONFIG.height,
                                        left: cardLeft,
                                        top: cardTop,
                                    }}
                                >
                                    {renderBeautifulCard()}
                                </div>

                                {/* X-Ray Card (Masked Layer) - 고정 위치 */}
                                <div
                                    className="fixed z-20 pointer-events-none"
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

                    {/* Flashlight Glow - 뷰포트 기준 */}
                    <div
                        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
                        style={{
                            background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.15), transparent 70%)`,
                        }}
                    />

                    {/* Lens Ring - 뷰포트 기준 */}
                    <div
                        className="fixed pointer-events-none z-[60] w-[300px] h-[300px] border border-cyan-500/30 rounded-full"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 20px rgba(0, 243, 255, 0.1), inset 0 0 20px rgba(0, 243, 255, 0.1)'
                        }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-cyan-500 text-[10px] font-mono px-2">X-RAY LENS</div>
                        <div className="absolute inset-0 border-[20px] border-cyan-500/5 rounded-full" />
                    </div>

                    {/* Insight Acquired Button */}
                    <motion.div
                        className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[70]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                    >
                        <button
                            onClick={() => setPhase('revealed')}
                            className="bg-cyan-900/80 hover:bg-cyan-700 text-cyan-100 px-8 py-4 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(0,243,255,0.3)] border border-cyan-500/50 backdrop-blur-md transition-all flex items-center gap-3"
                        >
                            <span>INSIGHT ACQUIRED</span>
                            <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
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
