import { useState, useRef, useEffect, useCallback } from "react";

interface InteractivePaintingProps {
  imageSrc: string;
  alt: string;
  theme: "mare" | "terra" | "ulivo";
}

// ─── WebGL shaders ────────────────────────────────────────────────────────────

const VERT = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  uniform sampler2D u_tex;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_hover;
  varying vec2 v_uv;

  void main() {
    float t = u_time * 0.00035;
    float dx = sin(v_uv.y * 7.0 + t * 1.3) * 0.0028
             + sin(v_uv.x * 5.0 + t * 0.9) * 0.0016;
    float dy = cos(v_uv.x * 6.0 + t * 1.1) * 0.0028
             + cos(v_uv.y * 4.0 + t * 0.7) * 0.0016;

    vec2 fromMouse = v_uv - u_mouse;
    float dist = length(fromMouse);
    float ripple = sin(dist * 18.0 - t * 8.0) * 0.0022
                 * u_hover * max(0.0, 1.0 - dist * 2.5);
    dx += fromMouse.x / max(dist, 0.001) * ripple;
    dy += fromMouse.y / max(dist, 0.001) * ripple;

    vec2 uv = clamp(v_uv + vec2(dx, dy), 0.001, 0.999);
    vec4 col = texture2D(u_tex, uv);
    col.rgb *= 1.025 + u_hover * 0.015;
    gl_FragColor = col;
  }
