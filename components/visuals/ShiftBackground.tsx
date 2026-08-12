'use client';

import { useEffect, useRef } from 'react';

type RGB = [number, number, number];

type ShiftLight = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  radius: number;
  opacity: number;
  color: RGB;
};

// const LIGHT_COLORS: RGB[] = [
//   [7, 20, 45],
//   [10, 35, 70],
//   [36, 107, 255],
//   [20, 199, 229],
//   [242, 57, 138],
// ];
const LIGHT_COLORS: RGB[] = [
  [36, 107, 255],
  [36, 107, 255],
  [154, 51, 255],
  [154, 51, 255],
  [242, 57, 138],
  [20, 199, 229],
];
const BASE_SPEED = 0.35;
const RANGE_SPEED = 0.45;

const BASE_RADIUS = 180;
const RANGE_RADIUS = 260;

const BASE_TTL = 1800;
const RANGE_TTL = 2400;

export default function ShiftBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let lights: ShiftLight[] = [];
    let animationFrameId = 0;

    const createLight = (): ShiftLight => {
      const angle = Math.random() * Math.PI * 2;
      const speed = BASE_SPEED + Math.random() * RANGE_SPEED;
      const ttl = BASE_TTL + Math.random() * RANGE_TTL;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * ttl,
        ttl,
        radius: BASE_RADIUS + Math.random() * RANGE_RADIUS,
        opacity: 0.04 + Math.random() * 0.03,
        color:
          LIGHT_COLORS[
            Math.floor(Math.random() * LIGHT_COLORS.length)
          ] ?? LIGHT_COLORS[0],
      };
    };

    const initializeLights = () => {
      const lightCount = width < 768 ? 7 : 12;

      lights = Array.from(
        { length: lightCount },
        createLight
      );
    };

    const drawFrame = (frameStep: number) => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'screen';

      lights.forEach((light, index) => {
        const progress = light.life / light.ttl;
        const fade = Math.sin(progress * Math.PI);
        const opacity = fade * light.opacity;
        const [red, green, blue] = light.color;

        const glow = context.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          light.radius
        );

        glow.addColorStop(
          0,
          `rgba(${red}, ${green}, ${blue}, ${opacity})`
        );

        glow.addColorStop(
          0.4,
          `rgba(${red}, ${green}, ${blue}, ${opacity * 0.45})`
        );

        glow.addColorStop(
          1,
          `rgba(${red}, ${green}, ${blue}, 0)`
        );

        context.fillStyle = glow;
        context.beginPath();
        context.arc(
          light.x,
          light.y,
          light.radius,
          0,
          Math.PI * 2
        );
        context.fill();

        light.x += light.vx * frameStep;
        light.y += light.vy * frameStep;
        light.life += frameStep;

        const outsideCanvas =
          light.x < -light.radius ||
          light.x > width + light.radius ||
          light.y < -light.radius ||
          light.y > height + light.radius;

        if (light.life >= light.ttl || outsideCanvas) {
          lights[index] = createLight();
        }
      });

      context.globalCompositeOperation = 'source-over';
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        1.5
      );

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
      );

      initializeLights();
      drawFrame(0);
    };

    resizeCanvas();

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!reducedMotion) {
      let previousTime = performance.now();

      const animate = (currentTime: number) => {
        const frameStep = Math.min(
          (currentTime - previousTime) / 16.67,
          2.5
        );

        previousTime = currentTime;
        drawFrame(frameStep);

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{
        filter: 'blur(55px)',
        transform: 'scale(1.12)',
      }}
    />
  );
}