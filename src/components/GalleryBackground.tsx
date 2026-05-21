import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  phase: number;
}

interface LightBeam {
  x: number;
  width: number;
  opacity: number;
  speed: number;
  phase: number;
}

export default function GalleryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let beams: LightBeam[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initScene();
    };

    const initScene = () => {
      // Golden dust particles — very subtle, slow, serene
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.4,
          speedX: (Math.random() - 0.5) * 0.18,
          speedY: -Math.random() * 0.22 - 0.05, // drift upward slowly
          opacity: Math.random() * 0.55 + 0.1,
          opacitySpeed: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
        });
      }

      // Volumetric vertical light beams
      beams = [];
      const beamCount = 3;
      for (let i = 0; i < beamCount; i++) {
        beams.push({
          x: (canvas.width / (beamCount + 1)) * (i + 1) + (Math.random() - 0.5) * 120,
          width: Math.random() * 80 + 60,
          opacity: Math.random() * 0.06 + 0.02,
          speed: Math.random() * 0.004 + 0.002,
          phase: (Math.PI * 2 * i) / beamCount,
        });
      }
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // --- Draw light beams ---
      for (const beam of beams) {
        beam.phase += beam.speed;
        const beamOpacity = beam.opacity + Math.sin(beam.phase) * 0.025;
        
        const grad = ctx.createLinearGradient(beam.x, 0, beam.x, canvas.height);
        grad.addColorStop(0, `rgba(255, 250, 220, ${beamOpacity * 0.7})`);
        grad.addColorStop(0.3, `rgba(255, 248, 210, ${beamOpacity})`);
        grad.addColorStop(0.7, `rgba(255, 248, 210, ${beamOpacity * 0.8})`);
        grad.addColorStop(1, `rgba(255, 250, 220, 0)`);

        // Beam body (soft radial falloff horizontally)
        const halfW = beam.width / 2;
        const beamGrad = ctx.createLinearGradient(beam.x - halfW, 0, beam.x + halfW, 0);
        beamGrad.addColorStop(0, `rgba(255, 250, 210, 0)`);
        beamGrad.addColorStop(0.3, `rgba(255, 248, 205, ${beamOpacity * 0.6})`);
        beamGrad.addColorStop(0.5, `rgba(255, 248, 200, ${beamOpacity})`);
        beamGrad.addColorStop(0.7, `rgba(255, 248, 205, ${beamOpacity * 0.6})`);
        beamGrad.addColorStop(1, `rgba(255, 250, 210, 0)`);

        ctx.save();
        ctx.fillStyle = beamGrad;
        ctx.fillRect(beam.x - halfW, 0, beam.width, canvas.height);
        ctx.restore();
      }

      // --- Draw golden dust particles ---
      for (const p of particles) {
        p.x += p.speedX + Math.sin(frame * 0.003 + p.phase) * 0.08;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        // Clamp and bounce opacity
        if (p.opacity > 0.65) { p.opacity = 0.65; p.opacitySpeed *= -1; }
        if (p.opacity < 0.05) { p.opacity = 0.05; p.opacitySpeed *= -1; }

        // Wrap around
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        // Draw as a soft glowing golden circle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grad.addColorStop(0, `rgba(220, 185, 110, ${p.opacity})`);
        grad.addColorStop(0.5, `rgba(210, 175, 100, ${p.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(200, 165, 90, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
      aria-hidden="true"
    />
  );
}
