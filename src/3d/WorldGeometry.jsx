/**
 * WorldGeometry.jsx — The 3D environment you travel through
 *
 * Contains:
 *  - GridFloor         : infinite perspective grid runway
 *  - JourneyTube       : glowing spline path the camera follows
 *  - StationPortal     : animated torus ring at each content station
 *  - LightStreaks      : static vertical glow pillars
 *  - NebulaClouds      : large faint gradient spheres for atmosphere
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────── Grid Floor ───────────────────────────── */
function GridFloor() {
  const ref = useRef();

  // Custom shader grid with fade
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
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -55]}>
      <planeGeometry args={[300, 200, 1, 1]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ─────────────────────────── Journey Tube ──────────────────────────── */
function JourneyTube() {
  const ref   = useRef();
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

  useFrame((_, delta) => {
    uTime.current.value += delta;
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 200, 0.04, 8, false]} />
      <primitive object={tubeMat} attach="material" />
    </mesh>
  );
}

/* ─────────────────────────── Station Portal ────────────────────────── */
function StationPortal({ z, colorHex, scale = 1, speed = 0.25 }) {
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
      {/* Outer animated torus */}
      <mesh ref={outer}>
        <torusGeometry args={[6.5 * scale, 0.025, 8, 120]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Inner smaller ring */}
      <mesh ref={inner}>
        <torusGeometry args={[5.2 * scale, 0.012, 6, 80]} />
        <primitive object={innerMat} attach="material" />
      </mesh>
      {/* Centre glow disc */}
      <mesh rotation={[0, 0, 0]}>
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
  const streaks = useMemo(() => {
    const palette = ['#818cf8', '#22d3ee', '#fbbf24', '#e879f9'];
    return Array.from({ length: 30 }, (_, i) => ({
      id:     i,
      x:      (Math.random() - 0.5) * 40,
      y:      (Math.random() - 0.5) * 18,
      z:      Math.random() * -140 - 5,
      len:    4 + Math.random() * 20,
      color:  palette[i % palette.length],
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
  const clouds = useMemo(() => [
    { pos: [-25, 8, -30],  color: '#818cf82a', scale: 18 },
    { pos: [ 30, -5, -55], color: '#22d3ee1a', scale: 22 },
    { pos: [-20, -8, -80], color: '#fbbf241a', scale: 16 },
    { pos: [ 15, 10, -95], color: '#e879f91a', scale: 20 },
  ], []);

  return (
    <>
      {clouds.map((c, i) => (
        <mesh key={i} position={c.pos}>
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

/* ─────────────────────────── Main Export ───────────────────────────── */
export default function WorldGeometry({ engineRef }) {
  return (
    <>
      <GridFloor />
      <JourneyTube />
      <LightStreaks />
      <NebulaClouds />

      {/* Station portals — one per content section */}
      <StationPortal z={   0} colorHex="#818cf8" scale={1.0} speed={0.20} />
      <StationPortal z={ -22} colorHex="#22d3ee" scale={0.8} speed={0.28} />
      <StationPortal z={ -44} colorHex="#fbbf24" scale={0.9} speed={0.22} />
      <StationPortal z={ -66} colorHex="#818cf8" scale={0.7} speed={0.32} />
      <StationPortal z={ -88} colorHex="#22d3ee" scale={1.1} speed={0.18} />
      <StationPortal z={-110} colorHex="#e879f9" scale={1.4} speed={0.15} />
    </>
  );
}