import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StepZero_3({ onNext }) {
    // Agent Awakening Phase State
    const [xRayMode, setXRayMode] = useState(false);
    const [insightRevealed, setInsightRevealed] = useState(false);

    return (
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
                        {/* This layer is fixed overlay for perfect alignment */}
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
                    </div>

                    {/* Bottom Action Button - Insight Acquired */}
                    <motion.div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[70]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3 }}
                    >
                        <button
                            onClick={() => setInsightRevealed(true)}
                            className="bg-cyan-900/80 hover:bg-cyan-700 text-cyan-100 px-8 py-4 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(0,243,255,0.3)] border border-cyan-500/50 backdrop-blur-md transition-all flex items-center gap-3 group"
                        >
                            <span>INSIGHT ACQUIRED</span>
                            <span className="bg-cyan-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
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
    );
}
