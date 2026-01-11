import React, { useState } from 'react';

// Standalone test component for debugging mouse interaction
export default function HeatmapTest() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [zone, setZone] = useState('none');
    const [debugInfo, setDebugInfo] = useState('대기 중...');

    const handleMouseMove = (e) => {
        try {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = rect.width;
            const height = rect.height;

            setMousePos({ x, y });

            const score = (x / width) + (y / height);

            let zoneName = 'easy';
            if (score < 0.7) zoneName = 'dead';
            else if (score < 1.3) zoneName = 'stretch';

            setZone(zoneName);
            setDebugInfo(`X: ${Math.round(x)}, Y: ${Math.round(y)}, Score: ${score.toFixed(2)}, Zone: ${zoneName}`);
        } catch (error) {
            setDebugInfo(`ERROR: ${error.message}`);
            console.error('Mouse move error:', error);
        }
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        setDebugInfo('마우스 진입!');
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setZone('none');
        setDebugInfo('마우스 이탈');
    };

    const getZoneColor = () => {
        switch (zone) {
            case 'dead': return 'rgba(168, 85, 247, 0.5)';
            case 'stretch': return 'rgba(45, 212, 191, 0.5)';
            case 'easy': return 'rgba(163, 230, 53, 0.5)';
            default: return 'transparent';
        }
    };

    const getZoneLabel = () => {
        switch (zone) {
            case 'dead': return '💜 Dead Zone (닿기 어려움)';
            case 'stretch': return '🩵 Stretch Zone (노력 필요)';
            case 'easy': return '💚 Easy Zone (가장 편함)';
            default: return '마우스를 올려보세요';
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#0a0a0f',
            color: 'white',
            fontFamily: 'sans-serif',
            padding: '20px'
        }}>
            <h1 style={{ marginBottom: '20px', color: '#00f3ff' }}>🧪 히트맵 인터랙션 테스트</h1>

            {/* Debug Info */}
            <div style={{
                marginBottom: '20px',
                padding: '10px 20px',
                backgroundColor: '#1a1a2e',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '14px'
            }}>
                {debugInfo}
            </div>

            {/* Interactive Area */}
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
                {isHovering && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '120px',
                            height: '120px',
                            left: mousePos.x - 60,
                            top: mousePos.y - 60,
                            background: `radial-gradient(circle, ${getZoneColor()} 0%, transparent 70%)`,
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
                    padding: '8px 16px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: '20px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                }}>
                    {getZoneLabel()}
                </div>

                {/* Corner Labels */}
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    left: '15px',
                    color: 'rgba(168, 85, 247, 0.7)',
                    fontSize: '11px',
                    pointerEvents: 'none'
                }}>
                    ✗ Dead Zone
                </div>

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
                    <div style={{ color: 'rgba(163, 230, 53, 0.6)', fontSize: '10px' }}>
                        Easy Zone
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
                위 영역에 마우스를 움직여 보세요. 위치에 따라 색상이 변해야 합니다.
            </p>
        </div>
    );
}
