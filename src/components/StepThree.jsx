import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HudContainer from './HudContainer';
import GlitchText from './GlitchText';
import Typewriter from './Typewriter';

export default function StepThree({ onNext, onRecordResult }) {
    const [status, setStatus] = useState('IDLE'); // IDLE, PROCESSING, RESULT
    const [resultType, setResultType] = useState(null);

    const handleChoice = (choice) => {
        onRecordResult(choice);
        setResultType(choice);
        setStatus('PROCESSING');

        // Simulate processing time
        setTimeout(() => {
            setStatus('RESULT');
        }, 2500);
    };

    return (
        <motion.div
            className="w-full max-w-4xl flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="mb-12 text-center">
                <div className="text-xs font-code trackling-widest text-[var(--accent-red)] mb-2 animate-pulse">
                    ● 기록 중...
                </div>
                <h2 className="text-4xl font-display font-bold glow-text-cyan mb-4">
                    데이터 로그
                </h2>
                <p className="font-ui text-xl text-gray-400">
                    피험자의 터치 좌표와 실제 버튼 좌표를 비교하십시오.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {status === 'IDLE' && (
                    <motion.div
                        key="idle"
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        {/* MATCH Button */}
                        <button
                            onClick={() => handleChoice('match')}
                            className="group relative h-48 border border-[var(--primary-cyan)] bg-[var(--panel-bg)] hover:bg-[var(--primary-cyan)]/10 transition-all duration-300"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                <div className="w-16 h-16 border-2 border-[var(--primary-cyan)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <div className="w-2 h-2 bg-[var(--primary-cyan)] rounded-full" />
                                </div>
                                <div className="text-2xl font-display font-bold text-[var(--primary-cyan)]">정확히 일치</div>
                                <div className="text-sm font-code text-gray-500 mt-2">PRECISE_HIT</div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 bg-[var(--primary-cyan)]" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--primary-cyan)]" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[var(--primary-cyan)]" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[var(--primary-cyan)]" />
                        </button>

                        {/* MISS Button */}
                        <button
                            onClick={() => handleChoice('miss')}
                            className="group relative h-48 border border-[var(--accent-red)] bg-[var(--panel-bg)] hover:bg-[var(--accent-red)]/10 transition-all duration-300"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                <div className="w-16 h-16 border-2 border-[var(--accent-red)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative">
                                    <div className="absolute w-full h-[1px] bg-[var(--accent-red)] rotate-45" />
                                    <div className="absolute w-full h-[1px] bg-[var(--accent-red)] -rotate-45" />
                                </div>
                                <div className="text-2xl font-display font-bold text-[var(--accent-red)]">위치 빗나감</div>
                                <div className="text-sm font-code text-gray-500 mt-2">OFFSET_DETECTED</div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 bg-[var(--accent-red)]" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--accent-red)]" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[var(--accent-red)]" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[var(--accent-red)]" />
                        </button>
                    </motion.div>
                )}

                {status === 'PROCESSING' && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center w-full py-10"
                    >
                        <div className="w-64 relative mb-8">
                            <div className="h-1 w-full bg-gray-800 overflow-hidden">
                                <motion.div
                                    className="h-full bg-[var(--primary-cyan)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.2, ease: "linear" }}
                                />
                            </div>
                            <div className="flex justify-between text-xs font-code text-[var(--primary-cyan)] mt-2">
                                <span>생체 데이터 분석 중...</span>
                                <span><Typewriter text="100%" speed={50} /></span>
                            </div>
                        </div>

                        {/* Random Data Stream Effect */}
                        <div className="font-code text-xs text-[var(--matrix-green)] opacity-70 h-24 overflow-hidden w-64 text-center">
                            <GlitchText
                                text="SX-99: MATCH / COORD: 44.5, 12.1 / DELTA: 0.005 / NEURAL_SYNC: 98%"
                                speed={5}
                            />
                        </div>
                    </motion.div>
                )}

                {status === 'RESULT' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl"
                    >
                        <HudContainer title={resultType === 'match' ? "분석 완료" : "특이사항 발생"}
                            type={resultType === 'match' ? 'cyan' : 'red'}
                            className="w-full text-center py-10">
                            <div className="mb-6">
                                <h3 className={`text-3xl font-display font-bold ${resultType === 'match' ? 'text-[var(--primary-cyan)]' : 'text-[var(--accent-red)]'} mb-2`}>
                                    {resultType === 'match' ? '동기화 확인됨' : '편차 확인됨'}
                                </h3>
                                <div className={`h-[1px] w-24 ${resultType === 'match' ? 'bg-[var(--primary-cyan)]' : 'bg-[var(--accent-red)]'} mx-auto mb-6`} />
                            </div>

                            <p className="text-xl font-ui leading-relaxed mb-10 px-8 break-keep">
                                <Typewriter
                                    text={
                                        resultType === 'match'
                                            ? "수사 성공. 당신의 근육은 설계된 UX 동선에 완전히 동기화되었습니다."
                                            : "흥미로운 결과입니다. 개인마다 신체 구조와 습관이 다르기 때문에 통계적 오차가 발생할 수 있습니다. 하지만 대다수의 데이터는 여전히 한곳을 가리킵니다."
                                    }
                                    speed={30}
                                />
                            </p>

                            <button
                                onClick={onNext}
                                className={`px-8 py-3 bg-[var(--panel-bg)] text-white font-bold font-display tracking-wider hover:bg-white hover:text-black transition-colors border ${resultType === 'match' ? 'border-[var(--primary-cyan)]' : 'border-[var(--accent-red)]'}`}
                            >
                                과학적 분석 보고서 보기
                            </button>
                        </HudContainer>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
