import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
const IconMenu = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const IconCoffee = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
);

export default function StepSix({ onNext }) {
    const [selectedUI, setSelectedUI] = useState(null); // 'logo', 'menu', 'button'
    const [uxFlow, setUxFlow] = useState(null); // 'order_process'

    // --- UI/UX DEFINITIONS ---
    const uiDefinitions = {
        logo: {
            title: "로고 (Logo)",
            desc: "앱의 정체성을 나타내는 시각적 상징입니다. 모양, 색상, 폰트로 구성됩니다.",
            type: "UI"
        },
        menu: {
            title: "메뉴 카드 (Menu Card)",
            desc: "상품의 이미지와 가격 정보를 담고 있는 사각형 영역입니다.",
            type: "UI"
        },
        button: {
            title: "주문 버튼 (Button)",
            desc: "사용자가 누를 수 있는 영역입니다. 크기, 색상, 위치가 중요합니다.",
            type: "UI"
        },
        navbar: {
            title: "네비게이션 바 (Nav Bar)",
            desc: "화면 상단/하단에 위치하여 이동을 돕는 시각적 구조물입니다.",
            type: "UI"
        }
    };

    const uxDefinitions = {
        order: {
            title: "주문 경험 (Order Experience)",
            steps: [
                "사용자는 메뉴를 매력적으로 느낌",
                "원하는 커피를 선택함",
                "주문 버튼을 통해 구매를 완료함"
            ],
            desc: "이 모든 과정의 흐름과 편의성이 UX입니다.",
            type: "UX"
        }
    };

    return (
        <div className="w-full h-screen bg-gray-950 flex text-white overflow-hidden font-ui">

            {/* --- LEFT PANEL: THE APP (THE HEARTH) --- */}
            <div className="w-1/2 h-full bg-gray-900 border-r border-gray-700 flex flex-col items-center justify-center p-8 relative">
                <div className="absolute top-6 left-6 text-sm font-bold text-cyan-500 uppercase tracking-widest bg-cyan-950/30 px-3 py-1 rounded border border-cyan-500/30">
                    Zone: APP 탐색하기
                </div>

                {/* Mobile Mockup */}
                <div className="w-[320px] h-[640px] bg-white rounded-3xl overflow-hidden shadow-2xl relative border-4 border-gray-300 ring-4 ring-black transform transition-transform hover:scale-[1.01] duration-300">
                    {/* Status Bar */}
                    <div className="h-6 bg-amber-900 w-full z-10 relative"></div>

                    {/* App Header (Nav Bar) */}
                    <div
                        className={`h-14 bg-amber-800 flex items-center justify-between px-4 cursor-pointer hover:bg-amber-700 transition-colors z-10 relative ${selectedUI === 'navbar' ? 'ring-4 ring-cyan-500 inset-ring' : ''}`}
                        onClick={() => { setSelectedUI('navbar'); setUxFlow(null); }}
                    >
                        <IconMenu stroke="white" />
                        <span className="font-display font-bold text-white tracking-widest text-lg">THE HEARTH</span>
                        <div className="w-6"></div>
                    </div>

                    {/* App Body */}
                    <div className="bg-[#FFF8F0] h-full p-4 text-gray-800 flex flex-col pt-6">
                        {/* Logo Area */}
                        <div
                            className={`flex flex-col items-center mb-8 cursor-pointer p-4 rounded-xl border border-transparent hover:border-amber-200 hover:bg-white transition-all ${selectedUI === 'logo' ? 'ring-4 ring-cyan-500 bg-white shadow-lg' : ''}`}
                            onClick={() => { setSelectedUI('logo'); setUxFlow(null); }}
                        >
                            <div className="w-20 h-20 bg-amber-900 rounded-full flex items-center justify-center mb-3 shadow-lg">
                                <IconCoffee stroke="white" />
                            </div>
                            <h2 className="font-display font-bold text-amber-900 text-2xl">The Hearth</h2>
                            <p className="text-sm font-medium text-amber-700/60">Warmth in every cup</p>
                        </div>

                        {/* Menu Card */}
                        <div
                            className={`bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-4 mb-6 flex gap-4 cursor-pointer hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all border border-amber-100 ${selectedUI === 'menu' ? 'ring-4 ring-cyan-500 transform scale-[1.02]' : ''}`}
                            onClick={() => { setSelectedUI('menu'); setUxFlow(null); }}
                        >
                            <div className="w-20 h-20 bg-amber-100 rounded-lg flex-shrink-0 shadow-inner"></div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">Time Travel Latte</h3>
                                <p className="text-xs text-gray-500 mb-2 leading-relaxed">A taste of the past, brewed for the future.</p>
                                <span className="font-bold text-amber-700 text-lg">$ 5.00</span>
                            </div>
                        </div>

                        {/* Order Button */}
                        <div className="mt-auto pb-12 px-2">
                            <button
                                className={`w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xl rounded-xl shadow-lg hover:from-amber-500 hover:to-amber-600 active:scale-95 transition-all ${selectedUI === 'button' ? 'ring-4 ring-cyan-500' : ''}`}
                                onClick={() => {
                                    setSelectedUI('button'); // It is UI
                                    setUxFlow('order'); // But clicking triggers UX
                                }}
                            >
                                ORDER NOW
                            </button>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-gray-400 font-medium text-sm bg-gray-800/50 px-4 py-2 rounded-full">
                    👈 화면 속 요소들을 클릭하여 분석하세요
                </p>
            </div>

            {/* --- RIGHT PANEL: ANATOMY LAB --- */}
            <div className="w-1/2 h-full bg-gray-950 p-12 flex flex-col relative border-l border-gray-800">
                <div className="absolute top-6 right-6 text-sm font-bold text-green-500 uppercase tracking-widest bg-green-950/30 px-3 py-1 rounded border border-green-500/30">
                    Zone: APP 분석하기
                </div>

                <h1 className="text-4xl font-display font-black mb-12 text-white">
                    <span className="text-cyan-400">UI</span> 와 <span className="text-green-400">UX</span> 파헤치기
                </h1>

                {/* UI DEFINITION ZONE */}
                <div className="mb-10 min-h-[180px]">
                    <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-3 text-xl">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                        UI (User Interface) : 보이는 것
                    </h3>
                    <AnimatePresence mode="wait">
                        {selectedUI ? (
                            <motion.div
                                key={selectedUI}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-gray-800/80 border-l-4 border-cyan-500 p-6 rounded-r-lg shadow-lg backdrop-blur-sm"
                            >
                                <h4 className="text-2xl text-white font-bold mb-2">{uiDefinitions[selectedUI].title}</h4>
                                <p className="text-gray-200 text-lg leading-relaxed">{uiDefinitions[selectedUI].desc}</p>
                            </motion.div>
                        ) : (
                            <div className="text-gray-500 font-medium text-lg p-6 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center bg-gray-900/30">
                                왼쪽 앱 화면에서 요소를 클릭해보세요.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* UX DEFINITION ZONE */}
                <div className="mb-8 min-h-[180px]">
                    <h3 className="text-green-400 font-bold mb-4 flex items-center gap-3 text-xl">
                        <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                        UX (User Experience) : 겪는 것
                    </h3>
                    <AnimatePresence mode="wait">
                        {uxFlow ? (
                            <motion.div
                                key="ux-flow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-800/80 border-l-4 border-green-500 p-6 rounded-r-lg shadow-lg backdrop-blur-sm"
                            >
                                <h4 className="text-2xl text-white font-bold mb-4">{uxDefinitions.order.title}</h4>
                                <div className="space-y-4">
                                    {uxDefinitions.order.steps.map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-gray-200 text-lg">
                                            <span className="w-8 h-8 rounded-full bg-green-900 border border-green-500/50 text-green-400 flex items-center justify-center text-sm font-bold shadow-lg">{idx + 1}</span>
                                            <span className="font-medium">{step}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 text-green-400 font-bold text-base border-t border-gray-700 pt-4 flex items-center gap-2">
                                    <span>👉</span> {uxDefinitions.order.desc}
                                </p>
                            </motion.div>
                        ) : (
                            <div className="text-gray-500 font-medium text-lg p-6 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center bg-gray-900/30">
                                'ORDER NOW' 버튼을 눌러 경험(Flow)을 시작해보세요.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CONNECTION DIAGRAM */}
                <div className="mt-auto pt-8 border-t border-gray-800">
                    <div className="flex items-center justify-between text-center pb-4">
                        <div className="flex-1">
                            <div className="text-cyan-400 font-black text-2xl mb-1 drop-shadow-md">UI</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">도구 (Tool)</div>
                        </div>
                        <div className="relative flex-1 flex items-center justify-center">
                            <div className="h-0.5 bg-gradient-to-r from-cyan-900 via-gray-500 to-green-900 w-full absolute top-1/2 -translate-y-1/2"></div>
                            <div className="bg-gray-950 px-4 z-10 relative">
                                <div className="text-white font-black text-xl mb-1">ACTION</div>
                                <div className="text-xs font-bold text-gray-500">사용 (Use)</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="text-green-400 font-black text-2xl mb-1 drop-shadow-md">UX</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">결과 (Result)</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
