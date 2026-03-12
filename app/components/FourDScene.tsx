import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

/* ── 4D Particle Swarm ─────────────────────────────────────── */
function ParticleSwarm({
  activeSection,
  wRotation,
}: {
  activeSection: number;
  wRotation: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 12000;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++)
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    return pos;
  }, []);

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff }),
    []
  );
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.2), []);

  // Color palettes per section
  const palettes = useMemo(
    () => [
      { hueBase: 0.65, hueRange: 0.3, satBase: 0.7 }, // Hero – electric blue
      { hueBase: 0.85, hueRange: 0.15, satBase: 0.6 }, // About – magenta/violet
      { hueBase: 0.1, hueRange: 0.2, satBase: 0.8 }, // Projects – amber/gold
      { hueBase: 0.45, hueRange: 0.15, satBase: 0.75 }, // Skills – teal/cyan
      { hueBase: 0.55, hueRange: 0.25, satBase: 0.65 }, // Contact – deep purple
    ],
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.3;
    const palette = palettes[activeSection] || palettes[0];
    const scale = 55;
    const wDist = 1.5;
    const complexity = 6 + activeSection * 1.5;

    for (let i = 0; i < count; i++) {
      const normI = i / count;
      const phi = Math.acos(1.0 - 2.0 * normI);
      const theta = Math.PI * 2.0 * i * 1.618033988749895;

      const u = normI * Math.PI * 2.0 * complexity;
      const v = theta;

      const x4 = Math.sin(phi) * Math.cos(v);
      const y4 = Math.sin(phi) * Math.sin(v);
      const z4 = Math.cos(phi) * Math.cos(u);
      const w4 = Math.cos(phi) * Math.sin(u);

      // Section-specific 4D rotation using wRotation
      const tRot = time * 0.2 + wRotation * 0.5;
      const cosT1 = Math.cos(tRot);
      const sinT1 = Math.sin(tRot);
      const cosT2 = Math.cos(tRot * 0.618);
      const sinT2 = Math.sin(tRot * 0.618);

      const xRot = x4 * cosT1 - w4 * sinT1;
      const wRot = x4 * sinT1 + w4 * cosT1;
      const yRot = y4 * cosT2 - z4 * sinT2;
      const zRot = y4 * sinT2 + z4 * cosT2;

      const projInv = 1.0 / (wDist - wRot);
      const px = xRot * projInv * scale;
      const py = yRot * projInv * scale;
      const pz = zRot * projInv * scale;

      target.set(px, py, pz);

      const hue =
        palette.hueBase +
        wRot * palette.hueRange +
        Math.sin(time * 0.5 + normI * 10.0) * 0.1;
      const sat = palette.satBase + Math.sin(u + time) * 0.2;
      const lum = 0.3 + projInv / (1.0 / (wDist - 1.0)) * 0.6;

      pColor.setHSL(
        ((hue % 1.0) + 1.0) % 1.0,
        Math.max(0, Math.min(1, sat)),
        Math.max(0, Math.min(1, lum))
      );

      positions[i].lerp(target, 0.05);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
}

/* ── Floating Dimensional Rings ───────────────────────────── */
function DimensionalRings({ activeSection }: { activeSection: number }) {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.15;
      ring1.current.rotation.y = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.1;
      ring2.current.rotation.z = t * 0.15;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.12;
      ring3.current.rotation.z = t * 0.08;
    }
  });

  const ringColor = useMemo(() => {
    const colors = ["#4488ff", "#bb44ff", "#ffaa22", "#22ddcc", "#8844ff"];
    return colors[activeSection] || colors[0];
  }, [activeSection]);

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[40, 0.15, 16, 100]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[50, 0.12, 16, 100]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[60, 0.1, 16, 100]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ── Camera Controller ────────────────────────────────────── */
function CameraController({ activeSection }: { activeSection: number }) {
  const { camera } = useThree();
  const targetPos = useMemo(() => {
    const positions = [
      new THREE.Vector3(0, 0, 100),   // Hero
      new THREE.Vector3(30, 10, 80),   // About
      new THREE.Vector3(-20, -10, 90), // Projects
      new THREE.Vector3(10, 20, 85),   // Skills
      new THREE.Vector3(0, 5, 95),     // Contact
    ];
    return positions[activeSection] || positions[0];
  }, [activeSection]);

  useFrame(() => {
    camera.position.lerp(targetPos, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Main Scene Export ────────────────────────────────────── */
export default function FourDScene({
  activeSection,
  wRotation,
}: {
  activeSection: number;
  wRotation: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#030308"]} />
      <fog attach="fog" args={["#030308", 80, 200]} />
      <ParticleSwarm activeSection={activeSection} wRotation={wRotation} />
      <DimensionalRings activeSection={activeSection} />
      <Sparkles count={200} scale={120} size={2} speed={0.3} opacity={0.4} />
      <CameraController activeSection={activeSection} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.001, 0.001)}
        />
      </EffectComposer>
    </Canvas>
  );
}
