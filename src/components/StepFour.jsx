import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';

// Zone detection based on diagonal position
function getZone(x, y, width, height) {
    if (width === 0 || height === 0) return null;

    const score = (x / width) + (y / height);

    if (score < 0.7) {
        return {
            id: 'dead',
            name: 'Dead Zone',
            desc: '닿기 어려움',
            color: 'rgba(168, 85, 247, 0.5)',
            textColor: '#d8b4fe'
        };
    } else if (score < 1.3) {
        return {
            id: 'stretch',
            name: 'Stretch Zone',
            desc: '노력 필요',
            color: 'rgba(45, 212, 191, 0.5)',
            textColor: '#99f6e8'
        };
    } else {
        return {
            id: 'easy',
            name: 'Easy Zone',
            desc: '가장 편함',
            color: 'rgba(163, 230, 53, 0.5)',
            textColor: '#bef264'
        };
    }
}

export default function StepFour({ result, onRestart }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [zone, setZone] = useState(null);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({ x, y });
        setZone(getZone(x, y, rect.width, rect.height));
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setZone(null);
    };

    const getZoneLabel = () => {
        if (!zone) return '마우스를 올려보세요';
        switch (zone.id) {
            case 'dead': return '💜 Dead Zone';
            case 'stretch': return '🩵 Stretch Zone';
            case 'easy': return '💚 Easy Zone';
            default: return '';
        }
    };

    return (
        <motion.div
            style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '48px',
                padding: '20px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* LEFT SIDE: Interactive Phone - EXACTLY LIKE TEST PAGE */}
            <motion.div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {/* Outer Frame (replaces HudContainer) */}
                <div style={{
                    position: 'relative',
                    padding: '20px',
                    border: '1px solid rgba(0, 243, 255, 0.3)',
                    backgroundColor: 'rgba(10, 10, 18, 0.8)',
                    boxShadow: '0 0 30px rgba(0, 243, 255, 0.1)'
                }}>
                    {/* Corner Brackets */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderLeft: '2px solid #00f3ff', borderTop: '2px solid #00f3ff' }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderRight: '2px solid #00f3ff', borderTop: '2px solid #00f3ff' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderLeft: '2px solid #00f3ff', borderBottom: '2px solid #00f3ff' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRight: '2px solid #00f3ff', borderBottom: '2px solid #00f3ff' }} />

                    {/* Phone Frame - INTERACTIVE AREA */}
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            position: 'relative',
                            width: '280px',
                            height: '500px',
                            backgroundColor: '#111',
                            border: `3px solid ${isHovering ? '#00f3ff' : '#333'}`,
                            borderRadius: '30px',
                            cursor: 'crosshair',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s'
                        }}
                    >
                        {/* Background Gradient Hints */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            background: `
                radial-gradient(circle at 15% 15%, rgba(168, 85, 247, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 85% 85%, rgba(163, 230, 53, 0.2) 0%, transparent 40%)
              `
                        }} />

                        {/* Grid */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }} />

                        {/* Cursor Spotlight */}
                        {isHovering && zone && (
                            <div
                                style={{
                                    position: 'absolute',
                                    width: '120px',
                                    height: '120px',
                                    left: mousePos.x - 60,
                                    top: mousePos.y - 60,
                                    background: `radial-gradient(circle, ${zone.color} 0%, transparent 70%)`,
                                    pointerEvents: 'none',
                                    transition: 'background 0.1s ease'
                                }}
                            />
                        )}

                        {/* Zone Label */}
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 20,
                            pointerEvents: 'none'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={zone ? zone.id : 'idle'}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: zone ? zone.color : 'rgba(0,0,0,0.6)',
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                        color: zone ? zone.textColor : '#888',
                                        fontFamily: 'sans-serif'
                                    }}
                                >
                                    {getZoneLabel()}
                                    {zone && <span style={{ marginLeft: '8px', fontSize: '11px', opacity: 0.8 }}>[{zone.desc}]</span>}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Dead Zone Label */}
                        <div style={{
                            position: 'absolute',
                            top: '60px',
                            left: '15px',
                            color: 'rgba(168, 85, 247, 0.7)',
                            fontSize: '11px',
                            pointerEvents: 'none',
                            fontFamily: 'monospace'
                        }}>
                            ✗ Dead Zone
                        </div>

                        {/* Easy Zone Button */}
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            right: '15px',
                            textAlign: 'center',
                            pointerEvents: 'none'
                        }}>
                            <div style={{
                                padding: '8px 16px',
                                border: '2px solid rgba(163, 230, 53, 0.6)',
                                borderRadius: '8px',
                                color: 'rgba(163, 230, 53, 0.9)',
                                fontSize: '12px',
                                marginBottom: '4px'
                            }}>
                                주문하기
                            </div>
                            <div style={{ color: 'rgba(163, 230, 53, 0.6)', fontSize: '10px', fontFamily: 'monospace' }}>
                                Easy Zone
                            </div>
                        </div>
                    </div>

                    {/* Bottom Caption */}
                    <div style={{
                        textAlign: 'center',
                        marginTop: '12px',
                        fontSize: '12px',
                        color: 'rgba(0, 243, 255, 0.7)',
                        fontFamily: 'monospace'
                    }}>
                        엄지 도달 범위 시뮬레이션
                    </div>
                </div>
            </motion.div>

            {/* RIGHT SIDE: Content */}
            <motion.div
                style={{ flex: 1 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div style={{ marginBottom: '8px', fontSize: '14px', color: '#00f3ff', fontFamily: 'monospace' }}>
                    [!] UI 디자인 패턴 분석
                </div>
                <h2 style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    marginBottom: '32px',
                    lineHeight: 1.2,
                    fontFamily: 'var(--font-display, sans-serif)'
                }}>
                    <span style={{ color: '#a3e635' }}>Easy Zone</span>의 법칙
                </h2>

                <div style={{
                    borderLeft: '4px solid #a3e635',
                    paddingLeft: '24px',
                    marginBottom: '32px'
                }}>
                    <p style={{
                        fontSize: '20px',
                        fontWeight: 300,
                        lineHeight: 1.8,
                        color: '#d1d5db',
                        fontFamily: 'var(--font-ui, sans-serif)'
                    }}>
                        <Typewriter
                            text="직접 체험해보세요. 마우스(엄지)가 닿기 힘든 곳은 'Dead Zone', 가장 편안한 곳은 'Easy Zone'입니다. 중요한 버튼이 왜 항상 오른쪽 아래에 있는지, 이제 이해되시나요?"
                            speed={20}
                        />
                    </p>
                </div>

                <div style={{
                    backgroundColor: 'rgba(0, 243, 255, 0.05)',
                    padding: '24px',
                    border: '1px solid rgba(0, 243, 255, 0.3)',
                    marginBottom: '32px'
                }}>
                    <h4 style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#00f3ff',
                        marginBottom: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontFamily: 'var(--font-display, sans-serif)'
                    }}>
                        영역 분석 요약
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>
                            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#a855f7', flexShrink: 0 }}></span>
                            <span><strong style={{ color: '#d8b4fe' }}>Dead Zone</strong>: 엄지 도달 불가 / 정보 표시 영역</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>
                            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#2dd4bf', flexShrink: 0 }}></span>
                            <span><strong style={{ color: '#99f6e4' }}>Stretch Zone</strong>: 약간의 노력이 필요 / 보조 기능</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>
                            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#a3e635', flexShrink: 0 }}></span>
                            <span><strong style={{ color: '#bef264' }}>Easy Zone</strong>: 가장 편한 영역 / 주요 행동(CTA) 버튼</span>
                        </li>
                    </ul>
                </div>

                <button
                    onClick={onRestart}
                    style={{
                        padding: '12px 32px',
                        border: '1px solid rgba(0, 243, 255, 0.5)',
                        backgroundColor: 'transparent',
                        color: 'rgba(0, 243, 255, 0.7)',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontSize: '14px',
                        letterSpacing: '2px',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-display, sans-serif)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = '#00f3ff';
                        e.target.style.color = '#00f3ff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgba(0, 243, 255, 0.5)';
                        e.target.style.color = 'rgba(0, 243, 255, 0.7)';
                    }}
                >
                    처음으로 돌아가기
                </button>
            </motion.div>
        </motion.div>
    );
}
