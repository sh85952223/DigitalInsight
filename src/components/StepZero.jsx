import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepZero_1 from './StepZero_1';
import StepZero_2 from './StepZero_2';
import StepZero_3 from './StepZero_3';

export default function StepZero({ onNext }) {
    // Phase: 1 -> 2 -> 3
    const [phase, setPhase] = useState(1);

    return (
        <motion.div
            className="w-full h-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <AnimatePresence mode="wait">
                {/* PART 1: Cover & Payment History (Past vs Present) */}
                {phase === 1 && (
                    <StepZero_1 key="step1" onComplete={() => setPhase(2)} />
                )}

                {/* PART 2: Friction Loss (Dark Pattern Popups) */}
                {phase === 2 && (
                    <StepZero_2 key="step2" onComplete={() => setPhase(3)} />
                )}

                {/* PART 3: Agent Awakening (X-Ray Lens) */}
                {phase === 3 && (
                    <StepZero_3 key="step3" onNext={onNext} />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
