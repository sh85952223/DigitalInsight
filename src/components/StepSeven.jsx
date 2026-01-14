import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

import QuizStage1 from './QuizStage1';
// import QuizStage2 from './QuizStage2'; // Removed on user request
import QuizStage2 from './QuizStage2';

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
                        <GlitchText text="FINAL EXAM" className="text-9xl font-black text-cyan-400 mb-4" />
                        <motion.div
                            initial={{ width: 0 }} animate={{ width: 200 }}
                            className="h-1 bg-cyan-500 mb-8"
                        />
                        <p className="text-gray-400 text-3xl font-semibold">
                            마지막 관문을 통과하고 정식 요원의 자격을 얻어라.
                        </p>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div key="st1" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <QuizStage1 onComplete={() => setStep(2)} />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="st2" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <QuizStage2 onComplete={() => setStep(3)} />
                    </motion.div>
                )}

                {step === 3 && (
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

                        <button onClick={onNext} className="mt-8 px-6 py-3 rounded-full border border-white/20 text-white/50 hover:bg-white hover:text-black transition-all">
                            EXIT
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
