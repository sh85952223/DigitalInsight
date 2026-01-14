import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUIZ_DATA = [
    { id: 1, text: "Button Color", category: "UI", hint: "Visual Element" },
    { id: 2, text: "User Satisfaction", category: "UX", hint: "Emotional Response" },
    { id: 3, text: "Page Layout", category: "UI", hint: "Structural Design" },
    { id: 4, text: "Load Time", category: "UX", hint: "Performance Feel" },
    { id: 5, text: "Icon Shape", category: "UI", hint: "Graphical Asset" },
];

const QuizStage3 = ({ onComplete }) => {
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

export default QuizStage3;
