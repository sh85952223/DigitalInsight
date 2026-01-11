import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HudContainer from './HudContainer';
import GlitchText from './GlitchText';

const directives = [
    {
        id: '01',
        role: '설계자',
        title: '앱 접속',
        desc: '배달 앱을 실행하고 주문 직전 단계까지 접속하라.',
        deco: 'LOGIN'
    },
    {
        id: '02',
        role: '피험자',
        title: '감각 차단',
        desc: '눈을 감고 손을 내밀어라. 시각 정보를 차단하라.',
        deco: 'BLIND'
    },
    {
        id: '03',
        role: '설계자',
        title: '디바이스 전달',
        desc: '피험자의 손에 조용히 스마트폰을 올려두어라.',
        deco: 'TRANSFER'
    },
    {
        id: '04',
        role: '피험자',
        title: '본능적 행동',
        desc: '본능에 맡겨 \'주문하기\' 버튼의 위치를 터치하라.',
        deco: 'EXECUTE'
    }
];

export default function StepTwo({ onNext }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isNavigating = useRef(false);

    const handleNext = () => {
        if (isNavigating.current) return;

        isNavigating.current = true;
        setTimeout(() => {
            isNavigating.current = false;
        }, 1000); // 1-second throttle for safer interaction

        if (currentIndex < directives.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onNext();
        }
    };

    const currentDirective = directives[currentIndex];
    const isArchitect = currentDirective.role === '설계자';

    return (
        <motion.div
            className="w-full max-w-5xl flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
        >
            {/* Header - Made Brighter */}
            <div className="w-full flex justify-between items-end mb-8 border-b border-[var(--primary-cyan)]/40 pb-4">
                <div>
                    <h2 className="text-4xl font-display font-bold text-white glow-text-cyan">
                        <GlitchText text="작전 수행 방법" />
                    </h2>
                    <div className="text-base font-code text-[var(--primary-cyan)] mt-2">
                        2단계: 작전 수행
                    </div>
                </div>
                <div className="text-5xl font-display font-bold text-[var(--primary-cyan)] opacity-50">
                    0{currentIndex + 1}/04
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Side: Progress List - Enhanced Active State */}
                <div className="hidden lg:flex lg:col-span-4 flex-col gap-2">
                    {directives.map((d, idx) => {
                        const isActive = idx === currentIndex;
                        const isDone = idx < currentIndex;
                        const stepIsArchitect = d.role === '설계자';

                        return (
                            <div
                                key={d.id}
                                className={`p-5 border-l-4 transition-all duration-300 ${isActive
                                    ? `${stepIsArchitect ? 'border-[var(--primary-cyan)] bg-[var(--primary-cyan)]/20' : 'border-[var(--accent-red)] bg-[var(--accent-red)]/20'} pl-6`
                                    : isDone
                                        ? 'border-gray-600 bg-gray-800/30 opacity-50'
                                        : 'border-gray-700/50 bg-transparent opacity-40'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-code ${isActive ? (stepIsArchitect ? 'text-[var(--primary-cyan)]' : 'text-[var(--accent-red)]') : 'text-gray-500'}`}>
                                        단계 {d.id}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${stepIsArchitect
                                        ? isActive ? 'bg-[var(--primary-cyan)]/30 text-[var(--primary-cyan)]' : 'bg-gray-700/50 text-gray-500'
                                        : isActive ? 'bg-[var(--accent-red)]/30 text-[var(--accent-red)]' : 'bg-gray-700/50 text-gray-500'
                                        }`}>
                                        {d.role}
                                    </span>
                                </div>
                                <div className={`font-display font-bold text-xl ${isActive
                                    ? 'text-white'
                                    : 'text-gray-500'
                                    }`}>
                                    {d.title}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Side: Active Card */}
                <div className="col-span-1 lg:col-span-8 h-[420px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="h-full"
                        >
                            <HudContainer
                                title={currentDirective.role}
                                type={isArchitect ? 'cyan' : 'red'}
                                className="h-full flex flex-col justify-between"
                                largeTitle={true}
                            >
                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-center px-4">
                                    <div className="text-6xl mb-6 opacity-15 font-display font-black absolute top-10 right-10 pointer-events-none">
                                        {currentDirective.deco}
                                    </div>

                                    <h3 className={`text-4xl font-display font-bold mb-8 ${isArchitect ? 'text-[var(--primary-cyan)]' : 'text-[var(--accent-red)]'}`}>
                                        {currentDirective.title}
                                    </h3>

                                    <p className="text-2xl leading-relaxed font-light font-ui text-gray-200">
                                        "{currentDirective.desc}"
                                    </p>
                                </div>

                                {/* Footer Controls */}
                                <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-4">
                                    <div className="text-xs font-code opacity-50">
                                        실행 확인 대기중...
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className={`px-8 py-3 text-lg font-bold font-display tracking-wider transition-all border ${isArchitect
                                            ? 'text-[var(--primary-cyan)] border-[var(--primary-cyan)] hover:bg-[var(--primary-cyan)] hover:text-black'
                                            : 'text-[var(--accent-red)] border-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-black'
                                            }`}
                                    >
                                        {currentIndex < directives.length - 1 ? '다음 지시 >>' : '임무 완료 >>'}
                                    </button>
                                </div>

                            </HudContainer>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
