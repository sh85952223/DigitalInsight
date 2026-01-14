import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';

// 에셋
import bgImage from '../assets/medieval_cafe.jpg';
import menuImage from '../assets/menu_book.jpg';
import rugImage from '../assets/ancient_rug.jpg';
import chandelierImage from '../assets/chandelier.png';
import shopkeeperImage from '../assets/shopkeeper.png'; // PNG
import agentImage from '../assets/agent_instructor.png'; // New Agent Image

export default function StepFiveMedieval({ onNext }) {
    const [phase, setPhase] = useState('prologue'); // prologue -> transition_in -> entry -> explore -> experience -> agent_reveal
    const [dialogue, setDialogue] = useState(null);
    const [inspectedItems, setInspectedItems] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);

    // Agent Reveal specific states
    const [glitchIntensity, setGlitchIntensity] = useState(0);
    const [currentSpeakerImg, setCurrentSpeakerImg] = useState(shopkeeperImage);
    const [isSnapEffect, setIsSnapEffect] = useState(false);

    // --- PHASE MANAGEMENT ---
    useEffect(() => {
        if (phase === 'transition_in') {
            const timer = setTimeout(() => {
                setPhase('entry');
                setDialogue({
                    speaker: "점원",
                    text: "딸랑~ (종소리)\n\n어서 오세요, 여행자님! 바깥 날씨가 많이 춥죠? \n따뜻한 난로가 있는 안쪽 자리로 안내해 드릴게요.",
                    actionLabel: "안내에 따라 이동하기",
                    onAction: () => {
                        // [NEW] 내 마음 속 생각 추가
                        setDialogue({
                            speaker: "나",
                            text: "(중세 분위기 나는 카페 정말 와보고 싶었는데! 진짜 중세처럼 연기해주시니까 느낌 완전 사네~)",
                            actionLabel: "안쪽으로 이동하기",
                            onAction: () => {
                                // 페이드 아웃 효과 후 explore로 전환
                                setDialogue(null); // 대화창 숨김
                                setTimeout(() => {
                                    setPhase('explore');
                                }, 500);
                            }
                        });
                    }
                });
            }, 3500); // 3.5초간 진입 연출
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // 아이템 다 찾았을 때 효과 (자동진행 X)
    const allItemsFound = inspectedItems.includes('menu') && inspectedItems.includes('chandelier') && inspectedItems.includes('rug');

    // --- HANDLERS ---
    const handleInspect = (item) => {
        if (phase !== 'explore') return;

        if (!inspectedItems.includes(item)) {
            setInspectedItems(prev => [...prev, item]);
        }

        if (item === 'menu') {
            setShowOverlay(menuImage);
            setDialogue({
                speaker: "나",
                text: "(메뉴판을 집어 든다)\n와, 가죽 커버의 질감이 고급스럽고 캘리그라피 글씨가 정말 멋지네!\n마치 예술 작품 같아.",
                actionLabel: "닫기",
                onAction: () => { setShowOverlay(null); setDialogue(null); }
            });
        } else if (item === 'chandelier') {
            setShowOverlay(chandelierImage);
            setDialogue({
                speaker: "나",
                text: "(천장을 올려다본다)\n진짜 촛불인가? 은은한 촛불 샹들리에가 카페 전체를 따뜻하게 감싸고 있어.\n너무 화려하지 않고 인테리어에 잘 녹아들었네.",
                actionLabel: "시선 거두기",
                onAction: () => { setShowOverlay(null); setDialogue(null); }
            });
        } else if (item === 'rug') {
            setShowOverlay(rugImage);
            setDialogue({
                speaker: "나",
                text: "(바닥을 내려다본다)\n오래된 양탄자같은 문양이나 색감이 중세 카페 분위기랑 찰떡이야.\n공간을 꽉 채워주는 느낌이군.",
                actionLabel: "시선 거두기",
                onAction: () => { setShowOverlay(null); setDialogue(null); }
            });
        }
    };

    const startExperience = () => {
        setPhase('experience');

        const sequence = async () => {
            setDialogue({
                speaker: "가이드",
                text: "그럼 이제 주문을 해볼까요? 메뉴판을 다시 자세히 봐주세요.",
                actionLabel: null
            });
            await new Promise(r => setTimeout(r, 2000));

            setDialogue(null); // Fade out guide text
            await new Promise(r => setTimeout(r, 500));

            setShowOverlay(menuImage); // Fade in Menu Image
            await new Promise(r => setTimeout(r, 800)); // Wait for fade in

            setDialogue({
                speaker: "나",
                text: "어...? 글씨가 너무 꼬불꼬불해서 뭐라고 쓴 건지 하나도 모르겠네.\n보기엔 예뻤는데 읽기는 너무 불편하다...",
                actionLabel: "메뉴판 내려놓기",
                onAction: async () => {
                    // 1. Close Menu first
                    setShowOverlay(null);
                    setDialogue(null); // Clear dialogue momentarily to show the scene

                    // 2. Pause to let user seeing the rug/scene
                    await new Promise(r => setTimeout(r, 2000));

                    // 3. Show Rug Overlay (Optional) or just Dialogue about it
                    setDialogue({
                        speaker: "나",
                        text: "하지만 발에 닿는 양탄자의 감촉은 정말 푹신하고 따뜻해.\n차가웠던 몸이 녹는 기분이야... 계속 머물고 싶어.",
                        actionLabel: "계속 머무르기...",
                        onAction: () => startAcronymLab() // Trigger Acronym Lab
                    });
                }
            });
        };
        sequence();
    };

    // --- ACRONYM LAB SEQUENCE (Restored) ---
    const startAcronymLab = () => {
        setPhase('acronym_lab');
        setDialogue(null);
        setShowOverlay(null);
    };

    // Acronym Lab Render Logic
    const AcronymLab = () => {
        const [step, setStep] = useState(0); // 0: Start, 1: U, 2: I, 3: X, 4: Combine, 5: End

        useEffect(() => {
            if (step === 0) {
                setTimeout(() => setStep(1), 1000);
            }
        }, [step]);

        // Handlers for manual progression
        const nextStep = () => {
            if (step < 4) setStep(step + 1);
            else {
                // End of Lab -> Trigger Agent Reveal
                startAgentReveal();
            }
        };

        return (
            <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
                {/* Background Dim */}
                <div className="absolute inset-0 bg-neutral-900 opacity-90"></div>

                {/* Content Container */}
                <div className="relative z-10 text-center max-w-4xl px-8">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: U (User) */}
                        {step === 1 && (
                            <motion.div
                                key="u"
                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-9xl font-black text-cyan-500 mb-4 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)] font-mono">U</div>
                                <h2 className="text-4xl font-bold mb-6 font-display">User <span className="text-gray-400 text-2xl">(사용자)</span></h2>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-ui">
                                    서비스나 제품을 이용하는 <span className="text-white font-bold">주체</span>.<br />
                                    방금 카페에서 메뉴를 보고, 샹들리에를 보고, 양탄자를 느꼈던<br />
                                    <span className="text-cyan-400 font-bold border-b border-cyan-500">바로 당신</span>입니다.
                                </p>
                                <button onClick={nextStep} className="mt-12 px-8 py-3 bg-cyan-900/50 hover:bg-cyan-800 border border-cyan-500 rounded text-cyan-300 transition-all font-bold">
                                    다음 (Next) ▶
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 2: I (Interface) */}
                        {step === 2 && (
                            <motion.div
                                key="i"
                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-9xl font-black text-violet-500 mb-4 drop-shadow-[0_0_30px_rgba(139,92,246,0.6)] font-mono">I</div>
                                <h2 className="text-4xl font-bold mb-6 font-display">Interface <span className="text-gray-400 text-2xl">(접점)</span></h2>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-ui">
                                    사용자와 시스템이 만나는 <span className="text-white font-bold">경계</span>.<br />
                                    <span className="text-violet-400 font-bold">예쁜 메뉴판 글씨</span>, <span className="text-violet-400 font-bold">화려한 샹들리에</span> 등<br />
                                    눈에 보이는 모든 <span className="font-bold border-b border-violet-500">디자인 요소</span>들입니다.
                                </p>
                                <button onClick={nextStep} className="mt-12 px-8 py-3 bg-violet-900/50 hover:bg-violet-800 border border-violet-500 rounded text-violet-300 transition-all font-bold">
                                    다음 (Next) ▶
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 3: X (Experience) */}
                        {step === 3 && (
                            <motion.div
                                key="x"
                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-9xl font-black text-green-500 mb-4 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] font-mono">X</div>
                                <h2 className="text-4xl font-bold mb-6 font-display">Experience <span className="text-gray-400 text-2xl">(경험)</span></h2>
                                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl font-ui">
                                    사용자가 디자인을 통해 얻는 <span className="text-white font-bold">경험</span>.<br />
                                    메뉴판이 <span className="font-bold text-red-400">읽기 어려웠던 불편함</span>,<br />
                                    양탄자가 <span className="font-bold text-green-400">따뜻했던 편안함</span>.<br />
                                    그 <span className="font-bold border-b border-green-500">모든 감정과 기억</span>입니다.
                                </p>
                                <button onClick={nextStep} className="mt-12 px-8 py-3 bg-green-900/50 hover:bg-green-800 border border-green-500 rounded text-green-300 transition-all font-bold">
                                    다음 (Next) ▶
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 4: Summary (UI vs UX) */}
                        {step === 4 && (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="flex gap-12 mb-8 items-center">
                                    <div className="text-center">
                                        <div className="text-6xl font-black text-violet-500 mb-2">UI</div>
                                        <div className="text-sm text-gray-400">보이는 것 (Design)</div>
                                    </div>
                                    <div className="text-2xl text-gray-600 font-bold">vs</div>
                                    <div className="text-center">
                                        <div className="text-6xl font-black text-green-500 mb-2">UX</div>
                                        <div className="text-sm text-gray-400">느끼는 것 (Feeling)</div>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold mb-6 text-white font-display">
                                    "보여지는 디자인 설계(UI)와<br />느끼게 하는 경험(UX)의 설계."
                                </h2>
                                <button
                                    onClick={() => startAgentReveal()} // DIRECTLY START AGENT REVEAL HERE
                                    className="mt-8 px-10 py-4 bg-white text-black font-black text-xl hover:scale-105 transition-transform rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                >
                                    조금 더 파헤치기 ⚡
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    // --- AGENT REVEAL SEQUENCE (Refined) ---
    const startAgentReveal = async () => {
        // 1. Initial Glitch & Shopkeeper Vanish
        setPhase('agent_reveal');
        setDialogue(null);

        let intensity = 0;
        // Start Glitching
        const glitchInterval = setInterval(() => {
            intensity = Math.random() * 20; // Stronger glitch
            setGlitchIntensity(intensity);
        }, 50);

        // Fade out Shopkeeper while glitching
        await new Promise(r => setTimeout(r, 1000));
        setCurrentSpeakerImg(null); // Remove Shopkeeper
        setGlitchIntensity(0);
        clearInterval(glitchInterval);

        // 2. Brief Pause (Empty)
        await new Promise(r => setTimeout(r, 800));

        // 3. Agent Appear (Glitch In)
        setCurrentSpeakerImg(agentImage);

        // Short Glitch for entry
        const entryGlitch = setInterval(() => {
            setGlitchIntensity(Math.random() * 10);
        }, 50);

        await new Promise(r => setTimeout(r, 500));
        clearInterval(entryGlitch);
        setGlitchIntensity(0);

        // 4. Agent Dialogue 1
        setDialogue({
            speaker: "???",
            text: "놀라셨습니까, 요원?",
            actionLabel: "누...구세요?",
            onAction: async () => {
                setDialogue(null); // 잠시 숨김 (Pause)
                await new Promise(r => setTimeout(r, 600));

                setDialogue({
                    speaker: "교관",
                    text: "당신의 테스트를 지켜보는 선임 요원입니다. 디지털 환경, 특히 우리가 매일 쓰는 스마트폰에서 UI와 UX를 빼고 이야기 할 순 없습니다.\n요원으로 한 단계 성장을 위해 실제 APP에서도 살펴보죠.",
                    actionLabel: "다음",
                    onAction: async () => {
                        setDialogue(null); // 잠시 숨김 (Pause)
                        await new Promise(r => setTimeout(r, 600));

                        // 5. Final Line (Before Snap)
                        setDialogue({
                            speaker: "교관",
                            text: "(손가락을 딱 튕기며)\n이제 실제 같은 APP에서 UI와 UX를 직접 해부해 봅시다.",
                            actionLabel: "Snap! 🫰", // Trigger Snap
                            onAction: () => {
                                setDialogue(null);
                                setIsSnapEffect(true); // Flash

                                // 6. Auto Transition
                                setTimeout(() => {
                                    onNext(); // Go to Step 6 automatically
                                }, 800);
                            }
                        });
                    }
                });
            }
        });
    };


    // --- RENDER ---
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden font-ui">
            {/* Background Layer (Fades out on Snap) */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
                animate={{
                    opacity: isSnapEffect ? 0 : (phase === 'agent_reveal' || phase === 'acronym_lab' ? 0.3 : 1),
                    scale: isSnapEffect ? 1.5 : 1,
                    filter: (phase === 'explore' || phase === 'experience') ? 'blur(0px)' : 'blur(4px)'
                }}
                transition={{ duration: isSnapEffect ? 0.5 : 1.5 }}
            />

            {/* Snap Flash Effect */}
            {isSnapEffect && (
                <motion.div
                    className="absolute inset-0 bg-white z-[100]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}

            {/* Hint Text */}
            <AnimatePresence>
                {phase === 'explore' && !dialogue && !showOverlay && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-8 left-0 right-0 text-center z-30 pointer-events-none"
                    >
                        <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full inline-block border border-white/20">
                            <span className="text-gray-200">마우스를 움직여 곳곳에 숨겨진 물건들을 찾아보세요.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Objects Layer (Explore Mode Only) */}
            <AnimatePresence>
                {phase === 'explore' && !dialogue && !showOverlay && (
                    <>
                        {/* Interaction Cue Styles */}
                        <style>
                            {`
                                @keyframes pulse-strong {
                                    0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); transform: scale(1); }
                                    50% { transform: scale(1.1); }
                                    70% { box-shadow: 0 0 0 20px rgba(255, 215, 0, 0); }
                                    100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); transform: scale(1); }
                                }
                                .interaction-cue {
                                    animation: pulse-strong 1.5s infinite;
                                }
                            `}
                        </style>

                        {/* Chandelier Area */}
                        <motion.div
                            className="absolute top-[5%] left-[10%] w-80 h-64 cursor-pointer z-10 flex items-center justify-center group"
                            onClick={() => handleInspect('chandelier')}
                        >
                            <div className="absolute text-4xl animate-bounce drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">✨</div>
                            <div className="w-8 h-8 bg-yellow-400/50 rounded-full blur-sm interaction-cue group-hover:bg-yellow-200/80 transition-all duration-300" />
                        </motion.div>

                        {/* Menu Area */}
                        <motion.div
                            className="absolute bottom-[25%] right-[20%] w-48 h-32 cursor-pointer z-10 flex items-center justify-center group"
                            onClick={() => handleInspect('menu')}
                        >
                            <div className="absolute text-4xl animate-bounce delay-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">✨</div>
                            <div className="w-8 h-8 bg-cyan-400/50 rounded-full blur-sm interaction-cue group-hover:bg-cyan-200/80 transition-all duration-300" />
                        </motion.div>

                        {/* Rug Area */}
                        <motion.div
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 cursor-pointer z-10 flex items-center justify-center group"
                            onClick={() => handleInspect('rug')}
                        >
                            <div className="absolute text-4xl animate-bounce delay-200 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">✨</div>
                            <div className="w-8 h-8 bg-orange-400/50 rounded-full blur-sm interaction-cue group-hover:bg-orange-200/80 transition-all duration-300" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Overlays (Detail Images) */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="absolute inset-0 z-40 bg-black/80 flex items-center justify-center p-8"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <img src={showOverlay} alt="Detail" className="max-h-[80vh] max-w-[90vw] rounded shadow-2xl border border-amber-900 object-contain" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- ACRONYM LAB RENDER --- */}
            {phase === 'acronym_lab' && <AcronymLab />}

            {/* --- CHARACTER SPRITE --- */}
            <AnimatePresence>
                {/* Only show character in non-lab phases or valid speakers */}
                {phase !== 'acronym_lab' && currentSpeakerImg && (dialogue?.speaker === "점원" || dialogue?.speaker === "???" || dialogue?.speaker === "교관" || phase === 'agent_reveal') && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{
                            opacity: isSnapEffect ? 0 : 1,
                            x: glitchIntensity > 0 ? (Math.random() * 10 - 5) : 0,
                            scale: 1
                        }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-0 left-[2%] md:left-[5%] z-40 pointer-events-none origin-bottom-left"
                        style={{
                            filter: glitchIntensity > 0 ? `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 2}px)` : 'none'
                        }}
                    >
                        {/* Image */}
                        <img
                            src={currentSpeakerImg}
                            alt="Speaker"
                            className="max-h-[85vh] object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- DIALOGUE INTERFACE --- */}
            <AnimatePresence>
                {/* Hide dialogue during Acronym Lab */}
                {dialogue && phase !== 'acronym_lab' && phase !== 'transition_in' && !isSnapEffect && (
                    <motion.div
                        className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl border-2 rounded-xl p-6 z-50 shadow-2xl safe-area-bottom backdrop-blur-sm
                            ${(dialogue.speaker === "교관" || dialogue.speaker === "???") ? 'bg-slate-900/90 border-cyan-500' : 'bg-black/80 border-amber-800'}
                        `}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                    >
                        <div className="flex gap-6">
                            {/* Avatar / Speaker Name */}
                            <div className={`w-24 flex flex-col items-center justify-center border-r pr-6
                                ${(dialogue.speaker === "교관" || dialogue.speaker === "???") ? 'border-cyan-500/50' : 'border-amber-800/50'}
                            `}>
                                <div className={`font-bold font-display text-xl mb-2
                                    ${(dialogue.speaker === "교관" || dialogue.speaker === "???") ? 'text-cyan-400' : 'text-amber-500'}
                                `}>{dialogue.speaker}</div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="text-gray-200 text-lg leading-relaxed font-ui whitespace-pre-wrap min-h-[80px]">
                                    <Typewriter text={dialogue.text} speed={30} />
                                </div>

                                {dialogue.actionLabel && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={dialogue.onAction}
                                            className={`px-6 py-2 rounded border transition-colors flex items-center gap-2
                                                ${(dialogue.speaker === "교관" || dialogue.speaker === "???")
                                                    ? 'bg-cyan-900 hover:bg-cyan-800 text-cyan-100 border-cyan-600'
                                                    : 'bg-amber-900 hover:bg-amber-800 text-amber-100 border-amber-600'}
                                            `}
                                        >
                                            {dialogue.actionLabel} ▶
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Manual Next Button (appears when all items explored) */}
            <AnimatePresence>
                {phase === 'explore' && allItemsFound && !dialogue && !showOverlay && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setDialogue({
                            speaker: "가이드",
                            text: "훌륭한 관찰력입니다! \n이제 이 물건들을 직접 '경험'해볼 차례입니다.",
                            actionLabel: "경험 시작하기",
                            onAction: () => startExperience()
                        })}
                        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 px-8 py-3 bg-cyan-700/90 text-white font-bold rounded-full border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:bg-cyan-600 transition-all z-30 flex items-center gap-2"
                    >
                        <span>둘러보기 끝! (다음 단계로)</span>
                        <span className="animate-bounce">👉</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Prologue */}
            {phase === 'prologue' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black px-12 text-center pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-3xl"
                    >
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed font-ui">
                            방금 우리는 기업이 만든 <span className="text-cyan-400 font-bold">'디지털 환경 설계'</span>를 경험했습니다.
                        </p>
                        <p className="text-gray-200 text-2xl font-bold mb-12 leading-relaxed font-display">
                            그렇다면 도대체 <span className="text-cyan-400">UI</span>가 뭐고, <span className="text-green-400">UX</span>는 무엇일까요?<br />
                            그 의미를 알아보기 위해<br />
                            <span className="text-amber-500">분위기 좋은 어느 한 카페</span>로 떠나봅시다.
                        </p>
                        <button
                            onClick={() => setPhase('transition_in')}
                            className="px-8 py-3 bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all rounded text-lg font-bold font-ui"
                        >
                            순간 이동 하기...
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Transition Setup Overlay */}
            {phase === 'transition_in' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
                    <div className="glitch-effect text-cyan-500 font-code text-xl mb-4">
                        SYSTEM: Analyzing Digital Environment Origins...
                    </div>
                    <Typewriter
                        text="Beyond time and space…"
                        speed={50}
                        className="text-white font-display text-2xl tracking-widest"
                    />
                    <style>
                        {`
                            @keyframes glitch {
                                0% { transform: translate(0) }
                                20% { transform: translate(-2px, 2px) }
                                40% { transform: translate(-2px, -2px) }
                                60% { transform: translate(2px, 2px) }
                                80% { transform: translate(2px, -2px) }
                                100% { transform: translate(0) }
                            }
                            .glitch-effect {
                                animation: glitch 0.2s infinite;
                            }
                        `}
                    </style>
                </div>
            )}
        </div>
    );
}
