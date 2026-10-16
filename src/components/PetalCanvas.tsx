import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'mint_leaf' | 'emerald_petal' | 'jasmine' | 'gold_dust';
  opacity: number;
  swingOffset: number;
  swingSpeed: number;
}

export const PetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = window.innerWidth < 768 ? 26 : 48;
    const particles: Particle[] = [];

    const types: Particle['type'][] = ['mint_leaf', 'emerald_petal', 'jasmine', 'gold_dust', 'mint_leaf'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 0.8 + 0.45,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.6 + 0.35,
        swingOffset: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let time = 0;

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'mint_leaf') {
        // Delicate Pastel Mint Leaf
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
        grad.addColorStop(0, '#D1FAE5');
        grad.addColorStop(0.6, '#6EE7B7');
        grad.addColorStop(1, '#059669');

        ctx.fillStyle = grad;
        ctx.beginPath();
        // Leaf shape
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.6, 0, 0, -p.size);
        ctx.fill();
      } else if (p.type === 'emerald_petal') {
        // Vibrant Teal-Green Petal
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
        grad.addColorStop(0, '#5EEAD4');
        grad.addColorStop(0.5, '#0D9488');
        grad.addColorStop(1, '#0A5C53');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'jasmine') {
        // Pure White / Frosted Mint Blossom
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.size);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.8, '#F0FDF4');
        grad.addColorStop(1, '#A7F3D0');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.45, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Shimmering Gold Stardust
        const grad = ctx.createRadialGradient(0, 0, 0.5, 0, 0, p.size * 0.6);
        grad.addColorStop(0, '#FEF08A');
        grad.addColorStop(0.5, '#D4AF37');
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swingSpeed + p.swingOffset) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 select-none"
    />
  );
};
