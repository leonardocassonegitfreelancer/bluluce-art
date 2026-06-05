import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { productsSlug } from "@/i18n/slugs";
import mareImg from "@/assets/mediterranean_sea.png";
import ninfeImg from "@/assets/Ninfe picture for the home.png";
import oliveImg from "@/assets/olive_sun.png";
import terraImg from "@/assets/terracotta_clay.png";
import scorciImg from "@/assets/scorci_mediterraneo.png";

/*
 * GalleryHall — immersive infinite 3D art gallery (Three.js).
 * Based on the MIT-licensed CodePen "Infinite Gallery Hall" by nassimberrada
 * (https://codepen.io/nassimberrada/pen/EayPjpM); rewritten in React, scoped to
 * its container, re-themed and fed with Bluluce artworks. Paintings are
 * clickable (→ their collection) and all copy is localised. MIT notice retained.
 *
 * mode="full"    → fills the viewport, navigate by scroll/drag (a page on its own)
 * mode="section" → bounded height inside a normal page, navigate by drag + arrows
 */

type Lang = "it" | "en" | "es";

type PaintingBase = { src: string; category: "mare" | "terra" | "ulivo"; year: string };

// Astro image imports are ImageMetadata at runtime but typed as `string` in .tsx
const srcOf = (m: unknown): string => (typeof m === "string" ? m : (m as { src: string }).src);

const BASE: PaintingBase[] = [
  { src: srcOf(mareImg), category: "mare", year: "2026" },
  { src: srcOf(ninfeImg), category: "mare", year: "2025" },
  { src: srcOf(oliveImg), category: "ulivo", year: "2026" },
  { src: srcOf(terraImg), category: "terra", year: "2025" },
  { src: srcOf(scorciImg), category: "mare", year: "2024" },
];

type PText = { cat: string; t1: string; t2: string; desc: string; medium: string };

const TEXT: Record<Lang, PText[]> = {
  it: [
    { cat: "01 — Mare", t1: "Sussurro", t2: "dell'Onda", desc: "Pennellate profonde e foglia d'oro catturano il movimento continuo e l'energia vibrante delle onde del Mediterraneo.", medium: "Olio e foglia d'oro su lino" },
    { cat: "02 — Figura", t1: "Ninfa", t2: "Mediterranea", desc: "La figura femminile si fonde con il mare, tra luce e materia, in un dialogo silenzioso tra corpo e paesaggio.", medium: "Olio su tela" },
    { cat: "03 — Ulivo", t1: "Luce", t2: "d'Ulivo", desc: "Contrasti caldi tra il verde argentato delle foglie d'ulivo e la luce zenitale del mezzogiorno mediterraneo.", medium: "Olio e foglia d'oro su lino grezzo" },
    { cat: "04 — Terra", t1: "Terra", t2: "Arsa", desc: "Forme organiche minimaliste e sfumature di terracotta che richiamano la materia prima e la sabbia arsa dal sole.", medium: "Pigmenti naturali su lino" },
    { cat: "05 — Mare", t1: "Scorci", t2: "Mediterranei", desc: "Frammenti di costa e riflessi d'acqua, dove l'architettura incontra il respiro lento del mare.", medium: "Tecnica mista su tela" },
  ],
  en: [
    { cat: "01 — Sea", t1: "Whisper", t2: "of the Wave", desc: "Deep brushstrokes and gold leaf capture the continuous movement and vibrant energy of the Mediterranean waves.", medium: "Oil and gold leaf on linen" },
    { cat: "02 — Figure", t1: "Mediterranean", t2: "Nymph", desc: "The female figure merges with the sea, between light and matter, in a silent dialogue of body and landscape.", medium: "Oil on canvas" },
    { cat: "03 — Olive", t1: "Olive", t2: "Light", desc: "Warm contrasts between the silvery green of olive leaves and the zenith light of the Mediterranean noon.", medium: "Oil and gold leaf on raw linen" },
    { cat: "04 — Earth", t1: "Scorched", t2: "Earth", desc: "Minimalist organic shapes and terracotta shades recalling raw matter and sand burnt by the sun.", medium: "Natural pigments on linen" },
    { cat: "05 — Sea", t1: "Mediterranean", t2: "Glimpses", desc: "Fragments of coast and reflections of water, where architecture meets the slow breath of the sea.", medium: "Mixed media on canvas" },
  ],
  es: [
    { cat: "01 — Mar", t1: "Susurro", t2: "de la Ola", desc: "Pinceladas profundas y pan de oro capturan el movimiento continuo y la energía vibrante de las olas del Mediterráneo.", medium: "Óleo y pan de oro sobre lino" },
    { cat: "02 — Figura", t1: "Ninfa", t2: "Mediterránea", desc: "La figura femenina se funde con el mar, entre luz y materia, en un diálogo silencioso entre cuerpo y paisaje.", medium: "Óleo sobre lienzo" },
    { cat: "03 — Olivo", t1: "Luz", t2: "de Olivo", desc: "Contrastes cálidos entre el verde plateado de las hojas de olivo y la luz cenital del mediodía mediterráneo.", medium: "Óleo y pan de oro sobre lino crudo" },
    { cat: "04 — Tierra", t1: "Tierra", t2: "Quemada", desc: "Formas orgánicas minimalistas y matices de terracota que evocan la materia prima y la arena quemada por el sol.", medium: "Pigmentos naturales sobre lino" },
    { cat: "05 — Mar", t1: "Vistas", t2: "Mediterráneas", desc: "Fragmentos de costa y reflejos de agua, donde la arquitectura se encuentra con el respiro lento del mar.", medium: "Técnica mixta sobre lienzo" },
  ],
};

