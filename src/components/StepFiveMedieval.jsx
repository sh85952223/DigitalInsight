import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';

// 에셋 (실제 경로가 맞는지 확인 필요)
import bgImage from '../assets/medieval_cafe.jpg';
import menuImage from '../assets/menu_book.jpg';
import rugImage from '../assets/ancient_rug.jpg';
import chandelierImage from '../assets/chandelier.png';

export default function StepFiveMedieval({ onNext }) {
    const [phase, setPhase] = useState('prologue'); // prologue -> transition_in -> entry -> explore...
    const [dialogue, setDialogue] = useState(null);
    const [inspectedItems, setInspectedItems] = useState([]); // 'menu', 'chandelier', 'rug'
    const [showOverlay, setShowOverlay] = useState(false);

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
                        // 페이드 아웃 효과 후 explore로 전환
                        setDialogue(null); // 대화창 숨김
                        setTimeout(() => {
                            setPhase('explore');
                        }, 500);
                    }
                });
            }, 3500); // 3.5초간 진입 연출
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // 아이템 다 찾았을 때 효과 (자동진행 X, 버튼 표시용 상태 업데이트 등은 렌더링에서 처리)
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
                text: "(천장을 올려다본다)\n은은한 촛불 샹들리에가 카페 전체를 따뜻하게 감싸고 있어.\n너무 화려하지 않고 아늑한 느낌이야.",
                actionLabel: "시선 거두기",
                onAction: () => { setShowOverlay(null); setDialogue(null); }
            });
        } else if (item === 'rug') {
            setShowOverlay(rugImage);
            setDialogue({
                speaker: "나",
                text: "(바닥을 내려다본다)\n오래된 양탄자인데 문양이나 색감이 카페 분위기랑 찰떡이야.\n공간을 꽉 채워주는 느낌이네.",
                actionLabel: "일어나기",
                onAction: () => { setShowOverlay(null); setDialogue(null); }
            });
        }
    };

    const startExperience = () => {
        setPhase('conclusion');

        const sequence = async () => {
            setDialogue({
                speaker: "가이드",
                text: "그럼 이제 주문을 해볼까요? 메뉴판을 다시 자세히 봐주세요.",
                actionLabel: null
            });
            await new Promise(r => setTimeout(r, 4000));

            setShowOverlay(menuImage);
            setDialogue({
                speaker: "나",
                text: "어...? 글씨가 너무 꼬불꼬불해서 뭐라고 쓴 건지 하나도 모르겠네.\n보기엔 예뻤는데 읽기는 너무 불편하다...",
                actionLabel: "메뉴판 내려놓기",
                onAction: async () => {
                    setShowOverlay(null);
                    setDialogue({
                        speaker: "나",
                        text: "하지만 발에 닿는 양탄자의 감촉은 정말 푹신하고 따뜻해.\n차가웠던 몸이 녹는 기분이야... 계속 머물고 싶어.",
                        actionLabel: "깨달음 얻기",
                        onAction: () => setPhase('acronym_lab')
                    });
                }
            });
        };
        sequence();
    };

    useEffect(() => {
        if (phase === 'experience') {
            startExperience();
        }
    }, [phase]);


    // --- RENDER ---
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden font-ui">
            {/* Background Layer */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: phase === 'acronym_lab' ? 0.2 : 1,
                    scale: 1,
                    // explore 단계에서는 선명하게, 그 외에는 약간 흐리게
                    filter: (phase === 'explore' || phase === 'experience') ? 'blur(0px) brightness(1)' : 'blur(4px) brightness(0.6)'
                }}
                transition={{ duration: 1.5 }}
            />

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

                        {/* Chandelier Area (Top Left) */}
                        <motion.div
                            className="absolute top-[5%] left-[10%] w-80 h-64 cursor-pointer z-10 flex items-center justify-center group"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => handleInspect('chandelier')}
                        >
                            {/* Dramatic Glow & Icon */}
                            <div className="absolute text-4xl animate-bounce drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">✨</div>
                            <div className="w-8 h-8 bg-yellow-400/50 rounded-full blur-sm interaction-cue group-hover:bg-yellow-200/80 transition-all duration-300" />
                            <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-yellow-500/20 rounded-full blur-3xl transition-colors duration-500" />
                        </motion.div>

                        {/* Menu Area (Right Table) */}
                        <motion.div
                            className="absolute bottom-[25%] right-[20%] w-48 h-32 cursor-pointer z-10 flex items-center justify-center group"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => handleInspect('menu')}
                        >
                            <div className="absolute text-4xl animate-bounce delay-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">✨</div>
                            <div className="w-8 h-8 bg-cyan-400/50 rounded-full blur-sm interaction-cue group-hover:bg-cyan-200/80 transition-all duration-300" />
                            <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-lg blur-2xl transition-colors duration-500" />
                        </motion.div>

                        {/* Rug Area */}
                        <motion.div
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 cursor-pointer z-10 flex items-center justify-center group"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => handleInspect('rug')}
                        >
                            <div className="absolute text-4xl animate-bounce delay-200 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">✨</div>
                            <div className="w-8 h-8 bg-orange-400/50 rounded-full blur-sm interaction-cue group-hover:bg-orange-200/80 transition-all duration-300" />
                            <div className="absolute inset-0 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-full blur-2xl transition-colors duration-500" />
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
                        {/* 이미지 크기 조절: 샹들리에/메뉴판/러그에 따라 다르게 할 수도 있으나 일단 최대 크기 제한 */}
                        <img src={showOverlay} alt="Detail" className="max-h-[80vh] max-w-[90vw] rounded shadow-2xl border border-amber-900 object-contain" />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Dialogue Interface */}
            <AnimatePresence>
                {dialogue && phase !== 'acronym_lab' && phase !== 'transition_in' && (
                    <motion.div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-black/80 border-2 border-amber-800 rounded-xl p-6 z-50 shadow-2xl safe-area-bottom"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                    >
                        <div className="flex gap-6">
                            {/* Avatar / Speaker Name */}
                            <div className="w-24 flex flex-col items-center justify-center border-r border-amber-800/50 pr-6">
                                <div className="text-amber-500 font-bold font-display text-xl mb-2">{dialogue.speaker}</div>
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
                                            className="px-6 py-2 bg-amber-900 hover:bg-amber-800 text-amber-100 rounded border border-amber-600 transition-colors flex items-center gap-2"
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
                            onAction: () => setPhase('experience')
                        })}
                        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 px-8 py-3 bg-cyan-700/90 text-white font-bold rounded-full border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:bg-cyan-600 transition-all z-30 flex items-center gap-2"
                    >
                        <span>모든 관찰 완료! 다음 단계로</span>
                        <span className="animate-bounce">👉</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Prologue: Connectivity Narrative */}
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

            {/* --- PHASE: ACRONYM LAB (Educational Ending) --- */}
            {phase === 'acronym_lab' && (
                <AcronymLabModule onNext={onNext} />
            )}
        </div>
    );
}

