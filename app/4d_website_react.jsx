import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"scale":60,"wDist":1.5,"rotSpeed":0.2,"complexity":7}), []);
  const addControl = (id, l, min, max, val) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    if(material.uniforms && material.uniforms.uTime) {
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const scale = addControl("scale", "Projection Scale", 20.0, 150.0, 60.0);
        const wDist = addControl("wDist", "4D Perspective", 1.1, 5.0, 1.5);
        const rotSpeed = addControl("rotSpeed", "Timeline (Speed)", 0.0, 2.0, 0.2);
        const complexity = addControl("complexity", "Topology Folds", 1.0, 20.0, 7.0);
        
        if (i === 0) {
        setInfo("Creative Technologist / 4D Portfolio", "Navigate through higher-dimensional data structures. The 4th dimension (W) is exposed via color shift and stereographic folding.");
        annotate("work", new THREE.Vector3(scale * 1.5, 0, 0), "Selected Works");
        annotate("about", new THREE.Vector3(-scale * 1.5, 0, 0), "Origin / About");
        annotate("contact", new THREE.Vector3(0, scale * 1.5, 0), "Make Contact");
        }
        
        const normI = i / count;
        const phi = Math.acos(1.0 - 2.0 * normI);
        const theta = Math.PI * 2.0 * i * 1.618033988749895;
        
        const u = normI * Math.PI * 2.0 * complexity;
        const v = theta;
        
        const x4 = Math.sin(phi) * Math.cos(v);
        const y4 = Math.sin(phi) * Math.sin(v);
        const z4 = Math.cos(phi) * Math.cos(u);
        const w4 = Math.cos(phi) * Math.sin(u);
        
        const tRot = time * rotSpeed;
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
        
        const hue = 0.65 + wRot * 0.3 + (Math.sin(time * 0.5 + normI * 10.0) * 0.1);
        const sat = 0.7 + Math.sin(u + time) * 0.2;
        const lum = 0.3 + (projInv / (1.0 / (wDist - 1.0))) * 0.6;
        
        color.setHSL(hue % 1.0, sat, Math.min(1.0, Math.max(0.0, lum)));
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}