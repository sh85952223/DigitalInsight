import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';
import HudContainer from './HudContainer';
import Typewriter from './Typewriter';

// Import Sound Assets
import ambienceSoundAsset from '../assets/sounds/longmixkit-futuristic-sci-fi-computer-ambience-2507.wav';
import doorOpenSoundAsset from '../assets/sounds/mixkit-futuristic-door-open-183.mp3';

export default function StepOne({ onNext }) {
    // Audio Refs
    const ambienceAudioRef = useRef(null);
    const doorOpenAudioRef = useRef(null);

    // Initialize Audio on mount
    useEffect(() => {
        ambienceAudioRef.current = new Audio(ambienceSoundAsset);
        doorOpenAudioRef.current = new Audio(doorOpenSoundAsset);

        // Preload
        ambienceAudioRef.current.preload = 'auto';
        doorOpenAudioRef.current.preload = 'auto';
        ambienceAudioRef.current.load();
        doorOpenAudioRef.current.load();

        // Ambience settings - loop and low volume
        ambienceAudioRef.current.loop = true;
        ambienceAudioRef.current.volume = 0.7;
        doorOpenAudioRef.current.volume = 0.6;

        // Start playing ambience
        ambienceAudioRef.current.play().catch(() => { });

        return () => {
            if (ambienceAudioRef.current) {
                ambienceAudioRef.current.pause();
                ambienceAudioRef.current = null;
            }
            if (doorOpenAudioRef.current) {
                doorOpenAudioRef.current.pause();
                doorOpenAudioRef.current = null;
            }
        };
    }, []);

    const handleNextClick = () => {
        // Play door open sound
        if (doorOpenAudioRef.current) {
            doorOpenAudioRef.current.currentTime = 0;
            doorOpenAudioRef.current.play().catch(() => { });
        }
        // Stop ambience when leaving
        if (ambienceAudioRef.current) {
            ambienceAudioRef.current.pause();
        }
        // Small delay to let sound start
        setTimeout(() => onNext(), 100);
    };

    return (
        <motion.div
            className="w-full max-w-4xl flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
        >
            {/* Top Status Bar */}
            <div className="w-full flex justify-between items-center mb-12 text-xs font-code opacity-50">
                <span>시스템 상태: 온라인</span>
                <span>암호화: AES-256</span>
            </div>

            {/* Main Title Block */}
            <div className="mb-16 text-center w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center"
                >
                    {/* Full title with consistent glitch effect */}
                    <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 glow-text-cyan break-keep text-center leading-tight">
                        <GlitchText text="엄지 손가락은 이미 알고 있다" speed={25} />
                    </h1>
                    <div className="text-xl md:text-2xl font-ui font-bold tracking-wide text-cyan-400 mt-2">
                        [ 선택은 온전히 내가 한 것일까? ]
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Mission Brief */}
                <HudContainer title="임무 브리핑" largeTitle className="h-full min-h-[200px] flex flex-col justify-center">
                    <div className="text-lg md:text-xl leading-relaxed font-ui">
                        <div className="mb-4 text-cyan-300 font-bold opacity-80 font-code">
                            [ 1급 기밀 지령 ]
                        </div>
                        <Typewriter
                            text="요원들이여, 2인 1조로 팀을 이뤄라. 한 명은 '설계자(Architect)'가 되고, 한 명은 '피험자(Subject)'가 된다."
                            speed={30}
                            className="text-gray-200"
                        />
                    </div>
                </HudContainer>

                {/* Tactical Visual */}
                <HudContainer title="팀 구성도" largeTitle className="flex items-center justify-center min-h-[200px]">
                    <motion.svg
                        viewBox="0 0 200 120"
                        className="w-full max-w-[300px] drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]"
                    >
                        {/* Grid Background in SVG */}
                        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,243,255,0.2)" strokeWidth="0.5" />
                        </pattern>
                        <rect width="200" height="120" fill="url(#smallGrid)" />

                        {/* Agent Icons (Stylized & Larger) */}
                        <g transform="translate(40, 50)">
                            <circle r="18" fill="none" stroke="#00f3ff" strokeWidth="1.5" />
                            <circle r="5" fill="#00f3ff" />
                            <text y="35" textAnchor="middle" fill="#00f3ff" fontSize="12" className="font-code font-bold">설계자</text>
                        </g>

                        <path d="M 65 50 L 135 50" stroke="#00f3ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

                        <g transform="translate(160, 50)">
                            <circle r="18" fill="none" stroke="#ff2a2a" strokeWidth="1.5" />
                            <circle r="5" fill="#ff2a2a" />
                            <text y="35" textAnchor="middle" fill="#ff2a2a" fontSize="12" className="font-code font-bold">피험자</text>
                        </g>
                    </motion.svg>
                </HudContainer>
            </div>

            {/* Action Button */}
            <motion.button
                className="mt-16 group relative px-10 py-5 bg-transparent border border-[var(--primary-cyan)] overflow-hidden"
                onClick={handleNextClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Button Background Slide */}
                <div className="absolute inset-0 bg-[var(--primary-cyan)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                {/* Button Text */}
                <span className="relative z-10 font-display font-bold text-2xl tracking-widest text-[var(--primary-cyan)] group-hover:text-black transition-colors duration-300">
                    작전 개시
                </span>

                {/* Decorative glimmers */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--primary-cyan)]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[var(--primary-cyan)]" />
            </motion.button>

        </motion.div>
    );
}
