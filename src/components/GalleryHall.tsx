import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import mareImg from "@/assets/mediterranean_sea.png";
import ninfeImg from "@/assets/Ninfe picture for the home.png";
import oliveImg from "@/assets/olive_sun.png";
import terraImg from "@/assets/terracotta_clay.png";
import scorciImg from "@/assets/scorci_mediterraneo.png";

/*
 * GalleryHall — immersive infinite 3D art gallery (Three.js).
 * Based on the MIT-licensed CodePen "Infinite Gallery Hall" by nassimberrada
 * (https://codepen.io/nassimberrada/pen/EayPjpM); rewritten in React, scoped to
 * its container, re-themed dark/gold and fed with Bluluce artworks.
 * MIT copyright notice retained.
 *
 * mode="full"    → fills the viewport, navigate by scroll/drag (a page on its own)
 * mode="section" → bounded height inside a normal page, navigate by drag + arrows
 */

type Painting = {
  src: string;
  cat: string;
  t1: string;
  t2: string;
  desc: string;
  artist: string;
  year: string;
  medium: string;
};

const PAINTINGS: Painting[] = [
  { src: mareImg.src, cat: "01 — Mare", t1: "Sussurro", t2: "dell'Onda", desc: "Pennellate profonde e foglia d'oro catturano il movimento continuo e l'energia vibrante delle onde del Mediterraneo.", artist: "Bluluce", year: "2026", medium: "Olio e foglia d'oro su lino" },
  { src: ninfeImg.src, cat: "02 — Figura", t1: "Ninfa", t2: "Mediterranea", desc: "La figura femminile si fonde con il mare, tra luce e materia, in un dialogo silenzioso tra corpo e paesaggio.", artist: "Bluluce", year: "2025", medium: "Olio su tela" },
  { src: oliveImg.src, cat: "03 — Ulivo", t1: "Luce", t2: "d'Ulivo", desc: "Contrasti caldi tra il verde argentato delle foglie d'ulivo e la luce zenitale del mezzogiorno mediterraneo.", artist: "Bluluce", year: "2026", medium: "Olio e foglia d'oro su lino grezzo" },
  { src: terraImg.src, cat: "04 — Terra", t1: "Terra", t2: "Arsa", desc: "Forme organiche minimaliste e sfumature di terracotta che richiamano la materia prima e la sabbia arsa dal sole.", artist: "Bluluce", year: "2025", medium: "Pigmenti naturali su lino" },
  { src: scorciImg.src, cat: "05 — Mare", t1: "Scorci", t2: "Mediterranei", desc: "Frammenti di costa e riflessi d'acqua, dove l'architettura incontra il respiro lento del mare.", artist: "Bluluce", year: "2024", medium: "Tecnica mista su tela" },
];

const CONFIG = {
  spacingX: 45,
  pWidth: 14,
  pHeight: 18,
  camZ: 30,
  wallAngleY: -0.25,
  snapDelay: 200,
  lerpSpeed: 0.06,
};

const BG = 0xf7f7f5;
const GOLD = 0xc9a96e;

interface GalleryHallProps {
  mode?: "full" | "section";
  /** Where the logo links (full mode = escape to home). */
  homeHref?: string;
  /** Where the section CTA links (to the full gallery). */
  galleryHref?: string;
}