`;

function makeShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function makeProgram(gl: WebGLRenderingContext) {
  const p = gl.createProgram()!;
  gl.attachShader(p, makeShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, makeShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
  return p;
}

// Detect mobile/touch device — skip WebGL to avoid context limits on iOS/Android
function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    navigator.maxTouchPoints > 1 ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

// ─── Desktop WebGL Painting ───────────────────────────────────────────────────

function DesktopPainting({ imageSrc, alt, theme }: InteractivePaintingProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef({
    gl:    null as WebGLRenderingContext | null,
    prog:  null as WebGLProgram | null,
    raf:   0,
    hover: 0,
    isHov: false,
    mouse: { x: 0.5, y: 0.5 },
    ready: false,
  });

  const [tiltCSS,   setTiltCSS]   = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [coords,    setCoords]    = useState({ x: 0.5, y: 0.5 });
  const [webglOk,   setWebglOk]   = useState<boolean | null>(null);

  // Init WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" }) as WebGLRenderingContext | null;
    if (!gl) { setWebglOk(false); return; }
    const prog = makeProgram(gl);
    if (!prog) { setWebglOk(false); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    stateRef.current.gl   = gl;
    stateRef.current.prog = prog;

    const img = new Image();
    img.onload = () => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        stateRef.current.ready = true;
        setWebglOk(true);
      } catch { setWebglOk(false); }
    };
    img.onerror = () => setWebglOk(false);
    img.src = imageSrc;

    return () => { cancelAnimationFrame(stateRef.current.raf); gl.deleteProgram(prog); };
  }, [imageSrc]);

  // Sync canvas size
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    if (!wrapper || !canvas) return;
    const sync = () => {
      const w = wrapper.clientWidth, h = wrapper.clientHeight;
      if (!w || !h) return;
      canvas.width = w; canvas.height = h;
      stateRef.current.gl?.viewport(0, 0, w, h);
    };
    const ro = new ResizeObserver(sync);
    ro.observe(wrapper);
    sync();
    return () => ro.disconnect();
  }, []);

  // Render loop
  useEffect(() => {
    if (!webglOk) return;
    const s = stateRef.current;
    const gl = s.gl!, prog = s.prog!;
    const t0 = performance.now();
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uHover = gl.getUniformLocation(prog, "u_hover");
    gl.uniform1i(gl.getUniformLocation(prog, "u_tex"), 0);
    const loop = () => {
      if (!s.ready) { s.raf = requestAnimationFrame(loop); return; }
      s.hover += ((s.isHov ? 1 : 0) - s.hover) * 0.05;
      gl.uniform1f(uTime, performance.now() - t0);
      gl.uniform2f(uMouse, s.mouse.x, s.mouse.y);
      gl.uniform1f(uHover, s.hover);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.raf);
  }, [webglOk]);

  const readPos = (clientX: number, clientY: number) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top)  / rect.height;
    stateRef.current.mouse = { x: nx, y: ny };
    setCoords({ x: nx, y: ny });
    setTiltCSS({ x: -(ny - 0.5) * 5, y: (nx - 0.5) * 5 });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => readPos(e.clientX, e.clientY), []); // eslint-disable-line
  const handleEnter = useCallback(() => { stateRef.current.isHov = true; setIsHovered(true); }, []);
  const handleLeave = useCallback(() => {
    stateRef.current.isHov = false;
    stateRef.current.mouse = { x: 0.5, y: 0.5 };
    setIsHovered(false); setTiltCSS({ x: 0, y: 0 }); setCoords({ x: 0.5, y: 0.5 });
  }, []);

  const spotlight = theme === "mare"
    ? `radial-gradient(circle at ${coords.x*100}% ${coords.y*100}%, rgba(255,235,180,0.33) 0%, rgba(255,255,255,0.05) 38%, transparent 70%)`
    : theme === "terra"
    ? `radial-gradient(circle at ${coords.x*100}% ${coords.y*100}%, rgba(255,220,185,0.28) 0%, rgba(255,255,255,0.04) 40%, transparent 75%)`
    : `radial-gradient(circle at ${coords.x*100}% ${coords.y*100}%, rgba(240,255,225,0.30) 0%, rgba(255,255,255,0.04) 38%, transparent 70%)`;

  const tiltTransform = `perspective(1000px) rotateX(${tiltCSS.x}deg) rotateY(${tiltCSS.y}deg) scale3d(${isHovered?1.03:1},${isHovered?1.03:1},1)`;

  return (
    <div ref={wrapperRef} onMouseMove={handleMouseMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      className="relative overflow-hidden w-full h-full group" style={{ cursor: "crosshair", background: "#FAF9F6" }}>
      <img src={imageSrc} alt={alt} className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: webglOk ? 0 : 1, transition: "opacity 0.8s", pointerEvents: "none" }} draggable={false} />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full"
        style={{ display: "block", opacity: webglOk ? 1 : 0, transition: "opacity 0.8s, transform 900ms cubic-bezier(0.25,1,0.5,1)", transform: tiltTransform }} />
      <div className="absolute inset-1 border border-[#B5915D]/25 pointer-events-none z-30" />
      <div className="absolute inset-0 z-30 pointer-events-none mix-blend-multiply opacity-[0.18]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "140px 140px" }} />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.13] group-hover:opacity-[0.20] transition-all duration-700"
        style={{ background: `linear-gradient(${135 + tiltCSS.y * 3}deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.04) 100%)`, mixBlendMode: "overlay" }} />
      <div className="absolute inset-y-0 left-0 z-30 pointer-events-none -translate-x-[200%] skew-x-[-30deg] group-hover:translate-x-[250%] transition-transform duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.36) 50%, rgba(255,255,255,0) 100%)", width: "60%" }} />
      <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{ background: spotlight, mixBlendMode: theme === "mare" ? "color-dodge" : "screen", opacity: isHovered ? 1 : 0.16 }} />
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] group-hover:opacity-[0.16] transition-all duration-700"
        style={{ background: `radial-gradient(circle at ${coords.x*100}% ${coords.y*100}%, rgba(0,0,0,0) 30%, rgba(20,15,10,0.6) 100%)`, mixBlendMode: "multiply" }} />
    </div>
  );
}

// ─── Mobile CSS-only Painting — dramatic scroll reveal + parallax ─────────────

function MobilePainting({ imageSrc, alt, theme }: InteractivePaintingProps) {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const [revealed,   setRevealed]   = useState(false);
  const [touched,    setTouched]    = useState(false);
  const [parallaxY,  setParallaxY]  = useState(0);

  // Theme accent colors
  const glowColor = theme === "mare"
    ? "rgba(255,235,180,0.28)"
    : theme === "terra"
    ? "rgba(255,210,160,0.25)"
    : "rgba(220,245,195,0.25)";

  // ── Scroll reveal via IntersectionObserver ────────────────────────────────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 } // trigger when 25% visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Scroll parallax — shifts image up/down slightly as user scrolls ───────
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect   = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const vhalf  = window.innerHeight / 2;
      // normalised -1..1: how far from viewport center
      const norm   = (center - vhalf) / vhalf;
      setParallaxY(norm * 14); // max 14px shift — subtle
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* Light-wave sweep that "reveals" the painting when it enters viewport */
        @keyframes revealSweep {
          0%   { left: -110%; opacity: 1; }
          100% { left: 120%;  opacity: 0; }
        }
        @keyframes colorReveal {
          0%   { filter: saturate(0) brightness(0.55); }
          100% { filter: saturate(1) brightness(1.00); }
        }
        @keyframes paintingBreathe {
          0%   { transform: scale(1.000); }
          50%  { transform: scale(1.010); }
          100% { transform: scale(1.000); }
        }
      `}</style>

      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full h-full"
        style={{ background: "#FAF9F6" }}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
      >
        {/* The painting image — starts dark+grey, reveals to color on scroll */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          style={{
            // Scroll parallax
            transform: `translateY(${parallaxY}px) scale(${touched ? 1.04 : 1.06})`,
            // Color reveal animation fires when "revealed" state becomes true
            animation: revealed
              ? `colorReveal 1.1s cubic-bezier(0.4,0,0.2,1) forwards,
                 paintingBreathe 7s 1.2s ease-in-out infinite`
              : "none",
            filter: revealed ? undefined : "saturate(0) brightness(0.55)",
            transition: touched
              ? "transform 0.35s ease"
              : "transform 0.9s cubic-bezier(0.25,1,0.5,1)",
            willChange: "transform, filter",
          }}
          draggable={false}
        />

        {/* Golden light sweep — fires once on reveal */}
        {revealed && (
          <div
            className="absolute inset-y-0 pointer-events-none z-20"
            style={{
              width: "55%",
              background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,248,220,0.75) 50%, rgba(255,255,255,0) 100%)",
              skewX: "-12deg",
              animation: "revealSweep 1.0s cubic-bezier(0.4,0,0.2,1) forwards",
              top: 0,
              bottom: 0,
            }}
          />
        )}

        {/* Inner gilded fillet */}
        <div className="absolute inset-1 border border-[#B5915D]/25 pointer-events-none z-30" />

        {/* Subtle canvas grain */}
        <div className="absolute inset-0 z-30 pointer-events-none mix-blend-multiply opacity-[0.18]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "140px 140px" }} />

        {/* Permanent diagonal glass sheen */}
        <div className="absolute inset-0 z-30 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.03) 100%)", mixBlendMode: "overlay", opacity: 0.15 }} />

        {/* Touch glow overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`, mixBlendMode: "screen", opacity: touched ? 1 : 0 }} />

        {/* Soft edge vignette */}
        <div className="absolute inset-0 z-20 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(20,15,10,0.5) 100%)", mixBlendMode: "multiply", opacity: 0.10 }} />
      </div>
    </>
  );
}

// ─── Main export — picks the right version ───────────────────────────────────

export default function InteractivePainting(props: InteractivePaintingProps) {
  const [mobile] = useState(() => isMobileDevice());
  return mobile ? <MobilePainting {...props} /> : <DesktopPainting {...props} />;
}
