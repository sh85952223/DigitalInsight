import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HudContainer from './HudContainer';

const QuizStage2 = ({ onComplete }) => {
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

export default QuizStage2;