const GalleryHall = ({ mode = "full", homeHref = "/", galleryHref = "/gallery" }: GalleryHallProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});

  // WebGL is client-only: render the inner DOM after mount so server HTML and
  // the first client render match (no hydration mismatch inside the home island).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const mount = canvasRef.current;
    if (!root || !mount) return;

    const count = PAINTINGS.length;
    const totalWidth = count * CONFIG.spacingX;
    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 12, 120);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, CONFIG.camZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dir = new THREE.DirectionalLight(0xfff2d8, 0.5);
    dir.position.set(10, 20, 10);
    scene.add(dir);

    const galleryGroup = new THREE.Group();
    scene.add(galleryGroup);

    const loader = new THREE.TextureLoader();
    const planeGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);
    const edgesGeo = new THREE.EdgesGeometry(planeGeo);

    const disposables: { dispose: () => void }[] = [planeGeo, edgesGeo];
    const textures: THREE.Texture[] = [];
    const groups: THREE.Group[] = [];

    for (let i = 0; i < count; i++) {
      const group = new THREE.Group();
      group.position.set(i * CONFIG.spacingX, 0, 0);

      const tex = loader.load(encodeURI(PAINTINGS[i].src));
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.push(tex);
      const mat = new THREE.MeshBasicMaterial({ map: tex });
      const mesh = new THREE.Mesh(planeGeo, mat);
      disposables.push(mat);

      const outlineMat = new THREE.LineBasicMaterial({ color: 0x1f1b16 });
      const outline = new THREE.LineSegments(edgesGeo, outlineMat);
      disposables.push(outlineMat);

      const shadowGeo = new THREE.PlaneGeometry(CONFIG.pWidth, CONFIG.pHeight);
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.13 });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.position.set(1, -1, -0.5);
      disposables.push(shadowGeo, shadowMat);

      const lineZ = -1;
      const lineLen = CONFIG.spacingX;
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-lineLen / 2, 14, lineZ), new THREE.Vector3(lineLen / 2, 14, lineZ),
        new THREE.Vector3(-lineLen / 2, -14, lineZ), new THREE.Vector3(lineLen / 2, -14, lineZ),
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xdddddd });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      disposables.push(lineGeo, lineMat);

      group.add(shadow, mesh, outline, lines);
      galleryGroup.add(group);
      groups.push(group);
    }

    galleryGroup.rotation.y = CONFIG.wallAngleY;
    galleryGroup.position.x = 8;

    let currentScroll = 0;
    let targetScroll = 0;
    let snapTimer: number | null = null;
    const mouse = { x: 0, y: 0 };

    const panels = Array.from(root.querySelectorAll<HTMLElement>(".gh-slide"));

    const snap = () => {
      const index = Math.round(targetScroll / CONFIG.spacingX);
      targetScroll = index * CONFIG.spacingX;
    };
    const scheduleSnap = () => {
      if (snapTimer) window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snap, CONFIG.snapDelay);
    };

    let isLocked = false;
    let lastUnlockTime = 0;
    const maxScroll = (count - 1) * CONFIG.spacingX;

    const onScroll = () => {
      if (mode !== "section") return;
      const rect = root.getBoundingClientRect();
      // Unlock if user dragged the scrollbar far away
      if (isLocked && Math.abs(rect.top) > 250) {
        isLocked = false;
        lastUnlockTime = Date.now();
      }
    };

    nextRef.current = () => {
      if (mode === "section") {
        const rect = root.getBoundingClientRect();
        const isAligned = Math.abs(rect.top) < 180;

        if (isAligned) {
          if (targetScroll < maxScroll) {
            targetScroll += CONFIG.spacingX;
            snap();
          } else {
            isLocked = false;
            window.scrollTo({
              top: window.scrollY + window.innerHeight * 0.5,
              behavior: "smooth"
            });
          }
        } else {
          targetScroll += CONFIG.spacingX;
          snap();
        }
      } else {
        targetScroll += CONFIG.spacingX;
        snap();
      }
    };

    prevRef.current = () => {
      if (mode === "section") {
        const rect = root.getBoundingClientRect();
        const isAligned = Math.abs(rect.top) < 180;

        if (isAligned) {
          if (targetScroll > 0) {
            targetScroll -= CONFIG.spacingX;
            snap();
          } else {
            isLocked = false;
            window.scrollTo({
              top: Math.max(0, window.scrollY - window.innerHeight * 0.5),
              behavior: "smooth"
            });
          }
        } else {
          targetScroll -= CONFIG.spacingX;
          snap();
        }
      } else {
        targetScroll -= CONFIG.spacingX;
        snap();
      }
    };

    // ── input ──────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if (mode === "full") {
        targetScroll += e.deltaY * 0.1;
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
        scheduleSnap();
        return;
      }

      // mode === "section" (Teaser on Home Page)
      const rect = root.getBoundingClientRect();
      const winH = window.innerHeight;

      // Check if we should lock
      if (!isLocked && Date.now() - lastUnlockTime > 1000) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        let shouldLock = false;
        // Lock when entering from above: top of teaser starts coming into viewport from bottom
        if (isScrollingDown && rect.top > -50 && rect.top < winH - 100 && targetScroll < maxScroll) {
          shouldLock = true;
        }
        // Lock when entering from below: bottom of teaser starts coming into viewport from top
        else if (isScrollingUp && rect.top < 50 && rect.top > -winH + 100 && targetScroll > 0) {
          shouldLock = true;
        }

        if (shouldLock) {
          isLocked = true;
          // Smoothly align the viewport to center the teaser exactly
          window.scrollTo({
            top: window.scrollY + rect.top,
            behavior: "smooth"
          });
        }
      }

      // Handle locking scroll
      if (isLocked) {
        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        if (isScrollingDown && targetScroll < maxScroll) {
          if (e.cancelable) e.preventDefault();
          
          targetScroll += e.deltaY * 0.15;
          targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
          scheduleSnap();
        } else if (isScrollingUp && targetScroll > 0) {
          if (e.cancelable) e.preventDefault();

          targetScroll += e.deltaY * 0.15;
          targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
          scheduleSnap();
        } else {
          // Reached boundary, unlock scroll
          isLocked = false;
        }
      }
    };

    // pointer drag (both modes)
    let dragging = false;
    let lastX = 0;
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; if (snapTimer) window.clearTimeout(snapTimer); };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const diff = lastX - e.clientX;
      targetScroll += diff * 0.18;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
      lastX = e.clientX;
    };
    const onUp = () => { if (dragging) { dragging = false; snap(); } };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (mode === "section") {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    root.addEventListener("wheel", onWheel, { passive: false });
    const el = renderer.domElement;
    el.style.touchAction = "pan-y";
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mousemove", onMouseMove);

    // ── ui sync ────────────────────────────────────────────
    let activeIndex = -1;
    const updateUI = (scrollX: number) => {
      const raw = Math.round(scrollX / CONFIG.spacingX);
      const safe = ((raw % count) + count) % count;
      if (safe === activeIndex) return;
      activeIndex = safe;
      panels.forEach((p, i) => p.classList.toggle("gh-active", i === safe));
    };
    updateUI(0);

    // ── loop ───────────────────────────────────────────────
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      currentScroll += (targetScroll - currentScroll) * CONFIG.lerpSpeed;
      camera.position.x = currentScroll * Math.cos(CONFIG.wallAngleY);
      camera.position.z = CONFIG.camZ - currentScroll * Math.sin(CONFIG.wallAngleY);
      groups.forEach((g, i) => {
        const originalX = i * CONFIG.spacingX;
        const shift = Math.round((currentScroll - originalX) / totalWidth) * totalWidth;
        g.position.x = originalX + shift;
      });
      camera.rotation.x = mouse.y * 0.05;
      camera.rotation.y = -mouse.x * 0.05;
      updateUI(currentScroll);
      renderer.render(scene, camera);
    };
    animate();

    // ── resize ─────────────────────────────────────────────
    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      if (snapTimer) window.clearTimeout(snapTimer);
      root.removeEventListener("wheel", onWheel);
      if (mode === "section") {
        window.removeEventListener("scroll", onScroll);
      }
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      textures.forEach((t) => t.dispose());
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [mounted, mode]);
  const rootStyle: React.CSSProperties =
    mode === "full"
      ? { position: "fixed", inset: 0, background: "#f7f7f5" }
      : { position: "relative", width: "100%", height: "100dvh", background: "#f7f7f5", overflow: "hidden" };

  return (
    <section ref={rootRef} className="gh-root" style={rootStyle}>
      <style>{`
        .gh-root { color: #1a1a1a; }
        .gh-canvas { position: absolute; inset: 0; z-index: 1; cursor: grab; }
        .gh-canvas:active { cursor: grabbing; }
        .gh-veil { position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: linear-gradient(to right, rgba(247,247,245,0.7) 0%, rgba(247,247,245,0.42) 26%, rgba(247,247,245,0.14) 44%, rgba(247,247,245,0) 56%); }
        .gh-logo { position: absolute; top: 36px; left: clamp(28px,5vw,56px); z-index: 10;
          font-family: var(--font-display, "Playfair Display", serif); font-weight: 700; letter-spacing: 0.22em;
          font-size: 0.85rem; text-transform: uppercase; color: #161310; }
        .gh-logo .gh-art { color: #b08d4e; }
        .gh-ui { position: absolute; inset: 0; z-index: 5; pointer-events: none; }
        .gh-slide { position: absolute; top: 24%; left: clamp(40px,14vw,220px); width: min(32vw, 400px);
          opacity: 0; transform: translateY(22px); transition: opacity .8s ease, transform .8s ease-out;
          text-shadow: 0 1px 16px rgba(247,247,245,0.92), 0 0 2px rgba(247,247,245,0.95); }
        .gh-slide.gh-active { opacity: 1; transform: translateY(0); }
        .gh-cat { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.28em; color: #b08d4e;
          margin-bottom: 1.4rem; display: inline-block; border-bottom: 1px solid rgba(176,141,78,0.4); padding-bottom: 6px; }
        .gh-title { font-family: var(--font-display, "Playfair Display", serif); font-weight: 400; font-style: italic;
          font-size: clamp(2.4rem, 4vw, 4rem); line-height: 1; margin: 0 0 1.4rem; color: #0d0d0d; }
        .gh-desc { font-family: var(--font-body, "Lato", sans-serif); font-weight: 300; font-size: 1rem;
          line-height: 1.8; color: #555; margin-bottom: 2.4rem; }
        .gh-meta { display: grid; grid-template-columns: 86px 1fr; row-gap: 0.7rem;
          border-top: 1px solid #e2ddd4; padding-top: 1.3rem; }
        .gh-ml { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.15em; color: #a98c52; align-self: center; }
        .gh-mv { font-family: var(--font-display, "Playfair Display", serif); font-size: 1.05rem; font-style: italic; color: #2a2520; }
        .gh-hint { position: absolute; bottom: 34px; left: clamp(28px,5vw,56px); z-index: 10;
          font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.2em; color: #9a9a95; }
        .gh-controls { position: absolute; bottom: 32px; right: clamp(28px,5vw,56px); z-index: 10;
          display: flex; gap: 14px; pointer-events: auto; }
        .gh-arrow { width: 50px; height: 50px; border-radius: 999px; border: 1px solid rgba(0,0,0,0.18);
          display: grid; place-items: center; cursor: pointer; background: rgba(255,255,255,0.55); backdrop-filter: blur(4px);
          transition: border-color .3s ease, background .3s ease; }
        .gh-arrow:hover { border-color: #b08d4e; background: rgba(176,141,78,0.12); }
        .gh-arrow svg { width: 20px; height: 20px; color: #4a4540; }
        .gh-cta { position: absolute; bottom: 38px; left: clamp(40px,14vw,220px); z-index: 10; pointer-events: auto;
          display: inline-flex; align-items: center; padding: 0.85rem 2rem; font-family: var(--font-body, "Lato", sans-serif);
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase; text-decoration: none;
          border: 1px solid rgba(176,141,78,0.6); color: #6b5630; transition: background .4s ease, color .4s ease; }
        .gh-cta:hover { background: #b08d4e; color: #fff; }
      `}</style>

      {mounted && (
        <>
      <div ref={canvasRef} className="gh-canvas" />

      {/* light veil so the left-hand text never collides with a passing painting */}
      <div className="gh-veil" />

      {mode === "full" && (
        <a className="gh-logo" href={homeHref} style={{ textDecoration: "none", pointerEvents: "auto" }}>BLULUCE <span className="gh-art">ART</span></a>
      )}

      <div className="gh-ui">
        {PAINTINGS.map((p, i) => (
          <div key={i} className="gh-slide" id={`gh-slide-${i}`}>
            <span className="gh-cat">{p.cat}</span>
            <h2 className="gh-title">{p.t1}<br />{p.t2}</h2>
            <p className="gh-desc">{p.desc}</p>
            <div className="gh-meta">
              <span className="gh-ml">Artista</span><span className="gh-mv">{p.artist}</span>
              <span className="gh-ml">Anno</span><span className="gh-mv">{p.year}</span>
              <span className="gh-ml">Tecnica</span><span className="gh-mv">{p.medium}</span>
            </div>
          </div>
        ))}
      </div>

      {mode === "full" ? (
        <div className="gh-hint">Scorri o trascina per esplorare</div>
      ) : (
        <div className="gh-hint">Trascina o usa le frecce per esplorare</div>
      )}

      <div className="gh-controls">
        <div className="gh-arrow" role="button" aria-label="Precedente" onClick={() => prevRef.current()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="gh-arrow" role="button" aria-label="Successivo" onClick={() => nextRef.current()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
        </>
      )}
    </section>
  );
};

export default GalleryHall;
