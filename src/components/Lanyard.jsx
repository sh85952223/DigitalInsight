import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * Lanyard ID Card Component
 * Enhanced with connected strap and larger card.
 */

export default function Lanyard() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // Card position state
    const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });

    // Spring physics for card movement
    const springX = useSpring(0, { stiffness: 100, damping: 25 });
    const springY = useSpring(0, { stiffness: 100, damping: 25 });

    // Card rotation based on movement
    const rotateZ = useTransform(springX, [-200, 200], [-8, 8]);
    const rotateY = useTransform(springX, [-200, 200], [-5, 5]);
    const rotateX = useTransform(springY, [-150, 150], [3, -3]);

    // Rope points for smooth curve
    const ropePointsRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setCardCenter({ x: rect.width / 2, y: rect.height / 2 + 50 });

        // Initialize rope points
        const anchorX = rect.width / 2;
        const anchorY = 0;
        const cardTopY = rect.height / 2 - 40; // Card top position

        ropePointsRef.current = [];
        const segments = 12;
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            ropePointsRef.current.push({
                x: anchorX,
                y: anchorY + t * (cardTopY - anchorY),
                vx: 0,
                vy: 0
            });
        }
    }, []);

    // Canvas animation - draw connected strap
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const animate = () => {
            if (!containerRef.current) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            const rect = containerRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            const anchorX = rect.width / 2;
            const anchorY = 0;

            // Get current card position from spring
            const cardX = anchorX + springX.get();
            const cardTopY = 160 + springY.get(); // Top of card

            // Update rope physics - points follow from anchor to card
            const points = ropePointsRef.current;
            if (points.length > 0) {
                // First point fixed at anchor
                points[0].x = anchorX;
                points[0].y = anchorY;

                // Last point follows card top
                const lastIdx = points.length - 1;
                const targetX = cardX;
                const targetY = cardTopY;

                // Smooth follow for last point
                points[lastIdx].x += (targetX - points[lastIdx].x) * 0.3;
                points[lastIdx].y += (targetY - points[lastIdx].y) * 0.3;

                // Middle points follow with physics
                for (let i = 1; i < lastIdx; i++) {
                    const prev = points[i - 1];
                    const next = points[i + 1];
                    const curr = points[i];

                    // Target position (average of neighbors with slight sag)
                    const targetX = (prev.x + next.x) / 2;
                    const targetY = (prev.y + next.y) / 2 + 2; // slight gravity sag

                    // Smooth interpolation
                    curr.vx = (targetX - curr.x) * 0.15;
                    curr.vy = (targetY - curr.y) * 0.15;
                    curr.x += curr.vx;
                    curr.y += curr.vy;
                }
            }

            // Clear and draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw lanyard strap (thick flat band)
            if (points.length > 1) {
                // Draw strap shadow
                ctx.beginPath();
                ctx.moveTo(points[0].x + 2, points[0].y + 2);
                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x + 2, points[i].y + 2);
                }
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.lineWidth = 14;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Draw main strap
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }

                // Gradient for strap
                const gradient = ctx.createLinearGradient(0, 0, 0, cardTopY);
                gradient.addColorStop(0, '#1e40af');
                gradient.addColorStop(0.5, '#3b82f6');
                gradient.addColorStop(1, '#1e40af');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 12;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Draw center stripe pattern on strap
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw metal clip at end
                const lastPoint = points[points.length - 1];

                // Clip body
                ctx.beginPath();
                ctx.roundRect(lastPoint.x - 12, lastPoint.y - 5, 24, 20, 3);
                ctx.fillStyle = '#94a3b8';
                ctx.fill();
                ctx.strokeStyle = '#64748b';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Clip hole
                ctx.beginPath();
                ctx.roundRect(lastPoint.x - 6, lastPoint.y + 5, 12, 8, 2);
                ctx.fillStyle = '#475569';
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [springX, springY]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2 + 50;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Limit movement range
        const dx = Math.max(-180, Math.min(180, x - centerX));
        const dy = Math.max(-100, Math.min(150, y - centerY));

        springX.set(dx);
        springY.set(dy);
    }, [isDragging, springX, springY]);

    const handleMouseDown = () => setIsDragging(true);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        // Return to center with spring physics
        springX.set(0);
        springY.set(0);
    }, [springX, springY]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative select-none overflow-hidden"
            style={{ perspective: '1500px' }}
        >
            {/* Canvas for lanyard strap */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-10"
            />

            {/* ID Card - LARGER SIZE with better proportions */}
            <motion.div
                onMouseDown={handleMouseDown}
                className="absolute left-1/2 cursor-grab active:cursor-grabbing z-20"
                style={{
                    x: springX,
                    y: springY,
                    top: '175px',
                    marginLeft: '-140px', // Half of card width
                    rotateX,
                    rotateY,
                    rotateZ,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Card: 280px x 400px (larger, taller ratio) */}
                <div
                    className="w-70 rounded-2xl shadow-2xl overflow-hidden border-2 border-cyan-500/40"
                    style={{
                        width: '280px',
                        height: '400px',
                        background: 'linear-gradient(155deg, #050a15 0%, #0f1d32 35%, #0a1628 70%, #050a15 100%)',
                        boxShadow: '0 40px 80px -20px rgba(0, 180, 255, 0.35), 0 0 60px rgba(0, 200, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
                    }}
                >
                    {/* Card Header */}
                    <div className="h-14 bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-700 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-pulse opacity-60" />
                        <span className="text-sm font-black text-black tracking-[0.35em] relative z-10">DIGITAL INSIGHT</span>
                    </div>

                    {/* Photo Area */}
                    <div className="flex justify-center mt-8">
                        <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/60 flex items-center justify-center text-6xl shadow-xl">
                            🕵️
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 text-center space-y-4 mt-2">
                        <div className="text-xs text-cyan-400 tracking-[0.5em] font-bold">CERTIFIED AGENT</div>
                        <div className="text-2xl font-black text-white tracking-tight">디지털 수사관</div>
                        <div className="text-sm text-gray-400 tracking-wider font-mono">ID: DI-2026-0114</div>
                        <div className="text-xs text-cyan-600/70 tracking-[0.3em] mt-2">LEVEL 7 CLEARANCE</div>
                    </div>

                    {/* Barcode */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex justify-center gap-0.5 h-10 opacity-80">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white/75 rounded-sm"
                                    style={{ width: Math.random() > 0.5 ? '3px' : '2px' }}
                                />
                            ))}
                        </div>
                        <div className="text-[9px] text-center text-gray-500 mt-2 font-mono tracking-[0.25em]">★ AUTHORIZED ACCESS ★</div>
                    </div>

                    {/* Holographic Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, transparent 25%, rgba(0, 220, 255, 0.06) 50%, transparent 75%)',
                            backgroundSize: '400% 400%',
                            animation: 'shimmer 5s infinite ease-in-out'
                        }}
                    />
                </div>
            </motion.div>

            {/* CSS Animation */}
            <style>{`
                @keyframes shimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
}
