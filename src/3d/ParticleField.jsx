/**
 * ParticleField.jsx — Fixed
 *
 * FIX #17: Adaptive particle COUNT based on device hardware concurrency.
 *          4000 particles on a phone GPU = 15fps. Now scales gracefully:
 *          ≤4 cores  → 1200 particles
 *          ≤8 cores  → 2000 particles
 *          >8 cores  → 4000 particles (original quality)
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VERT = /* glsl */`
  attribute float aSize;
  attribute vec3  aColor;
  uniform   float uTime;
  uniform   float uSpeed;
  varying   vec3  vColor;
  varying   float vAlpha;

  void main() {
    vColor = aColor;
    vec3 pos = position;
    pos.x += sin(uTime * 0.4 + position.z * 0.02) * 0.3;
    pos.y += cos(uTime * 0.3 + position.x * 0.015) * 0.2;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    float dist = length(mvPos.xyz);

    gl_PointSize = aSize * (320.0 / dist) * (1.0 + uSpeed * 2.5);
    gl_Position  = projectionMatrix * mvPos;
    vAlpha = clamp(1.0 - dist / 110.0, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */`
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = 1.0 - smoothstep(0.2, 0.5, d);
    gl_FragColor = vec4(vColor, a * vAlpha * 0.85);
  }
`;

const ACCENT_COLORS = [
  new THREE.Color('#818cf8'),
  new THREE.Color('#22d3ee'),
  new THREE.Color('#fbbf24'),
  new THREE.Color('#e879f9'),
  new THREE.Color('#34d399'),
  new THREE.Color('#f8fafc'),
];

/* FIX #17: Derive particle count once at module init based on hardware */
const getAdaptiveCount = () => {
  if (typeof navigator === 'undefined') return 4000;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores <= 4) return 1200;
  if (cores <= 8) return 2000;
  return 4000;
};

const COUNT = getAdaptiveCount();

export default function ParticleField({ engineRef }) {
  const uTime  = useRef({ value: 0 });
  const uSpeed = useRef({ value: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const angle  = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 32;
      positions[i * 3]     = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = Math.random() * -150 + 30;

      const col = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() < 0.08
        ? 1.8 + Math.random() * 1.4
        : 0.4 + Math.random() * 0.8;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((_, delta) => {
    uTime.current.value += delta;
    const spd = engineRef?.current?.speed?.current ?? 0;
    uSpeed.current.value += (Math.abs(spd) - uSpeed.current.value) * 0.12;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
        <bufferAttribute attach="attributes-aSize"    count={COUNT} array={sizes}     itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{ uTime: uTime.current, uSpeed: uSpeed.current }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}