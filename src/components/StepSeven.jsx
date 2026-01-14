import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

import QuizStage1 from './QuizStage1';
// import QuizStage2 from './QuizStage2'; // Removed on user request
import QuizStage2 from './QuizStage2';
import AgentCertificate from './AgentCertificate';

export default function StepSeven({ onNext, subStep = 0 }) {
    const [step, setStep] = useState(subStep);

    // Sync with external subStep prop if provided (for dev menu navigation)
    React.useEffect(() => {
        setStep(subStep);
    }, [subStep]);

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
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="w-full h-full"
                    >
                        <AgentCertificate onExit={onNext} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