// --- SUB-COMPONENT: Acronym Lab ---
function AcronymLabModule({ onNext }) {
    const [step, setStep] = useState(0); // 0: Intro, 1: U, 2: I, 3: X, 4: Final
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Prevent accidental clicks by delaying button appearance
        const timer = setTimeout(() => setShowButton(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 text-center">
            {step === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <h2 className="text-4xl font-bold text-white mb-6 font-display">
                        <span className="text-cyan-400">UI</span>와 <span className="text-green-400">UX</span>의 조화
                    </h2>
                    <p className="text-gray-300 text-xl mb-8 leading-relaxed">
                        여행은 즐거우셨나요?<br />
                        방금 경험한 것들을 <span className="font-bold text-amber-500">용어로 정리</span>해봅시다.
                    </p>

                    <div className="h-16 flex items-center justify-center">
                        <AnimatePresence>
                            {showButton && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => setStep(1)}
                                    className="px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors shadow-lg hover:shadow-cyan-500/30"
                                >
                                    정리 시작하기
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            <div className={`flex gap-4 items-center justify-center transition-all duration-500 ${step > 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                {/* U */}
                <motion.div
                    layout
                    className={`w-40 h-52 rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-colors ${step >= 1 ? 'bg-blue-900/40 border-blue-400' : 'bg-gray-900/40 border-gray-700 opacity-30'}`}
                >
                    <div className="text-5xl font-black mb-2 text-white">U</div>
                    <div className="text-blue-300 font-bold text-sm">USER</div>
                    <div className="mt-2 text-xs text-gray-300">
                        카페를 방문한<br /><strong className="text-white text-base">여행자 (나)</strong>
                    </div>
                </motion.div>

                {/* I */}
                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className={`w-40 h-52 rounded-2xl border-2 flex flex-col items-center justify-center p-4 bg-cyan-900/40 border-cyan-400 transition-colors`}
                    >
                        <div className="text-5xl font-black mb-2 text-white">I</div>
                        <div className="text-cyan-300 font-bold text-sm">INTERFACE</div>
                        <div className="mt-2 text-xs text-gray-300">
                            눈으로 즐거운<br /><strong className="text-white text-base">조명과 메뉴판</strong>
                        </div>
                    </motion.div>
                )}

                {/* X */}
                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className={`w-40 h-52 rounded-2xl border-2 flex flex-col items-center justify-center p-4 bg-green-900/40 border-green-400 transition-colors`}
                    >
                        <div className="text-5xl font-black mb-2 text-white">X</div>
                        <div className="text-green-300 font-bold text-sm">EXPERIENCE</div>
                        <div className="mt-2 text-xs text-gray-300">
                            마음이 편안한<br /><strong className="text-white text-base">환대와 양탄자</strong>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="h-32 mt-12 flex items-center justify-center">
                {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xl font-bold text-blue-200 mb-4">"모든 디지털 환경의 중심은 사용자입니다."</p>
                        <button onClick={() => setStep(2)} className="text-white underline hover:text-blue-300 text-lg">다음: I (Interface) ▶</button>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xl font-bold text-cyan-200 mb-4">"UI는 사용자의 눈과 손이 닿는 아름다운 도구입니다."</p>
                        <button onClick={() => setStep(3)} className="text-white underline hover:text-cyan-300 text-lg">다음: X (Experience) ▶</button>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xl font-bold text-green-200 mb-4">"UX는 사용자가 느끼는 만족감과 추억입니다."</p>
                        <button onClick={() => setStep(4)} className="text-white underline hover:text-green-300 text-lg">결론 보기 ▶</button>
                    </motion.div>
                )}
                {step === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-2xl font-bold text-white mb-6">
                            "좋은 디지털 환경은<br />
                            <span className="text-cyan-400">보기에도 좋고(UI)</span>, <span className="text-green-400"> 쓰기에도 편해야(UX)</span> 합니다."
                        </p>
                        <button
                            onClick={onNext}
                            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                        >
                            UI와 UX 파헤쳐 보기
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
