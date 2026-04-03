/**
 * ParticleField.jsx — 4 000 energy particles drifting through the journey tunnel
 *
 * Performance notes:
 *  - Single BufferGeometry draw call
 *  - AdditiveBlending for free "glow" without post-processing
 *  - No texture (tiny footprint)
 *  - Uniforms via ShaderMaterial for speed-reactive streaking
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VERT = /* glsl */`
  attribute float aSize;
  attribute vec3  aColor;
  uniform   float uTime;
  uniform   float uSpeed;  // camera velocity → stretch factor
  varying   vec3  vColor;
  varying   float vAlpha;

  void main() {
    vColor = aColor;

    /* Drift each particle gently in XY */
    vec3 pos = position;
    pos.x += sin(uTime * 0.4 + position.z * 0.02) * 0.3;
    pos.y += cos(uTime * 0.3 + position.x * 0.015) * 0.2;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    float dist = length(mvPos.xyz);

    /* Perspective size + distance fade */
    gl_PointSize = aSize * (320.0 / dist) * (1.0 + uSpeed * 2.5);
    gl_Position  = projectionMatrix * mvPos;

    vAlpha = clamp(1.0 - dist / 110.0, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */`
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    /* Circular disc with soft edge */
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = 1.0 - smoothstep(0.2, 0.5, d);
    gl_FragColor = vec4(vColor, a * vAlpha * 0.85);
  }
`;

const ACCENT_COLORS = [
  new THREE.Color('#818cf8'), // indigo/purple
  new THREE.Color('#22d3ee'), // cyan
  new THREE.Color('#fbbf24'), // amber
  new THREE.Color('#e879f9'), // fuchsia
  new THREE.Color('#34d399'), // emerald
  new THREE.Color('#f8fafc'), // near-white
];

export default function ParticleField({ engineRef }) {
  const meshRef = useRef();
  const uTime   = useRef({ value: 0 });
  const uSpeed  = useRef({ value: 0 });

  const COUNT = 4000;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      /* Cylindrical distribution along journey axis */
      const angle  = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 32;
      positions[i * 3]     = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = Math.random() * -150 + 30;

      const col = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      /* Mix of tiny dust + larger glints */
      sizes[i] = Math.random() < 0.08
        ? 1.8 + Math.random() * 1.4   // bright star
        : 0.4 + Math.random() * 0.8;  // dust
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((_, delta) => {
    uTime.current.value += delta;

    const spd = engineRef?.current?.speed?.current ?? 0;
    uSpeed.current.value += (Math.abs(spd) - uSpeed.current.value) * 0.12;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
        <bufferAttribute attach="attributes-aSize"    count={COUNT} array={sizes}     itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={{
          uTime:  uTime.current,
          uSpeed: uSpeed.current,
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}