const UI: Record<Lang, { artist: string; year: string; medium: string; hintFull: string; hintSection: string; cta: string }> = {
  it: { artist: "Artista", year: "Anno", medium: "Tecnica", hintFull: "Scorri o trascina per esplorare", hintSection: "Trascina o usa le frecce per esplorare", cta: "Scopri la collezione" },
  en: { artist: "Artist", year: "Year", medium: "Medium", hintFull: "Scroll or drag to explore", hintSection: "Drag or use the arrows to explore", cta: "Discover the collection" },
  es: { artist: "Artista", year: "Año", medium: "Técnica", hintFull: "Desplaza o arrastra para explorar", hintSection: "Arrastra o usa las flechas para explorar", cta: "Descubre la colección" },
};

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

interface GalleryHallProps {
  mode?: "full" | "section";
  /** UI / content language. */
  lang?: Lang;
  /** Where the logo links (full mode = escape to home). */
  homeHref?: string;
}

const GalleryHall = ({ mode = "full", lang = "it", homeHref = "/" }: GalleryHallProps) => {
  const L: Lang = (["it", "en", "es"].includes(lang) ? lang : "it") as Lang;
  const text = TEXT[L];
  const ui = UI[L];
  const slug = productsSlug[L];
  const hrefs = BASE.map((b) => `/${L}/${slug}/${b.category}`);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<() => void>(() => {});
  const prevRef = useRef<() => void>(() => {});
  const hrefsRef = useRef(hrefs);
  hrefsRef.current = hrefs;

  // WebGL is client-only: render the inner DOM after mount so server HTML and
  // the first client render match (no hydration mismatch inside the home island).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    const mount = canvasRef.current;
    if (!root || !mount) return;

    const count = BASE.length;
    const totalWidth = count * CONFIG.spacingX;
    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    let isMobile = window.innerWidth < 768;
    let aspect = width / height;
    let activeCamZ = CONFIG.camZ;
    let galleryOffsetX = isMobile ? 0 : 8;
    let galleryOffsetY = 0;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 12, 120);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, activeCamZ);

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
    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < count; i++) {
      const group = new THREE.Group();
      group.position.set(i * CONFIG.spacingX, 0, 0);

      const paintingGroup = new THREE.Group();

      const tex = loader.load(
        encodeURI(BASE[i].src),
        (t) => {
          const imgW = t.image ? (t.image.naturalWidth || t.image.width) : 0;
          const imgH = t.image ? (t.image.naturalHeight || t.image.height) : 0;
          if (imgW && imgH) {
            const textureAspect = imgW / imgH;
            const targetAspect = CONFIG.pWidth / CONFIG.pHeight;
            paintingGroup.scale.set(textureAspect / targetAspect, 1, 1);
          }
        }
      );
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.push(tex);
      const mat = new THREE.MeshBasicMaterial({ map: tex });
      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.userData.index = i;
      meshes.push(mesh);
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

      paintingGroup.add(shadow, mesh, outline);
      group.add(paintingGroup, lines);
      galleryGroup.add(group);
      groups.push(group);
    }

    galleryGroup.rotation.y = CONFIG.wallAngleY;
    galleryGroup.position.x = galleryOffsetX;
    galleryGroup.position.y = galleryOffsetY;

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

    // pointer drag + click-to-open (raycast)
    const raycaster = new THREE.Raycaster();
    const hoverNDC = new THREE.Vector2();
    let hoverInside = false;
    let dragging = false;
    let lastX = 0;
    let movedDist = 0;

    const setNDC = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      hoverNDC.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      hoverNDC.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      hoverInside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };

    const pickIndex = () => {
      raycaster.setFromCamera(hoverNDC, camera);
      const hits = raycaster.intersectObjects(meshes, false);
      return hits.length ? (hits[0].object.userData.index as number) : -1;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      movedDist = 0;
      setNDC(e);
      if (snapTimer) window.clearTimeout(snapTimer);
    };
    const onMove = (e: PointerEvent) => {
      setNDC(e);
      if (!dragging) return;
      const diff = lastX - e.clientX;
      targetScroll += diff * 0.18;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
      movedDist += Math.abs(diff);
      lastX = e.clientX;
    };
    const onUp = () => {
      const wasDragging = dragging;
      dragging = false;
      if (!wasDragging) return;
      // treat as a click (open the painting's collection) if the pointer barely moved
      if (movedDist < 6 && hoverInside) {
        const idx = pickIndex();
        if (idx >= 0 && !isMobile) {
          window.location.href = hrefsRef.current[idx];
          return;
        }
      }
      snap();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onCancel = () => {
      dragging = false;
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
    window.addEventListener("pointercancel", onCancel);
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
    let lastCursor = "";
    const animate = () => {
      raf = requestAnimationFrame(animate);
      currentScroll += (targetScroll - currentScroll) * CONFIG.lerpSpeed;
      camera.position.x = currentScroll * Math.cos(CONFIG.wallAngleY);
      camera.position.z = activeCamZ - currentScroll * Math.sin(CONFIG.wallAngleY);
      groups.forEach((g, i) => {
        const originalX = i * CONFIG.spacingX;
        const shift = Math.round((currentScroll - originalX) / totalWidth) * totalWidth;
        g.position.x = originalX + shift;
      });
      camera.rotation.x = mouse.y * 0.05;
      camera.rotation.y = -mouse.x * 0.05;
      updateUI(currentScroll);
      renderer.render(scene, camera);

      // cursor feedback: pointer when hovering a painting
      const cursor = dragging ? "grabbing" : hoverInside && pickIndex() >= 0 ? "pointer" : "grab";
      if (cursor !== lastCursor) { el.style.cursor = cursor; lastCursor = cursor; }
    };
    animate();

    // ── resize ─────────────────────────────────────────────
    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;

      isMobile = window.innerWidth < 768;
      aspect = width / height;
      activeCamZ = CONFIG.camZ;
      galleryOffsetX = isMobile ? 0 : 8;
      galleryOffsetY = 0;

      galleryGroup.position.x = galleryOffsetX;
      galleryGroup.position.y = galleryOffsetY;

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
      window.removeEventListener("pointercancel", onCancel);
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
        .gh-veil { position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: linear-gradient(to right, rgba(247,247,245,0.7) 0%, rgba(247,247,245,0.42) 26%, rgba(247,247,245,0.14) 44%, rgba(247,247,245,0) 56%); }
        .gh-logo { position: absolute; top: 36px; left: clamp(28px,5vw,56px); z-index: 10;
          font-family: var(--font-display, "Playfair Display", serif); font-weight: 700; letter-spacing: 0.22em;
          font-size: 0.85rem; text-transform: uppercase; color: #161310; }
        .gh-logo .gh-art { color: #b08d4e; }
        .gh-ui { position: absolute; inset: 0; z-index: 5; pointer-events: none; }
        .gh-slide { position: absolute; top: 22%; left: clamp(40px,14vw,220px); width: min(32vw, 400px);
          opacity: 0; transform: translateY(22px); transition: opacity .8s ease, transform .8s ease-out;
          text-shadow: 0 1px 16px rgba(247,247,245,0.92), 0 0 2px rgba(247,247,245,0.95); }
        .gh-slide.gh-active { opacity: 1; transform: translateY(0); }
        .gh-cat { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.28em; color: #b08d4e;
          margin-bottom: 1.4rem; display: inline-block; border-bottom: 1px solid rgba(176,141,78,0.4); padding-bottom: 6px; }
        .gh-title { font-family: var(--font-display, "Playfair Display", serif); font-weight: 400; font-style: italic;
          font-size: clamp(2.2rem, 3.7vw, 3.7rem); line-height: 1; margin: 0 0 1.3rem; color: #0d0d0d; }
        .gh-desc { font-family: var(--font-body, "Lato", sans-serif); font-weight: 300; font-size: 0.98rem;
          line-height: 1.75; color: #555; margin-bottom: 1.8rem; }
        .gh-meta { display: grid; grid-template-columns: 86px 1fr; row-gap: 0.6rem;
          border-top: 1px solid #e2ddd4; padding-top: 1.1rem; margin-bottom: 1.8rem; }
        .gh-ml { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.15em; color: #a98c52; align-self: center; }
        .gh-mv { font-family: var(--font-display, "Playfair Display", serif); font-size: 1.02rem; font-style: italic; color: #2a2520; }
        .gh-slide-cta { pointer-events: auto; display: inline-flex; align-items: center; gap: 0.5em;
          padding: 0.78rem 1.7rem; font-family: var(--font-body, "Lato", sans-serif); font-size: 0.6rem;
          letter-spacing: 0.26em; text-transform: uppercase; text-decoration: none; cursor: pointer;
          border: 1px solid rgba(176,141,78,0.6); color: #6b5630; background: rgba(247,247,245,0.4);
          transition: background .4s ease, color .4s ease; }
        .gh-slide-cta:hover { background: #b08d4e; color: #fff; }
        .gh-hint { position: absolute; bottom: 34px; left: clamp(28px,5vw,56px); z-index: 10;
          font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.2em; color: #9a9a95; }
        .gh-controls { position: absolute; bottom: 32px; right: clamp(28px,5vw,56px); z-index: 10;
          display: flex; gap: 14px; pointer-events: auto; }
        .gh-arrow { width: 50px; height: 50px; border-radius: 999px; border: 1px solid rgba(0,0,0,0.18);
          display: grid; place-items: center; cursor: pointer; background: rgba(255,255,255,0.55); backdrop-filter: blur(4px);
          transition: border-color .3s ease, background .3s ease; }
        .gh-arrow:hover { border-color: #b08d4e; background: rgba(176,141,78,0.12); }
        .gh-arrow svg { width: 20px; height: 20px; color: #4a4540; }

        @media (max-width: 767px) {
          .gh-canvas {
            height: 56dvh;
            top: 0;
            bottom: auto;
          }
          .gh-veil {
            display: none;
          }
          .gh-slide {
            top: 58dvh;
            bottom: auto;
            left: 24px;
            right: 24px;
            width: auto;
            max-width: none;
            text-shadow: none;
          }
          .gh-cat { margin-bottom: 0.4rem; padding-bottom: 4px; }
          .gh-title {
            font-size: clamp(1.6rem, 5vw, 2rem);
            margin-bottom: 0.4rem;
            line-height: 1.1;
          }
          .gh-desc {
            font-size: 0.85rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
          }
          .gh-meta {
            display: none;
          }
          .gh-slide-cta {
            padding: 0.6rem 1.2rem;
            font-size: 0.55rem;
          }
          .gh-hint {
            display: none;
          }
          .gh-controls {
            top: 57.5dvh;
            bottom: auto;
            left: auto;
            right: 24px;
            gap: 8px;
            z-index: 10;
          }
          .gh-arrow {
            width: 38px;
            height: 38px;
            background: rgba(255,255,255,0.75);
          }
          .gh-arrow svg {
            width: 16px;
            height: 16px;
          }
        }
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
            {BASE.map((b, i) => (
              <div key={i} className="gh-slide" id={`gh-slide-${i}`}>
                <span className="gh-cat">{text[i].cat}</span>
                <h2 className="gh-title">{text[i].t1}<br />{text[i].t2}</h2>
                <p className="gh-desc">{text[i].desc}</p>
                <div className="gh-meta">
                  <span className="gh-ml">{ui.artist}</span><span className="gh-mv">Bluluce</span>
                  <span className="gh-ml">{ui.year}</span><span className="gh-mv">{b.year}</span>
                  <span className="gh-ml">{ui.medium}</span><span className="gh-mv">{text[i].medium}</span>
                </div>
                <a className="gh-slide-cta" href={hrefs[i]}>{ui.cta} →</a>
              </div>
            ))}
          </div>

          <div className="gh-hint">{mode === "full" ? ui.hintFull : ui.hintSection}</div>

          <div className="gh-controls">
            <div className="gh-arrow" role="button" aria-label="Prev" onClick={() => prevRef.current()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div className="gh-arrow" role="button" aria-label="Next" onClick={() => nextRef.current()}>
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
