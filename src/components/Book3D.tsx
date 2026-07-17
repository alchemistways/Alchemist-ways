import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";

/** Drop a GLB/GLTF here to replace the procedural chrome book. */
export const BOOK_MODEL_PATH = "/models/alchemist-book.glb";

/**
 * Still three-quarter pose like the studio mockup:
 * upright, slight yaw so spine + cover read together.
 */
const BOOK_POSE = {
  position: [0.05, -0.08, 0] as [number, number, number],
  rotation: [0.02, -0.52, 0.01] as [number, number, number],
};

const SAND = "#d6c5b6";

function makeCoverTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1280;
  const ctx = canvas.getContext("2d")!;

  // Cool chrome base — text stays dark etched
  const g = ctx.createLinearGradient(0, 0, 900, 1280);
  g.addColorStop(0, "#f2f2f4");
  g.addColorStop(0.35, "#d0d0d4");
  g.addColorStop(0.7, "#b4b4ba");
  g.addColorStop(1, "#98989e");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 1280);

  const gloss = ctx.createRadialGradient(380, 420, 40, 520, 640, 720);
  gloss.addColorStop(0, "rgba(255,255,255,0.35)");
  gloss.addColorStop(0.45, "rgba(255,255,255,0.05)");
  gloss.addColorStop(1, "rgba(20,18,16,0.28)");
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, 1024, 1280);

  ctx.fillStyle = "#1c1814";
  ctx.textAlign = "center";
  ctx.font = "600 176px 'Times New Roman', Georgia, serif";
  ctx.fillText("A · W", 512, 575);
  ctx.font = "500 52px 'Times New Roman', Georgia, serif";
  ctx.fillText("ALCHEMIST WAYS", 512, 675);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeSpineTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1280;
  const ctx = canvas.getContext("2d")!;

  const g = ctx.createLinearGradient(0, 0, 256, 0);
  g.addColorStop(0, "#a8a8ae");
  g.addColorStop(0.5, "#d8d8dc");
  g.addColorStop(1, "#9c9ca2");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 1280);

  ctx.save();
  ctx.translate(128, 640);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "#1c1814";
  ctx.font = "600 40px 'Times New Roman', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("MALEK NAJM GHALEB", 0, 12);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function chromeMaterial(map?: THREE.Texture) {
  return new THREE.MeshPhysicalMaterial({
    color: "#e4e4e8",
    metalness: 1,
    roughness: 0.08,
    envMapIntensity: 1.55,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
    reflectivity: 1,
    map: map ?? null,
  });
}

function ProceduralChromeBook() {
  const cover = useMemo(() => makeCoverTexture(), []);
  const spine = useMemo(() => makeSpineTexture(), []);
  const materials = useMemo(() => {
    const front = chromeMaterial(cover);
    const side = chromeMaterial(spine);
    const plain = chromeMaterial();
    // +x spine, -x page edge, +y top, -y bottom, +z cover, -z back
    return [side, plain, plain, plain, front, plain] as THREE.MeshPhysicalMaterial[];
  }, [cover, spine]);

  useEffect(() => {
    return () => {
      cover.dispose();
      spine.dispose();
      materials.forEach((m) => m.dispose());
    };
  }, [cover, spine, materials]);

  return (
    <mesh
      castShadow
      receiveShadow
      position={BOOK_POSE.position}
      rotation={BOOK_POSE.rotation}
      material={materials}
    >
      {/* Slightly thicker hardcover proportions */}
      <boxGeometry args={[0.38, 2.15, 1.52]} />
    </mesh>
  );
}

function GltfBook({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive object={cloned} scale={1.15} position={[0, -0.2, 0]} rotation={BOOK_POSE.rotation} />
  );
}

function Scene({ modelUrl }: { modelUrl: string | null }) {
  return (
    <>
      {/* Transparent — hero sand shows through so the book blends into the page */}
      <ambientLight intensity={0.42} color="#f5ebe0" />
      {/* Key light from upper-right (matches mockup shadow to the left) */}
      <directionalLight
        castShadow
        position={[5.5, 7.5, 4]}
        intensity={1.85}
        color="#fff8f0"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-2.5, 3, -1.5]} intensity={0.28} color="#e8d4bc" />
      <hemisphereLight args={["#ffffff", SAND, 0.35]} />
      <Environment preset="apartment" environmentIntensity={0.7} />
      {modelUrl ? <GltfBook url={modelUrl} /> : <ProceduralChromeBook />}
      <ContactShadows
        position={[0, -1.12, 0]}
        opacity={0.55}
        scale={12}
        blur={3.2}
        far={5}
        color="#2a221c"
      />
    </>
  );
}

function useOptionalBookModel(path: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setUrl(path);
      })
      .catch(() => {
        /* procedural fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return url;
}

/**
 * Hero 3D book — still chrome showcase blended into the sand hero.
 * Drop `public/models/alchemist-book.glb` to swap in a custom model.
 */
export function Book3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const modelUrl = useOptionalBookModel(BOOK_MODEL_PATH);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`aspect-[5/6] w-full bg-transparent ${className}`} aria-hidden />;
  }

  return (
    <div
      className={`relative aspect-[5/6] w-full ${className}`}
      role="img"
      aria-label="Alchemist Ways book — 3D chrome volume"
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0.35, 0.15, 4.6], fov: 28, near: 0.1, far: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene modelUrl={modelUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
