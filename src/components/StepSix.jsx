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
        <div className="w-full h-screen bg-gray-900 flex text-white overflow-hidden font-ui">

            {/* --- LEFT PANEL: THE APP (THE HEARTH) --- */}
            <div className="w-1/2 h-full bg-black/50 border-r border-gray-800 flex flex-col items-center justify-center p-8 relative">
                <div className="absolute top-4 left-4 text-xs text-gray-500 uppercase tracking-widest">
                    Zone: App Identity (UI Habitat)
                </div>

                {/* Mobile Mockup */}
                <div className="w-[320px] h-[640px] bg-white rounded-3xl overflow-hidden shadow-2xl relative border-8 border-gray-800">
                    {/* Status Bar */}
                    <div className="h-6 bg-amber-900 w-full"></div>

                    {/* App Header (Nav Bar) */}
                    <div
                        className={`h-14 bg-amber-800 flex items-center justify-between px-4 cursor-pointer hover:bg-amber-700 transition-colors ${selectedUI === 'navbar' ? 'ring-4 ring-cyan-400' : ''}`}
                        onClick={() => { setSelectedUI('navbar'); setUxFlow(null); }}
                    >
                        <IconMenu stroke="white" />
                        <span className="font-display font-bold text-white tracking-widest">THE HEARTH</span>
                        <div className="w-6"></div>
                    </div>

                    {/* App Body */}
                    <div className="bg-amber-50 h-full p-4 text-gray-800">
                        {/* Logo Area */}
                        <div
                            className={`flex flex-col items-center mb-8 mt-4 cursor-pointer p-2 rounded hover:bg-black/5 transition-colors ${selectedUI === 'logo' ? 'ring-4 ring-cyan-400' : ''}`}
                            onClick={() => { setSelectedUI('logo'); setUxFlow(null); }}
                        >
                            <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mb-2">
                                <IconCoffee stroke="white" />
                            </div>
                            <h2 className="font-display font-bold text-amber-900 text-xl">The Hearth</h2>
                            <p className="text-xs text-gray-500">Warmth in every cup</p>
                        </div>

                        {/* Menu Card */}
                        <div
                            className={`bg-white rounded-xl shadow-md p-4 mb-4 flex gap-4 cursor-pointer hover:shadow-lg transition-all ${selectedUI === 'menu' ? 'ring-4 ring-cyan-400' : ''}`}
                            onClick={() => { setSelectedUI('menu'); setUxFlow(null); }}
                        >
                            <div className="w-20 h-20 bg-amber-100 rounded-lg flex-shrink-0"></div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Time Travel Latte</h3>
                                <p className="text-xs text-gray-500 mb-2">A taste of the past, brewed for the future.</p>
                                <span className="font-bold text-amber-700">$ 5.00</span>
                            </div>
                        </div>

                        {/* Order Button */}
                        <div className="absolute bottom-8 left-0 right-0 px-4">
                            <button
                                className={`w-full py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:bg-amber-500 active:scale-95 transition-all ${selectedUI === 'button' ? 'ring-4 ring-cyan-400' : ''}`}
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
                <p className="mt-8 text-gray-400 text-sm">
                    화면 속 요소들을 클릭하여 분석하세요.
                </p>
            </div>

            {/* --- RIGHT PANEL: ANATOMY LAB --- */}
            <div className="w-1/2 h-full bg-gray-900 p-12 flex flex-col relative">
                <div className="absolute top-4 right-4 text-xs text-gray-500 uppercase tracking-widest">
                    Zone: Analysis Lab
                </div>

                <h1 className="text-3xl font-display font-bold mb-12 text-gray-100">
                    <span className="text-cyan-400">UI</span> vs <span className="text-green-400">UX</span> Anatomy
                </h1>

                {/* UI DEFINITION ZONE */}
                <div className="mb-12 min-h-[160px]">
                    <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        UI (User Interface) : 보이는 것
                    </h3>
                    <AnimatePresence mode="wait">
                        {selectedUI ? (
                            <motion.div
                                key={selectedUI}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-gray-800/50 border-l-4 border-cyan-500 p-6 rounded-r-lg"
                            >
                                <h4 className="text-xl text-white font-bold mb-2">{uiDefinitions[selectedUI].title}</h4>
                                <p className="text-gray-300">{uiDefinitions[selectedUI].desc}</p>
                            </motion.div>
                        ) : (
                            <div className="text-gray-600 italic p-4 border border-dashed border-gray-700 rounded">
                                왼쪽 앱 화면에서 요소를 클릭해보세요.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* UX DEFINITION ZONE */}
                <div className="mb-12 min-h-[160px]">
                    <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        UX (User Experience) : 겪는 것
                    </h3>
                    <AnimatePresence mode="wait">
                        {uxFlow ? (
                            <motion.div
                                key="ux-flow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-800/50 border-l-4 border-green-500 p-6 rounded-r-lg"
                            >
                                <h4 className="text-xl text-white font-bold mb-4">{uxDefinitions.order.title}</h4>
                                <div className="space-y-3">
                                    {uxDefinitions.order.steps.map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-300">
                                            <span className="w-6 h-6 rounded-full bg-green-900 text-green-400 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                            <span>{step}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-green-400/80 text-sm border-t border-gray-700 pt-3">
                                    👉 {uxDefinitions.order.desc}
                                </p>
                            </motion.div>
                        ) : (
                            <div className="text-gray-600 italic p-4 border border-dashed border-gray-700 rounded">
                                주문 버튼을 눌러 경험(Flow)을 시작해보세요.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CONNECTION DIAGRAM */}
                <div className="mt-auto pt-8 border-t border-gray-800">
                    <div className="flex items-center justify-between text-center opacity-50 pb-8">
                        <div>
                            <div className="text-cyan-400 font-bold mb-1">UI</div>
                            <div className="text-xs text-gray-500">도구 (Tool)</div>
                        </div>
                        <div className="h-px bg-gray-600 w-1/4"></div>
                        <div>
                            <div className="text-white font-bold mb-1">ACTION</div>
                            <div className="text-xs text-gray-500">사용 (Use)</div>
                        </div>
                        <div className="h-px bg-gray-600 w-1/4"></div>
                        <div>
                            <div className="text-green-400 font-bold mb-1">UX</div>
                            <div className="text-xs text-gray-500">결과 (Result)</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
