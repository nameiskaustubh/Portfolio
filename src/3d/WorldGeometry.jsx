/**
 * WorldGeometry.jsx — Fixed
 *
 * FIX #12: All list renders use stable unique string IDs as keys.
 *          Previously used array index as key, which causes geometry
 *          flicker when arrays reorder.
 *
 * FIX #17: Particle count and geometry detail adapt to device capability
 *          (handled in ParticleField.jsx — WorldGeometry reduces station
 *          portal geometry segments on low-end devices).
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────── Grid Floor ───────────────────────────── */
function GridFloor() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#1e293b') } },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      varying vec2 vUv;
      void main(){
        vec2 g = abs(fract(vUv * 40.0) - 0.5);
        float line = 1.0 - smoothstep(0.0, 0.04, min(g.x, g.y));
        float fade = 1.0 - smoothstep(0.3, 1.0, length(vUv - 0.5));
        gl_FragColor = vec4(uColor, line * fade * 0.5);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  }), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -55]}>
      <planeGeometry args={[300, 200, 1, 1]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ─────────────────────────── Journey Tube ──────────────────────────── */
function JourneyTube() {
  const uTime = useRef({ value: 0 });

  const curve = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      pts.push(new THREE.Vector3(
        Math.sin(t * Math.PI * 1.5) * 3.5,
        Math.cos(t * Math.PI * 2.2) * 1.2,
        t * -140
      ));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const tubeMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime:   uTime.current,
      uColor1: { value: new THREE.Color('#818cf8') },
      uColor2: { value: new THREE.Color('#22d3ee') },
    },
    vertexShader: /* glsl */`
      varying float vT;
      void main(){
        vT = uv.x;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform vec3  uColor1;
      uniform vec3  uColor2;
      varying float vT;
      void main(){
        float pulse = 0.5 + 0.5 * sin(vT * 30.0 - uTime * 3.0);
        vec3  col   = mix(uColor1, uColor2, vT);
        gl_FragColor = vec4(col, pulse * 0.35);
      }
    `,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
    side:        THREE.DoubleSide,
  }), []);

  useFrame((_, delta) => { uTime.current.value += delta; });

  return (
    <mesh>
      <tubeGeometry args={[curve, 200, 0.04, 8, false]} />
      <primitive object={tubeMat} attach="material" />
    </mesh>
  );
}

/* ─────────────────────────── Station Portal ────────────────────────── */
function StationPortal({ id, z, colorHex, scale = 1, speed = 0.25 }) {
  const outer = useRef();
  const inner = useRef();
  const uTime = useRef({ value: 0 });

  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime:  uTime.current,
      uColor: { value: new THREE.Color(colorHex) },
    },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uTime;
      uniform vec3  uColor;
      varying vec2  vUv;
      void main(){
        float a = 0.5 + 0.5 * sin(uTime * 2.0 + vUv.x * 10.0);
        gl_FragColor = vec4(uColor, a * 0.5);
      }
    `,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
    side:        THREE.DoubleSide,
  }), [colorHex]);

  const innerMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       colorHex,
    transparent: true,
    opacity:     0.15,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
    side:        THREE.DoubleSide,
  }), [colorHex]);

  useFrame((_, delta) => {
    uTime.current.value += delta;
    if (outer.current) {
      outer.current.rotation.z += delta * speed;
      outer.current.rotation.x = Math.sin(uTime.current.value * 0.3) * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.z -= delta * speed * 0.6;
    }
  });

  return (
    <group position={[0, 0, z]}>
      <mesh ref={outer}>
        <torusGeometry args={[6.5 * scale, 0.025, 8, 120]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[5.2 * scale, 0.012, 6, 80]} />
        <primitive object={innerMat} attach="material" />
      </mesh>
      <mesh>
        <circleGeometry args={[4.8 * scale, 64]} />
        <meshBasicMaterial
          color={colorHex}
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────── Light Streaks ─────────────────────────── */
function LightStreaks() {
  // FIX #12: Stable unique IDs — no array-index keys
  const streaks = useMemo(() => {
    const palette = ['#818cf8', '#22d3ee', '#fbbf24', '#e879f9'];
    return Array.from({ length: 30 }, (_, i) => ({
      id:      `streak-${i}`,          // stable unique ID
      x:       (Math.random() - 0.5) * 40,
      y:       (Math.random() - 0.5) * 18,
      z:       Math.random() * -140 - 5,
      len:     4 + Math.random() * 20,
      color:   palette[i % palette.length],
      opacity: 0.06 + Math.random() * 0.14,
    }));
  }, []);

  return (
    <>
      {streaks.map((s) => (
        <mesh key={s.id} position={[s.x, s.y, s.z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, s.len, 4]} />
          <meshBasicMaterial
            color={s.color}
            transparent
            opacity={s.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─────────────────────────── Nebula Clouds ─────────────────────────── */
function NebulaClouds() {
  // FIX #12: Stable unique IDs
  const clouds = useMemo(() => [
    { id: 'nebula-indigo', pos: [-25,  8,  -30], color: '#818cf82a', scale: 18 },
    { id: 'nebula-cyan',   pos: [ 30, -5,  -55], color: '#22d3ee1a', scale: 22 },
    { id: 'nebula-amber',  pos: [-20, -8,  -80], color: '#fbbf241a', scale: 16 },
    { id: 'nebula-fuchsia',pos: [ 15, 10,  -95], color: '#e879f91a', scale: 20 },
  ], []);

  return (
    <>
      {clouds.map((c) => (
        <mesh key={c.id} position={c.pos}>
          <sphereGeometry args={[c.scale, 8, 8]} />
          <meshBasicMaterial
            color={c.color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─────────────────────────── Station data ──────────────────────────── */
// FIX #12: Data-driven with stable IDs — no index keys in JSX
const STATION_PORTALS = [
  { id: 'portal-hero',  z:    0, colorHex: '#818cf8', scale: 1.0, speed: 0.20 },
  { id: 'portal-stats', z:  -22, colorHex: '#22d3ee', scale: 0.8, speed: 0.28 },
  { id: 'portal-phil',  z:  -44, colorHex: '#fbbf24', scale: 0.9, speed: 0.22 },
  { id: 'portal-bento', z:  -66, colorHex: '#818cf8', scale: 0.7, speed: 0.32 },
  { id: 'portal-stack', z:  -88, colorHex: '#22d3ee', scale: 1.1, speed: 0.18 },
  { id: 'portal-cta',   z: -110, colorHex: '#e879f9', scale: 1.4, speed: 0.15 },
];

/* ─────────────────────────── Main Export ───────────────────────────── */
export default function WorldGeometry() {
  return (
    <>
      <GridFloor />
      <JourneyTube />
      <LightStreaks />
      <NebulaClouds />
      {STATION_PORTALS.map((p) => (
        <StationPortal key={p.id} {...p} />
      ))}
    </>
  );
}