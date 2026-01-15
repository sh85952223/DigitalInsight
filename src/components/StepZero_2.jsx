import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import Sound Assets
import popAlertSoundAsset from '../assets/sounds/mixkit-message-pop-alert-2354.mp3';
import closeSoundAsset from '../assets/sounds/mixkit-mouse-click-close-1113.wav';
import confirmationSoundAsset from '../assets/sounds/mixkit-sci-fi-confirmation-914.wav';
import clickSoundAsset from '../assets/sounds/mixkit-interface-device-click-2577.wav';

export default function StepZero_2({ onComplete }) {
    // Friction Loss Phase - Pop-up Game State
    const [showReflection, setShowReflection] = useState(false);
    const [closedPopups, setClosedPopups] = useState(0);
    const [gamePopups, setGamePopups] = useState([
        { id: 1, visible: false, x: '15%', y: '20%', text: '🎁 FREE GIFT!', bg: 'bg-pink-500' },
        { id: 2, visible: false, x: '70%', y: '15%', text: '⚡ FLASH SALE!', bg: 'bg-yellow-400 text-black' },
        { id: 3, visible: false, x: '20%', y: '65%', text: '🔥 HOT DEAL!', bg: 'bg-red-500' },
        { id: 4, visible: false, x: '75%', y: '60%', text: '💰 SAVE 90%!', bg: 'bg-green-500' },
        { id: 5, visible: false, x: '45%', y: '25%', text: '⏰ HURRY UP!', bg: 'bg-orange-500' },
        // Added 5 more popups for chaos
        { id: 6, visible: false, x: '10%', y: '80%', text: '📉 STOCK LOW!', bg: 'bg-red-700' },
        { id: 7, visible: false, x: '85%', y: '40%', text: '💎 JACKPOT!', bg: 'bg-purple-600' },
        { id: 8, visible: false, x: '35%', y: '10%', text: '📬 NEWSLETTER', bg: 'bg-blue-500' },
        { id: 9, visible: false, x: '60%', y: '85%', text: '🔓 ACCESS!', bg: 'bg-green-600' },
        { id: 10, visible: false, x: '5%', y: '45%', text: '🚫 WAIT!', bg: 'bg-gray-800' },
    ]);
    const REQUIRED_CLOSES = 5; // Increased required closes for more friction

    // Audio Refs
    const popAlertAudioRef = useRef(null);
    const closeAudioRef = useRef(null);
    const confirmationAudioRef = useRef(null);
    const clickAudioRef = useRef(null);

    // Initialize Audio on mount
    useEffect(() => {
        popAlertAudioRef.current = new Audio(popAlertSoundAsset);
        closeAudioRef.current = new Audio(closeSoundAsset);
        confirmationAudioRef.current = new Audio(confirmationSoundAsset);
        clickAudioRef.current = new Audio(clickSoundAsset);

        // Preload all audio
        popAlertAudioRef.current.preload = 'auto';
        closeAudioRef.current.preload = 'auto';
        confirmationAudioRef.current.preload = 'auto';
        clickAudioRef.current.preload = 'auto';

        popAlertAudioRef.current.load();
        closeAudioRef.current.load();
        confirmationAudioRef.current.load();
        clickAudioRef.current.load();

        popAlertAudioRef.current.volume = 0.5;
        closeAudioRef.current.volume = 0.6;
        confirmationAudioRef.current.volume = 0.7;
        clickAudioRef.current.volume = 0.6;

        return () => {
            if (popAlertAudioRef.current) {
                popAlertAudioRef.current.pause();
                popAlertAudioRef.current = null;
            }
            if (closeAudioRef.current) {
                closeAudioRef.current.pause();
                closeAudioRef.current = null;
            }
            if (confirmationAudioRef.current) {
                confirmationAudioRef.current.pause();
                confirmationAudioRef.current = null;
            }
            if (clickAudioRef.current) {
                clickAudioRef.current.pause();
                clickAudioRef.current = null;
            }
        };
    }, []);

    return (
        <motion.div
            key="friction_loss"
            className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ perspective: '1000px' }}
        >
            {/* Dark Pattern Pop-ups - More & Bigger! */}

            {/* Pop-up 1: Price Badge - TOP LEFT */}
            <motion.div
                className="absolute top-[10%] left-[5%] z-30"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
            >
                <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-black text-3xl shadow-2xl">
                    Only $5.99*
                </div>
            </motion.div>

            {/* Pop-up 2: LAST CHANCE Starburst - TOP RIGHT */}
            <motion.div
                className="absolute top-[8%] right-[10%] z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
            >
                <div className="bg-black text-white px-10 py-10 font-black text-2xl text-center"
                    style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}>
                    LAST<br />CHANCE!
                </div>
            </motion.div>

            {/* Pop-up 3: Social Proof - BOTTOM LEFT */}
            <motion.div
                className="absolute bottom-[15%] left-[5%] z-30"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
            >
                <div className="bg-white text-black p-6 rounded-xl shadow-2xl">
                    <div className="text-5xl font-black">756</div>
                    <div className="text-lg text-gray-600">Items sold this hour!</div>
                    <button className="mt-3 w-full bg-black text-white py-3 font-bold text-lg rounded">BUY NOW</button>
                </div>
            </motion.div>

            {/* Pop-up 4: Timer - BOTTOM RIGHT */}
            <motion.div
                className="absolute bottom-[12%] right-[5%] z-30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
            >
                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-2xl">
                    <div className="text-sm font-bold text-yellow-200">⏰ LIMITED TIME:</div>
                    <div className="text-4xl font-black">21:39:23</div>
                    <button className="mt-3 w-full bg-black text-white py-3 font-bold text-lg rounded">GET 10% OFF</button>
                </div>
            </motion.div>

            {/* Pop-up 5: You Won - LEFT CENTER */}
            <motion.div
                className="absolute top-[30%] left-[3%] z-30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.3, type: "spring" }}
            >
                <div className="bg-blue-600 text-white p-5 rounded-xl shadow-2xl border-4 border-yellow-400">
                    <div className="text-2xl">😊 😊 😊</div>
                    <div className="text-3xl font-black">YOU WON!!</div>
                    <div className="text-yellow-300 text-2xl font-black">$100,000,000</div>
                    <button className="mt-3 bg-black text-white px-6 py-2 font-bold rounded">CLICK HERE</button>
                </div>
            </motion.div>

            {/* Pop-up 6: Visitor Badge - RIGHT CENTER */}
            <motion.div
                className="absolute top-[25%] right-[3%] z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.1, duration: 0.3 }}
            >
                <div className="bg-cyan-400 text-black px-6 py-4 rounded-2xl font-bold text-xl shadow-2xl">
                    🎉 You are the<br /><span className="text-3xl font-black">10,000th visitor!</span>
                </div>
            </motion.div>

            {/* Pop-up 7: Don't Miss Out Badge */}
            <motion.div
                className="absolute top-[18%] left-[25%] z-30"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.3 }}
            >
                <div className="bg-green-500 text-white px-5 py-3 rounded-lg font-black text-xl shadow-xl">
                    Don't miss out!
                </div>
            </motion.div>

            {/* Pop-up 8: The Best Offer */}
            <motion.div
                className="absolute top-[15%] right-[30%] z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.7, duration: 0.3, type: "spring" }}
            >
                <div className="bg-pink-500 text-white px-5 py-3 rounded-lg font-black text-xl shadow-xl">
                    ✨ The best offer!
                </div>
            </motion.div>

            {/* Pop-up 9: Friend Invite */}
            <motion.div
                className="absolute bottom-[35%] right-[20%] z-30"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3, duration: 0.4 }}
            >
                <div className="bg-green-400 text-black p-5 rounded-xl shadow-2xl">
                    <div className="text-lg font-bold">Your friend invited you</div>
                    <div className="text-sm text-gray-700">and 10K others to join us!</div>
                    <button className="mt-3 w-full bg-cyan-500 text-white py-2 font-bold rounded">JOIN US</button>
                </div>
            </motion.div>

            {/* Pop-up 10: Only $8.99 */}
            <motion.div
                className="absolute top-[5%] right-[45%] z-30"
                initial={{ opacity: 0, rotate: 15 }}
                animate={{ opacity: 1, rotate: 10 }}
                transition={{ delay: 3.3, duration: 0.3 }}
            >
                <div className="bg-yellow-300 text-black px-5 py-2 rounded-full font-black text-2xl shadow-xl">
                    Only $8.99
                </div>
            </motion.div>

            {/* Pop-up 11: Shame Button Modal */}
            <motion.div
                className="absolute bottom-[30%] left-[25%] z-30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.6, duration: 0.4 }}
            >
                <div className="bg-white text-black p-4 rounded-lg shadow-2xl text-center">
                    <button className="w-full bg-pink-500 text-white py-3 px-6 font-bold text-lg rounded mb-2">GET 10% OFF</button>
                    <div className="text-gray-500 text-sm underline cursor-pointer">No, I Don't Want to Save Money.</div>
                </div>
            </motion.div>

            {/* Pop-up 12: Only $1.99 */}
            <motion.div
                className="absolute bottom-[8%] left-[30%] z-30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.9, duration: 0.3 }}
            >
                <div className="bg-yellow-400 text-black px-5 py-2 rounded-full font-black text-2xl shadow-xl">
                    Only $1.99*
                </div>
            </motion.div>

            {/* === TAPES: CREATING 'X' SHAPE === */}

            {/* TAPE 1: RED (Steeper tilt: -8deg) */}
            <motion.div
                className="absolute top-[45%] left-[-10%] w-[120vw] z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 py-6 -rotate-6 shadow-[0_0_30px_rgba(220,38,38,0.5)] border-y-4 border-white/20">
                    <motion.div
                        className="whitespace-nowrap flex"
                        animate={{ x: [0, -2000] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <span className="text-5xl font-black text-white tracking-widest mx-4 italic">
                            🔥 DON'T MISS OUT! — LIMITED TIME OFFER — ACT NOW — HURRY UP — DON'T MISS OUT! — LIMITED TIME OFFER — ACT NOW — HURRY UP — DON'T MISS OUT! — LIMITED TIME OFFER — ACT NOW — HURRY UP —
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            {/* TAPE 2: YELLOW (Opposite tilt: +8deg) */}
            <motion.div
                className="absolute top-[45%] left-[-10%] w-[120vw] z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 py-6 rotate-6 shadow-[0_0_30px_rgba(234,179,8,0.5)] border-y-4 border-black/20">
                    <motion.div
                        className="whitespace-nowrap flex"
                        animate={{ x: [-2000, 0] }} // Reverse direction
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                        <span className="text-5xl font-black text-black tracking-widest mx-4 italic">
                            ⚠️ WARNING: HIGH DEMAND — SELLING FAST — ONLY 2 LEFT — WARNING: HIGH DEMAND — SELLING FAST — ONLY 2 LEFT — WARNING: HIGH DEMAND — SELLING FAST — ONLY 2 LEFT —
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            {/* All pop-ups fade out */}
            <motion.div
                className="absolute inset-0 bg-black z-40 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0, 0, 1] }}
                transition={{ duration: 10, times: [0, 0.5, 0.7, 0.9, 1] }}
                onAnimationComplete={() => {
                    setShowReflection(true);

                    // Better Popup Sounds (Arcade/UI beeps)
                    const popupSounds = [
                        'https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3',
                        'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-back-2575.mp3',
                        'https://assets.mixkit.co/sfx/preview/mixkit-message-pop-alert-2354.mp3'
                    ];

                    // Start showing game popups one by one
                    gamePopups.forEach((popup, index) => {
                        setTimeout(() => {
                            setGamePopups(prev => prev.map(p =>
                                p.id === popup.id ? { ...p, visible: true } : p
                            ));

                            // Play pop alert sound
                            if (popAlertAudioRef.current) {
                                popAlertAudioRef.current.currentTime = 0;
                                popAlertAudioRef.current.play().catch(() => { });
                            }

                        }, 500 + (index * 400)); // Faster sequence for more popups
                    });
                }}
            />

            {/* REFLECTION QUESTION with CIRCULAR GAUGE */}
            {showReflection && closedPopups < REQUIRED_CLOSES && (
                <motion.div
                    className="absolute z-45 text-center px-8 flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                        편리하지만...<br />
                        <span className="text-cyan-400">무엇을 놓치고 있는 걸까?</span>
                    </h2>

                    {/* CIRCULAR GAUGE */}
                    <div className="relative w-32 h-32 mb-4">
                        {/* Background circle */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#1f2937"
                                strokeWidth="8"
                            />
                            {/* Progress circle */}
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#gaugeGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                                animate={{
                                    strokeDashoffset: 2 * Math.PI * 45 * (1 - closedPopups / REQUIRED_CLOSES),
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{
                                    filter: closedPopups > 0 ? 'drop-shadow(0 0 10px #06b6d4)' : 'none'
                                }}
                            />
                            <defs>
                                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#22d3ee" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Percentage text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                                className="text-2xl font-black text-cyan-400"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    textShadow: closedPopups > 0 ? ['0 0 0px #06b6d4', '0 0 20px #06b6d4', '0 0 10px #06b6d4'] : 'none'
                                }}
                                transition={{ duration: 0.3 }}
                                key={closedPopups}
                            >
                                {Math.round(closedPopups / REQUIRED_CLOSES * 100)}%
                            </motion.span>
                        </div>
                    </div>

                    {/* Glow effect when progress made */}
                    {closedPopups > 0 && (
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
                            transition={{ duration: 0.5 }}
                            style={{
                                background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)'
                            }}
                            key={`glow-${closedPopups}`}
                        />
                    )}


                </motion.div>
            )
            }

            {/* HINT POPUP - Center, closeable, appears after delay */}
            {
                showReflection && closedPopups === 0 && (
                    <motion.div
                        className="absolute z-50 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, type: "spring", duration: 0.5 }}
                    >
                        <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl shadow-2xl text-center">
                            <div className="flex items-start justify-between gap-4">
                                <span className="text-white text-lg">💡 팝업이 시야를 가리네요...</span>
                                <button
                                    onClick={() => {
                                        setClosedPopups(prev => prev + 1);
                                        // Close Sound
                                        if (closeAudioRef.current) {
                                            closeAudioRef.current.currentTime = 0;
                                            closeAudioRef.current.play().catch(() => { });
                                        }
                                    }}
                                    className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">버튼을 눌러 팝업을 닫으세요</p>
                        </div>
                    </motion.div>
                )
            }

            {/* POP-UP CLOSING GAME - Interactive popups appear over the message */}
            {
                showReflection && closedPopups < REQUIRED_CLOSES && gamePopups.map((popup) => (
                    popup.visible && (
                        <motion.div
                            key={popup.id}
                            className={`absolute z-50 ${popup.bg} p-6 rounded-xl shadow-2xl cursor-pointer hover:brightness-110`}
                            style={{ left: popup.x, top: popup.y }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl font-black text-white drop-shadow-md">{popup.text}</span>
                                <button
                                    onClick={() => {
                                        setGamePopups(prev => prev.map(p =>
                                            p.id === popup.id ? { ...p, visible: false } : p
                                        ));
                                        setClosedPopups(prev => prev + 1);

                                        // Play confirmation sound on last popup, else close sound
                                        if (closedPopups + 1 >= REQUIRED_CLOSES) {
                                            if (confirmationAudioRef.current) {
                                                confirmationAudioRef.current.currentTime = 0;
                                                confirmationAudioRef.current.play().catch(() => { });
                                            }
                                        } else {
                                            if (closeAudioRef.current) {
                                                closeAudioRef.current.currentTime = 0;
                                                closeAudioRef.current.play().catch(() => { });
                                            }
                                        }
                                    }}
                                    className="w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors border border-white/20"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="mt-2 text-sm text-white/90 font-medium">
                                Click to close!
                            </div>
                        </motion.div>
                    )
                ))
            }

            {/* KEY MESSAGE - Appears after closing enough popups */}
            {
                closedPopups >= REQUIRED_CLOSES && (
                    <>
                        {/* EXPLOSION EFFECT */}
                        <motion.div
                            className="absolute z-45 pointer-events-none"
                            initial={{ opacity: 1, scale: 0 }}
                            animate={{ opacity: [1, 1, 0], scale: [0, 2, 3] }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            onLayoutAnimationStart={() => {
                                // Mission complete confirmation sound
                                if (confirmationAudioRef.current) {
                                    confirmationAudioRef.current.currentTime = 0;
                                    confirmationAudioRef.current.play().catch(() => { });
                                }
                            }}
                        >
                            <div
                                className="w-64 h-64 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.3) 40%, transparent 70%)'
                                }}
                            />
                        </motion.div>

                        {/* Burst particles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute z-45 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none"
                                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                animate={{
                                    opacity: 0,
                                    scale: 0,
                                    x: Math.cos(i * Math.PI / 4) * 200,
                                    y: Math.sin(i * Math.PI / 4) * 200
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        ))}

                        {/* Screen flash */}
                        <motion.div
                            className="absolute inset-0 bg-cyan-500 z-44 pointer-events-none"
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Key Message */}
                        <motion.div
                            className="absolute z-50 text-center"
                            initial={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
                                불편함이 사라진 자리에,<br />
                                <span className="text-cyan-400">'신중함'</span>도 사라졌다.
                            </h2>
                            <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
                                우리에게 필요한 건 바로, <span className="text-white border-b-2 border-cyan-500 pb-1 font-bold">생각할 시간</span>
                            </p>

                            <motion.button
                                onClick={() => {
                                    // Play click sound
                                    if (clickAudioRef.current) {
                                        clickAudioRef.current.currentTime = 0;
                                        clickAudioRef.current.play().catch(() => { });
                                    }
                                    // Small delay to ensure sound plays before transition
                                    setTimeout(() => onComplete(), 100);
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.5 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,243,255,0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-white text-black font-black text-2xl rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-cyan-50 transition-all uppercase tracking-widest"
                            >
                                CONTINUE &rarr;
                            </motion.button>
                        </motion.div>
                    </>
                )
            }
        </motion.div >
    );
}
