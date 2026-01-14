import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imgAmericano from '../assets/americano.jpg';
import imgColdBrew from '../assets/coldbrew.jpg';
import imgCafeLatte from '../assets/cafelatte.jpg';

// --- ICONS (Inline SVGs to replace Material Symbols) ---
const IconFireplace = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9.5C7 12.5 8 13.5 10 13c1.5-.38 2.5 0 2.5 1.5S11 16 11 16s1 1.5 2.5 1 3-2.5 3-2.5-3-2-2.5-3.5S13 10 13 10s-1.5-2-3-1.5S7.5 10 7 10.5z" /></svg>
);
const IconNotifications = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg>
);
const IconArrowForward = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
);
const IconCoffee = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" /></svg>
);
// Nav Icons
const IconHome = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>);
const IconMenu = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.71 3.97V22h2.58v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" /></svg>);
const IconReceipt = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2 10.5 3.5 9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z" /></svg>);
const IconPerson = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>);


export default function StepSix({ onNext }) {
    const [appView, setAppView] = useState('home'); // 'home', 'menu'
    const [selectedUI, setSelectedUI] = useState(null); // 'logo', 'menu_card', 'nav'
    const [uxFlow, setUxFlow] = useState(null);
    const [tutorialStep, setTutorialStep] = useState(0); // 0: Logo, 1: Card, 2: Nav, 3: Done

    // --- UI/UX DEFINITIONS (Right Panel) ---
    const uiDefinitions = {
        logo: {
            title: "브랜드 아이덴티티",
            desc: "로고와 타이포그래피는 앱의 첫인상과 브랜드의 품격을 시각적으로 전달한다.",
            type: "UI"
        },
        menu_card: {
            title: "메뉴 카드 디자인",
            desc: "어두운 배경 위 눈에 띄는 메뉴 카드는 고급스러운 카페 분위기를 연출하고 메뉴를 홍보한다.",
            type: "UI"
        },
        nav: {
            title: "하단 네비게이션",
            desc: "사용자가 주요 기능으로 이동할 수 있게 돕는 네비게이션이다.",
            type: "UI"
        },
        button: {
            title: "주문 버튼",
            desc: "사용자의 행동을 유도하는 버튼. 눈에 띄는 색상을 사용한다.",
            type: "UI"
        }
    };

    const uxDefinitions = {
        order: {
            title: "주문을 하기까지...(사용자의 경험)",
            steps: [
                "사용자는 '메뉴 보기'를 통해 탐색을 시작.",
                "매력적인 커피 사진과 설명을 확인.",
                "가장 중요한 '주문' 버튼을 눌러 목표를 달성."
            ],
            desc: "설계된 디자인 속에서 '주문'이라는 목적을 달성하게 하는 흐름이 UX이다.",
            type: "UX"
        }
    };

    // --- THE HEARTH APP COMPONENTS (User's Design) ---

    // Header
    const AppHeader = () => (
        <header className="relative z-10 flex items-center justify-between px-8 pt-12 pb-4 shrink-0">
            <div
                className={`flex items-center gap-2 cursor-pointer p-2 -ml-2 rounded-lg transition-all relative
                    ${selectedUI === 'logo' ? 'bg-white/10 ring-1 ring-[#f49d25]' : ''}
                    ${tutorialStep === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-[#f49d25] animate-pulse z-50' : ''}
                `}
                onClick={() => {
                    setSelectedUI('logo');
                    setUxFlow(null);
                    if (tutorialStep === 0) setTutorialStep(1);
                }}
            >
                {/* Tutorial Sparkle */}
                {tutorialStep === 0 && (
                    <motion.div
                        className="absolute -right-6 -top-2 text-2xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                        animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        ✨
                    </motion.div>
                )}

                <IconFireplace className="text-[#f49d25] w-7 h-7" />
                <h1 className="text-xl font-bold tracking-tight text-white font-serif">THE HEARTH</h1>
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors">
                <IconNotifications className="text-[#e8e1d5] w-6 h-6" />
            </button>
        </header>
    );

    // Nav Bar
    const AppNavBar = () => (
        <nav
            className={`absolute bottom-0 w-full bg-[#231f1a]/95 pb-8 pt-4 px-6 z-20 grid grid-cols-4 items-end backdrop-blur-xl border-t border-white/5 cursor-pointer transition-all relative
                ${selectedUI === 'nav' ? 'bg-[#231f1a] border-t-2 border-[#f49d25] shadow-[0_-4px_20px_rgba(244,157,37,0.2)]' : ''}
                ${tutorialStep === 2 ? 'ring-2 ring-white ring-offset-2 ring-offset-[#f49d25] animate-pulse z-50' : ''}
            `}
            onClick={() => {
                setSelectedUI('nav');
                setUxFlow(null);
                if (tutorialStep === 2) setTutorialStep(3);
            }}
        >
            {/* Tutorial Sparkle for Nav */}
            {tutorialStep === 2 && (
                <motion.div
                    className="absolute left-1/2 -top-6 -translate-x-1/2 text-3xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                    animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    ✨
                </motion.div>
            )}

            <div className={`flex flex-col items-center gap-1.5 group ${appView === 'home' ? 'text-white' : 'text-[#9c9285]'}`} onClick={(e) => { e.stopPropagation(); setAppView('home'); setSelectedUI('nav'); if (tutorialStep === 2) setTutorialStep(3); }}>
                <IconHome className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] tracking-wide font-medium">홈</span>
            </div>
            <div className={`flex flex-col items-center gap-1.5 group ${appView === 'menu' ? 'text-white' : 'text-[#9c9285]'}`} onClick={(e) => { e.stopPropagation(); setAppView('menu'); setSelectedUI('nav'); if (tutorialStep === 2) setTutorialStep(3); }}>
                <IconCoffee className="w-7 h-7 group-hover:text-white transition-colors" />
                <span className="text-[10px] tracking-wide font-medium">메뉴</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group text-[#9c9285]">
                <IconReceipt className="w-7 h-7 group-hover:text-white transition-colors" />
                <span className="text-[10px] tracking-wide font-medium">주문</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 group text-[#9c9285]">
                <IconPerson className="w-7 h-7 group-hover:text-white transition-colors" />
                <span className="text-[10px] tracking-wide font-medium">프로필</span>
            </div>
        </nav>
    );

    return (
        <div className="w-full h-screen bg-[#111] flex text-white overflow-hidden font-ui">

            {/* --- LEFT PANEL: APP SIMULATION --- */}
            <div className="w-1/2 h-full bg-[#181614] border-r border-[#333] flex flex-col items-center justify-center p-8 relative">
                <div className="absolute top-6 left-6 text-sm font-bold text-[#f49d25] uppercase tracking-widest bg-[#f49d25]/10 px-3 py-1 rounded border border-[#f49d25]/30">
                    Mode: {appView === 'home' ? 'Home Screen' : 'Menu List'}
                </div>

                {/* --- MOBILE CONTAINER --- */}
                <div className="w-[360px] h-[740px] bg-gradient-to-b from-[#2e2b26] to-[#0f0e0c] shadow-2xl overflow-hidden border border-white/5 relative rounded-[3rem] ring-8 ring-[#0a0a09] flex flex-col">
                    {/* Global Noise & Glow */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKhDlgranyV3g9uo7zIX1JXXO0s8C9CHnrJ1cgVsv__MTVGVW4OxBLfLmXTnOSLhNyefPGMIiDTYpBEg5xwOYFxk2nf6wMRIH8u0lhCynbOPDGE9Y5kH8qtMzoFnxrow9EZq1czx3GVkGyvO6weJ8EoVESYmeJb1S-Wjbz2l7pO39UBTih8bXfynx0JcM6QlzK4kFvOtZyIzHguIR5rmDNoYyy7U3jcTC21b374c073HWsdhLz0Jb-ZV9XTJpC-0DQ4cmlLYBkwo8')` }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[70vh] bg-[radial-gradient(circle_at_50%_120%,rgba(244,157,37,0.08)_0%,rgba(34,26,16,0)_70%)] pointer-events-none z-0"></div>

                    <AppHeader />

                    <AnimatePresence mode="wait">
                        {appView === 'home' ? (
                            <motion.main
                                key="home"
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="relative z-10 flex-1 px-6 pb-32 flex flex-col gap-6 w-full overflow-y-auto"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {/* Text Section */}
                                <section className="pt-2 pb-2 shrink-0">
                                    <h2 className="text-[28px] font-bold text-white leading-snug tracking-tight font-serif">
                                        여유가 피어나는 시간,<br />
                                        <span className="text-[#9c9285] opacity-80 text-base mt-2 block font-normal tracking-tight font-serif">
                                            커피향에 이끌리다.
                                        </span>
                                    </h2>
                                </section>

                                {/* Today's Coffee Card (Tutorial Step 1) */}
                                <div
                                    className={`group relative w-full shrink-0 overflow-hidden rounded-2xl bg-[#231f1a] shadow-lg border border-white/5 transition-all duration-500 cursor-pointer 
                                        ${selectedUI === 'menu_card' ? 'ring-2 ring-[#f49d25]' : 'hover:border-white/20'}
                                        ${tutorialStep === 1 ? 'ring-2 ring-white ring-offset-2 ring-offset-[#f49d25] animate-pulse z-50' : ''}
                                    `}
                                    onClick={() => {
                                        setSelectedUI('menu_card');
                                        setUxFlow(null);
                                        if (tutorialStep === 1) setTutorialStep(2);
                                    }}
                                >
                                    {/* Tutorial Sparkle for Card */}
                                    {tutorialStep === 1 && (
                                        <motion.div
                                            className="absolute right-4 top-4 text-3xl z-50 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                                            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            ✨
                                        </motion.div>
                                    )}

                                    <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151210] via-[#151210]/40 to-transparent"></div>
                                    <div className="relative p-6 flex flex-col h-[20rem] justify-between">
                                        <div className="flex justify-start">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium text-white/90 bg-[#1c1917]/80 backdrop-blur-md border border-white/10 tracking-wide shadow-sm">
                                                <span className="text-[#f49d25]">ⓘ</span> 오늘의 커피
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end gap-3">
                                            <div className="flex flex-col gap-1.5">
                                                <h3 className="text-2xl text-white tracking-tight leading-tight drop-shadow-md font-bold font-serif">에티오피아<br />예가체프</h3>
                                                <p className="text-xs leading-relaxed max-w-[90%] break-keep text-[#e8e1d5]/80 drop-shadow-sm font-normal">자스민과 베르가못의 은은한 꽃향기, 깔끔한 여운.</p>
                                            </div>
                                            <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-[#f49d25] text-[#1c1917] hover:bg-white hover:scale-110 transition-all shadow-[0_0_15px_rgba(244,157,37,0.3)]">
                                                <IconArrowForward className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu View Card (Navigation) */}
                                <div
                                    className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-[#231f1a] border border-white/5 group h-40 hover:border-white/10 transition-colors shadow-lg cursor-pointer"
                                    onClick={() => setAppView('menu')}
                                >
                                    <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151210] via-[#151210]/40 to-transparent"></div>
                                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                        <div className="flex justify-between items-end w-full">
                                            <div>
                                                <h4 className="text-xl text-white mb-1.5 drop-shadow-md font-bold font-serif">메뉴 보기</h4>
                                                <p className="text-xs mb-0 leading-relaxed break-keep text-[#e8e1d5]/80 drop-shadow-sm">장인의 손길로 내린<br />커피와 기록들.</p>
                                            </div>
                                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors">
                                                <IconArrowForward className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dummy Content to Force Scroll */}
                                <div className="w-full shrink-0 h-24 bg-[#231f1a]/50 rounded-2xl border border-white/5 flex items-center justify-center text-[#9c9285] text-xs">
                                    <span className="opacity-50">더 많은 콘텐츠 업데이트 예정...</span>
                                </div>
                            </motion.main>
                        ) : (
                            <motion.main
                                key="menu"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                className="relative z-10 flex-1 px-6 pb-32 flex flex-col gap-4 w-full overflow-y-auto pt-2"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <div className="flex items-center gap-2 mb-2 shrink-0">
                                    <button onClick={() => setAppView('home')} className="text-[#9c9285] hover:text-white"><IconArrowForward className="w-5 h-5 rotate-180" /></button>
                                    <h2 className="text-2xl font-bold text-white font-serif">Coffee Menu</h2>
                                </div>

                                {/* Menu List Item 1 */}
                                <div className="w-full shrink-0 bg-[#231f1a] rounded-xl border border-white/5 overflow-hidden flex gap-4 p-4 items-center group hover:border-[#f49d25]/50 transition-all">
                                    <div className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=200&auto=format&fit=crop')` }}></div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base font-serif">에스프레소</h3>
                                        <p className="text-[#9c9285] text-[10px] mt-0.5">깊고 진한 본연의 맛</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[#f49d25] font-bold text-sm">3.5</span>
                                            <button className="bg-white/5 hover:bg-[#f49d25] hover:text-[#1c1917] text-[#9c9285] rounded-full p-1.5 transition-colors"><IconNotifications className="w-3.5 h-3.5 rotate-45" /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu List Item 2 (Target) */}
                                <div className={`w-full shrink-0 bg-[#231f1a]/80 rounded-xl border overflow-hidden flex gap-4 p-4 items-center group relative shadow-lg ${selectedUI === 'button' ? 'border-[#f49d25] ring-1 ring-[#f49d25]' : 'border-[#f49d25]/30'}`}>
                                    <div className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=200&auto=format&fit=crop')` }}></div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base font-serif">Time Travel Latte</h3>
                                        <p className="text-[#9c9285] text-[10px] mt-0.5">과거의 향수를 담은 시그니처</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[#f49d25] font-bold text-sm">5.0</span>
                                            <button
                                                className={`bg-[#f49d25] text-[#1c1917] rounded-full px-4 py-1.5 text-xs font-bold hover:bg-white hover:scale-105 transition-all shadow-[0_0_10px_rgba(244,157,37,0.4)]`}
                                                onClick={() => {
                                                    setSelectedUI('button');
                                                    setUxFlow('order');
                                                }}
                                            >
                                                주문
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu List Item 3 */}
                                <div className="w-full shrink-0 bg-[#231f1a] rounded-xl border border-white/5 overflow-hidden flex gap-4 p-4 items-center opacity-60">
                                    <div className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 grayscale" style={{ backgroundImage: `url(${imgColdBrew})` }}></div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base font-serif">콜드브루</h3>
                                        <p className="text-[#9c9285] text-[10px] mt-0.5">차가운 물로 내린 깔끔함</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[#f49d25] font-bold text-sm">4.5</span>
                                            <span className="text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">품절</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu List Item 4 */}
                                <div className="w-full shrink-0 bg-[#231f1a] rounded-xl border border-white/5 overflow-hidden flex gap-4 p-4 items-center group hover:border-[#f49d25]/50 transition-all">
                                    <div className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${imgAmericano})` }}></div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base font-serif">아메리카노</h3>
                                        <p className="text-[#9c9285] text-[10px] mt-0.5">가장 기본적인 커피</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[#f49d25] font-bold text-sm">3.0</span>
                                            <button className="bg-white/5 hover:bg-[#f49d25] hover:text-[#1c1917] text-[#9c9285] rounded-full p-1.5 transition-colors"><IconNotifications className="w-3.5 h-3.5 rotate-45" /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu List Item 5 */}
                                <div className="w-full shrink-0 bg-[#231f1a] rounded-xl border border-white/5 overflow-hidden flex gap-4 p-4 items-center group hover:border-[#f49d25]/50 transition-all">
                                    <div className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${imgCafeLatte})` }}></div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base font-serif">카페 라떼</h3>
                                        <p className="text-[#9c9285] text-[10px] mt-0.5">부드러운 우유와 에스프레소</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-[#f49d25] font-bold text-sm">4.0</span>
                                            <button className="bg-white/5 hover:bg-[#f49d25] hover:text-[#1c1917] text-[#9c9285] rounded-full p-1.5 transition-colors"><IconNotifications className="w-3.5 h-3.5 rotate-45" /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Scroll Dummy */}
                                <div className="w-full shrink-0 h-12"></div>
                            </motion.main>
                        )}
                    </AnimatePresence>

                    <AppNavBar />
                </div>

                <div className="mt-8 flex gap-4 text-[#9c9285] text-sm font-medium bg-[#231f1a] px-6 py-3 rounded-full border border-white/10 shadow-xl items-center relative z-20">
                    {/* Tutorial Tip */}
                    {tutorialStep < 3 && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max bg-[#f49d25] text-[#1c1917] px-4 py-2 rounded-full font-bold shadow-lg animate-bounce z-50">
                            {tutorialStep === 0 && "1. 상단 로고를 눌러보세요!"}
                            {tutorialStep === 1 && "2. 메인 카드를 눌러보세요!"}
                            {tutorialStep === 2 && "3. 하단 메뉴를 눌러보세요!"}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#f49d25]"></div>
                        </div>
                    )}

                    <span className="flex items-center gap-2"><IconArrowForward className="w-4 h-4 -rotate-90 text-[#f49d25]" /> 위 화면을 조작하여 분석:</span>
                    <span className={`hover:text-[#f49d25] cursor-pointer transition-colors ${appView === 'home' ? 'text-[#f49d25] font-bold' : ''}`} onClick={() => setAppView('home')}>1. 홈</span>
                    <span className="text-[#555]">›</span>
                    <span className={`hover:text-[#f49d25] cursor-pointer transition-colors ${appView === 'menu' ? 'text-[#f49d25] font-bold' : ''}`} onClick={() => setAppView('menu')}>2. 메뉴</span>
                    <span className="text-[#555]">›</span>
                    <span className={`transition-colors ${uxFlow ? 'text-[#f49d25] font-bold' : ''}`}>3. 주문</span>
                </div>
            </div>

            {/* --- RIGHT PANEL:  (Unchanged Structure, Updated Colors) --- */}
            <div className="w-1/2 h-full bg-[#0a0a09] p-12 flex flex-col relative border-l border-[#333]">
                <div className="absolute top-6 right-6 text-sm font-bold text-green-500 uppercase tracking-widest bg-green-950/30 px-3 py-1 rounded border border-green-500/30">
                    Zone: 해부학 실험실
                </div>

                <h1 className="text-4xl font-display font-black mb-12 text-white">
                    <span className="text-cyan-400">UI</span> 와 <span className="text-green-400">UX</span> 해부학 실험실
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
                                className="bg-[#1c1917] border-l-4 border-cyan-500 p-6 rounded-r-lg shadow-lg"
                            >
                                <h4 className="text-2xl text-white font-bold mb-2 font-serif">{uiDefinitions[selectedUI].title}</h4>
                                <p className="text-[#e8e1d5] text-lg leading-relaxed">{uiDefinitions[selectedUI].desc}</p>
                            </motion.div>
                        ) : (
                            <div className="text-[#9c9285] font-medium text-lg p-6 border-2 border-dashed border-[#333] rounded-lg flex items-center justify-center bg-[#1c1917]/30">
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
                                className="bg-[#1c1917] border-l-4 border-green-500 p-6 rounded-r-lg shadow-lg"
                            >
                                <h4 className="text-2xl text-white font-bold mb-4 font-serif">{uxDefinitions.order.title}</h4>
                                <div className="space-y-4">
                                    {uxDefinitions.order.steps.map((step, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-[#e8e1d5] text-lg">
                                            <span className="w-8 h-8 rounded-full bg-green-900 border border-green-500/50 text-green-400 flex items-center justify-center text-sm font-bold shadow-lg shrink-0">{idx + 1}</span>
                                            <span className="font-medium">{step}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 text-green-400 font-bold text-base border-t border-[#333] pt-4 flex items-center gap-2">
                                    <span>👉</span> {uxDefinitions.order.desc}
                                </p>
                            </motion.div>
                        ) : (
                            <div className="text-[#9c9285] font-medium text-lg p-6 border-2 border-dashed border-[#333] rounded-lg flex items-center justify-center bg-[#1c1917]/30">
                                '주문' 버튼을 눌러 경험(Flow)을 시작해보세요.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CONNECTION */}
                <div className="mt-auto pt-8 border-t border-[#333]">
                    <div className="flex items-center justify-between text-center pb-4">
                        <div className="flex-1">
                            <div className="text-cyan-400 font-black text-2xl mb-1 drop-shadow-md">UI</div>
                            <div className="text-sm font-bold text-[#9c9285] uppercase tracking-widest">도구 (Tool)</div>
                        </div>
                        <div className="relative flex-1 flex items-center justify-center">
                            <div className="h-0.5 bg-gradient-to-r from-cyan-900 via-[#555] to-green-900 w-full absolute top-1/2 -translate-y-1/2"></div>
                            <div className="bg-[#0a0a09] px-4 z-10 relative">
                                <div className="text-white font-black text-xl mb-1">ACTION</div>
                                <div className="text-xs font-bold text-[#9c9285]">사용 (Use)</div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="text-green-400 font-black text-2xl mb-1 drop-shadow-md">UX</div>
                            <div className="text-sm font-bold text-[#9c9285] uppercase tracking-widest">결과 (Result)</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
