import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './DotGrid.css';

function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

const DotGrid = ({
    dotSize = 6,
    gap = 18,
    baseColor = '#334155',
    proximity = 100,
    shockStrength = 12,
    className = ''
}) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const pointerRef = useRef({ x: -999, y: -999 });
    const dimensionsRef = useRef({ width: 0, height: 0 });

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);

    // Zone colors based on position
    const getZoneColor = useCallback((x, y) => {
        const { width, height } = dimensionsRef.current;
        if (width === 0 || height === 0) return baseRgb;

        const nx = x / width;
        const ny = y / height;
        const score = nx + ny;

        if (score < 0.8) {
            return { r: 168, g: 85, b: 247 }; // Purple (Dead Zone)
        } else if (score < 1.3) {
            return { r: 45, g: 212, b: 200 }; // Teal (Stretch Zone)
        } else {
            return { r: 163, g: 230, b: 53 }; // Lime (Easy Zone)
        }
    }, [baseRgb]);

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const rect = wrap.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (width === 0 || height === 0) return;

        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        dimensionsRef.current = { width, height };

        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        const cols = Math.ceil(width / gap);
        const rows = Math.ceil(height / gap);

        const gridW = (cols - 1) * gap;
        const gridH = (rows - 1) * gap;
        const startX = (width - gridW) / 2;
        const startY = (height - gridH) / 2;

        const dots = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cx = startX + col * gap;
                const cy = startY + row * gap;
                dots.push({ cx, cy, xOffset: 0, yOffset: 0 });
            }
        }
        dotsRef.current = dots;

        console.log(`DotGrid: Built ${dots.length} dots in ${width}x${height}`);
    }, [gap]);

    // Animation Loop
    useEffect(() => {
        let rafId;
        const proxSq = proximity * proximity;

        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) {
                rafId = requestAnimationFrame(draw);
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                rafId = requestAnimationFrame(draw);
                return;
            }

            const { width, height } = dimensionsRef.current;
            const dpr = window.devicePixelRatio || 1;

            // Clear the entire canvas using actual pixel dimensions
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            const { x: px, y: py } = pointerRef.current;

            for (const dot of dotsRef.current) {
                const ox = dot.cx + dot.xOffset;
                const oy = dot.cy + dot.yOffset;

                const dx = dot.cx - px;
                const dy = dot.cy - py;
                const dsq = dx * dx + dy * dy;

                let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
                let scale = 1;

                if (dsq <= proxSq) {
                    const dist = Math.sqrt(dsq);
                    const t = Math.max(0, 1 - dist / proximity);

                    const targetColor = getZoneColor(dot.cx, dot.cy);

                    r = Math.round(baseRgb.r + (targetColor.r - baseRgb.r) * t);
                    g = Math.round(baseRgb.g + (targetColor.g - baseRgb.g) * t);
                    b = Math.round(baseRgb.b + (targetColor.b - baseRgb.b) * t);

                    scale = 1 + t * 0.8; // Grow up to 1.8x when close
                }

                ctx.save();
                ctx.translate(ox, oy);
                ctx.scale(scale, scale);
                ctx.beginPath();
                ctx.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fill();
                ctx.restore();
            }

            rafId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(rafId);
    }, [proximity, baseRgb, getZoneColor, dotSize]);

    // Interaction Handlers
    useEffect(() => {
        buildGrid();

        const ro = new ResizeObserver(buildGrid);
        if (wrapperRef.current) ro.observe(wrapperRef.current);

        const wrapper = wrapperRef.current;

        const onMove = (e) => {
            if (!wrapper) return;
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            pointerRef.current = { x, y };

            // Repulsion effect
            for (const dot of dotsRef.current) {
                const dx = dot.cx - x;
                const dy = dot.cy - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < proximity) {
                    const force = (1 - dist / proximity) * shockStrength;
                    const angle = Math.atan2(dy, dx);

                    gsap.to(dot, {
                        xOffset: Math.cos(angle) * force,
                        yOffset: Math.sin(angle) * force,
                        duration: 0.15,
                        overwrite: 'auto',
                        onComplete: () => {
                            gsap.to(dot, {
                                xOffset: 0,
                                yOffset: 0,
                                duration: 0.8,
                                ease: "elastic.out(1, 0.4)"
                            });
                        }
                    });
                }
            }
        };

        const onLeave = () => {
            pointerRef.current = { x: -999, y: -999 };
        };

        // Attach to WRAPPER not canvas for better event capture
        if (wrapper) {
            wrapper.addEventListener('mousemove', onMove);
            wrapper.addEventListener('mouseleave', onLeave);
        }

        return () => {
            ro.disconnect();
            if (wrapper) {
                wrapper.removeEventListener('mousemove', onMove);
                wrapper.removeEventListener('mouseleave', onLeave);
            }
        };
    }, [buildGrid, proximity, shockStrength]);

    return (
        <div
            className={`dot-grid ${className}`}
            ref={wrapperRef}
            style={{ cursor: 'crosshair' }}
        >
            <canvas ref={canvasRef} className="dot-grid__canvas" />
        </div>
    );
};

export default DotGrid;
