import React, { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import Lanyard from './Lanyard';
import GlitchText from './GlitchText';

export default function AgentCertificate({ onExit }) {
    return (
        <div className="w-full h-full flex bg-zinc-950 relative overflow-hidden font-sans">
            {/* LEFT: 3D INTERACTION AREA */}
            <div className="w-1/2 h-full relative border-r border-cyan-900/30 bg-gradient-to-br from-black to-cyan-950/20">
                <div className="absolute top-8 left-8 z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-cyan-400 text-xs tracking-[0.2em] font-bold">PHYSICAL SIMULATION</span>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter opacity-80">ID CARD<br />ISSUANCE</h2>
                </div>

                {/* Lanyard component is self-contained with its own Canvas */}
                <Lanyard />

                <div className="absolute bottom-8 left-0 w-full text-center text-cyan-500/40 text-sm tracking-widest font-mono pointer-events-none">
                    명찰을 드래그해서 움직여보세요 // INTERACT
                </div>
            </div>

            {/* RIGHT: CERTIFICATE UI */}
            <div className="w-1/2 h-full flex items-center justify-center p-12 relative bg-[radial-gradient(circle_at_top_right,_#1e293b_0%,_#000_100%)]">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

                <div className="relative z-10 w-full max-w-lg">
                    {/* Header */}
                    <div className="mb-12 text-right border-b border-gray-800 pb-6">
                        <h1 className="text-5xl font-black text-white tracking-tighter mb-2">정식 요원<br /><span className="text-cyan-500">인증서</span></h1>
                        <div className="text-gray-500 text-sm tracking-[0.3em]">DIGITAL INSIGHT BUREAU</div>
                    </div>

                    {/* Details */}
                    <div className="space-y-8 font-mono">
                        <div className="group">
                            <label className="block text-xs text-cyan-700 tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">요원명 (AGENT NAME)</label>
                            <div className="text-2xl text-white font-bold border-b border-gray-800 pb-2 group-hover:border-cyan-500 transition-colors">디지털 수사관</div>
                        </div>
                        <div className="group">
                            <label className="block text-xs text-cyan-700 tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">보안 등급 (CLEARANCE)</label>
                            <div className="text-2xl text-white font-bold border-b border-gray-800 pb-2 group-hover:border-cyan-500 transition-colors">Lv. 1 <span className="text-sm font-normal text-gray-600 ml-2">(Master)</span></div>
                        </div>
                        <div className="group">
                            <label className="block text-xs text-cyan-700 tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">발급일 (DATE)</label>
                            <div className="text-2xl text-white font-bold border-b border-gray-800 pb-2 group-hover:border-cyan-500 transition-colors">
                                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1)}
                            </div>
                        </div>
                    </div>

                    {/* Stamp */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 border-4 border-cyan-500/30 rounded-full flex items-center justify-center -rotate-12 opacity-50 pointer-events-none select-none">
                        <div className="w-40 h-40 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center">
                            <span className="text-cyan-500/50 font-black text-xl tracking-widest">합격 (PASS)</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-16 flex gap-4">
                        <div className="flex-1 bg-cyan-950/30 border border-cyan-800/50 p-4 rounded text-s text-cyan-400 leading-relaxed">
                            <strong className="block text-cyan-300 mb-1">접근 권한 승인됨</strong>
                            귀하는 디지털 전환 훈련을 성공적으로 마쳤습니다. 이제 모든 시스템에 접근할 수 있습니다.
                        </div>
                    </div>

                    <button onClick={onExit} className="mt-6 w-full py-4 bg-white text-black font-bold tracking-widest hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group">
                        <span>본부로 복귀</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>

            <Loader />
        </div>
    );
}
